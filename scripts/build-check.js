import { access } from 'node:fs/promises';
for (const file of ['public/index.html', 'public/styles.css', 'public/app.js', 'src/settlement.js']) await access(file);
console.log('Build kontrolü başarılı: temel prototip dosyaları mevcut.');
