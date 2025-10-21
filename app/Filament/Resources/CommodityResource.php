<?php

namespace App\Filament\Resources;

use Filament\Tables;
use Filament\Forms\Form;
use App\Models\Commodity;
use Filament\Tables\Table;
use Illuminate\Support\Str;
use Filament\Resources\Resource;
use Illuminate\Support\Facades\Gate;
use Filament\Forms\Components\Select;
use Illuminate\Support\Facades\Cache;
use Filament\Tables\Columns\TextColumn;
use Filament\Forms\Components\TextInput;
use Filament\Tables\Columns\ImageColumn;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\RichEditor;
use Illuminate\Database\Eloquent\Builder;
use App\Filament\Resources\CommodityResource\Pages;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class CommodityResource extends Resource
{
    protected static ?string $model = Commodity::class;

    protected static string $name = 'product';

    protected static ?string $navigationIcon = 'heroicon-o-squares-2x2';

    protected static ?string $navigationGroup = 'Products';

    protected static ?int $navigationSort = 3;
    
    public static function clearCache()
    {
        Cache::forget('public_commodity');
        Cache::forget('public_all_commodity');
    }


    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                FileUpload::make('image')
                    ->disk('public')
                    ->directory('commodities')
                    ->getUploadedFileNameForStorageUsing(function ($file) {
                        return md5($file->getClientOriginalName() . microtime()) . '.' . $file->getClientOriginalExtension();
                    })
                    ->image()
                    ->imageEditor(2)
                    ->required()
                    ->maxSize(2048)
                    ->imagePreviewHeight(500)
                    ->hint('Maximum size: 2MB (jpg, png, jpeg)')
                    ->columnSpanFull(),
                Select::make('brand_id')
                    ->placeholder('Brand')
                    ->relationship('brand', 'name')
                    ->required()
                    ->native(false),
                TextInput::make('name')
                    ->required()
                    ->maxLength(255)
                    ->placeholder('Commodity Name')
                    ->live(onBlur: true)
                    ->afterStateUpdated(function ($state, callable $set) {
                        $baseSlug = Str::slug($state);
                
                        $count = Commodity::where('slug', 'LIKE', "{$baseSlug}%")->count();
                
                        $slug = $count > 0 ? "{$baseSlug}-{$count}" : $baseSlug;
                
                        $set('slug', $slug);
                    }),
                TextInput::make('slug')
                    ->required()
                    ->disabled()
                    ->dehydrated()
                    ->maxLength(255)
                    ->placeholder('Commodity Slug')
                    ->hintIcon('heroicon-o-information-circle', tooltip: 'Slug will be used for URL'),
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
                    ->extraInputAttributes(['class' => 'text-right']),
                RichEditor::make('content')->columnSpanFull()
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                ImageColumn::make('image')
                    ->width(300)
                    ->height(180),
                TextColumn::make('brand.name')
                    ->sortable()
                    ->badge(),
                TextColumn::make('name')
                    ->searchable(),
                TextColumn::make('deleted_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                Tables\Filters\TrashedFilter::make(),
            ])
            ->actions([
                Tables\Actions\EditAction::make()->after(fn () => static::clearCache()),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make()->after(fn () => static::clearCache()),
                    Tables\Actions\ForceDeleteBulkAction::make()->after(fn () => static::clearCache()),
                    Tables\Actions\RestoreBulkAction::make()->after(fn () => static::clearCache()),
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
            'index' => Pages\ListCommodities::route('/'),
            'create' => Pages\CreateCommodity::route('/create'),
            'edit' => Pages\EditCommodity::route('/{record}/edit'),
        ];
    }

    public static function getEloquentQuery(): Builder
    {
        return parent::getEloquentQuery()
            ->withoutGlobalScopes([
                SoftDeletingScope::class,
            ]);
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
