
var generatetask = require('../source/ajgenesis/tasks/generate'),
    path = require('path'),
    fs = require('fs'),
    ajgenesis = require('ajgenesis');

exports['generate code'] = function (test) {
    test.async();
    
    var cwd = process.cwd();
    
    process.chdir('test');
    
    var model = ajgenesis.loadModel('models');
    
    test.ok(model.entities);
    test.ok(Array.isArray(model.entities));
    test.equal(model.entities.length, 2);
    
    if (fs.existsSync('build') && !fs.existsSync(path.join('build', 'db.sqlite3')))
        removeDirSync('build');
    
    generatetask(model, [], ajgenesis, function (err, result) {
        test.equal(err, null);
        test.equal(result, null);
        
        test.ok(fs.existsSync('build'));
        
        test.ok(fs.existsSync(path.join('build', 'manage.py')));

        test.ok(fs.existsSync(path.join('build', 'myproject')));
        
        test.ok(fs.existsSync(path.join('build', 'myproject', 'settings.py')));
        test.ok(fs.existsSync(path.join('build', 'myproject', 'urls.py')));
        test.ok(fs.existsSync(path.join('build', 'myproject', 'wsgi.py')));
        test.ok(fs.existsSync(path.join('build', 'myproject', 'wsgi.py')));

        test.ok(fs.existsSync(path.join('build', 'entities')));

        test.ok(fs.existsSync(path.join('build', 'entities', 'admin.py')));
        test.ok(fs.existsSync(path.join('build', 'entities', 'models.py')));
        test.ok(fs.existsSync(path.join('build', 'entities', 'tests.py')));
        test.ok(fs.existsSync(path.join('build', 'entities', 'views.py')));
        test.ok(fs.existsSync(path.join('build', 'entities', '__init__.py')));
        
        process.chdir(cwd);
        
        test.done();
    });    
}

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

