import { useState } from 'react';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';

import Button from '@/components/Button/index';
import Card from '@/components/Card/index';
import Content from '@/components/Content/index';
import Meta from '@/components/Meta/index';
import { AccountLayout } from '@/layouts/index';

const NuevaSolicitud = () => {
  const router = useRouter();
  const [isSubmitting, setSubmittingState] = useState(false);
  const [formData, setFormData] = useState({
    especialidad: '',
    cantidad: '',
    fechaInicio: '',
    fechaFin: '',
    ubicacion: '',
    proyecto: '',
    empresa: '',
    contacto: '',
    telefono: '',
    email: '',
    requisitos: '',
    observaciones: ''
  });

  const especialidades = [
    'Maestro Eléctrico',
    'Maestro Gasfíter',
    'Maestro Albañil',
    'Carpintero',
    'Soldador',
    'Pintor',
    'Ceramista',
    'Yesero',
    'Operador de Maquinaria Pesada',
    'Maestro de Obra'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmittingState(true);

    // Simular envío
    setTimeout(() => {
      setSubmittingState(false);
      toast.success('Solicitud enviada correctamente');
      router.push('/account/solicitudes');
    }, 2000);
  };

  return (
    <AccountLayout>
      <Meta title="reclutapersonal - Nueva Solicitud" />
      <Content.Title
        title="Nueva Solicitud de Mano de Obra"
        subtitle="Solicita personal especializado para tu proyecto de construcción"
      />
      <Content.Divider />
      <Content.Container>
        <Card>
          <form onSubmit={handleSubmit}>
            <Card.Body title="Información del Personal" />
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Especialidad Requerida *
                  </label>
                  <select
                    name="especialidad"
                    value={formData.especialidad}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-orange"
                  >
                    <option value="">Selecciona una especialidad</option>
                    {especialidades.map((esp) => (
                      <option key={esp} value={esp}>
                        {esp}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Cantidad de Personal *
                  </label>
                  <input
                    type="number"
                    name="cantidad"
                    value={formData.cantidad}
                    onChange={handleInputChange}
                    required
                    min="1"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-orange"
                    placeholder="Ej: 10"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Fecha de Inicio *
                  </label>
                  <input
                    type="date"
                    name="fechaInicio"
                    value={formData.fechaInicio}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-orange"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Fecha de Fin *
                  </label>
                  <input
                    type="date"
                    name="fechaFin"
                    value={formData.fechaFin}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-orange"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ubicación del Proyecto *
                  </label>
                  <input
                    type="text"
                    name="ubicacion"
                    value={formData.ubicacion}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-orange"
                    placeholder="Ej: Santiago Centro"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Empresa Solicitante *
                  </label>
                  <input
                    type="text"
                    name="empresa"
                    value={formData.empresa}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-orange"
                    placeholder="Nombre de la empresa"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre de Contacto *
                  </label>
                  <input
                    type="text"
                    name="contacto"
                    value={formData.contacto}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-orange"
                    placeholder="Nombre del responsable"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Teléfono de Contacto *
                  </label>
                  <input
                    type="tel"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-orange"
                    placeholder="+56 9 1234 5678"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email de Contacto *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-orange"
                    placeholder="email@ejemplo.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Proyecto *
                  </label>
                  <input
                    type="text"
                    name="proyecto"
                    value={formData.proyecto}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-orange"
                    placeholder="Nombre del proyecto o obra"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Requisitos Específicos
                </label>
                <textarea
                  name="requisitos"
                  value={formData.requisitos}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-orange"
                  placeholder="Requisitos específicos para el personal (experiencia, certificaciones, etc.)"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Observaciones Adicionales
                </label>
                <textarea
                  name="observaciones"
                  value={formData.observaciones}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-orange"
                  placeholder="Información adicional sobre la solicitud..."
                />
              </div>
            </div>
            <Card.Footer>
              <div className="flex space-x-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Enviando...' : 'Enviar Solicitud'}
                </Button>
              </div>
            </Card.Footer>
          </form>
        </Card>
      </Content.Container>
    </AccountLayout>
  );
};

export default NuevaSolicitud;
