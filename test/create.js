
var createtask = require('../create'),
    path = require('path'),
    fs = require('fs'),
    ajgenesis = require('ajgenesis');

exports['create application'] = function (test) {
    test.async();
    
    var dirname = path.join('test', 'myapp');
    
    createtask(null, [dirname], ajgenesis, function (err, result) {
        test.equal(err, null);
        
        test.ok(fs.existsSync(dirname));
        
        test.ok(fs.existsSync(path.join(dirname, 'site')));
        test.ok(fs.existsSync(path.join(dirname, 'site', 'css')));
        
        removeDirSync(dirname);
        test.done();
    });
};

function removeDirSync(dirname) {
    var filenames = fs.readdirSync(dirname);
    
    filenames.forEach(function (filename) {
        filename = path.join(dirname, filename);
        
        if (isDirectory(filename))
            removeDirSync(filename);
        else
            removeFileSync(filename);
    });
    
    fs.rmdirSync(dirname);
}

function removeFileSync(filename) {
    fs.unlinkSync(filename);
}

function isDirectory(filename)
{
    try {
        var stats = fs.lstatSync(filename);
        return stats.isDirectory();
    }
    catch (err)
    {
        return false;
    }
}

