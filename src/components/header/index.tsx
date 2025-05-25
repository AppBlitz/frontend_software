import { useNavigate, useLocation } from "react-router"
import React from "react"
import { Options, User } from "../button";

function Header() {
  const history = useNavigate();
  const location = useLocation().pathname;
  const [state, setState] = React.useState(0);

  React.useEffect(() => {
    switch (location) {
      case "/":
        setState(0);
        break;
      case "/home":
        setState(1);
        break;
      default:
        setState(1);
        break;
    }
  }, [location]);

  //Define el título dinámico
  const titleClick = () => {
    if (state === 0) return history("/");
    if (state === 1) return history("/home");
  };

  const title = (
    <h2
      onClick={titleClick}
      className="text-lg font-serif text-white hover:text-blue-400 mr-4 cursor-pointer"
    >
      Ilios
    </h2>
  );

  // Render dinámico del componente derecho
  let rightComponent;
  if (state === 1) {
    rightComponent = <Options />;
  } else {
    rightComponent = <User />;
  }

  return (
    <div>
      <nav className="flex justify-between items-center px-6 py-4 bg-gray-800">
        <div className="flex items-center">{title}</div>
        {rightComponent}
      </nav>
    </div>
  );
}

export { Header };
