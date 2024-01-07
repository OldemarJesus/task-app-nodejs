const express = require('express')
const router = new express.Router()
const User = require('../models/user')

//
// User Endpoint
//

// add user
router.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        res.status(201).send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

// get all user
router.get('/users', async (_, res) => {
    try {
        const users = await User.find({})
        res.status(200).send(users)
    } catch (e) {
        res.status(500).send()
    }
})

// get one user
router.get('/users/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const user = await User.findById(_id)

        if (!user) {
            return res.status(404).send()
        }

        res.status(200).send(user)
    } catch (err) {
        res.status(500).send()
    }
})

// update one user
router.patch('/users/:id', async (req, res) => {
    const validUserProperties = ["name", "email", "password", "age"]
    const updateProperties = Object.keys(req.body)
    const isValidUpdateProperties = updateProperties.every((property) => validUserProperties.includes(property))

    if (!isValidUpdateProperties) {
        return res.status(400).send({ error: 'Ivalid update properties!' })
    }

    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { runValidators: true, new: true })

        if (!user) {
            return res.status(404).send()
        }

        res.status(200).send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

// delete one user
router.delete('/users/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const user = await User.findByIdAndDelete(_id)

        if (!user) {
            return res.status(404).send()
        }

        res.status(200).send(user)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router;