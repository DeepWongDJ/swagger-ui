var express = require("express"),
  moment = require("moment-timezone"),
  nconf = require("nconf"),
  winston = require("winston"),
  app = express();

nconf.argv().env("__").file({file: "./config.json"});
winston.remove(winston.transports.Console);
winston.add(winston.transports.Console, {
  timestamp: function() { return moment().format("DD-MM-YYYY HH:mm:ss Z") },
  colorize: nconf.get("COLORIZE_LOG") === "true",
  level: nconf.get("LOG_LEVEL")
})

app.get("/_health",function(req, res){ res.send("OK"); });
app.use(express.static(__dirname + "/dist"));

var server = app.listen(nconf.get("PORT"), function(){
  winston.info("Listening on port %d", server.address().port)
})
