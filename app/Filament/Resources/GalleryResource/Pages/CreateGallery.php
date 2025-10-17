<?php

namespace App\Filament\Resources\GalleryResource\Pages;

use Filament\Actions;
use App\Models\Gallery;
use Filament\Resources\Pages\CreateRecord;
use App\Filament\Resources\GalleryResource;

class CreateGallery extends CreateRecord
{
    protected static string $resource = GalleryResource::class;

    protected function mutateFormDataBeforeCreate(array $data): array
    {
        if (empty($data['order'])) {
            $maxOrder = Gallery::max('order');
            $data['order'] = $maxOrder ? $maxOrder + 1 : 1;
        }

        return $data;
    }
}
