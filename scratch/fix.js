const fs = require('fs');
let c = fs.readFileSync('src/lib/uiTranslations.ts', 'utf8');
c = c.replace(/(?<=\p{L})''|''(?=\p{L})/gu, "\\'");
fs.writeFileSync('src/lib/uiTranslations.ts', c);
