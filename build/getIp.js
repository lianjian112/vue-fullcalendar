var os = require("os"),
  ip = "",
  ifaces = os.networkInterfaces(); // 获取本机ip
out: for (var i in ifaces) {
  for (var j in ifaces[i]) {
    var val = ifaces[i][j]; // eslint-disable-line
    if (val.family === "IPv4" && val.address !== "127.0.0.1") {
      ip = val.address;
      break out;
    }
  }
}
module.exports = ip;
