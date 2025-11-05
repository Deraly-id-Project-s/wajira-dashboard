<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Traits\ResponseTrait;
use Illuminate\Http\Request;
use App\Models\Brand;
use Inertia\Inertia;

class BrandController extends Controller
{
    use ResponseTrait;

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $links = Brand::all();

        return $this->responseSuccess($links, 'success');
    }

    public function show($slug)
    {
        $brand = Brand::with('motorcycles')->where('slug', $slug)->first();

        return Inertia::render('Brand/Index')->with([
            'brand' => $brand
        ]);
    }
}
