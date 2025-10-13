<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Commodity extends Model
{
    protected $table = 'commodities';

    protected $fillable = [
        'brand_id',
        'slug',
        'name',
        'price',
        'deleted_at',
    ];
}
