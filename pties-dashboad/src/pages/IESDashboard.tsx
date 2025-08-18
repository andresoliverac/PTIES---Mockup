import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Users, School, FileText, AlertTriangle, AlertCircle, ClipboardList, Calendar } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";

// ------------------ Utils ------------------
function mean(arr: number[]): number {
  if (!arr.length) return 0;
  const m = arr.reduce((s, n) => s + n, 0) / arr.length;
  return Math.round(m * 100) / 100;
}
function median(arr: number[]): number {
  if (!arr.length) return 0;
  const s = [...arr].sort((a, b) => a - b);
  const mid = Math.floor(s.length / 2);
  const v = s.length % 2 ? s[mid] : (s[mid - 1] + s[mid]) / 2;
  return Math.round(v * 100) / 100;
}
function pct(n: number, d: number): number { return d === 0 ? 0 : Math.round((n / d) * 100); }

// ------------------ Dummy data (replace with API) ------------------
const PRIMARY = "#4a5570";

// Color palette for competencias
const COMPETENCIA_COLORS = {
  "Matemáticas": "#4a5570", // Blue
  "Lenguaje": "#2c3e50", // Dark blue/black
  "Socio-emocional": "#27ae60", // Green
};

const kpisIES = [
  { label: "Estudiantes", value: 1200, icon: Users },
  { label: "Colegios Apadrinados", value: 20, icon: School },
  { label: "% Entregables", value: 76, icon: ClipboardList },
];

const colegios = [
  { codigo: "IEM001", nombre: "Colegio San José", sede: "Principal", municipio: "Medellín", estudiantes: 230, n10: 115, n11: 115, ninhas: 120, ninos: 110, direccion: "Calle Falsa 123", contacto: "rector@iem001.edu.co" },
  { codigo: "IEM002", nombre: "Colegio Santa María", sede: "Sur", municipio: "Envigado", estudiantes: 180, n10: 90, n11: 90, ninhas: 90, ninos: 90, direccion: "Cra 45 #12-34", contacto: "rector@iem002.edu.co" },
  { codigo: "IEM003", nombre: "Colegio Central", sede: "Norte", municipio: "Bello", estudiantes: 150, n10: 75, n11: 75, ninhas: 70, ninos: 80, direccion: "Av. 30 #20-10", contacto: "rector@iem003.edu.co" },
];

// Estudiantes – resultados por corte (scores 0–100)
const pruebasPorCorte: Record<string, number[]> = {
  Diag: [48, 52, 55, 41, 60, 66, 58, 49, 53, 45, 62, 57],
  Eval1: [55, 59, 61, 50, 67, 70, 64, 58, 60, 56, 69, 63],
  Eval2: [59, 63, 66, 53, 70, 73, 68, 62, 65, 61, 72, 67],
};

// Drill-down por competencia (simulado)
const pruebasPorComp: Record<string, Record<string, number[]>> = {
  "Matemáticas": {
    Diag: pruebasPorCorte.Diag.map((v) => Math.max(0, v - 2)),
    Eval1: pruebasPorCorte.Eval1.map((v) => Math.max(0, v - 1)),
    Eval2: pruebasPorCorte.Eval2,
  },
  "Lenguaje": {
    Diag: pruebasPorCorte.Diag.map((v) => Math.min(100, v + 1)),
    Eval1: pruebasPorCorte.Eval1,
    Eval2: pruebasPorCorte.Eval2.map((v) => Math.min(100, v + 2)),
  },
  "Socio-emocional": {
    Diag: pruebasPorCorte.Diag.map((v) => Math.max(0, v - 3)),
    Eval1: pruebasPorCorte.Eval1.map((v) => Math.max(0, v - 2)),
    Eval2: pruebasPorCorte.Eval2.map((v) => Math.min(100, v - 1)),
  },
};

// Asistencia mensual por competencia
const asistencia = [
  { mes: "Ene", matematicas: 94, lenguaje: 90, socioemocional: 88 },
  { mes: "Feb", matematicas: 93, lenguaje: 89, socioemocional: 87 },
  { mes: "Mar", matematicas: 91, lenguaje: 89, socioemocional: 85 },
  { mes: "Abr", matematicas: 92, lenguaje: 90, socioemocional: 86 },
];

