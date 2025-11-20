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
        Schema::create('categories', function (Blueprint $table) {
            // Primary key
            $table->id();
            
            // Basic info
            $table->string('name');
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            
            // Visual
            $table->string('icon')->nullable();
            $table->string('image')->nullable();
            $table->string('color')->nullable();
            
            // Hierarchy
            $table->foreignId('parent_id')->nullable()->constrained('categories')->onDelete('cascade');
            $table->integer('lft')->nullable()->index();
            $table->integer('rgt')->nullable()->index();
            $table->integer('depth')->default(0);
            
            // Configuration
            $table->enum('type', ['event', 'blog', 'general'])->default('event');
            $table->boolean('is_active')->default(true);
            $table->boolean('is_featured')->default(false);
            
            // SEO
            $table->string('meta_title')->nullable();
            $table->text('meta_description')->nullable();
            $table->json('meta_keywords')->nullable();
            
            // Audit fields
            $table->tinyInteger('status_flag')->default(0);
            $table->integer('sequence')->default(0);
            $table->integer('version')->default(1);
            $table->foreignId('created_user_id')->constrained('users');
            $table->foreignId('updated_user_id')->constrained('users');
            $table->timestamp('deleted_at')->nullable();
            
            $table->timestamps();
            
            // Indexes
            $table->index(['type', 'is_active']);
            $table->index(['parent_id', 'sequence']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('categories');
    }
};