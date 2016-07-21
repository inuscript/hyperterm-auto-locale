const { exec } = require('child_process')
const os = require('os')

exports.getLocale = () => {
  return new Promise( (resolve, reject) => {
    exec("defaults read -g AppleLocale", (err, stdout, stderr) => {
      if(err){
        return reject(err)
      }
      if(stderr){
        return reject(stderr)
      }
      resolve(stdout.replace(os.EOL, ''))
    })
  })
}