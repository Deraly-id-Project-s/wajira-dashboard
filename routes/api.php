<?php

use Illuminate\Support\Facades\Route;

// routes/api.php
use App\Http\Controllers\Public\PublicController;

Route::post('/page-visitor', [PublicController::class, 'pageVisitor']);

Route::get('/search-data', [PublicController::class, 'searchBox']);