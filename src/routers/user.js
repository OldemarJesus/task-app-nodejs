const express = require('express')
const auth = require('../middleware/auth')
const router = new express.Router()
const User = require('../models/user')
const Task = require('../models/task')

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

// get user profile
router.get('/users/me', auth, async (req, res) => {
    try {
        res.status(200).send(req.user)
    } catch (e) {
        res.status(500).send()
    }
})

// update one user
router.patch('/users/me', auth, async (req, res) => {
    try {
        const validUserProperties = ["name", "email", "password", "age"]
        const updateProperties = Object.keys(req.body)
        const isValidUpdateProperties = updateProperties.every((property) => validUserProperties.includes(property))

        if (!isValidUpdateProperties) {
            return res.status(400).send({ error: 'Ivalid update properties!' })
        }

        updateProperties.forEach((property) => {
            req.user[property] = req.body[property]
        })

        await req.user.save({isNew: false})

        res.status(200).send(req.user)
    } catch (e) {
        res.status(400).send()
    }
})

// delete one user
router.delete('/users/me', auth, async (req, res) => {
    try {
        await req.user.deleteOne()
        res.status(200).send(req.user)
    } catch (e) {
        console.log(e)
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