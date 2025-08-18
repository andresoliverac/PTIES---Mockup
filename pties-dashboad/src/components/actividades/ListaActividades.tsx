import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Calendar, User, FileText, Edit, Trash2, Eye } from "lucide-react";
import { Actividad, TIPOS_ACTIVIDAD } from "../../types/actividad";

interface ListaActividadesProps {
  actividades: Actividad[];
}

export default function ListaActividades({ actividades }: ListaActividadesProps) {
  const getTipoActividadInfo = (tipoId: number) => {
    const tipo = TIPOS_ACTIVIDAD.find(t => t.id === tipoId);
    return tipo ? { nombre: tipo.nombre, categoria: tipo.categoria } : { nombre: "Tipo desconocido", categoria: "Sin categoría" };
  };

  const getTipoDocumentoNombre = (tipo: number) => {
    const tipos = {
      1: "C.C.",
      2: "C.E.",
      3: "Pasaporte"
    };
    return tipos[tipo as keyof typeof tipos] || "Otro";
  };

  const getEstadoActividad = (fechaInicio: Date, fechaFin: Date) => {
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    
    const inicio = new Date(fechaInicio);
    inicio.setHours(0, 0, 0, 0);
    
    const fin = new Date(fechaFin);
    fin.setHours(23, 59, 59, 999);

    if (hoy < inicio) {
      return { estado: "Próxima", color: "border-blue-400 text-blue-600" };
    } else if (hoy >= inicio && hoy <= fin) {
      return { estado: "En Progreso", color: "border-yellow-400 text-yellow-600" };
    } else {
      return { estado: "Completada", color: "border-green-400 text-green-600" };
    }
  };

  const formatearFecha = (fecha: Date) => {
    return new Date(fecha).toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (actividades.length === 0) {
    return (
      <Card className="rounded-2xl">
        <CardContent className="p-12 text-center">
          <Calendar className="w-16 h-16 text-[#4a5570]/30 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-[#4a5570] mb-2">No hay actividades</h3>
          <p className="text-[#4a5570]/70">Crea tu primera actividad para comenzar</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-[#4a5570]">
          Actividades ({actividades.length})
        </h2>
      </div>

      <div className="grid gap-4">
        {actividades.map((actividad) => {
          const { estado, color } = getEstadoActividad(actividad.FECHA_INICIO, actividad.FECHA_FIN);
          
          return (
            <Card key={actividad.ID_ACTIVIDAD} className="rounded-2xl hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row justify-between gap-4">
                  {/* Información Principal */}
                  <div className="flex-1 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-[#4a5570]">
                            {actividad.NOMBRE_ACTIVIDAD}
                          </h3>
                          <Badge variant="outline" className={`text-xs ${color}`}>
                            {estado}
                          </Badge>
                          <Badge variant="outline" className="text-xs border-[#4a5570]/30 text-[#4a5570]">
                            {getTipoActividadInfo(actividad.TIPO_ACTIVIDAD).categoria}
                          </Badge>
                        </div>
                        <p className="text-[#4a5570]/80 text-sm leading-relaxed">
                          {actividad.DESC_ACTIVIDAD}
                        </p>
                      </div>
                    </div>

                    {/* Detalles */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center gap-2 text-[#4a5570]/70">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {formatearFecha(actividad.FECHA_INICIO)} - {formatearFecha(actividad.FECHA_FIN)}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-[#4a5570]/70">
                        <User className="w-4 h-4" />
                        <span>
                          {getTipoDocumentoNombre(actividad.ID_TIPO_DOCUMENTO_RESPONSABLE)} {actividad.NUM_DOCUMENTO_RESPONSABLE}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-[#4a5570]/70">
                        <FileText className="w-4 h-4" />
                        <span>{actividad.ID_PLAN_ACCION}</span>
                      </div>
                    </div>

                    {/* ID de Actividad */}
                    <div className="text-xs text-[#4a5570]/50">
                      ID: {actividad.ID_ACTIVIDAD}
                    </div>
                  </div>

                  {/* Acciones */}
                  <div className="flex flex-row lg:flex-col gap-2 lg:min-w-[120px]">
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-2xl border-[#4a5570]/30 text-[#4a5570] hover:bg-[#4a5570]/10 flex-1 lg:flex-none"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      Ver
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-2xl border-[#4a5570]/30 text-[#4a5570] hover:bg-[#4a5570]/10 flex-1 lg:flex-none"
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      Editar
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-2xl border-red-300 text-red-600 hover:bg-red-50 flex-1 lg:flex-none"
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Eliminar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
