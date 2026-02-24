import fs from 'fs';

const inputPath = '../src/data/web-licenses.json';

try {
    if (!fs.existsSync(inputPath)) {
        console.error(`❌ Error: ${inputPath} not found. Run license-checker first.`);
        process.exit(1);
    }

    const rawData = fs.readFileSync(inputPath, 'utf8');
    const licenses = JSON.parse(rawData);
    const cleaned = {};

    console.log("⏳ Reading license texts...");

    Object.keys(licenses).forEach((key) => {
        // 自分のプロジェクトや型定義はスキップ
        if (key.startsWith('geometrio') || key.includes('@types/')) return;

        const detail = licenses[key];
        let licenseText = "Full license text is available in the repository.";

        // licenseFile が存在すれば、その中身を読みに行く
        if (detail.licenseFile && fs.existsSync(detail.licenseFile)) {
            try {
                licenseText = fs.readFileSync(detail.licenseFile, 'utf8');
            } catch (e) {
                console.warn(`⚠️ Failed to read: ${detail.licenseFile}`);
            }
        }

        // 必要なデータだけを保持（path や licenseFile はここで捨てる）
        cleaned[key] = { ...detail, licenseText };
        delete cleaned[key].licenseFile;
        delete cleaned[key].path;
    });

    fs.writeFileSync(inputPath, JSON.stringify(cleaned, null, 2));
    console.log("✅ Success: License data generated at src/data/web-licenses.json");
} catch (error) {
    console.error("❌ Error:", error.message);
}
