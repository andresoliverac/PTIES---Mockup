import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, FolderOpen, Upload, FileText, Users, Calendar, ClipboardList } from "lucide-react";

export default function GestionDocumentos() {
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
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Asistencia */}
          <Card className="rounded-2xl hover:shadow-lg transition-all duration-300 border-2 hover:border-[#4a5570]/20">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-[#4a5570]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-[#4a5570]" />
              </div>
              <CardTitle className="text-xl text-[#4a5570]">Asistencia</CardTitle>
              <CardDescription className="text-[#4a5570]/70">
                Registro y control de participación en actividades del programa
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#4a5570] rounded-full"></div>
                  <span className="text-[#4a5570]/80">Listas de asistencia</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#4a5570] rounded-full"></div>
                  <span className="text-[#4a5570]/80">Reportes de participación</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#4a5570] rounded-full"></div>
                  <span className="text-[#4a5570]/80">Certificados de asistencia</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#4a5570] rounded-full"></div>
                  <span className="text-[#4a5570]/80">Control de actividades</span>
                </div>
              </div>
              
              <div className="pt-4">
                <Link to="/upload/asistencia">
                  <Button className="w-full bg-[#4a5570] hover:bg-[#3a4560] text-white rounded-2xl py-6 text-lg font-medium">
                    <Upload className="w-5 h-5 mr-2" />
                    Subir Documentos
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

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
