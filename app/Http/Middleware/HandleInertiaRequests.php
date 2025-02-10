<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
use App\Models\Avatar;
use App\Models\Team;
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
        // ユーザーの team_id からチーム名を取得
        $team_name = Team::where('id', Auth::user()->team_id)->first()?->team_name ?? null;

        // アバターの種類を取得
        $user_avatar = Avatar::where('user_id', Auth::id())->value('type') ?? 0;

        $user = Auth::user();
        $user_id = $user->id;


        // アバターの値を変換
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
                'user' => $request->user(),
            ],
            'user_avatar' => $user_avatar,
            'team_name' => $team_name,
        ];
    }
}
