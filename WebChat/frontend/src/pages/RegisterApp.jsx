import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../css/login.css";

export default function RegisterApp({ onRegister }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!username.trim()) {
      setError("Пожалуйста, введите имя пользователя!");
      return;
    }

    try {
      const registerResponse = await fetch("https://webchatbajmitos.runasp.net/api/v1/users/register", {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!registerResponse.ok) {
        setError("Ошибка регистрации!");
        return;
      }

      const usersResponse = await fetch("https://webchatbajmitos.runasp.net/api/v1/users", { mode: "cors" });
      if (!usersResponse.ok) {
        setError("Ошибка загрузки пользователей!");
        return;
      }

      const usersData = await usersResponse.json();

      const currentUser = usersData.find((user) => user.username === username);
      if (!currentUser) {
        setError("Ошибка: не удалось получить данные пользователя");
        return;
      }

      localStorage.setItem("currentUserId", currentUser.id);
      onRegister();
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
          <p>Уже есть аккаунт?</p>
          <Link to="/">
            <button className="register-btn">Войти</button>
          </Link>
        </div>
        <h2>Регистрация</h2>
        <label htmlFor="username">Логин</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Введите логин"
        />
        <label htmlFor="password">Пароль</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Введите пароль"
        />
        <button type="submit">Зарегистрироваться</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
}
