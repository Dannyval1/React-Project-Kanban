import React from "react";
import "./index.css";

export default function KanbanBoard(props) {
  const [searchInput, setSearchInput] = React.useState("");

  let [tasks, setTasks] = React.useState([
    { name: "Despertar", stage: 0 },
    { name: "Desayunar", stage: 0 },
    { name: "Almorzar", stage: 0 },
    { name: "Correr", stage: 0 },
    { name: "Ejercicio", stage: 0 },
  ]);

  let [stagesNames, setStagesNames] = React.useState([
    "Backlog",
    "To Do",
    "Ongoing",
    "Done",
  ]);

  let stagesTasks = [];
  for (let i = 0; i < stagesNames.length; ++i) {
    stagesTasks.push([]);
  }

  for (let task of tasks) {
    const stageId = task.stage;
    stagesTasks[stageId].push(task);
  }

  const changeStageTaskPlus = (task, index) => {
    const stateCopy = [...tasks];
    const [_] = task.name.split(" ");
    for (const s in stateCopy) {
      if (Number(s) === Number(index)) {
        task.stage += 1;
      }
    }
    stateCopy[index] = task;
    setTasks([...tasks]);
  };

  const addTask = (taskToDo) => {
    if (taskToDo.length > 0) {
      const objectToSend = {
        name: taskToDo,
        stage: 0,
      };
      tasks.push(objectToSend);
      setSearchInput("");
    }
  };

  const changeStageTaskMinus = (task, index) => {
    const stateCopy = [...tasks];
    const [_] = task.name.split(" ");
    for (const s in stateCopy) {
      if (Number(s) === Number(index)) {
        task.stage -= 1;
      }
    }
    stateCopy[index] = task;
    setTasks([...tasks]);
  };

  const deleteTask = (task) => {
    const removeItem = tasks.indexOf(task);
    if (removeItem > -1) { 
      tasks.splice(removeItem, 1); 
    }
    setTasks([...tasks]);
  };

  return (
    <div className="mt-20 layout-column justify-content-center align-items-center">
      <section className="mt-50 layout-row align-items-center justify-content-center">
        <input
          id="create-task-input"
          type="text"
          className="large"
          placeholder="New task name"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          data-testid="create-task-input"
        />
        <button
          type="submit"
          className="ml-30"
          onClick={() => addTask(searchInput)}
          data-testid="create-task-button"
        >
          Create task
        </button>
      </section>

      <div className="mt-50 layout-row">
        {stagesTasks.map((tasks, i) => {
          return (
            <div className="card outlined ml-20 mt-0" key={`${i}`}>
              <div className="card-text">
                <h4>{stagesNames[i]}</h4>
                <ul className="styled mt-50" data-testid={`stage-${i}`}>
                  {tasks.map((task, index) => {
                    return (
                      <li className="slide-up-fade-in" key={`${i}${index}`}>
                        <div className="li-content layout-row justify-content-between align-items-center">
                          <span
                            data-testid={`${task.name
                              .split(" ")
                              .join("-")}-name`}
                          >
                            {task.name}
                          </span>
                          <div className="icons">
                            <button
                              className="icon-only x-small mx-2 d-flex arrow_back"
                              data-testid={`${task.name
                                .split(" ")
                                .join("-")}-back`}
                              onClick={() => changeStageTaskMinus(task, index)}
                              disabled={task.stage === 0}
                            >
                              <i className="material-icons">arrow_back</i>
                            </button>
                            <button
                              className="icon-only x-small mx-2 d-flex arrow_forward"
                              data-testid={`${task.name
                                .split(" ")
                                .join("-")}-forward`}
                              onClick={() => changeStageTaskPlus(task, index)}
                              disabled={task.stage === stagesNames.length-1}
                            >
                              <i className="material-icons">arrow_forward</i>
                            </button>
                            <button
                              className="icon-only danger x-small mx-2 d-flex delete"
                              data-testid={`${task.name
                                .split(" ")
                                .join("-")}-delete`}
                              onClick={() => deleteTask(task)}
                            >
                              <i className="material-icons">delete</i>
                            </button>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
