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
  Form1: [55, 59, 61, 50, 67, 70, 64, 58, 60, 56, 69, 63],
  Form2: [59, 63, 66, 53, 70, 73, 68, 62, 65, 61, 72, 67],
  Sumativa: [65, 68, 71, 58, 74, 77, 72, 66, 70, 67, 76, 71],
};

// Drill-down por competencia (simulado)
const pruebasPorComp: Record<string, Record<string, number[]>> = {
  "Matemáticas": {
    Diag: pruebasPorCorte.Diag.map((v) => Math.max(0, v - 2)),
    Form1: pruebasPorCorte.Form1.map((v) => Math.max(0, v - 1)),
    Form2: pruebasPorCorte.Form2,
    Sumativa: pruebasPorCorte.Sumativa.map((v) => Math.min(100, v + 1)),
  },
  "Lenguaje": {
    Diag: pruebasPorCorte.Diag.map((v) => Math.min(100, v + 1)),
    Form1: pruebasPorCorte.Form1,
    Form2: pruebasPorCorte.Form2.map((v) => Math.min(100, v + 2)),
    Sumativa: pruebasPorCorte.Sumativa.map((v) => Math.min(100, v + 3)),
  },
};

// Asistencia mensual (solo estudiantes, sin docentes)
const asistencia = [
  { mes: "Ene", estudiantes: 92 },
  { mes: "Feb", estudiantes: 91 },
  { mes: "Mar", estudiantes: 90 },
  { mes: "Abr", estudiantes: 91 },
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
  { id: "ST001", nombre: "Juan Pérez", genero: "M", municipio: "Medellín", ies: "IES Andes", asistenciaProm: 93, matematicas: 62, lenguaje: 70 },
  { id: "ST002", nombre: "María López", genero: "F", municipio: "Medellín", ies: "IES Andes", asistenciaProm: 95, matematicas: 74, lenguaje: 78 },
  { id: "ST003", nombre: "Carlos Ruiz", genero: "M", municipio: "Envigado", ies: "IES Pacífico", asistenciaProm: 90, matematicas: 58, lenguaje: 65 },
  { id: "ST004", nombre: "Laura Gómez", genero: "F", municipio: "Bello", ies: "IES Sabana", asistenciaProm: 92, matematicas: 71, lenguaje: 80 },
  { id: "ST005", nombre: "Andrés Mejía", genero: "M", municipio: "Envigado", ies: "IES Pacífico", asistenciaProm: 88, matematicas: 55, lenguaje: 60 },
  { id: "ST006", nombre: "Sofía Restrepo", genero: "F", municipio: "Bello", ies: "IES Sabana", asistenciaProm: 96, matematicas: 76, lenguaje: 82 },
];

