const core = require("@actions/core")
const glob = require("glob")
const child_process = require("child_process")

function executeShellCommand(command) {
    child_process.exec(command, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`)
            return
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`)
            return
        }
        console.log(`stdout: ${stdout}`)
    })
}

try {
    const testFiles = core.getInput("test-files")

    executeShellCommand("sudo apt update -y && sudo apt install emacs")

    glob(testFiles, {}, (_er, files) => {
        files.forEach(file => executeShellCommand(`emacs -batch -l ert -l "${file}" -f ert-run-tests-batch-and-exit`))
    })
} catch (error) {
    core.setFailed(error.message)
}