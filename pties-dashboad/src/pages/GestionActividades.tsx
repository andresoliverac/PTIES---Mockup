import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Plus, Search, Filter, Calendar, User, FileText, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import FormularioActividad from "../components/actividades/FormularioActividad";
import ListaActividades from "../components/actividades/ListaActividades";
import { Actividad, TIPOS_ACTIVIDAD } from "../types/actividad";

export default function GestionActividades() {
  const [actividades, setActividades] = useState<Actividad[]>([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [busqueda, setBusqueda] = useState("");
  const [filtroCategoria, setFiltroCategoria] = useState<string>("todas");

  // Datos mockup realistas
  useEffect(() => {
    const actividadesEjemplo: Actividad[] = [
      {
        ID_ACTIVIDAD: "ACT-2025-001",
        TIPO_ACTIVIDAD: 1,
        NOMBRE_ACTIVIDAD: "Diagnóstico Inicial de Competencias Socioemocionales",
        DESC_ACTIVIDAD: "Evaluación diagnóstica para identificar el nivel inicial de competencias socioemocionales en estudiantes de grado 10 y 11, utilizando instrumentos validados y entrevistas grupales.",
        ID_TIPO_DOCUMENTO_RESPONSABLE: 1,
        NUM_DOCUMENTO_RESPONSABLE: "1234567890",
        FECHA_INICIO: new Date("2025-08-20"),
        FECHA_FIN: new Date("2025-09-05"),
        ID_PLAN_ACCION: "PLAN-DIAG-2025"
      },
      {
        ID_ACTIVIDAD: "ACT-2025-002",
        TIPO_ACTIVIDAD: 17,
        NOMBRE_ACTIVIDAD: "Evaluación Diagnóstica de Matemáticas y Lenguaje",
        DESC_ACTIVIDAD: "Aplicación de pruebas estandarizadas para medir el nivel académico inicial en matemáticas y lenguaje de los estudiantes participantes del programa PTIES.",
        ID_TIPO_DOCUMENTO_RESPONSABLE: 1,
        NUM_DOCUMENTO_RESPONSABLE: "9876543210",
        FECHA_INICIO: new Date("2025-09-01"),
        FECHA_FIN: new Date("2025-09-15"),
        ID_PLAN_ACCION: "PLAN-EVAL-2025"
      },
      {
        ID_ACTIVIDAD: "ACT-2025-003",
        TIPO_ACTIVIDAD: 4,
        NOMBRE_ACTIVIDAD: "Taller de Fortalecimiento Pedagógico para Docentes",
        DESC_ACTIVIDAD: "Capacitación dirigida al equipo docente de las IEM en metodologías activas de aprendizaje, uso de TIC en el aula y estrategias de evaluación formativa.",
        ID_TIPO_DOCUMENTO_RESPONSABLE: 1,
        NUM_DOCUMENTO_RESPONSABLE: "1122334455",
        FECHA_INICIO: new Date("2025-09-10"),
        FECHA_FIN: new Date("2025-09-25"),
        ID_PLAN_ACCION: "PLAN-DOCENTE-2025"
      },
      {
        ID_ACTIVIDAD: "ACT-2025-004",
        TIPO_ACTIVIDAD: 15,
        NOMBRE_ACTIVIDAD: "Programa de Inducción a la Vida Universitaria",
        DESC_ACTIVIDAD: "Jornadas de orientación para familiarizar a los estudiantes con las dinámicas universitarias, incluyendo visitas a campus, charlas con estudiantes universitarios y talleres de hábitos de estudio.",
        ID_TIPO_DOCUMENTO_RESPONSABLE: 1,
        NUM_DOCUMENTO_RESPONSABLE: "5566778899",
        FECHA_INICIO: new Date("2025-10-01"),
        FECHA_FIN: new Date("2025-10-20"),
        ID_PLAN_ACCION: "PLAN-INDUCCION-2025"
      },
      {
        ID_ACTIVIDAD: "ACT-2025-005",
        TIPO_ACTIVIDAD: 13,
        NOMBRE_ACTIVIDAD: "Curso de Prerrequisitos en Cálculo Diferencial",
        DESC_ACTIVIDAD: "Oferta de curso universitario de prerrequisitos en matemáticas (cálculo diferencial) para estudiantes de grado 11, con posibilidad de homologación posterior.",
        ID_TIPO_DOCUMENTO_RESPONSABLE: 1,
        NUM_DOCUMENTO_RESPONSABLE: "7788990011",
        FECHA_INICIO: new Date("2025-08-25"),
        FECHA_FIN: new Date("2025-12-15"),
        ID_PLAN_ACCION: "PLAN-ACADEMICO-2025"
      },
      {
        ID_ACTIVIDAD: "ACT-2025-006",
        TIPO_ACTIVIDAD: 20,
        NOMBRE_ACTIVIDAD: "Jornada de Bienestar: Manejo del Estrés Académico",
        DESC_ACTIVIDAD: "Actividades grupales enfocadas en técnicas de relajación, mindfulness y estrategias para el manejo del estrés académico dirigidas a estudiantes del programa.",
        ID_TIPO_DOCUMENTO_RESPONSABLE: 1,
        NUM_DOCUMENTO_RESPONSABLE: "3344556677",
        FECHA_INICIO: new Date("2025-09-20"),
        FECHA_FIN: new Date("2025-09-21"),
        ID_PLAN_ACCION: "PLAN-BIENESTAR-2025"
      },
      {
        ID_ACTIVIDAD: "ACT-2025-007",
        TIPO_ACTIVIDAD: 2,
        NOMBRE_ACTIVIDAD: "Ajuste Curricular en Ciencias Naturales",
        DESC_ACTIVIDAD: "Revisión y ajuste del plan de estudios de ciencias naturales de grado 11 para incluir contenidos de química orgánica que faciliten la transición a programas universitarios de ingeniería.",
        ID_TIPO_DOCUMENTO_RESPONSABLE: 1,
        NUM_DOCUMENTO_RESPONSABLE: "2233445566",
        FECHA_INICIO: new Date("2025-08-15"),
        FECHA_FIN: new Date("2025-11-30"),
        ID_PLAN_ACCION: "PLAN-CURRICULO-2025"
      },
      {
        ID_ACTIVIDAD: "ACT-2025-008",
        TIPO_ACTIVIDAD: 6,
        NOMBRE_ACTIVIDAD: "Recolección de Evidencias de Aprendizaje Trimestre 1",
        DESC_ACTIVIDAD: "Sistematización y análisis de evidencias de aprendizaje de estudiantes participantes, incluyendo portafolios digitales, proyectos colaborativos y autoevaluaciones.",
        ID_TIPO_DOCUMENTO_RESPONSABLE: 1,
        NUM_DOCUMENTO_RESPONSABLE: "4455667788",
        FECHA_INICIO: new Date("2025-10-15"),
        FECHA_FIN: new Date("2025-10-30"),
        ID_PLAN_ACCION: "PLAN-SEGUIMIENTO-2025"
      },
      {
        ID_ACTIVIDAD: "ACT-2025-009",
        TIPO_ACTIVIDAD: 22,
        NOMBRE_ACTIVIDAD: "Acuerdo de Administración de Laboratorios",
        DESC_ACTIVIDAD: "Formalización del acuerdo entre IES y IEM para la administración conjunta de laboratorios de ciencias, incluyendo protocolos de uso, mantenimiento y supervisión.",
        ID_TIPO_DOCUMENTO_RESPONSABLE: 1,
        NUM_DOCUMENTO_RESPONSABLE: "6677889900",
        FECHA_INICIO: new Date("2025-09-05"),
        FECHA_FIN: new Date("2025-09-30"),
        ID_PLAN_ACCION: "PLAN-INFRAESTRUCTURA-2025"
      },
      {
        ID_ACTIVIDAD: "ACT-2025-010",
        TIPO_ACTIVIDAD: 18,
        NOMBRE_ACTIVIDAD: "Evaluación Formativa de Competencias Ciudadanas",
        DESC_ACTIVIDAD: "Evaluación intermedia del desarrollo de competencias ciudadanas y participación democrática en estudiantes, mediante simulacros de participación ciudadana y análisis de casos.",
        ID_TIPO_DOCUMENTO_RESPONSABLE: 1,
        NUM_DOCUMENTO_RESPONSABLE: "8899001122",
        FECHA_INICIO: new Date("2025-11-01"),
        FECHA_FIN: new Date("2025-11-15"),
        ID_PLAN_ACCION: "PLAN-CIUDADANIA-2025"
      }
    ];
    setActividades(actividadesEjemplo);
  }, []);

  const handleNuevaActividad = (nuevaActividad: Actividad) => {
    setActividades([...actividades, nuevaActividad]);
    setMostrarFormulario(false);
  };

  // Obtener categorías únicas para el filtro
  const categorias = Array.from(new Set(TIPOS_ACTIVIDAD.map(tipo => tipo.categoria)));

  const actividadesFiltradas = actividades.filter(actividad => {
    const coincideBusqueda = actividad.NOMBRE_ACTIVIDAD.toLowerCase().includes(busqueda.toLowerCase()) ||
                           actividad.DESC_ACTIVIDAD.toLowerCase().includes(busqueda.toLowerCase());
    
    let coincideCategoria = true;
    if (filtroCategoria !== "todas") {
      const tipoActividad = TIPOS_ACTIVIDAD.find(tipo => tipo.id === actividad.TIPO_ACTIVIDAD);
      coincideCategoria = tipoActividad?.categoria === filtroCategoria;
    }
    
    return coincideBusqueda && coincideCategoria;
  });

  if (mostrarFormulario) {
    return (
      <FormularioActividad
        onGuardar={handleNuevaActividad}
        onCancelar={() => setMostrarFormulario(false)}
      />
    );
  }

  return (
    <div className="min-h-screen w-full p-6 md:p-10 space-y-8 bg-[#f6f6f6] text-[#4a5570]">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-4">
          <Link to="/ies-landing">
            <Button variant="outline" className="rounded-2xl border-[#4a5570] text-[#4a5570]">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-[#4a5570]">Gestión de Actividades</h1>
            <p className="text-[#4a5570]/70 mt-2">Administra las actividades del programa PTIES</p>
          </div>
        </div>
        <Button
          onClick={() => setMostrarFormulario(true)}
          className="bg-[#4a5570] hover:bg-[#3a4560] text-white rounded-2xl px-6 py-3 flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Nueva Actividad
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="rounded-2xl">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-[#4a5570]">Total Actividades</CardTitle>
              <Calendar className="w-5 h-5 text-[#4a5570]/60" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#4a5570]">{actividades.length}</div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-[#4a5570]">En Progreso</CardTitle>
              <FileText className="w-5 h-5 text-[#4a5570]/60" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#4a5570]">
              {actividades.filter(a => new Date() >= a.FECHA_INICIO && new Date() <= a.FECHA_FIN).length}
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-[#4a5570]">Completadas</CardTitle>
              <User className="w-5 h-5 text-[#4a5570]/60" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#4a5570]">
              {actividades.filter(a => new Date() > a.FECHA_FIN).length}
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-[#4a5570]">Próximas</CardTitle>
              <Calendar className="w-5 h-5 text-[#4a5570]/60" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#4a5570]">
              {actividades.filter(a => new Date() < a.FECHA_INICIO).length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros y Búsqueda */}
      <Card className="rounded-2xl">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-[#4a5570]/50" />
                <Input
                  placeholder="Buscar actividades..."
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  className="pl-10 rounded-2xl border-[#4a5570]/20"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <Select value={filtroCategoria} onValueChange={setFiltroCategoria}>
                <SelectTrigger className="w-64 rounded-2xl">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Filtrar por categoría" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todas">Todas las categorías</SelectItem>
                  {categorias.map((categoria) => (
                    <SelectItem key={categoria} value={categoria}>
                      {categoria}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Actividades */}
      <ListaActividades actividades={actividadesFiltradas} />
    </div>
  );
}
