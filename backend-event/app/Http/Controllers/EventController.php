<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Event;

class EventController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Event::paginate();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'event_type' => 'required|in:world,vietnam',
            'date_gregorian' => 'nullable|date',
            'date_lunar' => 'nullable|string',
            'address' => 'nullable|string',
            'latitude' => 'nullable|numeric',
            'longitude' => 'nullable|numeric',
            'city' => 'nullable|string',
            'country' => 'nullable|string',
            'image' => 'nullable|string',
            'gallery' => 'nullable|json',
            'category_id' => 'required|exists:categories,id',
            'status' => 'required|in:draft,published,cancelled',
            'privacy' => 'required|in:public,private,friends',
            'start_time' => 'nullable|date_format:H:i',
            'end_time' => 'nullable|date_format:H:i',
            'is_all_day' => 'boolean',
            'capacity' => 'nullable|integer',
            'price' => 'numeric',
            'currency' => 'string',
            'organizer_name' => 'nullable|string',
            'organizer_phone' => 'nullable|string',
            'organizer_email' => 'nullable|email',
            'created_user_id' => 'required|exists:users,id',
            'updated_user_id' => 'required|exists:users,id',
        ]);

        $event = Event::create($validated);

        return response()->json($event, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return Event::findOrFail($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $event = Event::findOrFail($id);

        $validated = $request->validate([
            'title' => 'string|max:255',
            'description' => 'nullable|string',
            'event_type' => 'in:world,vietnam',
            'date_gregorian' => 'nullable|date',
            'date_lunar' => 'nullable|string',
            'address' => 'nullable|string',
            'latitude' => 'nullable|numeric',
            'longitude' => 'nullable|numeric',
            'city' => 'nullable|string',
            'country' => 'nullable|string',
            'image' => 'nullable|string',
            'gallery' => 'nullable|json',
            'category_id' => 'exists:categories,id',
            'status' => 'in:draft,published,cancelled',
            'privacy' => 'in:public,private,friends',
            'start_time' => 'nullable|date_format:H:i',
            'end_time' => 'nullable|date_format:H:i',
            'is_all_day' => 'boolean',
            'capacity' => 'nullable|integer',
            'price' => 'numeric',
            'currency' => 'string',
            'organizer_name' => 'nullable|string',
            'organizer_phone' => 'nullable|string',
            'organizer_email' => 'nullable|email',
            'updated_user_id' => 'required|exists:users,id',
        ]);

        $event->update($validated);

        return response()->json($event);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $event = Event::findOrFail($id);
        $event->delete();

        return response()->json(null, 204);
    }
}
