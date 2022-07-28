<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('likes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('post_id');
            $table->foreignId('user_id');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('likes', function (Blueprint $table) {
            $table->dropForeign('posts_user_id_foreign');
            $table->dropIndex('posts_user_id_index');
            $table->dropColumn('user_id');
            $table->dropForeign('posts_post_id_foreign');
            $table->dropIndex('posts_post_id_index');
            $table->dropColumn('post_id');
        });
    }
};
