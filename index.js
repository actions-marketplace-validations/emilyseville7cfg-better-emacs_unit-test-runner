const core = require('@actions/core');
const github = require('@actions/github');

try {
    // `who-to-greet` input defined in action metadata file
    const nameToGreet = core.getInput('who-to-greet');
    console.log(`Hello ${nameToGreet}!`);
    const time = (new Date()).toTimeString();
    core.setOutput("time", time);

    const testFolder = '.';
    const fs = require('fs');

    fs.readdir(testFolder, (_err, files) => {
        files.forEach(file => {
            console.log(file);
        });
    });
} catch (error) {
    core.setFailed(error.message);
}