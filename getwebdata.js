const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const iconv = require('iconv-lite');
var moviedata=''
let num=1
let movieurl = `https://www.88ys.cc/vod-type-id-1-pg-${num}.html`;
function getwebdata(url) {
  var p = new Promise(function(resolve, reject) {
    request({
          url:url,
          // encoding: 'utf-8'
        }, function (err, res, body) {
      if (err) {
        reject(err)
      } else {
        resolve(body)
      }

    })

  })
    return p;

}

for(let i=0;i<11;i++){
  getwebdata(`https://www.88ys.cc/vod-type-id-1-pg-${num++}.html`).then(res => {
    //关键!!!解决中文乱码 decodeEntities: false
    var $ = cheerio.load(res, {
      decodeEntities: false
    })
    $('.main .index-area ul li').each(function () {
      var imgurl = $(this).find('img').attr('data-original');
      var name = $(this).find('img').attr('alt')
      moviedata += `{
        title: '${name}',
        imgurl: '${imgurl}'
      },`
    })
    fs.writeFileSync('./imgdata.js', `[${moviedata}]`)
  })
}
console.log(moviedata)
