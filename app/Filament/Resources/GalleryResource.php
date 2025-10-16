<?php

namespace App\Filament\Resources;

use App\Models\Gallery;
use Filament\Forms\Form;
use Filament\Tables\Table;
use Filament\Resources\Resource;
use Filament\Forms\Components\Section;
use Filament\Support\Enums\FontWeight;
use Filament\Forms\Components\Textarea;
use Filament\Tables\Columns\TextColumn;
use Filament\Forms\Components\TextInput;
use Filament\Tables\Columns\ColorColumn;
use Filament\Tables\Columns\ImageColumn;
use Filament\Forms\Components\FileUpload;
use Filament\Tables\Columns\Layout\Panel;
use Filament\Tables\Columns\Layout\Split;
use Filament\Tables\Columns\Layout\Stack;
use App\Filament\Resources\GalleryResource\Pages;

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
                            ->disk('public')
                            ->directory('galleries')
                            ->getUploadedFileNameForStorageUsing(function ($file) {
                                return md5($file->getClientOriginalName() . microtime()) . '.' . $file->getClientOriginalExtension();
                            })
                            ->image()
                            ->imageEditor()
                            ->required()
                            ->maxSize(2048)
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
                Stack::make([
                    ImageColumn::make('image')
                        ->disk('public')
                        ->extraImgAttributes([
                            'style' => 'width:100%; height:auto; object-fit:cover; border-radius:10px;'
                        ])
                        ->label('Banner Image'),
                    Stack::make([
                        TextColumn::make('title')
                            ->weight(FontWeight::Bold),
                        TextColumn::make('url')
                            ->formatStateUsing(fn(string $state): string => str($state)->after('://')->ltrim('www.')->trim('/'))
                            ->color('gray')
                            ->lineClamp(1),
                    ]),
                ])
                ->space(3),
                Panel::make([
                    Split::make([
                        ColorColumn::make('color')
                            ->grow(false),
                        TextColumn::make('description')
                            ->color('gray')
                    ]),
                ])
                ->collapsible(true)
                ->collapsed(false),
            ])
            ->filters([
                //
            ])
            ->contentGrid([
                'md' => 2,
                'xl' => 3,
            ])
            ->paginated([
                18,
                36,
                72,
                'all',
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
            'index' => Pages\ListGalleries::route('/'),
            'create' => Pages\CreateGallery::route('/create'),
            'edit' => Pages\EditGallery::route('/{record}/edit'),
        ];
    }
}
