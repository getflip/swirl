const fs = require('fs');

function createArrayOfObjectsForSettings(designTokens, typeKey) {
    const arrayOfObjects = [];
    const settingKeys = Object.keys(designTokens[typeKey]);
    settingKeys.forEach(settingObjectKey => {
        const setting = {
            setting: settingObjectKey,
            settingTypes: {
                ...designTokens[typeKey][settingObjectKey]
            }
        };
        arrayOfObjects.push(setting);
    });
    return arrayOfObjects;
}

function createArrayOfObjectsForStates(setting) {
    const arrayOfObjects = [];
    const stateKeys = Object.keys(setting.settingTypes)
    stateKeys.forEach(stateObjectKey => {
        const state = {
            setting: setting.setting,
            state: stateObjectKey,
            ...setting.settingTypes[stateObjectKey]
        };
        arrayOfObjects.push(state);
    });
    return arrayOfObjects;
}

function createYmlStringForSetting(type, setting) {
const ymlString = `
global: 
    type: ${type}
    category: ${setting.setting}
props:
`;
    return ymlString;
}

function createYmlStringForState(state) {
    if (state.comment) {
    return `
    ${state.setting}-${state.state}:
        value: ${state.value}
        comment: ${state.comment}
    `;
    }
    return `
    ${state.setting}-${state.state}:
        value: ${state.value}
    `;
}

function createYmlIndexFile(settings) {
    const settingsFiles = settings.map(setting => {
        return `  - ./${setting.setting}.yml`;
    }).join("\n");

return `
imports:
${settingsFiles}
`;
}

function createSwirlTokensYml(typeKeys) {
    const typeIndexFiles = typeKeys.map(typeKey => {
        return `  - ./${typeKey}/index.yml`;
    }).join("\n");

return `
global:
  category: index
imports:
${typeIndexFiles}
`

}

/**
 * Transform a JSON config exported from Figma to a YML config that can be used by Theo.
 * @param {Obj} designTokenObject 
 * @param {string} outputPath 
 * @return void
 */
function transformJsonConfigToTheoYml(designTokenObject, outputPath) {
    const typeKeys = Object.keys(designTokenObject);
    typeKeys.forEach(typeKey => {
        // create folder
        const typeFolder = `${outputPath}/${typeKey}`;
        if (!fs.existsSync(typeFolder)) {
            console.log("folder does not exist, creating...");
            fs.mkdirSync(typeFolder, { recursive: true });
        }

        // create files
        const settings = createArrayOfObjectsForSettings(designTokenObject, typeKey)
        settings.forEach(setting => {
            const fileName = `${setting.setting}.yml`;
            const filePath = `${typeFolder}/${fileName}`;
            const settingYmlString = createYmlStringForSetting(typeKey, setting);
            fs.writeFileSync(filePath, settingYmlString);

            const states = createArrayOfObjectsForStates(setting);
            const statesYmls = states.map(state => {
                return createYmlStringForState(state);
            })
            const statesYmlString = statesYmls.join("\n");
            const fullYml = `${settingYmlString}${statesYmlString}`;
            fs.writeFileSync(`${typeFolder}/${fileName}`, fullYml);
        })

        // create index file for typekeys
        const indexYmlString = createYmlIndexFile(settings);
        fs.writeFileSync(`${typeFolder}/index.yml`, indexYmlString);
    });

    // create swirl tokens yml
    const swirlTokensYmlString = createSwirlTokensYml(typeKeys);
    fs.writeFileSync(`${outputPath}/swirl-tokens.yml`, swirlTokensYmlString);
}

/**
 * 
 * @param {Object} designTokenObject 
 * @param {string} outputPath 
 * @returns {Promise<void>}
 */
module.exports = function(designTokenObject, outputPath) {
    return new Promise((resolve) => {
        console.log("starting transforming...");
        transformJsonConfigToTheoYml(designTokenObject, outputPath);
        console.log("done transforming");
        resolve();
    })
} 