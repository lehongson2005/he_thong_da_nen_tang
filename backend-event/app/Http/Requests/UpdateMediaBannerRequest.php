<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateMediaBannerRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true; // Cho phép tất cả người dùng cập nhật banner, có thể thêm logic xác thực sau
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'media_title' => 'sometimes|required|string|max:200',
            'media_detail_link' => 'nullable|string|max:500',
            'media_publish_from' => 'nullable|date',
            'media_publish_to' => 'nullable|date|after_or_equal:media_publish_from',
            'media_order' => 'nullable|integer|min:0',
            'media_image_url' => 'nullable|url|max:255', // URL ảnh mới (nếu có) hoặc giữ nguyên
            'media_is_active' => 'sometimes|required|boolean',
        ];
    }

    /**
     * Custom error messages for validation rules.
     *
     * @return array
     */
    public function messages(): array
    {
        return [
            'media_title.required' => 'Tiêu đề banner là bắt buộc.',
            'media_title.string' => 'Tiêu đề banner phải là chuỗi ký tự.',
            'media_title.max' => 'Tiêu đề banner không được vượt quá 200 ký tự.',
            'media_detail_link.string' => 'Liên kết chi tiết phải là chuỗi ký tự.',
            'media_detail_link.max' => 'Liên kết chi tiết không được vượt quá 500 ký tự.',
            'media_publish_from.date' => 'Ngày bắt đầu xuất bản không hợp lệ.',
            'media_publish_to.date' => 'Ngày kết thúc xuất bản không hợp lệ.',
            'media_publish_to.after_or_equal' => 'Ngày kết thúc xuất bản phải sau hoặc bằng ngày bắt đầu.',
            'media_order.integer' => 'Thứ tự banner phải là số nguyên.',
            'media_order.min' => 'Thứ tự banner phải là số không âm.',
            'media_image_url.url' => 'URL hình ảnh banner không hợp lệ.',
            'media_image_url.max' => 'URL hình ảnh banner không được vượt quá 255 ký tự.',
            'media_is_active.required' => 'Trạng thái hoạt động là bắt buộc.',
            'media_is_active.boolean' => 'Trạng thái hoạt động phải là đúng hoặc sai.',
        ];
    }
}
