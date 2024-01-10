const express = require('express')
const auth = require('../middleware/auth')
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
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (e) {
        res.status(400).send(e)
    }
})

// get all user
router.get('/users/me', auth, async (req, res) => {
    try {
        res.status(200).send(req.user)
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
        const user = await User.findById(req.params.id)

        updateProperties.forEach((property) => {
            user[property] = req.body[property]
        })
        await user.save()

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

// login
router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (error) {
        console.log(error)
        res.status(400).send()
    }
})

// logout
router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })

        await req.user.save()

        res.send()
    } catch (error) {
        console.log(error)
        res.status(500).send()
    }
})
router.post('/users/logout/all', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()

        res.send()
    } catch (error) {
        console.log(error)
        res.status(500).send()
    }
})

module.exports = router;