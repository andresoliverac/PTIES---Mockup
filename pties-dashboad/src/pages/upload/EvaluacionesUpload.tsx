import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Upload, ArrowLeft, FileText } from "lucide-react";
import { Link } from "react-router-dom";

export default function EvaluacionesUpload() {
  return (
    <div className="min-h-screen w-full p-6 md:p-10 space-y-6 bg-[#f6f6f6] text-[#4a5570]">
      {/* Header with Title */}
      <div className="flex items-center gap-4">
        <Link to="/" className="flex items-center gap-2 text-[#4a5570] hover:text-[#3a4560]">
          <ArrowLeft className="w-5 h-5" />
          <span>Volver al Dashboard</span>
        </Link>
      </div>

      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Subir Evaluaciones</h1>
        <p className="text-sm text-[#4a5570]/70">Gestión y carga de evaluaciones y resultados del programa PTIES</p>
      </div>

      {/* Upload Form */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="rounded-2xl">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#4a5570]/10 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-[#4a5570]" />
              </div>
              <div>
                <CardTitle className="text-[#4a5570]">Cargar Evaluación</CardTitle>
                <CardDescription>Formatos permitidos: PDF, Excel, CSV</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#4a5570]">Tipo de Evaluación</label>
              <select className="w-full p-2 border border-gray-200 rounded-lg">
                <option>Evaluación Diagnóstica</option>
                <option>Evaluación Formativa 1</option>
                <option>Evaluación Formativa 2</option>
                <option>Evaluación Acumulada</option>
                <option>Prueba de Competencias</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-[#4a5570]">Competencia Evaluada</label>
              <select className="w-full p-2 border border-gray-200 rounded-lg">
                <option>Matemáticas</option>
                <option>Lenguaje</option>
                <option>Ciencias Naturales</option>
                <option>Ciencias Sociales</option>
                <option>Socioemocional</option>
                <option>Inglés</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-[#4a5570]">Período</label>
              <Input type="text" placeholder="2025-01" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-[#4a5570]">Fecha de Aplicación</label>
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
            <CardTitle className="text-[#4a5570]">Evaluaciones Recientes</CardTitle>
            <CardDescription>Últimas evaluaciones subidas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-[#4a5570]">Eval_Acumulada_Matematicas_2025-02.xlsx</p>
                    <p className="text-sm text-[#4a5570]/70">Subido el 22 Feb 2025</p>
                  </div>
                  <Button variant="ghost" size="sm" className="text-[#4a5570]">
                    Ver
                  </Button>
                </div>
              </div>
              
              <div className="p-3 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-[#4a5570]">Eval_Formativa_Lenguaje_2025-02.pdf</p>
                    <p className="text-sm text-[#4a5570]/70">Subido el 20 Feb 2025</p>
                  </div>
                  <Button variant="ghost" size="sm" className="text-[#4a5570]">
                    Ver
                  </Button>
                </div>
              </div>

              <div className="p-3 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-[#4a5570]">Diagnostica_Ciencias_2025-01.csv</p>
                    <p className="text-sm text-[#4a5570]/70">Subido el 18 Feb 2025</p>
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
