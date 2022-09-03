<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePostsRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'description' => 'required|string|min:4|max:200',
            'tags' => 'string|min:3|max:20|nullable',
            'image' => 'image|mimes:jpg,png,jpeg,gif|max:1048|nullable',
            'token' => 'required'
        ];
    }
}
