<?php

namespace App\Filament\Resources;

use Filament\Forms;
use App\Models\Link;
use Filament\Tables;
use Filament\Forms\Form;
use Filament\Tables\Table;
use Filament\Resources\Resource;
use Illuminate\Support\Facades\Gate;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Components\Section;
use Filament\Tables\Columns\TextColumn;
use Filament\Forms\Components\TextInput;
use Filament\Tables\Columns\BadgeColumn;
use Illuminate\Database\Eloquent\Builder;
use App\Filament\Resources\LinkResource\Pages;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use App\Filament\Resources\LinkResource\RelationManagers;

class LinkResource extends Resource
{
    protected static ?string $model = Link::class;

    protected static ?string $navigationIcon = 'heroicon-o-link';

    protected static string $name = 'link';

    protected static ?string $navigationGroup = 'Other';

    protected static ?int $navigationSort = 6;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Section::make('Platform Information')
                    ->schema([
                        TextInput::make('platform_name')
                            ->label('Platform')
                            ->placeholder('Example: Instagram')
                            ->required()
                            ->maxLength(100),

                        TextInput::make('url')
                            ->label('URL')
                            ->placeholder('https://www.instagram.com/...')
                            ->required()
                            ->url(),

                        Toggle::make('is_show')
                            ->label('Show on website')
                            ->default(true),
                    ])
                    ->columns(2),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('platform_name')
                    ->label('Platform')
                    ->sortable()
                    ->searchable(),

                TextColumn::make('url')
                    ->label('URL')
                    ->formatStateUsing(fn($state) => e($state))
                    ->url(fn($record) => $record->url, true) 
                    ->copyable()
                    ->copyMessage('URL successfully copied!')
                    ->limit(50),

                BadgeColumn::make('is_show')
                    ->label('Status')
                    ->colors([
                        'success' => fn($state): bool => $state === true,
                        'danger' => fn($state): bool => $state === false,
                    ])
                    ->formatStateUsing(fn($state) => $state ? 'Show' : 'Hidden'),
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                // Tables\Actions\BulkActionGroup::make([
                //     Tables\Actions\DeleteBulkAction::make(),
                // ]),
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
            'index' => Pages\ListLinks::route('/'),
            'create' => Pages\CreateLink::route('/create'),
            'edit' => Pages\EditLink::route('/{record}/edit'),
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
