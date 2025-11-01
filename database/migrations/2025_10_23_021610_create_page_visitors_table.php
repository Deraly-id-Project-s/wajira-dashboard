<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('page_visitors', function (Blueprint $table) {
            $table->id();

            $table->string('session_id')->nullable(true);
            $table->string('ip_address', 45)->nullable(true);
            $table->string('user_agent')->nullable(true); 
            $table->string('platform')->nullable(true); 

            $table->string('url_visited')->nullable(true);
            $table->string('referrer')->nullable(true);
            $table->string('country')->nullable(true);

            $table->dateTime('last_accessed_at')->nullable(true);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('page_visitors');
    }
};
