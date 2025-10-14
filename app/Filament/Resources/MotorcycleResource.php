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
use Filament\Forms\Components\Split;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\Repeater;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Forms\Components\TextInput;
use Filament\Tables\Columns\ImageColumn;
use Filament\Forms\Components\FileUpload;
use Illuminate\Database\Eloquent\Builder;
use Filament\Tables\Filters\TrashedFilter;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use App\Filament\Resources\MotorcycleResource\Pages;
use App\Filament\Resources\MotorcycleResource\RelationManagers;
use Filament\Forms\Components\ColorPicker;

class MotorcycleResource extends Resource
{
    protected static ?string $model = Motorcycle::class;

    protected static ?string $navigationIcon = 'heroicon-o-squares-2x2';

    protected static ?string $navigationGroup = 'Products';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Section::make('General Information')
                    ->schema([
                        FileUpload::make('product_image')
                            ->label('Product Image')
                            ->required()
                            ->imageEditor()
                            ->image(),
                        Select::make('brand_id')
                            ->placeholder('Brand')
                            ->relationship('brand', 'name')
                            ->required()
                            ->native(false),
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
                        TextInput::make('slug')
                            ->required()
                            ->disabled()
                            ->dehydrated()
                            ->maxLength(255)
                            ->placeholder('Motorcycle Slug')
                            ->hintIcon('heroicon-o-information-circle', tooltip: 'Slug will be used for URL')
                    ])->collapsible(true),
                Section::make('Engine Information')
                    ->schema([
                        TextInput::make('engine_type')
                            ->maxLength(255)
                            ->required(false)
                            ->placeholder('Engine Type'),
                        TextInput::make('engine_size')
                            ->maxLength(255)
                            ->required(false)
                            ->placeholder('Engine Size'),
                        TextInput::make('displacement')
                            ->maxLength(255)
                            ->required(false)
                            ->placeholder('Displacement'),
                        TextInput::make('compression_ratio')
                            ->maxLength(255)
                            ->required(false)
                            ->placeholder('Compression Ratio'),
                        TextInput::make('max_power')
                            ->required(false)
                            ->maxLength(255)
                            ->placeholder('Max Power'),
                        TextInput::make('max_torque')
                            ->required(false)
                            ->maxLength(255)
                            ->placeholder('Max Torque'),
                        TextInput::make('clutch')
                            ->required(false)
                            ->maxLength(255)
                            ->placeholder('Clutch'),
                        TextInput::make('starter')
                            ->required(false)
                            ->maxLength(255)
                            ->placeholder('Starter'),
                        TextInput::make('spark_plug')
                            ->required(false)
                            ->maxLength(255)
                            ->placeholder('Spark Plug'),
                        TextInput::make('fuel_system')
                            ->required(false)
                            ->maxLength(255)
                            ->placeholder('Fuel System'),
                        TextInput::make('ignition_system')
                            ->required(false)
                            ->maxLength(255)
                            ->placeholder('Ignition System')
                    ])->collapsible(true),
                Split::make([
                    Section::make('Frame Information')
                        ->schema([
                            Select::make('frame_type')
                                ->options([
                                    'underbone',
                                    'backbone',
                                    'trellis',
                                    'double_cradle',
                                    'perimeter',
                                    'diamond',
                                    'monocoque',
                                    'esaf'
                                ])
                                ->native(false)
                                ->required(true),
                            TextInput::make('front_suspension')
                                ->maxLength(255)
                                ->required(false)
                                ->placeholder('Front Suspension'),
                            TextInput::make('rear_suspension')
                                ->maxLength(255)
                                ->required(false)
                                ->placeholder('Rear Suspension'),
                            Select::make('tire_type')
                                ->options([
                                    'tubeless',
                                    'tube',
                                    'radial',
                                    'bias'
                                ])
                                ->native(false),
                            TextInput::make('front_tire')
                                ->maxLength(255)
                                ->required(false)
                                ->placeholder('Front Tire'),
                            TextInput::make('rear_tire')
                                ->maxLength(255)
                                ->required(false)
                                ->placeholder('Rear Tire'),
                            TextInput::make('front_brake')
                                ->maxLength(255)
                                ->required(false)
                                ->placeholder('Front Brake'),
                            TextInput::make('lubrication_system')
                                ->maxLength(255)
                                ->required(false)
                                ->placeholder('Lubrication System'),
                        ])->collapsible(true),
                    Section::make('Dimensions & Weight')
                        ->schema([
                            TextInput::make('overall_length')
                                ->required(false)
                                ->maxLength(255)
                                ->placeholder('Overall Length'),
                            TextInput::make('overall_width')
                                ->required(false)
                                ->maxLength(255)
                                ->placeholder('Overall Width'),
                            TextInput::make('overall_height')
                                ->required(false)
                                ->maxLength(255)
                                ->placeholder('Overall Height'),
                            TextInput::make('wheelbase')
                                ->required(false)
                                ->maxLength(255)
                                ->placeholder('Wheelbase'),
                            TextInput::make('ground_clearance')
                                ->required(false)
                                ->maxLength(255)
                                ->placeholder('Ground Clearance'),
                            TextInput::make('seat_height')
                                ->required(false)
                                ->maxLength(255)
                                ->placeholder('Seat Height'),
                            TextInput::make('curb_weight')
                                ->required(false)
                                ->maxLength(255)
                                ->placeholder('Curb Weight'),
                            TextInput::make('tank_capacity')
                                ->required(false)
                                ->maxLength(255)
                                ->placeholder('Tank Capacity'),
                        ])->collapsible(true)
                ])->columnSpanFull(),
                Section::make('Electryc Information')
                    ->schema([
                        TextInput::make('battery')
                            ->required(false)
                            ->maxLength(255)
                            ->placeholder('Battery'),
                        TextInput::make('headlight')
                            ->required(false)
                            ->maxLength(255)
                            ->placeholder('Headlight'),
                        TextInput::make('taillight')
                            ->required(false)
                            ->maxLength(255)
                            ->placeholder('Taillight'),
                        TextInput::make('turn_signal')
                            ->required(false)
                            ->maxLength(255)
                            ->placeholder('Turn Signal'),
                        Toggle::make('charging_port')
                            ->required(false)
                    ])->collapsible(true),
                Section::make('Motorcycle Colors')
                    ->schema([
                        Repeater::make('colors')
                            ->relationship('colors')
                            ->orderable('order')
                            ->defaultItems(0)
                            ->collapsible()
                            ->cloneable()
                            ->reorderableWithButtons()
                            ->schema([
                                FileUpload::make('image')
                                    ->image()
                                    ->directory(function (callable $get) {
                                        $slug = Str::slug($get('name') ?? 'unnamed');
                                        
                                        return "assets/images/products/motorcycles/{$slug}/colors";
                                    })
                                    ->maxSize(2048)
                                    ->required(true)
                                    ->label('Foto Warna')
                                    ->columnSpanFull(),

                                TextInput::make('color_name')
                                    ->required(true)
                                    ->placeholder('Motorcycle Color Name'),

                                ColorPicker::make('color_code')
                                    ->label('Motorcycle Color')
                                    ->required(true)
                                    ->placeholder('Motorcycle Color')
                                    ->helperText('Example: #ff0000'),

                                TextInput::make('stock')
                                    ->required(true)
                                    ->numeric()
                                    ->default(1)
                                    ->minValue(1)
                                    ->placeholder('Stock'),
                            ])
                            ->columns(3)
                            ->addActionLabel('Add New Color')
                            ->reorderableWithDragAndDrop(false)
                            ->reorderableWithButtons(true)
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
                            ->directory(function (callable $get) {
                                $slug = Str::slug($get('name') ?? 'unnamed');
                                return "assets/images/products/motorcycles/{$slug}/360";
                            })
                            ->columns(2)
                            ->helperText('Upload semua frame gambar untuk efek 360°. Drag untuk mengatur urutan.'),
                    ])
                    ->collapsible(true),
                TextInput::make('price')
                    ->label('Price')
                    ->required()
                    ->numeric()
                    ->default(0)
                    ->prefix('Rp')
                    ->reactive()
                    ->afterStateHydrated(function (TextInput $component, $state) {
                        $component->state(number_format($state, 0, ',', '.'));
                    })
                    ->dehydrateStateUsing(function ($state) {
                        return (int) str_replace(['.', 'Rp', ' '], '', $state);
                    })
                    ->suffix(',-')
                    ->extraInputAttributes(['class' => 'text-right'])
                ]);
    }

    public static function table(Table $table): Table
    {
        return $table
        ->columns([
            Tables\Columns\TextColumn::make('id')
                ->label('ID')
                ->sortable(),

            Tables\Columns\TextColumn::make('slug')
                ->label('Slug')
                ->searchable()
                ->sortable(),

            Tables\Columns\TextColumn::make('name')
                ->label('Name')
                ->searchable()
                ->sortable(),

            Tables\Columns\TextColumn::make('price')
                ->label('Price')
                ->money('IDR', true)
                ->sortable(),

            Tables\Columns\TextColumn::make('created_at')
                ->label('Created')
                ->dateTime('d M Y H:i')
                ->sortable(),

            // Kolom tambahan, default-nya hidden (toggleable)
            Tables\Columns\TextColumn::make('engine_type')
                ->searchable()
                ->toggleable(isToggledHiddenByDefault: true),

            Tables\Columns\TextColumn::make('engine_size')
                ->searchable()
                ->toggleable(isToggledHiddenByDefault: true),

            Tables\Columns\TextColumn::make('max_power')
                ->searchable()
                ->toggleable(isToggledHiddenByDefault: true),

            Tables\Columns\TextColumn::make('max_torque')
                ->searchable()
                ->toggleable(isToggledHiddenByDefault: true),

            Tables\Columns\TextColumn::make('fuel_system')
                ->searchable()
                ->toggleable(isToggledHiddenByDefault: true),

            Tables\Columns\TextColumn::make('overall_length')
                ->searchable()
                ->toggleable(isToggledHiddenByDefault: true),

            Tables\Columns\TextColumn::make('overall_width')
                ->searchable()
                ->toggleable(isToggledHiddenByDefault: true),

            Tables\Columns\TextColumn::make('overall_height')
                ->searchable()
                ->toggleable(isToggledHiddenByDefault: true),

            Tables\Columns\TextColumn::make('battery')
                ->searchable()
                ->toggleable(isToggledHiddenByDefault: true),

            Tables\Columns\IconColumn::make('charging_port')
                ->boolean()
                ->toggleable(isToggledHiddenByDefault: true),

            Tables\Columns\TextColumn::make('updated_at')
                ->dateTime()
                ->sortable()
                ->toggleable(isToggledHiddenByDefault: true),

            Tables\Columns\TextColumn::make('deleted_at')
                ->dateTime()
                ->sortable()
                ->toggleable(isToggledHiddenByDefault: true),
        ])
        ->filters([
            Tables\Filters\TrashedFilter::make(),
        ])
        ->actions([
            Tables\Actions\EditAction::make(),
        ])
        ->bulkActions([
            Tables\Actions\BulkActionGroup::make([
                Tables\Actions\DeleteBulkAction::make(),
                Tables\Actions\ForceDeleteBulkAction::make(),
                Tables\Actions\RestoreBulkAction::make(),
            ]),
        ]);    
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
        return parent::getEloquentQuery()
            ->withoutGlobalScopes([
                SoftDeletingScope::class,
            ]);
    }
}
