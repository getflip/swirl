const fs = require('fs');


module.exports = function(cssFilePath) {
    return new Promise((resolve) => {
        const css = fs.readFileSync(cssFilePath, 'utf8');
        const newCss = css.split(/\r?\n/).map(line =>  {
            if(line.includes('--')) {
                line = `  --s-${line.substring(4, line.length)}`
            } else if(line.includes('--s-')) {
                line = line;
            }
        
            return line;
        });
        const transformedCss = newCss.join('\n');
        fs.writeFileSync(cssFilePath, transformedCss);
        resolve();
    })
}