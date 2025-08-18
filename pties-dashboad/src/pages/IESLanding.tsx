import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import { BarChart3, FolderOpen, Users, BookOpen, Target, Award, Calendar } from "lucide-react";

export default function IESLanding() {
  return (
    <div className="min-h-screen w-full p-6 md:p-10 space-y-8 bg-[#f6f6f6] text-[#4a5570]">
      {/* Welcome Section */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center mb-6">
          <div className="w-16 h-16 bg-[#4a5570]/10 rounded-2xl flex items-center justify-center mr-4">
            <BookOpen className="w-8 h-8 text-[#4a5570]" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-[#4a5570]">Bienvenida IES ABC </h1>
          </div>
        </div>
      </div>

      {/* Navigation Options */}
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold text-[#4a5570] text-center mb-8">¿Qué deseas hacer hoy?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Gestión de Documentos Option */}
          <Card className="rounded-2xl hover:shadow-lg transition-all duration-300 border-2 hover:border-[#4a5570]/20">
            <CardHeader className="text-center pb-4">
              <div className="w-20 h-20 bg-[#4a5570]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FolderOpen className="w-10 h-10 text-[#4a5570]" />
              </div>
              <CardTitle className="text-2xl text-[#4a5570]">Gestión de Documentos</CardTitle>
              <CardDescription className="text-[#4a5570]/70 text-base">
                Administra, sube y organiza todos los documentos relacionados con el programa PTIES
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#4a5570] rounded-full"></div>
                  <span className="text-[#4a5570]/80">Subida de planes educativos</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#4a5570] rounded-full"></div>
                  <span className="text-[#4a5570]/80">Gestión de evaluaciones</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#4a5570] rounded-full"></div>
                  <span className="text-[#4a5570]/80">Planes de acción</span>
                </div>
              </div>
              
              <div className="pt-4">
                <Link to="/gestion-documentos">
                  <Button className="w-full bg-[#4a5570] hover:bg-[#3a4560] text-white rounded-2xl py-6 text-lg font-medium">
                    Ir a Gestión de Documentos
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Gestión de Actividades Option */}
          <Card className="rounded-2xl hover:shadow-lg transition-all duration-300 border-2 hover:border-[#4a5570]/20">
            <CardHeader className="text-center pb-4">
              <div className="w-20 h-20 bg-[#4a5570]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-10 h-10 text-[#4a5570]" />
              </div>
              <CardTitle className="text-2xl text-[#4a5570]">Gestión de Actividades</CardTitle>
              <CardDescription className="text-[#4a5570]/70 text-base">
                Crea, programa y administra las actividades del programa PTIES
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#4a5570] rounded-full"></div>
                  <span className="text-[#4a5570]/80">Crear nuevas actividades</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#4a5570] rounded-full"></div>
                  <span className="text-[#4a5570]/80">Asignar responsables</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#4a5570] rounded-full"></div>
                  <span className="text-[#4a5570]/80">Programar fechas</span>
                </div>
              </div>
              
              <div className="pt-4">
                <Link to="/gestion-actividades">
                  <Button className="w-full bg-[#4a5570] hover:bg-[#3a4560] text-white rounded-2xl py-6 text-lg font-medium">
                    Ir a Gestión de Actividades
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Monitoreo Option */}
          <Card className="rounded-2xl hover:shadow-lg transition-all duration-300 border-2 hover:border-[#4a5570]/20">
            <CardHeader className="text-center pb-4">
              <div className="w-20 h-20 bg-[#4a5570]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-10 h-10 text-[#4a5570]" />
              </div>
              <CardTitle className="text-2xl text-[#4a5570]">Monitoreo</CardTitle>
              <CardDescription className="text-[#4a5570]/70 text-base">
                Accede a dashboards, métricas y análisis detallados del progreso de tu institución
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#4a5570] rounded-full"></div>
                  <span className="text-[#4a5570]/80">Panel de control institucional</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#4a5570] rounded-full"></div>
                  <span className="text-[#4a5570]/80">Métricas de desempeño académico</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#4a5570] rounded-full"></div>
                  <span className="text-[#4a5570]/80">Reportes y visualizaciones</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#4a5570] rounded-full"></div>
                  <span className="text-[#4a5570]/80">Seguimiento de competencias</span>
                </div>
              </div>
              
              <div className="pt-4">
                <Link to="/ies-dashboard">
                  <Button className="w-full bg-[#4a5570] hover:bg-[#3a4560] text-white rounded-2xl py-6 text-lg font-medium">
                    Ir a Monitoreo
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
