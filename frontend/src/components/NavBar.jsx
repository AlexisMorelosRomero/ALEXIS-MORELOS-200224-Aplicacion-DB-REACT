import { NavLink } from "react-router-dom";

export const NavBar = () => {
  return (
    <div className="w3-bar w3-teal">
      <NavLink to="/" className="w3-bar-item w3-button w3-hover-light-grey">Eliminar</NavLink>
      <NavLink to="/mostrar" className="w3-bar-item w3-button w3-hover-light-grey">Mostrar</NavLink>
      <NavLink to="/altas" className="w3-bar-item w3-button w3-hover-light-grey">Altas</NavLink>
      <NavLink to="/buscar" className="w3-bar-item w3-button w3-hover-light-grey">Buscar</NavLink>
    </div>
  );
};
