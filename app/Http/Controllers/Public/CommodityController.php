<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class CommodityController extends Controller
{
    public function index()
    {
        return Inertia::render('Commodity/Index');
    }
}
