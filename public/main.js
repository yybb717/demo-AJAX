getCSS.onclick = () => {
  const request = new XMLHttpRequest();

  request.open("get", "/style.css"); //readyState=1

  request.onreadystatechange = () => {
    console.log(request.readyState);
    //当statechange发生变化，就会调用这个函数
    if (request.readyState === 4) {
      console.log("下载完成");
      if (request.status >= 200 && request.status < 300) {
        const style = document.createElement("style");
        style.innerHTML = request.response;
        document.head.appendChild(style);
      } else {
        alert("加载CSS失败");
      }
    }
  };
  request.send();
};
getJS.onclick = () => {
  const request = new XMLHttpRequest();

  request.open("get", "/2.js");

  request.onreadystatechange = () => {
    console.log(request.readyState);
    //当statechange发生变化，就会调用这个函数
    if (request.readyState === 4) {
      console.log("下载完成");
      if (request.status >= 200 && request.status < 300) {
        const script = document.createElement("script");
        script.innerHTML = request.response;
        document.body.appendChild(script);
      } else {
        alert("加载CSS失败");
      }
    }
  };

  request.send();
};
getHTML.onclick = () => {
  const request = new XMLHttpRequest();

  request.open("get", "/2.html");
  request.onreadystatechange = () => {
    console.log(request.readyState);
    //当statechange发生变化，就会调用这个函数
    if (request.readyState === 4) {
      console.log("下载完成");
      if (request.status >= 200 && request.status < 300) {
        const div = document.createElement("div");
        div.innerHTML = request.response;
        document.body.appendChild(div);
      } else {
        alert("加载CSS失败");
      }
    }
  };

  request.send();
};
getXML.onclick = () => {
  const request = new XMLHttpRequest();

  request.open("get", "/4.xml");
  request.onreadystatechange = () => {
    console.log(request.readyState);
    //当statechange发生变化，就会调用这个函数
    if (request.readyState === 4) {
      console.log("下载完成");
      if (request.status >= 200 && request.status < 300) {
        console.log(request.response);
        console.log(request.responseXML); //如果请求xml，那么就不要用response来获得响应体，用responseXML，这样获得的响应体会自动变成一个dom对象，我们就可以用DOM操作这个XML DOM对象了（DOM让HTML成为一个对象，也让XML成为一个对象）
        const dom = request.responseXML;
        const text = dom.getElementsByTagName("body")[0].textContent;
        console.log(text);
      } else {
        alert("加载CSS失败");
      }
    }
  };

  request.send();
};
getJSON.onclick = () => {
  const request = new XMLHttpRequest();
  request.open("get", "/5.json");
  request.onreadystatechange = () => {
    if (
      request.readyState === 4 &&
      request.status >= 200 &&
      request.status < 300
    ) {
      console.log(request.response);
      const object = JSON.parse(request.response); //用JSON的parse函数可以把符合json语法的东西变成对象或者xx
      console.log(object);
      myName.textContent = object.name;
    }
  };
  request.send();
};

let n = 1; //声明页数为n，初始值是1。 第一页
getPAGE.onclick = () => {
  const request = new XMLHttpRequest();
  request.open("get", `/page${n + 1}.json`); //每次点击，请求的url是page n+1（当前页数的下一页）
  request.onreadystatechange = () => {
    if (
      request.readyState === 4 &&
      request.status >= 200 &&
      request.status < 300
    ) {
      console.log(request.response);
      //把符合json语法的响应体变成对应的js数组
      const array = JSON.parse(request.response);
      //数组中的每一个元素都
      array.forEach(element => {
        const li = document.createElement("li"); //先新建元素li
        li.textContent = element.id; //让li里的内容变成元素的id
        xxx.appendChild(li); //让li成为ul的孩子
      });
      n += 1; //每次请求成功了，函数都执行完了，就把n变成n+1.上面的n+1只是输出n+1，并没有改变n的值
    }
  };
  request.send();
};
