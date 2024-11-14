import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import eye from "../assets/eye.svg";
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { LoginUser } from "../features/authSlice";
import "../styles/Register.css";

const Register = () => {
    const [nombre, setNombre] = useState("");
    const [correo, setCorreo] = useState("");
    const [contraseña, setContraseña] = useState("");
    const [confirmarContraseña, setConfirmarContraseña] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        if (contraseña !== confirmarContraseña) {
            setError("Las contraseñas no coinciden.");
            return;
        }
        setError("");
        try {
            await axios.post('http://localhost:5000/users', {
                name: nombre,
                email: correo,
                password: contraseña,
                confPassword: confirmarContraseña,
                role: "user"
            });
            const loginResponse = await dispatch(LoginUser({ email: correo, password: contraseña }));
            if (loginResponse.meta.requestStatus === 'fulfilled') {
                navigate('/dashboard'); 
            } else {
                setError("Error al iniciar sesión después del registro");
            }
        } catch (error) {
            setError(error.response?.data?.msg || "Error desconocido");
        }
    };

    const handleLoginRedirect = () => {
        navigate("/"); 
    };

    return (
        <div className="desktop">
            <div className="overlap-wrapperReg">
                <div className="title-section">
                    <div className="text-wrapperReg">Registrate!</div>
                </div>
                <form onSubmit={handleRegister}>
                    <div className="inputs-section">
                        <div className="textInputWrapperReg">
                            <label htmlFor="nombre" className="labelForInput">Nombre:</label>
                            <input
                                id="nombre"
                                type="text"
                                className="textInputReg"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                placeholder="Ingresa tu nombre"
                                required
                            />
                        </div>
                        <div className="textInputWrapperReg">
                            <label htmlFor="correo" className="labelForInput">Correo:</label>
                            <input
                                id="correo"
                                type="email"
                                className="textInputReg"
                                value={correo}
                                onChange={(e) => setCorreo(e.target.value)}
                                placeholder="Ingresa tu correo"
                                required
                            />
                        </div>
                        <div className="textInputWrapperReg">
                            <label htmlFor="contraseña" className="labelForInput">Contraseña:</label>
                            <div className="input-container">
                                <input
                                    id="contraseña"
                                    type={showPassword ? "text" : "password"}
                                    className="textInputReg"
                                    value={contraseña}
                                    onChange={(e) => setContraseña(e.target.value)}
                                    placeholder="Contraseña"
                                    required
                                />
                                <img
                                    className="eye"
                                    alt="Mostrar Contraseña"
                                    src={eye}
                                    onClick={togglePasswordVisibility}
                                />
                            </div>
                        </div>
                        <div className="textInputWrapperReg">
                            <label htmlFor="confirmarContraseña" className="labelForInput">Confirma tu contraseña:</label>
                            <div className="input-container">
                                <input
                                    id="confirmarContraseña"
                                    type={showPassword ? "text" : "password"}
                                    className="textInputReg"
                                    value={confirmarContraseña}
                                    onChange={(e) => setConfirmarContraseña(e.target.value)}
                                    placeholder="Confirma tu contraseña"
                                    required
                                />
                                <img
                                    className="eye"
                                    alt="Mostrar Contraseña"
                                    src={eye}
                                    onClick={togglePasswordVisibility}
                                />
                            </div>
                        </div>
                        {error && <p className="error-message">{error}</p>}
                    </div>
                    <div className="footer-section">
                        <button type="submit" className="buttom">Registrarse</button>
                        <div className="a-n-ya-tienes-cuenta">
                            ¿Ya tienes cuenta? <span onClick={handleLoginRedirect} style={{ color: 'cyan', cursor: 'pointer' }}>Inicia sesión</span>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;