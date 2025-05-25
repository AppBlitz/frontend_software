import React from "react";
import MonthManagement from "../../components/payroll_components/combobox/month";
import UpdateTypeManagement from "../../components/payroll_components/combobox/updateType";
import Navbar from "../../components/generics/navbar";

const Test: React.FC = () => {
  const tabs = [
    { label: "Home", url: "/sales/home" },
    { label: "invoice details", url: "/sales/invoice/details/" },
    { label: "invoice list", url: "/sales/invoice/list" },
  ];



  return (
    <div>
      <Navbar
        leftLabel="Mi Título"
        topLabel="Etiqueta Superior"
        tabs={tabs} userId={""} token={""} userRole={""} />
      <MonthManagement />

      <UpdateTypeManagement />
    </div>
  );
};

export default Test;
