import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Progress } from "../components/ui/progress";
import { AlertCircle, Calendar, Map as MapIcon, FileText, Activity, School, Users, Building, AlertTriangle, TrendingUp, ClipboardList } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import ColombiaMap, { type BubbleMetric } from "../components/ColombiaMap";

// --- Dummy data ---
const kpis = [
  { label: "Estudiantes", value: 480, icon: Users },
  { label: "Colegios (IEM)", value: 20, icon: School },
  { label: "Regiones/Municipios", value: 5, icon: MapIcon },
  { label: "IES", value: 26, icon: Building },
  { label: "Personal IES", value: 20, icon: Activity },
];

const asistenciaData = [
  { grupo: "Estudiantes", pct: 86 },
  { grupo: "Profesores", pct: 79 },
  { grupo: "Familiares", pct: 62 },
];

const actividadesData = [
  { mes: "2025-01", total: 820, cumplidas: 610 },
  { mes: "2025-02", total: 900, cumplidas: 700 },
  { mes: "2025-03", total: 940, cumplidas: 720 },
];

const competenciasData = [
  { corte: "Diag", socioemo: 48, matem: 45, lenguaje: 47 },
  { corte: "Form1", socioemo: 56, matem: 52, lenguaje: 55 },
  { corte: "Form2", socioemo: 61, matem: 58, lenguaje: 59 },
];

const iesCompliance = [
  { ies: "IES Andes", entregables: 12, entregados: 9, asistencia: 84, estado: "En línea" },
  { ies: "IES Pacífico", entregables: 12, entregados: 7, asistencia: 72, estado: "Riesgo" },
  { ies: "IES Sabana", entregables: 12, entregados: 12, asistencia: 91, estado: "OK" },
  { ies: "IES Llanos", entregables: 12, entregados: 6, asistencia: 65, estado: "Crítico" },
];

const bienestarData = [
  { servicio: "Psicológico", pct: 31 },
  { servicio: "Mentorías", pct: 44 },
  { servicio: "Deporte", pct: 52 },
  { servicio: "Cultura", pct: 28 },
];

const alerts = [
  { level: "alto", text: "IES Llanos: 50% de entregables vencidos." },
  { level: "medio", text: "Municipio 12: asistencia familiar < 40%." },
  { level: "bajo", text: "IES Pacífico: retraso en plan de bienestar." },
];

export function pct(n: number, d: number) {
  return d === 0 ? 0 : Math.round((n / d) * 100);
}

