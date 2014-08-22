
var models = require('../source/ajgenesis/libs/models');

exports['Complete model'] = function (test) {
    var model = { project: { name: 'project' } };
    
    models.completeModel(model);
    
    test.equal(model.project.title, 'Project');
    test.equal(model.builddir, '.');
    test.ok(model.entities);
    test.equal(model.entities.length, 0);
};

exports['Complete model with builddir'] = function (test) {
    var model = { project: { name: 'project' }, builddir: 'build' };
    
    models.completeModel(model);
    
    test.equal(model.project.title, 'Project');
    test.equal(model.builddir, 'build');
};

exports['Complete model with entities and properties'] = function (test) {
    var model = { 
        name: 'project',
        
        entities: [
            { 
                name: 'customer',
                properties: [
                    {
                        name: 'name'
                    },
                    {
                        name: 'address'
                    }
                ]
            },
            { 
                name: 'supplier'
            }
        ]
    };
    
    models.completeModel(model);
    
    test.equal(model.title, 'Project');

    test.equal(model.entities[0].setname, 'customers');
    test.equal(model.entities[0].title, 'Customer');
    test.equal(model.entities[0].classname, 'Customer');
    test.equal(model.entities[0].settitle, 'Customers');
    
    test.equal(model.entities[1].setname, 'suppliers');
    test.equal(model.entities[1].title, 'Supplier');
    test.equal(model.entities[1].classname, 'Supplier');
    test.equal(model.entities[1].settitle, 'Suppliers');
    
    test.equal(model.entities[0].properties[0].title, 'Name');
    test.equal(model.entities[0].properties[0].type, 'string');
    test.equal(model.entities[0].properties[1].title, 'Address');
    test.equal(model.entities[0].properties[1].type, 'string');
};

exports['Complete model with reference'] = function (test) {
    var model = { 
        name: 'project',
        
        entities: [
            { 
                name: 'employee',
                properties: [
                    {
                        name: 'name'
                    },
                    {
                        name: 'department',
                        reference: 'department'
                    }
                ]
            },
            { 
                name: 'department'
            }
        ]
    };
    
    models.completeModel(model);
    
    test.equal(model.title, 'Project');

    test.equal(model.entities[0].title, 'Employee');
    test.equal(model.entities[0].classname, 'Employee');
    test.equal(model.entities[0].settitle, 'Employees');
    test.equal(model.entities[1].title, 'Department');
    test.equal(model.entities[1].settitle, 'Departments');
    
    test.equal(model.entities[0].properties[0].title, 'Name');
    test.equal(model.entities[0].properties[0].type, 'string');
    test.equal(model.entities[0].properties[1].title, 'Department');
    test.equal(model.entities[0].properties[1].type, 'reference');
    test.equal(model.entities[0].properties[1].reference.name, 'department');
    test.equal(model.entities[0].properties[1].reference.title, 'Department');
    test.equal(model.entities[0].properties[1].reference.classname, 'Department');
    test.equal(model.entities[0].properties[1].reference.settitle, 'Departments');
    
    test.ok(model.entities[0].references);
    test.equal(model.entities[0].references.length, 1);
    test.strictEqual(model.entities[0].references[0], model.entities[1]);

    test.ok(model.entities[0].referenced);
    test.equal(model.entities[0].referenced.length, 0);

    test.ok(model.entities[1].references);
    test.equal(model.entities[1].references.length, 0);

    test.ok(model.entities[1].referenced);
    test.equal(model.entities[1].referenced.length, 1);
    test.strictEqual(model.entities[1].referenced[0], model.entities[0].properties[1]);
};
