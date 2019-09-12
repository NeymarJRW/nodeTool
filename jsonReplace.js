var fs = require('fs')
var readDir = fs.readdirSync('./gameJson/monster_old'); //旧目录
var jsonfile = readDir.filter(item => item.indexOf('json') > -1)
jsonfile.forEach(item=>{
  var data = fs.readFileSync(`./gameJson/monster_old/${item}`)
  var framedata = JSON.parse(data);
  var framedataarr = []
  Object.keys(framedata.frames).forEach(key => {
    framedataarr.push(key)
  })
  var newdata = fs.readFileSync(`./gameJson/monster/${item}`)  //新目录
  var newframedata = JSON.parse(newdata);
  var newframedataarr = []
  Object.keys(newframedata.frames).forEach(key => {
    newframedataarr.push(key)
  })
  var filedata = newdata.toString();
  newframedataarr.forEach((item, index) => {
    var reg = new RegExp(item, 'g')
    filedata = filedata.replace(reg, framedataarr[index])
  })
  fs.writeFileSync(`./gameJson/monster/${item}`, filedata)
})

