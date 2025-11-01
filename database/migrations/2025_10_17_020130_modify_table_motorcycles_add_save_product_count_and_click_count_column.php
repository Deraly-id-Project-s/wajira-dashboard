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
            $table->integer('save_product_count')->default(0)->nullable(true)->after('price');
            $table->integer('click_count')->default(0)->nullable(true)->after('save_product_count');
            $table->boolean('is_recomended')->default(false)->nullable(true)->after('click_count');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('motorcycles', function (Blueprint $table) {
            $table->dropColumn('save_product_count');
            $table->dropColumn('click_count');
            $table->dropColumn('is_recomended');
        });
    }
};
