import React from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function TaskListCard({ title, tasks, onToggleComplete, onDeleteTask }) {
  return (
    <Card className="task-card">
      <Card.Header>{title}</Card.Header>
      <Card.Body>
        <ListGroup variant="flush" style={{border: "solid 1px #ccc", width: "400px", height: "350px", borderRadius: "8px"}}>
          {tasks.map((task, index) => (
            <ListGroup.Item key={index} className="task-item">
              <div>
                <Form.Check
                  type="checkbox"
                  label={task.text}
                  checked={task.completed}
                  onChange={() => onToggleComplete(index)}
                />
              </div>
              <button
                className="delete-button"
                onClick={() => onDeleteTask(index)}
              >
                <i className="fa fa-trash"></i>
              </button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
  );
}

export default TaskListCard;
