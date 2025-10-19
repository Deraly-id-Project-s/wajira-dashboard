<?php

namespace App\Filament\Resources;

use Filament\Forms;
use Filament\Tables;
use Filament\Forms\Form;
use Filament\Tables\Table;
use Illuminate\Support\Str;
use Filament\Resources\Resource;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Gate;
use Filament\Forms\Components\Select;
use Filament\Tables\Columns\TextColumn;
use Filament\Forms\Components\TextInput;
use Illuminate\Database\Eloquent\Builder;
use App\Filament\Resources\RoleResource\Pages;

class RoleResource extends Resource
{
    protected static ?string $model = Role::class;

    protected static string $name = 'users';

    protected static ?string $navigationIcon = 'heroicon-o-shield-check';

    protected static ?string $navigationGroup = 'Account Management';

    protected static ?int $navigationSort = 8;

    public static function getEloquentQuery(): Builder
    {
        return parent::getEloquentQuery()
            ->withCount('permissions');
    }

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                TextInput::make('name')
                    ->placeholder('Role Name')
                    ->label('Role Name')
                    ->minLength(3)
                    ->maxLength(255)
                    ->required()
                    ->prefixIcon('heroicon-o-user-circle')
                    ->columnSpanFull()
                    ->unique(ignoreRecord: true),
                Select::make('permissions')
                    ->multiple()
                    ->relationship('permissions', 'name')
                    ->searchable()
                    ->preload()
                    ->columnSpanFull()
                    ->label('Permissions')
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('name')
                ->label('Role Name')
                ->getStateUsing(fn (Role $record): string => Str::upper($record->name))
                ->sortable(),
                
                TextColumn::make('created_at')
                ->label('Created At')
                ->getStateUsing(fn (Role $record): string => $record->created_at->diffForHumans()),

                TextColumn::make('permissions_count')
                ->label('Total Permissions')
                ->badge()
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make()
                ->label('Edit')
                ->button()
                ->outlined(),
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
            'index' => Pages\ListRoles::route('/'),
            'create' => Pages\CreateRole::route('/create'),
            'edit' => Pages\EditRole::route('/{record}/edit'),
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