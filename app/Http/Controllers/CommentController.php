<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCommentRequest;
use App\Http\Requests\UpdateCommentRequest;
use App\Models\Comment;
use Illuminate\Support\Facades\Auth;
use Illuminate\Auth\Events\Registered;
use Inertia\Inertia;

use App\Models\Household;
use App\Models\Saving;
use App\Models\Investments;
use App\Models\Needs;
use App\Models\Wants;
use App\Models\Donation;

class CommentController extends Controller
{
    /**
     * コメント書き込み
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

        // コメント作成後に関連するテーブルのcomment_idを設定
        switch ($validated['target_type']) {
            case 0: // Household
                $householdItem = Household::find($validated['target_id']);
                if ($householdItem) {
                    $householdItem->update([
                        'comment_id' => $comment->id // 作成したコメントのIDを関連付ける
                    ]);
                }
                break;
            case 1: // Saving
                $savingItem = Saving::find($validated['target_id']);
                if ($savingItem) {
                    $savingItem->update([
                        'comment_id' => $comment->id
                    ]);
                }
                break;
            case 2: // Investment
                $investmentItem = Investments::find($validated['target_id']);
                if ($investmentItem) {
                    $investmentItem->update([
                        'comment_id' => $comment->id
                    ]);
                }
                break;
            case 3: // Need
                $needItem = Needs::find($validated['target_id']);
                if ($needItem) {
                    $needItem->update([
                        'comment_id' => $comment->id
                    ]);
                }
                break;
            case 4: // Want
                $wantItem = Wants::find($validated['target_id']);
                if ($wantItem) {
                    $wantItem->update([
                        'comment_id' => $comment->id
                    ]);
                }
                break;
            case 5: // Donation
                $donationItem = Donation::find($validated['target_id']);
                if ($donationItem) {
                    $donationItem->update([
                        'comment_id' => $comment->id
                    ]);
                }
                break;
            default:
                throw new \Exception('Invalid target type');
        }

        // コメント作成後にイベントを発火
        event(new Registered($comment));  // もしCommentCreatedのような専用イベントがあればそれを使う

    // コントローラーでリダイレクト
    return redirect()->back()->with('reload', true);
    }

    /**
     * コメント表示
     */
    public function show($targetType, $targetId)
    {
        // target_typeに応じて異なるモデルを取得
        $model = $this->index($targetType);  // $targetTypeは整数値として渡される
        $item = $model::find($targetId);  // モデルから対象アイテムを取得

        // コメントを取得
        $comments = Comment::where('target_id', $targetId)
            ->where('target_type', $targetType)  // target_typeが一致するものを取得
            ->get();
        // もしアイテムが見つからない場合はエラーメッセージを返す
        if (!$item) {
            return response()->json(['error' => 'アイテムが見つかりません'], 404);
        }
        // コメントを返す
        return response()->json($comments);
    }

    /**
     * 場所によってだしわけ
     */
    public function index($targetType)
    {
        switch ($targetType) {
            case 0: return Household::class;
            case 1: return Saving::class;
            case 2: return Investments::class;
            case 3: return Needs::class;
            case 4: return Wants::class;
            case 5: return Donation::class;
            default: throw new \Exception('Invalid target type');
        }
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
