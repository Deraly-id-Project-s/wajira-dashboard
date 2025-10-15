<?php

namespace App\Filament\Resources;

use Filament\Forms;
use Filament\Tables;
use App\Models\Gallery;
use Filament\Forms\Form;
use Filament\Tables\Table;
use Filament\Resources\Resource;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\Textarea;
use Filament\Tables\Columns\TextColumn;
use Filament\Forms\Components\TextInput;
use Filament\Tables\Columns\ImageColumn;
use Filament\Forms\Components\FileUpload;
use Illuminate\Database\Eloquent\Builder;
use App\Filament\Resources\GalleryResource\Pages;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use App\Filament\Resources\GalleryResource\RelationManagers;

class GalleryResource extends Resource
{
    protected static ?string $model = Gallery::class;

    protected static ?string $navigationIcon = 'heroicon-o-photo';

    protected static ?string $navigationGroup = 'Media';

    protected static ?int $navigationSort = 6;

    public static function form(Form $form): Form
    {
        return $form
        ->schema([
            Section::make('Gallery Image')
                ->description('Upload image and provide alternative text for accessibility.')
                ->icon('heroicon-o-photo')
                ->schema([
                    FileUpload::make('image')
                        ->image()
                        ->label('Upload Image')
                        ->required()
                        ->maxSize(2048)
                        ->imageEditor()
                        ->imageResizeMode('contain')
                        ->imageCropAspectRatio('16:9')
                        ->hint('Maximum size: 2MB (jpg, png, jpeg)')
                        ->columnSpanFull(),

                    TextInput::make('title')
                        ->label('Title')
                        ->placeholder('Enter image title')
                        ->required()
                        ->maxLength(255),

                    TextInput::make('alt')
                        ->label('Alt Text')
                        ->placeholder('Describe the image for accessibility')
                        ->required()
                        ->maxLength(255),

                    Textarea::make('description')
                        ->label('Description')
                        ->placeholder('Optional description of this image...')
                        ->rows(3)
                        ->autosize()
                        ->maxLength(500)
                        ->columnSpanFull(),
                ])
                ->columns(2)
                ->collapsible(),
        ]);
    }

    public static function table(Table $table): Table
{
    return $table
        ->columns([
            Tables\Columns\Layout\Grid::make(3) // 3 cards per row
                ->schema([
                    Card::make()
                        ->schema([
                            Tables\Columns\ImageColumn::make('image')
                                ->label('Banner')
                                ->height('200px')
                                ->width('100%')
                                ->extraImgAttributes(['class' => 'rounded-xl object-cover'])
                                ->grow(),

                            Tables\Columns\TextColumn::make('title')
                                ->label('Title')
                                ->weight('bold')
                                ->alignCenter()
                                ->wrap()
                                ->limit(40),

                            Tables\Columns\TextColumn::make('alt')
                                ->label('Alt Text')
                                ->color('gray')
                                ->alignCenter()
                                ->limit(40)
                                ->tooltip(fn ($record) => $record->alt),

                            Tables\Columns\TextColumn::make('description')
                                ->label('Description')
                                ->size('sm')
                                ->wrap()
                                ->color('gray')
                                ->limit(60)
                                ->placeholder('-'),
                        ])
                        ->footerActions([
                            Tables\Actions\EditAction::make()
                                ->label('Edit')
                                ->button()
                                ->size('sm')
                                ->icon('heroicon-m-pencil-square'),
                        ]),
                ]),
        ])
        ->defaultSort('created_at', 'desc')
        ->contentGrid([
            'md' => 2,
            'xl' => 3,
        ])
        ->filters([])
        ->actions([])
        ->bulkActions([]);
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
            'index' => Pages\ListGalleries::route('/'),
            'create' => Pages\CreateGallery::route('/create'),
            'edit' => Pages\EditGallery::route('/{record}/edit'),
        ];
    }
}
