import React, { useState, useMemo } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import { Link } from "react-router-dom";
import { ArrowLeft, FolderOpen, Upload, FileText, Calendar, ClipboardList, Filter, Search, Download } from "lucide-react";
import { parseCSV, csvData, type Deliverable } from "../utils/csvData";

export default function GestionDocumentos() {
  // Parse CSV data
  const deliverables: Deliverable[] = useMemo(() => parseCSV(csvData), []);

  const [filters, setFilters] = useState({
    eje: "todos",
    estrategia: "todos",
    actividad: "todos",
    entregableNum: "",
    fechaEntrega: "todos",
    aprobado: "todos",
    searchTerm: ""
  });

  // Get unique values for filter options
  const filterOptions = useMemo(() => {
    return {
      ejes: [...new Set(deliverables.map(d => d.eje).filter(eje => eje && eje.trim() !== ''))],
      estrategias: [...new Set(deliverables.map(d => d.estrategia).filter(estrategia => estrategia && estrategia.trim() !== ''))],
      actividades: [...new Set(deliverables.map(d => d.actividad).filter(actividad => actividad && actividad.trim() !== ''))],
      fechas: [...new Set(deliverables.map(d => d.fechaEntrega).filter(fecha => fecha && fecha.trim() !== ''))],
      aprobados: [...new Set(deliverables.map(d => d.aprobado).filter(aprobado => aprobado && aprobado.trim() !== ''))]
    };
  }, [deliverables]);

  // Filter deliverables based on current filters
  const filteredDeliverables = useMemo(() => {
    return deliverables.filter(deliverable => {
      const matchesEje = filters.eje === "todos" || deliverable.eje === filters.eje;
      const matchesEstrategia = filters.estrategia === "todos" || deliverable.estrategia === filters.estrategia;
      const matchesActividad = filters.actividad === "todos" || deliverable.actividad === filters.actividad;
      const matchesEntregableNum = filters.entregableNum === "" || deliverable.entregableNum.includes(filters.entregableNum);
      const matchesFecha = filters.fechaEntrega === "todos" || deliverable.fechaEntrega === filters.fechaEntrega;
      const matchesAprobado = filters.aprobado === "todos" || deliverable.aprobado === filters.aprobado;
      const matchesSearch = filters.searchTerm === "" || 
        deliverable.nombreEntregable.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        deliverable.ies.toLowerCase().includes(filters.searchTerm.toLowerCase());

      return matchesEje && matchesEstrategia && matchesActividad && matchesEntregableNum && matchesFecha && matchesAprobado && matchesSearch;
    });
  }, [filters, deliverables]);

  const handleFilterChange = (filterType: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      eje: "todos",
      estrategia: "todos",
      actividad: "todos",
      entregableNum: "",
      fechaEntrega: "todos",
      aprobado: "todos",
      searchTerm: ""
    });
  };
  return (
    <div className="min-h-screen w-full p-6 md:p-10 space-y-6 bg-[#f6f6f6] text-[#4a5570]">
      {/* Header with Back Button */}
      <div className="flex items-center gap-4">
        <Link to="/" className="flex items-center gap-2 text-[#4a5570] hover:text-[#3a4560]">
          <ArrowLeft className="w-5 h-5" />
          <span>Volver al Portal IES</span>
        </Link>
      </div>

      {/* Page Title */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center mb-6">
          <div className="w-16 h-16 bg-[#4a5570]/10 rounded-2xl flex items-center justify-center mr-4">
            <FolderOpen className="w-8 h-8 text-[#4a5570]" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-[#4a5570]">Gestión de Documentos</h1>
            <p className="text-lg text-[#4a5570]/70">Centro de administración y carga de documentos PTIES</p>
          </div>
        </div>
        
        <div className="max-w-3xl mx-auto bg-white rounded-2xl p-6 shadow-sm">
          <p className="text-[#4a5570]/80 text-lg leading-relaxed">
            Administra todos los documentos relacionados con el programa PTIES. Desde aquí puedes subir, 
            organizar y gestionar planes educativos, evaluaciones, reportes de asistencia y planes de acción 
            de manera centralizada y eficiente.
          </p>
        </div>
      </div>

      {/* Document Categories */}
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold text-[#4a5570] text-center mb-8">Categorías de Documentos</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Plan de Acción */}
          <Card className="rounded-2xl hover:shadow-lg transition-all duration-300 border-2 hover:border-[#4a5570]/20">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-[#4a5570]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <ClipboardList className="w-8 h-8 text-[#4a5570]" />
              </div>
              <CardTitle className="text-xl text-[#4a5570]">Plan de Acción</CardTitle>
              <CardDescription className="text-[#4a5570]/70">
                Estrategias y planes de implementación del programa
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#4a5570] rounded-full"></div>
                  <span className="text-[#4a5570]/80">Planes estratégicos</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#4a5570] rounded-full"></div>
                  <span className="text-[#4a5570]/80">Cronogramas de actividades</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#4a5570] rounded-full"></div>
                  <span className="text-[#4a5570]/80">Informes de progreso</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#4a5570] rounded-full"></div>
                  <span className="text-[#4a5570]/80">Documentos de planificación</span>
                </div>
              </div>
              
              <div className="pt-4">
                <Link to="/upload/plan-accion">
                  <Button className="w-full bg-[#4a5570] hover:bg-[#3a4560] text-white rounded-2xl py-6 text-lg font-medium">
                    <Upload className="w-5 h-5 mr-2" />
                    Subir Documentos
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Educación y Evaluaciones */}
          <Card className="rounded-2xl hover:shadow-lg transition-all duration-300 border-2 hover:border-[#4a5570]/20">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-[#4a5570]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-[#4a5570]" />
              </div>
              <CardTitle className="text-xl text-[#4a5570]">Educación y Evaluaciones</CardTitle>
              <CardDescription className="text-[#4a5570]/70">
                Planes educativos y sistemas de evaluación del programa
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#4a5570] rounded-full"></div>
                  <span className="text-[#4a5570]/80">Currículos académicos</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#4a5570] rounded-full"></div>
                  <span className="text-[#4a5570]/80">Metodologías pedagógicas</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#4a5570] rounded-full"></div>
                  <span className="text-[#4a5570]/80">Evaluaciones y pruebas</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#4a5570] rounded-full"></div>
                  <span className="text-[#4a5570]/80">Material didáctico</span>
                </div>
              </div>
              
              <div className="pt-4">
                <Link to="/upload/educacion-evaluaciones">
                  <Button className="w-full bg-[#4a5570] hover:bg-[#3a4560] text-white rounded-2xl py-6 text-lg font-medium">
                    <Upload className="w-5 h-5 mr-2" />
                    Subir Documentos
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Deliverables Table Section */}
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-[#4a5570]">Entregables PTIES</h2>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-[#4a5570]">
              {filteredDeliverables.length} de {deliverables.length} entregables
            </Badge>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={clearFilters}
              className="text-[#4a5570] border-[#4a5570]/30"
            >
              Limpiar Filtros
            </Button>
          </div>
        </div>

        {/* Filters Section */}
        <Card className="rounded-2xl mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[#4a5570]">
              <Filter className="w-5 h-5" />
              Filtros de Búsqueda
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-7 gap-4">
              {/* Search Input */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#4a5570]/50 w-4 h-4" />
                <Input
                  placeholder="Buscar entregable o IES..."
                  value={filters.searchTerm}
                  onChange={(e) => handleFilterChange("searchTerm", e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Eje Filter */}
              <Select value={filters.eje} onValueChange={(value) => handleFilterChange("eje", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Todos los Ejes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos los Ejes</SelectItem>
                  {filterOptions.ejes.map(eje => (
                    <SelectItem key={eje} value={eje}>{eje}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Estrategia Filter */}
              <Select value={filters.estrategia} onValueChange={(value) => handleFilterChange("estrategia", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Todas las Estrategias" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todas las Estrategias</SelectItem>
                  {filterOptions.estrategias.map(estrategia => (
                    <SelectItem key={estrategia} value={estrategia}>{estrategia}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Actividad Filter */}
              <Select value={filters.actividad} onValueChange={(value) => handleFilterChange("actividad", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Todas las Actividades" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todas las Actividades</SelectItem>
                  {filterOptions.actividades.map(actividad => (
                    <SelectItem key={actividad} value={actividad}>{actividad}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Entregable Number Filter */}
              <Input
                placeholder="# Entregable"
                value={filters.entregableNum}
                onChange={(e) => handleFilterChange("entregableNum", e.target.value)}
              />

              {/* Fecha Filter */}
              <Select value={filters.fechaEntrega} onValueChange={(value) => handleFilterChange("fechaEntrega", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Todas las Fechas" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todas las Fechas</SelectItem>
                  {filterOptions.fechas.map(fecha => (
                    <SelectItem key={fecha} value={fecha}>{fecha}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Approval Filter */}
              <Select value={filters.aprobado} onValueChange={(value) => handleFilterChange("aprobado", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Estado Aprobación" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos los Estados</SelectItem>
                  {filterOptions.aprobados.map(aprobado => (
                    <SelectItem key={aprobado} value={aprobado}>{aprobado}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Deliverables Table */}
        <Card className="rounded-2xl overflow-hidden">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#4a5570]/5">
                  <tr>
                    <th className="text-left p-4 font-semibold text-[#4a5570]">Eje</th>
                    <th className="text-left p-4 font-semibold text-[#4a5570]">Estrategia</th>
                    <th className="text-left p-4 font-semibold text-[#4a5570]">Actividad</th>
                    <th className="text-left p-4 font-semibold text-[#4a5570]"># Entregable</th>
                    <th className="text-left p-4 font-semibold text-[#4a5570]">Nombre Entregable</th>
                    <th className="text-left p-4 font-semibold text-[#4a5570]">Fecha Entrega</th>
                    <th className="text-left p-4 font-semibold text-[#4a5570]">IES</th>
                    <th className="text-left p-4 font-semibold text-[#4a5570]">Estado</th>
                    <th className="text-left p-4 font-semibold text-[#4a5570]">Aprobado</th>
                    <th className="text-left p-4 font-semibold text-[#4a5570]">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDeliverables.map((deliverable, index) => (
                    <tr key={`${deliverable.entregableNum || index}-${index}`} className="border-t border-[#4a5570]/10 hover:bg-[#4a5570]/5">
                      <td className="p-4 text-sm text-[#4a5570]/80">{deliverable.eje || '-'}</td>
                      <td className="p-4 text-sm text-[#4a5570]/80">{deliverable.estrategia || '-'}</td>
                      <td className="p-4 text-sm text-[#4a5570]/80">{deliverable.actividad || '-'}</td>
                      <td className="p-4">
                        {deliverable.entregableNum ? (
                          <Badge variant="outline" className="text-[#4a5570]">
                            {deliverable.entregableNum}
                          </Badge>
                        ) : (
                          <span className="text-[#4a5570]/40">-</span>
                        )}
                      </td>
                      <td className="p-4 text-sm text-[#4a5570] font-medium max-w-xs">
                        {deliverable.nombreEntregable || '-'}
                      </td>
                      <td className="p-4 text-sm text-[#4a5570]/80">{deliverable.fechaEntrega || '-'}</td>
                      <td className="p-4 text-sm text-[#4a5570]/80">{deliverable.ies || '-'}</td>
                      <td className="p-4">
                        <Badge 
                          variant={deliverable.necesitaRevision && deliverable.necesitaRevision.toLowerCase() === "x" ? "destructive" : "default"}
                          className={deliverable.necesitaRevision && deliverable.necesitaRevision.toLowerCase() === "x" ? "bg-orange-100 text-orange-800" : "bg-green-100 text-green-800"}
                        >
                          {deliverable.necesitaRevision && deliverable.necesitaRevision.toLowerCase() === "x" ? "Pendiente" : "Completo"}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <Badge 
                          variant={deliverable.aprobado === "Sí" ? "default" : deliverable.aprobado === "No" ? "destructive" : "secondary"}
                          className={deliverable.aprobado === "Sí" ? "bg-green-100 text-green-800" : deliverable.aprobado === "No" ? "bg-red-100 text-red-800" : "bg-yellow-100 text-yellow-800"}
                        >
                          {deliverable.aprobado || "Pendiente"}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            className="bg-[#4a5570] hover:bg-[#3a4560] text-white"
                          >
                            <Upload className="w-4 h-4 mr-1" />
                            Subir
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="text-[#4a5570] border-[#4a5570]/30"
                          >
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {filteredDeliverables.length === 0 && (
                <div className="p-8 text-center text-[#4a5570]/60">
                  <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No se encontraron entregables que coincidan con los filtros seleccionados.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold text-[#4a5570] text-center mb-8">Acciones Rápidas</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="rounded-2xl border-2 border-[#4a5570]/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#4a5570]/10 rounded-lg flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-[#4a5570]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#4a5570]">Documentos Recientes</h3>
                  <p className="text-sm text-[#4a5570]/70">Ver los últimos archivos subidos</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-2 border-[#4a5570]/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#4a5570]/10 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-[#4a5570]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#4a5570]">Repositorio Completo</h3>
                  <p className="text-sm text-[#4a5570]/70">Explorar todos los documentos</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Summary Statistics */}
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl p-6 text-center">
            <div className="text-3xl font-bold text-[#4a5570]">1,247</div>
            <div className="text-sm text-[#4a5570]/70">Documentos Totales</div>
          </div>
          <div className="bg-white rounded-2xl p-6 text-center">
            <div className="text-3xl font-bold text-[#4a5570]">89</div>
            <div className="text-sm text-[#4a5570]/70">Subidos Esta Semana</div>
          </div>
          <div className="bg-white rounded-2xl p-6 text-center">
            <div className="text-3xl font-bold text-[#4a5570]">23</div>
            <div className="text-sm text-[#4a5570]/70">Pendientes Revisión</div>
          </div>
          <div className="bg-white rounded-2xl p-6 text-center">
            <div className="text-3xl font-bold text-[#4a5570]">98%</div>
            <div className="text-sm text-[#4a5570]/70">Tasa de Aprobación</div>
          </div>
        </div>
      </div>
    </div>
  );
}
