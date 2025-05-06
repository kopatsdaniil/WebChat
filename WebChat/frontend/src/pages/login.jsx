import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../css/login.css";

export default function LoginApp({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Пожалуйста, введите имя пользователя!");
      return;
    }

    try {
      const loginResponse = await fetch("https://webchatbajmitos.runasp.net/api/v1/users/login", {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: email, password }),
      });

      if (!loginResponse.ok) {
        setError("Ошибка: неверный логин или пароль!");
        return;
      }

      const usersResponse = await fetch("https://webchatbajmitos.runasp.net/api/v1/users", { mode: "cors" });
      if (!usersResponse.ok) {
        setError("Ошибка загрузки пользователей!");
        return;
      }

      const usersData = await usersResponse.json();

      const currentUser = usersData.find((user) => user.username === email);
      if (!currentUser) {
        setError("Ошибка: не удалось получить данные.");
        return;
      }

      localStorage.setItem("currentUserId", currentUser.id);
      onLogin();
      navigate("/chat");
    } catch (err) {
      console.error("Ошибка запроса:", err);
      setError("Ошибка подключения к серверу!");
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <div className="login-footer">
          <p>Нет аккаунта?</p>
          <Link to="/register">
            <button type="button" className="register-btn">
              Зарегистрироваться
            </button>
          </Link>
        </div>
        <h2>Авторизация</h2>

        <label htmlFor="email">Login</label>
        <input
          type="text"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Введите логин"
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Введите пароль"
        />
        <button type="submit">Войти</button>

        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
}
