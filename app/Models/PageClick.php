<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PageClick extends Model
{
    protected $table = 'page_clicks';

    protected $fillable = [
        'page_name',
        'url',
        'ip_address',
        'last_accessed_at',
    ];
}
