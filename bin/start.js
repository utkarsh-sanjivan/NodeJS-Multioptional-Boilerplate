#!/usr/bin/env node
const path = require('path');
const fs = require('fs-extra');
const { spawnSync } = require('child_process');


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