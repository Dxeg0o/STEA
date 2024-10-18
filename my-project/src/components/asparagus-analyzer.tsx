"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, XCircle, Ruler, Circle } from "lucide-react";

export default function Component() {
  const [altura] = useState(522);
  const [calibre] = useState(42);
  const alturaMinima = 18;
  const calibreMinimo = 40;

  const cumpleRequisitos = altura >= alturaMinima && calibre >= calibreMinimo;

  const calcularPorcentaje = (
    valor: number,
    minimo: number,
    maximo: number
  ) => {
    return Math.min(
      Math.max(((valor - minimo) / (maximo - minimo)) * 100, 0),
      100
    );
  };

  return (
    <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <div className="relative w-full  border-2 border-black">
              <img
                className="h-full w-full object-cover"
                src="https://img.freepik.com/fotos-premium/tallo-unico-esparragos-verdes-aislado-trazado-recorte_106885-3525.jpg"
                alt="Espárrago"
              />
              <Badge className="absolute top-2 left-2 bg-green-500 text-white">
                Espárrago 90%
              </Badge>
            </div>
          </div>
          <div className="p-8 w-full">
            <div className="uppercase tracking-wide text-sm text-green-500 font-semibold mb-1">
              Análisis de Calidad
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Espárrago Verde
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Ruler className="mr-2" size={20} /> Altura
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-gray-900 mb-2">
                    {altura} mm
                  </div>
                  <Progress
                    value={calcularPorcentaje(
                      altura,
                      alturaMinima,
                      alturaMinima * 1.5
                    )}
                    className="h-2"
                  />
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Circle className="mr-2" size={20} /> Calibre
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-gray-900 mb-2">
                    {calibre} mm
                  </div>
                  <Progress
                    value={calcularPorcentaje(
                      calibre,
                      calibreMinimo,
                      calibreMinimo * 1.5
                    )}
                    className="h-2"
                  />
                </CardContent>
              </Card>
            </div>
            <Card className="mt-6">
              <CardContent className="flex items-center justify-between p-4">
                <div className="flex items-center">
                  {cumpleRequisitos ? (
                    <CheckCircle className="text-green-500 mr-2" size={24} />
                  ) : (
                    <XCircle className="text-red-500 mr-2" size={24} />
                  )}
                  <span className="font-semibold text-lg">
                    {cumpleRequisitos ? "APROBADO" : "NO APROBADO"}
                  </span>
                </div>
                <Badge
                  className={
                    cumpleRequisitos
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }
                >
                  {cumpleRequisitos
                    ? "Cumple estándares"
                    : "No cumple estándares"}
                </Badge>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
