<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MotorcycleVariant extends Model
{
    protected $table = 'motorcycle_variants';

    protected $guarded = ['id'];

    protected $fillable = [
        'motorcycle_id',
        'variant_slug',
        'name',
        'desciption'
    ];

    public function motorcycle()
    {
        return $this->belongsTo(Motorcycle::class, 'motorcycle_id');
    }

    public function colors()
    {
        return $this->hasMany(MotorcycleColor::class, 'motorcycle_variant_id');
    }
}
