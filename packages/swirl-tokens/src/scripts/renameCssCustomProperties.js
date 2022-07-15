const fs = require('fs');

/**
 * Read out CSS File as string
 * @param {string} cssFilePath 
 * @returns string
 */
function readCss(cssFilePath) {
    const css = fs.readFileSync(cssFilePath, 'utf8');
    return css;
}

/**
 * Write transformed CSS to file
 * @param {string} cssPath 
 * @param {string} transformedCss 
 */
function writeCss(cssPath ,transformedCss) {
    fs.writeFileSync(cssPath, transformedCss);
}


module.exports = function(cssFilePath) {
    return new Promise((resolve) => {
        console.log("starting renaming in... ", cssFilePath);
        const css = readCss(cssFilePath);
        const newCss = css.split(/\r?\n/).map(line =>  {
            if(line.includes('--')) {
                line = `  --s-${line.substring(4, line.length)}`
            } else if(line.includes('--s-')) {
                line = line;
            }
        
            return line;
        });
        const transformedCss = newCss.join('\n');
        writeCss(cssFilePath, transformedCss);
        console.log("done renaming in ",  cssFilePath);
        resolve();
    })
}