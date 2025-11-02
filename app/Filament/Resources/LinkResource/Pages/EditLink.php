<?php

namespace App\Filament\Resources\LinkResource\Pages;

use App\Filament\Resources\LinkResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Arr;

class EditLink extends EditRecord
{
    protected static string $resource = LinkResource::class;

    protected function getHeaderActions(): array
    {
        return [
            // Actions\DeleteAction::make(),
        ];
    }

    /**
     * NOTE: use fully-qualified class names in the signature to avoid
     * Intelephense namespace resolution issues.
     *
     * @param  \Illuminate\Database\Eloquent\Model  $record
     * @param  array  $data
     * @return \Illuminate\Database\Eloquent\Model
     */
    protected function handleRecordUpdate(
        \Illuminate\Database\Eloquent\Model $record,
        array $data
    ): \Illuminate\Database\Eloquent\Model {
        if (($record->special_code ?? null) === 'gmap') {
            $lat = $data['latitude'] ?? null;
            $lng = $data['longitude'] ?? null;
            
            if ($lat && $lng) {
                $data['additional_parameter'] = "{$lat}, {$lng}";
            } else {
                if (! array_key_exists('additional_parameter', $data)) {
                    $data['additional_parameter'] = $record->additional_parameter;
                }
            }
        } else {
            if (! array_key_exists('additional_parameter', $data)) {
                $data['additional_parameter'] = $record->additional_parameter;
            }
        }

        Cache::forget('public_links');

        $record->update($data);

        return $record;
    }
}
