import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.tsx',
            refresh: true,
        }),
        react(),
        // env({ prefix: "VITE", mountedPath: "process.env" }),
    ],
    // publicDir: "public", // `public/` をそのまま扱う
    // build: {
    //   outDir: "public/build", // 出力フォルダを `public/build` に指定
    //   emptyOutDir: false, // `build/` 内の既存ファイルを削除しない
    //   assetsDir: "assets", // アセットフォルダのパスを明示
    //   manifest: true, // Laravel 用に `manifest.json` を生成
    // },
});
