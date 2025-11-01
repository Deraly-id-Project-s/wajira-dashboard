<?php

namespace App\Filament\Widgets;

use Filament\Widgets\ChartWidget;

use App\Models\PageVisitor;
use Illuminate\Support\Facades\DB;

class PageVisitorCountryChart extends ChartWidget
{
    protected static ?string $heading = 'Visitors by Country';

    // protected static ?int $sort = 4;
    protected int|string|array $columnSpan = 'full';

    protected function getData(): array
    {
        $data = PageVisitor::query()
            ->select('country', DB::raw('count(*) as total'))
            ->groupBy('country')
            ->orderBy('total', 'desc')
            ->get();

        return [
            'datasets' => [
                [
                    'label' => 'Visitors',
                    'data' => $data->map(fn ($value) => $value->total),
                ],
            ],
            'labels' => $data->map(fn ($value) => $value->country),
        ];
    }

    protected function getType(): string
    {
        return 'bar';
    }
}
