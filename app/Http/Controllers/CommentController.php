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
        dd($request->all());

        $validated = $request->validate([
            // 'team_id' => 'required|exists:teams,id',
            // 'user_id_from' => 'required|exists:users,id',
            'user_id_to' => 'required|exists:users,id',
            'comment' => 'required|string'
        ]);

        // //コメントデータを参照
        // $household = Household::find(1);
        // $commentId = $household->comment->id ?? null;

        // $commentId = DB::table('comments')
        //     ->where('id', function ($query) {
        //         $query->select('comment_id')->from('households')->where('id', 1);
        //     })
        //     ->value('id');

        // // $comment = Comment::where('id', $list->comment_id)
        // // ->lockForUpdate()  // ロックをかける
        // // ->first();

        Comment::create([
            'team_id' => $user->team_id,
            'user_id_from' => $user->id,
            // 'user_id_to' => $validated['user_id_to'],
            'comment' => $validated['comment'],
        ]);
        event(new Registered($comment));
        return response()->json(['message' => 'Comment added'], 201);
        return Inertia::render('Teams/CreateTeams');
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
