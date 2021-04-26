import { Modal, Button, Form } from "react-bootstrap";
import React, { useState } from "react";
import axios from "axios";

function EditActions(props) {
  const { expenses, setExpenses, Index, crudAction } = props.data;
  const [FormState, setFormState] = useState(
    crudAction == "Add"
      ? {
          date: "",
          name: "",
          amount: "",
        }
      : expenses[Index]
  );
  const handleOnChange = (e) => {
    switch (e.target.name) {
      case "Date":
        setFormState({ ...FormState, date: e.target.value });
        break;

      case "Name":
        setFormState({ ...FormState, name: e.target.value });
        break;

      case "Expense":
        setFormState({ ...FormState, amount: e.target.value });
        break;

      default:
        break;
    }
  };

  const handleSave = () => {
    switch (crudAction) {
      case "Add":
        axios.post("http://localhost:8080/add", FormState).then((res) => {
          setExpenses([...expenses, FormState]);
          props.onHide();
        });
        break;

      case "Edit":
        axios
          .put(`http://localhost:8080/edit/${expenses[Index]._id}`, FormState)
          .then((res) => {
            setExpenses((prevExpenses) => {
              prevExpenses[Index] = FormState;
              return prevExpenses;
            });
            props.onHide();
          });
        break;
      default:
        break;
    }
  };
  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Modal heading
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Control
              type="date"
              placeholder="Date"
              value={FormState.date}
              onChange={handleOnChange}
              name="Date"
            />
          </Form.Group>

          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Item name"
              value={FormState.name}
              onChange={handleOnChange}
              name="Name"
            />
          </Form.Group>

          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Expense"
              value={FormState.amount}
              onChange={handleOnChange}
              name="Expense"
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditActions;
