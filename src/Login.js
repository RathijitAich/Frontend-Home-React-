import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import PropTypes from 'prop-types';

const notificationStyles = {
  base: {
    position: "fixed",
    top: 20,
    right: 20,
    padding: "12px 20px",
    borderRadius: 8,
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
    transform: "translateX(150%)",
    transition: "transform 0.3s ease",
    zIndex: 1000,
    color: "#fff",
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  show: { transform: "translateX(0)" },
  success: { backgroundColor: "#10b981" },
  error: { backgroundColor: "#ef4444" },
};

export default function Login({email, setEmail}) {
  const navigate = useNavigate();
  const [_variable_email, set_variable_email] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setNotification(null);

    try {
      const response = await fetch("http://localhost:8080/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ _variable_email, password, rememberMe: remember }),
      });
      const data = await response.json();
      

      if (response.ok) {
        setNotification({ type: "success", message: "Login successful!" });
        // Store _variable_email in localStorage 
        set_variable_email(_variable_email);
        localStorage.setItem("email", _variable_email);
     
        setTimeout(() => {
          navigate("/main");
        }, 1000);
      } else {
        setNotification({
          type: "error",
          message: data.message || "Login failed. Please check your credentials.",
        });
      }
    } catch {
      setNotification({
        type: "error",
        message: "Something went wrong. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  return (
    <div className="page-container" style={{ fontFamily: "Poppins, sans-serif" }}>
      <div className="background-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
        <div className="shape shape-4"></div>
      </div>

      <div className="login-container">
        <div className="logo">
          <FaIcons.FaHome />
          <span>HomeManager</span>
        </div>

        <h2>Welcome Back</h2>
        <p className="subtitle">Log in to your account to continue</p>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <div className="input-icon">
              <FaIcons.FaEnvelope />
            </div>
            <input
              type="_variable_email"
              id="_variable_email"
              name="_variable_email"
              placeholder="Email Address"
              required
              value={_variable_email}
              onChange={(e) => set_variable_email(e.target.value)}
              autoComplete="username"
              className="input"
            />
          </div>

          <div className="input-group">
            <div className="input-icon">
              <FaIcons.FaLock />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              className="input"
            />
            <div
              className="toggle-password"
              style={{ cursor: "pointer" }}
              onClick={() => setShowPassword((v) => !v)}
              tabIndex={0}
              aria-label="Toggle password visibility"
            >
              {showPassword ? <FaIcons.FaEyeSlash /> : <FaIcons.FaEye />}
            </div>
          </div>

          <div className="options-row">
            <label className="remember-me">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              <span className="checkmark"></span>
              Remember me
            </label>
            <a href="#" className="forgot-password">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="login-button"
            disabled={loading}
          >
            {loading ? (
              <>
                <span
                  className="spinner"
                  style={{
                    width: 18,
                    height: 18,
                    border: "2px solid rgba(255,255,255,0.3)",
                    borderRadius: "50%",
                    borderTopColor: "#fff",
                    animation: "spin 0.8s linear infinite",
                    marginRight: 10,
                    display: "inline-block",
                  }}
                ></span>
                <span>Logging in...</span>
              </>
            ) : (
              <>
                <span>Login</span>
                <FaIcons.FaArrowRight />
              </>
            )}
          </button>
        </form>

        <p className="register-link">
          Don't have an account? <Link to="/register">Register here</Link>
        </p>

         <p className="register-link">
          Maintenance Worker? <Link to="/Worker_login">Login here</Link>
        </p>
      </div>

      {/* Notification */}
      {notification && (
        <div
          className="notification"
          style={{
            ...notificationStyles.base,
            ...(notification.type === "success"
              ? notificationStyles.success
              : notificationStyles.error),
            ...(notification ? notificationStyles.show : {}),
          }}
        >
          {notification.type === "success" ? (
            <FaIcons.FaCheckCircle />
          ) : (
            <FaIcons.FaExclamationCircle />
          )}
          <span>{notification.message}</span>
        </div>
      )}

      {/* Spinner keyframes and all styles */}
      <style>
        {`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
          :root {
            --primary-color: #4f46e5;
            --primary-light: #6366f1;
            --primary-dark: #3730a3;
            --background: #f5f7ff;
            --card-bg: rgba(255, 255, 255, 0.9);
            --text-dark: #1f2937;
            --text-light: #6b7280;
            --white: #ffffff;
            --border-color: #e5e7eb;
            --shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
            --gradient-start: #4f46e5;
            --gradient-end: #10b981;
          }

          {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          body {
            font-family: 'Poppins', sans-serif;
            background-color: var(--background);
            color: var(--text-dark);
            min-height: 100vh;
            line-height: 1.5;
          }

          .page-container {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2rem;
    position: relative;
    overflow: hidden;
}

/* Background Shapes Animation */
.background-shapes {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    pointer-events: none;
    z-index: -1;
}

.shape {
    position: absolute;
    border-radius: 50%;
    animation: float 15s ease-in-out infinite;
}

.shape-1 {
    width: 300px;
    height: 300px;
    top: -100px;
    right: -100px;
    background: linear-gradient(to bottom right, var(--primary-light), var(--primary-dark));
    opacity: 0.3;
}

.shape-2 {
    width: 200px;
    height: 200px;
    bottom: -80px;
    left: -80px;
    background: linear-gradient(to top right, #10b981, #3b82f6);
    opacity: 0.2;
    animation-delay: 3s;
}

.shape-3 {
    width: 150px;
    height: 150px;
    top: 40%;
    right: 10%;
    background: linear-gradient(to top left, #f97316, #ec4899);
    opacity: 0.1;
    animation-delay: 1s;
}

.shape-4 {
    width: 180px;
    height: 180px;
    top: 60%;
    left: 10%;
    background: linear-gradient(to bottom left, #a855f7, #3b82f6);
    opacity: 0.1;
    animation-delay: 4s;
}

@keyframes float {
    0% {
        transform: translate(0, 0) rotate(0deg);
    }
    25% {
        transform: translate(10px, -10px) rotate(5deg);
    }
    50% {
        transform: translate(0, 15px) rotate(0deg);
    }
    75% {
        transform: translate(-10px, -5px) rotate(-5deg);
    }
    100% {
        transform: translate(0, 0) rotate(0deg);
    }
}

/* Login Container */
.login-container {
    background: var(--card-bg);
    width: 100%;
    max-width: 450px;
    padding: 2.5rem;
    border-radius: 16px;
    box-shadow: var(--shadow);
    backdrop-filter: blur(10px);
    animation: fadeIn 0.8s ease-in-out forwards;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Logo */
.logo {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1.5rem;
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--primary-color);
}

.logo i {
    font-size: 1.8rem;
    margin-right: 0.5rem;
}

/* Headers */
h2 {
    font-size: 1.8rem;
    font-weight: 600;
    text-align: center;
    margin-bottom: 0.5rem;
}

.subtitle {
    text-align: center;
    color: var(--text-light);
    margin-bottom: 2rem;
}

/* Form Elements */
form {
    margin-top: 1.5rem;
}

.input-group {
    position: relative;
    margin-bottom: 1.5rem;
}

.input-icon {
    position: absolute;
    top: 50%;
    left: 15px;
    transform: translateY(-50%);
    color: var(--text-light);
}

.toggle-password {
    position: absolute;
    top: 50%;
    right: 15px;
    transform: translateY(-50%);
    color: var(--text-light);
    cursor: pointer;
    transition: all 0.3s ease;
}

.toggle-password:hover {
    color: var(--primary-color);
}

input {
    width: 100%;
    padding: 12px 15px 12px 45px;
    border: 1px solid var(--border-color);
    border-radius: 50px;
    font-family: 'Poppins', sans-serif;
    font-size: 1rem;
    transition: all 0.3s ease;
}

input:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.2);
}

input::placeholder {
    color: #adb5bd;
}

/* Checkbox Styling */
.options-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
}

.remember-me {
    display: flex;
    align-items: center;
    cursor: pointer;
    font-size: 0.9rem;
    color: var(--text-light);
}

.remember-me input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
}

.checkmark {
    height: 18px;
    width: 18px;
    background-color: var(--white);
    border: 1px solid var(--border-color);
    border-radius: 4px;
    margin-right: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
}

.remember-me:hover .checkmark {
    border-color: var(--primary-color);
}

.remember-me input:checked ~ .checkmark {
    background-color: var(--primary-color);
    border-color: var(--primary-color);
}

.checkmark:after {
    content: '';
    position: absolute;
    display: none;
    width: 5px;
    height: 10px;
    border: solid white;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
}

.remember-me input:checked ~ .checkmark:after {
    display: block;
}

.forgot-password {
    color: var(--primary-color);
    font-size: 0.9rem;
    text-decoration: none;
    transition: all 0.3s ease;
}

.forgot-password:hover {
    text-decoration: underline;
}

/* Button Styling */
.login-button {
    width: 100%;
    padding: 12px;
    background: linear-gradient(to right, var(--gradient-start), var(--gradient-end));
    color: var(--white);
    border: none;
    border-radius: 50px;
    font-family: 'Poppins', sans-serif;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.3s ease;
    overflow: hidden;
    position: relative;
}

.login-button span {
    z-index: 1;
    transition: all 0.3s ease;
}

.login-button i {
    margin-left: 8px;
    z-index: 1;
    transition: all 0.3s ease;
    opacity: 0;
    transform: translateX(-10px);
}

.login-button:hover i {
    opacity: 1;
    transform: translateX(0);
}

.login-button:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 15px rgba(79, 70, 229, 0.3);
}

.login-button:active {
    transform: translateY(0);
}

/* Divider */
.divider {
    display: flex;
    align-items: center;
    text-align: center;
    margin: 1.5rem 0;
}

.divider::before,
.divider::after {
    content: '';
    flex: 1;
    border-bottom: 1px solid var(--border-color);
}

.divider span {
    padding: 0 10px;
    color: var(--text-light);
    font-size: 0.9rem;
}

/* Social Login */
.social-login {
    margin-bottom: 1.5rem;
}

.social-btn {
    width: 100%;
    padding: 12px;
    background: var(--white);
    border: 1px solid var(--border-color);
    border-radius: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'Poppins', sans-serif;
    font-size: 0.9rem;
    color: var(--text-dark);
    cursor: pointer;
    transition: all 0.3s ease;
}

.social-btn i {
    margin-right: 10px;
    font-size: 1.2rem;
}

.social-btn.google i {
    color: #DB4437;
}

.social-btn:hover {
    background-color: #f8f9fa;
    transform: translateY(-2px);
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
}

/* Register Link */
.register-link {
    text-align: center;
    font-size: 0.9rem;
    color: var(--text-light);
}

.register-link a {
    color: var(--primary-color);
    font-weight: 500;
    text-decoration: none;
    transition: all 0.3s ease;
}

.register-link a:hover {
    text-decoration: underline;
}

/* Responsive Styles */
@media screen and (max-width: 500px) {
    .login-container {
        padding: 2rem;
    }
    
    h2 {
        font-size: 1.6rem;
    }
    
    .options-row {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.75rem;
    }
}
        `}
      </style>
    </div>
  );
};

Login.propTypes = {
  email: PropTypes.string.isRequired,
  setEmail: PropTypes.func.isRequired,
};