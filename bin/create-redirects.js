const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');

const sacRedirects = {};

fs.createReadStream(path.join(__dirname, 'redirects.csv'))
    .pipe(csv(['oldUrl', 'currentUrl', 'newUrl']))
    .on('data', ({ oldUrl, currentUrl, newUrl }) => {
        if (oldUrl) {
            const rewriteString = `rewrite ${oldUrl} https://support.atlassian.com${newUrl} permanent;`;
            fs.appendFileSync('cac-rewrites.txt', rewriteString + '\n');
        }
        sacRedirects[currentUrl] = newUrl;
    })
    .on('end', () => {
        fs.writeFileSync('sac-redirects.txt', JSON.stringify(sacRedirects));
    });
