import React, { useState } from "react";
import { IoMail, IoLockClosed, IoPersonAdd } from "react-icons/io5";
import "../styles/FormAddUser.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FormAddUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [role, setRole] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const saveUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/users", {
        name: name,
        email: email,
        password: password,
        confPassword: confPassword,
        role: role,
      });
      navigate("/users");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <div className="form-add-container">
      <h1 className="title mt-1" style={{ color: "#E3B04B" }}>
        Usuarios
      </h1>
      <h2 className="subtitle mt-1" style={{ color: "#ffffff" }}>
        Crear Nuevo Usuario
      </h2>
      <div className="card bg-dark text-white">
        <div className="card-body">
          <form onSubmit={saveUser}>
            <p className="text-center">{msg}</p>

            <div className="mb-3">
              <label className="form-label">
                <IoMail /> Nombre:
              </label>
              <div className="control">
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  required
                  className="form-control"
                  placeholder="Nombre"
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">
                <IoMail /> Email:
              </label>
              <div className="control">
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email" // Cambié el tipo a "email" para validación de correo
                  required
                  className="form-control"
                  placeholder="Email"
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">
                <IoLockClosed /> Password:
              </label>
              <div className="control">
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  required
                  className="form-control" // Cambié de "form-select" a "form-control"
                  placeholder="******"
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">
                <IoLockClosed />
                Confirm Password:
              </label>
              <div className="control">
                <input
                  value={confPassword}
                  onChange={(e) => setConfPassword(e.target.value)}
                  type="password"
                  required
                  className="form-control"
                  placeholder="******"
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">
                <IoLockClosed /> Role:
              </label>
              <div className="control">
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="form-select"
                >
                  <option>Selecciona un Rol</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>
            </div>

            <button type="submit" className="btn btn-success mt-2">
              Crear Usuario <IoPersonAdd/>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormAddUser;