<?php

namespace App\Filament\Resources;

use Filament\Forms;
use Filament\Tables;
use App\Models\Banner;
use Filament\Forms\Form;
use Filament\Tables\Table;
use Filament\Resources\Resource;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\Textarea;
use Filament\Tables\Columns\TextColumn;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\FileUpload;
use Illuminate\Database\Eloquent\Builder;
use App\Filament\Resources\BannerResource\Pages;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use App\Filament\Resources\BannerResource\RelationManagers;
use Filament\Tables\Columns\ToggleColumn;

class BannerResource extends Resource
{
    protected static ?string $model = Banner::class;

    protected static ?string $navigationIcon = 'heroicon-o-photo';

    protected static ?string $navigationGroup = 'Media';

    protected static ?int $navigationSort = 5;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Section::make('Banner Image')
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

                    Toggle::make('is_show')
                        ->label('Show on website')
                        ->default(true),

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
                TextColumn::make('title')
                    ->label('Title')
                    ->sortable()
                    ->searchable()
                    ->limit(30)
                    ->tooltip(fn ($record) => $record->title),

                TextColumn::make('alt')
                    ->label('Alt Text')
                    ->sortable()
                    ->searchable()
                    ->limit(30)
                    ->tooltip(fn ($record) => $record->alt),
                    
                ToggleColumn::make('is_show'),

                TextColumn::make('description')
                    ->label('Description')
                    ->limit(50)
                    ->wrap()
                    ->placeholder('-'),
            ])
            ->defaultSort('created_at', 'desc')
            ->striped()
            ->filters([])
            ->actions([
                Tables\Actions\EditAction::make(),
            ])
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
            'index' => Pages\ListBanners::route('/'),
            'create' => Pages\CreateBanner::route('/create'),
            'edit' => Pages\EditBanner::route('/{record}/edit'),
        ];
    }
}
