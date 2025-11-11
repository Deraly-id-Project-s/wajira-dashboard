<?php

namespace App\Filament\Resources;

use Filament\Forms;
use Filament\Tables;
use Filament\Forms\Set;
use Filament\Forms\Form;
use App\Models\Motorcycle;
use Filament\Tables\Table;
use Illuminate\Support\Str;
use Filament\Resources\Resource;
use App\Models\MotorcycleVariant;
use Filament\Forms\Components\Grid;
use Filament\Forms\Components\Split;
use Illuminate\Support\Facades\Gate;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Toggle;
use Illuminate\Support\Facades\Cache;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\Repeater;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Forms\Components\TextInput;
use Filament\Tables\Columns\ImageColumn;
use Filament\Forms\Components\FileUpload;
use Filament\Tables\Columns\ToggleColumn;
use Illuminate\Database\Eloquent\Builder;
use Filament\Forms\Components\ColorPicker;
use Filament\Tables\Filters\TrashedFilter;
use Filament\Tables\Actions\ReplicateAction;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use App\Filament\Resources\MotorcycleResource\Pages;
use App\Filament\Resources\MotorcycleResource\RelationManagers;

class MotorcycleResource extends Resource
{
    protected static ?string $model = Motorcycle::class;

    protected static string $name = 'product';

    protected static ?string $navigationIcon = 'heroicon-o-squares-2x2';

    protected static ?string $navigationGroup = 'Products';

    protected static ?int $navigationSort = 2;

    public static function clearCache()
    {
        Cache::forget('public_motorcycle');
        Cache::forget('public_all_motorcycle');
        Cache::forget('public_motorcycle_recommendation');
    }

