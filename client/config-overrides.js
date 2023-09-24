module.exports = function override (config, env) {
    console.log('override')
    let loaders = config.resolve
    loaders.fallback = {
        // existing configs...
        "fs": false,
        "os": false,
        "path": false,
        "crypto": false
   }
    
    return config
}