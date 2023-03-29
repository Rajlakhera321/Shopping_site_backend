const multer = require('multer')
const path = require('path')


const imageStorage = multer.diskStorage({
  destination: 'uploads',
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + '_' + Date.now() + path.extname(file.originalname),
    )
  },
})

const imageUpload = multer({
  storage: imageStorage,
  limits: {
    fileSize: 5000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg|doc|pdf|xls|csv)$/)) {
      return cb(
        new Error(
          'Please upload document in png,jpg,doc,pdf,xls,csv file format',
        ),
      )
    }
    cb(undefined, true)
  },
});

module.exports = {
  imageUpload,
}
