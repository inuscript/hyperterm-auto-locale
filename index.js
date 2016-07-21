
const { getLocale } = require('./platform/')
const { sendSessionData } = require('./action')
const { buildExportCommands } = require('./command')

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