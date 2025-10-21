<?php

namespace App\Http\Controllers\Public;

use App\Models\Link;
use App\Models\Brand;
use App\Models\Banner;
use App\Models\Commodity;
use App\Models\Gallery;
use App\Models\Motorcycle;
use App\Traits\ResponseTrait;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Cache;

class PublicController extends Controller
{
    use ResponseTrait;

    protected $motorcycleSimpleColumn = ['id', 'brand_id', 'slug', 'name', 'product_image', 'is_recomended'];
    protected $commoditySimpleColumn = ['id', 'brand_id', 'slug', 'name', 'image', 'content'];

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data['brands'] = Cache::remember('public_brands', now()->addHours(6), function () {
            return Brand::all();
        });

        $data['banners'] = Cache::remember('public_banners', now()->addHours(6), function () {
            return Banner::whereNot('is_show', 0)->get();
        });

        $data['links'] = Cache::remember('public_links', now()->addHours(6), function () {
            return Link::whereNot('is_show', 0)->get();
        });

        $data['galleries'] = Cache::remember('public_galleries', now()->addHours(6), function () {
            return Gallery::orderBy('order', 'asc')->get();
        });

        return $this->responseSuccess($data, 'success');
    }

    public function commodity()
    {
        $data = Cache::remember('public_commodity', now()->addHours(6), function () {
            return Commodity::select($this->commoditySimpleColumn)->latest()->limit(6)->get();
        });

        return $this->responseSuccess($data, 'success');
    }

    public function motorcycle()
    {
        $data = Cache::remember('public_motorcycle', now()->addHours(6), function () {
            return Motorcycle::select($this->motorcycleSimpleColumn)->latest()->limit(6)->get();
        });

        return $this->responseSuccess($data, 'success');
    }

    public function allCommodity()
    {
        $data = Cache::remember('public_all_commodity', now()->addHours(6), function () {
            return Commodity::select($this->commoditySimpleColumn)->get();
        });

        return $this->responseSuccess($data, 'success');
    }

    public function allMotorcycle()
    {
        $data = Cache::remember('public_all_motorcycle', now()->addHours(6), function () {
            return Motorcycle::select($this->motorcycleSimpleColumn)->get();
        });

        return $this->responseSuccess($data, 'success');
    }

    public function motorcycleRecomendation()
    {
        $data = Cache::remember('public_motorcycle_recommendation', now()->addHours(6), function () {
            return Motorcycle::select($this->motorcycleSimpleColumn)
                ->where('is_recomended', 1)
                ->get();
        });

        return $this->responseSuccess($data, 'success');
    }

    public function getMotorcyleAsset($slug)
    {
        $data = Motorcycle::where('slug', $slug)->with('colors')->select('image')->get();

        return $this->responseSuccess($data, 'success');
    }
}
