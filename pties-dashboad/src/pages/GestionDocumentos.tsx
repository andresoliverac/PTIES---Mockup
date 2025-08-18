import React, { useState, useMemo } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import { Link } from "react-router-dom";
import { ArrowLeft, FolderOpen, Upload, FileText, Calendar, ClipboardList, Search, Download, CheckCircle, Clock, AlertTriangle, CalendarDays, BookOpen, Users, Stethoscope, FileCheck, MoreHorizontal, Grid3X3 } from "lucide-react";
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
    searchTerm: "",
    statusFilter: "todos", // New status filter for summary cards
    dateRange: { start: "", end: "" }, // New date range filter
    categoria: "todos" // New category filter
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

  // Category definitions for filtering
  const categorias = [
    { key: 'todos', label: 'Todos', icon: Grid3X3, color: 'bg-gray-100 text-gray-700 hover:bg-gray-200' },
    { key: 'plan-estudios', label: 'Plan de Estudios', icon: BookOpen, color: 'bg-blue-100 text-blue-700 hover:bg-blue-200' },
    { key: 'plan-accion', label: 'Plan de Acción', icon: ClipboardList, color: 'bg-green-100 text-green-700 hover:bg-green-200' },
    { key: 'asistencia', label: 'Asistencia', icon: Users, color: 'bg-purple-100 text-purple-700 hover:bg-purple-200' },
    { key: 'diagnosticos', label: 'Diagnósticos', icon: Stethoscope, color: 'bg-orange-100 text-orange-700 hover:bg-orange-200' },
    { key: 'evaluaciones', label: 'Evaluaciones', icon: FileCheck, color: 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200' },
    { key: 'otros', label: 'Otros', icon: MoreHorizontal, color: 'bg-gray-100 text-gray-700 hover:bg-gray-200' }
  ];

  // Helper function to determine document category
  const getDocumentCategory = (deliverable: Deliverable) => {
    // Use the category from the data directly
    return deliverable.categoria || 'otros';
  };

  // Helper function to get category display info
  const getCategoryInfo = (categoryKey: string) => {
    const category = categorias.find(c => c.key === categoryKey);
    return category || categorias.find(c => c.key === 'otros')!;
  };

  // Helper function to handle category badge clicks
  const handleCategoryBadgeClick = (categoryKey: string) => {
    if (categoryKey === 'plan-accion') {
      window.open('/upload/plan-accion', '_blank');
    } else if (categoryKey === 'plan-estudios') {
      window.open('/upload/educacion-evaluaciones', '_blank');
    } else {
      // For other categories, just filter the table
      handleCategoriaFilter(categoryKey);
    }
  };

  // Helper function to determine document status
  const getDocumentStatus = (deliverable: Deliverable) => {
    if (deliverable.aprobado === "Sí") return "completed";
    if (deliverable.aprobado === "No") return "late";
    if (deliverable.necesitaRevision && deliverable.necesitaRevision.toLowerCase() === "x") return "in-revision";
    return "upcoming";
  };

  // Helper function to check if date is in range
  const isDateInRange = (dateStr: string, startDate: string, endDate: string) => {
    if (!startDate && !endDate) return true;
    if (!dateStr) return false;
    
    const date = new Date(dateStr);
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;
    
    if (start && end) return date >= start && date <= end;
    if (start) return date >= start;
    if (end) return date <= end;
    return true;
  };

  // Calculate summary statistics
  const summaryStats = useMemo(() => {
    const total = deliverables.length;
    const completed = deliverables.filter(d => d.aprobado === "Sí").length;
    const inRevision = deliverables.filter(d => d.necesitaRevision && d.necesitaRevision.toLowerCase() === "x").length;
    const late = deliverables.filter(d => d.aprobado === "No").length;
    const upcoming = total - completed - late - inRevision;

    return [
      { id: "total", label: "Total de Documentos", value: total, color: "bg-blue-50 text-blue-600", icon: FileText },
      { id: "completed", label: "Completados", value: completed, color: "bg-green-50 text-green-600", icon: CheckCircle },
      { id: "in-revision", label: "En Revisión", value: inRevision, color: "bg-amber-50 text-amber-600", icon: Clock },
      { id: "late", label: "Atrasados", value: late, color: "bg-red-50 text-red-600", icon: AlertTriangle },
      { id: "upcoming", label: "Próximos", value: upcoming, color: "bg-purple-50 text-purple-600", icon: CalendarDays }
    ];
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
        deliverable.nombreEntregable.toLowerCase().includes(filters.searchTerm.toLowerCase());
      
      // Status filter from summary cards
      const documentStatus = getDocumentStatus(deliverable);
      const matchesStatus = filters.statusFilter === "todos" || 
        (filters.statusFilter === "total") ||
        (filters.statusFilter === "completed" && documentStatus === "completed") ||
        (filters.statusFilter === "in-revision" && documentStatus === "in-revision") ||
        (filters.statusFilter === "late" && documentStatus === "late") ||
        (filters.statusFilter === "upcoming" && documentStatus === "upcoming");

      // Date range filter
      const matchesDateRange = isDateInRange(deliverable.fechaEntrega, filters.dateRange.start, filters.dateRange.end);

      // Category filter
      const documentCategory = getDocumentCategory(deliverable);
      const matchesCategory = filters.categoria === "todos" || documentCategory === filters.categoria;

      return matchesEje && matchesEstrategia && matchesActividad && matchesEntregableNum && 
             matchesFecha && matchesAprobado && matchesSearch && matchesStatus && matchesDateRange && matchesCategory;
    });
  }, [filters, deliverables]);

  const handleFilterChange = (filterType: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handleDateRangeChange = (type: 'start' | 'end', value: string) => {
    setFilters(prev => ({
      ...prev,
      dateRange: {
        ...prev.dateRange,
        [type]: value
      }
    }));
  };

  const handleStatusFilter = (statusId: string) => {
    setFilters(prev => ({
      ...prev,
      statusFilter: statusId,
      // Clear other conflicting filters when using status filter
      aprobado: "todos"
    }));
  };

  const handleCategoriaFilter = (categoria: string) => {
    setFilters(prev => ({
      ...prev,
      categoria: categoria,
      // Clear other filters when selecting a category for cleaner UX
      statusFilter: "todos"
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
      searchTerm: "",
      statusFilter: "todos",
      dateRange: { start: "", end: "" },
      categoria: "todos"
    });
  };
  return (
    <div className="min-h-screen w-full p-6 md:p-10 space-y-6 bg-[#f6f6f6] text-[#4a5570]">
      {/* Header with Back Button */}
      <div className="flex items-center gap-4">
        <Link to="/" className="flex items-center gap-2 text-[#4a5570] hover:text-[#3a4560]">
          <ArrowLeft className="w-5 h-5" />
          <span>Volver al IES</span>
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

      {/* Document Summary Statistics */}
      <div className="max-w-6xl mx-auto">
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle className="text-[#4a5570] flex items-center gap-2">
              <FileText className="w-6 h-6" />
              Resumen de Documentos
            </CardTitle>
            <CardDescription>Estado general de todos los documentos del programa PTIES</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {summaryStats.map((stat) => {
                const IconComponent = stat.icon;
                return (
                  <div
                    key={stat.id}
                    onClick={() => handleStatusFilter(stat.id)}
                    className={`${stat.color} rounded-2xl p-6 text-center cursor-pointer hover:scale-105 transition-all duration-200 ${
                      filters.statusFilter === stat.id ? 'ring-2 ring-[#4a5570] ring-offset-2' : ''
                    }`}
                  >
                    <div className="flex items-center justify-center mb-2">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div className="text-3xl font-bold">{stat.value}</div>
                    <div className="text-sm font-medium">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Category Filter Buttons */}
      <div className="max-w-6xl mx-auto">
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle className="text-[#4a5570] flex items-center gap-2">
              <Grid3X3 className="w-5 h-5" />
              Filtrar por Categoría
            </CardTitle>
            <CardDescription>Selecciona una categoría para filtrar los documentos rápidamente</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              {categorias.map((categoria) => {
                const IconComponent = categoria.icon;
                const isActive = filters.categoria === categoria.key;
                return (
                  <Button
                    key={categoria.key}
                    variant={isActive ? "default" : "outline"}
                    onClick={() => handleCategoriaFilter(categoria.key)}
                    className={`flex items-center gap-2 transition-all duration-200 ${
                      isActive 
                        ? 'bg-[#4a5570] text-white hover:bg-[#3a4560]' 
                        : `${categoria.color} border-[#4a5570]/20 hover:border-[#4a5570]/40`
                    }`}
                  >
                    <IconComponent className="h-4 w-4" />
                    {categoria.label}
                  </Button>
                );
              })}
            </div>
            {filters.categoria !== "todos" && (
              <div className="mt-4 flex items-center gap-2">
                <Badge variant="outline" className="text-[#4a5570]">
                  Categoría activa: {categorias.find(c => c.key === filters.categoria)?.label}
                </Badge>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleCategoriaFilter("todos")}
                  className="text-[#4a5570] border-[#4a5570]/30"
                >
                  Mostrar Todas
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Timeline Slicer for Dates */}
      <div className="max-w-6xl mx-auto">
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle className="text-[#4a5570] flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Filtro de Fechas
            </CardTitle>
            <CardDescription>Selecciona un rango de fechas para filtrar los documentos</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#4a5570]">Fecha de Inicio</label>
                <Input
                  type="date"
                  value={filters.dateRange.start}
                  onChange={(e) => handleDateRangeChange('start', e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#4a5570]">Fecha de Fin</label>
                <Input
                  type="date"
                  value={filters.dateRange.end}
                  onChange={(e) => handleDateRangeChange('end', e.target.value)}
                  className="w-full"
                />
              </div>
            </div>
            {(filters.dateRange.start || filters.dateRange.end) && (
              <div className="mt-4 flex items-center gap-2">
                <Badge variant="outline" className="text-[#4a5570]">
                  Filtro de fecha activo: {filters.dateRange.start || 'Inicio'} - {filters.dateRange.end || 'Fin'}
                </Badge>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setFilters(prev => ({ ...prev, dateRange: { start: "", end: "" } }))}
                  className="text-[#4a5570] border-[#4a5570]/30"
                >
                  Limpiar Fechas
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Deliverables Table Section */}
      <div className="w-full px-4">
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

        {/* Deliverables Table */}
        <Card className="rounded-2xl overflow-hidden">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#4a5570]/5">
                  <tr>
                    <th className="text-left p-3 font-semibold text-[#4a5570] border-r border-[#4a5570]/10 min-w-[120px]">
                      <div className="space-y-1">
                        <span className="text-xs">Eje</span>
                        <Select value={filters.eje} onValueChange={(value) => handleFilterChange("eje", value)}>
                          <SelectTrigger className="h-8 text-xs">
                            <SelectValue placeholder="Todos" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="todos">Todos</SelectItem>
                            {filterOptions.ejes.map(eje => (
                              <SelectItem key={eje} value={eje}>{eje}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </th>
                    <th className="text-left p-3 font-semibold text-[#4a5570] border-r border-[#4a5570]/10 min-w-[140px]">
                      <div className="space-y-1">
                        <span className="text-xs">Estrategia</span>
                        <Select value={filters.estrategia} onValueChange={(value) => handleFilterChange("estrategia", value)}>
                          <SelectTrigger className="h-8 text-xs">
                            <SelectValue placeholder="Todas" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="todos">Todas</SelectItem>
                            {filterOptions.estrategias.map(estrategia => (
                              <SelectItem key={estrategia} value={estrategia}>{estrategia}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </th>
                    <th className="text-left p-3 font-semibold text-[#4a5570] border-r border-[#4a5570]/10 min-w-[140px]">
                      <div className="space-y-1">
                        <span className="text-xs">Actividad</span>
                        <Select value={filters.actividad} onValueChange={(value) => handleFilterChange("actividad", value)}>
                          <SelectTrigger className="h-8 text-xs">
                            <SelectValue placeholder="Todas" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="todos">Todas</SelectItem>
                            {filterOptions.actividades.map(actividad => (
                              <SelectItem key={actividad} value={actividad}>{actividad}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </th>
                    <th className="text-left p-3 font-semibold text-[#4a5570] border-r border-[#4a5570]/10 min-w-[100px]">
                      <div className="space-y-1">
                        <span className="text-xs"># Entregable</span>
                        <Input
                          placeholder="Buscar..."
                          value={filters.entregableNum}
                          onChange={(e) => handleFilterChange("entregableNum", e.target.value)}
                          className="h-8 text-xs"
                        />
                      </div>
                    </th>
                    <th className="text-left p-3 font-semibold text-[#4a5570] border-r border-[#4a5570]/10 min-w-[200px]">
                      <div className="space-y-1">
                        <span className="text-xs">Nombre Entregable</span>
                        <div className="relative">
                          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-[#4a5570]/50 w-3 h-3" />
                          <Input
                            placeholder="Buscar entregable..."
                            value={filters.searchTerm}
                            onChange={(e) => handleFilterChange("searchTerm", e.target.value)}
                            className="pl-7 h-8 text-xs"
                          />
                        </div>
                      </div>
                    </th>
                    <th className="text-left p-3 font-semibold text-[#4a5570] border-r border-[#4a5570]/10 min-w-[120px]">
                      <div className="space-y-1">
                        <span className="text-xs">Categoría</span>
                        <Select value={filters.categoria} onValueChange={(value) => handleFilterChange("categoria", value)}>
                          <SelectTrigger className="h-8 text-xs">
                            <SelectValue placeholder="Todas" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="todos">Todas</SelectItem>
                            {categorias.map((category: any) => (
                              <SelectItem key={category.key} value={category.key}>{category.label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </th>
                    <th className="text-left p-3 font-semibold text-[#4a5570] border-r border-[#4a5570]/10 min-w-[120px]">
                      <div className="space-y-1">
                        <span className="text-xs">Fecha Entrega</span>
                        <Select value={filters.fechaEntrega} onValueChange={(value) => handleFilterChange("fechaEntrega", value)}>
                          <SelectTrigger className="h-8 text-xs">
                            <SelectValue placeholder="Todas" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="todos">Todas</SelectItem>
                            {filterOptions.fechas.map(fecha => (
                              <SelectItem key={fecha} value={fecha}>{fecha}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </th>
                    <th className="text-left p-3 font-semibold text-[#4a5570] border-r border-[#4a5570]/10 min-w-[120px]">
                      <div className="space-y-1">
                        <span className="text-xs">Estado</span>
                        <Select value={filters.statusFilter} onValueChange={(value) => handleFilterChange("statusFilter", value)}>
                          <SelectTrigger className="h-8 text-xs">
                            <SelectValue placeholder="Todos" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="todos">Todos</SelectItem>
                            <SelectItem value="Pendiente">Pendiente</SelectItem>
                            <SelectItem value="En Revisión">En Revisión</SelectItem>
                            <SelectItem value="Completado">Completado</SelectItem>
                            <SelectItem value="Retrasado">Retrasado</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </th>
                    <th className="text-left p-3 font-semibold text-[#4a5570] border-r border-[#4a5570]/10 min-w-[100px]">
                      <div className="space-y-1">
                        <span className="text-xs">Aprobado</span>
                        <Select value={filters.aprobado} onValueChange={(value) => handleFilterChange("aprobado", value)}>
                          <SelectTrigger className="h-8 text-xs">
                            <SelectValue placeholder="Todos" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="todos">Todos</SelectItem>
                            {filterOptions.aprobados.map(aprobado => (
                              <SelectItem key={aprobado} value={aprobado}>{aprobado}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </th>
                    <th className="text-left p-3 font-semibold text-[#4a5570] min-w-[100px]">
                      <span className="text-xs">Acciones</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDeliverables.map((deliverable, index) => (
                    <tr key={`${deliverable.entregableNum || index}-${index}`} className="border-t border-[#4a5570]/10 hover:bg-[#4a5570]/5">
                      <td className="p-5 text-sm text-[#4a5570]/80">{deliverable.eje || '-'}</td>
                      <td className="p-5 text-sm text-[#4a5570]/80">{deliverable.estrategia || '-'}</td>
                      <td className="p-5 text-sm text-[#4a5570]/80">{deliverable.actividad || '-'}</td>
                      <td className="p-5">
                        {deliverable.entregableNum ? (
                          <Badge variant="outline" className="text-[#4a5570]">
                            {deliverable.entregableNum}
                          </Badge>
                        ) : (
                          <span className="text-[#4a5570]/40">-</span>
                        )}
                      </td>
                      <td className="p-5 text-sm text-[#4a5570] font-medium">
                        {deliverable.nombreEntregable || '-'}
                      </td>
                      <td className="p-5">
                        {(() => {
                          const categoryKey = getDocumentCategory(deliverable);
                          const categoryInfo = getCategoryInfo(categoryKey);
                          const IconComponent = categoryInfo.icon;
                          return (
                            <Badge 
                              variant="outline" 
                              className={`${categoryInfo.color} cursor-pointer hover:scale-105 transition-all duration-200 flex items-center gap-1 w-fit`}
                              onClick={() => handleCategoryBadgeClick(categoryKey)}
                            >
                              <IconComponent className="h-3 w-3" />
                              {categoryInfo.label}
                            </Badge>
                          );
                        })()}
                      </td>
                      <td className="p-5 text-sm text-[#4a5570]/80">{deliverable.fechaEntrega || '-'}</td>
                      <td className="p-5">
                        <Badge 
                          variant={deliverable.necesitaRevision && deliverable.necesitaRevision.toLowerCase() === "x" ? "destructive" : "default"}
                          className={deliverable.necesitaRevision && deliverable.necesitaRevision.toLowerCase() === "x" ? "bg-orange-100 text-orange-800" : "bg-green-100 text-green-800"}
                        >
                          {deliverable.necesitaRevision && deliverable.necesitaRevision.toLowerCase() === "x" ? "Pendiente" : "Completo"}
                        </Badge>
                      </td>
                      <td className="p-5">
                        <Badge 
                          variant={deliverable.aprobado === "Sí" ? "default" : deliverable.aprobado === "No" ? "destructive" : "secondary"}
                          className={deliverable.aprobado === "Sí" ? "bg-green-100 text-green-800" : deliverable.aprobado === "No" ? "bg-red-100 text-red-800" : "bg-yellow-100 text-yellow-800"}
                        >
                          {deliverable.aprobado || "Pendiente"}
                        </Badge>
                      </td>
                      <td className="p-5">
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
    </div>
  );
}
