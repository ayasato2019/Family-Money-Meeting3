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
use App\Http\Controllers\NeedsController;
use App\Http\Controllers\WantsController;
use App\Http\Controllers\DonationController;
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
    Route::post('/saving/paid', [HistoryController::class, 'paid'])->name('saving-paid-update');

    //アバターアップデート
    Route::patch('/avatarupdate', [AvatarController::class, 'update'])->name('avatar-update');

    //コメント
    Route::post('/comments', [CommentController::class, 'store'])->name('comment');
    Route::get('/comments/{targetType}/{targetId}', [CommentController::class, 'show'])->name('comments-show');

    // //投資の登録
    Route::get('/investments', [InvestmentsController::class, 'create'])->name('investments-create');
    Route::post('/investments_registration', [InvestmentsController::class, 'store'])->name('investments-register');
    Route::post('/investmentsd_del/{id}', [InvestmentsController::class, 'destroy'])->name('investments-destroy');
    Route::get('/investments_del/{id}', function () {
        return redirect('/investments');
    });
    Route::post('/investments_edit/{id}', [InvestmentsController::class, 'update'])->name('investments-update');
    Route::get('/investments_edit/{id}', function () {
        return redirect('/investments');
    });
    Route::patch('/investments/achieve/{id}', [InvestmentsController::class, 'updateAchieve'])
    ->name('investments-achieve');

    //必要の登録
    Route::get('/needs', [NeedsController::class, 'create'])->name('needs-create');
    Route::post('/needs_registration', [NeedsController::class, 'store'])->name('needs-register');
    Route::post('/needs_del/{id}', [NeedsController::class, 'destroy'])->name('needs-destroy');
    Route::get('/needs_del/{id}', function () {
        return redirect('/needs');
    });
    Route::post('/needs_edit/{id}', [NeedsController::class, 'update'])->name('needs-update');
    Route::get('/needs_edit/{id}', function () {
        return redirect('/needs');
    });
    Route::patch('/needs/achieve/{id}', [NeedsController::class, 'updateAchieve'])
    ->name('needs-achieve');

    //欲しいの登録
    Route::get('/wants', [WantsController::class, 'create'])->name('wants-create');
    Route::post('/wants_registration', [WantsController::class, 'store'])->name('wants-register');
    Route::post('/wants_del/{id}', [WantsController::class, 'destroy'])->name('wants-destroy');
    Route::get('/wants_del/{id}', function () {
        return redirect('/wants');
    });
    Route::post('/wants_edit/{id}', [WantsController::class, 'update'])->name('wants-update');
    Route::get('/wants_edit/{id}', function () {
        return redirect('/wants');
    });
    Route::patch('/wants/achieve/{id}', [WantsController::class, 'updateAchieve'])
    ->name('wants-achieve');

    //寄付の登録
    Route::get('/donations', [DonationController::class, 'create'])->name('donations-create');
    Route::post('/donations_registration', [DonationController::class, 'store'])->name('donations-register');
    Route::post('/donations_del/{id}', [DonationController::class, 'destroy'])->name('donations-destroy');
    Route::get('/donations_del/{id}', function () {
        return redirect('/donations');
    });
    Route::post('/donations_edit/{id}', [DonationController::class, 'update'])->name('donations-update');
    Route::get('/donations_edit/{id}', function () {
        return redirect('/donations');
    });
    Route::patch('/donations/achieve/{id}', [DonationController::class, 'updateAchieve'])
    ->name('donations-achieve');

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
