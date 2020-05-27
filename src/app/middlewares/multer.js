const multer = require ('multer')

const storage = multer.diskStorage({
    //Destino dos arquivos enviados
    destination: (req, file, cb) => {
        cb(null, './public/images')
    },
    //Setando o nome do arquivo enviado
    filename: (req, file, cb) => {
        cb(null, `${Date.now().toString()}-${file.originalname}` )
    } 
})

//Filtrando os arquivos
const fileFilter = (req, file, cb) => {
    const isAccepted = ['image/png', 'image/jpg', 'image/jpeg']
    .find(acceptedFormat => acceptedFormat == file.mimetype)

    if (isAccepted) {
        return cb(null, true)
    }

    return cb(null, false)
}

module.exports = multer({
    storage,
    fileFilter
})