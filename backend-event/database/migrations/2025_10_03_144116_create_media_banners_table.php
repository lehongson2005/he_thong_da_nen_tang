<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('media_banners', function (Blueprint $table) {
            $table->id('media_id');
            $table->string('media_title', 200);
            $table->string('media_image_url', 500);
            $table->string('media_detail_link', 500)->nullable();
            $table->dateTime('media_publish_from')->nullable();
            $table->dateTime('media_publish_to')->nullable();
            $table->boolean('media_is_active')->default(true);
            $table->integer('media_order')->default(0);
            $table->timestamps();

            // Indexes for better performance
            $table->index('media_title');
            $table->index('media_publish_from');
            $table->index('media_publish_to');
            $table->index('media_is_active');
            $table->index('media_order');
            
             $table->tinyInteger('status_flag')->default(0);
            $table->integer('sequence')->default(0);
            $table->integer('version')->default(1);
            $table->foreignId('created_user_id')->constrained('users');
            $table->foreignId('updated_user_id')->constrained('users');
            $table->timestamp('deleted_at')->nullable();

            // Composite index for querying active banners within date range
            $table->index(['media_is_active', 'media_publish_from', 'media_publish_to'], 'media_banners_status_dates_idx');
        });
    }

    public function down()
    {
        Schema::dropIfExists('media_banners');
    }
};
