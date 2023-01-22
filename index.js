const core = require("@actions/core")
const glob = require("glob")
const child_process = require("child_process")

try {
    const testFiles = core.getInput("test-files")

    glob(testFiles, {}, (_er, files) => {
        child_process.exec(`./main.sh ${files.map(file => `"${file}"`).join(" ")}`, {}, (error, stdout, stderr) => {
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
    })
} catch (error) {
    core.setFailed(error.message)
}