<?php

use Illuminate\Support\Facades\Route;

// Homepage
Route::get('/', [App\Http\Controllers\Public\HomeController::class, 'index'])->name('home');

// Motorcycle
Route::resource('/products/motorcycles', App\Http\Controllers\Public\MotorcycleController::class);

// Commodity
Route::get('/commodity', [App\Http\Controllers\Public\CommodityController::class, 'index'])->name('commodity');

// Abous Us
Route::get('/about-us', [App\Http\Controllers\Public\AboutUsController::class, 'index'])->name('about-us');

// Gallery
Route::get('/gallery', [App\Http\Controllers\Public\GalleryController::class, 'index'])->name('gallery');

// General API Resource
Route::group(['prefix' => 'api'], function () {
    Route::get('/public', [App\Http\Controllers\Public\PublicController::class, 'index'])->name('public');
    Route::get('/commodities', [App\Http\Controllers\Public\PublicController::class, 'commodity'])->name('public.commodity');
    Route::get('/all-commodities', [App\Http\Controllers\Public\PublicController::class, 'allCommodity'])->name('public.all-commodity');
    Route::get('/motorcycles', [App\Http\Controllers\Public\PublicController::class, 'motorcycle'])->name('public.motorcycle');
    Route::get('/all-motorcycles', [App\Http\Controllers\Public\PublicController::class, 'allMotorcycle'])->name('public.all-motorcycle');
});

require __DIR__.'/auth.php';
