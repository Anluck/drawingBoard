var yyy = document.getElementById('yyy')
var context = yyy.getContext('2d')

autoSetCanvasSize(yyy)

listenToUser(yyy)

var eraserEnabled = false
eraser.onclick = function () {
  eraserEnabled = true
  actions.className = 'actions x'
}
brush.onclick = function () {
  eraserEnabled = false
  actions.className = 'actions'
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
  context.fillStyle = 'black'
  context.arc(x, y, radius, 0, Math.PI * 2);
  context.fill()
}

function drawLine(x1, y1, x2, y2) {
  context.beginPath();
  context.strokeStyle = 'black'
  context.moveTo(x1, y1) // 起点
  context.lineWidth = 5
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