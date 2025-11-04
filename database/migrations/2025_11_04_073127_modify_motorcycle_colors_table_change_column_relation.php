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
        Schema::table('motorcycle_colors', function (Blueprint $table) {
            if (Schema::hasColumn('motorcycle_colors', 'motorcycle_id')) {
                $table->renameColumn('motorcycle_id', 'motorcycle_variant_id');
            }
            
            $table->foreign('motorcycle_variant_id')->references('id')->on('motorcycle_variants')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('motorcycle_colors', function (Blueprint $table) {
            if (Schema::hasColumn('motorcycle_colors', 'motorcycle_variant_id')) {
                $table->dropForeign(['motorcycle_variant_id']);
                $table->renameColumn('motorcycle_variant_id', 'motorcycle_id');
            }
        });
    }
};
