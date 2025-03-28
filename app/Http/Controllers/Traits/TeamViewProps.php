<?php

// namespace App\Http\Controllers\Traits;
// use App\Models\User;
// use Illuminate\Support\Facades\Auth;

// use Endroid\QrCode\QrCode;
// use App\Services\QrService;
// use Illuminate\Support\Facades\Crypt;
// use Endroid\QrCode\Writer\PngWriter;
// use Endroid\QrCode\Encoding\Encoding;
// use Endroid\QrCode\ErrorCorrectionLevel;
// use Endroid\QrCode\RoundBlockSizeMode;
// use Endroid\QrCode\Color\Color;

// trait TeamViewProps
// {
//     public function getTeamViewProps($team): array
//     {
//         $user = Auth::user();
//         $teamMembers = User::select('name', 'team_id')
//         ->where('team_id', $user->team_id)
//         ->get();
//         $team_id = $user->team_id;
//         $role = $user->role;

//         // URLを作成する
//         $appUrl = config('app.url');
//         $encryptedTeamId = Crypt::encryptString($team_id);
//         $loginChildUrl = $appUrl . '/login-child?team_id=' . urlencode($encryptedTeamId);

//         // QRコードを生成
//         $qrCode = QrCode::create($loginChildUrl)
//             ->setEncoding(new Encoding('UTF-8'))
//             ->setErrorCorrectionLevel(ErrorCorrectionLevel::High)
//             ->setSize(200)
//             ->setMargin(10)
//             ->setRoundBlockSizeMode(RoundBlockSizeMode::Margin)
//             ->setForegroundColor(new Color(0, 0, 0))
//             ->setBackgroundColor(new Color(255, 255, 255));

//         $writer = new PngWriter();
//         $result = $writer->write($qrCode);

//         // Base64 エンコード
//         $qrCodeBase64 = 'data:' . $result->getMimeType() . ';base64,' . base64_encode($result->getString());

//         return [
//             'teamMembers',
//             'team_id',
//             'role',
//             'loginChildUrl',
//             'qrCodeBase64'
//         ];
//     }
// }