export default function MENDashboard() {
  const [bubbleMetric, setBubbleMetric] = useState<BubbleMetric>('students');
  const [sexFilter, setSexFilter] = useState<string>('todos');
  const [regionFilter, setRegionFilter] = useState<string>('todas');
  const [periodoFilter, setPeriodoFilter] = useState<string>('2025-02');
  const [fechaInicio, setFechaInicio] = useState<string>('2025-01-01');
  
  const totalAct = actividadesData[actividadesData.length - 1]?.total ?? 0;
  const cumplidasAct = actividadesData[actividadesData.length - 1]?.cumplidas ?? 0;
  const pctAct = pct(cumplidasAct, totalAct);

  const totEntregables = iesCompliance.reduce((s, r) => s + r.entregables, 0);
  const totEntregados = iesCompliance.reduce((s, r) => s + r.entregados, 0);
  const pctEntregables = pct(totEntregados, totEntregables);

  // Apply filters to data (for demonstration purposes)
  const getFilteredValue = (baseValue: number) => {
    let multiplier = 1;
    
    // Apply sex filter adjustment
    if (sexFilter === 'masculino') {
      multiplier *= 0.52; // Assume 52% male
    } else if (sexFilter === 'femenino') {
      multiplier *= 0.48; // Assume 48% female
    }
    
    // Apply region filter adjustment
    if (regionFilter !== 'todas') {
      multiplier *= 0.7; // Simulate filtered region data
    }
    
    return Math.round(baseValue * multiplier);
  };

  return (
    <div className="min-h-screen w-full p-6 md:p-10 space-y-6 bg-[#f6f6f6] text-[#4a5570]">
      {/* Header with Title */}
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">PTIES – MEN Dashboard Global </h1>
        <p className="text-sm text-[#4a5570]/70">Visión global del programa, riesgos y resultados. (Ejemplo UI)</p>
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
        </div>
      </div>

      {/* KPIs + Alertas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-4">
        {kpis.map(({ label, value, icon: Icon }) => (
          <Card key={label} className="rounded-2xl shadow-sm">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-medium text-[#4a5570]">{label}</CardTitle>
                <Icon className="w-5 h-5 text-[#4a5570]/60" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold text-[#4a5570]">
                {getFilteredValue(value).toLocaleString()}
              </div>
              {(sexFilter !== 'todos' || regionFilter !== 'todas') && (
                <div className="text-xs text-[#4a5570]/50 mt-1">
                  Original: {value.toLocaleString()}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
        {/* Alertas */}
        <Card className="rounded-2xl shadow-sm col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium text-[#4a5570]">Alertas tempranas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {alerts.map((a, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-[#4a5570]">
                {a.level === "alto" && <AlertTriangle className="w-4 h-4 mt-0.5 text-red-600" />}
                {a.level === "medio" && <AlertCircle className="w-4 h-4 mt-0.5 text-amber-600" />}
                {a.level === "bajo" && <AlertCircle className="w-4 h-4 mt-0.5 text-neutral-500" />}
                <p>{a.text}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Col 1 */}
        <div className="space-y-6">
          <Card className="rounded-2xl h-80">
            <CardHeader>
              <CardTitle className="text-[#4a5570]">Asistencia</CardTitle>
              <CardDescription className="text-[#4a5570]/70">% por grupo</CardDescription>
            </CardHeader>
            <CardContent className="h-56">
              <div className="h-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={asistenciaData}>
                    <XAxis dataKey="grupo" stroke="#4a5570" />
                    <YAxis stroke="#4a5570" />
                    <Tooltip />
                    <Bar dataKey="pct" fill="#4a5570" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl h-80">
            <CardHeader>
              <CardTitle className="text-[#4a5570]">Actividades hasta fecha</CardTitle>
              <CardDescription className="text-[#4a5570]/70">Total vs. cumplidas</CardDescription>
            </CardHeader>
            <CardContent className="h-56">
              <div className="space-y-3 mb-3">
                <div className="flex items-center justify-between text-sm">
                  <span>Total: <strong>{totalAct}</strong></span>
                  <span>Cumplidas: <strong>{cumplidasAct}</strong></span>
                  <span>Avance: <strong>{pctAct}%</strong></span>
                </div>
                <Progress value={pctAct} className="h-3 rounded-full bg-[#4a5570]/20" />
              </div>
              <div className="h-36">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={actividadesData}>
                    <XAxis dataKey="mes" stroke="#4a5570" />
                    <YAxis stroke="#4a5570" />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="total" stroke="#4a5570" />
                    <Line type="monotone" dataKey="cumplidas" stroke="#3a455e" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Col 2 */}
        <div className="space-y-6">
          <Card className="rounded-2xl h-80">
            <CardHeader>
              <CardTitle className="text-[#4a5570]">Impacto en Aprendizajes</CardTitle>
              <CardDescription className="text-[#4a5570]/70">Diagnóstico vs. Formativas vs. Sumativa</CardDescription>
            </CardHeader>
            <CardContent className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={competenciasData}>
                  <XAxis dataKey="corte" stroke="#4a5570" />
                  <YAxis stroke="#4a5570" />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="socioemo" name="Socioemocional" stroke="#4a5570" />
                  <Line type="monotone" dataKey="matem" name="Matemáticas" stroke="#3a455e" />
                  <Line type="monotone" dataKey="lenguaje" name="Lenguaje" stroke="#6c738a" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="rounded-2xl h-80">
            <CardHeader>
              <CardTitle className="text-[#4a5570]">Bienestar estudiantil</CardTitle>
              <CardDescription className="text-[#4a5570]/70">Acceso a servicios (%)</CardDescription>
            </CardHeader>
            <CardContent className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={bienestarData}>
                  <XAxis dataKey="servicio" stroke="#4a5570" />
                  <YAxis stroke="#4a5570" />
                  <Tooltip />
                  <Bar dataKey="pct" fill="#4a5570" radius={[6,6,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Col 3 */}
        <div className="space-y-6">
          <Card className="rounded-2xl h-[41rem]">
            <CardHeader>
              <CardTitle className="text-[#4a5570]">Cumplimiento IES</CardTitle>
              <CardDescription className="text-[#4a5570]/70">Entregables y asistencia</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 h-[36rem] flex flex-col">
              <div className="flex items-center justify-between text-sm">
                <span>Total entregables: <strong>{totEntregables}</strong></span>
                <span>Entregados: <strong>{totEntregados}</strong></span>
                <span>Avance: <strong>{pctEntregables}%</strong></span>
              </div>
              <Progress value={pctEntregables} className="h-3 rounded-full bg-[#4a5570]/20" />
              <div className="flex-1 overflow-auto border rounded-xl">
                <table className="w-full text-sm">
                  <thead className="sticky top-0 bg-white">
                    <tr className="text-left text-[#4a5570]">
                      <th className="p-2">IES</th>
                      <th className="p-2">Entregables</th>
                      <th className="p-2">Entregados</th>
                      <th className="p-2">Asistencia</th>
                      <th className="p-2">Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {iesCompliance.map((r) => (
                      <tr key={r.ies} className="border-t">
                        <td className="p-2 font-medium">{r.ies}</td>
                        <td className="p-2">{r.entregables}</td>
                        <td className="p-2">{r.entregados}</td>
                        <td className="p-2">{r.asistencia}%</td>
                        <td className="p-2">
                          <Badge variant="outline" className={
                            r.estado === "Crítico" ? "border-red-400 text-red-600" :
                            r.estado === "Riesgo" ? "border-amber-400 text-amber-600" :
                            "border-emerald-400 text-emerald-600"
                          }>{r.estado}</Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Second row: mapa detalle */}
      <div className="grid grid-cols-1 gap-6">
        <Card className="rounded-2xl">
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 relative z-50">
              <div>
                <CardTitle className="text-[#4a5570]">Mapa por municipio - Colombia</CardTitle>
                <CardDescription>Progreso por región con indicadores visuales (interactivo)</CardDescription>
              </div>
              <div className="flex items-center gap-2 relative z-50">
                <label className="text-sm font-medium text-[#4a5570]">Tamaño de burbuja:</label>
                <div className="relative z-50">
                  <Select value={bubbleMetric} onValueChange={(value: BubbleMetric) => setBubbleMetric(value)}>
                    <SelectTrigger className="w-48 relative z-50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="relative z-[9999] bg-white shadow-lg border">
                      <SelectItem value="students">Número de Estudiantes</SelectItem>
                      <SelectItem value="schools">Número de Colegios</SelectItem>
                      <SelectItem value="avgScore">Puntaje Promedio</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-96 w-full rounded-xl overflow-hidden border bg-gray-50 relative z-10">
              <ColombiaMap bubbleMetric={bubbleMetric} />
            </div>
            <div className="mt-4 flex justify-between items-center">
              <div className="text-sm text-[#4a5570]/70">
                Haz clic en los marcadores para ver información detallada de cada región
              </div>
              <div className="text-xs text-[#4a5570]/70 font-medium">
                Tamaño de burbuja basado en: {
                  bubbleMetric === 'students' ? 'Número de Estudiantes' :
                  bubbleMetric === 'schools' ? 'Número de Colegios' :
                  'Puntaje Promedio de Evaluaciones'
                }
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer actions */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <div className="text-xs text-[#4a5570]/70">Este es un wireframe funcional: estructura, jerarquía visual y componentes base.</div>
        <div className="flex gap-2">
          <Button variant="secondary" className="rounded-2xl border text-[#4a5570] border-[#4a5570]">
            <ClipboardList className="w-4 h-4 mr-1" /> Exportar CSV
          </Button>
          <Button className="rounded-2xl bg-[#4a5570] text-white">
            <TrendingUp className="w-4 h-4 mr-1" /> Ver detalle por IES
          </Button>
        </div>
      </div>
    </div>
  );
}
