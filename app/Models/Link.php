<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Link extends Model
{
    protected $table = 'links';

    protected $fillable = [
        'platform_name',
        'url',
        'is_show',
        'additional_parameter',
        'special_code'
    ];
}
