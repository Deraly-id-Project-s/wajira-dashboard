<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Eloquent\SoftDeletes;

return new class extends Migration
{
    use SoftDeletes;

    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('motorcycles', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('brand_id')->nullable(true);
            $table->string('slug')->unique()->nullable(false);
            $table->string('name')->nullable(false);
            $table->string('product_image')->nullable(true);
            $table->string('product_color')->nullable(true);
            $table->string('product_360')->nullable(true);
            // Engine
            $table->string('engine_type')->nullable(true);
            $table->string('engine_size')->nullable(true);
            $table->string('displacement')->nullable(true);
            $table->string('compression_ratio')->nullable(true);
            $table->string('max_power')->nullable(true);
            $table->string('max_torque')->nullable(true);
            $table->string('clutch')->nullable(true);
            $table->string('starter')->nullable(true);
            $table->string('spark_plug')->nullable(true);
            $table->string('fuel_system')->nullable(true);
            $table->string('ignition_system')->nullable(true);
            // frame
            $table->enum('frame_type', ['underbone', 'backbone', 'trellis', 'double_cradle', 'perimeter', 'diamond', 'monocoque', 'esaf'])->nullable(true);
            $table->string('front_suspension')->nullable(true);
            $table->string('rear_suspension')->nullable(true);
            $table->enum('tire_type', ['tubeless', 'tube', 'radial', 'bias'])->default('tubeless')->nullable(true);
            $table->string('front_tire')->nullable(true);
            $table->string('rear_tire')->nullable(true);
            $table->string('front_brake')->nullable(true);
            $table->string('lubrication_system')->nullable(true);
            // Dimension & Weight
            $table->string('overall_length')->nullable(true);
            $table->string('overall_width')->nullable(true);
            $table->string('overall_height')->nullable(true);
            $table->string('wheelbase')->nullable(true);
            $table->string('ground_clearance')->nullable(true);
            $table->string('seat_height')->nullable(true);
            $table->string('curb_weight')->nullable(true);
            $table->string('tank_capacity')->nullable(true);
            // Electrycity
            $table->string('battery')->nullable(true);
            $table->string('headlight')->nullable(true);
            $table->string('taillight')->nullable(true);
            $table->string('turn_signal')->nullable(true);
            $table->boolean('charging_port')->nullable(true);
            // Pricing
            $table->integer('price')->nullable(false)->default(0);
            // Soft Deletes
            $table->dateTime('deleted_at')->nullable(true);
            $table->timestamps();
            // Foreign Key
            $table->foreign('brand_id')->references('id')->on('brands')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('motorcycles');
    }
};
