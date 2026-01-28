import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig(() => {
  const pages = {
    title: path.resolve(__dirname, 'src/title/index.tsx'),
    game: path.resolve(__dirname, 'src/game/index.tsx'),
    background: path.resolve(__dirname, 'src/game/background.tsx'),
  };

  // 環境変数からターゲットを取得、指定がなければ 'title' をデフォルトとする
  const targetPage = (process.env.TARGET_PAGE as keyof typeof pages) || 'title';

  return {
    plugins: [react()],
    build: {
      // Unityの Resources フォルダに直接出力
      outDir: '../Assets/Resources/react',
      // ターゲット指定ビルドになるため、自動削除は無効化（必要な場合は別途スクリプトで削除）
      emptyOutDir: false,
      rollupOptions: {
        // IIFE形式では単一エントリしかサポートされないため、常に1つに絞る
        input: { [targetPage]: pages[targetPage] },
        output: {
          // ファイル名を固定 (ハッシュ値を付けない)
          entryFileNames: '[name].js',
          chunkFileNames: '[name].js',
          assetFileNames: '[name].[ext]',
          format: 'iife' as const, // ReactUnity用に即時実行関数として出力
          name: 'ReactApp',
        },
      },
      target: 'es2015',
      minify: false, // デバッグしやすいように圧縮を無効化
    },
    define: {
      'process.env': {},
    },
  };
})
