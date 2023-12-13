export type Tardis = {
    id: string;
    camuflaje: string;
    regeneracion: number;
    anoActual: number;
    dimensiones: Dimension[];
  }
  
  export type Dimension = {
    id: string;
    nombre: string;
    planetas: Planeta[];
  };
  
  export type Planeta = {
    id: string;
    nombre: string;
    personas: Persona[];
  };
  
  export type Persona = {
    nombre: string;
    id: string;
  };

