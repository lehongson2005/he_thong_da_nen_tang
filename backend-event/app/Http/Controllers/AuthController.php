<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

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

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'avatar' => null,
            'role' => 'user',
            'status' => 1,
            'sequence' => 0,
            'version' => 1,
            'created_user_id' => 1, // hoặc null tùy bạn
            'updated_user_id' => 1,
            'phone' => $request->phone,
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token
        ], 201);
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
}
