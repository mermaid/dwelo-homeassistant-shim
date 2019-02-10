module.exports = {
  "apps" : [{
    "name"        : "dwelo-shim",
    "script"      : "npm run start",
    // "watch"       : true,
    "log_file": "dwelo-shim.log",
    "env": {
      "NODE_ENV": "development"
    },
    "env_production" : {
       "NODE_ENV": "production"
    }
  }]
}