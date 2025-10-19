<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;

class HomeController extends Controller
{
    public function index()
    {
        // click tracker
        pageClickTracker('/');

        return Inertia::render('Main');
    }
}
