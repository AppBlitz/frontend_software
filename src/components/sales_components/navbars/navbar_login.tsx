import React from "react";
import Navbar from "../../generics/navbar";

const Navbar_login: React.FC = () => {
  const tabs = [
    { label: "Home", url: "/" },

  ];


  return <Navbar leftLabel="Ilios" topLabel="Inicio de aplicación" userRole="" userId="" token="" tabs={tabs} />;


};

export default Navbar_login;
