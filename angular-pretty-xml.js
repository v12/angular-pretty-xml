// credits to https://gist.github.com/sente/1083506
angular.module('prettyXml', [])
    .filter('prettyXml', function () {
        return function (xml) {
            var formatted = '';
            var reg = /(>)(<)(\/*)/g;
            xml = xml.replace(reg, '$1\r\n$2$3');
            var pad = 0;
            angular.forEach(
                xml.split('\r\n'),
                function (node) {
                    var indent = 0;
                    if (node.match(/.+<\/\w[^>]*>$/)) {
                        indent = 0;
                    } else if (node.match(/^<\/\w/)) {
                        if (pad != 0) {
                            pad -= 1;
                        }
                    } else if (node.match(/^<\w[^>]*[^\/]>.*$/)) {
                        indent = 1;
                    } else {
                        indent = 0;
                    }

                    var padding = '';
                    for (var i = 0; i < pad; i++) {
                        padding += '  ';
                    }

                    formatted += (padding + node + '\r\n');
                    pad += indent;
                });

            return formatted;
        };
    });