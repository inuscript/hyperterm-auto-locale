const os = require('os')
const darwin = require('./darwin')

exports.getLocale = () => {
  const platform = os.platform()
  switch(platform){
    case 'darwin':
      return darwin.getLocale()
  }
  return new Promise( (res) => res() )
}
