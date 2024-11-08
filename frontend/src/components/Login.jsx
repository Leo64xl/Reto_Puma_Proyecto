import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { LoginUser, reset } from "../features/authSlice";
import eye from "../assets/eye.svg"; 
import image1 from "../assets/img/img_1.jpeg";
import image2 from "../assets/img/img_2.jpeg";
import Slider from "react-slick"; 
import "../styles/Login.css";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const emailInputRef = useRef(null);
    const { user, isError, isSuccess, isLoading, message } = useSelector(
        (state) => state.auth
    );

    useEffect(() => {
        if (user || isSuccess) {
            navigate("/dashboard");
        }
        dispatch(reset());
    }, [user, isSuccess, dispatch, navigate]);

    useEffect(() => {
        emailInputRef.current.focus();
    }, []);

    const handleAuth = (e) => {
        e.preventDefault();
        dispatch(LoginUser({ email, password }));
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const PrevButton = ({ onClick }) => (
        <button className="prev-button" onClick={onClick}>
            {/* Puedes añadir un icono o texto aquí */}
            &#10094; {/* Este es un símbolo de flecha hacia la izquierda */}
        </button>
    );
    
    const NextButton = ({ onClick }) => (
        <button className="next-button" onClick={onClick}>
            {/* Puedes añadir un icono o texto aquí */}
            &#10095; {/* Este es un símbolo de flecha hacia la derecha */}
        </button>
    );
    

    // Configuración del carrusel
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
    };

    return (
        <div className="main-container">
        <div className="carrusel">
            <Slider {...settings}
            prevArrow={<PrevButton />}
            nextArrow={<NextButton />}
            style={{ height: '100%' }}> {/* Ajuste aquí */}
                <div>
                    <img src={image1} alt="Imagen 1" />
                </div>
                <div>
                    <img src={image2} alt="Imagen 2" />
                </div>
            </Slider>
            <p className="eslogan">ATRÉVETE A RECORRERLO
            </p>
        </div>
            <div className="form">
                <div className="title-section">
                    <div className="text-wrapper">Bienvenido de vuelta!</div>
                </div>
                <form onSubmit={handleAuth}>
                    <div className="inputs-section">
                        {/* Campo de correo electrónico */}
                        <div className="input2">
                            <div className="textInputWrapper">
                                <label htmlFor="email" className="email-label">Correo:</label>
                                <input
                                    ref={emailInputRef}
                                    id="email"
                                    type="email"
                                    className="textInput"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Ingresa tu correo:"
                                    required
                                />
                            </div>
                        </div>

                        {/* Campo de contraseña */}
                        <div className="input-2">
                            <div className="textInputWrapper">
                                <label htmlFor="password" className='passwordlabel'>Ingresa tu contraseña:</label>
                                <div className="input-container">
                                    <input 
                                        id="password"
                                        type={showPassword ? "text" : "password"} 
                                        className="textInput"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Contraseña"
                                        required
                                    />
                                    <img 
                                        className="eye" 
                                        alt="Eye" 
                                        src={eye} 
                                        onClick={togglePasswordVisibility}
                                    />
                                </div>
                                
                            </div>                            
                        </div>
                    </div>
                    {/* Mensaje de error */}
                    {isError && <div className="error-message">{message}</div>}
                    <div className="footer-section">
                        {/* Botón de envío */}
                        <button type="submit" className="buttom">
                            <div className="text-wrapper-4">
                                {isLoading ? 'Cargando...' : 'Iniciar sesión'}
                            </div>
                        </button>
                        {/* Registro de cuenta */}
                        <p className="a-n-no-tienes-cuenta">
                            <span className="span">¿Aún no tienes cuenta? </span>
                            {/* Para mandar al registro */}
                            <Link to ="/register">
                                <span className="text-wrapper-5">Crea una ahora</span>
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;