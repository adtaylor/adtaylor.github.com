var fs = require('fs'),
    frames = fs.readFileSync('frames.txt').toString().split('\n'),
    output = "";

frames.forEach(function (frame) { 
  if (frame.length === 0) return false;
  
  var lines = frame.replace('<pre>','').replace('</pre>','').split('<br>');

  output += "<pre>";
  lines.forEach(function(line){
    if(!line.length) return false;
    return output += "<br>" + line.substring(line.length*0.25, line.length);
  });
  output += "</pre>\n";
  return null;
});

fs.writeFile("frames-short.txt", output, function(err) {
    if(err) {
        console.log(err);
    } else {
        console.log("The file was saved!");
    }
});
