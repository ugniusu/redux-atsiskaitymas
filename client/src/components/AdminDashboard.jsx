import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, fetchAllUsers } from "../features/userSlice";
import axios from "axios";

const BASE_URL = "http://localhost:5000/api/users";

function AdminDashboard() {
  const dispatch = useDispatch();
  const isAdmin = useSelector((state) => state.auth.isAdmin);
  const users = useSelector((state) => state.users.allUsers);

  const [data, setData] = useState([]);

  // useEffect(() => {
  //   if (isAdmin) {
  //     dispatch(fetchAllUsers());
  //   }
  // }, [dispatch, isAdmin]);

  useEffect(function () {
    async function fetchUsers() {
      try {
        const res = await fetch(`${BASE_URL}/users`);
        const data = await res.json();
        setData(data);
        console.log(data);
      } catch {
        alert("There was an error of loading data...");
      } finally {
      }
    }
    fetchUsers();
  }, []);

  const handleDeleteUser = (id) => {
    dispatch(deleteUser(id));
  };

  // FAKE API fetch
  // useEffect(function () {
  //   async function fetchCities() {
  //     try {
  //       setIsLoading(true);
  //       const res = await fetch(`http://localhost:7000/users`);
  //       const data = await res.json();
  //       setData(data);
  //       console.log(data);
  //     } catch {
  //       alert("There was an error of loading data...");
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   }
  //   fetchCities();
  // }, []);

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user) => (
            <tr key={user._id}>
              <td>{user.firstname}</td>
              <td>{user.email}</td>
              <td>
                <button onClick={handleDeleteUser}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminDashboard;
