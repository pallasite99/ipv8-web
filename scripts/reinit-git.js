import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const gitPath = path.join(__dirname, '..', '.git');

if (fs.existsSync(gitPath)) {
  console.log('🗑️ Found corrupted .git directory at:', gitPath);
  try {
    fs.rmSync(gitPath, { recursive: true, force: true });
    console.log('✅ Corrupted .git directory deleted successfully.');
  } catch (err) {
    console.error('❌ Failed to delete .git directory:', err);
  }
} else {
  console.log('ℹ️ No .git directory found.');
}
