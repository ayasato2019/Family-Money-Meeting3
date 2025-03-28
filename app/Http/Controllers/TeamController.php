<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTeamRequest;
use App\Http\Requests\UpdateTeamRequest;
use Illuminate\Auth\Events\Registered;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\Team;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Illuminate\Validation\ValidationException;

use Endroid\QrCode\QrCode;
use App\Services\QrService;
use Illuminate\Support\Facades\Crypt;
use Endroid\QrCode\Writer\PngWriter;
use Endroid\QrCode\Encoding\Encoding;
use Endroid\QrCode\ErrorCorrectionLevel;
use Endroid\QrCode\RoundBlockSizeMode;
use Endroid\QrCode\Color\Color;

use App\Models\Status;
use App\Models\Saving;
use App\Models\Investments;
use App\Models\Needs;
use App\Models\Wants;
use App\Models\Donation;

class TeamController extends Controller
{
    // use TeamViewProps;

    public function index()
    {
    }


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
            $team_name = null;
        }

        /* QRコード生成 */
        $user = Auth::user();
        $teamMembers = User::select('name', 'team_id')
        ->where('team_id', $user->team_id)
        ->get();
        $team_id = $user->team_id;
        $role = $user->role;

        // URLを作成する
        $appUrl = config('app.url');
        $encryptedTeamId = Crypt::encryptString($team_id);
        $loginChildUrl = $appUrl . '/login-child?team_id=' . urlencode($encryptedTeamId);

        // QRコードを生成
        $qrCode = QrCode::create($loginChildUrl)
            ->setEncoding(new Encoding('UTF-8'))
            ->setErrorCorrectionLevel(ErrorCorrectionLevel::High)
            ->setSize(200)
            ->setMargin(10)
            ->setRoundBlockSizeMode(RoundBlockSizeMode::Margin)
            ->setForegroundColor(new Color(0, 0, 0))
            ->setBackgroundColor(new Color(255, 255, 255));

        $writer = new PngWriter();
        $result = $writer->write($qrCode);

        // Base64 エンコード
        $qrCodeBase64 = 'data:' . $result->getMimeType() . ';base64,' . base64_encode($result->getString());


        return Inertia::render('Teams/CreateTeams', compact(
            'user_id',
            'role',
            'team_name',
            'teamMembers',
            'team_id',
            'role',
            'loginChildUrl',
            'qrCodeBase64'
        ));
    }

    public function store(StoreTeamRequest $request)
    {
        /**
         * チーム名の登録・修正
         */
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
        //
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
        $role = $user->role;

        return Inertia::render('Teams/CreateTeams', compact(
            'team_id',
            'role',
        ));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Team $team)
    {
        //
    }

    public function memberStatus(User $user)
    {
        $authUser = Auth::user();

        // 同じチームのみ許可
        if ($authUser->team_id !== $user->team_id) {
            abort(403, '同じチームのメンバーのみ閲覧可能です。');
        }

        // is_share が true のみ取得（各モデル）

        $status = Status::where('user_id', $user->id)
        ->where('is_shared', 0)
        ->first();

        $savings = Saving::where('user_id', $user->id)
            ->where('is_shared', 0)
            ->get();

        $investments = Investments::where('user_id', $user->id)
            ->where('is_shared', 0)
            ->get();

        $needs = Needs::where('user_id', $user->id)
            ->where('is_shared', 0)
            ->get();

        $wants = Wants::where('user_id', $user->id)
            ->where('is_shared', 0)
            ->get();

        $donations = Donation::where('user_id', $user->id)
            ->where('is_shared', 0)
            ->get();

        return Inertia::render('Teams/MemberStatus', [
            'shared_user' => $user,
            'status' => $status,
            'savings' => $savings,
            'investments' => $investments,
            'needs' => $needs,
            'wants' => $wants,
            'donations' => $donations,
        ]);
    }


}
