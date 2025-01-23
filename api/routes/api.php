<?php

use App\Http\Controllers\ImagesController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::apiResource('/images', ImagesController::class);
});

require __DIR__ . '/auth.php';
