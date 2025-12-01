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
        Schema::create('favorites', function (Blueprint $table) {
            // Primary key
            $table->id();
            
            // Foreign keys
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('event_id')->constrained()->onDelete('cascade');
            
            // Audit fields (theo chuẩn của bạn)
            $table->tinyInteger('status_flag')->default(0);
            $table->integer('sequence')->default(0);
            $table->integer('version')->default(1);
            $table->foreignId('created_user_id')->constrained('users');
            $table->foreignId('updated_user_id')->constrained('users');
            $table->timestamp('deleted_at')->nullable();
            
            $table->timestamps();
            
            // Unique constraint - mỗi user chỉ favorite 1 event 1 lần
            $table->unique(['user_id', 'event_id']);
            
            // Indexes
            $table->index(['user_id', 'created_at']);
            $table->index('event_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('favorites');
    }
};