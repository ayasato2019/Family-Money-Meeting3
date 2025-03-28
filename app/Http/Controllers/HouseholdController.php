<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreHouseholdRequest;
use App\Http\Requests\UpdateHouseholdRequest;
use App\Models\Household;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use App\Models\Comment;

class HouseholdController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * 家計簿を閲覧させる
     */
    public function create()
    {
        // チームの家計簿を取得
        $team_id = Auth::user()->team_id;
        $role = Auth::user()->role;
        $household = Household::where('team_id', $team_id)->get();

        // コメントを追加で取得
        $comments = Comment::where('target_type', 1)
        ->whereIn('target_id', $household->pluck('id')) // household に関連するコメントのみ
        ->get();

        return Inertia::render('Household/Household', [
            'household' => $household,
            // 'role' => $role,
            'comments' => $comments,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreHouseholdRequest $request)
    {
        // ユーザーIDを取得
        $user_id = Auth::id();

        // 現在のユーザーのチームIDを取得
        $team_id = Auth::user()->team_id;

        // リクエストにteam_idを追加
        $request->merge(['team_id' => $team_id]);

        // リクエストデータのバリデーション
        $validated = $request->validate([
            'team_id' => 'required|integer',
            'title' => 'required|string|max:255',
            'price' => 'required|integer',
            'date' => 'required|string|max:255',
            'is_shared' => 'nullable|boolean',
            'images' => 'nullable|string|max:255',
            'memo' => 'nullable|string|max:255',
        ]);

        // バリデートされたデータに追加情報を設定
        $validated['comment_id'] = null;
        $validated['achieve'] = false;

        // 新規データを作成
        $household = Household::create([
            'team_id' => $team_id,
            'user_id' => $user_id,
            'title' => $validated['title'],
            'price' => $validated['price'],
            'date' => $validated['date'],
            'is_shared' => $validated['is_shared'],
            'images' => $validated['images'],
            'memo' => $validated['memo'],
            'comment_id' => null,
            'achieve' => false,
        ]);

        // イベントをトリガー
        event(new Registered($household));

        // 家計簿作成ページへリダイレクト
        return redirect()->route(
            'houseold-create',
        );
    }


    /**
     * Display the specified resource.
     */
    public function show(Household $household)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Household $household)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateHouseholdRequest $request, $id)
    {
        // リクエストにteam_idを追加
        $team_id = Auth::user()->team_id;
        $household_id = $id;
        $request->merge(['team_id' => $team_id]);

        $validated = $request->validate([
            'team_id' => 'required|integer',
            'title' => 'required|string|max:255',
            'price' => 'required|integer',
            'date' => 'required|string|max:255',
            'is_shared' => 'nullable|boolean',
            'images' => 'nullable|string|max:255',
            'memo' => 'nullable|string|max:255',
        ]);


        // 既存のデータを更新する場合
        $household_content = Household::where('id', $household_id)
            ->lockForUpdate()
            ->first();

        // 既存のデータを更新
        $household_content->update(array_merge([
            'team_id' => $team_id,
            'title' => $validated['title'],
            'price' => $validated['price'],
            'date' => $validated['date'],
            'is_shared' => $validated['is_shared'],
            'images' => $validated['images'],
            'memo' => $validated['memo'],
            'comment_id' => null,
            'achieve' => false,
        ], $validated));

        // 家計簿作成ページへリダイレクト
        return redirect()->route('houseold-create');
    }

    public function updateAchieve(Request $request, $id)
    {
        $household = Household::findOrFail($id);
        $household->achieve = $request->input('achieve'); // 0 or 1
        $household->save();

        return redirect()->back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        Household::destroy($id);
        return back();
    }
}
