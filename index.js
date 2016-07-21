const os = require('os')
const darwin = require('./platform/darwin')
const { sendSessionData } = require('./action')
const { buildExportCommands } = require('./command')

const getLocale = () => {
  const platform = os.platform()
  switch(platform){
    case 'darwin':
      return darwin.getLocale()
  }
  return new Promise( (res) => res() )
}

exports.middleware = (store) => (next) => (action) => {
  if ('SESSION_ADD' !== action.type) {
    next(action)
    return
  }
  getLocale().then( locale => {
    if(!locale){
      next(action)
      return
    }
    const command = buildExportCommands(locale).join(" && ") + "\n"
    store.dispatch(sendSessionData(action.uid, command))
    next(action)
  })
};