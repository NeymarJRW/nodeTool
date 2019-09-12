const fs = require('fs');
const request = require('request');
const {
  createCanvas,
  loadImage
} = require('canvas')

const buffer = fs.readFileSync("./imgdata.js")
var imgdata = String(buffer)
var imgarr = JSON.parse(imgdata)
// console.log(JSON.parse(imgdata).length)
let img_num = imgarr.length; //167
// width 150 ,height 200
let x_num = 10,
y_num = Math.ceil(img_num / 10);
const canvas = createCanvas(x_num * 150, y_num * 200);
const ctx = canvas.getContext('2d');
console.log(x_num, y_num)
var flagnum = 0;
for (var i = 0; i < y_num; i++) {
  for (var j = 0; j < x_num; j++) {
    if (imgarr[flagnum]) {
      (function (n, m) {
        loadImage(imgarr[flagnum].url).then(image => {
          ctx.drawImage(image, m * 150, n * 200, 150, 200)
          canvas.toBuffer((err, buf) => {
            if (err) console.log(err)
            fs.writeFileSync('newall.png', buf)
          })
        })
      }(i, j))
    }
    flagnum++;
  }

}