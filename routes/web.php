<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Public\HomeController;
use App\Http\Controllers\Public\BrandController;
use App\Http\Controllers\Public\PublicController;
use App\Http\Controllers\Public\AboutUsController;
use App\Http\Controllers\Public\GalleryController;
use App\Http\Controllers\Public\LanguageController;
use App\Http\Controllers\Public\CommodityController;
use App\Http\Controllers\Public\MotorcycleController;

// Homepage
Route::get('/', [HomeController::class, 'index'])->name('home');

// Motorcycle
Route::resource('/products/motorcycles', MotorcycleController::class);

// Commodity
Route::get('/commodity', [CommodityController::class, 'index'])->name('commodity');
Route::get('/commodity/{slug}', [CommodityController::class, 'index'])->name('commodity.with-slug');

// Abous Us
Route::get('/about-us', [AboutUsController::class, 'index'])->name('about-us');

// Gallery
Route::get('/gallery', [GalleryController::class, 'index'])->name('gallery');

Route::get('/brand/{slug}', [BrandController::class, 'show'])->name('brand.show');

Route::post('/set-language', [LanguageController::class, 'setLanguage'])->name('set.language');

require __DIR__.'/auth.php';
