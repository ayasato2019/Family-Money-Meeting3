<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTeamRequest;
use App\Http\Requests\UpdateTeamRequest;
use Illuminate\Auth\Events\Registered;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\Household;
use Illuminate\Support\Str;
use App\Models\Team;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Illuminate\Validation\ValidationException;

class TeamController extends Controller
{
    /**
     * チーム名の編集ボタン
     */
    public function create()
    {
        $user = Auth::user();
        $user_id = $user->id;
        $role = $user->role;

        // すでにチームが存在している場合はそのチーム情報を取得
        $team = Team::where('email', $user->email)->first();

        if ($team) {
            // チームが存在すれば、そのチーム名をフロントに渡す
            $team_name = $team->team_name;
        } else {
            // チームが存在しない場合、新規作成する
            $team_name = null; // チーム名はnullまたは空で渡す
        }

        return Inertia::render('Teams/CreateTeams', compact(
            'user_id',
            'role',
            'team_name',
        ));
    }

    /**
     * チーム名の登録・修正
     */
    public function store(StoreTeamRequest $request)
    {
        $validated = $request->validate([
            'team_name' => 'required|string|max:255',
        ]);

        $user = Auth::user();

        $team = Team::where('email', $user->email)
        ->lockForUpdate()  // ロックをかける
        ->first();

        if ($team) {
            // すでにチームが存在する場合、更新する処理
            $team->update([
                'team_name' =>  $validated['team_name'],
            ]);
        } else {
            // 新規作成
            $team = Team::create([
                'team_name' =>  $validated['team_name'],
                'email' => $user->email,
            ]);
        }
        event(new Registered($team));

        // update_atを更新できる書き方　save（）だと更新できない
        if ($user->team_id == null) {
            User::where('id', $user->id)->update(['team_id' => $team->id]);
        }
        return redirect()->route('dashboard');
    }
    /**
     * メンバー一覧
     */
    public function add()
    {
        $user = Auth::user();
        $teamMembers = User::select('name', 'team_id')
        ->where('team_id', $user->team_id)
        ->get();
        $team_id = $user->team_id;

        // .envのurlを参照する
        $appUrl = env('APP_URL');

        return Inertia::render('Teams/MemberAdd', compact(
            'teamMembers',
            'team_id',
            'appUrl',
        ));
    }

    /**
     * メンバーの登録
     */
    public function update(UpdateTeamRequest $request, Team $team)
    {
        try {
            $request->validate([
                'team_id' => 'required|integer',
                'childs_name' => 'required|string|max:255',
                'role_child' => 'required|integer',
                'birth_date' => 'date',
                'password' => ['required', 'confirmed', Rules\Password::defaults()],
            ]);
        } catch (ValidationException $e) {
            dd($e->errors());
        }

        // 新しいユーザーの作成
        $user = User::create([
            'name' => $request->childs_name,
            'team_id' => $request->team_id, // チームを紐付け
            'email' => null,
            'birth_date' => $request->birth_date,
            'role' => $request->role_child,
            'password' => Hash::make($request->password),
            'is_active' => 1,
        ]);
        // 必要であればイベントを発火
        event(new Registered($user));

        return redirect()->route('dashboard')->with('success', 'メンバーが仮登録されました。');

    }


    /**
     * 追加用のURL発行
     */
    public function issue()
    {
        $user = Auth::user();
        $team_id = $user->team_id;

        return Inertia::render('Teams/CreateTeams', compact(
            'team_id',
        ));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Team $team)
    {
        //
    }
}
