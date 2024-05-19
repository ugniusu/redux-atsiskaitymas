import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createGoal, deleteGoal, fetchGoals } from "../features/goalSlice";
import { logout } from "../features/authSlice";
import GoalItem from "../components/GoalItem";
import styles from "./Dashboard.module.css";
import AdminDashboard from "../components/AdminDashboard";

function Dashboard() {
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const isAdmin = localStorage.getItem("role");
  console.log(isAdmin === "admin");

  const goals = useSelector((state) => state.goals.items);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchGoals());
    }
  }, [dispatch, isAuthenticated]);

  const handleCreateGoal = (e) => {
    e.preventDefault();
    dispatch(createGoal({ text }));
    setText("");
  };

  const handleDeleteGoal = (id) => {
    dispatch(deleteGoal(id));
  };

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
  };

  return (
    <div className={styles.container}>
      <h1>Dashboard</h1>
      <form onSubmit={handleCreateGoal}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
        <button className={styles.btnAdd} type="submit">
          Add Goal
        </button>
      </form>
      <div className={styles.goalsContainer}>
        {goals.map((goal) => (
          <GoalItem key={goal._id} goal={goal} onDelete={handleDeleteGoal} />
        ))}
      </div>
      <button onClick={handleLogout}>Logout</button>

      {isAdmin && <AdminDashboard />}
    </div>
  );
}

export default Dashboard;
