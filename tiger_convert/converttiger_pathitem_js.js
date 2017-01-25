var fs = require('fs')

var splitRegEx = /([\sMLCz])+/;

var processPath = function (p, first) {
    var s = "";
    var indentStr = "    ";
    var wr = function (line, indent) {
        s += '\n' + indentStr.repeat(indent) + line;
    }
    if (first)
        wr("var p = newPath(); var sfp = newStrokeFillParams();", 1);
    else
        wr("p.clear(); sfp.clear();", 1);
    if (p.fill !== undefined)
        wr('sfp.fillColor =  "' + p.fill + '";', 1);
    else
        wr('sfp.fillColor = "transparent";', 1);
    if (p.stroke !== undefined) {
        wr('sfp.strokeColor = "' + p.stroke + '";', 1);
        wr('sfp.strokeWidth = ' + (p.width !== undefined ? p.width : 1) + ';', 1);
    } else {
        wr('sfp.strokeWidth =  -1;', 1);
    }
    var cmd = p.path.split(splitRegEx);
    cmd = cmd.filter(function (s) { return s.trim().length > 0; });
    for (var i = 0; i < cmd.length; ++i) {
        switch (cmd[i]) {
        case 'M':
            wr("p.moveTo(" + cmd[i+1] + ", " + cmd[i+2] + ");", 1);
            i += 2;
            break;
        case 'L':
            wr("p.lineTo(" + cmd[i+1] + ", " + cmd[i+2] + ");", 1);
            i += 2;
            break;
        case 'C':
            wr("p.cubicTo(" + cmd[i+1] + ", " + cmd[i+2]
               + ", " + cmd[i+3] + ", " + cmd[i+4]
               + ", " + cmd[i+5] + ", " + cmd[i+6] + ");", 1);
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
    wr('appendVisualPath(p, sfp);', 1);

    console.log(s);
};

fs.readFile("tiger.js", function (err, data) {
    if (err) throw err;
    var obj = JSON.parse(data.toString());
    for (var i = 0; i < obj.tiger.length; ++i)
        processPath(obj.tiger[i], i === 0);
    console.log("\n    commitVisualPaths();\n");
});
