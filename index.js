
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
    // SEE: https://github.com/zeit/hyperterm/blob/master/app/lib/actions/ui.js#L146
    const command = [
      buildExportCommands(locale).join(" && "),
      "clear", // clear screen
      "",
    ].join("\n")
    store.dispatch(sendSessionData(action.uid, command))
    next(action)
  })
};