<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreDonationRequest;
use App\Http\Requests\UpdateDonationRequest;
use App\Models\Donation;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use App\Models\Comment;

class DonationController extends Controller
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
        $donations = Donation::where('user_id', $user_id)->get();

        // コメントを追加で取得（target_typeが1のコメントを取得）
        $comments = Comment::where('target_type', 5)
            ->whereIn('target_id', $donations->pluck('id'))  // investmentsに関連するコメントのみ取得
            ->get();

        return Inertia::render('Donations/Donations', [
            'listdata' => $donations,
            'comments' => $comments,
        ]);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreDonationRequest $request)
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
        $donations = Donation::create([
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
        event(new Registered($donations));

        // 家計簿作成ページへリダイレクト
        return redirect()->route(
            'donations-create',
        );
    }

    /**
     * Display the specified resource.
     */
    public function show(Donation $donations)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Donation $donations)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateDonationRequest $request, $id)
    {
        // リクエストにteam_idを追加
        $team_id = Auth::user()->team_id;
        $donations_id = $id;
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
        $donations_content = Donation::where('id', $donations_id)
            ->lockForUpdate()
            ->first();

        // 既存のデータを更新
        $donations_content->update(array_merge([
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
        return redirect()->route('donations-create');
    }

    public function updateAchieve(Request $request, $id)
    {
        $donations = Donation::findOrFail($id);
        $donations->achieve = $request->input('achieve'); // 0 or 1
        $donations->save();

        return redirect()->back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Donation $donations, $id)
    {
        Donation::destroy($id);
        return back();
    }
}
