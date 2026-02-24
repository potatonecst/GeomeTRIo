import fs from 'fs';
import path from 'path';

// パス設定
// path.resolve('..'): 現在のディレクトリ(ReactUI)の親ディレクトリ(Unityプロジェクトルート)の絶対パスを取得します。
const projectRoot = path.resolve('..'); // ReactUIの親ディレクトリ (Unityプロジェクトルート)
const packageCache = path.join(projectRoot, 'Library/PackageCache');
const outputJson = './src/data/unity-licenses.json';

// 手動で追加するライセンス（フォントなど、PackageCacheにないもの）
// licenseFilePath は Unityプロジェクトルートからの相対パスで指定します。
// ※事前に Assets/Licenses/ フォルダなどを作成し、OFL.txt等を配置してください。
const manualLicenses = [
    {
        name: "Melete",
        version: "0.200",
        licenses: "OFL-1.1",
        repository: "https://dotcolon.net/font/melete/",
        publisher: "DotColon",
        licenseFilePath: "Assets/Licenses/Melete_OFL.txt"
    },
    {
        name: "Input Prompts",
        version: "1.4.1",
        licenses: "CC0 1.0 Universal",
        repository: "https://kenney.nl/assets/input-prompts",
        publisher: "Kenney",
        licenseFilePath: "Assets/Licenses/InputPrompts_CC0.txt"
    },
    {
        name: "Jint",
        version: "4.2.2",
        licenses: "BSD-2-Clause",
        repository: "https://github.com/sebastienros/jint",
        publisher: "Sebastien Ros",
        // ReactUnityに含まれている場合が多いですが、念のため
        licenseText: "BSD 2-Clause License\n\nCopyright (c) 2013, Sebastien Ros\nAll rights reserved..."
    }
];

// ライセンスファイル名の候補
const licenseFileNames = ['LICENSE', 'LICENSE.md', 'LICENSE.txt', 'License.txt'];

try {
    console.log("🔍 Scanning Unity Packages...");
    const licenses = [];

    // 1. PackageCache の走査
    // fs.existsSync: ファイルやディレクトリが存在するかどうかを確認します。
    // 同期処理(Sync)なので、結果が返ってくるまで処理が止まりますが、ビルドスクリプトなので問題ありません。
    if (fs.existsSync(packageCache)) {
        // fs.readdirSync: ディレクトリ内のファイル・フォルダ名の一覧を配列で取得します。
        const packages = fs.readdirSync(packageCache);

        packages.forEach(dirName => {
            // path.join: パス区切り文字(/や\)をOSに合わせて自動で調整して結合します。
            const packagePath = path.join(packageCache, dirName);
            const packageJsonPath = path.join(packagePath, 'package.json');

            // package.json があるディレクトリのみ対象
            if (fs.existsSync(packageJsonPath)) {
                try {
                    // fs.readFileSync: ファイルの内容を読み込みます。'utf8'を指定して文字列として取得します。
                    // JSON.parse: JSON文字列をJavaScriptのオブジェクトに変換します。
                    const pkgData = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

                    // 必要な情報を抽出
                    const entry = {
                        name: pkgData.displayName || pkgData.name,
                        version: pkgData.version,
                        licenses: pkgData.license || "Unknown",
                        repository: pkgData.repository ? (pkgData.repository.url || pkgData.repository) : "",
                        publisher: pkgData.author ? (pkgData.author.name || pkgData.author) : (pkgData.unity ? "Unity Technologies" : ""),
                        licenseText: "License text not found."
                    };

                    // ライセンス本文を探す
                    for (const fileName of licenseFileNames) {
                        const licensePath = path.join(packagePath, fileName);
                        if (fs.existsSync(licensePath)) {
                            entry.licenseText = fs.readFileSync(licensePath, 'utf8');
                            break;
                        }
                    }

                    licenses.push(entry);
                    console.log(`  ✅ Found: ${entry.name}`);
                } catch (e) {
                    console.warn(`  ⚠️ Failed to parse ${dirName}: ${e.message}`);
                }
            }
        });
    } else {
        console.warn(`⚠️ PackageCache not found at ${packageCache}. Make sure you have opened the Unity project at least once.`);
    }

    // 2. 手動ライセンスの処理
    console.log("🔍 Processing Manual Licenses...");
    manualLicenses.forEach(item => {
        const entry = { ...item };

        // ファイルパス指定がある場合は読み込む
        if (entry.licenseFilePath) {
            const fullPath = path.join(projectRoot, entry.licenseFilePath);
            if (fs.existsSync(fullPath)) {
                entry.licenseText = fs.readFileSync(fullPath, 'utf8');
            } else {
                console.warn(`  ⚠️ License file not found: ${entry.licenseFilePath}`);
                if (!entry.licenseText) entry.licenseText = "License file missing.";
            }
            delete entry.licenseFilePath; // パス情報は出力しない
        }

        licenses.push(entry);
        console.log(`  ✅ Added: ${entry.name}`);
    });

    // 3. JSON出力
    // ディレクトリがなければ作成
    const outDir = path.dirname(outputJson);
    if (!fs.existsSync(outDir)) {
        fs.mkdirSync(outDir, { recursive: true });
    }

    // ライセンス本文が見つからなかったエントリを除外する
    const validLicenses = licenses.filter(entry => entry.licenseText !== "License text not found." && entry.licenseText !== "License file missing.");

    fs.writeFileSync(outputJson, JSON.stringify(validLicenses, null, 2));
    console.log(`🎉 Successfully generated ${outputJson} with ${validLicenses.length} entries (Filtered from ${licenses.length}).`);

} catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
}
