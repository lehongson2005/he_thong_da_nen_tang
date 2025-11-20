<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Setting;

class SettingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Setting::paginate();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'key' => 'required|string|max:255|unique:settings',
            'value' => 'nullable|string',
            'type' => 'string',
            'group' => 'string',
            'created_user_id' => 'required|exists:users,id',
            'updated_user_id' => 'required|exists:users,id',
        ]);

        $setting = Setting::create($validated);

        return response()->json($setting, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return Setting::findOrFail($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $setting = Setting::findOrFail($id);

        $validated = $request->validate([
            'value' => 'nullable|string',
            'type' => 'string',
            'group' => 'string',
            'updated_user_id' => 'required|exists:users,id',
        ]);

        $setting->update($validated);

        return response()->json($setting);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $setting = Setting::findOrFail($id);
        $setting->delete();

        return response()->json(null, 204);
    }
}
