const core = require("@actions/core");
const glob = require("glob")

try {
    const testFiles = core.getInput("test-files");

    glob(testFiles, {}, (_er, files) => {
        files.forEach(file => console.log(`${file} matches`))
    });
} catch (error) {
    core.setFailed(error.message);
}