<?php

namespace App\Filament\Resources;

use Filament\Forms;
use Filament\Tables;
use Filament\Forms\Form;
use App\Models\Commodity;
use Filament\Tables\Table;
use Illuminate\Support\Str;
use Filament\Resources\Resource;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Illuminate\Database\Eloquent\Builder;
use App\Filament\Resources\CommodityResource\Pages;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use App\Filament\Resources\CommodityResource\RelationManagers;

class CommodityResource extends Resource
{
    protected static ?string $model = Commodity::class;

    protected static ?string $navigationIcon = 'heroicon-o-squares-2x2';

    protected static ?string $navigationGroup = 'Products';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
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
                
                        $count = Commodity::where('slug', 'LIKE', "{$baseSlug}%")->count();
                
                        $slug = $count > 0 ? "{$baseSlug}-{$count}" : $baseSlug;
                
                        $set('slug', $slug);
                    }),
                TextInput::make('slug')
                    ->required()
                    ->disabled()
                    ->dehydrated()
                    ->maxLength(255)
                    ->placeholder('Motorcycle Slug')
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
                    ->extraInputAttributes(['class' => 'text-right'])
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('brand_id')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('slug')
                    ->searchable(),
                Tables\Columns\TextColumn::make('name')
                    ->searchable(),
                Tables\Columns\TextColumn::make('price')
                    ->money()
                    ->sortable(),
                Tables\Columns\TextColumn::make('deleted_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                Tables\Columns\TextColumn::make('updated_at')
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
}
