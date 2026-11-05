// Resolve the pre-installed (global) Playwright when it is not a local dependency.
import { createRequire } from 'node:module';
import { execSync } from 'node:child_process';
const require = createRequire(import.meta.url);
let pw;
try { pw = require('playwright'); } catch {
  const root = execSync('npm root -g').toString().trim();
  pw = createRequire(root + '/')('playwright');
}
export const { chromium } = pw;
