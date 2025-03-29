<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSavingRequest;
use App\Http\Requests\UpdateSavingRequest;
use App\Models\Saving;
use App\Models\History;
use App\Models\Status;
use Inertia\Inertia;
use Illuminate\Auth\Events\Registered;
use Illuminate\Support\Facades\Auth;

class SavingController extends Controller
{
    /**
     * リスト一覧
     */
    public function index()
    {

        $userId = Auth::id();
        // user_idをキーにした連想配列に変換
        $savings = Saving::where('user_id', $userId)
        ->orderBy('deadline', 'desc')
        ->get();
        // Savingデータ取得
        $histories = History::where('user_id', $userId)
        ->get();
        // statusデータ取得
        $statuses = Status::where('user_id', $userId)->get()->keyBy('user_id');

        return Inertia::render('Saving/SavingList', compact(
            'statuses',
            'savings',
            'histories'
        ));
    }

    /**
     * 目標の閲覧
     */
    public function create()
    {
        return Inertia::render('Saving/SavingCreate');
    }

    /**
     * 目標の登録
     */
    public function store(StoreSavingRequest $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'amount' => 'required|integer',
            'deadline' => 'required|date',
            'level' => 'required|integer',
            'images' => 'nullable|string|max:255',
            'is_shared' => 'required|boolean',
            'memo' => 'nullable|string|max:255',
        ]);

        $user_id = Auth::id();

        $saving = Saving::create([
            'user_id' => $user_id,
            'goal_id' => 1,
            'title' => $validated['title'],
            'amount' => $validated['amount'],
            'deadline' => $validated['deadline'],
            'achieve' => false,
            'level' => $validated['level'],
            'images' => $validated['images'],
            'is_shared' => $validated['is_shared'],
            'memo' => $validated['memo'],
        ]);
        event(new Registered($saving));

        return redirect()->route(
            'saving-index',
        );
    }

    /**
     * 個別の目標を閲覧
     */
    public function show(Saving $id)
    {
        // 現在認証しているユーザーのIDを取得
        $userId = Auth::id();

        // user_idをキーにした連想配列に変換
        $statuses = Status::where('user_id', $userId)->get()->keyBy('user_id');

        // Savingデータ取得
        $savings = $id;

        $histories = History::where('user_id', $userId)->get()->toArray();
        return Inertia::render('Saving/SavingItem', compact(
            'statuses',
            'savings',
            'histories'
        ));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Saving $saving)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSavingRequest $request, Saving $saving)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Saving $saving)
    {
        //
    }
}
