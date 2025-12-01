<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Laravel\Socialite\Facades\Socialite;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Exception;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Str;

class SocialiteController extends Controller
{
    /**
     * Redirect the user to the provider's authentication page.
     */
    public function redirectToProvider($provider)
    {
        return Socialite::driver($provider)->stateless()->redirect();
    }

    /**
     * Obtain the user information from the provider.
     */
    public function handleProviderCallback($provider)
    {
        try {
            $providerUser = Socialite::driver($provider)->stateless()->user();
            
            $providerIdField = "{$provider}_id"; // e.g., 'google_id', 'facebook_id'

            // Find user by provider_id
            $user = User::where($providerIdField, $providerUser->getId())->first();

            if ($user) {
                // If user exists, log them in
                Auth::login($user);
            } else {
                // If user doesn't exist, check by email
                $user = User::where('email', $providerUser->getEmail())->first();

                if ($user) {
                    // If email exists, update the user with the provider_id
                    $user->update([$providerIdField => $providerUser->getId()]);
                } else {
                    // If no user found, create a new one
                    // Note: Facebook might not return an email if the user doesn't grant permission
                    if (empty($providerUser->getEmail())) {
                        throw new Exception("Không thể lấy địa chỉ email từ {$provider}. Vui lòng thử lại hoặc đăng ký bằng email.");
                    }
                    
                    $user = User::create([
                        'name' => $providerUser->getName(),
                        'email' => $providerUser->getEmail(),
                        $providerIdField => $providerUser->getId(),
                        'password' => Hash::make(Str::random(24)), // Generate a random password
                        'avatar' => $providerUser->getAvatar(),
                    ]);
                }
                Auth::login($user);
            }

            $token = $user->createToken('auth_token')->plainTextToken;
            
            // Redirect to frontend with the token
            $frontendUrl = config('app.frontend_url', 'http://localhost:5173');
            return Redirect::to($frontendUrl . '/auth/callback?token=' . $token);

        } catch (Exception $e) {
            // Log the error and redirect to a frontend error page
            report($e);
            $frontendUrl = config('app.frontend_url', 'http://localhost:5173');
            return Redirect::to($frontendUrl . '/login?error=' . urlencode($e->getMessage()));
        }
    }
}
