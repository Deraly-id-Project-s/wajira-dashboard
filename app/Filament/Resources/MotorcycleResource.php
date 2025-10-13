<?php

namespace App\Filament\Resources;

use App\Filament\Resources\MotorcycleResource\Pages;
use App\Filament\Resources\MotorcycleResource\RelationManagers;
use App\Models\Motorcycle;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class MotorcycleResource extends Resource
{
    protected static ?string $model = Motorcycle::class;

    protected static ?string $navigationIcon = 'heroicon-o-squares-2x2';

    protected static ?string $navigationGroup = 'Products';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('brand_id')
                    ->numeric(),
                Forms\Components\TextInput::make('slug')
                    ->required()
                    ->maxLength(255),
                Forms\Components\TextInput::make('name')
                    ->required()
                    ->maxLength(255),
                Forms\Components\FileUpload::make('product_image')
                    ->image(),
                Forms\Components\TextInput::make('product_color')
                    ->maxLength(255),
                Forms\Components\TextInput::make('product_360')
                    ->maxLength(255),
                Forms\Components\TextInput::make('engine_type')
                    ->maxLength(255),
                Forms\Components\TextInput::make('engine_size')
                    ->maxLength(255),
                Forms\Components\TextInput::make('displacement')
                    ->maxLength(255),
                Forms\Components\TextInput::make('compression_ratio')
                    ->maxLength(255),
                Forms\Components\TextInput::make('max_power')
                    ->maxLength(255),
                Forms\Components\TextInput::make('max_torque')
                    ->maxLength(255),
                Forms\Components\TextInput::make('clutch')
                    ->maxLength(255),
                Forms\Components\TextInput::make('starter')
                    ->maxLength(255),
                Forms\Components\TextInput::make('spark_plug')
                    ->maxLength(255),
                Forms\Components\TextInput::make('fuel_system')
                    ->maxLength(255),
                Forms\Components\TextInput::make('ignition_system')
                    ->maxLength(255),
                Forms\Components\TextInput::make('frame_type'),
                Forms\Components\TextInput::make('front_suspension')
                    ->maxLength(255),
                Forms\Components\TextInput::make('rear_suspension')
                    ->maxLength(255),
                Forms\Components\TextInput::make('tire_type'),
                Forms\Components\TextInput::make('front_tire')
                    ->maxLength(255),
                Forms\Components\TextInput::make('rear_tire')
                    ->maxLength(255),
                Forms\Components\TextInput::make('front_brake')
                    ->maxLength(255),
                Forms\Components\TextInput::make('lubrication_system')
                    ->maxLength(255),
                Forms\Components\TextInput::make('overall_length')
                    ->maxLength(255),
                Forms\Components\TextInput::make('overall_width')
                    ->maxLength(255),
                Forms\Components\TextInput::make('overall_height')
                    ->maxLength(255),
                Forms\Components\TextInput::make('wheelbase')
                    ->maxLength(255),
                Forms\Components\TextInput::make('ground_clearance')
                    ->maxLength(255),
                Forms\Components\TextInput::make('seat_height')
                    ->maxLength(255),
                Forms\Components\TextInput::make('curb_weight')
                    ->maxLength(255),
                Forms\Components\TextInput::make('tank_capacity')
                    ->maxLength(255),
                Forms\Components\TextInput::make('battery')
                    ->maxLength(255),
                Forms\Components\TextInput::make('headlight')
                    ->maxLength(255),
                Forms\Components\TextInput::make('taillight')
                    ->maxLength(255),
                Forms\Components\TextInput::make('turn_signal')
                    ->maxLength(255),
                Forms\Components\Toggle::make('charging_port'),
                Forms\Components\TextInput::make('price')
                    ->required()
                    ->numeric()
                    ->default(0)
                    ->prefix('$'),
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
                Tables\Columns\ImageColumn::make('product_image'),
                Tables\Columns\TextColumn::make('product_color')
                    ->searchable(),
                Tables\Columns\TextColumn::make('product_360')
                    ->searchable(),
                Tables\Columns\TextColumn::make('engine_type')
                    ->searchable(),
                Tables\Columns\TextColumn::make('engine_size')
                    ->searchable(),
                Tables\Columns\TextColumn::make('displacement')
                    ->searchable(),
                Tables\Columns\TextColumn::make('compression_ratio')
                    ->searchable(),
                Tables\Columns\TextColumn::make('max_power')
                    ->searchable(),
                Tables\Columns\TextColumn::make('max_torque')
                    ->searchable(),
                Tables\Columns\TextColumn::make('clutch')
                    ->searchable(),
                Tables\Columns\TextColumn::make('starter')
                    ->searchable(),
                Tables\Columns\TextColumn::make('spark_plug')
                    ->searchable(),
                Tables\Columns\TextColumn::make('fuel_system')
                    ->searchable(),
                Tables\Columns\TextColumn::make('ignition_system')
                    ->searchable(),
                Tables\Columns\TextColumn::make('frame_type'),
                Tables\Columns\TextColumn::make('front_suspension')
                    ->searchable(),
                Tables\Columns\TextColumn::make('rear_suspension')
                    ->searchable(),
                Tables\Columns\TextColumn::make('tire_type'),
                Tables\Columns\TextColumn::make('front_tire')
                    ->searchable(),
                Tables\Columns\TextColumn::make('rear_tire')
                    ->searchable(),
                Tables\Columns\TextColumn::make('front_brake')
                    ->searchable(),
                Tables\Columns\TextColumn::make('lubrication_system')
                    ->searchable(),
                Tables\Columns\TextColumn::make('overall_length')
                    ->searchable(),
                Tables\Columns\TextColumn::make('overall_width')
                    ->searchable(),
                Tables\Columns\TextColumn::make('overall_height')
                    ->searchable(),
                Tables\Columns\TextColumn::make('wheelbase')
                    ->searchable(),
                Tables\Columns\TextColumn::make('ground_clearance')
                    ->searchable(),
                Tables\Columns\TextColumn::make('seat_height')
                    ->searchable(),
                Tables\Columns\TextColumn::make('curb_weight')
                    ->searchable(),
                Tables\Columns\TextColumn::make('tank_capacity')
                    ->searchable(),
                Tables\Columns\TextColumn::make('battery')
                    ->searchable(),
                Tables\Columns\TextColumn::make('headlight')
                    ->searchable(),
                Tables\Columns\TextColumn::make('taillight')
                    ->searchable(),
                Tables\Columns\TextColumn::make('turn_signal')
                    ->searchable(),
                Tables\Columns\IconColumn::make('charging_port')
                    ->boolean(),
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
            'index' => Pages\ListMotorcycles::route('/'),
            'create' => Pages\CreateMotorcycle::route('/create'),
            'edit' => Pages\EditMotorcycle::route('/{record}/edit'),
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
