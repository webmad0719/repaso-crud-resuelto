const express = require('express')
const router = express.Router()

const Park = require('../models/park.model')
const Coaster = require('../models/coaster.model')


router.get('/new', (req, res) => {
  Park.find()
    .then(allTheParks => res.render('coasters/new-coaster', { parks: allTheParks }))
    .catch(err => console.log(err))
})


router.get('/', (req, res) => {
  Coaster.find()
    .populate('park_id')
    .then(allCoasters => res.render('coasters/coasters-index', { coasters: allCoasters }))
    .catch(err => console.log(err))
})


router.post('/new', (req, res) => {
  const { name, description, inversions, length, park } = req.body

  Coaster.create({ name, description, inversions, length, park_id: park })
    .then(newCoaster => res.redirect('/coasters'))
    .catch(err => console.log(err))
})


router.get('/:id', (req, res) => {
  Coaster.findById(req.params.id)
    .populate('park_id')
    .then(theCoaster => res.render('coasters/coaster-details', { coaster: theCoaster }))
    .catch(err => console.log(err))
})


module.exports = router
