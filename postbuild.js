const fs = require('fs');
const path = require('path');

const sourceFile = path.resolve(__dirname, './src/styles/index.css');

// cjs
const destinationDirCjs = path.resolve(__dirname, './dist/cjs/styles');
const destinationFileCjs = path.join(destinationDirCjs, 'index.css');
if (!fs.existsSync(destinationDirCjs)) {
  fs.mkdirSync(destinationDirCjs, { recursive: true });
}

fs.copyFile(sourceFile, destinationFileCjs, (err) => {
  if (err) {
    console.error('Erro ao copiar o arquivo:', err);
    process.exit(1); // Encerra o script com erro
  }
  console.log(`Arquivo copiado com sucesso para: ${destinationFileCjs}`);
});

// esm
const destinationDirEsm = path.resolve(__dirname, './dist/esm/styles');
const destinationFileEsm = path.join(destinationDirEsm, 'index.css');
if (!fs.existsSync(destinationDirEsm)) {
  fs.mkdirSync(destinationDirEsm, { recursive: true });
}

fs.copyFile(sourceFile, destinationFileEsm, (err) => {
  if (err) {
    console.error('Erro ao copiar o arquivo:', err);
    process.exit(1); // Encerra o script com erro
  }
  console.log(`Arquivo copiado com sucesso para: ${destinationFileEsm}`);
});