import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { ArrowLeft, Save, X } from "lucide-react";
import { Actividad, ActividadFormData, TIPOS_ACTIVIDAD } from "../../types/actividad";

interface FormularioActividadProps {
  onGuardar: (actividad: Actividad) => void;
  onCancelar: () => void;
}

export default function FormularioActividad({ onGuardar, onCancelar }: FormularioActividadProps) {
  const [formData, setFormData] = useState<ActividadFormData>({
    tipoActividad: 1,
    nombreActividad: "",
    descripcionActividad: "",
    tipoDocumentoResponsable: 1,
    numeroDocumentoResponsable: "",
    fechaInicio: new Date(),
    fechaFin: new Date(),
    planAccion: ""
  });

  const [errores, setErrores] = useState<Record<string, string>>({});

  // Agrupar tipos de actividad por categoría
  const categorias = Array.from(new Set(TIPOS_ACTIVIDAD.map(tipo => tipo.categoria)));
  const tiposPorCategoria = categorias.reduce((acc, categoria) => {
    acc[categoria] = TIPOS_ACTIVIDAD.filter(tipo => tipo.categoria === categoria);
    return acc;
  }, {} as Record<string, typeof TIPOS_ACTIVIDAD>);

  const validarFormulario = () => {
    const nuevosErrores: Record<string, string> = {};

    if (!formData.nombreActividad.trim()) {
      nuevosErrores.nombreActividad = "El nombre de la actividad es requerido";
    }

    if (!formData.descripcionActividad.trim()) {
      nuevosErrores.descripcionActividad = "La descripción es requerida";
    }

    if (!formData.numeroDocumentoResponsable.trim()) {
      nuevosErrores.numeroDocumentoResponsable = "El número de documento es requerido";
    }

    if (!formData.planAccion.trim()) {
      nuevosErrores.planAccion = "El plan de acción es requerido";
    }

    if (formData.fechaFin <= formData.fechaInicio) {
      nuevosErrores.fechaFin = "La fecha de fin debe ser posterior a la fecha de inicio";
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validarFormulario()) {
      return;
    }

    const nuevaActividad: Actividad = {
      ID_ACTIVIDAD: `ACT-${Date.now()}`,
      TIPO_ACTIVIDAD: formData.tipoActividad,
      NOMBRE_ACTIVIDAD: formData.nombreActividad,
      DESC_ACTIVIDAD: formData.descripcionActividad,
      ID_TIPO_DOCUMENTO_RESPONSABLE: formData.tipoDocumentoResponsable,
      NUM_DOCUMENTO_RESPONSABLE: formData.numeroDocumentoResponsable,
      FECHA_INICIO: formData.fechaInicio,
      FECHA_FIN: formData.fechaFin,
      ID_PLAN_ACCION: formData.planAccion
    };

    onGuardar(nuevaActividad);
  };

  const handleInputChange = (field: keyof ActividadFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Limpiar error cuando el usuario empiece a escribir
    if (errores[field]) {
      setErrores(prev => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <div className="min-h-screen w-full p-6 md:p-10 space-y-8 bg-[#f6f6f6] text-[#4a5570]">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button 
          onClick={onCancelar}
          variant="outline" 
          className="rounded-2xl border-[#4a5570] text-[#4a5570]"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Cancelar
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-[#4a5570]">Nueva Actividad</h1>
          <p className="text-[#4a5570]/70 mt-2">Completa la información para crear una nueva actividad</p>
        </div>
      </div>

      {/* Formulario */}
      <Card className="max-w-4xl mx-auto rounded-2xl">
        <CardHeader>
          <CardTitle className="text-[#4a5570]">Información de la Actividad</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Tipo de Actividad */}
              <div className="space-y-2">
                <Label htmlFor="tipoActividad" className="text-[#4a5570] font-medium">
                  Tipo de Actividad
                </Label>
                <Select 
                  value={formData.tipoActividad.toString()} 
                  onValueChange={(value) => handleInputChange('tipoActividad', parseInt(value))}
                >
                  <SelectTrigger className="rounded-2xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="max-h-60">
                    {categorias.map((categoria) => (
                      <div key={categoria}>
                        <div className="px-2 py-1 text-sm font-semibold text-[#4a5570] bg-gray-50">
                          {categoria}
                        </div>
                        {tiposPorCategoria[categoria].map((tipo) => (
                          <SelectItem key={tipo.id} value={tipo.id.toString()}>
                            {tipo.nombre}
                          </SelectItem>
                        ))}
                      </div>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Plan de Acción */}
              <div className="space-y-2">
                <Label htmlFor="planAccion" className="text-[#4a5570] font-medium">
                  Plan de Acción
                </Label>
                <Input
                  id="planAccion"
                  placeholder="Ej: PLAN-001"
                  value={formData.planAccion}
                  onChange={(e) => handleInputChange('planAccion', e.target.value)}
                  className={`rounded-2xl ${errores.planAccion ? 'border-red-500' : ''}`}
                />
                {errores.planAccion && (
                  <p className="text-red-500 text-sm">{errores.planAccion}</p>
                )}
              </div>
            </div>

            {/* Nombre de la Actividad */}
            <div className="space-y-2">
              <Label htmlFor="nombreActividad" className="text-[#4a5570] font-medium">
                Nombre de la Actividad
              </Label>
              <Input
                id="nombreActividad"
                placeholder="Ingresa el nombre de la actividad"
                value={formData.nombreActividad}
                onChange={(e) => handleInputChange('nombreActividad', e.target.value)}
                className={`rounded-2xl ${errores.nombreActividad ? 'border-red-500' : ''}`}
              />
              {errores.nombreActividad && (
                <p className="text-red-500 text-sm">{errores.nombreActividad}</p>
              )}
            </div>

            {/* Descripción */}
            <div className="space-y-2">
              <Label htmlFor="descripcionActividad" className="text-[#4a5570] font-medium">
                Descripción
              </Label>
              <Textarea
                id="descripcionActividad"
                placeholder="Describe los objetivos y contenido de la actividad"
                value={formData.descripcionActividad}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleInputChange('descripcionActividad', e.target.value)}
                className={`rounded-2xl min-h-[100px] ${errores.descripcionActividad ? 'border-red-500' : ''}`}
              />
              {errores.descripcionActividad && (
                <p className="text-red-500 text-sm">{errores.descripcionActividad}</p>
              )}
            </div>

            {/* Responsable */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="tipoDocumento" className="text-[#4a5570] font-medium">
                  Tipo de Documento Responsable
                </Label>
                <Select 
                  value={formData.tipoDocumentoResponsable.toString()} 
                  onValueChange={(value) => handleInputChange('tipoDocumentoResponsable', parseInt(value))}
                >
                  <SelectTrigger className="rounded-2xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Cédula de Ciudadanía</SelectItem>
                    <SelectItem value="2">Cédula de Extranjería</SelectItem>
                    <SelectItem value="3">Pasaporte</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="numeroDocumento" className="text-[#4a5570] font-medium">
                  Número de Documento
                </Label>
                <Input
                  id="numeroDocumento"
                  placeholder="Número de documento del responsable"
                  value={formData.numeroDocumentoResponsable}
                  onChange={(e) => handleInputChange('numeroDocumentoResponsable', e.target.value)}
                  className={`rounded-2xl ${errores.numeroDocumentoResponsable ? 'border-red-500' : ''}`}
                />
                {errores.numeroDocumentoResponsable && (
                  <p className="text-red-500 text-sm">{errores.numeroDocumentoResponsable}</p>
                )}
              </div>
            </div>

            {/* Fechas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="fechaInicio" className="text-[#4a5570] font-medium">
                  Fecha de Inicio
                </Label>
                <Input
                  id="fechaInicio"
                  type="date"
                  value={formData.fechaInicio.toISOString().split('T')[0]}
                  onChange={(e) => handleInputChange('fechaInicio', new Date(e.target.value))}
                  className="rounded-2xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="fechaFin" className="text-[#4a5570] font-medium">
                  Fecha de Fin
                </Label>
                <Input
                  id="fechaFin"
                  type="date"
                  value={formData.fechaFin.toISOString().split('T')[0]}
                  onChange={(e) => handleInputChange('fechaFin', new Date(e.target.value))}
                  className={`rounded-2xl ${errores.fechaFin ? 'border-red-500' : ''}`}
                />
                {errores.fechaFin && (
                  <p className="text-red-500 text-sm">{errores.fechaFin}</p>
                )}
              </div>
            </div>

            {/* Botones */}
            <div className="flex justify-end gap-4 pt-6">
              <Button
                type="button"
                onClick={onCancelar}
                variant="outline"
                className="rounded-2xl border-[#4a5570] text-[#4a5570] px-8"
              >
                <X className="w-4 h-4 mr-2" />
                Cancelar
              </Button>
              <Button
                type="submit"
                className="bg-[#4a5570] hover:bg-[#3a4560] text-white rounded-2xl px-8"
              >
                <Save className="w-4 h-4 mr-2" />
                Guardar Actividad
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
