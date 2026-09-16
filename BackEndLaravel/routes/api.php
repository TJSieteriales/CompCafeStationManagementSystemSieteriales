<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StationController;

Route::get('/stations', [StationController::class, 'index']);

Route::post('/stations', [StationController::class, 'store']);

Route::get('/stations/{id}', [StationController::class, 'show']);