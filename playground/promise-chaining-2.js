require('../src/db/mongoose')
const Task = require('../src/models/task')
// const User = require('../src/models/user')

Task.findByIdAndDelete('6599f544ae4db5841abc5bbd').then((task) => {
    console.log(task)
    return Task.countDocuments({ completed: false })
}).then((result) => {
    console.log(result)
}).catch((error) => {
    console.log(error)
})