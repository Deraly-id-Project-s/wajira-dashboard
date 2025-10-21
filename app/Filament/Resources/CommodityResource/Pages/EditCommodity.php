<?php

namespace App\Filament\Resources\CommodityResource\Pages;

use App\Filament\Resources\CommodityResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditCommodity extends EditRecord
{
    protected static string $resource = CommodityResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make()->after(fn () => CommodityResource::clearCache()),
            Actions\ForceDeleteAction::make()->after(fn () => CommodityResource::clearCache()),
            Actions\RestoreAction::make()->after(fn () => CommodityResource::clearCache()),
        ];
    }
}
