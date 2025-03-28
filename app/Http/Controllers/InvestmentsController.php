<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreInvestmentsRequest;
use App\Http\Requests\UpdateInvestmentsRequest;
use App\Models\Investments;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use App\Models\Comment;

class InvestmentsController extends Controller
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

        // ユーザーに関連する投資を取得
        $investments = Investments::where('user_id', $user_id)->get();

        // コメントを追加で取得（target_typeが1のコメントを取得）
        $comments = Comment::where('target_type', 2)
            ->whereIn('target_id', $investments->pluck('id'))  // investmentsに関連するコメントのみ取得
            ->get();

        // 投資データとコメントをInertiaに渡す
        return Inertia::render('Investments/Investments', [
            'listdata' => $investments,
            'comments' => $comments,
        ]);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreInvestmentsRequest $request)
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
        $investments = Investments::create([
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
        event(new Registered($investments));

        // 家計簿作成ページへリダイレクト
        return redirect()->route(
            'investments-create',
        );
    }

    /**
     * Display the specified resource.
     */
    public function show(Investments $investments)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Investments $investments)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateInvestmentsRequest $request, $id)
    {
        // リクエストにteam_idを追加
        $team_id = Auth::user()->team_id;
        $investments_id = $id;
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
        $investments_content = Investments::where('id', $investments_id)
            ->lockForUpdate()
            ->first();

        // 既存のデータを更新
        $investments_content->update(array_merge([
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
        return redirect()->route('investments-create');
    }

    public function updateAchieve(Request $request, $id)
    {
        $investments = Investments::findOrFail($id);
        $investments->achieve = $request->input('achieve'); // 0 or 1
        $investments->save();

        return redirect()->back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Investments $investments, $id)
    {
        Investments::destroy($id);
        return back();
    }
}
