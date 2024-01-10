const express = require('express')
const auth = require('../middleware/auth')
const router = new express.Router()
const Task = require('../models/task')

//
// Task Endpoint
//

// create task
router.post('/tasks', auth, async (req, res) => {
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })

    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send()
    }
})

// get all task
router.get('/tasks', auth, async (req, res) => {
    try {
        await req.user.populate('tasks')
        const tasks = req.user.tasks
        res.status(200).send(tasks)
    } catch (e) {
        console.log(e)
        res.status(500).send()
    }
})

// get one task
router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id

    try {
        const task = await Task.findOne({ _id, owner: req.user._id })

        if (!task) {
            return res.status(404).send()
        }

        res.send(task)
    } catch (e) {
        console.log(e)
        res.status(500).send()
    }
})

// update one task
router.patch('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id

    const validTaskProperties = ["description", "completed"]
    const updateTaskProperties = Object.keys(req.body)
    const isValidUpdateTaskProperties = updateTaskProperties.every((property) => validTaskProperties.includes(property))

    if (!isValidUpdateTaskProperties) {
        return res.status(400).send({ error: 'Update invalid task properties!' })
    }

    try {
        const task = await Task.findOneAndUpdate({ _id, owner: req.user._id }, req.body)

        if (!task) {
            return res.status(404).send()
        }

        res.send(task)
    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
})

// delete one task
router.delete('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id

    try {
        const task = await Task.findOneAndDelete({ _id, owner: req.user._id })

        if (!task) {
            return res.status(404).send()
        }

        res.status(200).send(task)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router