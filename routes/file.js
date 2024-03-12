const express = require("express")
const router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/Images'); // Specify null for the error argument
    },
    filename: (req, file, cb) => {
        // Generate a unique filename using the original filename, current timestamp, and file extension
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage
})

router.post('/', upload.single('file'), async (req, res) => {
    var fileController =
        req.locals.controllerFactory.getFilesController(req.locals)
    let data = await fileController.create(req.body)
    // await delteFileUnderFolder('D:/Server_Logingfg - Copy/public/Images')
    res.send(data)
})

router.get('/', async (req, res) => {
    let query = req.query ? req.query : {};
    var fileController =
        req.locals.controllerFactory.getFilesController(req.locals)
    let data = await fileController.getAll(query)
    res.send(data)
})

module.exports = router