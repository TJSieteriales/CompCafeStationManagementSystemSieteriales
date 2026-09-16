<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function index()
    {
        return Task::latest()->get();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|max:255',
            'category' => 'nullable|max:100',
            'priority' => 'nullable|in:Low,Medium,High',
            'due_date' => 'nullable|date'
        ]);

        return response()->json(Task::create($data), 201);
    }

    public function show(Task $task)
    {
        return $task;
    }

    public function update(Request $request, Task $task)
    {
        $task->update($request->validate([
            'title' => 'sometimes|required|max:255',
            'category' => 'sometimes|max:100',
            'priority' => 'sometimes|in:Low,Medium,High',
            'due_date' => 'sometimes|nullable|date',
            'is_done' => 'sometimes|boolean'
        ]));

        return $task;
    }

    public function destroy(Task $task)
    {
        $task->delete();

        return response()->noContent();
    }
}