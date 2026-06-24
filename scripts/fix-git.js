import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const indexPath = path.join(__dirname, '..', '.git', 'index');

if (fs.existsSync(indexPath)) {
  console.log('🗑️ Found corrupted git index at:', indexPath);
  try {
    fs.unlinkSync(indexPath);
    console.log('✅ Corrupted git index deleted successfully. It will be reconstructed on next git command.');
  } catch (err) {
    console.error('❌ Failed to delete git index:', err);
  }
} else {
  console.log('ℹ️ Git index not found at:', indexPath);
}
