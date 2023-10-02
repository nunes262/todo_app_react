import React, { useState, useEffect } from "react";
import "./App.css";
import Card from "react-bootstrap/Card";
import TaskListCard from "./components/TaskListCard";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (task.trim() === "") return;
    setTasks([...tasks, { text: task, completed: false }]);
    setTask("");
  };

  const deleteTask = (index) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };

  const toggleComplete = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  const openTasks = tasks.filter((task) => !task.completed);
  const completedTasks = tasks.filter((task) => task.completed);

  const handleDeleteAll = () => {
    setTasks([]);
  };

  return (
    <div className="App">
    <div className="title-bar">
      <h1>Lista de Tarefas</h1>
      <h2>Tarefas</h2>
      <Card.Header>Tarefas em Aberto</Card.Header>
      <Card>
        <Card.Body className="card">
          <Form>
            <Form.Group>
              <Form.Control
                className="input"
                type="text"
                placeholder="Adicionar tarefa"
                value={task}
                onChange={(e) => setTask(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" onClick={addTask} className="primary">
              Adicionar
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <Button className="delete-all-button" onClick={handleDeleteAll}>
        Deletar todas as tarefas
      </Button>
    </div>
    <div className="card-container">
      <TaskListCard
        title="Tarefas Concluídas"
        tasks={completedTasks}
        onToggleComplete={toggleComplete}
        onDeleteTask={deleteTask}
      />
      <TaskListCard
        title="Tarefas em Aberto"
        tasks={openTasks}
        onToggleComplete={toggleComplete}
        onDeleteTask={deleteTask}
      />
    </div>
  </div>
  );
}

export default App;
