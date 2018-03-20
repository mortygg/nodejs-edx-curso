const csv = require('csvtojson')
const fs = require('fs')
const jsonFormat = require('json-format')

//Obtener el nombre del fichero de entrada
if ( process.argv.length != 3 ){
	console.error("use: node [SCRIPT_CONVERT_TO_JSON] [FILE]")
	process.exit(2)
}
var csvFilePath = process.argv[2]
var jsonFilePath =  csvFilePath + ".json"
var config = {
    type: 'space',
    size: 2
  }

var json = [];
fs.open(jsonFilePath,'w',  (err, fd) => { 
	process.stdout.write('doing...')
	csv().fromFile(csvFilePath)
	.on('json',(jsonObj)=>{
		process.stdout.write('.');
		json.push(jsonObj)
	})
	.on('done',(error)=>{
		if (error){
			console.error(error)
			process.exit(1)
		}
		fs.write(fd, jsonFormat(json, config),()=>{
			process.stdout.write('end.')
			process.exit(0)
		})
	})
})

