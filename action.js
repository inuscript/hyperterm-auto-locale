// FIXME: copy from hyperterm
const SESSION_USER_DATA = 'SESSION_USER_DATA'

exports.sendSessionData = function sendSessionData (uid, data) {
  return {
    type: SESSION_USER_DATA,
    data,
    effect () {
      rpc.emit('data', { uid, data });
    }
  };
}
