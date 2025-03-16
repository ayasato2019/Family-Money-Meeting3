<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
use App\Models\Avatar;
use App\Models\Team;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use App\Models\Status;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        // 現在ログインしているユーザー
        $user = Auth::user();

        // ユーザーのアバター情報を取得（デフォルト 0）
        $avatar = Avatar::where('type', 0)->first();
        $user_avatar = $avatar && $avatar->filename ? $avatar->filename : 'avatar_child_1.webp';

        // チーム情報を取得
        $team = $user ? Team::where('id', $user->team_id)->first() : null;
        $team_id = $team?->id;
        $team_name = $team?->team_name;

        // チームメンバーを取得（チームがある場合のみ）
        $teamMembers = $team_id ? User::where('team_id', $team_id)->select('id', 'name', 'team_id')->get() : collect();

        return [
            ...parent::share($request),

            // 認証情報
            'auth' => [
                'user' => $user ? [
                    'id' => $user->id,
                    'name' => $user->name,
                ] : null,
            ],

            // 認証ユーザーのアバターURL
            'avatar' => $user_avatar,

            // チーム情報
            'team_id' => $team_id,
            'team_name' => $team_name,
            'team_members' => $teamMembers,

            // ステータス情報
            'statuses' => $user ? Status::where('user_id', $user->id)->get()->keyBy('user_id') : [],
        ];
    }
}
