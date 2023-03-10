const core = require("@actions/core")
const glob = require("glob")
const child_process = require("child_process")

try {
    const testFiles = core.getInput("test-files")

    glob(testFiles, {}, (_er, files) => {
        const filesAsString = files.map(file => `"${file}"`).join(" ")
        const commands = [
            "sudo apt update -y",
            "sudo apt install emacs",
            `for file in ${filesAsString}; do emacs -batch -l ert -l "\${file}" -f ert-run-tests-batch-and-exit; done`
        ]
        child_process.exec(commands.join(" && "), (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`)
                core.setFailed(error.message)
                return
            }
            console.log(`stdout: ${stdout}`)
            console.error(`stderr: ${stderr}`)
        })
    })
} catch (error) {
    core.setFailed(error.message)
}