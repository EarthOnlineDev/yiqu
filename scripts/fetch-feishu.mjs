/**
 * Fetch data from Feishu Bitable and download images
 * Usage: node scripts/fetch-feishu.mjs
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, "..");

// Load env
const envPath = path.join(PROJECT_ROOT, ".env.local");
const envContent = fs.readFileSync(envPath, "utf-8");
const env = {};
envContent.split("\n").forEach((line) => {
  const [key, ...vals] = line.split("=");
  if (key && vals.length > 0) env[key.trim()] = vals.join("=").trim();
});

const APP_ID = env.FEISHU_APP_ID;
const APP_SECRET = env.FEISHU_APP_SECRET;
const APP_TOKEN = env.FEISHU_APP_TOKEN;
const TABLE_ID = env.FEISHU_TABLE_ID;

const OUTPUT_DIR = path.join(PROJECT_ROOT, "public", "images", "works");

async function getTenantAccessToken() {
  const res = await fetch(
    "https://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        app_id: APP_ID,
        app_secret: APP_SECRET,
      }),
    }
  );
  const data = await res.json();
  if (data.code !== 0) {
    throw new Error(`Failed to get token: ${JSON.stringify(data)}`);
  }
  console.log("✓ Got tenant access token");
  return data.tenant_access_token;
}

async function listRecords(token) {
  const url = `https://open.feishu.cn/open-apis/bitable/v1/apps/${APP_TOKEN}/tables/${TABLE_ID}/records?page_size=100`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  if (data.code !== 0) {
    throw new Error(`Failed to list records: ${JSON.stringify(data)}`);
  }
  console.log(`✓ Fetched ${data.data.items.length} records`);
  return data.data.items;
}

async function downloadAttachment(token, fileToken, filename) {
  const url = `https://open.feishu.cn/open-apis/drive/v1/medias/${fileToken}/download`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    console.error(`  ✗ Failed to download ${filename}: ${res.status}`);
    return null;
  }

  const buffer = Buffer.from(await res.arrayBuffer());
  const outputPath = path.join(OUTPUT_DIR, filename);
  fs.writeFileSync(outputPath, buffer);
  console.log(`  ✓ Downloaded ${filename} (${(buffer.length / 1024).toFixed(0)}KB)`);
  return `/images/works/${filename}`;
}

/**
 * Extract a readable string from a Feishu Bitable field value.
 * Handles: plain string, number (timestamp ms), rich-text array, object with text.
 */
function extractText(value) {
  if (value == null) return "";
  if (typeof value === "string") return value;
  // Date fields come as timestamp in milliseconds
  if (typeof value === "number") {
    const d = new Date(value);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}.${m}.${day}`;
  }
  // Rich-text: array of { text: "..." } segments
  if (Array.isArray(value)) {
    return value.map((seg) => (seg && seg.text) || "").join("");
  }
  if (typeof value === "object" && value.text) return value.text;
  return String(value);
}

async function main() {
  console.log("=== Fetching data from Feishu Bitable ===\n");

  // Ensure output dir
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  // Step 1: Get token
  const token = await getTenantAccessToken();

  // Step 2: List records
  const records = await listRecords(token);

  // Step 3: Process records and download images
  const works = [];

  for (const record of records) {
    const fields = record.fields;
    const title = fields["作品标题"];
    const description = fields["作品描述"];
    const series = fields["系列名"];
    const publishDate = fields["发布时间"];
    const location = fields["发布地点"];
    const attachments = fields["作品图片"];

    console.log(`\nProcessing: ${title}`);

    const images = [];
    if (attachments && Array.isArray(attachments)) {
      for (let i = 0; i < attachments.length; i++) {
        const att = attachments[i];
        const ext = att.name?.split(".").pop() || "jpg";
        const safeTitle = (title || "untitled")
          .replace(/[^a-zA-Z0-9\u4e00-\u9fff]/g, "-")
          .substring(0, 20);
        const filename = `${safeTitle}-${i + 1}.${ext}`;
        const localPath = await downloadAttachment(
          token,
          att.file_token,
          filename
        );
        if (localPath) {
          images.push({
            src: localPath,
            name: att.name,
            width: att.width,
            height: att.height,
          });
        }
      }
    }

    works.push({
      id: record.record_id,
      title: title || "",
      description: description
        ? Array.isArray(description)
          ? description.map((d) => d.text || "").join("")
          : typeof description === "string"
            ? description
            : String(description)
        : "",
      series: series || "",
      publishDate: extractText(publishDate),
      location: extractText(location),
      images,
    });
  }

  // Step 4: Write JSON data file
  const dataPath = path.join(PROJECT_ROOT, "src", "data", "works.json");
  fs.mkdirSync(path.dirname(dataPath), { recursive: true });
  fs.writeFileSync(dataPath, JSON.stringify(works, null, 2));
  console.log(`\n✓ Wrote ${works.length} works to ${dataPath}`);
  console.log(`✓ Total images downloaded: ${works.reduce((sum, w) => sum + w.images.length, 0)}`);
}

main().catch(console.error);
