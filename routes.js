const router = require('express').Router();
const multer = require('multer');
const upload = multer({dest: 'uploads'});
const fs = require('fs');
const path = require('path');

router.get('/', (req, res) => {
    const {page, total} = req.query;
    res.send({
        status: 'Succesfully',
        message: 'Welcome to Express JS & Node JS',
        page,
        total
    });
});

router.get('/employee/:id', (req, res) => {
    res.json({
        id: req.params.id
    });
});

router.get('/division/:jobdesk', (req, res) => {
    res.json({
        jobdesk: req.params.jobdesk
    });
});

router.post('/product/', upload.single('image'), (req, res) => {
    const {firstname, lastname, age, status} = req.body;
    const image = req.file;
    if(image) {
        const target = path.join(__dirname, 'uploads', image.originalname);
        fs.renameSync(image.path, target)
        res.json({
            firstname,
            lastname,
            age,
            status,
            image
        });
        
        // res.sendFile(target)
    }
});

// router.get('/:category/:tag', (req, res) => {
//     const {category, tag} = req.params;
//     res.json({category, tag});
// });

module.exports = router;