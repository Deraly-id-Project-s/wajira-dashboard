<?php

namespace App\Http\Controllers\Public;

use App\Models\Link;
use App\Models\Brand;
use App\Models\Banner;
use App\Models\Gallery;
use App\Models\Commodity;
use App\Models\Motorcycle;
use App\Traits\ResponseTrait;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Cache;
// use Illuminate\Support\Facades\Request;
use Illuminate\Http\Request;


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

    public function allMotorcycle(Request $request)
    {
        $query = Motorcycle::select($this->motorcycleSimpleColumn);

        if ($request->has('search') && !empty($request->search)) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        switch ($request->get('sort')) {
            case 'latest':
                $query->orderBy('created_at', 'desc');
                break;
            case 'az':
                $query->orderBy('name', 'asc');
                break;
            default:
                $query->orderBy('click_count', 'asc');
                break;
        }

        $perPage = $request->get('per_page', 6);
        $data = $query->paginate($perPage);

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

    public function pageVisitor(Request $request)
    {
        $session_id      = $request->input('session_id');
        $ip_address      = $request->input('ip_address');
        $user_agent      = $request->userAgent();
        $platform        = php_uname('s');
        $url_visited     = $request->input('url_visited', url()->current());
        $referrer        = $request->input('referrer');
        $country         = $request->input('country') ?? 'Unknown';

        if (function_exists('pageVisitor')) {
            return pageVisitor($session_id, $ip_address, $user_agent, $platform, $url_visited, $referrer, $country);
        }

        return false;
    }
}
