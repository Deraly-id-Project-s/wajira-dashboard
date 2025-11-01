<?php

namespace App\Filament\Resources\MotorcycleResource\Pages;

use App\Filament\Resources\MotorcycleResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditMotorcycle extends EditRecord
{
    protected static string $resource = MotorcycleResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make()->after(fn () => MotorcycleResource::clearCache()),
            Actions\ForceDeleteAction::make()->after(fn () => MotorcycleResource::clearCache()),
            Actions\RestoreAction::make()->after(fn () => MotorcycleResource::clearCache()),
        ];
    }
}
