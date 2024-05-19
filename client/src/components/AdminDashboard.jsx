import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers } from "../features/userSlice";
import axios from "axios";

function AdminDashboard() {
  const dispatch = useDispatch();
  const isAdmin = useSelector((state) => state.auth.isAdmin);
  const users = useSelector((state) => state.users.allUsers);

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  // useEffect(() => {
  //   if (isAdmin) {
  //     dispatch(fetchAllUsers());
  //   }
  // }, [dispatch, isAdmin]);

  useEffect(function () {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const res = await fetch("http://localhost:5000/api/users/users");
        const data = await res.json();
        setData(data);
      } catch {
        alert("There was an error of loading data...");
      } finally {
        setIsLoading(false);
      }
    }
    fetchCities();
  }, []);

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>{user.firstname}</td>
              <td>{user.email}</td>
              <td>
                <button>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminDashboard;
