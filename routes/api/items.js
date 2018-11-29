const express = require('express')
const router = express.Router()

// Item Model so you can make queries
const Item = require('../../models/Item')

// @route   GET api/items
// @desc    Get All Items
// @access  Public
router.get('/', (req, res) => {
    Item.find()
        .sort({ date: -1 })
        .then(items => res.json(items))
})

// @route   POST api/items
// @desc    Create A Item
// @access  Public / normally private if you have auth
router.post('/', (req, res) => {
    const newItem = new Item({
        name: req.body.name
        //we can do body due to body parser
    })
    newItem.save().then(item => res.json(item))
})

// // @route   UPDATE api/items
// // @desc    Updates A Item
// // @access  Public / normally private if you have auth
// router.put('/:id', (req, res) => {
//     Item.findById(req.params.id)
//     .then()
// })


// @route   DELETE api/items/:id
// @desc    Delete A Item
// @access  Public / normally private if you have auth
router.delete('/:id', (req, res) => {
    Item.findById(req.params.id)
     .then(item => item.remove().then(() => res.json({ success: true })))
     .catch(err => res.status(404).json({ success: false }))
})

module.exports = router