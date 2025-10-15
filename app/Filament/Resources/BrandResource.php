<?php

namespace App\Filament\Resources;

use Filament\Forms;
use Filament\Tables;
use App\Models\Brand;
use Filament\Forms\Set;
use Filament\Forms\Form;
use Filament\Tables\Table;
use Illuminate\Support\Str;
use Filament\Resources\Resource;
use Filament\Forms\Components\Split;
use Filament\Forms\Components\Section;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\ImageColumn;
use Filament\Forms\Components\FileUpload;
use Illuminate\Database\Eloquent\Builder;
use App\Filament\Resources\BrandResource\Pages;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use App\Filament\Resources\BrandResource\RelationManagers;

class BrandResource extends Resource
{
    protected static ?string $model = Brand::class;

    protected static ?string $navigationIcon = 'heroicon-o-cube';

    protected static ?string $navigationGroup = 'Brands';

    protected static ?int $navigationSort = 1;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Split::make([
                    Section::make('Brand Avatar')
                    ->schema([
                        FileUpload::make('logo')
                            ->image()
                            ->label('Brand Logo')
                            ->required()
                            ->maxSize(1024)
                            ->imageEditor()
                            ->imageCropAspectRatio('1:1')
                            ->imageResizeTargetHeight(512)
                            ->imageResizeTargetWidth(512)
                            ->imageEditor()
                            ->hintIcon('heroicon-o-information-circle', tooltip: 'Maximum image size is 1MB with extensions jpg, png, jpeg'),
                        FileUpload::make('brand_banner')
                            ->image()
                            ->label('Brand Banner')
                            ->maxSize(1024)
                            ->imageResizeTargetHeight(512)
                            ->imageResizeTargetWidth(512)
                            ->imageEditor()
                            ->hintIcon('heroicon-o-information-circle', tooltip: 'Maximum image size is 3MB with extensions jpg, png, jpeg'),
                    ]),
                    Section::make('Brand Information')
                    ->schema([
                        Forms\Components\TextInput::make('name')
                            ->required()
                            ->maxLength(255)
                            ->disabled()
                            ->placeholder('Brand name')
                            ->live(onBlur: true)
                            ->afterStateUpdated(fn (Set $set, ?string $state) => $set('slug', Str::slug($state))),
                        Forms\Components\TextInput::make('slug')
                            ->required()
                            ->maxLength(255)
                            ->disabled() 
                            ->dehydrated()
                            ->placeholder('Brand Slug')
                            ->hintIcon('heroicon-o-information-circle', tooltip: 'Slug will be used for URL'),
                        Forms\Components\Textarea::make('description')
                        ->placeholder('Brand Description')
                        ->columnSpanFull(),
                    ])
                ])->columnSpanFull(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                ImageColumn::make('logo')
                    ->label('Brand Logo')
                    ->circular(),
                TextColumn::make('slug')
                    ->searchable(),
                TextColumn::make('name')
                    ->searchable(),
                TextColumn::make('description')
                    ->searchable()
                    ->separator('-'),
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
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
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
            'index' => Pages\ListBrands::route('/'),
            'create' => Pages\CreateBrand::route('/create'),
            'edit' => Pages\EditBrand::route('/{record}/edit'),
        ];
    }
}
