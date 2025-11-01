<?php

namespace App\Filament\Resources;

use App\Models\Banner;
use Filament\Forms\Form;
use Filament\Tables\Table;
use Filament\Resources\Resource;
use Illuminate\Support\Facades\Gate;
use Filament\Forms\Components\Toggle;
use Illuminate\Support\Facades\Cache;
use Filament\Forms\Components\Section;
use Filament\Support\Enums\FontWeight;
use Filament\Forms\Components\Textarea;
use Filament\Tables\Columns\TextColumn;
use Filament\Forms\Components\TextInput;
use Filament\Tables\Columns\ImageColumn;
use Filament\Forms\Components\FileUpload;
use Filament\Tables\Columns\Layout\Panel;
use Filament\Tables\Columns\Layout\Split;
use Filament\Tables\Columns\Layout\Stack;
use Filament\Tables\Columns\ToggleColumn;
use App\Filament\Resources\BannerResource\Pages;

class BannerResource extends Resource
{
    protected static ?string $model = Banner::class;

    protected static string $name = 'brand';

    protected static ?string $navigationIcon = 'heroicon-o-photo';
    protected static ?string $navigationGroup = 'Media';
    protected static ?int $navigationSort = 5;

    public static function clearCache()
    {
        Cache::forget('public_banners');
        Cache::forget('public_banners');
    }

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Section::make('Banner Image')
                    ->description('Upload image and provide alternative text for accessibility.')
                    ->icon('heroicon-o-photo')
                    ->schema([
                        FileUpload::make('image')
                            ->disk('public')
                            ->directory('banners')
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
                            ->placeholder('Enter banner title')
                            ->required()
                            ->maxLength(255),

                        TextInput::make('alt')
                            ->label('Alt Text')
                            ->placeholder('Describe the banner for accessibility')
                            ->required()
                            ->maxLength(255),

                        Toggle::make('is_show')
                            ->label('Show on website')
                            ->default(true),

                        Textarea::make('description')
                            ->label('Description')
                            ->placeholder('Optional description of this banner...')
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
                            ->weight(FontWeight::Bold)
                            ->label('Title'),

                        TextColumn::make('alt')
                            ->color('gray')
                            ->label('Alt Text'),

                        TextColumn::make('description')
                            ->color('gray')
                            ->lineClamp(2)
                            ->label('Description'),
                    ]),
                ])->space(3),

                Panel::make([
                    Split::make([
                        ToggleColumn::make('is_show')
                            ->label('Visible')
                            ->grow(false),
                    ]),
                ])
                ->collapsible(true)
                ->collapsed(false),
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
            ])
            ->defaultSort('created_at', 'desc');
    }

    public static function getRelations(): array
    {
        return [];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListBanners::route('/'),
            'create' => Pages\CreateBanner::route('/create'),
            'edit' => Pages\EditBanner::route('/{record}/edit'),
        ];
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
