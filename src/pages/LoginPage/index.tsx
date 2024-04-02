import { NavLink } from "react-router-dom";
import { useState } from "react";
import { AdminPage } from "../AdminPage";


export const LoginPage = () => {
  const [form, setForm] = useState({    
    email: "",
    password: "",
  });

  const [answer, setAnswer] = useState(3);

  const url = "http://localhost:7070/logins";  

  const checkLogin = async (email: string, password: string) => {
    const login = {
      email,
      password,
    };
    const response = await fetch(url, {
      method: "PUT",
      body: JSON.stringify(login),
    });

    const result = await response.json();
    console.log(result);
    result ? setAnswer(1) : setAnswer(2);     
  };

  const onAddLoginHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitLoginHandler = (e: React.FormEvent<HTMLFormElement>) => {
    
    e.preventDefault();
    checkLogin(form.email, form.password);
    setForm({ email: "", password: "" });
    console.log(answer);
  };

  return (
    <>
    {answer === 1 ? (<AdminPage/> ) : (
    
      <div className="login-contaiter">
      <nav className="admin">
        <NavLink to="/"><button className="admin-enter">Выход</button></NavLink>
      </nav>
      <header className="login__header">
        <h1 className="page-header__title">
          Идём<span>в</span>кино
        </h1>
        <span className="page-header__subtitle">Администраторррская</span>
      </header>

      <main>
        <section className="login">
          <header className="login__header">
            <h2 className="login__title">Авторизация</h2>
          </header>
          {answer === 2 && (
          <div>Неверный логин или пароль</div>
        )}          
          <div className="login__wrapper">
            <form
              className="login__form"              
              method="POST"
              accept-charset="utf-8"
              onSubmit={onSubmitLoginHandler}
            >
              <label className="login__label">
                E-mail
                <input
                  className="login__input"
                  type="email"
                  placeholder="example@domain.xyz"
                  name="email"
                  onChange={onAddLoginHandler}
                  required
                />
              </label>
              <label className="login__label">
                Пароль
                <input
                  className="login__input"
                  type="password"
                  placeholder=""
                  name="password"
                  onChange={onAddLoginHandler}
                  required
                />
              </label>
              <div className="text-center">
                <input
                  value="Авторизоваться"
                  type="submit"
                  className="login__button"
                />
              </div>
            </form>
          </div>
        </section>
      </main>
    </div>
    )}
    
    </> 
    
  );
};