    public static function form(Form $form): Form
    {
        return $form->schema([
            Section::make('General Information')
                ->schema([
                    FileUpload::make('product_image')
                        ->label('Product Image')
                        ->disk('public')
                        ->temporaryDirectory('temp/motorcycles')
                        ->directory('motorcycles')
                        ->getUploadedFileNameForStorageUsing(function ($file) {
                            return md5($file->getClientOriginalName() . microtime()) . '.' . $file->getClientOriginalExtension();
                        })
                        ->required()
                        ->imageEditor()
                        ->maxSize(2048)
                        ->imagePreviewHeight(500)
                        ->hint('Maximum size: 2MB (jpg, png, jpeg)')
                        ->image(),
                    Select::make('brand_id')->placeholder('Brand')->relationship('brand', 'name')->required()->native(false),
                    TextInput::make('name')
                        ->required()
                        ->maxLength(255)
                        ->placeholder('Motorcycle Name')
                        ->live(onBlur: true)
                        ->afterStateUpdated(function ($state, callable $set) {
                            $baseSlug = Str::slug($state);

                            $count = Motorcycle::where('slug', 'LIKE', "{$baseSlug}%")->count();

                            $slug = $count > 0 ? "{$baseSlug}-{$count}" : $baseSlug;

                            $set('slug', $slug);
                        }),
                    TextInput::make('slug')->required()->disabled()->dehydrated()->maxLength(255)->placeholder('Motorcycle Slug')->hintIcon('heroicon-o-information-circle', tooltip: 'Slug will be used for URL'),
                    Toggle::make('is_recomended')->label('Recomend this Product')->default(false)->required(false),
                ])
                ->collapsible(true),
            Section::make('Engine Information')
                ->schema([
                    TextInput::make('engine_type')->maxLength(255)->required(false)->placeholder('Engine Type'),
                    TextInput::make('engine_size')->maxLength(255)->required(false)->placeholder('Engine Size'),
                    TextInput::make('displacement')->maxLength(255)->required(false)->placeholder('Displacement'),
                    TextInput::make('compression_ratio')->maxLength(255)->required(false)->placeholder('Compression Ratio'),
                    TextInput::make('max_power')->required(false)->maxLength(255)->placeholder('Max Power'),
                    TextInput::make('max_torque')->required(false)->maxLength(255)->placeholder('Max Torque'),
                    TextInput::make('clutch')->required(false)->maxLength(255)->placeholder('Clutch'),
                    TextInput::make('starter')->required(false)->maxLength(255)->placeholder('Starter'),
                    TextInput::make('spark_plug')->required(false)->maxLength(255)->placeholder('Spark Plug'),
                    TextInput::make('fuel_system')->required(false)->maxLength(255)->placeholder('Fuel System'),
                    TextInput::make('ignition_system')->required(false)->maxLength(255)->placeholder('Ignition System'),
                ])
                ->collapsible(true),
            Section::make('Frame & Dimensions Information')
                ->schema([
                    Split::make([
                        Section::make('Frame Information')
                            ->schema([
                                Select::make('frame_type')
                                    ->options([
                                        'underbone' => __('Underbone'),
                                        'backbone' => __('Backbone'),
                                        'trellis' => __('Trellis'),
                                        'double_cradle' => __('Double Cradle'),
                                        'perimeter' => __('Perimeter'),
                                        'diamond' => __('Diamond'),
                                        'monocoque' => __('Monocoque'),
                                        'esaf' => __('ESAF'),
                                    ])
                                    ->native(false)
                                    ->required(true),
                                TextInput::make('front_suspension')->maxLength(255)->required(false)->placeholder('Front Suspension'),
                                TextInput::make('rear_suspension')->maxLength(255)->required(false)->placeholder('Rear Suspension'),
                                Select::make('tire_type')
                                    ->options([
                                        'tubeless' => 'Tubeless',
                                        'tube' => 'Tube',
                                        'radial' => 'Radial',
                                        'bias' => 'Bias',
                                    ])
                                    ->native(false),
                                TextInput::make('front_tire')->maxLength(255)->required(false)->placeholder('Front Tire'),
                                TextInput::make('rear_tire')->maxLength(255)->required(false)->placeholder('Rear Tire'),
                                TextInput::make('front_brake')->maxLength(255)->required(false)->placeholder('Front Brake'),
                                TextInput::make('lubrication_system')->maxLength(255)->required(false)->placeholder('Lubrication System'),
                            ])
                            ->collapsible(true),
                        Section::make('Dimensions & Weight')
                            ->schema([TextInput::make('overall_length')->required(false)->maxLength(255)->placeholder('Overall Length'), TextInput::make('overall_width')->required(false)->maxLength(255)->placeholder('Overall Width'), TextInput::make('overall_height')->required(false)->maxLength(255)->placeholder('Overall Height'), TextInput::make('wheelbase')->required(false)->maxLength(255)->placeholder('Wheelbase'), TextInput::make('ground_clearance')->required(false)->maxLength(255)->placeholder('Ground Clearance'), TextInput::make('seat_height')->required(false)->maxLength(255)->placeholder('Seat Height'), TextInput::make('curb_weight')->required(false)->maxLength(255)->placeholder('Curb Weight'), TextInput::make('tank_capacity')->required(false)->maxLength(255)->placeholder('Tank Capacity')])
                            ->collapsible(true),
                    ])->columnSpanFull(),
                ])
                ->collapsible(true),
            Section::make('Electryc Information')
                ->schema([TextInput::make('battery')->required(false)->maxLength(255)->placeholder('Battery'), TextInput::make('headlight')->required(false)->maxLength(255)->placeholder('Headlight'), TextInput::make('taillight')->required(false)->maxLength(255)->placeholder('Taillight'), TextInput::make('turn_signal')->required(false)->maxLength(255)->placeholder('Turn Signal'), Toggle::make('charging_port')->required(false)])
                ->collapsible(true),
            Section::make('Variants & Colors')
                ->schema([
                    Repeater::make('variants')
                        ->relationship('variants')
                        ->label('Motorcycle Variants')
                        ->collapsible()
                        ->schema([
                            TextInput::make('name')
                                ->required()
                                ->placeholder('Variant Name')
                                ->live(onBlur: true)
                                ->afterStateUpdated(function ($state, callable $set) {
                                    $baseSlug = Str::slug($state);

                                    $count = MotorcycleVariant::where('variant_slug', 'LIKE', "{$baseSlug}%")->count();

                                    $variant_slug = $count > 0 ? "{$baseSlug}-{$count}" : $baseSlug;

                                    $set('variant_slug', $variant_slug);
                                }),

                            TextInput::make('variant_slug')->disabled()->dehydrated()->maxLength(255)->placeholder('Motorcycle Variant Slug')->required()->hintIcon('heroicon-o-information-circle', tooltip: 'Slug will be used for URL'),

                            TextInput::make('description')->nullable()->placeholder('Variant Description')->columnSpanFull(),

                            // nested repeater untuk warna
                            Repeater::make('colors')
                                ->relationship('colors')
                                ->label('Variant Colors')
                                ->collapsible()
                                ->schema([
                                    FileUpload::make('image')
                                    ->image()
                                    ->disk('public')
                                    ->temporaryDirectory('temp/motorcycles/colors')
                                    ->directory('motorcycles/colors')
                                    ->required()
                                    ->label('Image'), TextInput::make('color_name')
                                    ->required()
                                    ->placeholder('Color Name'), Grid::make(2)
                                    ->schema([ColorPicker::make('color_code')
                                    ->required()
                                    ->placeholder('Color Code')
                                    ->columns(1), TextInput::make('stock')
                                    ->numeric()
                                    ->default(1)
                                    ->columns(1)])
                                ])
                                ->columnSpanFull()
                                ->addActionLabel('Add Color'),
                        ])
                        ->columns(2)
                        ->addActionLabel('Add Variant'),
                ])
                ->collapsible(true),
            Section::make('360° Product Images')
                ->schema([
                    Forms\Components\FileUpload::make('image_360')
                        ->label('Upload 360° Images')
                        ->multiple()
                        ->reorderable()
                        ->image()
                        ->panelLayout('compact')
                        ->imageEditor()
                        ->preserveFilenames()
                        ->panelLayout('grid')
                        ->disk('public')
                        ->temporaryDirectory(function (callable $get, $record) {
                            $slug = $record->slug ?? Str::slug($get('name') ?? 'unnamed');

                            return "temp/motorcycles/{$slug}/360";
                        })
                        ->directory(function (callable $get, $record) {
                            $slug = $record->slug ?? Str::slug($get('name') ?? 'unnamed');

                            return "motorcycles/{$slug}/360";
                        })
                        ->columns(2)
                        ->helperText('Upload semua frame gambar untuk efek 360°. Drag untuk mengatur urutan.'),
                ])
                // ->helperText('Gambar dapat di-reorder untuk mendapatkan efek 360° yang sesuai dengan keinginan Anda.')
                ->collapsible(true),
            TextInput::make('price')
                ->label('Price')
                ->numeric()
                ->default(0)
                ->prefix('Rp')
                ->reactive()
                ->afterStateHydrated(function (TextInput $component, $state) {
                    $component->state(number_format((int) $state, 0, ',', '.'));
                })
                ->dehydrateStateUsing(function ($state) {
                    return (int) preg_replace('/[^0-9]/', '', $state);
                })
                ->suffix(',-')
                ->extraInputAttributes(['class' => 'text-right']),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('slug')->label('Slug')->searchable()->sortable(),

                Tables\Columns\TextColumn::make('name')->label('Name')->searchable()->sortable(),

                TextColumn::make('brand.name')->sortable()->badge(),

                Tables\Columns\TextColumn::make('price')->label('Price')->money('IDR', true)->sortable(),

                Tables\Columns\TextColumn::make('created_at')->label('Created')->dateTime('d M Y H:i')->sortable(),

                ToggleColumn::make('is_recomended')->label('Recomended')->grow(false)->afterStateUpdated(fn() => static::clearCache()),

                Tables\Columns\TextColumn::make('engine_type')->searchable()->toggleable(isToggledHiddenByDefault: true),

                Tables\Columns\TextColumn::make('engine_size')->searchable()->toggleable(isToggledHiddenByDefault: true),

                Tables\Columns\TextColumn::make('max_power')->searchable()->toggleable(isToggledHiddenByDefault: true),

                Tables\Columns\TextColumn::make('max_torque')->searchable()->toggleable(isToggledHiddenByDefault: true),

                Tables\Columns\TextColumn::make('fuel_system')->searchable()->toggleable(isToggledHiddenByDefault: true),

                Tables\Columns\TextColumn::make('overall_length')->searchable()->toggleable(isToggledHiddenByDefault: true),

                Tables\Columns\TextColumn::make('overall_width')->searchable()->toggleable(isToggledHiddenByDefault: true),

                Tables\Columns\TextColumn::make('overall_height')->searchable()->toggleable(isToggledHiddenByDefault: true),

                Tables\Columns\TextColumn::make('battery')->searchable()->toggleable(isToggledHiddenByDefault: true),

                Tables\Columns\IconColumn::make('charging_port')->boolean()->toggleable(isToggledHiddenByDefault: true),

                Tables\Columns\TextColumn::make('updated_at')->dateTime()->sortable()->toggleable(isToggledHiddenByDefault: true),

                Tables\Columns\TextColumn::make('deleted_at')->dateTime()->sortable()->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([Tables\Filters\TrashedFilter::make()])
            ->actions([
                Tables\Actions\EditAction::make()->after(fn() => static::clearCache()),
                ReplicateAction::make()
                    ->excludeAttributes(['slug'])
                    ->beforeReplicaSaved(function ($record, $replica): void {
                        $replica->slug = Str::slug($replica->name) . '-' . Str::random(5);
                    }),
            ])
            ->bulkActions([Tables\Actions\BulkActionGroup::make([Tables\Actions\DeleteBulkAction::make()->after(fn() => static::clearCache()), Tables\Actions\ForceDeleteBulkAction::make()->after(fn() => static::clearCache()), Tables\Actions\RestoreBulkAction::make()->after(fn() => static::clearCache())])]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListMotorcycles::route('/'),
            'create' => Pages\CreateMotorcycle::route('/create'),
            'edit' => Pages\EditMotorcycle::route('/{record}/edit'),
        ];
    }

    public static function getEloquentQuery(): Builder
    {
        return parent::getEloquentQuery()->withoutGlobalScopes([SoftDeletingScope::class]);
    }

    // Spattie Permission
    public static function canViewAny(): bool
    {
        return Gate::allows(self::$name . ':list');
    }

    public static function canView($record): bool
    {
        return Gate::allows(self::$name . ':list');
    }

    public static function canCreate(): bool
    {
        return Gate::allows(self::$name . ':create');
    }

    public static function canEdit($record): bool
    {
        return Gate::allows(self::$name . ':edit');
    }

    public static function canDelete($record): bool
    {
        return Gate::allows(self::$name . ':delete');
    }

    public static function canForceDelete($record): bool
    {
        return Gate::allows(self::$name . ':delete');
    }

    public static function canRestore($record): bool
    {
        return Gate::allows(self::$name . ':delete');
    }
}
