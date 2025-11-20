<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\View;

class ViewController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return View::paginate();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'event_id' => 'required|exists:events,id',
            'user_id' => 'nullable|exists:users,id',
            'view_count' => 'integer',
            'last_viewed_at' => 'nullable|date',
            'first_viewed_at' => 'nullable|date',
            'session_id' => 'nullable|string',
            'ip_address' => 'nullable|ip',
            'user_agent' => 'nullable|string',
            'source' => 'nullable|string',
            'daily_views' => 'integer',
            'weekly_views' => 'integer',
            'monthly_views' => 'integer',
            'created_user_id' => 'required|exists:users,id',
            'updated_user_id' => 'required|exists:users,id',
        ]);

        $view = View::create($validated);

        return response()->json($view, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return View::findOrFail($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $view = View::findOrFail($id);

        $validated = $request->validate([
            'view_count' => 'integer',
            'last_viewed_at' => 'nullable|date',
            'session_id' => 'nullable|string',
            'ip_address' => 'nullable|ip',
            'user_agent' => 'nullable|string',
            'source' => 'nullable|string',
            'daily_views' => 'integer',
            'weekly_views' => 'integer',
            'monthly_views' => 'integer',
            'updated_user_id' => 'required|exists:users,id',
        ]);

        $view->update($validated);

        return response()->json($view);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $view = View::findOrFail($id);
        $view->delete();

        return response()->json(null, 204);
    }
}
