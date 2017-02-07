/****************************************************************************
**
** Copyright (C) 2017 The Qt Company Ltd.
** Contact: https://www.qt.io/licensing/
**
** This file is part of the utils of the Qt Toolkit.
**
** $QT_BEGIN_LICENSE:GPL-EXCEPT$
** Commercial License Usage
** Licensees holding valid commercial Qt licenses may use this file in
** accordance with the commercial license agreement provided with the
** Software or, alternatively, in accordance with the terms contained in
** a written agreement between you and The Qt Company. For licensing terms
** and conditions see https://www.qt.io/terms-conditions. For further
** information use the contact form at https://www.qt.io/contact-us.
**
** GNU General Public License Usage
** Alternatively, this file may be used under the terms of the GNU
** General Public License version 3 as published by the Free Software
** Foundation with exceptions as appearing in the file LICENSE.GPL3-EXCEPT
** included in the packaging of this file. Please review the following
** information to ensure the GNU General Public License requirements will
** be met: https://www.gnu.org/licenses/gpl-3.0.html.
**
** $QT_END_LICENSE$
**
****************************************************************************/

var fs = require("fs");
var xml2js = require("xml2js");

(function () {
    exports.parse = function (filename, wantedExtensions, callback) {
        var parseCommands = function (registry) {
            // <param>const <type>VkInstanceCreateInfo</type>* <name>pCreateInfo</name></param>
            // parses to { _: "const *", type: "VkInstanceCreateInfo", ... } which is not
            // quite ideal for our purposes but for now can be worked around by taking
            // the first word when it is "const", then the type and then the rest.
            // [N] (e.g. vkCmdSetBlendConstants) needs special treatment too.
            var typeToString = function (protoOrParam) {
                var type = "";
                var suffix = "";
                var p = [];
                if (protoOrParam._)
                    p = protoOrParam._.split(' ');
                if (protoOrParam.type) {
                    if (p.length && p[0] === "const") {
                        type = "const ";
                        p = p.slice(1);
                    }
                    type += protoOrParam.type[0];
                    if (p.length && p[p.length - 1].slice(0, 1) == "[") {
                        suffix = p[p.length - 1];
                        p = p.slice(0, p.length - 1);
                    }
                    type += p.join(' ');
                } else {
                    type = p.join(' ');
                }
                return [ type.trim(), suffix.trim() ];
            };

            var extSuffixes = [ "EXT" ];
            registry.tags.forEach(function (tags) {
                tags.tag.forEach(function (tag) {
                    extSuffixes.push(tag.$.name);
                });
            });
            registry.vendorids.forEach(function (vendorids) {
                vendorids.vendorid.forEach(function (vendorid) {
                    extSuffixes.push(vendorid.$.name);
                });
            });

            var extFuncs = [];
            registry.extensions.forEach(function (extensions) {
                extensions.extension.forEach(function (extension) {
                    if (wantedExtensions.indexOf(extension.$.name) >= 0) {
                        extension.require.forEach(function (require) {
                            require.command.forEach(function (reqCmd) {
                                extFuncs.push(reqCmd.$.name);
                            });
                        });
                    }
                });
            });

            var cmdList = [];
            registry.commands.forEach(function (commands) {
                commands.command.forEach(function (command) {
                    var proto = command.proto[0];
                    var cmdName = proto.name[0];
                    var ignore = false;
                    if (extFuncs.indexOf(cmdName) < 0) {
                        extSuffixes.forEach(function (ext) {
                            if (cmdName.slice(cmdName.length - ext.length) === ext)
                                ignore = true;
                        });
                    }
                    if (!ignore) {
                        var paramList = [];
                        if (command.param)
                            command.param.forEach(function (param) {
                                var t = typeToString(param);
                                paramList.push({ "type": t[0], "typeSuffix": t[1], "name": param.name[0] });
                            });
                        cmdList.push({ "type": typeToString(proto)[0], "name": cmdName, "params": paramList });
                    }
                });
            });
            return cmdList;
        };

        var parser = new xml2js.Parser();
        fs.readFile(filename, function (err, data) {
            if (err)
                throw err;
            parser.parseString(data, function (err, result) {
                if (err)
                    throw err;

                var cmdList = parseCommands(result.registry);

                if (callback)
                    callback(cmdList);
            })
        });
    };
})();
