<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class AboutUsController extends Controller
{
    public function index()
    {
        // click tracker
        pageClickTracker('/about-us');
        
        return Inertia::render('AboutUs/Index');
    }
}
