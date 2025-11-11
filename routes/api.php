<?php

use Illuminate\Support\Facades\Route;

// routes/api.php
use App\Http\Controllers\Public\PublicController;

Route::post('/page-visitor', [PublicController::class, 'pageVisitor']);

Route::get('/search-data', [PublicController::class, 'searchBox']);

Route::get('/public', [PublicController::class, 'index'])->name('public');
Route::get('/commodities', [PublicController::class, 'commodity'])->name('public.commodity');
Route::get('/all-commodities', [PublicController::class, 'allCommodity'])->name('public.all-commodity');
Route::get('/motorcycles', [PublicController::class, 'motorcycle'])->name('public.motorcycle');
Route::get('/all-motorcycles', [PublicController::class, 'allMotorcycle'])->name('public.all-motorcycle');
Route::get('/motorcycle-recomendation', [PublicController::class, 'motorcycleRecomendation'])->name('public.motorcycle-recomendation');
