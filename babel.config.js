module.exports = api => {
  api.cache(true)
  const presets = [
    '@babel/preset-env'
  ]
  const plugins = []
  const sourceType = 'script'
  return {
    presets,
    plugins,
    sourceType
  }
}
