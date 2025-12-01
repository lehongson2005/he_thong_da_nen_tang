<?php

namespace App\Http\Controllers;

use App\Models\MediaBanner;
use App\Models\Semester;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log; // Thêm Log để tiện debug

class MediaBannerController extends Controller
{
    // ---------------- API -----------------

    // Lấy tất cả banner
    public function apiIndex(): JsonResponse
    {
        $banners = MediaBanner::ordered()->get();

        // Đảm bảo media_image_url là URL public
        $banners->transform(function ($banner) {
            // Chỉ xử lý nếu URL là đường dẫn nội bộ (chưa phải http)
            if ($banner->media_image_url && !str_starts_with($banner->media_image_url, 'http')) {
                // Giả định đường dẫn lưu trong DB là 'banners/ten-file.jpg' (hoặc public/banners/ten-file.jpg)
                // Dùng asset('storage/...') để tạo URL công khai hoàn chỉnh
                $banner->media_image_url = asset('storage/' . ltrim($banner->media_image_url, 'public/'));
            }
            return $banner;
        });

        return response()->json($banners);
    }

    // Lấy 1 banner
    public function apiShow(MediaBanner $mediaBanner): JsonResponse
    {
        if ($mediaBanner->media_image_url && !str_starts_with($mediaBanner->media_image_url, 'http')) {
            $mediaBanner->media_image_url = asset('storage/' . ltrim($mediaBanner->media_image_url, 'public/'));
        }

        return response()->json($mediaBanner);
    }

    /**
     * Phương thức xử lý upload tệp tin hình ảnh.
     * Trả về URL, sau đó FE sẽ dùng URL này để gọi createBanner.
     */
    public function uploadImage(Request $request): JsonResponse
    {
        // 1. Validation: Đảm bảo tên trường là 'media_image'
        $validator = Validator::make($request->all(), [
            'media_image' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:5120', // Tăng lên 5MB cho thoải mái
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        // Lưu ảnh
        $file = $request->file('media_image');

        // Lưu file vào thư mục 'banners' trong public disk (storage/app/public/banners)
        $path = $file->store('banners', 'public'); // Lưu dưới dạng: banners/ten_file.jpg

        // Trả về URL công khai đầy đủ
        return response()->json([
            'success' => true,
            'url' => asset('storage/' . $path),
            'message' => 'Tải ảnh thành công!'
        ]);
    }


    /**
     * Thêm banner mới. Phương thức này nhận URL ảnh đã được upload trước đó.
     */
    public function createBanner(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'media_title' => 'required|string|max:200',
            'media_detail_link' => 'nullable|string|max:500',
            'media_publish_from' => 'nullable|date',
            'media_publish_to' => 'nullable|date|after_or_equal:media_publish_from',
            'media_order' => 'integer|min:0',
            // ⚠️ Thay đổi quan trọng: Nhận URL đã upload thay vì tệp ảnh
            'media_image_url' => 'required|url|max:255',
            'media_is_active' => 'required|boolean', // Frontend gửi 1 hoặc 0 (đã có trong FE)
        ]);

        try {
            // Tạo bản ghi
            $banner = MediaBanner::create([
                'media_title' => $validated['media_title'],
                'media_image_url' => $validated['media_image_url'], // Sử dụng URL đã upload
                'media_detail_link' => $validated['media_detail_link'] ?? null,
                'media_publish_from' => $validated['media_publish_from'] ?? null,
                'media_publish_to' => $validated['media_publish_to'] ?? null,
                'media_order' => $validated['media_order'] ?? 0,
                'media_is_active' => $validated['media_is_active'],
            ]);

            return response()->json([
                'message' => 'Banner đã được tạo thành công',
                'data' => $banner
            ], 201);
        } catch (\Exception $e) {
            Log::error('Lỗi khi thêm banner: ' . $e->getMessage());
            return response()->json([
                'message' => 'Lỗi khi thêm banner: ' . $e->getMessage()
            ], 500);
        }
    }

