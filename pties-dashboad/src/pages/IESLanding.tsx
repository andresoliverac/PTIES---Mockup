import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import { BarChart3, FolderOpen, Users, BookOpen, Target, Award } from "lucide-react";

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
            <h1 className="text-4xl font-bold text-[#4a5570]">Bienvenido al Portal IES</h1>
            <p className="text-lg text-[#4a5570]/70">Panel de Control para Instituciones de Educación Superior</p>
          </div>
        </div>
        
        <div className="max-w-4xl mx-auto bg-white rounded-2xl p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-[#4a5570] mb-4">Programa de Tránsito Inmediato a Educación Superior (PTIES)</h2>
          <p className="text-[#4a5570]/80 text-lg leading-relaxed mb-6">
            Como parte de las acciones del Gobierno Nacional para materializar lo establecido en el Plan Nacional 
            de Desarrollo (2022-2026), el PTIES permite que jóvenes bachilleres superen las barreras académicas 
            y de información que normalmente enfrentan para acceder a educación superior, beneficiando de manera 
            directa a jóvenes de contextos vulnerables, municipios PDET y zonas rurales.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-[#4a5570]/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Target className="w-6 h-6 text-[#4a5570]" />
              </div>
              <h3 className="font-semibold text-[#4a5570] mb-2">Objetivo General</h3>
              <p className="text-sm text-[#4a5570]/70">Incrementar el tránsito inmediato a la educación superior mediante el fortalecimiento de competencias socioemocionales y capacidades académicas</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-[#4a5570]/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Users className="w-6 h-6 text-[#4a5570]" />
              </div>
              <h3 className="font-semibold text-[#4a5570] mb-2">Población Objetivo</h3>
              <p className="text-sm text-[#4a5570]/70">Estudiantes de grados 10° y 11° y bachilleres entre 17 y 28 años de municipios focalizados</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-[#4a5570]/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Award className="w-6 h-6 text-[#4a5570]" />
              </div>
              <h3 className="font-semibold text-[#4a5570] mb-2">Articulación IES-IEM</h3>
              <p className="text-sm text-[#4a5570]/70">Fortalecimiento de aprendizajes, orientación socio-ocupacional y relación familia-escuela-comunidad</p>
            </div>
          </div>
          
          <div className="bg-[#4a5570]/5 rounded-xl p-6 mb-6">
            <h4 className="font-semibold text-[#4a5570] mb-3">Objetivos Específicos del PTIES:</h4>
            <div className="space-y-2 text-[#4a5570]/80">
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-[#4a5570] rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-sm">Articulación armoniosa entre IES e instituciones de educación media para fortalecer aprendizajes y competencias</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-[#4a5570] rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-sm">Fomentar experiencias de tránsito anticipado con estrategias pertinentes según formación universitaria, tecnológica o técnica</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-[#4a5570] rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-sm">Implementar estrategias de monitoreo de aprendizajes y bienestar estudiantil para acompañamiento integral</span>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-[#4a5570]/80 mb-6">
              A través de este portal podrás acceder a las herramientas de monitoreo y gestión documental 
              que te permitirán hacer seguimiento del progreso de tu institución y gestionar eficientemente 
              los recursos y documentos del programa.
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Options */}
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold text-[#4a5570] text-center mb-8">¿Qué deseas hacer hoy?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                  <span className="text-[#4a5570]/80">Documentos de asistencia</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#4a5570] rounded-full"></div>
                  <span className="text-[#4a5570]/80">Planes de acción</span>
                </div>
              </div>
              
              <div className="pt-4">
                <Link to="/gestion-documentos">
                  <Button 
                    variant="outline" 
                    className="w-full border-2 border-[#4a5570] text-[#4a5570] hover:bg-[#4a5570] hover:text-white rounded-2xl py-6 text-lg font-medium"
                  >
                    Ir a Gestión de Documentos
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl p-6 text-center">
            <div className="text-3xl font-bold text-[#4a5570]">150+</div>
            <div className="text-sm text-[#4a5570]/70">Instituciones Participantes</div>
          </div>
          <div className="bg-white rounded-2xl p-6 text-center">
            <div className="text-3xl font-bold text-[#4a5570]">2,500+</div>
            <div className="text-sm text-[#4a5570]/70">Docentes Capacitados</div>
          </div>
          <div className="bg-white rounded-2xl p-6 text-center">
            <div className="text-3xl font-bold text-[#4a5570]">45,000+</div>
            <div className="text-sm text-[#4a5570]/70">Estudiantes Beneficiados</div>
          </div>
          <div className="bg-white rounded-2xl p-6 text-center">
            <div className="text-3xl font-bold text-[#4a5570]">85%</div>
            <div className="text-sm text-[#4a5570]/70">Satisfacción Promedio</div>
          </div>
        </div>
      </div>
    </div>
  );
}
