// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;


contract TasksContract {

    uint public taskCounter = 0;

    constructor(){
        createTask("mi primer tarea de ejemplo", "tengo que hacer algo");
    }

    event TaskCreated(
        uint id,
        string title,
        string description,
        bool done,
        uint createdAt
    );

    event TaskToggleDone(uint id, bool done);

    struct Task {
        uint id;
        string title;
        string description;
        bool done;
        uint createdAt;
    }

    mapping(uint => Task) public tasks;

    function createTask(string memory _title, string memory _description) public {
        taskCounter++;
        tasks[taskCounter] = Task(taskCounter, _title, _description, false, block.timestamp);
        // esto sirve para que una vez creada la tarea, me devuelva en el vector de logs la tarea
        emit TaskCreated(taskCounter, _title, _description, false, block.timestamp);
    }

    function toggleDone(uint _id) public {
        Task memory _task = tasks[_id];
        _task.done = !_task.done;
        tasks[_id] = _task;
        emit TaskToggleDone(_id,_task.done);
    }
}
