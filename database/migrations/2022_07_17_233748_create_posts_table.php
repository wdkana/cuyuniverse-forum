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
        Schema::create('posts', function (Blueprint $table) {
            $table->id();
            $table->string('image')->nullable();
            $table->string('description');
            $table->string('author');
            $table->string('hashtag')->nullable()->default(NULL);
            $table->bigInteger('user_id')->unsigned()->index()->nullable();
            $table->foreign('author')->references('username')->on('users')->onDelete('CASCADE')->onUpdate('CASCADE');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('CASCADE');

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
        Schema::dropIfExists('posts', function (Blueprint $table) {
            $table->dropForeign('posts_user_id_foreign');
            $table->dropIndex('posts_user_id_index');
            $table->dropColumn('user_id');
            $table->dropForeign('posts_author_foreign');
            $table->dropIndex('posts_author_index');
            $table->dropColumn('author');
        });
    }
};
