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
    Route::get('/links', [App\Http\Controllers\Public\LinkController::class, 'index'])->name('links');
    Route::get('/brands', [App\Http\Controllers\Public\BrandController::class, 'index'])->name('brands');
});

require __DIR__.'/auth.php';
