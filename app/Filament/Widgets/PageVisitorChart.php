<?php

namespace App\Filament\Widgets;

use Filament\Widgets\ChartWidget;
use App\Models\PageVisitor;
use Illuminate\Support\Facades\DB;

class PageVisitorChart extends ChartWidget
{
    protected static ?string $heading = '📈 Page Visitor Statistics';

    public ?string $filter = '7_days'; // default filter

    protected static ?int $sort = 3;
    protected int|string|array $columnSpan = 'full';

    protected function getFilters(): ?array
    {
        return [
            '7_days' => 'Last 7 Days',
            '30_days' => 'Last 30 Days',
            'all' => 'All Time',
        ];
    }

    protected function getData(): array
    {
        $query = PageVisitor::query();

        if ($this->filter === '7_days') {
            $query->where('created_at', '>=', now()->subDays(7));
        } elseif ($this->filter === '30_days') {
            $query->where('created_at', '>=', now()->subDays(30));
        }

        // Ambil jumlah visitor per hari
        $data = $query
            ->select(
                DB::raw('DATE(created_at) as date'),
                DB::raw('COUNT(*) as total_visits')
            )
            ->groupBy('date')
            ->orderBy('date', 'asc')
            ->get();

        return [
            'datasets' => [
                [
                    'label' => 'Total Visitors',
                    'data' => $data->pluck('total_visits'),
                    'borderColor' => '#ef4444',
                    'backgroundColor' => 'rgba(239, 68, 68, 0.1)',
                    'tension' => 0.4,
                    'fill' => true,
                ],
            ],
            'labels' => $data->pluck('date'),
        ];
    }

    protected function getType(): string
    {
        return 'line';
    }
}
