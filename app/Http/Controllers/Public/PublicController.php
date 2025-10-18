<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Traits\ResponseTrait;
use Illuminate\Http\Request;
use App\Models\Link;
use App\Models\Brand;
use App\Models\Banner;
use App\Models\Commodity;
use App\Models\Gallery;
use App\Models\Motorcycle;

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
        $data['brands'] = Brand::all();
        $data['banners'] = Banner::whereNot('is_show', 0)->get();
        $data['links'] = Link::whereNot('is_show', 0)->get();
        $data['galleries'] = Gallery::orderBy('order', 'asc')->get();

        return $this->responseSuccess($data, 'success');
    }

    public function commodity()
    {
        $data = Commodity::select($this->commoditySimpleColumn)->latest()->limit(6)->get();

        return $this->responseSuccess($data, 'success');
    }

    public function motorcycle()
    {
        $data = Motorcycle::select($this->motorcycleSimpleColumn)->latest()->limit(6)->get();

        return $this->responseSuccess($data, 'success');
    }

    public function allCommodity()
    {
        $data = Motorcycle::select($this->commoditySimpleColumn)->all();

        return $this->responseSuccess($data, 'success');
    }

    public function allMotorcycle()
    {
        $data = Motorcycle::select($this->motorcycleSimpleColumn)->all();

        return $this->responseSuccess($data, 'success');
    }

    public function motorcycleRecomendation()
    {
        $data = Motorcycle::select($this->motorcycleSimpleColumn)->where('is_recomended', 1)->get();

        return $this->responseSuccess($data, 'success');
    }
}
