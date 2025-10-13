<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Brand extends Model
{
    protected $table = 'brands';

    protected $fillable = [
        'slug',
        'name',
        'logo',
        'brand_banner',
        'description',
    ];

    public function motorcycles()
    {
        return $this->hasMany(Motorcycle::class);
    }
}
