import { createRequire } from 'module';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// ESM (ECMAScript Modules) 環境で CommonJS の require を使うための設定
// license-checker は古い形式(CommonJS)で書かれているため、import文で直接読み込めない場合があります。
// createRequire を使うことで、Node.jsの標準的な require 関数を作成し、ライブラリを読み込めるようにします。
const require = createRequire(import.meta.url);
const checker = require('license-checker');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 出力先: ReactUI/src/data/web-licenses.json
const OUTPUT_PATH = path.join(__dirname, '../src/data/web-licenses.json');

console.log('Generating web licenses...');

// license-checker の実行
checker.init({
    start: path.join(__dirname, '..'), // ReactUIルート
    production: true, // devDependenciesは除外
    json: true
}, (err, packages) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }

    // データの整形
    const licenses = Object.keys(packages)
        // filter: 条件に合う要素だけを残します。
        // ここでは、自分自身のプロジェクト（react-ui）がライセンス一覧に含まれないように除外しています。
        .filter(key => !key.startsWith('react-ui@')) // 自分自身（このプロジェクト）は除外する
        .map(key => {
            const pkg = packages[key];

            // keyは "package-name@version" の形式なので分離する
            const lastAt = key.lastIndexOf('@');
            const name = key.substring(0, lastAt);
            const version = key.substring(lastAt + 1);

            // ライセンス本文の読み込み
            let licenseText = '';
            if (pkg.licenseFile) {
                try {
                    licenseText = fs.readFileSync(pkg.licenseFile, 'utf-8');
                } catch (e) {
                    console.warn(`Could not read license file for ${key}: ${e.message}`);
                }
            }

            return {
                name: name,
                version: version,
                licenses: pkg.licenses, // 文字列または配列
                repository: pkg.repository,
                publisher: pkg.publisher || pkg.author || '',
                licenseText: licenseText
            };
        });

    // 名前順にソートして保存
    licenses.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
    fs.writeFileSync(OUTPUT_PATH, JSON.stringify(licenses, null, 2));
    console.log(`Successfully generated ${licenses.length} licenses to ${OUTPUT_PATH}`);
});