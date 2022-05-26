var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
function templateHTML(title, list, description){
  return   `
    <!DOCTYPE html>
    <head>
      <meta charset="utf-8">

    <title>
     ${title}
      </title>
    </head>
    <body>
      <!-- 주석-->
      <!--<span style = "font-size:25px;"> <strong>우리가 빛의 속도로 갈 수 없다면</span></strong><br>
    -->
          <h1>우리가 빛의 속도로 갈 수 없다면:  <a href="/"> ${title} </a></h1>
      <a href="http://www.yes24.com/Product/Goods/74261416" target="_blank" title="yes24 구매">책 구매</a></br>
  ${list}
  <a href ='/create'> 글쓰기 </a><br>
    <iframe width="560" height="315" src="https://www.youtube.com/embed/DgPvzlWfyR4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
    </iframe>
<p>${description}</p>
      <!--Start of Tawk.to Script-->
    <script type="text/javascript">
    var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
    (function(){
    var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
    s1.async=true;
    s1.src='https://embed.tawk.to/6268e213b0d10b6f3e6f8d5f/1g1kr6722';
    s1.charset='UTF-8';
    s1.setAttribute('crossorigin','*');
    s0.parentNode.insertBefore(s1,s0);
    })();
    </script>
    <!--End of Tawk.to Script-->


    </body>

    </html>
    `;
}

function templateList(filelist){
  var list = '<ol>';
  for(var i = 0; i<filelist.length; i++)
  {
    list = list + `<li><a href="/?id=${filelist[i]}">책의 명언</a>${filelist[i]}</li>`
  }
  list = list + '</ol>';
  return list;
}
var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url,true).query;
    var title = queryData.id;
    var pathname = url.parse(_url,true).pathname;

    if(pathname == '/')
    {
      if(queryData.id == undefined)
      {
        fs.readdir('./data',function(err,filelist){
          title = 'Wellcome Page';
          var description = '안녕하세요. 만나서 반갑습니다.';
          var list = templateList(filelist);
          var template = templateHTML(title,list,description);

          response.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});
          response.end(template);
        })
        }
        else{
          fs.readdir('./data',function(err,filelist){
        var list = templateList(filelist);
        fs.readFile(`data/${queryData.id}`,function(err,description)
        {
        var template = templateHTML(title,list,description);
        response.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});
        response.end(template);
      });
      })
    }
    }
    else if(pathname == '/create'){
        fs.readdir('./data',function(err,filelist){
          title = 'Create';
          var description = `
          <form action="http://localhost:3000/create_page" method = "post">
          <input type="text" name="title" placeholder="title">
          <p>
          <textarea name="description" placeholder="description"> </textarea>
          </p>
          <p>
            <input type="submit">
          </p>
          </form>
          `;
          var list = templateList(filelist);
          var template = templateHTML(title,list,description);

          response.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});
          response.end(template);
        })
    }
    else if(pathname == '/create_page'){
      var body = '';
      request.on('data',function(data){
        body = body + data;
      })
      request.on('end',function(){
        var post = qs.parse(body);
        var title = post.title;
        var description = post.description;
        fs.writeFile(`data/${title}`, description,'utf8',function(err){

          response.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});
          response.end('정상 전송 완료!');
        })
      })
    }
    else {
      response.writeHead(404,{'Content-Type':'text/html; charset=utf-8'});
      response.end('404 NOT FOUND');
    }
});
app.listen(3000);
