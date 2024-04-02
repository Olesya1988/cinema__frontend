import { NavLink } from "react-router-dom";

export default function Login() {
  return (
    <nav className="admin">
      <NavLink to="/login"><button className="admin-enter">Вход для администратора</button></NavLink>
    </nav>
  );
}
