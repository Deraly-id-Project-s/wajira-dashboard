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
        Schema::table('links', function (Blueprint $table) {
            if (Schema::hasColumn('links', 'special_code')) {
                return;
            }
            
            $table->string('special_code')->nullable(true)->after('is_show');
            $table->string('additional_parameter')->nullable(true)->after('special_code');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('links', function (Blueprint $table) {
            $table->dropColumn('special_code');
            $table->dropColumn('additional_parameter');
        });
    }
};