// Asistencia por estudiante en actividades (clases u otras)
const asistenciaEstudiantes = [
  { id: "ST001", estudiante: "Juan Pérez", ies: "IES Andes", municipio: "Medellín", genero: "M", fecha: "2025-03-10", actividad: "Clase", competencia: "Matemáticas", asistio: true, observacion: "" },
  { id: "ST002", estudiante: "María López", ies: "IES Andes", municipio: "Medellín", genero: "F", fecha: "2025-03-12", actividad: "Taller", competencia: "Lenguaje", asistio: true, observacion: "Llegó tarde" },
  { id: "ST003", estudiante: "Carlos Ruiz", ies: "IES Pacífico", municipio: "Envigado", genero: "M", fecha: "2025-03-15", actividad: "Clase", competencia: "-", asistio: false, observacion: "Excusa médica" },
  { id: "ST004", estudiante: "Laura Gómez", ies: "IES Sabana", municipio: "Bello", genero: "F", fecha: "2025-03-18", actividad: "Extracurricular", competencia: "Socioemocional", asistio: true, observacion: "" },
  { id: "ST005", estudiante: "Andrés Mejía", ies: "IES Pacífico", municipio: "Envigado", genero: "M", fecha: "2025-04-01", actividad: "Clase", competencia: "Matemáticas", asistio: true, observacion: "" },
  { id: "ST006", estudiante: "Sofía Restrepo", ies: "IES Sabana", municipio: "Bello", genero: "F", fecha: "2025-04-03", actividad: "Taller", competencia: "Lenguaje", asistio: true, observacion: "" },
];

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
  const [competenciaFilter, setCompetenciaFilter] = useState<string>('todas');

  // Filtros globales (visibles en todas las secciones)
  const [periodo, setPeriodo] = useState<string>("2025-02");
  const [fechaInicio, setFechaInicio] = useState<string>("2025-01-01");
  const [fechaActual, setFechaActual] = useState<string>("2025-08-17");
  const [iesFiltro, setIesFiltro] = useState<string>("Todas");
  const [municipioFiltro, setMunicipioFiltro] = useState<string>("Todos");
  const [generoFiltro, setGeneroFiltro] = useState<string>("Todos");

  // Filtros específicos de Estudiantes
  const [evalFiltro, setEvalFiltro] = useState<string>("Sumativa");
  const [compFiltro, setCompFiltro] = useState<string>("Matemáticas");

  // Estado gráfico evaluaciones (drill-down)
  const [modoEvalChart, setModoEvalChart] = useState<"global" | "competencia">("global");
  const [compChart, setCompChart] = useState<string>("Matemáticas");

  // Filtros locales para asistencia por estudiante
  const [tipoActividad, setTipoActividad] = useState<string>("Todas");
  const [compAsis, setCompAsis] = useState<string>("Todas");

  const cortes = Object.keys(pruebasPorCorte);
  const seriePromedio = cortes.map((c) => ({ corte: c, promedio: mean(pruebasPorCorte[c]) }));
  const serieMediana = cortes.map((c) => ({ corte: c, mediana: median(pruebasPorCorte[c]) }));
  const ultima = evalFiltro; // usar filtro elegido

  // Histograma simple de la evaluación seleccionada
  const histAgg = useMemo(() => {
    const arr = pruebasPorCorte[ultima] || [];
    const bins: Record<string, number> = {};
    arr.forEach((v) => {
      const low = Math.floor(v / 10) * 10;
      const label = `${low}-${low + 9}`;
      bins[label] = (bins[label] || 0) + 1;
    });
    return Object.entries(bins).map(([rango, conteo]) => ({ rango, conteo }));
  }, [ultima]);

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
      const puntajeBase = compFiltro === "Matemáticas" ? e.matematicas : e.lenguaje;
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
        sub1: compFiltro === "Matemáticas" ? "Álgebra" : "Comprensión",
        sub2: compFiltro === "Matemáticas" ? "Datos" : "Producción",
        descripcion: `Evaluación ${evalFiltro} – ${compFiltro}`,
        fecha: evalFiltro === "Diag" ? "2025-02-10" : evalFiltro === "Form1" ? "2025-04-15" : evalFiltro === "Form2" ? "2025-06-15" : "2025-11-20",
      };
    });
  }, [estudiantesFiltrados, compFiltro, evalFiltro, cortes]);

  // Filtrado de asistencia por estudiante (actividades)
  const asisFiltrada = useMemo(() => {
    return asistenciaEstudiantes.filter((r) =>
      (iesFiltro === "Todas" || r.ies === iesFiltro) &&
      (municipioFiltro === "Todos" || r.municipio === municipioFiltro) &&
      (generoFiltro === "Todos" || r.genero === generoFiltro) &&
      (tipoActividad === "Todas" || r.actividad === tipoActividad) &&
      (compAsis === "Todas" || r.competencia === compAsis)
    );
  }, [iesFiltro, municipioFiltro, generoFiltro, tipoActividad, compAsis]);

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

          {/* Competencia Filter */}
          <div className="flex items-center gap-2">
            <label className="text-sm text-[#4a5570]/70">Competencia:</label>
            <Select value={competenciaFilter} onValueChange={setCompetenciaFilter}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="relative z-[9999] bg-white shadow-lg border">
                <SelectItem value="todas">Todas las competencias</SelectItem>
                <SelectItem value="matematicas">Matemáticas</SelectItem>
                <SelectItem value="lenguaje">Lenguaje</SelectItem>
                <SelectItem value="ciencias-naturales">Ciencias Naturales</SelectItem>
                <SelectItem value="ciencias-sociales">Ciencias Sociales</SelectItem>
                <SelectItem value="socioemocional">Socioemocional</SelectItem>
                <SelectItem value="ingles">Inglés</SelectItem>
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
          {/* Filtros específicos: Evaluación / Competencia (visibles cerca de la sección) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="space-y-1">
              <label className="text-xs text-[#4a5570]/70">Evaluación (sección Estudiantes)</label>
              <Select value={evalFiltro} onValueChange={setEvalFiltro}>
                <SelectTrigger className="w-full"><SelectValue placeholder="Evaluación" /></SelectTrigger>
                <SelectContent>
                  {cortes.map((c) => (<SelectItem key={c} value={c}>{c}</SelectItem>))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <label className="text-xs text-[#4a5570]/70">Competencia (para tablas)</label>
              <Select value={compFiltro} onValueChange={setCompFiltro}>
                <SelectTrigger className="w-full"><SelectValue placeholder="Competencia" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Matemáticas">Matemáticas</SelectItem>
                  <SelectItem value="Lenguaje">Lenguaje</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Sección: Evaluaciones */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="rounded-2xl lg:col-span-2">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-[#4a5570]">Evaluaciones – Promedio y Mediana</CardTitle>
                    <CardDescription>Por corte {modoEvalChart === "competencia" ? `· ${compChart}` : "· Global"}</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Select value={modoEvalChart} onValueChange={(v:any)=>setModoEvalChart(v)}>
                      <SelectTrigger className="w-40"><SelectValue placeholder="Modo" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="global">Global</SelectItem>
                        <SelectItem value="competencia">Por competencia</SelectItem>
                      </SelectContent>
                    </Select>
                    {modoEvalChart === "competencia" && (
                      <Select value={compChart} onValueChange={setCompChart}>
                        <SelectTrigger className="w-40"><SelectValue placeholder="Competencia" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Matemáticas">Matemáticas</SelectItem>
                          <SelectItem value="Lenguaje">Lenguaje</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  {modoEvalChart === "global" ? (
                    <LineChart data={cortes.map((c, i) => ({ corte: c, promedio: seriePromedio[i].promedio, mediana: serieMediana[i].mediana }))}>
                      <XAxis dataKey="corte" stroke={PRIMARY} />
                      <YAxis stroke={PRIMARY} />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="promedio" stroke={PRIMARY} name="Promedio" />
                      <Line type="monotone" dataKey="mediana" stroke="#6c738a" name="Mediana" />
                    </LineChart>
                  ) : (
                    <LineChart data={cortes.map((c) => ({ corte: c, promedio: mean(pruebasPorComp[compChart][c]), mediana: median(pruebasPorComp[compChart][c]) }))}>
                      <XAxis dataKey="corte" stroke={PRIMARY} />
                      <YAxis stroke={PRIMARY} />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="promedio" stroke={PRIMARY} name={`Promedio ${compChart}`} />
                      <Line type="monotone" dataKey="mediana" stroke="#6c738a" name={`Mediana ${compChart}`} />
                    </LineChart>
                  )}
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="rounded-2xl">
              <CardHeader>
                <CardTitle className="text-[#4a5570]">Distribución – {ultima}</CardTitle>
                <CardDescription>Bins de 10 puntos</CardDescription>
              </CardHeader>
              <CardContent className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={histAgg}>
                    <XAxis dataKey="rango" stroke={PRIMARY} />
                    <YAxis stroke={PRIMARY} />
                    <Tooltip />
                    <Bar dataKey="conteo" fill={PRIMARY} radius={[6,6,0,0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Tabla: Estudiantes (promedios y componentes) */}
          <Card className="rounded-2xl">
            <CardHeader>
              <div>
                <CardTitle className="text-[#4a5570]">Resumen por estudiante</CardTitle>
                <CardDescription>Asistencia promedio y puntajes por componente</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Estudiante</TableHead>
                    <TableHead>IES</TableHead>
                    <TableHead>Municipio</TableHead>
                    <TableHead>Género</TableHead>
                    <TableHead>Asistencia %</TableHead>
                    <TableHead>Matemáticas</TableHead>
                    <TableHead>Lenguaje</TableHead>
                    <TableHead>Puntaje Global</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {estudiantesFiltrados.map((e) => (
                    <TableRow key={e.id}>
                      <TableCell>{e.nombre}</TableCell>
                      <TableCell>{e.ies}</TableCell>
                      <TableCell>{e.municipio}</TableCell>
                      <TableCell>{e.genero}</TableCell>
                      <TableCell>{e.asistenciaProm}</TableCell>
                      <TableCell>{e.matematicas}</TableCell>
                      <TableCell>{e.lenguaje}</TableCell>
                      <TableCell>{Math.round((e.matematicas + e.lenguaje)/2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Tabla: Detalle por evaluación/competencia */}
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle className="text-[#4a5570]">Detalle por estudiante – {compFiltro} / {evalFiltro}</CardTitle>
              <CardDescription>Número de preguntas, correctas, puntaje y subcompetencias</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Estudiante</TableHead>
                    <TableHead>IES</TableHead>
                    <TableHead>Municipio</TableHead>
                    <TableHead>Género</TableHead>
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
                  {detalleEvaluacion.map((r) => (
                    <TableRow key={`${r.id}-${r.evaluacion}-${r.competencia}`}>
                      <TableCell>{r.estudiante}</TableCell>
                      <TableCell>{r.ies}</TableCell>
                      <TableCell>{r.municipio}</TableCell>
                      <TableCell>{r.genero}</TableCell>
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

          {/* Sección: Asistencia mensual (solo estudiantes) */}
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle className="text-[#4a5570]">Asistencia mensual</CardTitle>
              <CardDescription>Estudiantes</CardDescription>
            </CardHeader>
            <CardContent className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={asistencia}>
                  <XAxis dataKey="mes" stroke={PRIMARY} />
                  <YAxis stroke={PRIMARY} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="estudiantes" name="Estudiantes" stroke={PRIMARY} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Nueva tabla: Asistencia por estudiante (actividades) */}
          <Card className="rounded-2xl">
            <CardHeader>
              <div>
                <CardTitle className="text-[#4a5570]">Asistencia por estudiante (actividades)</CardTitle>
                <CardDescription>Clases y otras actividades · Competencia relacionada</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Estudiante</TableHead>
                    <TableHead>IES</TableHead>
                    <TableHead>Municipio</TableHead>
                    <TableHead>Género</TableHead>
                    <TableHead>Actividad</TableHead>
                    <TableHead>Competencia relacionada</TableHead>
                    <TableHead>Asistió</TableHead>
                    <TableHead>Observación</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {asisFiltrada.map((r, idx) => (
                    <TableRow key={`${r.id}-${idx}`}>
                      <TableCell>{r.fecha}</TableCell>
                      <TableCell>{r.estudiante}</TableCell>
                      <TableCell>{r.ies}</TableCell>
                      <TableCell>{r.municipio}</TableCell>
                      <TableCell>{r.genero}</TableCell>
                      <TableCell>{r.actividad}</TableCell>
                      <TableCell>{r.competencia}</TableCell>
                      <TableCell>{r.asistio ? "Sí" : "No"}</TableCell>
                      <TableCell>{r.observacion}</TableCell>
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
