/** 
 * 地图拼接工具
 * */

const fs = require('fs')
const path = require('path')
const {
  createCanvas,
  loadImage
} = require('canvas')

// const root = path.join(__dirname)

// readDirSync(root + "/src")

// function readDirSync(path) {
//   var arr = [0]
//   var pa = fs.readdirSync(path);
//   pa.forEach(function (ele, index) {
//     var info = fs.statSync(path + "/" + ele)
//     if (info.isDirectory()) {
//       readDirSync(path + "/" + ele);
//     } else {
//       var res = ele.match(/map_([0-9]+)_([0-9]+)_([0-9]+).jpg/)
//       res[1] // 文件夹
//       res[2] // x
//       res[3] // y
//     }
//   })
// }


var arr = [10001,16, 7]

var filename = arr[0]
var xmax = arr[1]
var y = arr[2]
var x = 0
const canvas = createCanvas((xmax + 1) * 300, y * 300)
const ctx = canvas.getContext('2d')

for (var i = 0; i < y; i++) {
  if (x < xmax + 1) {
    (function (n,m) {
      loadImage(`./jiancaiimg/10001/map_${filename}_${m}_${n}.jpg`).then(image => {
        ctx.drawImage(image, 300 * (m + 1) - 300, 300 * (n + 1) - 300, 300, 300)
      })
      if(i === y - 1) {
        x++
        i = -1
      }
      canvas.toBuffer((err, buf)=> {
        if(err) throw err
        fs.writeFileSync(`${filename}.jpg`, buf)
      }, 'image/jpeg')
    }(i,x))
  }
}