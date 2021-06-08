#!/usr/bin/env node
const path = require('path');
const fs = require('fs-extra');
const { spawn } = require('child_process');

/*
    * Returns a boolean value that tells wether the selected
    * scripting method is 'Typescript' or not.
    * 
    * @param agrv - Argument value 
*/
function getScriptingMethod(argv) {
    let scriptingMethod = argv.find(arg => arg.indexOf('--script=')>-1);
    if (scriptingMethod) { 
        scriptingMethod = scriptingMethod.split('--script=')[1]; 
        if (scriptingMethod.toLowerCase() === 'ts' || scriptingMethod.toLowerCase() === 'typescript') return true
        else if (scriptingMethod.toLowerCase() === 'jks' || scriptingMethod.toLowerCase() === 'javascript') return false
        else throw new Error('Incorrect Scripting Method!');
        
    }
    return false;
}


/*
    * 1. Copies the files and folder folder based on the 
    *    scripting selection.
    * 2. Installs the dependencies.
*/
function initApplication() {
    console.log('Preperaing to setup the boilerplate');

    console.log('Copying files...');
    const templateFolder = path.join(
        __dirname.slice(0, __dirname.length-4),
        getScriptingMethod(process.argv)? 'typescript': 'javascript',
        'v1',
        '.'
    );
    fs.copySync(templateFolder, './');
    
    console.log('Installing modules...');
    const spawn_process = spawn(/^win/.test(process.platform) ? 'npm.cmd' : 'npm', ['install']);
    spawn_process.stdout.on('data', (data) => {
        console.log(data.toString());
        console.log('Finished setting up.');
    });
}


initApplication();