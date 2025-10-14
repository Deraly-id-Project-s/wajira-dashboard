<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Commodity extends Model
{
    use SoftDeletes;
    
    protected $table = 'commodities';

    protected $fillable = [
        'brand_id',
        'slug',
        'name',
        'price',
        'deleted_at',
    ];

    public function brand()
    {
        return $this->belongsTo(Brand::class);
    }
}
