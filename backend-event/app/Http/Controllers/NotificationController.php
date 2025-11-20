<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Notification;

class NotificationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Notification::paginate();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'event_id' => 'nullable|exists:events,id',
            'title' => 'required|string|max:255',
            'message' => 'required|string',
            'is_read' => 'boolean',
            'send_date' => 'required|date',
            'read_at' => 'nullable|date',
            'recalled_at' => 'nullable|date',
            'type' => 'required|in:system,event,reminder,marketing',
            'action_url' => 'nullable|url',
            'data' => 'nullable|json',
            'priority' => 'required|in:low,normal,high,urgent',
            'created_user_id' => 'required|exists:users,id',
            'updated_user_id' => 'required|exists:users,id',
        ]);

        $notification = Notification::create($validated);

        return response()->json($notification, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return Notification::findOrFail($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $notification = Notification::findOrFail($id);

        $validated = $request->validate([
            'title' => 'string|max:255',
            'message' => 'string',
            'is_read' => 'boolean',
            'read_at' => 'nullable|date',
            'recalled_at' => 'nullable|date',
            'type' => 'in:system,event,reminder,marketing',
            'action_url' => 'nullable|url',
            'data' => 'nullable|json',
            'priority' => 'in:low,normal,high,urgent',
            'updated_user_id' => 'required|exists:users,id',
        ]);

        $notification->update($validated);

        return response()->json($notification);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $notification = Notification::findOrFail($id);
        $notification->delete();

        return response()->json(null, 204);
    }
}
