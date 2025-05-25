import React from "react";
import Section from "../../generics/section";
import Button from "../../generics/button";


const Menu_services: React.FC = () => {
  return (
    <div>
      <Section centered>
        <div>
          <h1>Servicios del menu:</h1>
          <Button label="Ver menu" url="/sales/menu" />
          <a>     </a>
          <Button label="Ver pedidos" url="/sales/shop-cart/list" />
          <a>     </a>
          <Button label="crear orden de pedido" url="/sales/shop-cart/details" />
          <a>     </a>
        </div>
      </Section>
    </div>
  );
};

export default Menu_services;
