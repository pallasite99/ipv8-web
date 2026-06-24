import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

// Load environment variables from .env
dotenv.config();

const pat = process.env.GITHUB_PAT;
const repoUrl = process.env.GITHUB_REPO;
const email = process.env.GITHUB_EMAIL || 'salilapte99@gmail.com';
const name = process.env.GITHUB_NAME || 'pallasite99';

console.log('🚀 Starting GitHub Push Sync...');

if (!pat || !repoUrl) {
  console.error('❌ Error: GITHUB_PAT and GITHUB_REPO must be set in your .env file.');
  process.exit(1);
}

// Clean up repoUrl to inject PAT
// Supports standard https://github.com/username/repo.git format
let authUrl = repoUrl;
if (repoUrl.startsWith('https://')) {
  const cleanUrl = repoUrl.replace('https://', '');
  authUrl = `https://oauth2:${pat}@${cleanUrl}`;
} else {
  console.error('❌ Error: GITHUB_REPO must start with https://');
  process.exit(1);
}

try {
  // 1. Initialize git if not already done
  if (!fs.existsSync(path.join(process.cwd(), '.git'))) {
    console.log('📦 Initializing Git repository...');
    execSync('git init', { stdio: 'inherit' });
  }

  // 2. Configure local Git user
  console.log(`👤 Configuring Git user: ${name} <${email}>`);
  execSync(`git config user.name "${name}"`, { stdio: 'inherit' });
  execSync(`git config user.email "${email}"`, { stdio: 'inherit' });

  // 3. Set remote origin
  console.log('🔗 Configuring remote origin...');
  try {
    execSync('git remote remove origin', { stdio: 'ignore' });
  } catch (e) {
    // Ignore error if origin didn't exist
  }
  // Use authUrl but hide credentials in output
  execSync(`git remote add origin "${authUrl}"`, { stdio: 'ignore' });
  console.log(`✅ Remote origin configured to: ${repoUrl}`);

  // 4. Add all files
  console.log('➕ Adding files to staging...');
  execSync('git add .', { stdio: 'inherit' });

  // 5. Commit changes
  console.log('💾 Committing changes...');
  try {
    execSync('git commit -m "feat: complete IPv8 next-gen platform with interactive globe, sandbox, and README"', { stdio: 'inherit' });
  } catch (e) {
    console.log('⚠️ No changes to commit or already committed.');
  }

  // 6. Push to main
  console.log('📤 Pushing to GitHub main branch (force pushing to overwrite target)...');
  execSync('git branch -M main', { stdio: 'inherit' });
  execSync('git push -u origin main --force', { stdio: 'inherit' });

  console.log('🎉 Successfully pushed repo to GitHub!');
} catch (error) {
  console.error('❌ An error occurred during the Git push process:', error.message);
  process.exit(1);
}
