<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MotorcycleColor extends Model
{
    protected $table = 'motorcycle_colors';

    protected $fillable = [
        'motorcycle_variant_id',
        'image',
        'color_code',
        'color_name',
        'stock',
        'order'
    ];

    // Relationships
    public function variant()
    {
        return $this->belongsTo(MotorcycleVariant::class, 'motorcycle_variant_id');
    }
}
