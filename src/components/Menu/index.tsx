import { NavLink } from "react-router-dom";
import getDate from "../../helper";

let dateArr: string[] = getDate();

export default function Menu() {
  return (
    <>
      <nav className="admin">
        <NavLink to="/login">
          <button className="admin-enter">Вход для администратора</button>
        </NavLink>
      </nav>
      <header className="page-header">
        <h1 className="page-header__title">
          Идём<span>в</span>кино
        </h1>
      </header>
      <nav className="menu">
        <NavLink
          className={(state) =>
            state.isActive ? "menu__item menu__item-active" : "menu__item"
          }
          to="/"
        >
          {"Сегодня"}
        </NavLink>
        <NavLink
          className={(state) =>
            state.isActive ? "menu__item menu__item-active" : "menu__item"
          }
          to="/tomorrow"
        >
          {"Завтра"}
        </NavLink>
        <NavLink
          className={(state) =>
            state.isActive ? "menu__item menu__item-active" : "menu__item"
          }
          to="/3"
        >
          <div>{dateArr[2]}</div>
        </NavLink>
        <NavLink
          className={(state) =>
            state.isActive ? "menu__item menu__item-active" : "menu__item"
          }
          to="/4"
        >
          <div>{dateArr[3]}</div>
        </NavLink>
        <NavLink
          className={(state) =>
            state.isActive ? "menu__item menu__item-active" : "menu__item"
          }
          to="/5"
        >
          <div>{dateArr[4]}</div>
        </NavLink>
        <NavLink
          className={(state) =>
            state.isActive ? "menu__item menu__item-active" : "menu__item"
          }
          to="/6"
        >
          <div>{dateArr[5]}</div>
        </NavLink>
        <NavLink
          className={(state) =>
            state.isActive ? "menu__item menu__item-active" : "menu__item"
          }
          to="/7"
        >
          <div>{dateArr[6]}</div>
        </NavLink>
      </nav>
    </>
  );
}
