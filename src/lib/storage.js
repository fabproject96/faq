import fs from 'node:fs/promises';
import path from 'node:path';

const dataDir = path.resolve('data');

async function ensureDir() {
  await fs.mkdir(dataDir, { recursive: true });
}

export async function appendJsonRecord(fileName, record) {
  await ensureDir();
  const fullPath = path.join(dataDir, fileName);
  let current = [];

  try {
    const content = await fs.readFile(fullPath, 'utf8');
    current = JSON.parse(content);
    if (!Array.isArray(current)) current = [];
  } catch {
    current = [];
  }

  current.push({ ...record, createdAt: new Date().toISOString() });
  await fs.writeFile(fullPath, JSON.stringify(current, null, 2));
}

export async function readJsonArray(fileName) {
  try {
    const fullPath = path.join(dataDir, fileName);
    const content = await fs.readFile(fullPath, 'utf8');
    const parsed = JSON.parse(content);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}
