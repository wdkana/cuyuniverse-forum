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
        Schema::create('comments', function (Blueprint $table) {
            $table->id();
            $table->string('description');
            $table->bigInteger('post_id')->unsigned()->index()->nullable();
            $table->foreign('post_id')->references('id')->on('posts')->onDelete('CASCADE');
            $table->string('commentartor')->index()->nullable();
            $table->foreign('commentartor')->references('username')->on('users')->onDelete('CASCADE')->onUpdate('CASCADE');
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
        Schema::dropIfExists('comments', function (Blueprint $table) {
            $table->dropForeign('posts_post_id_foreign');
            $table->dropIndex('posts_post_id_index');
            $table->dropColumn('post_id');
            $table->dropForeign('posts_commentartor_foreign');
            $table->dropIndex('posts_commentartor_index');
            $table->dropColumn('commentartor');
        });
    }
};
