<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreNeedsRequest;
use App\Http\Requests\UpdateNeedsRequest;
use App\Models\Needs;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use App\Models\Comment;

class NeedsController extends Controller
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
        // ユーザーIDを取得
        $user_id = Auth::user()->id;

        // ユーザーに関連する必要を取得
        $needs = Needs::where('user_id', $user_id)->get();

        // コメントを追加で取得（target_typeが1のコメントを取得）
        $comments = Comment::where('target_type', 3)
            ->whereIn('target_id', $needs->pluck('id'))  // investmentsに関連するコメントのみ取得
            ->get();

        // 必要データとコメントをInertiaに渡す
        return Inertia::render('Needs/Needs', [
            'listdata' => $needs,
            'comments' => $comments,
        ]);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreNeedsRequest $request)
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
        $needs = Needs::create([
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
        event(new Registered($needs));

        // 家計簿作成ページへリダイレクト
        return redirect()->route(
            'needs-create',
        );
    }

    /**
     * Display the specified resource.
     */
    public function show(Needs $needs)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Needs $needs)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateNeedsRequest $request, $id)
    {
        // リクエストにteam_idを追加
        $team_id = Auth::user()->team_id;
        $needs_id = $id;
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
        $needs_content = Needs::where('id', $needs_id)
            ->lockForUpdate()
            ->first();

        // 既存のデータを更新
        $needs_content->update(array_merge([
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
        return redirect()->route('needs-create');
    }

    public function updateAchieve(Request $request, $id)
    {
        $needs = Needs::findOrFail($id);
        $needs->achieve = $request->input('achieve'); // 0 or 1
        $needs->save();

        return redirect()->back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Needs $needs, $id)
    {
        Needs::destroy($id);
        return back();
    }
}
