const fs = require('fs')
const path = require('path')
const rootDir = path.dirname(require.main.filename)

module.exports = (client) => {
  const fileArray = []

  function readCommands (dir) {
    const __dirname = rootDir

    // Read out all command files
    const files = fs.readdirSync(path.join(__dirname, dir))

    // Loop through all the files in ./commands
    for (const file of files) {
      // Get the status of 'file' (is it a file or directory?)
      const stat = fs.lstatSync(path.join(__dirname, dir, file))

      // If the 'file' is a directory, call the 'readCommands' function
      // again with the path of the subdirectory
      if (stat.isDirectory()) {
        readCommands(path.join(dir, file))
      } else {
        const fileDir = dir.replace('\\', '/')
        fileArray.push(fileDir + '/' + file)
      }
    }
  }

  readCommands('commands')

  for (const file of fileArray) {
    const command = require(`../${file}`)

    if (command.name) {
      client.commands.set(command.name, command)
    }
  }

  // Do the same for all options
  fileArray.splice(0, fileArray.length)
  readCommands('options')

  for (const file of fileArray) {
    const option = require(`../${file}`)

    if (option.name) {
      client.menuOptions.set(option.name, option)
    }
  }

  // Do the same for all response embeds
  fileArray.splice(0, fileArray.length)
  readCommands('embeds')

  for (const file of fileArray) {
    const option = require(`../${file}`)

    if (option.name) {
      client.responseEmbeds.set(option.name, option)
    }
  }
}
