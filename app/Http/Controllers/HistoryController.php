<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreHistoryRequest;
use App\Http\Requests\UpdateHistoryRequest;
use Illuminate\Auth\Events\Registered;

use App\Models\History;
use App\Models\Saving;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class HistoryController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreHistoryRequest $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|integer',
            'category' => 'required|integer',
            'goal_id' => 'required|integer',
            'deadline' => 'required|date',
            'memo' => 'nullable|string',
            'amount' => 'required|numeric',
        ]);

        $id = Auth::id();
        $savings = Saving::where('user_id', $id)->get();

        if ($validated['amount'] <= 0) {
            return redirect()->route('saving-show', [
                'id' => $validated['goal_id'],
                'savings' => $savings,
            ]);
        }

        // 新しい履歴を作成
        $histories = History::create([
            'user_id' => $validated['user_id'],
            'category' => $validated['category'],
            'goal_id' => $validated['goal_id'],
            'amount' => $validated['amount'],
            'date' => now()->toDateString(),
            'memo' => $validated['memo'] ?? null,
            'is_shared' => $validated['is_shared'] ?? 0,
            'created_at' => now()->toDateString(),
            'updated_at' => now()->toDateString(),
        ]);

        // 成功したらリダイレクト
        return redirect()->route('saving-show', [
            'id' => $validated['goal_id'],
            'histories' =>  $histories,
            'savings' =>  $savings,
        ]);
    }

    /**
     * 使ったよモーダル
     */
    public function paid(StoreHistoryRequest $request)
    {
        dd($request->all);
        $validated = $request->validate([
            'user_id' => 'required|integer',
            'category' => 'required|integer',
            'goal_id' => 'required|integer',
            'deadline' => 'required|date',
            'memo' => 'nullable|string',
            'amount' => 'required|numeric',
        ]);

        $id = Auth::id();
        $savings = Saving::where('user_id', $id)->get();

        if ($validated['amount'] <= 0) {
            return redirect()->route('saving-show', [
                'id' => $validated['goal_id'],
                'savings' => $savings,
            ]);
        }

        // 新しい履歴を作成
        $histories = History::create([
            'user_id' => $validated['user_id'],
            'category' => $validated['category'],
            'goal_id' => $validated['goal_id'],
            'amount' => $validated['amount'],
            'date' => now()->toDateString(),
            'memo' => $validated['memo'] ?? null,
            'is_shared' => $validated['is_shared'] ?? 0,
            'created_at' => now()->toDateString(),
            'updated_at' => now()->toDateString(),
        ]);

        // 成功したらリダイレクト
        return redirect()->route('saving-show', [
            'id' => $validated['goal_id'],
            'histories' =>  $histories,
            'savings' =>  $savings,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(History $history)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(History $history)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateHistoryRequest $request, History $history)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(History $history)
    {
        //
    }
}
