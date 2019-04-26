const multer = require('multer')
const fs = require('fs')

let i = -1;

const storage = multer.diskStorage({
   destination: (req, file, cb) => { 
        if(typeof req.query.number === 'undefined') {
            req.res.status(400).send("Bad request. Chapter Number was not provided.")
        }
        else {
            if(!fs.existsSync('assets/manga' + req.params.id + "/")) {
                fs.mkdirSync('assets/manga' + req.params.id + "/")
            }
            if(i === -1) { fs.mkdirSync('assets/manga' + req.params.id + "/chapter" + req.query.number + "/") }
            cb(null, 'assets/manga' + req.params.id + "/chapter" + req.query.number + "/") 
        } 
    },
    filename: (req, file, cb) =>  {
        i++
        cb(null, i + "." + file.originalname.split(".")[file.originalname.split(".").length - 1])
    }
  })

module.exports.resetCount = () => { i = -1 }
module.exports.storage = storage;