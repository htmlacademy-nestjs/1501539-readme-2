const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const dirs = [
  path.join(root, 'libs/models/blog-model/src/generated/prisma'),
  path.join(root, 'libs/models/blog-model/dist/generated/prisma'),
];

// Force CommonJS so Node doesn't treat generated .js as ESM
const pkg = { type: 'commonjs' };
const pkgJson = JSON.stringify(pkg, null, 2) + '\n';

for (const dir of dirs) {
  if (!fs.existsSync(dir)) continue;
  const pkgPath = path.join(dir, 'package.json');
  fs.writeFileSync(pkgPath, pkgJson);
  console.log('Wrote', pkgPath);

  // Patch client.js: replace import.meta (ESM) with __dirname (CJS) so it runs as CommonJS
  const clientPath = path.join(dir, 'client.js');
  if (fs.existsSync(clientPath)) {
    let code = fs.readFileSync(clientPath, 'utf8');
    const patched = code.replace(
      /globalThis\s*\[\s*['"]__dirname['"]\s*\]\s*=\s*path\.dirname\s*\(\s*\(\s*0\s*,\s*node_url_1\.fileURLToPath\s*\)\s*\(\s*import\.meta\.url\s*\)\s*\)\s*;/,
      "globalThis['__dirname'] = __dirname;"
    );
    if (patched !== code) {
      fs.writeFileSync(clientPath, patched);
      console.log('Patched', clientPath);
    }
  }
}
