var fs = require('fs')

var splitRegEx = /([\sMLCz])+/;

var processPath = function (p) {
    var s = "";
    var indentStr = "    ";
    var wr = function (line, indent) {
        s += '\n' + indentStr.repeat(indent) + line;
    }
    wr("VisualPath {", 1);
    if (p.fill !== undefined)
        wr('fillColor: "' + p.fill + '"', 2);
    else
        wr('fillColor: "transparent"', 2);
    if (p.stroke !== undefined) {
        wr('strokeColor: "' + p.stroke + '"', 2);
        wr('strokeWidth: ' + (p.width !== undefined ? p.width : 1), 2);
    } else {
        wr('strokeWidth: -1', 2);
    }
    wr("Path {", 2);
    var cmd = p.path.split(splitRegEx);
    cmd = cmd.filter(function (s) { return s.trim().length > 0; });
    for (var i = 0; i < cmd.length; ++i) {
        switch (cmd[i]) {
        case 'M':
            wr("PathMove { x: " + cmd[i+1] + "; y: " + cmd[i+2] + " }", 3);
            i += 2;
            break;
        case 'L':
            wr("PathLine { x: " + cmd[i+1] + "; y: " + cmd[i+2] + " }", 3);
            i += 2;
            break;
        case 'C':
            wr("PathCubic { control1X: " + cmd[i+1] + "; control1Y: " + cmd[i+2]
               + "; control2X: " + cmd[i+3] + "; control2Y: " + cmd[i+4]
               + "; x: " + cmd[i+5] + "; y: " + cmd[i+6] + " }", 3);
            i += 6;
            break;
        case 'z':
            // ignore, we will close implicitly when end pos same as start
            break;
        default:
            console.error("Unknown command " + cmd[i]);
            break;
        }
    }
    wr("}", 2);
    wr("}", 1);

    console.log(s);
};

fs.readFile("tiger.js", function (err, data) {
    if (err) throw err;
    var obj = JSON.parse(data.toString());
    for (var i = 0; i < obj.tiger.length; ++i)
        processPath(obj.tiger[i]);
});
