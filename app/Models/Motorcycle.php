<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Motorcycle extends Model
{
    use SoftDeletes;
    
    protected $table = 'motorcycles';

    protected $fillable = [
        'brand_id',
        'slug',
        'name',
        'product_image',
        'image_360',
        'engine_type',
        'engine_size',
        'displacement',
        'compression_ratio',
        'max_power',
        'max_torque',
        'clutch',
        'starter',
        'spark_plug',
        'fuel_system',
        'ignition_system',
        'frame_type',
        'front_suspension',
        'rear_suspension',
        'tire_type',
        'front_tire',
        'rear_tire',
        'front_brake',
        'lubrication_system',
        'overall_length',
        'overall_width',
        'overall_height',
        'wheelbase',
        'ground_clearance',
        'seat_height',
        'curb_weight',
        'tank_capacity',
        'battery',
        'headlight',
        'taillight',
        'turn_signal',
        'charging_port',
        'price',
        // save product count
        'save_product_count',
        'click_count',
        // is_recomended
        'is_recomended',
        'deleted_at',
    ];

    protected $casts = [
        'image_360' => 'array',
    ];

    // Relationships
    public function brand()
    {
        return $this->belongsTo(Brand::class);
    }

    public function variants()
    {
        return $this->hasMany(MotorcycleVariant::class, 'motorcycle_id');
    }
}
