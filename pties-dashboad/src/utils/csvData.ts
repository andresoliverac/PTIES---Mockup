// CSV parsing utility for comma-separated values with robust parsing
export interface Deliverable {
  eje: string;
  estrategia: string;
  actividad: string;
  proceso: string;
  producto: string;
  entregableNum: string;
  nombreEntregable: string;
  fechaEntrega: string;
  ies: string;
  necesitaRevision: string;
  aprobado: string; // New approval column
  categoria: string; // New category column
}

// More robust CSV parser that handles quoted fields with newlines and commas
const parseCSVLine = (line: string): string[] => {
  const result = [];
  let current = '';
  let inQuotes = false;
  let i = 0;
  
  while (i < line.length) {
    const char = line[i];
    
    if (char === '"' && (i === 0 || line[i-1] === ',' || inQuotes)) {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
    i++;
  }
  
  result.push(current.trim());
  return result;
};

export const parseCSV = (csvText: string): Deliverable[] => {
  // Helper function to assign random categories
  const getRandomCategory = (): string => {
    const categories = [
      'plan-estudios',
      'plan-accion', 
      'asistencia',
      'diagnosticos',
      'evaluaciones',
      'otros'
    ];
    return categories[Math.floor(Math.random() * categories.length)];
  };

  // Handle multi-line fields by first processing line breaks within quotes
  let processedText = '';
  let inQuotes = false;
  
  for (let i = 0; i < csvText.length; i++) {
    const char = csvText[i];
    if (char === '"') {
      inQuotes = !inQuotes;
      processedText += char;
    } else if (char === '\n' && inQuotes) {
      processedText += ' '; // Replace newlines inside quotes with spaces
    } else {
      processedText += char;
    }
  }
  
  const lines = processedText.trim().split('\n');
  const headers = parseCSVLine(lines[0]);
  
  return lines.slice(1).map((line, index) => {
    const values = parseCSVLine(line);
    return {
      eje: (values[0] || '').trim(),
      estrategia: (values[1] || '').trim(),
      actividad: (values[2] || '').trim(),
      proceso: (values[3] || '').trim(),
      producto: (values[4] || '').trim(),
      entregableNum: (values[5] || '').trim(),
      nombreEntregable: (values[6] || '').trim(),
      fechaEntrega: (values[7] || '').trim(),
      ies: (values[8] || '').trim(),
      necesitaRevision: (values[9] || '').trim(),
      aprobado: (values[10] || Math.random() > 0.5 ? 'Sí' : 'No').trim(), // Random approval for demo
      categoria: getRandomCategory() // Assign random category
    };
  }).filter(deliverable => 
    // Filter out rows that have no meaningful content
    deliverable.eje || deliverable.estrategia || deliverable.nombreEntregable
  );
};

// CSV data (comma-separated with quotes)
export const csvData = `Eje,Estrategia,Actividad,Proceso,Producto,# Entregable IES,Nombre Entregable,Fecha entrega,IES,Necesita Revisión?
Alistamiento, Conformar un equipo de trabajo ,"la relación del equipo de trabajo de la IES que se encargará de implementar el PTIES con sus respectivos roles, responsabilidades y copia de las hojas de vida."," Conformar un equipo de trabajo multidisciplinario que se encargará de adelantar todas las actividades a cargo de la IES a lo largo de la implementación del PTIES ","la relación del equipo de trabajo de la IES que se encargará de implementar el PTIES con sus respectivos roles, responsabilidades y copia de las hojas de vida.",Primer entregable,"Equipo de trabajo IES, roles y responsabilidades",8-Aug-25,X,
Alistamiento, Identificar los intereses y expectativas de los estudiantes,a) Estudiantes: Diagnóstico enfocado en identificar los intereses y expectativas de los estudiantes frente a la educación posmedia,Diagnóstico ,Documento y registro en base de datos,Segundo entregable,Diagnostico intereses y expectativas,1-Sep-25,X,
Alistamiento,Identificar recursos disponibles en la IEM," b) IEM :  Diagnóstico sobre los recursos disponibles en la IEM (cuerpo docente,  infraestructura para realizar actividades de nivelación de competencias y horarios de atención de la IEM), el PEI y las dinámicas pedagógicas, en las áreas de intervención del PTIES.",Diagnóstico ,Documento,Primer entregable,Diagnostico recursos disponibles IEM,8-Aug-25,X,X
Alistamiento,Caracterización de las familias y la comunidad,"c) Relación familia – escuela – comunidad: Caracterización de las familias y la comunidad,  utilizando datos sociodemográficos,  nivel de escolaridad de padres, madres o acudientes, necesidades y percepciones frente a la formación y las trayectorias de sus hijos o jóvenes a su cargo, entre otros.",Diagnóstico - caracterización,1) Un informe que dé cuenta de las actividades desarrolladas en el marco del plan de acción para el fortalecimiento de la relación familia – escuela – comunidad. ,Segundo entregable,"c) Relación familia – escuela – comunidad: Caracterización de las familias y la comunidad,  utilizando datos sociodemográficos,  nivel de escolaridad de padres, madres o acudientes, necesidades y percepciones frente a la formación y las trayectorias de sus hijos o jóvenes a su cargo, entre otros.",1-Sep-25,X,
Alistamiento,Diagnóstico de la dinámica regional," d) Contexto socioeconómico :  Documento de diagnóstico de la dinámica regional, las vocaciones y realidades de desarrollo social de los territorios, donde se implementarán los PTIES ",Diagnóstico,Documento,Segundo entregable," d) Contexto socioeconómico :  Documento de diagnóstico de la dinámica regional, las vocaciones y realidades de desarrollo social de los territorios, donde se implementarán los PTIES ",1-Sep-25,X,
Alistamiento, Socialización ,e) Socialización de diagnósticos y plan de trabajo  ," Socialización: Una vez culminados los diagnósticos y definido el plan de trabajo, la IES deberá socializarlos con la IEM y su comunidad educativa. Deberán convenir la versión final del plan de trabajo y los equipos de la IES y la IEM que se harán cargo de llevarlo a cabo. ",Informe y registro,Segundo entregable,e) Socialización de diagnósticos y plan de trabajo  ,1-Sep-25,X,
1.    Articulación armoniosa,1.1.    Fortalecimiento de aprendizajes y competencias ,1.1.1.    Diagnóstico,Diagnóstico de competencias básicas: matemáticas,Una evaluación diagnóstica en competencias matemáticas aplicada a estudiantes beneficiarios PTIES ,Segundo entregable,Diagnóstico de competencias básicas: matemáticas,1-Sep-25,X,
1.    Articulación armoniosa,1.1.    Fortalecimiento de aprendizajes y competencias ,1.1.1.    Diagnóstico,Diagnóstico de competencias básicas: lenguaje,Una evaluación diagnóstica en competencias lenguaje aplicada a estudiantes beneficiarios PTIES ,Segundo entregable,Diagnóstico de competencias básicas: lenguaje,1-Sep-25,X,
1.    Articulación armoniosa,1.1.    Fortalecimiento de aprendizajes y competencias ,1.1.1.    Diagnóstico,Diagnóstico de competencias socioemocionales,Una evaluación diagnóstica en competencias socioemocionales aplicada a estudiantes beneficiarios PTIES ,Segundo entregable,Diagnóstico de competencias socioemocionales,1-Sep-25,X,`;
