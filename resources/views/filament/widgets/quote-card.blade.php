<x-filament::widget>
    <x-filament::card class="bg-gradient-to-r from-indigo-500 to-blue-500 text-white">
        @if ($quoteData)
            <div class="text-md italic mb-2 font-Arima">"{{ $quoteData['quote'] }}"</div>
            <div class="text-right text-xs">- {{ $quoteData['author'] }}</div>
        @else
            <div>Loading quote...</div>
        @endif
    </x-filament::card>
</x-filament::widget>
