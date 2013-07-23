#!/usr/bin/env node

var fs = require('fs');
var program = require('commander');
var cheerio = require('cheerio');
var restler = require('restler');
var REST_DEFAULT ='http://evening-thicket-4366.herokuapp.com';
var HTMLFILE_DEFAULT = "index.html";
var CHECKSFILE_DEFAULT = "checks.json";

var assertFileExists = function(infile) {
    var instr = infile.toString();
    if(!fs.existsSync(instr)) {
        console.log("%s does not exist. Exiting.", instr);
        process.exit(1); // http://nodejs.org/api/process.html#process_process_exit_code
    }
    return instr;
};

var cheerioHtmlFile = function(htmlfile) {
    return cheerio.load(fs.readFileSync(htmlfile));
};

var loadChecks = function(checksfile) {
    return JSON.parse(fs.readFileSync(checksfile));
};

var checkHtmlFile = function(htmlfile, checksfile) {
    $ = cheerioHtmlFile(htmlfile);
    var checks = loadChecks(checksfile).sort();
    var out = {};
    for(var ii in checks) {
        var present = $(checks[ii]).length > 0;
        out[checks[ii]] = present;
    }
    return out;
};
var checkUrl=function(url,checksfile){
var out={};
restler.get(url).on('complete',function(page){
	var cheeriofn=cheerio.load(page);
	var loadchecks=loadChecks(checksfile).sort()
	for (var j in loadchecks){
		var curr = cheeriofn(loadchecks[j]).length>0;
		out[loadchecks[j]]=present;
	}
});
console.log(JSON.stringify(out,null,4));
return out;
}
var clone = function(fn) {
    // Workaround for commander.js issue.
    // http://stackoverflow.com/a/6772648
    return fn.bind({});
};

if(require.main == module) {
    program
        .option('-c, --checks <check_file>', 'Path to checks.json', clone(assertFileExists), CHECKSFILE_DEFAULT)
        .option('-f, --file <html_file>', 'Path to index.html', clone(assertFileExists), HTMLFILE_DEFAULT)
	.option('-u, --url <url>','Requested url',REST_DEFAULT)
        .parse(process.argv);
	if(program.file){
     var checkJson = checkHtmlFile(program.file, program.checks);
    var outJson = JSON.stringify(checkJson, null, 4);
    console.log(outJson);
	}else{
	if(program.url)
	var checkJson=checkUrl(program.url,program.checks)
	}
}else{
    exports.checkHtmlFile = checkHtmlFile;
	exports.checkUrl=checkUrl;
}
