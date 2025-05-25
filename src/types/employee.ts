type EmployeeCreate = {
  nameEmployee: string
  address: string
  city: string
  phoneNumber: string
  entryDate: string
  retirementDate: string
  isRetired: boolean
  baseSalary: number
  email: string
  password: string
  cesantias: Cesantias
  pension: Pension
  riskLevel: RiskLevel
  ccf: CCF
  arl: ARL
  area: AREA
  eps: EPS
  roll: roll
  schedule: string
}
type roll = {
  rollEmployee: RollEmployee
  permissions: PermissionsEmployee[]
}
type user = {
  email: string,
  password: string
}
type PermissionsEmployee = {
  permissions: Permisions[]
  objeto: Objeto
}
type Cesantias = {
  PROVENIR: "PORVENIR",
  COLFONDOS: "COLFONDOS",
  FNA: "FNA",
  PROTECCION: "PROTECCION"
}
type Pension = {
  COLPENSIONES: "COLPENSIONES",
  PORVENIR: "PROVENIR",
  PROTECCION: "PROTECCION"
}
type RiskLevel = {
  LEVEL_I: "LEVEL_I",
  LEVEL_II: "LEVEL_II",
  LEVEL_III: "LEVEL_III",
  LEVEL_IV: "LEVEL_IV",
  LEVEL_V: "LEVEL_V"
}

export type CCF = {
  COMFENALCO_QUINDIO: "COMFENALCO_QUINDIO",
  COMFENALCO_ANTIOQUIA: "COMFENALCO_ANTIOQUIA",
  COMFAMA: "COMFAMA",
  CAFAM: "CAFAM"
}

type ARL = {
  SURA: "SURA",
  POSITIVA: "POSITIVA",
  SEGUROS_BOLIVA: "SEGUROS_BOLIVA"
}
type AREA = {
  KITCHEN: "KITCHEN",
  WAREHOUSE: "WAREHOUSE",
  SALES: "SALES"
}
type EPS = {
  SALUD_TOTAL: "SALUD_TOTAL",
  NUEVA_EPS: "NUEVA_EPS",
  SURA: "SURA",
  SANITAS: "SANITAS",
}

type PayrollConcept = {
  BONUS_AND_COMMISSIONS: "BONUS_AND_COMMISSIONS",
  DAYTIME_OVERTIME_HOURS: "DAYTIME_OVERTIME_HOURS",
  NIGHTTIME_OVERTIME_HOURS: "NIGHTTIME_OVERTIME_HOURS",
  SUNDAY_OVERTIME_HOURS: "SUNDAY_OVERTIME_HOURS",
  SUNDAY_NIGHTTIME_OVERTIME_HOURS: "SUNDAY_NIGHTTIME_OVERTIME_HOURS",
  DEDUCTION: "DEDUCTION",
  LEAVE_WITHOUT_PAY: "LEAVE_WITHOUT_PAY",
  VACATION_PAY: "VACATION_PAY",
  INCAPACITY: "INCAPACITY",
  TRANSPORTATION_ALLOWANCE: "TRANSPORTATION_ALLOWANCE",
  PRIMA: "PRIMA",
  CESANTIAS: "CESANTIAS",
  ARL: "ARL",
  EPS: "EPS",
  PENSION: "PENSION",
  CCF: "CCF",
}

type Objeto = {
  OB_PRODUCT: "OB_PRODUCT",
  OB_RECETA: "OB_RECETA"
}

type Permisions = {
  CREAR: "CREAR",
  ELIMINAR: "ELIMINAR",
  CONSULTAR: "CONSULTAR",
  EDITAR: "EDITAR"
}

type RollEmployee = {
  KITCHENEMPLOYEE: "KITCHENEMPLOYEE",
  CASHIEREMPLOYE: "CASHIEREMPLOYE",
  WAREHOUSEEMPLOYEE: "WAREHOUSEEMPLOYEE"
}
type DayOfWeek = {
  MONDAY: "MONDAY",
  TUESDAY: "TUESDAY",
  WEDNESDAY: "WEDNESDAY",
  THURSDAY: "THURSDAY",
  FRIDAY: "FRIDAY",
  SATURDAY: "SATURDAY",
  SUNDAY: "SUNDAY"
}

type Hora = {
  startTime: string // formato "HH:mm"
  endTime: string   // formato "HH:mm"
}

type Employee = {
  id: string
  nameEmployee: string
  address: string
  city: string
  phoneNumber: string
  entryDate: string
  retirementDate: string
  isRetired: boolean
  baseSalary: number
  email: string
  password: string
  cesantias: Cesantias
  pension: Pension
  riskLevel: RiskLevel
  ccf: CCF
  arl: ARL
  area: AREA
  eps: EPS
  roll: roll
  schedule: string
}
export type { EmployeeCreate, user, Employee, Hora, DayOfWeek }
export type { Cesantias, Pension, RiskLevel, ARL, AREA, EPS, PayrollConcept, Permisions, RollEmployee, Objeto }
