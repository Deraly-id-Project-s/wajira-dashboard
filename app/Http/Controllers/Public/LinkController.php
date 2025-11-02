<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Traits\ResponseTrait;
use Illuminate\Http\Request;
use App\Models\Link;
use Illuminate\Support\Facades\Cache;

class LinkController extends Controller
{
    use ResponseTrait;

    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $data = Cache::remember('public_links', now()->addHours(6), function () {
            return Link::whereNot('is_show', 0)->get();
        });
        
        return $this->responseSuccess($data, 'success');
    }
}
