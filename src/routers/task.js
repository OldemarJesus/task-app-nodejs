const express = require('express')
const router = new express.Router()
const Task = require('../models/task')

//
// Task Endpoint
//

// create task
router.post('/tasks', async (req, res) => {
    const task = new Task(req.body)

    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send()
    }
})

// get all task
router.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({})
        res.status(200).send(tasks)
    } catch (e) {
        res.status(500).send()
    }
})

// get one task
router.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const task = await Task.findById(_id)

        if (!task) {
            return res.status(404).send()
        }

        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})

// update one task
router.patch('/tasks/:id', async (req, res) => {
    const _id = req.params.id

    const validTaskProperties = ["description", "completed"]
    const updateTaskProperties = Object.keys(req.body)
    const isValidUpdateTaskProperties = updateTaskProperties.every((property) => validTaskProperties.includes(property))

    if (!isValidUpdateTaskProperties) {
        return res.status(400).send({ error: 'Update invalid task properties!' })
    }

    try {
        const task = await Task.findByIdAndUpdate(_id, req.body, { runValidators: true, new: true })

        if (!task) {
            return res.status(404).send()
        }

        res.send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

// delete one task
router.delete('/tasks/:id', async (req, res) => {
    const _id = req.params.id

    try{
        const task = await Task.findByIdAndDelete(_id)

        if(!task){
            return res.status(404).send()
        }

        res.status(200).send(task)
    }catch(e) {
        res.status(500).send()
    }
})

module.exports = router