<?php

use Illuminate\Support\Facades\Route;

// Homepage
Route::get('/', [App\Http\Controllers\Public\HomeController::class, 'index'])->name('home');

// Motorcycle
Route::resource('/products/motorcycles', App\Http\Controllers\Public\MotorcycleController::class);

require __DIR__.'/auth.php';
