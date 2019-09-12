// 1.利用node中的canvas插件,可以在自定义尺寸的画布上放置自己引用的图片,并保存成新的图片
//当你想将一大张图分成多个图或者在一个画布上放置多个图片时用此方法
const {
  createCanvas,
  loadImage
} = require('canvas')
const canvas = createCanvas('宽', '高')
const ctx = canvas.getContext('2d')
loadImage('图片地址').then(image => {
  ctx.drawImage(image, '画布截取横坐标', '画布截取纵坐标', '图片在画布中的宽', '图片在画布中的高')
  canvas.toBuffer((err, buf) => {
    if (err) console.log(err)
    fs.writeFileSync('要存取的画布图片路径', buf)
  })
})


//例子
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
        loadImage(imgarr[flagnum]).then(image => {
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



// 2. 利用node中的request,cheerio插件可以对网站进行抓取,抓取后获得源代码,利用cheerio加载源代码后,可用jquery方法进行dom操作
const request = require('request');
const cheerio = require('cheerio');
request('请求网址', function (err, response, body) {
  // body:网站源代码
  var $ = cheerio.load(body)
  console.log($('img').attr('src'))
})


// 3.引用node中的mysql插件,可在node代码中对数据库进行操作,
var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: '数据库名'
});
connection.connect();
var sql = 'SELECT * FROM player';
var str = " ";
connection.query(sql, function (err, result) {
  if (err) {
    console.log('[SELECT ERROR]:', err.message);
  }
  str = JSON.stringify(result);
  //数据库查询的数据保存在result中，但浏览器并不能直接读取result中的结果，因此需要用JSON进行解析
  //console.log(result);   //数据库查询结果返回到result中

  // res.end(str) 将数据抛到界面,可当接口使用
});

//4.  //使用express中的body-parser插件,将post过来的数据转为json或别的格式,以方便下一步操作
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({
  extended: true
  // 1. extended - 当设置为false时， 会使用querystring库解析URL编码的数据,键值对中的值就为 'String'
  // 或 'Array'形式； 当设置为true时， 会使用qs库解析URL编码的数据,则可为任何数据类型。 没有指定编码时， 使用此编码。 默认为true.
  // 2. inflate - 设置为true时， deflate压缩数据会被解压缩； 设置为true时， deflate压缩数据会被拒绝。 默认为true。
  // 3. limit - 设置请求的最大数据量。 默认为 '100kb'
  // 4. parameterLimit - 用于设置URL编码值的最大数据。 默认为1000
  // 5. type - 该选项用于设置为指定MIME类型的数据使用当前解析中间件。 这个选项可以是一个函数或是字符串， 当是字符串是会使用type - is来查找MIMI类型； 当为函数是， 中间件会通过fn(req) 来获取实际值。 默认为application / octet - stream。
  // 6. verify - 这个选项仅在verify(req, res, buf, encoding) 时受支持
}));

app.use(bodyParser.json());
app.post('./post路径',function(req,res){
  //  res.body post过来的数据, 经过bodyParser插件处理后为json格式,方便操作
})

//5.个人开发解决跨域问题

app.all("*", function (req, res, next) {
  //设置允许跨域的域名，*代表允许任意域名跨域
  res.header("Access-Control-Allow-Origin", "http://localhost:8080");
  res.header("Access-Control-Allow-Credentials", true);
  //允许的header类型
  res.header("Access-Control-Allow-Headers", "content-type");
  //跨域允许的请求方式 
  res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
  if (req.method.toLowerCase() == 'options')
    res.send(200); //让options尝试请求快速结束
  else
    next();
})


// 6.当想获取本地js里的内容时
const buffer = fs.readFileSync("./imgdata.js")
console.log(String(buffer))

// 7.存一个新文件时
// 1.
//创建一个可读流
var rs = fs.createReadStream("C:\\Users\\lilichao\\Desktop\\笔记.png");
//创建一个可写流
var ws = fs.createWriteStream("b.png");
//将可读流中的数据写入到可写流中
rs.pipe(ws);
// 或者
request('请求地址').pipe(fs.createWriteStream(`./img/${index}.png`)) //这里为了省事，我就直接用下标命名了；

//2.
fs.writeFileSync(filename, data, [options])