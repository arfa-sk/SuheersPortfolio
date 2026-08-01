const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

html = html.replace(/<h3>3\+<\/h3>\s*<p>Production Apps<\/p>/g, '<h3>20+</h3>\n<p>Clients Served</p>');
html = html.replace(/<h3>1\+<\/h3>\s*<p>Years Experience<\/p>/g, '<h3>150k+</h3>\n<p>Views Generated</p>');
html = html.replace(/<h3>10\+<\/h3>\s*<p>Technologies<\/p>/g, '<h3>6+</h3>\n<p>Industries Served</p>');
html = html.replace('<image href="assets/testimonial.png"', '<image href="assest/folder.png"');

fs.writeFileSync('index.html', html);
