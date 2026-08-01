const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

html = html.replace('<div role="listitem" class="voices_item fade-in-stagger visible" style="top: 15vh;">', '<div role="listitem" class="voices_item fade-in-stagger visible">');
html = html.replace('<div role="listitem" class="voices_item fade-in-stagger visible" style="top: 18vh;">', '<div role="listitem" class="voices_item fade-in-stagger visible">');
html = html.replace('<div role="listitem" class="voices_item fade-in-stagger visible" style="top: 21vh;">', '<div role="listitem" class="voices_item fade-in-stagger visible">');

fs.writeFileSync('index.html', html);
