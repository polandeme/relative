var http = require('http');
var fs = require('fs');
var BufferHelper = require('bufferhelper');
var iconv = require('iconv-lite'); 
var _ = require('underscore');
var when = require('when');
var Read_File = "iphone5s.txt";
var Write_File = "iphone5s_l1.txt";
var Write_File_one = "pre.txt";

var initLoop = [];
var keywords = [];
var keywords_pre = [' '];
var count = 0;

function searchAll(keywords){
	var deferreds = [];
	for (var i = keywords.length - 1; i >= 0; i--) {
		deferreds.push(searchRelativeKeyword(keywords[i]));
	};
	return deferreds;
}

function searchRelativeKeyword(keyword){
	var deferred = when.defer();
	var baidu = "http://suggestion.baidu.com/su?wd="+keyword+"&json=1&p=3&sid=4684_5230_1467_5225_6504_4759_6018_6462_6428_6382_6313_6441_6450&cb=jQuery110209145664188035061_1399875026965&_=1399875026970&qq-pf-to=pcqq.group";
	http.get(baidu, function(res) {
		  var bufferHelper = new BufferHelper();
		  res.on('data', function (chunk) {
		    bufferHelper.concat(chunk);
		  });
		  res.on('end',function(){ 
		    var result = iconv.decode(bufferHelper.toBuffer(),'GBK');
		    deferred.resolve(eval(result));
		  });
	}).on('error', function(e) {
	  console.error(e);
	});
	return deferred.promise;
}

function jQuery110209145664188035061_1399875026965(data){
	//keywords = _.union(keywords, data.s);
	// console.log(data.s);
	return data.s;
}

function readAllKeyWords(){
	var deferred = when.defer();
	var rs = fs.createReadStream(Read_File);
	var bufferHelper = new BufferHelper();
	var data = '';
	rs.on("data", function (chunk){
	    bufferHelper.concat(chunk);
	});
	rs.on("end", function () {
	    var result = bufferHelper.toBuffer().toString();
	    initLoop = result.split(",");
		deferred.resolve(initLoop);
	});
    
	return deferred.promise;
}

function writeToFile(data){
	var deferred = when.defer();
    for (var i = data.length - 1; i >= 0 && keywords.length < 200; i--) {
        keywords_pre = keywords.slice(0);
        keywords = _.union(keywords, data[i]);
        initLoop = _.union(initLoop, data[i]);
        console.log("wes=" + i);
    };

    keywords = _.union(keywords, initLoop);

    fs.writeFile(Write_File_one,keywords.toString());
    fs.writeFile(Read_File,keywords.toString());

    fs.writeFile(Write_File,keywords.toString(),function(err){
        if(err) throw err;
        console.log('一共 '+keywords.length+" 条记录 写入完毕！");
    });
     // return deferred.promise;
}
function init() {
    if(keywords.length < 200 && count <4) {
        console.log('ds');
        count++;
        console.log(count);
        when.all(readAllKeyWords().then(searchAll)).then(writeToFile).then(init);
    }
}
init();



