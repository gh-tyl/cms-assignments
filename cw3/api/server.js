let http = require('http');
let formidable = require('formidable');
let mv = require('mv');
let fs = require('fs');

http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    if (req.url == "/upload") {
        let form = new formidable.IncomingForm();
        console.log("------------form------------");
        console.log(form);
        form.parse(req, (err, fields, files) => {
            console.log("------------files------------");
            console.log(files);
            console.log("------------fields------------");
            console.log(fields);
            let file_num = Object.keys(files).length;
            let dir_name = fields.dirname;
            let file_name = [
                fields.filename00 + ".jpg",
                fields.filename01 + ".jpg",
                fields.filename02 + ".jpg"
            ];
            for (let i = 0; i < file_num; i++) {
                let tmpPath = files[`file0${i}`].filepath;
                if (!fs.existsSync(`./uploads/${dir_name}`)) {
                    fs.mkdirSync(`./uploads/${dir_name}`);
                }
                let destPath = `./uploads/${dir_name}/` + file_name[i];
                mv(tmpPath, destPath, (err) => {
                    if (err) throw err;
                    console.log("File uploaded successfully");
                });
            }
        });
    }
    res.end();
}).listen(8080)