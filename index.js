var fs = require('fs');
var CodeGen = require('swagger-js-codegen').CodeGen;

var file = 'swagger/spec.json';
var swagger = JSON.parse(fs.readFileSync(file, 'UTF-8'));
var angularjsSourceCode = CodeGen.getAngularCode({ moduleName: 'petStore', className: 'PetStore', swagger: swagger });

var target = 'generated/api-' + swagger.info.version + '.js';
try {
    fs.unlinkSync(target);
} catch (err) {
    console.log('API file not found, creating...');
}
fs.appendFile(target, angularjsSourceCode, function (err) {
    console.log(err);
});

