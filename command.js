const envs = [
  "LANG", 
  "LC_COLLATE", 
  "LC_CTYPE", 
  "LC_MESSAGES",
  "LC_MONETARY",
  "LC_NUMERIC",
  "LC_TIME"
]

exports.buildExportCommands = (locale, encode = "UTF-8") => {
  return envs.map( env => {
    return `export ${env}=${locale}.${encode}`
  })
}