// Docentes (pestaña Docentes permanece)
const docentes = [
  { nombre: "Ana Pérez", area: "Matemáticas", capacitaciones: 3, completitud: 80 },
  { nombre: "Luis Gómez", area: "Lenguaje", capacitaciones: 2, completitud: 60 },
  { nombre: "Marta Ríos", area: "Socioemocional", capacitaciones: 4, completitud: 100 },
];

const entregables = [
  { nombre: "Plan de trabajo acordado", estado: "Entregado", fecha: "2025-01-20" },
  { nombre: "Diagnóstico estudiantes (base)", estado: "Entregado", fecha: "2025-02-15" },
  { nombre: "Informe parcial docentes – Q1", estado: "Pendiente", fecha: "2025-06-30" },
];

const bienestar = [
  { servicio: "Psicológico", cobertura: 35 },
  { servicio: "Mentorías", cobertura: 48 },
  { servicio: "Deporte", cobertura: 55 },
  { servicio: "Cultura", cobertura: 30 },
];

const alertas = [
  { level: "alto", text: "IEM003: asistencia estudiantes < 85% en marzo." },
  { level: "medio", text: "IEM002: retraso en entrega de Informe Q1." },
  { level: "bajo", text: "IEM001: baja participación familiar en talleres." },
];

// Datos de estudiantes para tablas
const estudiantesBase = [
  { id: "ST001", nombre: "Juan Pérez", genero: "M", municipio: "Medellín", ies: "IES Andes", asistenciaProm: 93, matematicas: 62, lenguaje: 70, socioemocional: 58 },
  { id: "ST002", nombre: "María López", genero: "F", municipio: "Medellín", ies: "IES Andes", asistenciaProm: 95, matematicas: 74, lenguaje: 78, socioemocional: 72 },
  { id: "ST003", nombre: "Carlos Ruiz", genero: "M", municipio: "Envigado", ies: "IES Pacífico", asistenciaProm: 90, matematicas: 58, lenguaje: 65, socioemocional: 55 },
  { id: "ST004", nombre: "Laura Gómez", genero: "F", municipio: "Bello", ies: "IES Sabana", asistenciaProm: 92, matematicas: 71, lenguaje: 80, socioemocional: 68 },
  { id: "ST005", nombre: "Andrés Mejía", genero: "M", municipio: "Envigado", ies: "IES Pacífico", asistenciaProm: 88, matematicas: 55, lenguaje: 60, socioemocional: 52 },
  { id: "ST006", nombre: "Sofía Restrepo", genero: "F", municipio: "Bello", ies: "IES Sabana", asistenciaProm: 96, matematicas: 76, lenguaje: 82, socioemocional: 75 },
];

// Datos de estudiantes para tablas

