import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Upload, ArrowLeft, Calendar, Users } from "lucide-react";
import { Link } from "react-router-dom";

export default function AsistenciaUpload() {
  return (
    <div className="min-h-screen w-full p-6 md:p-10 space-y-6 bg-[#f6f6f6] text-[#4a5570]">
      {/* Header with Title */}
      <div className="flex items-center gap-4">
        <Link to="/gestion-documentos" className="flex items-center gap-2 text-[#4a5570] hover:text-[#3a4560]">
          <ArrowLeft className="w-5 h-5" />
          <span>Volver a Gestión de Documentos</span>
        </Link>
      </div>

      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Subir Reportes de Asistencia</h1>
        <p className="text-sm text-[#4a5570]/70">Gestión y carga de documentos de asistencia del programa PTIES</p>
      </div>

      {/* Upload Form */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="rounded-2xl">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#4a5570]/10 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-[#4a5570]" />
              </div>
              <div>
                <CardTitle className="text-[#4a5570]">Cargar Archivo de Asistencia</CardTitle>
                <CardDescription>Formatos permitidos: PDF, Excel, CSV</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#4a5570]">Tipo de Reporte</label>
              <select className="w-full p-2 border border-gray-200 rounded-lg">
                <option>Asistencia Estudiantes</option>
                <option>Asistencia Docentes</option>
                <option>Asistencia Actividades</option>
                <option>Asistencia Reuniones</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-[#4a5570]">Período</label>
              <Input type="text" placeholder="2025-01" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-[#4a5570]">Fecha del Reporte</label>
              <Input type="date" />
            </div>

            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-[#4a5570] transition-colors">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-[#4a5570] font-medium mb-2">Arrastra tu archivo aquí</p>
              <p className="text-sm text-[#4a5570]/70 mb-4">o haz clic para seleccionar</p>
              <Button className="bg-[#4a5570] text-white rounded-2xl">
                Seleccionar Archivo
              </Button>
            </div>

            <div className="flex gap-3 pt-4">
              <Button className="flex-1 bg-[#4a5570] text-white rounded-2xl">
                Subir Archivo
              </Button>
              <Button variant="outline" className="flex-1 rounded-2xl border-[#4a5570] text-[#4a5570]">
                Cancelar
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle className="text-[#4a5570]">Archivos Recientes</CardTitle>
            <CardDescription>Últimos reportes de asistencia subidos</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-[#4a5570]">Asistencia_Estudiantes_2025-02.xlsx</p>
                    <p className="text-sm text-[#4a5570]/70">Subido el 15 Feb 2025</p>
                  </div>
                  <Button variant="ghost" size="sm" className="text-[#4a5570]">
                    Ver
                  </Button>
                </div>
              </div>
              
              <div className="p-3 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-[#4a5570]">Asistencia_Docentes_2025-02.pdf</p>
                    <p className="text-sm text-[#4a5570]/70">Subido el 12 Feb 2025</p>
                  </div>
                  <Button variant="ghost" size="sm" className="text-[#4a5570]">
                    Ver
                  </Button>
                </div>
              </div>

              <div className="p-3 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-[#4a5570]">Reporte_Actividades_2025-01.csv</p>
                    <p className="text-sm text-[#4a5570]/70">Subido el 28 Ene 2025</p>
                  </div>
                  <Button variant="ghost" size="sm" className="text-[#4a5570]">
                    Ver
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
