window["STRd6/oisc:master"]({
  "source": {
    "LICENSE": {
      "path": "LICENSE",
      "content": "The MIT License (MIT)\n\nCopyright (c) 2015 Daniel X Moore\n\nPermission is hereby granted, free of charge, to any person obtaining a copy\nof this software and associated documentation files (the \"Software\"), to deal\nin the Software without restriction, including without limitation the rights\nto use, copy, modify, merge, publish, distribute, sublicense, and/or sell\ncopies of the Software, and to permit persons to whom the Software is\nfurnished to do so, subject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all\ncopies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\nFITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\nAUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\nLIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\nOUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\nSOFTWARE.\n\n",
      "mode": "100644",
      "type": "blob"
    },
    "README.md": {
      "path": "README.md",
      "content": "# oisc\n",
      "mode": "100644",
      "type": "blob"
    },
    "main.coffee": {
      "path": "main.coffee",
      "content": "comp = new Uint8Array(256)\n\nstyle = document.createElement \"style\"\nstyle.innerHTML = \"\"\"\n  body {\n    margin: 0;\n    overflow: hidden;\n    background-color: black;\n  }\n\n  canvas {\n    background-color: white;\n    margin: auto;\n    display: block;\n    position: absolute;\n    top: 0;\n    bottom: 0;\n    left: 0;\n    right: 0;\n\n    width: 512px;\n    height: 512px;\n    image-rendering: pixelated;\n  }\n\"\"\"\ndocument.head.appendChild style\n\ncanvas = document.createElement('canvas')\ncanvas.width = 16\ncanvas.height = 16\n\ndocument.body.appendChild canvas\ncontext = canvas.getContext('2d')\n\nrand = ->\n  Math.floor Math.random() * 256\n\ndraw = (data, context) ->\n  imageData = context.getImageData 0, 0, 16, 16\n\n  id = imageData.data\n  i = 0\n\n  while i < 256\n    v = data[i]\n    id[4 * i + 0] = 0\n    id[4 * i + 1] = 255\n    id[4 * i + 2] = 0\n    id[4 * i + 3] = v\n    i += 1\n\n  context.putImageData imageData, 0, 0\n\nrandomFill = (buffer) ->\n  l = buffer.length\n  i = 0\n  while i < l\n    buffer[i] = rand()\n    i += 1\n\nrandomFill comp\nconsole.log comp\n\nsubneg = (data) ->\n  pc = data[0]\n  acc = data[1]\n\n  a = data[pc]\n  next = pc + 1\n  if next is 256\n    next = 0\n  b = data[next]\n\n  acc = data[1] = data[pc] = r = a - acc\n\n  console.log \"PC: #{pc}, ACC: #{acc}, A: #{a}, B: #{b}, R: #{r}\"\n\n  if r < 0\n    data[0] = b\n  else\n    data[0] = next\n\nsetInterval ->\n  subneg(comp)\n  draw comp, context\n, 10",
      "mode": "100644"
    },
    "pixie.cson": {
      "path": "pixie.cson",
      "content": "width: 512\nheight: 512\n",
      "mode": "100644"
    }
  },
  "distribution": {
    "main": {
      "path": "main",
      "content": "(function() {\n  var canvas, comp, context, draw, rand, randomFill, style, subneg;\n\n  comp = new Uint8Array(256);\n\n  style = document.createElement(\"style\");\n\n  style.innerHTML = \"body {\\n  margin: 0;\\n  overflow: hidden;\\n  background-color: black;\\n}\\n\\ncanvas {\\n  background-color: white;\\n  margin: auto;\\n  display: block;\\n  position: absolute;\\n  top: 0;\\n  bottom: 0;\\n  left: 0;\\n  right: 0;\\n\\n  width: 512px;\\n  height: 512px;\\n  image-rendering: pixelated;\\n}\";\n\n  document.head.appendChild(style);\n\n  canvas = document.createElement('canvas');\n\n  canvas.width = 16;\n\n  canvas.height = 16;\n\n  document.body.appendChild(canvas);\n\n  context = canvas.getContext('2d');\n\n  rand = function() {\n    return Math.floor(Math.random() * 256);\n  };\n\n  draw = function(data, context) {\n    var i, id, imageData, v;\n    imageData = context.getImageData(0, 0, 16, 16);\n    id = imageData.data;\n    i = 0;\n    while (i < 256) {\n      v = data[i];\n      id[4 * i + 0] = 0;\n      id[4 * i + 1] = 255;\n      id[4 * i + 2] = 0;\n      id[4 * i + 3] = v;\n      i += 1;\n    }\n    return context.putImageData(imageData, 0, 0);\n  };\n\n  randomFill = function(buffer) {\n    var i, l, _results;\n    l = buffer.length;\n    i = 0;\n    _results = [];\n    while (i < l) {\n      buffer[i] = rand();\n      _results.push(i += 1);\n    }\n    return _results;\n  };\n\n  randomFill(comp);\n\n  console.log(comp);\n\n  subneg = function(data) {\n    var a, acc, b, next, pc, r;\n    pc = data[0];\n    acc = data[1];\n    a = data[pc];\n    next = pc + 1;\n    if (next === 256) {\n      next = 0;\n    }\n    b = data[next];\n    acc = data[1] = data[pc] = r = a - acc;\n    console.log(\"PC: \" + pc + \", ACC: \" + acc + \", A: \" + a + \", B: \" + b + \", R: \" + r);\n    if (r < 0) {\n      return data[0] = b;\n    } else {\n      return data[0] = next;\n    }\n  };\n\n  setInterval(function() {\n    subneg(comp);\n    return draw(comp, context);\n  }, 10);\n\n}).call(this);\n",
      "type": "blob"
    },
    "pixie": {
      "path": "pixie",
      "content": "module.exports = {\"width\":512,\"height\":512};",
      "type": "blob"
    }
  },
  "progenitor": {
    "url": "http://www.danielx.net/editor/"
  },
  "entryPoint": "main",
  "repository": {
    "branch": "master",
    "default_branch": "master",
    "full_name": "STRd6/oisc",
    "homepage": null,
    "description": "",
    "html_url": "https://github.com/STRd6/oisc",
    "url": "https://api.github.com/repos/STRd6/oisc",
    "publishBranch": "gh-pages"
  },
  "dependencies": {}
});