<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreStatusRequest;
use App\Http\Requests\UpdateStatusRequest;
use App\Models\Status;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Auth\Events\Registered;

class StatusController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * ステータスがあれば表示させる
     */
    public function create()
    {
        $user = Auth::user();
        $status = Status::where('user_id', $user->id)->first();
        if($status) {
            $saving = $status->saving;
            $investment = $status->investment;
            $need = $status->need;
            $want = $status->want;
            $donation = $status->donation;
            $is_share = $status->is_share;
        } else {
            $saving = 0;
            $investment = 0;
            $need = 0;
            $want = 0;
            $donation = 0;
            $is_share = 0;
        }
        return Inertia::render('Status/Status', compact(
            'saving',
            'investment',
            'need',
            'want',
            'donation',
            'is_share',
        ));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreStatusRequest $request)
    {
        $validated = $request->validate([
            'saving' => 'required|integer',
            'investment' => 'required|integer',
            'need' => 'required|integer',
            'want' => 'required|integer',
            'donation' => 'required|integer',
            'is_shared' => 'required|integer',
        ]);

        $user = Auth::user();

        $status = Status::where('user_id', $user->id)
        ->first();

        if ($status) {
            // すでにチームが存在する場合、更新する処理
            $status->update([
                'user_id' =>  $user->id,
                'saving' =>  $validated['saving'],
                'investment' =>  $validated['investment'],
                'need' =>  $validated['need'],
                'want' =>  $validated['want'],
                'donation' =>  $validated['donation'],
                'is_shared' =>  $validated['is_shared'],
            ]);
        } else {
            // 新規作成
            $status = Status::create([
                'user_id' =>  $user->id,
                'saving' =>  $validated['saving'],
                'investment' =>  $validated['investment'],
                'need' =>  $validated['need'],
                'want' =>  $validated['want'],
                'donation' =>  $validated['donation'],
                'game_level' =>  0,
                'game_life' =>  4,
                'is_shared' =>  $validated['is_shared'],
            ]);
        }
        event(new Registered($status));

        return redirect()->route('dashboard');
    }

    /**
     * Display the specified resource.
     */
    public function show(Status $status)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Status $status)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateStatusRequest $request, Status $status)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Status $status)
    {
        //
    }
}
