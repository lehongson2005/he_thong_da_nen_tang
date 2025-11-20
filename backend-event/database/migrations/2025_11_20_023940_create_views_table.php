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
        Schema::create('views', function (Blueprint $table) {
            // Primary key
            $table->id();
            
            // Foreign keys
            $table->foreignId('event_id')->constrained()->onDelete('cascade');
            $table->foreignId('user_id')->nullable()->constrained()->onDelete('cascade');
            
            // View statistics
            $table->integer('view_count')->default(1);
            $table->timestamp('last_viewed_at');
            $table->timestamp('first_viewed_at')->useCurrent();
            
            // Session & Tracking
            $table->string('session_id')->nullable();
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->string('source')->nullable();
            
            // Period tracking
            $table->integer('daily_views')->default(0);
            $table->integer('weekly_views')->default(0);
            $table->integer('monthly_views')->default(0);
            
            // Audit fields
            $table->tinyInteger('status_flag')->default(0);
            $table->integer('sequence')->default(0);
            $table->integer('version')->default(1);
            $table->foreignId('created_user_id')->constrained('users');
            $table->foreignId('updated_user_id')->constrained('users');
            $table->timestamp('deleted_at')->nullable();
            
            $table->timestamps();
            
            // Indexes
            $table->index(['event_id', 'last_viewed_at']);
            $table->index(['user_id', 'event_id']);
            $table->index(['daily_views', 'last_viewed_at']);
            $table->index(['weekly_views', 'last_viewed_at']);
            $table->index(['monthly_views', 'last_viewed_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('views');
    }
};