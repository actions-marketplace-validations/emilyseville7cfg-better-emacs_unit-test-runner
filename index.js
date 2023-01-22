const core = require("@actions/core")
const glob = require("glob")
const child_process = require("child_process")

try {
    const testFiles = core.getInput("test-files")

    child_process.exec(`ls --all`, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`)
            return
        }
        console.log(`stdout: ${stdout}`)
        console.error(`stderr: ${stderr}`)
    })

    return

    glob(testFiles, {}, (_er, files) => {
        const filesAsString = files.map(file => `"${file}"`).join(" ")
        child_process.exec(`bash main.sh ${filesAsString}`, (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`)
                return
            }
            console.log(`stdout: ${stdout}`)
            console.error(`stderr: ${stderr}`)
        })
    })
} catch (error) {
    core.setFailed(error.message)
}