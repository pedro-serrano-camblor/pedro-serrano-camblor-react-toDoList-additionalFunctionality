import React, { useState } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

// include fontawesome icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faTrash,
  faCalendar,
  faArrowRight,
  faArrowLeft,
  faBroom,
} from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  // States
  const [newTask, setNewTask] = useState("");
  const [scheduledTasks, setScheduledTasks] = useState([]);
  const [currentTasks, setCurrentTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [discardedTasks, setDiscardedTasks] = useState([]);

  // Functions
  function addTask() {
    if (newTask.trim() === "") return;
    setCurrentTasks([...currentTasks, newTask.trim()]);
    setNewTask("");
  }

  // Move between lists
  function scheduleTask(task, index) {
    setScheduledTasks([...scheduledTasks, task]);
    removeCurrentTask(index);
  }

  function moveToCurrent(task, index) {
    setCurrentTasks([...currentTasks, task]);
    removeScheduledTask(index);
  }

  function completeTask(task, index) {
    setCompletedTasks([...completedTasks, task]);
    removeCurrentTask(index);
  }

  function discardTask(task, index) {
    setDiscardedTasks([...discardedTasks, task]);
    removeCurrentTask(index);
  }

  function discardFromScheduled(task, index) {
    setDiscardedTasks([...discardedTasks, task]);
    removeScheduledTask(index);
  }

  function discardFromCompleted(task, index) {
    setDiscardedTasks([...discardedTasks, task]);
    removeCompletedTask(index);
  }

  function recoverToCurrent(task, index) {
    setCurrentTasks([...currentTasks, task]);
    removeCompletedTask(index);
  }

  function recoverToCurrentFromDiscarded(task, index) {
    setCurrentTasks([...currentTasks, task]);
    removeDiscardedTask(index);
  }

  // Remove helpers
  function removeCurrentTask(index) {
    setCurrentTasks(currentTasks.filter((_, i) => i !== index));
  }

  function removeScheduledTask(index) {
    setScheduledTasks(scheduledTasks.filter((_, i) => i !== index));
  }

  function removeCompletedTask(index) {
    setCompletedTasks(completedTasks.filter((_, i) => i !== index));
  }

  function removeDiscardedTask(index) {
    setDiscardedTasks(discardedTasks.filter((_, i) => i !== index));
  }

  // Clear list with confirmation
  function clearWithConfirm(listName) {
    if (
      window.confirm(
        "Are you sure you want to clear the list? You won't be able to recover them: Yes ; No"
      )
    ) {
      if (listName === "scheduled") setScheduledTasks([]);
      else if (listName === "current") setCurrentTasks([]);
      else if (listName === "completed") setCompletedTasks([]);
      else if (listName === "discarded") setDiscardedTasks([]);
    }
  }

  // Header styles per section
  const headerStyles = {
    scheduled: {
      backgroundColor: "#fff9db",
      padding: "0.5rem 1rem",
      borderRadius: "0.25rem",
    },
    current: {
      backgroundColor: "#ffffff",
      padding: "0.5rem 1rem",
      borderRadius: "0.25rem",
      borderLeft: "3px solid #0d6efd",
      borderRight: "3px solid #0d6efd",
    },
    completed: {
      backgroundColor: "#d1e7dd",
      padding: "0.5rem 1rem",
      borderRadius: "0.25rem",
    },
    discarded: {
      backgroundColor: "#f8d7da",
      padding: "0.5rem 1rem",
      borderRadius: "0.25rem",
    },
  };

  return (
    <div className="container-fluid py-4 bg-light" style={{ minHeight: "100vh" }}>
      <h1 className="text-center mb-4">Task Manager</h1>
      <div className="row">

        {/* Scheduled Tasks */}
        <div className="col-12 col-md-3 mb-4">
          <h5
            className="d-flex justify-content-between align-items-center"
            style={headerStyles.scheduled}
          >
            Scheduled Tasks ({scheduledTasks.length} task{scheduledTasks.length !== 1 ? "s" : ""})
            <button
              className="btn btn-sm btn-warning"
              onClick={() => clearWithConfirm("scheduled")}
            >
              <FontAwesomeIcon icon={faBroom} />
            </button>
          </h5>
          <hr />
          <ul className="list-group">
            {scheduledTasks.map((task, index) => (
              <li
                key={index}
                className="list-group-item bg-warning-subtle d-flex justify-content-between align-items-center"
              >
                <span>{task}</span>
                <div>
                  <button
                    className="btn btn-sm btn-secondary me-1"
                    onClick={() => moveToCurrent(task, index)}
                    title="Move to Current tasks"
                  >
                    <FontAwesomeIcon icon={faArrowRight} />
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => discardFromScheduled(task, index)}
                    title="Discard task"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Current Tasks */}
        <div className="col-12 col-md-6 mb-4">
          <h5
            className="d-flex justify-content-between align-items-center"
            style={headerStyles.current}
          >
            Current Tasks ({currentTasks.length} task{currentTasks.length !== 1 ? "s" : ""})
            <button
              className="btn btn-sm btn-secondary"
              onClick={() => clearWithConfirm("current")}
            >
              <FontAwesomeIcon icon={faBroom} />
            </button>
          </h5>
          <hr />
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Type your task and press Enter"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTask()}
          />
          <ul className="list-group">
            {currentTasks.map((task, index) => (
              <li
                key={index}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <span>{task}</span>
                <div>
                  <button
                    className="btn btn-sm btn-success me-1"
                    onClick={() => completeTask(task, index)}
                    title="Complete task"
                  >
                    <FontAwesomeIcon icon={faCheck} />
                  </button>
                  <button
                    className="btn btn-sm btn-danger me-1"
                    onClick={() => discardTask(task, index)}
                    title="Discard task"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                  <button
                    className="btn btn-sm btn-warning"
                    onClick={() => scheduleTask(task, index)}
                    title="Schedule task"
                  >
                    <FontAwesomeIcon icon={faCalendar} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="col-12 col-md-3 d-flex flex-column justify-content-between" style={{ minHeight: "70vh" }}>
          {/* Completed Tasks */}
          <div className="mb-4">
            <h5
              className="d-flex justify-content-between align-items-center"
              style={headerStyles.completed}
            >
              Completed Tasks ({completedTasks.length} task{completedTasks.length !== 1 ? "s" : ""})
              <button
                className="btn btn-sm btn-success"
                onClick={() => clearWithConfirm("completed")}
              >
                <FontAwesomeIcon icon={faBroom} />
              </button>
            </h5>
            <hr />
            <ul className="list-group">
              {completedTasks.map((task, index) => (
                <li
                  key={index}
                  className="list-group-item bg-success-subtle d-flex justify-content-between align-items-center"
                >
                  <span className="text-decoration-line-through">{task}</span>
                  <div>
                    <button
                      className="btn btn-sm btn-danger me-1"
                      onClick={() => discardFromCompleted(task, index)}
                      title="Discard task"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                    <button
                      className="btn btn-sm btn-secondary"
                      onClick={() => recoverToCurrent(task, index)}
                      title="Recover task"
                    >
                      <FontAwesomeIcon icon={faArrowLeft} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Discarded Tasks */}
          <div>
            <h5
              className="d-flex justify-content-between align-items-center"
              style={headerStyles.discarded}
            >
              Discarded Tasks ({discardedTasks.length} task{discardedTasks.length !== 1 ? "s" : ""})
              <button
                className="btn btn-sm btn-danger"
                onClick={() => clearWithConfirm("discarded")}
              >
                <FontAwesomeIcon icon={faBroom} />
              </button>
            </h5>
            <hr />
            <ul className="list-group">
              {discardedTasks.map((task, index) => (
                <li
                  key={index}
                  className="list-group-item bg-danger-subtle d-flex justify-content-between align-items-center"
                >
                  <span className="text-decoration-line-through">{task}</span>
                  <button
                    className="btn btn-sm btn-secondary"
                    onClick={() => recoverToCurrentFromDiscarded(task, index)}
                    title="Recover task"
                  >
                    <FontAwesomeIcon icon={faArrowLeft} />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Home;
