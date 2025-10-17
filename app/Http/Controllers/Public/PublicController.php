<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Traits\ResponseTrait;
use Illuminate\Http\Request;
use App\Models\Link;
use App\Models\Brand;
use App\Models\Banner;
use App\Models\Gallery;

class PublicController extends Controller
{
    use ResponseTrait;

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data['brands'] = Brand::all();
        $data['banners'] = Banner::whereNot('is_show', 0)->get();
        $data['links'] = Link::whereNot('is_show', 0)->get();
        $data['galleries'] = Gallery::orderBy('order', 'asc')->get();
        
        return $this->responseSuccess($data, 'success');
    }
}
