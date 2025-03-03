<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreHistoryRequest;
use App\Http\Requests\UpdateHistoryRequest;
use App\Models\History;
use App\Models\Saving;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class HistoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreHistoryRequest $request)
    {
        // バリデーション
        $validated = $request->validate([
            'user_id' => 'required|integer',
            'category' => 'required|integer',
            'goal_id' => 'required|integer',
            'deadline' => 'required|date',
            'amount_saved' => 'required|numeric',
        ]);

        $id = Auth::id();
        $savings = Saving::where('user_id', $id)->get();

        // 新しい履歴を作成
        $history = new History();
        $history->user_id = $request->user_id;
        $history->category = $request->category;
        // dd($history);
        $history->goal_group_id = $request->goal_group_id;
        $history->amount_saved = $request->amount_saved;
        $history->date_saved = $request->date_saved;
        $history->memo = $request->memo ?? null; // メモがあれば保存
        $history->is_shared = $request->is_shared ?? false; // 共有設定があれば保存
        $history->created_at = now(); // 作成日時をセット
        $histories = History::where('user_id', $id)->get();

        if($request->amount_saved != 0) {
            $history->save(); // 履歴を保存
        }
        // 成功したらリダイレクト
        return redirect()->route('saving-show', [
            'id' => $request->goal_id,
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
