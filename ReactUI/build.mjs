import { build } from 'vite';
import fs from 'fs';
import path from 'path';

// 出力先 (UnityのResourcesフォルダ)
const outDir = path.resolve(process.cwd(), '../Assets/Resources/react');

// ビルド前に出力ディレクトリをクリーンアップ
if (fs.existsSync(outDir)) {
    console.log(`Cleaning ${outDir}...`);
    fs.rmSync(outDir, { recursive: true, force: true });
}

// ビルド対象のページ一覧
const pages = ['title', 'game', 'background'];

for (const page of pages) {
    console.log(`\n--- Building ${page} ---`);
    process.env.TARGET_PAGE = page;
    await build();
}