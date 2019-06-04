var yyy = document.getElementById('yyy')
var context = yyy.getContext('2d')
var lineWidth = 3

autoSetCanvasSize(yyy)

listenToUser(yyy)

var eraserEnabled = false
pen.onclick = function () {
  eraserEnabled = false
  changClass(pen, eraser)
}
eraser.onclick = function () {
  eraserEnabled = true
  changClass(eraser, pen)
}
clear.onclick = function(){
  context.clearRect(0, 0, yyy.width, yyy.height); 
}
save.onclick = function(){
  yyy.style = "background: #fff;"
  var url = yyy.toDataURL("image/png")
  var a = document.createElement('a')
  document.body.appendChild(a)
  a.href = url
  a.download = '我是乱画的_' + (new Date()).getTime()
  a.target = '_blank'
  a.click()
}
thin.onclick = function(){
  lineWidth = 3
  changClass(thin, thick)
}
thick.onclick = function(){
  lineWidth = 6
  changClass(thick, thin)
}

black.onclick = function(){
  changeColor('black', black, red, orange, blue, green, purple)
}
red.onclick = function(){
  changeColor('red', red, black, orange, blue, green, purple)
}
orange.onclick = function(){
  changeColor('orange', orange, black, red, blue, green, purple)
}
blue.onclick = function(){
  changeColor('blue', blue, black, red, orange, green, purple)
}
green.onclick = function(){
  changeColor('green', green, black, red, orange, blue, purple)
}
purple.onclick = function(){
  changeColor('purple', purple, black, red, orange, blue, green)
}


/*****************************/
function autoSetCanvasSize(canvas) {
  setCanvasSize()
  window.onresize = function () {
    setCanvasSize()
  }

  function setCanvasSize() {
    var pageWidth = document.documentElement.clientWidth
    var pageHeight = document.documentElement.clientHeight
    canvas.width = pageWidth
    canvas.height = pageHeight
  }
}

function drawCircle(x, y, radius) {
  context.beginPath()
  context.arc(x, y, radius, 0, Math.PI * 2);
  context.fill()
}

function drawLine(x1, y1, x2, y2) {
  context.beginPath();
  context.moveTo(x1, y1) // 起点
  context.lineWidth = lineWidth
  context.lineTo(x2, y2) // 终点
  context.stroke()
  context.closePath()
}

function listenToUser(canvas) {
  var using = false
  var lastPoint = {
    x: undefined,
    y: undefined
  }

  // 特性检测
  if (document.body.ontouchstart !== undefined) {
    // 触屏设备
    canvas.ontouchstart = function (e) {
      var x = e.touches[0].clientX
      var y = e.touches[0].clientY
      using = true
      if (eraserEnabled) {
        context.clearRect(x - 5, y - 5, 10, 10)
      } else {
        lastPoint = {
          x: x,
          y: y
        }
      }
    }
    canvas.ontouchmove = function (e) {
      var x = e.touches[0].clientX
      var y = e.touches[0].clientY
      if (!using) {
        return
      }
      if (eraserEnabled) {
        context.clearRect(x - 5, y - 5, 10, 10)
      } else {
        var newPoint = {
          x: x,
          y: y
        }
        drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
        lastPoint = newPoint
      }
    }
    canvas.ontouchend = function (e) {
      using = false
    }
  } else {
    // 非触屏设备
    // 1. 按下鼠标
    canvas.onmousedown = function (e) {
      var x = e.clientX
      var y = e.clientY
      using = true
      if (eraserEnabled) {
        context.clearRect(x - 5, y - 5, 10, 10)
      } else {
        lastPoint = {
          x: x,
          y: y
        }
      }
    }
    // 2. 移动鼠标
    canvas.onmousemove = function (e) {
      var x = e.clientX
      var y = e.clientY
      if (!using) {
        return
      }
      if (eraserEnabled) {
        context.clearRect(x - 5, y - 5, 10, 10)
      } else {
        var newPoint = {
          x: x,
          y: y
        }
        drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
        lastPoint = newPoint
      }
    }
    // 3. 松开鼠标
    canvas.onmouseup = function (e) {
      using = false
    }
  }
}

function changClass(classA, classB){
  classA.classList.add('active')
  classB.classList.remove('active')
}
function changeColor(color, a, b, c, d, e, f){
  context.fillStyle = color
	context.strokeStyle = color
	a.classList.add('active')
	b.classList.remove('active')
	c.classList.remove('active')
	d.classList.remove('active')
	e.classList.remove('active')
	f.classList.remove('active')
}