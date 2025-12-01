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
        Schema::create('events', function (Blueprint $table) {
            // Primary key
            $table->id();
            
            // Basic info
            $table->string('title');
            $table->text('description')->nullable();
            $table->enum('event_type', ['world', 'vietnam']);
            
            // Date fields
            $table->date('date_gregorian')->nullable();
            $table->string('date_lunar')->nullable();
            
            // Location fields
            $table->string('address')->nullable();
            $table->decimal('latitude', 10, 8)->nullable();
            $table->decimal('longitude', 11, 8)->nullable();
            $table->string('city')->nullable();
            $table->string('country')->nullable();
            
            // Media
            $table->string('image')->nullable();
            $table->json('gallery')->nullable();
            
            // Event details
            $table->foreignId('category_id')->constrained()->onDelete('cascade');
            $table->enum('status', ['draft', 'published', 'cancelled'])->default('draft');
            $table->enum('privacy', ['public', 'private', 'friends'])->default('public');
            
            // Time details
            $table->time('start_time')->nullable();
            $table->time('end_time')->nullable();
            $table->boolean('is_all_day')->default(false);
            
            // Capacity & Pricing
            $table->integer('capacity')->nullable();
            $table->decimal('price', 10, 2)->default(0);
            $table->string('currency')->default('VND');
            
            // Contact & Organizer
            $table->string('organizer_name')->nullable();
            $table->string('organizer_phone')->nullable();
            $table->string('organizer_email')->nullable();
            
            // Audit fields
            $table->tinyInteger('status_flag')->default(0);
            $table->integer('sequence')->default(0);
            $table->integer('version')->default(1);
            $table->foreignId('created_user_id')->constrained('users');
            $table->foreignId('updated_user_id')->constrained('users');
            $table->timestamp('deleted_at')->nullable();
            
            $table->timestamps();
            
            // Indexes
            $table->index(['event_type', 'date_gregorian']);
            $table->index(['latitude', 'longitude']);
            $table->index('category_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('events');
    }
};