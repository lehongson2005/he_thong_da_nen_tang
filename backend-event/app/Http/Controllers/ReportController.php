<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Report;

class ReportController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Report::paginate();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'reportable_id' => 'required|integer',
            'reportable_type' => 'required|string|in:App\Models\Event,App\Models\Comment',
            'reason' => 'required|string',
            'status' => 'required|in:pending,resolved,rejected',
            'admin_notes' => 'nullable|string',
            'resolved_by' => 'nullable|exists:users,id',
            'resolved_at' => 'nullable|date',
            'created_user_id' => 'required|exists:users,id',
            'updated_user_id' => 'required|exists:users,id',
        ]);

        $report = Report::create($validated);

        return response()->json($report, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return Report::findOrFail($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $report = Report::findOrFail($id);

        $validated = $request->validate([
            'reason' => 'string',
            'status' => 'in:pending,resolved,rejected',
            'admin_notes' => 'nullable|string',
            'resolved_by' => 'nullable|exists:users,id',
            'resolved_at' => 'nullable|date',
            'updated_user_id' => 'required|exists:users,id',
        ]);

        $report->update($validated);

        return response()->json($report);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $report = Report::findOrFail($id);
        $report->delete();

        return response()->json(null, 204);
    }
}
