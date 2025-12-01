<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\ActivityLog;

class ActivityLogController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return ActivityLog::paginate();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'action' => 'required|string',
            'model_type' => 'required|string',
            'model_id' => 'required|integer',
            'old_values' => 'nullable|json',
            'new_values' => 'nullable|json',
            'user_id' => 'required|exists:users,id',
            'description' => 'nullable|string',
            'ip_address' => 'nullable|ip',
            'user_agent' => 'nullable|string',
            'created_user_id' => 'required|exists:users,id',
            'updated_user_id' => 'required|exists:users,id',
        ]);

        $activityLog = ActivityLog::create($validated);

        return response()->json($activityLog, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return ActivityLog::findOrFail($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $activityLog = ActivityLog::findOrFail($id);

        $validated = $request->validate([
            'action' => 'string',
            'model_type' => 'string',
            'model_id' => 'integer',
            'old_values' => 'nullable|json',
            'new_values' => 'nullable|json',
            'user_id' => 'exists:users,id',
            'description' => 'nullable|string',
            'ip_address' => 'nullable|ip',
            'user_agent' => 'nullable|string',
            'updated_user_id' => 'required|exists:users,id',
        ]);

        $activityLog->update($validated);

        return response()->json($activityLog);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $activityLog = ActivityLog::findOrFail($id);
        $activityLog->delete();

        return response()->json(null, 204);
    }
}
