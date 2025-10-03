import { useState } from 'react';
import toast from 'react-hot-toast';

import Button from '@/components/Button/index';
import Card from '@/components/Card/index';
import Content from '@/components/Content/index';
import Meta from '@/components/Meta/index';
import { AccountLayout } from '@/layouts/index';

const Settings = () => {
  const [isSubmitting, setSubmittingState] = useState(false);
  const [formData, setFormData] = useState({
    nombre: 'Empresa Constructora',
    email: 'contacto@empresa.com',
    telefono: '+56 2 2345 6789',
    direccion: 'Av. Providencia 1234, Santiago',
    rut: '12.345.678-9'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittingState(true);

    setTimeout(() => {
      setSubmittingState(false);
      toast.success('Perfil actualizado correctamente');
    }, 2000);
  };

  return (
    <AccountLayout>
      <Meta title="reclutapersonal - Configuración" />
      <Content.Title
        title="Configuración de Perfil"
        subtitle="Gestiona la información de tu empresa"
      />
      <Content.Divider />
      <Content.Container>
        <Card>
          <form onSubmit={handleSubmit}>
            <Card.Body title="Información de la Empresa" />
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre de la Empresa *
                </label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-orange"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-orange"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Teléfono *
                  </label>
                  <input
                    type="tel"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-orange"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Dirección
                </label>
                <input
                  type="text"
                  name="direccion"
                  value={formData.direccion}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-orange"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  RUT
                </label>
                <input
                  type="text"
                  name="rut"
                  value={formData.rut}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-orange"
                  placeholder="12.345.678-9"
                />
              </div>
            </div>
            <Card.Footer>
              <Button
                type="submit"
                variant="primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Guardando...' : 'Guardar Cambios'}
              </Button>
            </Card.Footer>
          </form>
        </Card>
      </Content.Container>
    </AccountLayout>
  );
};

export default Settings;