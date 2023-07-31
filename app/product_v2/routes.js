const router = require('express').Router();
const Product = require('./model');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { Op } = require('sequelize');
const { response } = require('express');
const upload = multer({dest: 'uploads'});

router.post('/product', upload.single('image'),async (req, res) => {
    const {users_id, name, price, stock, status} = req.body;
    const image = req.file;
    if(image) {
        const target = path.join(__dirname, '../../uploads', image.originalname);
        fs.renameSync(image.path, target);
    }
    try {
        await Product.sync();
        const result = await Product.create({users_id, name, price, stock, status, image_url: `http://localhost:5000/public/${image.originalname}`});
        res.send(result);
    }catch(e) {
        res.send(e);
    }  
});

router.delete('/product/:id', async (req, res) => {
    try {
        console.log(req.params)
        await Product.destroy({
            where: {
                id: req.params.id
            }
        })
        res.send('success');
    }catch(e) {
        res.send(e);
    }
});

router.get('/product', async (req, res) => {
    const {search} = req.query;
    try {
        console.log(req.params)
        const product = await Product.findAll({
            where: {
                name: {
                    [Op.like]:`%${search ??''}%`
                }
            }
        })
        res.send({
            status: 'success',
            response: (product)
        });
    }catch(e) {
        res.send(e);
    }
});

router.get('/product/:id', async (req, res) => {
    try {
        console.log(req.params)
        const product = await Product.findOne({
            where: {
                id: req.params.id
            }
        })
        res.send({
            status: 'success',
            response: (product)
        });
    }catch(e) {
        res.send(e);
    }
});

router.put('/product/:id', upload.single('image'), async (req, res) => {
    try {
        console.log(req.params)
        const {users_id, name, price, stock, status} = req.body;
        const image = req.file;
        if(image) {
            const target = path.join(__dirname, '../../uploads', image.originalname);
            fs.renameSync(image.path, target);
            await Product.update({users_id, name, price, stock, status, image_url:`http://localhost:5000/public/${image.originalname}`},{
                where: {
                    id: req.params.id
                }
            })       
        }else {
            await Product.update({users_id, name, price, stock, status},{
                where: {
                    id: req.params.id
                }
            })
        }       
        res.send('success');
    }catch(e) {
        console.log(e);
        res.send(e);
    }
});

module.exports = router;