
var path = require('path'),
    models = require('../libs/models');

function generate(model, args, ajgenesis, cb) {
    models.completeModel(model);
    
    var entitiesdir = path.join('build', 'entities');
    var websitedir = path.join('build', model.project.name);
    
    ajgenesis.createDirectory('build');
    ajgenesis.createDirectory(entitiesdir);
    ajgenesis.createDirectory(websitedir);

    ajgenesis.fileTransform(path.join(__dirname, '..', 'templates', 'manage.py.tpl'), path.join('build', 'manage.py'), model);
    ajgenesis.fileTransform(path.join(__dirname, '..', 'templates', 'settings.py.tpl'), path.join('build', model.project.name, 'settings.py'), model);
    ajgenesis.fileTransform(path.join(__dirname, '..', 'templates', 'urls.py.tpl'), path.join('build', model.project.name, 'urls.py'), model);
    ajgenesis.fileTransform(path.join(__dirname, '..', 'templates', 'wsgi.py.tpl'), path.join('build', model.project.name, 'wsgi.py'), model);
    ajgenesis.fileTransform(path.join(__dirname, '..', 'templates', '__init__.py.tpl'), path.join('build', model.project.name, '__init__.py'), model);

    ajgenesis.fileTransform(path.join(__dirname, '..', 'templates', 'entities', 'models.py.tpl'), path.join('build', 'entities', 'models.py'), model);
    ajgenesis.fileTransform(path.join(__dirname, '..', 'templates', 'entities', 'admin.py.tpl'), path.join('build', 'entities', 'admin.py'), model);
    ajgenesis.fileTransform(path.join(__dirname, '..', 'templates', 'entities', 'tests.py.tpl'), path.join('build', 'entities', 'tests.py'), model);
    ajgenesis.fileTransform(path.join(__dirname, '..', 'templates', 'entities', 'views.py.tpl'), path.join('build', 'entities', 'views.py'), model);
    ajgenesis.fileTransform(path.join(__dirname, '..', 'templates', 'entities', '__init__.py.tpl'), path.join('build', 'entities', '__init__.py'), model);
    
    cb(null, null);
}

module.exports = function (model, args, ajgenesis, cb) {
    var source = path.resolve(path.join(__dirname, '..', '..', 'site'));    
    ajgenesis.copyDirectory(source, 'build', function(err, result) {
        if (err) {
            cb(err, null);
            return;
        }
        
        generate(model, args, ajgenesis, cb);
    });
}
