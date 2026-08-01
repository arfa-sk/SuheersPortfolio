const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// The multi_replace broke the SVG. Let's just restore the file completely.
let folder = fs.readFileSync('folder.html', 'utf8');
folder = folder.replace('<h3>3+</h3>\n                                            <p>Production Apps</p>', '<h3>20+</h3>\n                                            <p>Clients Served</p>');
folder = folder.replace('<h3>1+</h3>\n                                            <p>Years Experience</p>', '<h3>150k+</h3>\n                                            <p>Views Generated</p>');
folder = folder.replace('<h3>10+</h3>\n                                            <p>Technologies</p>', '<h3>6+</h3>\n                                            <p>Industries Served</p>');
folder = folder.replace('<image href="assets/testimonial.png"', '<image href="assest/folder.png"');

// Remove the top duplicate block from folder if it exists
if (folder.includes('<!-- Folder Showcase Section -->')) {
    // split and only take the first header
    folder = folder.substring(folder.indexOf('<!-- Folder Showcase Section -->'));
}

const topPart = html.substring(0, html.indexOf('    <!-- Folder Showcase Section -->'));
const bottomPart = html.substring(html.indexOf('    <!-- Our Work Section -->'));

fs.writeFileSync('index.html', topPart + '    ' + folder + '\n' + bottomPart);
