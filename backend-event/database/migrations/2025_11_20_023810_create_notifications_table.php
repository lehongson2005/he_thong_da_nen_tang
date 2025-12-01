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
        Schema::create('notifications', function (Blueprint $table) {
            // Primary key
            $table->id();
            
            // Foreign keys
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('event_id')->nullable()->constrained()->onDelete('cascade');
            
            // Notification content
            $table->string('title');
            $table->text('message');
            $table->boolean('is_read')->default(false);
            
            // Timing
            $table->datetime('send_date');
            $table->datetime('read_at')->nullable();
            $table->datetime('recalled_at')->nullable();
            
            // Type & Action
            $table->enum('type', ['system', 'event', 'reminder', 'marketing'])->default('system');
            $table->string('action_url')->nullable();
            $table->json('data')->nullable();
            
            // Priority
            $table->enum('priority', ['low', 'normal', 'high', 'urgent'])->default('normal');
            
            // Audit fields
            $table->tinyInteger('status_flag')->default(0);
            $table->integer('sequence')->default(0);
            $table->integer('version')->default(1);
            $table->foreignId('created_user_id')->constrained('users');
            $table->foreignId('updated_user_id')->constrained('users');
            $table->timestamp('deleted_at')->nullable();
            
            $table->timestamps();
            
            // Indexes
            $table->index(['user_id', 'is_read']);
            $table->index(['user_id', 'send_date']);
            $table->index(['type', 'send_date']);
            $table->index('recalled_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('notifications');
    }
};