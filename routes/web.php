<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ChildaccountSessionController;
use App\Http\Controllers\TeamController;
use App\Http\Controllers\StatusController;
use App\Http\Controllers\HouseholdController;
use App\Http\Controllers\SavingController;
use App\Http\Controllers\HistoryController;
use App\Http\Controllers\InvestmentsController;
use App\Http\Controllers\AvatarController;
use App\Http\Controllers\CommentController;
use App\Models\History;
use App\Models\Investments;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

// use Illuminate\Http\Request;
// use App\Models\Avatar;
// use App\Models\Team;

/* LP ゲスト用ページ */
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

/*ログイン */
Route::get('/login-child', [ChildaccountSessionController::class, 'create'])->name('login-child');
Route::post('/login-child-confirm', [ChildaccountSessionController::class, 'store'])->name('login-child-confirm');

/*マイページ トップ */
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

/* チームのページ メンバー一覧・チーム作成 */
Route::middleware(['auth'])->group(function () {
    Route::get('/teams_registration', [TeamController::class, 'create'])->name('teams-create');
    Route::post('/teams_confirm', [TeamController::class, 'store'])->name('teams-store');
    /* チームのページ メンバー一覧・チーム修正 */
    Route::get('/teams_member', [TeamController::class, 'add'])->name('teams-member');
    Route::post('/teams_member_add', [TeamController::class, 'update'])->name('teams-member-add');
});

/* チームのページ 親カテゴリのみ家計簿ページ */
Route::get('/household_account_book', function () {
    return Inertia::render('HouseholdAccountBook');
})->middleware(['auth', 'verified'])->name('household');

Route::middleware('auth')->group(function () {
    //プロフィール
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    //ステータス
    Route::get('/status', [StatusController::class, 'create'])->name('status-create');
    Route::post('/status_registration', [StatusController::class, 'store'])->name('status-store');

    //家計簿
    Route::get('/household', [HouseholdController::class, 'create'])->name('houseold-create');
    Route::post('/household_registration', [HouseholdController::class, 'store'])->name('houseold-register');
    Route::post('/household_del/{id}', [HouseholdController::class, 'destroy'])->name('houseold-destroy');
    Route::get('/household_del/{id}', function () {
        return redirect('/household');
    });
    Route::post('/household_edit/{id}', [HouseholdController::class, 'update'])->name('houseold-update');
    Route::get('/household_edit/{id}', function () {
        return redirect('/household');
    });
    Route::patch('/household/achieve/{id}', [HouseholdController::class, 'updateAchieve'])
    ->name('household-achieve');


    //貯金
    Route::get('/saving', [SavingController::class, 'create'])->name('saving-create');
    Route::post('/saving_registration', [SavingController::class, 'store'])->name('saving-register');
    Route::get('/saving/list', [SavingController::class, 'index'])->name('saving-index');

    //目標の詳細ページ
    Route::get('/saving/saving_{id}', [SavingController::class, 'show'])->name('saving-show');
    Route::post('/saving/update', [HistoryController::class, 'store'])->name('saving-update');
    // Route::post('/saving/paid', [HistoryController::class, 'paid'])->name('saving-index');

    //アバターアップデート
    Route::patch('/avatarupdate', [AvatarController::class, 'update'])->name('avatar-update');

    //コメント
    Route::post('/comments', [CommentController::class, 'store'])->name('comment');
    Route::get('/comments/{targetType}/{targetId}', [CommentController::class, 'show'])->name('comments-show');

    // //投資の登録
    Route::get('/investments', [InvestmentsController::class, 'create'])->name('houseold-create');
    Route::post('/investments_registration', [InvestmentsController::class, 'store'])->name('houseold-register');
    Route::post('/investmentsd_del/{id}', [InvestmentsController::class, 'destroy'])->name('houseold-destroy');
    Route::get('/investments_del/{id}', function () {
        return redirect('/investments');
    });
    Route::post('/investments_edit/{id}', [InvestmentsController::class, 'update'])->name('houseold-update');
    Route::get('/investments_edit/{id}', function () {
        return redirect('/investments');
    });
    Route::patch('/investments/achieve/{id}', [InvestmentsController::class, 'updateAchieve'])
    ->name('investments-achieve');    // Route::post('/investment-confirm', [InvestmentController::class, 'store'])->name('investment-confirm');
    // //必要の登録
    Route::get('/expenses-registration', [AvatarController::class, 'create'])->name('expenses-index');
    // Route::post('/expenses-confirm', [ExpensesController::class, 'store'])->name('expenses-confirm');
    // //欲しいの登録
    Route::get('/extravagance-registration', [AvatarController::class, 'create'])->name('extravagance-index');
    // Route::post('/extravagance-confirm', [ExtravaganceController::class, 'store'])->name('extravagance-confirm');
    // //寄付の登録
    Route::get('/donation-registration', [AvatarController::class, 'create'])->name('donation-index');
    // Route::post('/donation-confirm', [DonationController::class, 'store'])->name('donation-confirm');
    // // ゲームページ
    // Route::get('/game-registration', [GameController::class, 'create'])->name('game-create');
    // Route::post('/game-confirm', [GameController::class, 'store'])->name('game-confirm');
    // //ユーザーページ
    // Route::get('/userpage', [StatusController::class, 'index'])
    //     ->middleware(['auth', 'verified'])->name('Saving_List');
    // //目標の詳細ページ
    // Route::get('/{id}', [SavingController::class, 'show'])->name('saving.show');
    // Route::post('/update', [HistoryController::class, 'store'])->name('update');
});

//チームメンバーのページ
Route::middleware(['auth'])->group(function () {
    Route::get('/team/status/{user}', [TeamController::class, 'memberStatus'])
        ->name('team.status.show');
});


require __DIR__ . '/auth.php';
