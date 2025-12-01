<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Favorite;

class FavoriteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Favorite::paginate();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'event_id' => 'required|exists:events,id|unique:favorites,event_id,NULL,id,user_id,' . $request->user_id,
            'created_user_id' => 'required|exists:users,id',
            'updated_user_id' => 'required|exists:users,id',
        ]);

        $favorite = Favorite::create($validated);

        return response()->json($favorite, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return Favorite::findOrFail($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $favorite = Favorite::findOrFail($id);

        return response()->json($favorite);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $favorite = Favorite::findOrFail($id);
        $favorite->delete();

        return response()->json(null, 204);
    }
}
