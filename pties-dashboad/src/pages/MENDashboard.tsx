import * as React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Progress } from "../components/ui/progress";
import { AlertCircle, Calendar, Map as MapIcon, FileText, Activity, School, Users, Building, AlertTriangle, TrendingUp, ClipboardList } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";

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

const permanenciaData = [
  { mes: "Ene", pct: 96 },
  { mes: "Feb", pct: 95 },
  { mes: "Mar", pct: 94 },
  { mes: "Abr", pct: 94 },
];

const transicionData = [
  { name: "Transitan", value: 38 },
  { name: "No Transitan", value: 62 },
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

const reports = [
  { name: "Informe parcial docentes – Q1", date: "2025-03-31" },
  { name: "Diagnóstico estudiantes (base de datos)", date: "2025-02-15" },
  { name: "Entrega plan de trabajo acordado", date: "2025-01-20" },
];

export function pct(n: number, d: number) {
  return d === 0 ? 0 : Math.round((n / d) * 100);
}

export default function MENDashboard() {
  const totalAct = actividadesData[actividadesData.length - 1]?.total ?? 0;
  const cumplidasAct = actividadesData[actividadesData.length - 1]?.cumplidas ?? 0;
  const pctAct = pct(cumplidasAct, totalAct);

  const totEntregables = iesCompliance.reduce((s, r) => s + r.entregables, 0);
  const totEntregados = iesCompliance.reduce((s, r) => s + r.entregados, 0);
  const pctEntregables = pct(totEntregados, totEntregables);

  return (
    <div className="min-h-screen w-full p-6 md:p-10 space-y-6 bg-neutral-50 text-[#4a5570]">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">PTIES – MEN Dashboard Global </h1>
          <p className="text-sm text-[#4a5570]/70">Visión global del programa, riesgos y resultados. (Ejemplo UI)</p>
        </div>
        <div className="flex flex-wrap gap-3 items-end">
          <div className="space-y-1">
            <label className="text-xs text-[#4a5570]/70">Periodo actual</label>
            <Select defaultValue="2025-02">
              <SelectTrigger className="w-36"><SelectValue placeholder="Periodo" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="2025-01">2025-01</SelectItem>
                <SelectItem value="2025-02">2025-02</SelectItem>
                <SelectItem value="2025-03">2025-03</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <label className="text-xs text-[#4a5570]/70">Fecha inicio</label>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#4a5570]" />
              <Input className="w-40" placeholder="2025-01-01" />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs text-[#4a5570]/70">Fecha actual</label>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#4a5570]" />
              <Input className="w-40" placeholder="2025-08-17" />
            </div>
          </div>
          <Button className="rounded-2xl bg-[#4a5570] text-white hover:bg-[#3a455e]">Aplicar filtros</Button>
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
              <div className="text-2xl font-semibold text-[#4a5570]">{value.toLocaleString()}</div>
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
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle className="text-[#4a5570]">Asistencia</CardTitle>
              <CardDescription className="text-[#4a5570]/70">% por grupo</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-56">
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

          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle className="text-[#4a5570]">Actividades hasta fecha</CardTitle>
              <CardDescription className="text-[#4a5570]/70">Total vs. cumplidas</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span>Total: <strong>{totalAct}</strong></span>
                <span>Cumplidas: <strong>{cumplidasAct}</strong></span>
                <span>Avance: <strong>{pctAct}%</strong></span>
              </div>
              <Progress value={pctAct} className="h-3 rounded-full bg-[#4a5570]/20" />
              <div className="h-48">
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
          <Card className="rounded-2xl">
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

          <Card className="rounded-2xl">
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
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle className="text-[#4a5570]">Cumplimiento IES</CardTitle>
              <CardDescription className="text-[#4a5570]/70">Entregables y asistencia</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span>Total entregables: <strong>{totEntregables}</strong></span>
                <span>Entregados: <strong>{totEntregados}</strong></span>
                <span>Avance: <strong>{pctEntregables}%</strong></span>
              </div>
              <Progress value={pctEntregables} className="h-3 rounded-full bg-[#4a5570]/20" />
              <div className="max-h-56 overflow-auto border rounded-xl">
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

      {/* Second row: mapa detalle + transición */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <Card className="rounded-2xl xl:col-span-2">
          <CardHeader>
            <CardTitle className="text-[#4a5570]">Mapa por municipio (estático)</CardTitle>
            <CardDescription>Color por estado de avance (ejemplo)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-72 w-full rounded-xl overflow-hidden border">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/6/6f/Colombia_location_map.svg"
                alt="Mapa estático de Colombia"
                className="w-full h-full object-cover"
              />
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle className="text-[#4a5570]">Transición a ES</CardTitle>
            <CardDescription>% estudiantes que transitan</CardDescription>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={transicionData} dataKey="value" nameKey="name" outerRadius={90}>
                  {transicionData.map((_, i) => (
                    <Cell key={i} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Third row: permanencia / timeline / gobernanza */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle className="text-[#4a5570]">Permanencia</CardTitle>
            <CardDescription>Evolución mensual</CardDescription>
          </CardHeader>
          <CardContent className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={permanenciaData}>
                <XAxis dataKey="mes" stroke="#4a5570" />
                <YAxis stroke="#4a5570" />
                <Tooltip />
                <Line type="monotone" dataKey="pct" stroke="#4a5570" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle className="text-[#4a5570]">Línea de tiempo</CardTitle>
            <CardDescription>Hitos del plan</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2"><Badge variant="outline">Ene</Badge> Entrega plan de trabajo (OK)</li>
              <li className="flex items-start gap-2"><Badge variant="outline">Feb</Badge> Diagnósticos aplicados (OK)</li>
              <li className="flex items-start gap-2"><Badge variant="outline">Mar</Badge> Formativa #1 (En curso)</li>
              <li className="flex items-start gap-2"><Badge variant="outline">Jun</Badge> Informe parcial docentes (Pendiente)</li>
              <li className="flex items-start gap-2"><Badge variant="outline">Nov</Badge> Sumativa + Cierre (Planificado)</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle className="text-[#4a5570]">Gobernanza & Reportes</CardTitle>
            <CardDescription>Ejecución y trazabilidad</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex items-center justify-between text-sm mb-2">
                <span>Ejecución presupuestal</span>
                <span className="font-medium text-[#4a5570]">72%</span>
              </div>
              <Progress value={72} className="h-3 rounded-full bg-[#4a5570]/20" />
            </div>
            <div className="space-y-2">
              {reports.map((r) => (
                <div key={r.name} className="flex items-center justify-between text-sm p-2 rounded-xl border">
                  <div className="flex items-center gap-2"><FileText className="w-4 h-4 text-[#4a5570]" /> {r.name}</div>
                  <span className="text-[#4a5570]/70">{r.date}</span>
                </div>
              ))}
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
