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
        Schema::create('comments', function (Blueprint $table) {
            // Primary key
            $table->id();
            
            // Foreign keys
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('event_id')->constrained()->onDelete('cascade');
            
            // Comment content
            $table->text('content');
            $table->string('image')->nullable();
            $table->string('emoji')->nullable();
            
            // Threading
            $table->foreignId('parent_id')->nullable()->constrained('comments')->onDelete('cascade');
            $table->integer('lft')->nullable()->index();
            $table->integer('rgt')->nullable()->index();
            $table->integer('depth')->default(0);
            
            // Moderation
            $table->enum('status', ['pending', 'approved', 'rejected'])->default('approved');
            $table->text('moderation_notes')->nullable();
            
            // Engagement
            $table->integer('like_count')->default(0);
            $table->integer('reply_count')->default(0);
            
            // Audit fields
            $table->tinyInteger('status_flag')->default(0);
            $table->integer('sequence')->default(0);
            $table->integer('version')->default(1);
            $table->foreignId('created_user_id')->constrained('users');
            $table->foreignId('updated_user_id')->constrained('users');
            $table->timestamp('deleted_at')->nullable();
            
            $table->timestamps();
            
            // Indexes
            $table->index(['event_id', 'created_at']);
            $table->index(['user_id', 'created_at']);
            $table->index(['parent_id', 'sequence']);
            $table->index('status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('comments');
    }
};