// ------------------ Component ------------------
export default function IESDashboard() {
  const [tab, setTab] = useState<string>("resumen");
  const [selected, setSelected] = useState<any | null>(null);

  // Global Filters (same as MEN Dashboard)
  const [periodoFilter, setPeriodoFilter] = useState<string>('2025-01');
  const [sexFilter, setSexFilter] = useState<string>('todos');
  const [regionFilter, setRegionFilter] = useState<string>('todas');
  const [iesFilter, setIesFilter] = useState<string>('todas');
  const [municipioFilter, setMunicipioFilter] = useState<string>('todos');

  // Filtros globales (visibles en todas las secciones)
  const [periodo, setPeriodo] = useState<string>("2025-02");
  const [fechaInicio, setFechaInicio] = useState<string>("2025-01-01");
  const [fechaActual, setFechaActual] = useState<string>("2025-08-17");
  const [iesFiltro, setIesFiltro] = useState<string>("Todas");
  const [municipioFiltro, setMunicipioFiltro] = useState<string>("Todos");
  const [generoFiltro, setGeneroFiltro] = useState<string>("Todos");

  // Filtros específicos de Estudiantes (fixed values since filters were removed)
  const [evalFiltro, setEvalFiltro] = useState<string>("Eval2"); // Now configurable
  const [compFiltro, setCompFiltro] = useState<string>("Matemáticas"); // Now configurable

  // Estado gráfico evaluaciones - metric selector (Promedio or Mediana)
  const [metricaEval, setMetricaEval] = useState<"promedio" | "mediana">("promedio");

  const cortes = Object.keys(pruebasPorCorte);
  const seriePromedio = cortes.map((c) => ({ corte: c, promedio: mean(pruebasPorCorte[c]) }));
  const serieMediana = cortes.map((c) => ({ corte: c, mediana: median(pruebasPorCorte[c]) }));

  // Removed histAgg and ultima variables since Distribution chart was removed

  const municipios = useMemo(() => Array.from(new Set(colegios.map((c) => c.municipio))), []);
  const iesList = ["Todas", "IES Andes", "IES Pacífico", "IES Sabana"];

  const estudiantesFiltrados = useMemo(() => {
    return estudiantesBase.filter((e) =>
      (iesFiltro === "Todas" || e.ies === iesFiltro) &&
      (municipioFiltro === "Todos" || e.municipio === municipioFiltro) &&
      (generoFiltro === "Todos" || e.genero === generoFiltro)
    );
  }, [iesFiltro, municipioFiltro, generoFiltro]);

  // Construir tabla de detalle por evaluación/competencia
  const detalleEvaluacion = useMemo(() => {
    return estudiantesFiltrados.map((e) => {
      const puntajeBase = compFiltro === "Matemáticas" ? e.matematicas : 
                         compFiltro === "Lenguaje" ? e.lenguaje :
                         e.socioemocional; // Use actual socio-emocional data
      const ajuste = cortes.indexOf(evalFiltro) * 2; // pequeño ajuste por corte
      const puntaje = Math.min(100, Math.max(0, Math.round(puntajeBase + ajuste)));
      const preguntas = 40;
      const correctas = Math.round((puntaje / 100) * preguntas);
      const erroneas = preguntas - correctas;
      return {
        id: e.id,
        estudiante: e.nombre,
        ies: e.ies,
        municipio: e.municipio,
        genero: e.genero,
        evaluacion: evalFiltro,
        competencia: compFiltro,
        preguntas,
        correctas,
        erroneas,
        puntaje,
        sub1: compFiltro === "Matemáticas" ? "Álgebra" : 
             compFiltro === "Lenguaje" ? "Comprensión" : "Autoestima",
        sub2: compFiltro === "Matemáticas" ? "Datos" : 
             compFiltro === "Lenguaje" ? "Producción" : "Colaboración",
        descripcion: `Evaluación ${evalFiltro} – ${compFiltro}`,
        fecha: "2025-06-15", // Fixed date for Eval2 evaluation
      };
    });
  }, [estudiantesFiltrados, compFiltro, evalFiltro, cortes]);

  // Agrupar datos por IE y Sede para las tablas
  const resumenPorIESede = useMemo(() => {
    const agrupados = estudiantesFiltrados.reduce((acc, estudiante) => {
      const key = `${estudiante.ies}-${estudiante.municipio}`;
      if (!acc[key]) {
        acc[key] = {
          ies: estudiante.ies,
          municipio: estudiante.municipio,
          sede: colegios.find(c => c.municipio === estudiante.municipio)?.sede || "Principal",
          estudiantes: [],
          totalEstudiantes: 0,
          asistenciaPromedio: 0,
          matematicas: 0,
          lenguaje: 0,
          socioemocional: 0
        };
      }
      acc[key].estudiantes.push(estudiante);
      return acc;
    }, {} as Record<string, any>);

    return Object.values(agrupados).map((grupo: any) => {
      const totalEstudiantes = grupo.estudiantes.length;
      const asistenciaPromedio = Math.round(grupo.estudiantes.reduce((sum: number, e: any) => sum + e.asistenciaProm, 0) / totalEstudiantes);
      const matematicas = Math.round(grupo.estudiantes.reduce((sum: number, e: any) => sum + e.matematicas, 0) / totalEstudiantes);
      const lenguaje = Math.round(grupo.estudiantes.reduce((sum: number, e: any) => sum + e.lenguaje, 0) / totalEstudiantes);
      const socioemocional = Math.round(grupo.estudiantes.reduce((sum: number, e: any) => sum + e.socioemocional, 0) / totalEstudiantes);
      
      return {
        ies: grupo.ies,
        sede: grupo.sede,
        municipio: grupo.municipio,
        totalEstudiantes,
        asistenciaPromedio,
        matematicas,
        lenguaje,
        socioemocional,
        puntajeGlobal: Math.round((matematicas + lenguaje + socioemocional) / 3)
      };
    });
  }, [estudiantesFiltrados]);

  // Agrupar detalle por evaluación/competencia por IE y Sede
  const detalleEvaluacionPorIESede = useMemo(() => {
    const agrupados = detalleEvaluacion.reduce((acc, detalle) => {
      const key = `${detalle.ies}-${detalle.municipio}`;
      if (!acc[key]) {
        acc[key] = {
          ies: detalle.ies,
          municipio: detalle.municipio,
          sede: colegios.find(c => c.municipio === detalle.municipio)?.sede || "Principal",
          detalles: []
        };
      }
      acc[key].detalles.push(detalle);
      return acc;
    }, {} as Record<string, any>);

    return Object.values(agrupados).map((grupo: any) => {
      const detalles = grupo.detalles;
      const totalEstudiantes = detalles.length;
      const preguntasPromedio = Math.round(detalles.reduce((sum: number, d: any) => sum + d.preguntas, 0) / totalEstudiantes);
      const correctasPromedio = Math.round(detalles.reduce((sum: number, d: any) => sum + d.correctas, 0) / totalEstudiantes);
      const puntajePromedio = Math.round(detalles.reduce((sum: number, d: any) => sum + d.puntaje, 0) / totalEstudiantes);
      
      return {
        ies: grupo.ies,
        sede: grupo.sede,
        municipio: grupo.municipio,
        totalEstudiantes,
        evaluacion: evalFiltro,
        competencia: compFiltro,
        preguntas: preguntasPromedio,
        correctas: correctasPromedio,
        erroneas: preguntasPromedio - correctasPromedio,
        puntaje: puntajePromedio,
        sub1: detalles[0]?.sub1 || "",
        sub2: detalles[0]?.sub2 || "",
        descripcion: `Evaluación ${evalFiltro} – ${compFiltro}`,
        fecha: detalles[0]?.fecha || "2025-06-15"
      };
    });
  }, [detalleEvaluacion, evalFiltro, compFiltro]);

  return (
    <div className="min-h-screen w-full p-6 md:p-10 space-y-6 bg-[#f6f6f6] text-[#4a5570]">
      {/* Header with Title and View Navigation */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Title Section - Half Space */}
        <div className="flex-1">
          <h1 className="text-3xl font-semibold tracking-tight">PTIES – Dashboard IES</h1>
          <p className="text-sm text-[#4a5570]/70">Resumen + secciones de detalle (Estudiantes, Docentes, Gobernanza, Bienestar, Alertas)</p>
        </div>

        {/* View Navigation - Half Space */}
        <div className="flex-1">
          <div className="flex flex-wrap gap-2 justify-start md:justify-end">
            {[
              { id: "resumen", label: "Resumen" },
              { id: "estudiantes", label: "Estudiantes" },
              { id: "docentes", label: "Docentes" },
              { id: "gobernanza", label: "Gobernanza/Entregables" },
              { id: "bienestar", label: "Bienestar" },
              { id: "alertas", label: "Alertas" },
            ].map((t) => (
              <Button key={t.id} onClick={() => setTab(t.id)} className={`rounded-2xl ${tab===t.id?"bg-[#4a5570] text-white":"bg-white border text-[#4a5570]"}`}>
                {t.label}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Global Filters */}
      <div className="bg-white rounded-2xl p-4 border border-gray-200">
        <div className="flex flex-wrap items-center gap-4">
          {/* Period Filter */}
          <div className="flex items-center gap-2">
            <label className="text-sm text-[#4a5570]/70">Periodo:</label>
            <Select value={periodoFilter} onValueChange={setPeriodoFilter}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="relative z-[9999] bg-white shadow-lg border">
                <SelectItem value="2025-01">2025-01</SelectItem>
                <SelectItem value="2025-02">2025-02</SelectItem>
                <SelectItem value="2025-03">2025-03</SelectItem>
                <SelectItem value="2025-04">2025-04</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Demographic Filters */}
          <div className="flex items-center gap-2">
            <label className="text-sm text-[#4a5570]/70">Sexo:</label>
            <Select value={sexFilter} onValueChange={setSexFilter}>
              <SelectTrigger className="w-28">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="relative z-[9999] bg-white shadow-lg border">
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="masculino">Masculino</SelectItem>
                <SelectItem value="femenino">Femenino</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center gap-2">
            <label className="text-sm text-[#4a5570]/70">Región:</label>
            <Select value={regionFilter} onValueChange={setRegionFilter}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="relative z-[9999] bg-white shadow-lg border">
                <SelectItem value="todas">Todas las regiones</SelectItem>
                <SelectItem value="andina">Región Andina</SelectItem>
                <SelectItem value="caribe">Región Caribe</SelectItem>
                <SelectItem value="pacifica">Región Pacífica</SelectItem>
                <SelectItem value="orinoquia">Región Orinoquía</SelectItem>
                <SelectItem value="amazonia">Región Amazonía</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* IES Filter */}
          <div className="flex items-center gap-2">
            <label className="text-sm text-[#4a5570]/70">IES:</label>
            <Select value={iesFilter} onValueChange={setIesFilter}>
              <SelectTrigger className="w-36">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="relative z-[9999] bg-white shadow-lg border">
                <SelectItem value="todas">Todas las IES</SelectItem>
                <SelectItem value="universidad-nacional">Universidad Nacional</SelectItem>
                <SelectItem value="universidad-antioquia">Universidad de Antioquia</SelectItem>
                <SelectItem value="universidad-valle">Universidad del Valle</SelectItem>
                <SelectItem value="universidad-javeriana">Universidad Javeriana</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Municipio Filter */}
          <div className="flex items-center gap-2">
            <label className="text-sm text-[#4a5570]/70">Municipio:</label>
            <Select value={municipioFilter} onValueChange={setMunicipioFilter}>
              <SelectTrigger className="w-36">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="relative z-[9999] bg-white shadow-lg border">
                <SelectItem value="todos">Todos los municipios</SelectItem>
                <SelectItem value="bogota">Bogotá</SelectItem>
                <SelectItem value="medellin">Medellín</SelectItem>
                <SelectItem value="cali">Cali</SelectItem>
                <SelectItem value="barranquilla">Barranquilla</SelectItem>
                <SelectItem value="cartagena">Cartagena</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* ---- RESUMEN (Landing) ---- */}
      {tab === "resumen" && (
        <div className="space-y-6">
          {/* KPIs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {kpisIES.map(({ label, value, icon: Icon }) => (
              <Card key={label} className="rounded-2xl shadow-sm">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base font-medium text-[#4a5570]">{label}</CardTitle>
                    <Icon className="w-5 h-5 text-[#4a5570]/60" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-semibold text-[#4a5570]">{value.toLocaleString()} {label.includes("%") && "%"}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Tabla de colegios */}
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle className="text-[#4a5570]">Colegios apadrinados</CardTitle>
              <CardDescription className="text-[#4a5570]/70">Listado con totales. Haz clic para ver detalle.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Código IEM</TableHead>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Sede</TableHead>
                    <TableHead>Municipio</TableHead>
                    <TableHead>Total Estudiantes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {colegios.map((c) => (
                    <TableRow key={c.codigo} onClick={() => setSelected(c)} className="cursor-pointer hover:bg-neutral-100">
                      <TableCell>{c.codigo}</TableCell>
                      <TableCell>{c.nombre}</TableCell>
                      <TableCell>{c.sede}</TableCell>
                      <TableCell>{c.municipio}</TableCell>
                      <TableCell>{c.estudiantes}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Detalle colegio (modal inline) */}
          {selected && (
            <Card className="rounded-2xl border-2 border-[#4a5570]">
              <CardHeader>
                <CardTitle className="text-[#4a5570]">Detalle {selected.nombre}</CardTitle>
                <CardDescription>Información general y planes de estudio</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div><strong>Código:</strong> {selected.codigo}</div>
                  <div><strong>Municipio:</strong> {selected.municipio}</div>
                  <div><strong>Sede:</strong> {selected.sede}</div>
                  <div><strong>Dirección:</strong> {selected.direccion}</div>
                  <div><strong>Contacto:</strong> {selected.contacto}</div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div><strong>Estudiantes 10°:</strong> {selected.n10}</div>
                  <div><strong>Estudiantes 11°:</strong> {selected.n11}</div>
                  <div><strong>Total:</strong> {selected.estudiantes}</div>
                  <div><strong>Niñas:</strong> {selected.ninhas}</div>
                  <div><strong>Niños:</strong> {selected.ninos}</div>
                </div>
                <div className="flex gap-2">
                  <Button className="rounded-2xl bg-[#4a5570] text-white"><FileText className="w-4 h-4 mr-1" /> Plan de estudio 10°</Button>
                  <Button className="rounded-2xl bg-[#4a5570] text-white"><FileText className="w-4 h-4 mr-1" /> Plan de estudio 11°</Button>
                </div>
                <div className="flex justify-end">
                  <Button variant="outline" className="rounded-2xl" onClick={() => setSelected(null)}>Cerrar</Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* ---- ESTUDIANTES ---- */}
      {tab === "estudiantes" && (
        <div className="space-y-6">
          {/* Sección: Evaluaciones */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="rounded-2xl">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-[#4a5570]">Evaluaciones por Competencia</CardTitle>
                    <CardDescription>Todas las competencias</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Select value={metricaEval} onValueChange={(v: any) => setMetricaEval(v)}>
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Métrica" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="promedio">Promedio</SelectItem>
                        <SelectItem value="mediana">Mediana</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart 
                    data={cortes.map((c) => ({
                      corte: c,
                      matematicas: metricaEval === "promedio" 
                        ? mean(pruebasPorComp["Matemáticas"][c]) 
                        : median(pruebasPorComp["Matemáticas"][c]),
                      lenguaje: metricaEval === "promedio"
                        ? mean(pruebasPorComp["Lenguaje"][c])
                        : median(pruebasPorComp["Lenguaje"][c]),
                      socioemocional: metricaEval === "promedio"
                        ? mean(pruebasPorComp["Socio-emocional"][c])
                        : median(pruebasPorComp["Socio-emocional"][c])
                    }))}
                  >
                    <XAxis dataKey="corte" stroke={PRIMARY} />
                    <YAxis stroke={PRIMARY} />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="matematicas" 
                      name="Matemáticas" 
                      stroke={COMPETENCIA_COLORS["Matemáticas"]} 
                      strokeWidth={2} 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="lenguaje" 
                      name="Lenguaje" 
                      stroke={COMPETENCIA_COLORS["Lenguaje"]} 
                      strokeWidth={2} 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="socioemocional" 
                      name="Socio-emocional" 
                      stroke={COMPETENCIA_COLORS["Socio-emocional"]} 
                      strokeWidth={2} 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="rounded-2xl">
              <CardHeader>
                <CardTitle className="text-[#4a5570]">Asistencia mensual</CardTitle>
                <CardDescription>Por competencia</CardDescription>
              </CardHeader>
              <CardContent className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={asistencia}>
                    <XAxis dataKey="mes" stroke={PRIMARY} />
                    <YAxis stroke={PRIMARY} />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="matematicas" 
                      name="Matemáticas" 
                      stroke={COMPETENCIA_COLORS["Matemáticas"]} 
                      strokeWidth={2} 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="lenguaje" 
                      name="Lenguaje" 
                      stroke={COMPETENCIA_COLORS["Lenguaje"]} 
                      strokeWidth={2} 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="socioemocional" 
                      name="Socio-emocional" 
                      stroke={COMPETENCIA_COLORS["Socio-emocional"]} 
                      strokeWidth={2} 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Tabla: Resumen por IE y Sede */}
          <Card className="rounded-2xl">
            <CardHeader>
              <div>
                <CardTitle className="text-[#4a5570]">Resumen por IE y Sede</CardTitle>
                <CardDescription>Asistencia promedio y puntajes por competencia agrupados por institución</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>IES</TableHead>
                    <TableHead>Sede</TableHead>
                    <TableHead>Municipio</TableHead>
                    <TableHead>Total Estudiantes</TableHead>
                    <TableHead>Asistencia %</TableHead>
                    <TableHead>Matemáticas</TableHead>
                    <TableHead>Lenguaje</TableHead>
                    <TableHead>Socio-emocional</TableHead>
                    <TableHead>Puntaje Global</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {resumenPorIESede.map((r, index) => (
                    <TableRow key={`${r.ies}-${r.municipio}-${index}`}>
                      <TableCell>{r.ies}</TableCell>
                      <TableCell>{r.sede}</TableCell>
                      <TableCell>{r.municipio}</TableCell>
                      <TableCell>{r.totalEstudiantes}</TableCell>
                      <TableCell>{r.asistenciaPromedio}</TableCell>
                      <TableCell>{r.matematicas}</TableCell>
                      <TableCell>{r.lenguaje}</TableCell>
                      <TableCell>{r.socioemocional}</TableCell>
                      <TableCell>{r.puntajeGlobal}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Tabla: Detalle por evaluación/competencia agrupado por IE y Sede */}
          <Card className="rounded-2xl">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-[#4a5570]">Detalle por IE y Sede – {compFiltro} / {evalFiltro}</CardTitle>
                  <CardDescription>Promedios por institución de preguntas, correctas, puntaje y subcompetencias</CardDescription>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <label className="text-sm text-[#4a5570]/70">Competencia:</label>
                    <Select value={compFiltro} onValueChange={setCompFiltro}>
                      <SelectTrigger className="w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Matemáticas">Matemáticas</SelectItem>
                        <SelectItem value="Lenguaje">Lenguaje</SelectItem>
                        <SelectItem value="Socio-emocional">Socio-emocional</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="text-sm text-[#4a5570]/70">Evaluación:</label>
                    <Select value={evalFiltro} onValueChange={setEvalFiltro}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Diag">Diagnóstico</SelectItem>
                        <SelectItem value="Eval1">Evaluación 1</SelectItem>
                        <SelectItem value="Eval2">Evaluación 2</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>IES</TableHead>
                    <TableHead>Sede</TableHead>
                    <TableHead>Municipio</TableHead>
                    <TableHead>Total Estudiantes</TableHead>
                    <TableHead>Preguntas</TableHead>
                    <TableHead>Correctas</TableHead>
                    <TableHead>Erróneas</TableHead>
                    <TableHead>Puntaje</TableHead>
                    <TableHead>Subcomp. 1</TableHead>
                    <TableHead>Subcomp. 2</TableHead>
                    <TableHead>Descripción</TableHead>
                    <TableHead>Fecha</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {detalleEvaluacionPorIESede.map((r, index) => (
                    <TableRow key={`${r.ies}-${r.municipio}-${r.evaluacion}-${r.competencia}-${index}`}>
                      <TableCell>{r.ies}</TableCell>
                      <TableCell>{r.sede}</TableCell>
                      <TableCell>{r.municipio}</TableCell>
                      <TableCell>{r.totalEstudiantes}</TableCell>
                      <TableCell>{r.preguntas}</TableCell>
                      <TableCell>{r.correctas}</TableCell>
                      <TableCell>{r.erroneas}</TableCell>
                      <TableCell>{r.puntaje}</TableCell>
                      <TableCell>{r.sub1}</TableCell>
                      <TableCell>{r.sub2}</TableCell>
                      <TableCell>{r.descripcion}</TableCell>
                      <TableCell>{r.fecha}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      )}

      {/* ---- DOCENTES ---- */}
      {tab === "docentes" && (
        <div className="space-y-6">
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle className="text-[#4a5570]">Participación y formación docente</CardTitle>
              <CardDescription>Capacitaciones realizadas y % de completitud</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Área</TableHead>
                    <TableHead>Capacitaciones</TableHead>
                    <TableHead>Completitud (%)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {docentes.map((d) => (
                    <TableRow key={d.nombre}>
                      <TableCell>{d.nombre}</TableCell>
                      <TableCell>{d.area}</TableCell>
                      <TableCell>{d.capacitaciones}</TableCell>
                      <TableCell>{d.completitud}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      )}

      {/* ---- GOBERNANZA / ENTREGABLES ---- */}
      {tab === "gobernanza" && (
        <div className="space-y-6">
          {/* Document Management Overview */}
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle className="text-[#4a5570]">Estado de Documentos</CardTitle>
              <CardDescription>Resumen del estado de documentos y entregables del programa</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-blue-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600">156</div>
                  <div className="text-sm text-blue-600">Documentos Totales</div>
                </div>
                <div className="bg-green-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">142</div>
                  <div className="text-sm text-green-600">Aprobados</div>
                </div>
                <div className="bg-amber-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-amber-600">9</div>
                  <div className="text-sm text-amber-600">En Revisión</div>
                </div>
                <div className="bg-red-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-red-600">5</div>
                  <div className="text-sm text-red-600">Pendientes</div>
                </div>
              </div>
              
              <div className="flex justify-center">
                <Link to="/gestion-documentos">
                  <Button className="bg-[#4a5570] hover:bg-[#3a4560] text-white rounded-2xl px-8 py-3">
                    <FileText className="w-5 h-5 mr-2" />
                    Ir a Gestión de Documentos
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Existing Entregables Table */}
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle className="text-[#4a5570]">Entregables</CardTitle>
              <CardDescription>Estado y fechas</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Entregable</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Fecha</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {entregables.map((e) => (
                    <TableRow key={e.nombre}>
                      <TableCell>{e.nombre}</TableCell>
                      <TableCell>
                        <Badge className={e.estado === "Pendiente" ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700"}>{e.estado}</Badge>
                      </TableCell>
                      <TableCell>{e.fecha}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      )}

      {/* ---- BIENESTAR ---- */}
      {tab === "bienestar" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle className="text-[#4a5570]">Cobertura de servicios</CardTitle>
              <CardDescription>% de estudiantes con acceso</CardDescription>
            </CardHeader>
            <CardContent className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={bienestar}>
                  <XAxis dataKey="servicio" stroke={PRIMARY} />
                  <YAxis stroke={PRIMARY} />
                  <Tooltip />
                  <Bar dataKey="cobertura" fill={PRIMARY} radius={[6,6,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle className="text-[#4a5570]">Notas</CardTitle>
              <CardDescription>Observaciones de bienestar</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <p>• Aumentar mentorías en IEM003.</p>
              <p>• Programar jornada de salud mental Q3.</p>
              <p>• Refuerzo de actividades culturales en IEM002.</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* ---- ALERTAS ---- */}
      {tab === "alertas" && (
        <div className="space-y-4">
          {alertas.map((a, i) => (
            <Card key={i} className="rounded-2xl">
              <CardContent className="flex items-start gap-3 p-4 text-sm">
                {a.level === "alto" && <AlertTriangle className="w-4 h-4 mt-0.5 text-red-600" />}
                {a.level === "medio" && <AlertCircle className="w-4 h-4 mt-0.5 text-amber-600" />}
                {a.level === "bajo" && <AlertCircle className="w-4 h-4 mt-0.5 text-neutral-500" />}
                <p>{a.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

// --- Dev tests ---
if (typeof process !== "undefined" && process.env && process.env.NODE_ENV !== "production") {
  console.assert(mean([1, 2, 3, 4]) === 2.5, "mean debería ser 2.5");
  console.assert(median([1, 2, 3, 4]) === 2.5, "median par debería ser 2.5");
  console.assert(median([1, 2, 3]) === 2, "median impar debería ser 2");
  console.assert(pct(1, 3) === 33, "pct 1/3 debe ser 33" );
}
