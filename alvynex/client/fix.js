const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');
let folder = fs.readFileSync('folder.html', 'utf8');

folder = folder.replace('<h3>3+</h3>\\n                                            <p>Production Apps</p>', '<h3>20+</h3>\\n                                            <p>Clients Served</p>');
folder = folder.replace('<h3>1+</h3>\\n                                            <p>Years Experience</p>', '<h3>150k+</h3>\\n                                            <p>Views Generated</p>');
folder = folder.replace('<h3>10+</h3>\\n                                            <p>Technologies</p>', '<h3>6+</h3>\\n                                            <p>Industries Served</p>');

const topPart = html.split('            <div class=\"folder-scroll-track\"')[0];
const bottomPart = html.split('    <!-- Our Work Section -->')[1];

fs.writeFileSync('index.html', topPart + folder + '\n    <!-- Our Work Section -->' + bottomPart);
