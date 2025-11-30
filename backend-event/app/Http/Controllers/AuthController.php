<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use App\Notifications\PasswordResetNotification;

class AuthController extends Controller
{
    /**
     * Đăng ký tài khoản
     */
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:8',
            'phone' => 'nullable|string',
        ]);

        try {
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'avatar' => null,
                'role' => 'user',
                'status' => 1,
                'sequence' => 0,
                'version' => 1,
                'created_user_id' => null, // Sửa ở đây
                'updated_user_id' => null, // Sửa ở đây
                'phone' => $request->phone,
            ]);

            $token = $user->createToken('auth_token')->plainTextToken;

            return response()->json([
                'message' => 'Đăng ký thành công!',
                'user' => $user,
                'token' => $token
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Đã có lỗi xảy ra.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Đăng nhập
     */
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Email hoặc mật khẩu không đúng'], 401);
        }

        // Tạo token
        $token = $user->createToken('auth_token')->plainTextToken;

        // Cập nhật thời gian đăng nhập
        $user->update([
            'last_login_at' => now(),
        ]);

        return response()->json([
            'user' => $user,
            'token' => $token
        ]);
    }

    /**
     * Lấy thông tin user đang đăng nhập
     */
    public function me(Request $request)
    {
        return response()->json($request->user());
    }

    /**
     * Đăng xuất
     */
    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();

        return response()->json(['message' => 'Đăng xuất thành công']);
    }

    /**
     * Gửi yêu cầu quên mật khẩu
     */
    public function forgotPassword(Request $request)
    {
        $request->validate(['email' => 'required|email']);

        try {
            $user = User::where('email', $request->email)->first();

            if (!$user) {
                return response()->json(['message' => 'Chúng tôi không tìm thấy người dùng với địa chỉ email này.'], 404);
            }

            // Tạo token 6 chữ số
            $token = str_pad(random_int(0, 999999), 6, '0', STR_PAD_LEFT);

            // Lưu token vào DB (bảng password_reset_tokens)
            DB::table('password_reset_tokens')->updateOrInsert(
                ['email' => $user->email],
                [
                    'token' => Hash::make($token),
                    'created_at' => now(),
                ]
            );
            
            // Gửi email
            $user->notify(new PasswordResetNotification($token));

            return response()->json(['message' => 'Email đặt lại mật khẩu đã được gửi!']);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Đã có lỗi xảy ra khi gửi email.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Đặt lại mật khẩu
     */
    public function resetPassword(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'token' => 'required|string',
            'password' => 'required|string|min:8|confirmed',
        ]);

        try {
            // Lấy bản ghi reset token
            $resetRecord = DB::table('password_reset_tokens')
                ->where('email', $request->email)
                ->first();

            // Kiểm tra token có tồn tại và còn hạn không (ví dụ: 60 phút)
            if (!$resetRecord || now()->diffInMinutes($resetRecord->created_at) > 60) {
                return response()->json(['message' => 'Token không hợp lệ hoặc đã hết hạn.'], 400);
            }

            // Kiểm tra token có đúng không
            if (!Hash::check($request->token, $resetRecord->token)) {
                return response()->json(['message' => 'Token không hợp lệ.'], 400);
            }

            // Tìm user và cập nhật mật khẩu
            $user = User::where('email', $request->email)->first();
            if (!$user) {
                return response()->json(['message' => 'Không tìm thấy người dùng.'], 404);
            }

            $user->password = Hash::make($request->password);
            $user->save();

            // Xóa token đã sử dụng
            DB::table('password_reset_tokens')->where('email', $request->email)->delete();

            return response()->json(['message' => 'Mật khẩu đã được đặt lại thành công.']);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Đã có lỗi xảy ra.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Đổi mật khẩu (cho người dùng đã đăng nhập)
     */
    public function changePassword(Request $request)
    {
        $request->validate([
            'current_password' => 'required|string',
            'password' => 'required|string|min:8|confirmed',
        ]);

        $user = $request->user();

        // Kiểm tra mật khẩu hiện tại có đúng không
        if (!Hash::check($request->current_password, $user->password)) {
            return response()->json(['message' => 'Mật khẩu hiện tại không đúng.'], 400);
        }

        // Cập nhật mật khẩu mới
        $user->password = Hash::make($request->password);
        $user->save();

        return response()->json(['message' => 'Mật khẩu đã được thay đổi thành công.']);
    }
}
