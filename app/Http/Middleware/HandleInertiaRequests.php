<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
use App\Models\Avatar;
use App\Models\Team;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

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
        // ユーザー情報を取得
        $user = Auth::user();

        // アバターの種類を取得（デフォルト 0）
        $user_avatar = $user ? Avatar::where('user_id', $user->id)->value('type') ?? 0 : 0;

        // チーム情報を取得
        $team = $user ? Team::where('id', $user->team_id)->first() : null;
        $team_id = $team?->id;
        $team_name = $team?->team_name;

        // チームメンバー取得（チームIDがある場合のみ）
        $teamMembers = $team_id ? User::where('team_id', $team_id)->select('name', 'team_id')->get() : collect();

        // アバターのマッピング
        $avatars = [
            0 => "default-avatar",
            1 => "avatar-1",
            2 => "avatar-2",
            3 => "avatar-3",
        ];
        $user_avatar = $avatars[$user_avatar] ?? "default-avatar";

        return [
            ...parent::share($request),
            'auth' => [
                'user' => $user,
            ],
            'user_avatar' => $user_avatar,
            'team_name' => $team_name,
            'team_members' => $teamMembers,
        ];
    }
}
