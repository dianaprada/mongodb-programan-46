
/* Configure serv- Mogoose Library*/
const express = require('express');
const router = express.Router();
const MenuModel = require('../models/restmodels.js');

/* Getting all */
router.get('/', async (req, res) => {
    
    try {
        const menu = await MenuModel.find();
        res.json(menu); 
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }

})

/* Getting one */
router.get('/:id', getDishByID, (req, res) => {
    //res.send(res.dish.plato);
    res.json(res.dish);
})

/* Create one */
router.post('/', async (req, res) => {
    const dish = new MenuModel({
        plato: req.body.plato,
        precio: req.body.precio,
        tipo_de_plato: req.body.tipo_de_plato,
    })
    try {
        const newDish = await dish.save();
        res.status(201).json(newDish);
    }
    catch (err) {
        res.status(400).json({ message: err.message});
    }
    
})

/* Updating one */
router.patch('/:id', getDishByID, async (req, res) => {
    if(req.body.plato != null ) {
        res.dish.plato = req.body.plato;
    }
    if(req.body.precio != null ) {
        res.dish.precio = req.body.precio;
    }
    if(req.body.tipo_de_plato != null ) {
        res.dish.tipo_de_plato = req.body.tipo_de_plato;
    }

    try {
        const updatedDish = await res.dish.save();
        res.json(updatedDish)
     }
     catch (err) {
         res.status(400).json({ message: err.message })
     }
    
})

/* Deleting one */
router.delete('/:id', getDishByID, async (req, res) => {
    
    try {
       await res.dish.remove(); 
       res.json({ message: 'El plato se ha eliminado del menú'})
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
})



/* MiddleWare find by ID */

async function getDishByID (req, res, next){    
    let dish;
    try {
        dish = await MenuModel.findById(req.params.id);
        if (dish == null) {
            return res.status(404).json({ message: 'El plato no existe'})
        }
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
    
    res.dish = dish; 
    next()
    
}

module.exports = router

