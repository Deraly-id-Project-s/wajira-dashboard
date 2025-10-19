<?php

namespace App\Http\Controllers\Public;

use Inertia\Inertia;
use App\Models\Motorcycle;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class MotorcycleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // click tracker
        pageClickTracker('/products/motorcycles');

        return Inertia::render('Products/Motorcycles/Index');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $slug)
    {
        // click tracker
        pageClickTracker('/products/motorcycles/detail');

        $motorcycle = Motorcycle::with('colors')->where('slug', $slug)->first();

        if ($motorcycle) {
            $motorcycle->click_count = $motorcycle->click_count + 1;
            $motorcycle->save();
        }
        
        return Inertia::render('Products/Motorcycles/Show')->with([
            'motorcycle' => $motorcycle
        ]);
    }
}
