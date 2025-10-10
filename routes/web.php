<?php

use Illuminate\Support\Facades\Route;

// Homepage
Route::get('/', [App\Http\Controllers\Public\HomeController::class, 'index'])->name('home');

// Motorcycle
Route::resource('/products/motorcycles', App\Http\Controllers\Public\MotorcycleController::class);

// Abous Us
Route::get('/about-us', [App\Http\Controllers\Public\AboutUsController::class, 'index'])->name('about-us');

require __DIR__.'/auth.php';
