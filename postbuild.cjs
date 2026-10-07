// https://claude.ai/share/4f9669ef-0903-488a-9cbf-cb6637748aad

const fs = require('fs');
const path = require('path');

/**
 * Copia recursivamente de `source` para `destination`, mantendo a estrutura
 * de pastas, mas somente os arquivos cujas extensões estejam em `extensions`.
 * Pastas de destino só são criadas se houver algum arquivo para copiar nelas.
 *
 * @param {string} source - pasta de origem
 * @param {string} destination - pasta de destino
 * @param {string[]} extensions - ex.: ['.scss', '.css']
 * @returns {number} quantidade de arquivos copiados
 */
function copyFolderRecursive(source, destination, extensions) {
  const allowed = extensions.map((ext) => ext.toLowerCase());
  let copied = 0;

  for (const entry of fs.readdirSync(source, { withFileTypes: true })) {
    const sourcePath = path.join(source, entry.name);
    const destinationPath = path.join(destination, entry.name);

    if (entry.isDirectory()) {
      copied += copyFolderRecursive(sourcePath, destinationPath, extensions);
    } else if (allowed.includes(path.extname(entry.name).toLowerCase())) {
      fs.mkdirSync(destination, { recursive: true });
      fs.copyFileSync(sourcePath, destinationPath);
      console.log(`Arquivo copiado: ${destinationPath}`);
      copied++;
    }
  }

  return copied;
}

// ---------------------------------------------------------------------------

const srcDir = path.resolve(__dirname, './src');
const extensions = ['.scss', '.css', '.ttf'];
const targets = ['./dist/cjs', './dist/esm'];

if (!fs.existsSync(srcDir)) {
  console.error('Pasta src não encontrada:', srcDir);
  process.exit(1);
}

for (const target of targets) {
  const destDir = path.resolve(__dirname, target);

  if (!fs.existsSync(destDir)) {
    console.error(`Pasta ${target} não encontrada. Rode o build do tsc antes.`);
    process.exit(1);
  }

  const total = copyFolderRecursive(srcDir, destDir, extensions);
  console.log(`${total} arquivo(s) [${extensions.join(', ')}] copiado(s) para ${target}`);
}