    // Cập nhật banner (có thể đổi ảnh mới hoặc giữ nguyên URL cũ)
    public function updateBanner(MediaBanner $mediaBanner, Request $request): JsonResponse
    {
        $validated = $request->validate([
            'media_title' => 'required|string|max:200',
            'media_detail_link' => 'nullable|string|max:500',
            'media_publish_from' => 'nullable|date',
            'media_publish_to' => 'nullable|date|after_or_equal:media_publish_from',
            'media_is_active' => 'boolean',
            'media_order' => 'integer|min:0',
            // Thay đổi quan trọng: Giữ lại để xử lý upload trong 1 bước nếu cần,
            // nhưng khuyến nghị FE nên dùng luồng 2 bước
            'media_image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:4096',
            'media_image_url' => 'nullable|url|max:255', // Nhận URL nếu FE gửi
        ]);

        try {
            $updateData = [
                'media_title' => $validated['media_title'],
                'media_detail_link' => $validated['media_detail_link'] ?? null,
                'media_publish_from' => $validated['media_publish_from'] ?? null,
                'media_publish_to' => $validated['media_publish_to'] ?? null,
                'media_is_active' => $validated['media_is_active'] ?? $mediaBanner->media_is_active,
                'media_order' => $validated['media_order'] ?? $mediaBanner->media_order,
            ];

            // Nếu có ảnh mới (tức là FE đã gọi uploadImage trước đó và gửi URL)
            if (isset($validated['media_image_url'])) {
                // KHÔNG xóa ảnh cũ ở đây. Logic xóa phải nằm ở hàm riêng hoặc khi có file upload trực tiếp
                $updateData['media_image_url'] = $validated['media_image_url'];
            }

            // Nếu có file được upload trực tiếp trong request này (ít dùng trong luồng 2 bước)
            if ($request->hasFile('media_image')) {
                // Xóa ảnh cũ
                if ($mediaBanner->media_image_url) {
                    // Cần chuyển URL thành path để xóa
                    $oldPath = str_replace(asset('storage/'), '', $mediaBanner->media_image_url);
                    Storage::disk('public')->delete($oldPath);
                }
                // Lưu ảnh mới
                $path = $request->file('media_image')->store('banners', 'public');
                $updateData['media_image_url'] = asset('storage/' . $path);
            }


            $mediaBanner->update($updateData);

            return response()->json([
                'message' => 'Banner đã được cập nhật thành công',
                'data' => $mediaBanner->fresh()
            ]);
        } catch (\Exception $e) {
            Log::error('Lỗi khi cập nhật banner: ' . $e->getMessage());
            return response()->json(['message' => 'Lỗi khi cập nhật: ' . $e->getMessage()], 500);
        }
    }

    // Xóa banner
    public function deleteBanner(MediaBanner $mediaBanner): JsonResponse
    {
        // Xóa file ảnh nếu có
        if ($mediaBanner->media_image_url) {
            // Chuyển URL public thành path tương đối để xóa
            $path = str_replace(asset('storage/'), '', $mediaBanner->media_image_url);
            Storage::disk('public')->delete($path);
        }

        $mediaBanner->delete();

        return response()->json(['message' => 'Banner đã được xóa thành công']);

    }

    // lọc banner theo trạng thái hoatj dong
    public function apiActive(): JsonResponse
    {
        $banners = MediaBanner::where('media_is_active', 1)
            ->orderBy('created_at', 'desc') // chỉnh cột nếu cần
            ->get();

        $banners->transform(function ($banner) {
            if ($banner->media_image_url && !str_starts_with($banner->media_image_url, 'http')) {
                $banner->media_image_url = asset('storage/' . ltrim($banner->media_image_url, 'public/'));
            }
            return $banner;
        });

        return response()->json($banners);
    }
    // Kích hoạt banner
    public function activate($id)
    {
        $banner = MediaBanner::findOrFail($id);
        $banner->media_is_active = true;
        $banner->save();

        return response()->json(['success' => true, 'message' => 'Banner đã được kích hoạt']);
    }

    // Vô hiệu hóa banner
    public function deactivate($id)
    {
        $banner = MediaBanner::findOrFail($id);
        $banner->media_is_active = false;
        $banner->save();

        return response()->json(['success' => true, 'message' => 'Banner đã bị vô hiệu hóa']);
    }
    //tim kiem banner theo ten
    public function search(Request $request) {
        $keyword = $request->input('q', '');
        $results = MediaBanner::searchBannerTitle($keyword);
        return response()->json($results);
    }

}
