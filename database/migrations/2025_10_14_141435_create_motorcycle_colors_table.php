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
        Schema::create('motorcycle_colors', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('motorcycle_id')->nullable(false);
            $table->string('image')->nullable(false);
            $table->string('color_code')->nullable(false);
            $table->string('color_name')->nullable(false);
            $table->integer('stock')->default(1);
            $table->integer('order')->default(1);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('motorcycle_colors');
    }
};
