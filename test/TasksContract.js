const TasksContract = artifacts.require("TasksContract")

contract("TasksContract", () => {
    before(async () => {
        this.tasksConstract = await TasksContract.deployed()
    })

    it('se ha desplegado el contracto correctamente', async () => {
        const address = this.tasksConstract.address
        assert.notEqual(address, null)
        assert.notEqual(address, undefined)
        assert.notEqual(address, '0x00')
        assert.notEqual(address, '')

    })

    it('obtener lista de tareas', async () => {
        const tasksCounter = await this.tasksConstract.taskCounter()
        const task = await this.tasksConstract.tasks(tasksCounter)
        assert.equal(task.id.toNumber(), tasksCounter)
        assert.equal(task.title, "mi primer tarea de ejemplo")
        assert.equal(task.description, "tengo que hacer algo")
        assert.equal(task.done, false)
        assert.equal(tasksCounter, 1)
    })

    it('tarea creada correctamente', async () => {
        const result = await this.tasksConstract.createTask("some task", "description two")
        const taskEvent = result.logs[0].args
        const tasksCounter = await this.tasksConstract.taskCounter()

        assert.equal(tasksCounter, 2)
        assert.equal(taskEvent.id.toNumber(), 2)
        assert.equal(taskEvent.title, "some task")
        assert.equal(taskEvent.description, "description two")
        assert.equal(taskEvent.done, false)

    })

    it('task toggle done', async () => {
        const result = await this.tasksConstract.toggleDone(1)
        const taskEvent = result.logs[0].args
        const task = await this.tasksConstract.tasks(1)

        assert.equal(task.done, true)
        assert.equal(taskEvent.done, true)
        assert.equal(taskEvent.id.toNumber(), 1)

    })
})