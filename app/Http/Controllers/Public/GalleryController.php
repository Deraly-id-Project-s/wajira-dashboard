<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class GalleryController extends Controller
{
    public function index()
    {
        // click tracker
        pageClickTracker('/gallery');
        
        return Inertia::render('Gallery/Index');
    }
}
