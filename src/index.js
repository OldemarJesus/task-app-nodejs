const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

//
// User Endpoint
//

// add user
app.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        res.status(201).send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

// get all user
app.get('/users', async (_, res) => {
    try {
        const users = await User.find({})
        res.status(200).send(users)
    } catch (e) {
        res.status(500).send()
    }
})

// get one user
app.get('/users/:id', async (req, res) => {
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
app.patch('/users/:id', async (req, res) => {
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
app.delete('/users/:id', async (req, res) => {
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

//
// Task Endpoint
//

// create task
app.post('/tasks', async (req, res) => {
    const task = new Task(req.body)

    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send()
    }
})

// get all task
app.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({})
        res.status(200).send(tasks)
    } catch (e) {
        res.status(500).send()
    }
})

// get one task
app.get('/tasks/:id', async (req, res) => {
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
app.patch('/tasks/:id', async (req, res) => {
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
app.delete('/tasks/:id', async (req, res) => {
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

app.listen(port, () => {
    console.info('Server is up on http://127.0.0.1:' + port)
})