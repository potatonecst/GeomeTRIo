import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig(({ command }) => {
  const pages = {
    title: path.resolve(__dirname, 'src/title/index.tsx'),
    game: path.resolve(__dirname, 'src/game/index.tsx'),
  };

  const targetPage = process.env.TARGET_PAGE as keyof typeof pages | undefined;

  return {
    plugins: [react()],
    build: {
      // Unityの Resources フォルダに直接出力
      outDir: '../Assets/Resources/react',
      // 個別ビルド時にフォルダを空にしないように制御 (スクリプト側で掃除する)
      emptyOutDir: !targetPage,
      rollupOptions: {
        // ビルド時は単一エントリ、開発時は全エントリ
        input: (command === 'build' && targetPage) ? { [targetPage]: pages[targetPage] } : pages,
        output: {
          // ファイル名を固定 (ハッシュ値を付けない)
          entryFileNames: '[name].js',
          chunkFileNames: '[name].js',
          assetFileNames: '[name].[ext]',
          format: 'iife', // ReactUnity用に即時実行関数として出力
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
