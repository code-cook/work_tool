var fs = require('fs');
var xlsx = require('node-xlsx');

var list = xlsx.parse("/Users/codecook/Downloads/激情西玛直通欧冠4月23日中奖名单 （公布版）.xls");

if(list.length > 0){
  var data1 = list[0].data;
  var data1_json = []
  for(var i = 1; i<data1.length; i++){
    data1_json.push({
      name: data1[i][0],
      phone: data1[i][1],
      prize: data1[i][2]
    });
  }
  fs.writeFile('./data.json', JSON.stringify(data1_json, null, 2), function(){
    console.log('data.json create success.');
  });
}