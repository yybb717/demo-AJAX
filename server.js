var http = require("http");
var fs = require("fs");
var url = require("url");
var port = process.argv[2];

if (!port) {
  console.log("请指定端口号好不啦？\nnode server.js 8888 这样不会吗？");
  process.exit(1);
}

var server = http.createServer(function(request, response) {
  var parsedUrl = url.parse(request.url, true);
  var pathWithQuery = request.url;
  var queryString = "";
  if (pathWithQuery.indexOf("?") >= 0) {
    queryString = pathWithQuery.substring(pathWithQuery.indexOf("?"));
  }
  var path = parsedUrl.pathname;
  var query = parsedUrl.query;
  var method = request.method;

  /******** 从这里开始看，上面不要看 ************/

  console.log("有个傻子发请求过来啦！路径（带查询参数）为：" + pathWithQuery);

  if (path === "/index.html") {
    //如果请求是这个，该请求的响应就是这些
    response.statusCode = 200;
    response.setHeader("Content-Type", "text/html;charset=utf-8");
    //把index.html变成字符串string
    let string = fs.readFileSync("public/index.html").toString();
    //把page1.json变成字符串page1
    const page1 = fs.readFileSync("db/page1.json").toString();
    //因为字符串page1符合JSON语法，所以变成js数据中的数组
    const array = JSON.parse(page1);
    //把数组中每一项元素的id都包上li，成为一新数组，之后把这个新数组变成字符串result
    const result = array.map(item => `<li>${item.id}</li>`).join("");

    //把字符串string里的 占位符 变成 result外部再包上ul的字符串，成为新的字符串string
    string = string.replace("{{page1}}", `<ul id='xxx'>${result}</ul>`);
    //响应体则为字符串string
    response.write(string);
    response.end();
  } else if (path === "/main.js") {
    response.statusCode = 200;
    response.setHeader("Content-Type", "text/javascript;charset=utf-8");
    response.write(fs.readFileSync("public/main.js"));
    response.end();
  } else if (path === "/style.css") {
    response.statusCode = 200;
    response.setHeader("Content-Type", "text/css;charset=utf-8");
    response.write(fs.readFileSync("public/style.css"));
    response.end();
  } else if (path === "/2.js") {
    response.statusCode = 200;
    response.setHeader("Content-Type", "text/javascript;charset=utf-8");
    response.write(fs.readFileSync("public/2.js"));
    response.end();
  } else if (path === "/2.html") {
    response.statusCode = 200;
    response.setHeader("Content-Type", "text/html;charset=utf-8");
    const string = fs.readFileSync("public/2.html");
    response.write(string);
    response.end();
  } else if (path === "/4.xml") {
    response.statusCode = 200;
    response.setHeader("Content-Type", "text/xml;charset=utf-8");
    response.write(fs.readFileSync("public/4.xml"));
    response.end();
  } else if (path === "/5.json") {
    response.statusCode = 200;
    response.setHeader("Content-Type", "application/json;charset=utf-8");
    response.write(fs.readFileSync("public/5.json"));
    response.end();
  } else if (path === "/page2.json") {
    response.statusCode = 200;
    response.setHeader("Content-Type", "application/json;charset=utf-8");
    response.write(fs.readFileSync("db/page2.json"));
    response.end();
  } else if (path === "/page3.json") {
    response.statusCode = 200;
    response.setHeader("Content-Type", "application/json;charset=utf-8");
    response.write(fs.readFileSync("db/page3.json"));
    response.end();
  } else {
    response.statusCode = 404;
    response.setHeader("Content-Type", "text/html;charset=utf-8");
    response.write(`你输入的路径不存在对应的内容`);
    response.end();
  }

  /******** 代码结束，下面不要看 ************/
});

server.listen(port);
console.log(
  "监听 " +
    port +
    " 成功\n请用在空中转体720度然后用电饭煲打开 http://localhost:" +
    port
);
