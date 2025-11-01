<?php

namespace App\Filament\Widgets;

use Filament\Widgets\Widget;
use Illuminate\Support\Facades\Http;

class QuoteCard extends Widget
{
    protected static string $view = 'filament.widgets.quote-card';
    protected static ?int $sort = 2;

    public ?array $quoteData = null;

    public function mount(): void
    {
        try {
            $response = Http::withHeaders([
                'X-Api-Key' => 'z7ec9rm4pIUYu9COIexdwQ==F1qCMHhNjWMrPoOZ',
            ])->get('https://api.api-ninjas.com/v1/quotes');

            if ($response->successful()) {
                $this->quoteData = $response->json()[0] ?? null;
            } else {
                $this->quoteData = [
                    'quote' => 'Failed to fetch quote.',
                    'author' => 'System',
                ];
            }
        } catch (\Throwable $e) {
            $this->quoteData = [
                'quote' => 'Error connecting to API.',
                'author' => 'System',
            ];
        }
    }
}
