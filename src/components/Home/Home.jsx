import React, { useState, useEffect } from "react";
import axios from "axios";
import inr from "../../inr.svg";
import editIcon from "../../assets/edit.svg";
import saveIcon from "../../assets/save.svg";
import EditActions from "../EditActions/EditActions";
import plusBtn from "../../assets/plus.svg";

function Home() {
  const [modalShow, setModalShow] = useState(false);
  const [Index, setIndex] = useState(undefined);
  const [crudAction, setCrudAction] = useState(undefined);
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    axios.get("https://budget-tracker-backend-node.herokuapp.com/get").then((res) => {
      setExpenses(res.data.expenses);
    });
  }, []);

  const handleTrClick = (e, index) => {
    if (e.target.className == "save-icon") {
      setIndex(index);
      console.log(index, "index");
    }
  };

  const handleEdit = (e) => {
    setCrudAction("Edit");
    setModalShow(true);
  };

  const handleAddExpense = () => {
    setCrudAction("Add");
    setModalShow(true);
  };

  const handleDelete = () => {
    if (Index != undefined) {
      const url = `https://budget-tracker-backend-node.herokuapp.com/del/${expenses[Index]._id}`;
      axios
        .delete(url,{id:expenses[Index]._id})
        .then((res) => {
          setExpenses((prevExpenses) => {
            return prevExpenses.splice(Index, 1);;
          });
        });
    }
  };

  const formatDate = (date) => {
    let mydate = new Date(date);
    let month =
      "" +
      [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ][mydate.getMonth()];
    return (
      month.substring(0, 3) +
      "-" +
      mydate.getDate() +
      "-" +
      mydate.getFullYear()
    );
  };

  return (
    <>
      <table>
        <tbody>
          <tr>
            <th>Date</th>
            <th>Name</th>
            <th>Expenses</th>
            <th>Edit</th>
          </tr>
          {!!expenses.length &&
            expenses.map((expense, index) => {
              return (
                <tr
                  key={`expenseRow_${index}`}
                  onClick={(e) => handleTrClick(e, index)}
                >
                  <td>{formatDate(expense.date)}</td>
                  <td id={`expenseNameId_${index}`}>{expense.name}</td>
                  <td>
                    <img src={inr} className="inr" />
                    {expense.amount}
                  </td>
                  <td>
                    <div className="d-flex">
                      <img
                        onClick={handleEdit}
                        src={editIcon}
                        className="save-icon"
                      />
                      <img
                        onClick={handleDelete}
                        src={saveIcon}
                        className="save-icon"
                      />
                    </div>
                  </td>
                </tr>
              );
            })}
          <tr>
            <th style={{ backgroundColor: "white", color: "red" }}>Total</th>
            <td className="total"></td>
            <td colSpan="2" className="total">
              <img src={inr} className="inr" />
              {!!expenses.length &&
                expenses
                  .map((expense) => +expense.amount)
                  .reduce(
                    (accumulator, currentValue) => accumulator + currentValue,
                    0
                  )}
            </td>
          </tr>
        </tbody>
      </table>

      {!!modalShow && (
        <EditActions
          show={modalShow}
          onHide={() => setModalShow(false)}
          data={{ expenses, setExpenses, Index, crudAction }}
        />
      )}

      <div className="add-snippet-btn">
        <img
          src={plusBtn}
          className="cursor-pointer"
          onClick={handleAddExpense}
        />
      </div>
    </>
  );
}

export default Home;
