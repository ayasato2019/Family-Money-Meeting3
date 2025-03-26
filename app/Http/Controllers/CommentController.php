<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCommentRequest;
use App\Http\Requests\UpdateCommentRequest;
use App\Models\Comment;
use Illuminate\Support\Facades\Auth;
use Illuminate\Auth\Events\Registered;
use App\Models\Household;
use Inertia\Inertia;

class CommentController extends Controller
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
     * コメントコントローラー
     */
    public function store(StoreCommentRequest $request)
    {
        $validated = $request->validate([
            'team_id' => 'required|integer',
            'user_id_to' => 'required|integer',
            'target_type' => 'required|integer', // 0household, 1貯金, 2投資, 3必要, 4欲しい 5寄付 のいずれか
            'target_id' => 'required|integer',
            'comment' => 'required|string|max:1000', // コメントは文字列で最大1000文字まで
        ]);

        // 現在ログインしているユーザー情報を取得
        $user = Auth::user();

        // 新規コメント作成
        $comment = Comment::create([
            'user_id_from' => $user->id, // user_id_fromは必須
            'user_id_to' => $validated['user_id_to'],
            'target_type' => $validated['target_type'],
            'target_id' => $validated['target_id'],
            'comment' => $validated['comment'],
            'team_id' => $validated['team_id'], // 必要に応じてteam_idを設定
        ]);

        // コメント作成後にイベントを発火
        event(new Registered($comment));  // もしCommentCreatedのような専用イベントがあればそれを使う

        // 作成完了後、リダイレクト
        return redirect()->back();
        // // id が 0 なら新規登録
        // if ($validated['id'] == 0) {

        // } else {
        //     // id が 1 以上ならコメントの更新
        //     $comment = Comment::find($validated['id']);

        //     // コメントが見つからない場合、エラーメッセージを表示
        //     if (!$comment) {
        //         return redirect()->back()->withErrors(['error' => 'コメントが見つかりません。']);
        //     }

        //     // 更新する場合、ユーザーが自分のコメントのみを編集できるように
        //     if ($comment->user_id_from == $user->id) {
        //         $comment->update([
        //             'comment' => $validated['comment'],
        //         ]);
        //         event(new Registered($comment));
        //     }
        // }
    }

    /**
     * Display the specified resource.
     */
    public function show(Comment $comment)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Comment $comment)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCommentRequest $request, Comment $comment)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Comment $comment)
    {
        //
    }
}
