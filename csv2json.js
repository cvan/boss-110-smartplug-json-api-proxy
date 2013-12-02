// Borrowed from underscore.js (_.object):
//
// Converts lists into objects. Pass either a single array of `[key, value]`
// pairs, or two parallel arrays of the same length -- one of keys, and one of
// the corresponding values.
function list2object(list, values) {
    if (list == null) return {};
    var result = {};
    for (var i = 0, length = list.length; i < length; i++) {
        if (values) {
            result[list[i]] = values[i];
        } else {
            result[list[i][0]] = list[i][1];
        }
    }
    return result;
}

function csv2object(csvData) {
    var values;
    var header;
    var rows = [];
    csvData.split('\n').forEach(function(v, k) {
        values = v.replace(/\s+/g, ' ').replace(/\s$/g, '').split(',');
        if (values.length) {
            if (header) {
                rows.push(list2object(header, values));
            } else if (v.indexOf(', ') === -1) {
                // Assume that if there's a space after a comma then
                // that line is a sentence or comment not a header.
                header = values;
            }
        }
    });
    return rows;
}

function csv2json(csvData) {
    return JSON.stringify(csv2object(csvData));
}

module.exports.csv2object = csv2object;
module.exports.csv2json = csv2json;
