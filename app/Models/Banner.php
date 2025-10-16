<?php

namespace App\Models;

use Spatie\MediaLibrary\HasMedia;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\InteractsWithMedia;

class Banner extends Model implements HasMedia
{
    use InteractsWithMedia;

    protected $table = 'banners';

    protected $fillable = [
        'image',
        'title',
        'alt',
        'description',
        'order',
        'is_show'
    ];
}
