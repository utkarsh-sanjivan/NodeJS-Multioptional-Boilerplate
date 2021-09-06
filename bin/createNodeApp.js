#!/usr/bin/env node
const path = require('path');
const fs = require('fs-extra');
const { spawn, execSync } = require('child_process');

/**
 * Returns the arguments passed by the user.
 * @param argv - {Object} 
 * @returns {Object} 
 */
function getArguments(argv) {
    let returnObj = { isJs: true, folderName: false, env: 'development' };
    let scriptingMethod = argv.indexOf('--script') === -1? 'Not Defined': argv[argv.indexOf('--script')+1];
    let folderName = argv.indexOf('--folder') === -1? false: argv[argv.indexOf('--folder')+1];
    let env = argv.indexOf('--env') === -1? 'development': argv[argv.indexOf('--env')+1];
    if (env === 'testing') returnObj.env = env;
    
    if (scriptingMethod !== 'Not Defined') {
        if (scriptingMethod.toLowerCase() === 'ts' || scriptingMethod.toLowerCase() === 'typescript') returnObj.isJs = false
        else if (scriptingMethod.toLowerCase() === 'js' || scriptingMethod.toLowerCase() === 'javascript') returnObj.isJs = true
        else throw new Error('Incorrect Scripting Method!');
    } else returnObj.isJs = true;
    
    if (folderName) returnObj.folderName = folderName;
    
    return returnObj;
}


/**
 * Creates foler if required copies the required folder and files and installs the module.
 */
function initApplication() {
    const { isJs, folderName, env } = getArguments(process.argv);
    console.log(`Preperaing to setup the ${isJs? 'Javascript': 'Typescript'} boilerplate`);

    if (folderName) {
        console.log(`Creating ${folderName} folder and opening it`);
        execSync(`mkdir ${folderName}`);
        process.chdir(`${folderName}`);
    };

    console.log('Copying files...');
    const templateFolder = path.join(
        __dirname.slice(0, __dirname.length-4),
        isJs? 'javascript': 'typescript',
        'v1',
        '.'
    );

    
    if (env === 'development') fs.copySync(templateFolder, './');
    
    console.log('Installing modules...');
    if (env === 'development') {
        const spawn_process = spawn(/^win/.test(process.platform) ? 'npm.cmd' : 'npm', ['install']);
        spawn_process.stdout.on('data', (data) => {
            console.log(data.toString());
            console.log('Finished setting up.');
        });
    };
}


initApplication();