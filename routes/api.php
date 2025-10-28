<?php

use Illuminate\Support\Facades\Route;

// routes/api.php
use App\Http\Controllers\Public\PublicController;

Route::get('/test', function() {
    return  response()->json(['message' => 'pekok'], 200);
});

Route::post('/page-visitor', [PublicController::class, 'pageVisitor']);
