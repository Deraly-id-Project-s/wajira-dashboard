<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PageVisitor extends Model
{
    protected $table = 'page_visitors';

    protected $fillable = [
        'session_id',
        'ip_address',
        'user_agent',
        'platform',
        'url_visited',
        'referrer',
        'country',
        'last_accessed_at'
    ];

    public static function CheckHost(string $ip_address, string $session_id): ?self
    {
        return self::select('last_accessed_at')->where('ip_address', $ip_address)
            ->where('session_id', $session_id)
            ->latest()
            ->first();
    }
}
