export interface Actividad {
  ID_ACTIVIDAD: string;
  TIPO_ACTIVIDAD: number;
  NOMBRE_ACTIVIDAD: string;
  DESC_ACTIVIDAD: string;
  ID_TIPO_DOCUMENTO_RESPONSABLE: number;
  NUM_DOCUMENTO_RESPONSABLE: string;
  FECHA_INICIO: Date;
  FECHA_FIN: Date;
  ID_PLAN_ACCION: string;
}

export interface TipoActividad {
  id: number;
  nombre: string;
  categoria: string;
}

export const TIPOS_ACTIVIDAD: TipoActividad[] = [
  // Diagnóstico y Evaluación
  { id: 1, nombre: "Diagnóstico", categoria: "Diagnóstico y Evaluación" },
  { id: 17, nombre: "Tipos de evaluación: Diagnóstico – inicial", categoria: "Diagnóstico y Evaluación" },
  { id: 18, nombre: "Tipos de evaluación: Formativa – intermedia", categoria: "Diagnóstico y Evaluación" },
  { id: 19, nombre: "Tipos de evaluación: Acumulada – final", categoria: "Diagnóstico y Evaluación" },
  { id: 16, nombre: "Evaluar en los estudiantes: desempeño académico, permanencia, motivación", categoria: "Diagnóstico y Evaluación" },
  
  // Fortalecimiento Académico
  { id: 2, nombre: "Ajuste planes de estudio", categoria: "Fortalecimiento Académico" },
  { id: 3, nombre: "Ajuste/diseño y provisión de material de estudio", categoria: "Fortalecimiento Académico" },
  { id: 4, nombre: "Fortalecimiento pedagógico del equipo docente", categoria: "Fortalecimiento Académico" },
  { id: 14, nombre: "Fortalecimiento del currículo de educación media en competencias homologables", categoria: "Fortalecimiento Académico" },
  
  // Formación Estudiantil
  { id: 5, nombre: "Formación de estudiantes", categoria: "Formación Estudiantil" },
  { id: 13, nombre: "Oferta de cursos del currículo genérico de programas universitarios", categoria: "Formación Estudiantil" },
  { id: 15, nombre: "Estrategia de inducción a la vida universitaria", categoria: "Formación Estudiantil" },
  
  // Seguimiento y Monitoreo
  { id: 6, nombre: "Seguimiento y recolección de evidencias de aprendizaje", categoria: "Seguimiento y Monitoreo" },
  { id: 10, nombre: "Seguimiento y divulgación", categoria: "Seguimiento y Monitoreo" },
  
  // Fortalecimiento Institucional
  { id: 8, nombre: "Fortalecimiento de capacidades de la IEM", categoria: "Fortalecimiento Institucional" },
  { id: 12, nombre: "Diseño y ejecución de estrategia de participación", categoria: "Fortalecimiento Institucional" },
  
  // Bienestar Estudiantil
  { id: 20, nombre: "Jornadas de bienestar", categoria: "Bienestar Estudiantil" },
  { id: 21, nombre: "Servicios integrales de bienestar", categoria: "Bienestar Estudiantil" },
  
  // Soporte y Acuerdos IES-IEM
  { id: 22, nombre: "Soporte formal: Administrar espacios", categoria: "Soporte y Acuerdos" },
  { id: 23, nombre: "Soporte formal: Financiar costos operativos", categoria: "Soporte y Acuerdos" },
  { id: 24, nombre: "Soporte formal: Adecuaciones y dotaciones", categoria: "Soporte y Acuerdos" },
  { id: 25, nombre: "Soporte formal: Bienestar y permanencia", categoria: "Soporte y Acuerdos" },
  { id: 26, nombre: "Soporte formal: Ingreso y reducción de barreras de acceso", categoria: "Soporte y Acuerdos" }
];

export interface TipoDocumento {
  id: number;
  nombre: string;
}

export interface PlanAccion {
  id: string;
  nombre: string;
}

export interface ActividadFormData {
  tipoActividad: number;
  nombreActividad: string;
  descripcionActividad: string;
  tipoDocumentoResponsable: number;
  numeroDocumentoResponsable: string;
  fechaInicio: Date;
  fechaFin: Date;
  planAccion: string;
}

// Estados para el formulario
export interface FormState {
  isValid: boolean;
  errors: Record<string, string>;
}
