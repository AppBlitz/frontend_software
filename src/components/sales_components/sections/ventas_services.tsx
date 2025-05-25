import React from "react";
import Section from "../../generics/section";
import Button from "../../generics/button";


const Sales_services: React.FC = () => {
  return (
    <div>
      <Section centered>
        <div>
          <h1>Servicios de venta:</h1>
          <Button label="Ver facturas" url="/sales/invoice/list" />
          <a>     </a>
          <Button label="Crear factura" url="/sales/shop-cart/list" />
          <a>     </a>
          <Button label="consultar factura" url="/sales/shop-cart/details" />
          <a>     </a>
          <Button label="Maercado pago" url="/sales/shop-cart/details" />
          <a>     </a>
          <Button label="Consultar Pedido" url="/sales/shop-cart/details" />
          <a>     </a>
        </div>
      </Section>
    </div>
  );
};

export default Sales_services;
