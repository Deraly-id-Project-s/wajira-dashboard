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
        Schema::table('motorcycles', function (Blueprint $table) {
            if (!Schema::hasColumn('motorcycles', 'image_360')) {
                $table->dropColumn('product_360');
                $table->json('image_360')->nullable(true)->after('product_image');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('motorcycles', function (Blueprint $table) {
            if (Schema::hasColumn('motorcycles', 'image_360')) {
                $table->string('product_360')->nullable(true);
                $table->dropColumn('image_360');
            }
        });
    }
};
