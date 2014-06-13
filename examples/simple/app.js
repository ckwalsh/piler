process.env.NODE_ENV = 'development';

var app = require("express")();
var server = require('http').createServer(app);

var pile = require("../../index");
var js = pile.createJSManager({outputDirectory: __dirname + "/out"});
var css = pile.createCSSManager({outputDirectory: __dirname + "/out"});

var share = require("./share");
console.log(share.test());

function isEmail(s){
  return !!s.match(/.\w+@\w+\.\w/);
}

js.bind(app, server);
css.bind(app, server);

app.set('views', __dirname + "/views");

if (process.env.NODE_ENV === 'development') {
  js.liveUpdate(css, require('socket.io').listen(server));
}

css.addFile(__dirname + "/style.css");
css.addFile(__dirname + "/style.styl");
css.addFile(__dirname + "/style.less");

js.addOb({
  MY: {
    isEmail: isEmail
  }
});

js.addOb({FOO: "bar"});
js.addUrl("http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.js");

js.addFile(__dirname + "/client/underscore.js");
js.addFile(__dirname + "/client/backbone.js");
js.addFile(__dirname + "/client/hello.js");
js.addFile(__dirname + "/client/hello.coffee");
js.addFile("foo", __dirname + "/client/foo.coffee");
js.addFile("bar", __dirname + "/client/bar.coffee");
js.addFile(__dirname + "/share.js");

app.get("/", function (req, res){

  res.exec(function (){
    console.log("Run client code from the response", FOO);
    console.log(share.test());
  });

  res.render("index.jade", {
    layout: false,
    js    : js.renderTags("foo"),
    css   : css.renderTags()
  });
});

server.listen(8001, function (){
  console.log("listening on 8001");
});
