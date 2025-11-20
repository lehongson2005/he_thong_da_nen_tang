<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Comment;

class CommentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Comment::paginate();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'event_id' => 'required|exists:events,id',
            'content' => 'required|string',
            'image' => 'nullable|string',
            'emoji' => 'nullable|string',
            'parent_id' => 'nullable|exists:comments,id',
            'status' => 'required|in:pending,approved,rejected',
            'moderation_notes' => 'nullable|string',
            'created_user_id' => 'required|exists:users,id',
            'updated_user_id' => 'required|exists:users,id',
        ]);

        $comment = Comment::create($validated);

        return response()->json($comment, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return Comment::findOrFail($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $comment = Comment::findOrFail($id);

        $validated = $request->validate([
            'content' => 'string',
            'image' => 'nullable|string',
            'emoji' => 'nullable|string',
            'status' => 'in:pending,approved,rejected',
            'moderation_notes' => 'nullable|string',
            'updated_user_id' => 'required|exists:users,id',
        ]);

        $comment->update($validated);

        return response()->json($comment);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $comment = Comment::findOrFail($id);
        $comment->delete();

        return response()->json(null, 204);
    }
}
