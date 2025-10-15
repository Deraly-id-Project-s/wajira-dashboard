<?php

namespace App\Filament\Resources;

use App\Filament\Resources\UserResource\Pages;
use App\Models\User;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Split;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Filters\TernaryFilter;
use Filament\Tables\Table;
use Illuminate\Support\Facades\Hash;

class UserResource extends Resource
{
    protected static ?string $model = User::class;

    // navigation naming
    protected static ?string $pluralLabel = 'Users';

    protected static ?string $label = 'User';

    protected static ?string $navigationIcon = 'heroicon-o-user-group';

    protected static ?string $navigationGroup = 'Account Management';

    protected static ?int $navigationSort = 7;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Split::make([
                    Section::make('User Avatar')
                        ->schema([
                            FileUpload::make('avatar')
                                ->image()
                                ->hiddenLabel()
                                ->required()
                                ->maxSize(1024)
                                ->imageCropAspectRatio('1:1')
                                ->imageResizeTargetHeight(512)
                                ->imageResizeTargetWidth(512)
                                ->imageEditor()
                                ->hintIcon('heroicon-o-information-circle', tooltip: 'Maximum image size is 1MB with extensions jpg, png, jpeg'),
                        ])->grow(false),
                    Section::make('User Information')
                        ->schema([
                            TextInput::make('name')
                                ->required()
                                ->placeholder('User Name')
                                ->maxLength(255),
                            TextInput::make('email')
                                ->email()
                                ->placeholder('User Email')
                                ->required()
                                ->unique(ignoreRecord: true)
                                ->maxLength(255),
                            Select::make('roles')
                                ->relationship('roles', 'name')
                                ->required()
                                ->label('User Role')
                                ->searchable()
                                ->preload(),
                            Toggle::make('is_active')
                                ->label('Active Status')
                                ->default(true)
                                ->disabled(fn($record) => $record && $record->hasRole('administrator'))
                                ->hint('Administrator account cannot be deactivated'),
                            TextInput::make('password')
                                ->password()
                                ->placeholder('User Password')
                                ->label('Password')
                                ->required(fn(string $context): bool => $context === 'create')
                                ->revealable()
                                ->autocomplete('new-password')
                                ->maxLength(255)
                                ->dehydrated(fn($state) => filled($state))
                                ->dehydrateStateUsing(fn($state) => Hash::make($state)),
                            TextInput::make('password_confirmation')
                                ->password()
                                ->placeholder('Confirm User Password')
                                ->label('Confirm Password')
                                ->required(fn(string $context): bool => $context === 'create')
                                ->revealable()
                                ->autocomplete('new-password')
                                ->maxLength(255)
                                ->same('password')
                                ->dehydrated(false),
                        ]),
                ])->columnSpanFull(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                ImageColumn::make('avatar')
                    ->label('Avatar')
                    ->circular(),
                TextColumn::make('name')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('email')
                    ->searchable()
                    ->sortable(),
                IconColumn::make('is_active')
                    ->label('Active Status')
                    ->boolean(),
                TextColumn::make('roles.name')
                    ->label('Role')
                    ->formatStateUsing(fn($state) => strtoupper($state))
                    ->badge(),
                TextColumn::make('created_at')
                    ->label('Created At')
                    ->dateTime('d M Y')
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('updated_at')
                    ->label('Updated At')
                    ->dateTime('d M Y')
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                SelectFilter::make('roles')
                    ->relationship('roles', 'name')
                    ->label('Role'),
            ])
            ->actions([
                Tables\Actions\EditAction::make()
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
            'index' => Pages\ListUsers::route('/'),
            'create' => Pages\CreateUser::route('/create'),
            'edit' => Pages\EditUser::route('/{record}/edit'),
        ];
    }
}