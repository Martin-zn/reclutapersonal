import { useState } from 'react';
import { EyeIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

import Button from '@/components/Button/index';
import Card from '@/components/Card/index';
import Content from '@/components/Content/index';
import Meta from '@/components/Meta/index';
import { AccountLayout } from '@/layouts/index';

const Solicitudes = () => {
  const [solicitudes] = useState([
    {
      id: 1,
      especialidad: 'Maestro Eléctrico',
      cantidad: 10,
      fechaInicio: '2026-01-15',
      fechaFin: '2026-03-15',
      ubicacion: 'Santiago Centro',
      proyecto: 'Torre Corporativa Santiago',
      empresa: 'Constructora ABC',
      contacto: 'Juan Pérez',
      telefono: '+56 9 1234 5678',
      email: 'juan@constructoraabc.cl',
      estado: 'Pendiente'
    },
    {
      id: 2,
      especialidad: 'Maestro Gasfíter',
      cantidad: 5,
      fechaInicio: '2026-02-01',
      fechaFin: '2026-04-30',
      ubicacion: 'Las Condes',
      proyecto: 'Edificio Residencial Los Alpes',
      empresa: 'Inmobiliaria XYZ',
      contacto: 'María González',
      telefono: '+56 9 2345 6789',
      email: 'maria@inmobiliariaxyz.cl',
      estado: 'Aprobada'
    },
    {
      id: 3,
      especialidad: 'Soldador',
      cantidad: 8,
      fechaInicio: '2026-03-01',
      fechaFin: '2026-06-30',
      ubicacion: 'Quilicura',
      proyecto: 'Planta Industrial Norte',
      empresa: 'Constructora DEF',
      contacto: 'Carlos Rodríguez',
      telefono: '+56 9 3456 7890',
      email: 'carlos@constructoradef.cl',
      estado: 'Rechazada'
    }
  ]);

  const getEstadoColor = (estado) => {
    switch (estado) {
      case 'Aprobada':
        return 'text-green-600 bg-green-100';
      case 'Pendiente':
        return 'text-yellow-600 bg-yellow-100';
      case 'Rechazada':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const [modalVisible, setModalVisible] = useState(false);
  const [solicitudSeleccionada, setSolicitudSeleccionada] = useState(null);

  const verSolicitud = (solicitud) => {
    setSolicitudSeleccionada(solicitud);
    setModalVisible(true);
  };

  const editarSolicitud = (id) => {
    alert(`Editar solicitud ${id}`);
  };

  const eliminarSolicitud = (id) => {
    if (confirm('¿Estás seguro de eliminar esta solicitud?')) {
      alert(`Eliminar solicitud ${id}`);
    }
  };

  return (
    <AccountLayout>
      <Meta title="reclutapersonal - Solicitudes" />
      <Content.Title
        title="Solicitudes de Personal"
        subtitle="Gestiona las solicitudes de personal para construcción"
      />
      <Content.Divider />
      <Content.Container>
        <Card>
          <Card.Body title="Lista de Solicitudes" />
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th className="px-6 py-3">ID</th>
                  <th className="px-6 py-3">Especialidad</th>
                  <th className="px-6 py-3">Cantidad</th>
                  <th className="px-6 py-3">Fecha Inicio</th>
                  <th className="px-6 py-3">Fecha Fin</th>
                  <th className="px-6 py-3">Ubicación</th>
                  <th className="px-6 py-3">Empresa</th>
                  <th className="px-6 py-3">Estado</th>
                  <th className="px-6 py-3">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {solicitudes.map((solicitud) => (
                  <tr key={solicitud.id} className="bg-white border-b hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">
                      #{solicitud.id}
                    </td>
                    <td className="px-6 py-4">{solicitud.especialidad}</td>
                    <td className="px-6 py-4">{solicitud.cantidad}</td>
                    <td className="px-6 py-4">{solicitud.fechaInicio}</td>
                    <td className="px-6 py-4">{solicitud.fechaFin}</td>
                    <td className="px-6 py-4">{solicitud.ubicacion}</td>
                    <td className="px-6 py-4">{solicitud.empresa}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getEstadoColor(solicitud.estado)}`}>
                        {solicitud.estado}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => verSolicitud(solicitud)}
                          className="text-blue-600 hover:text-blue-800"
                          title="Ver solicitud"
                        >
                          <EyeIcon className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => editarSolicitud(solicitud.id)}
                          className="text-yellow-600 hover:text-yellow-800"
                          title="Editar solicitud"
                        >
                          <PencilIcon className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => eliminarSolicitud(solicitud.id)}
                          className="text-red-600 hover:text-red-800"
                          title="Eliminar solicitud"
                        >
                          <TrashIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </Content.Container>

      {/* Modal de Detalles */}
      {modalVisible && solicitudSeleccionada && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-2xl">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4">Detalles de la Solicitud #{solicitudSeleccionada.id}</h2>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="font-semibold">Especialidad:</p>
                  <p>{solicitudSeleccionada.especialidad}</p>
                </div>
                <div>
                  <p className="font-semibold">Cantidad:</p>
                  <p>{solicitudSeleccionada.cantidad} personas</p>
                </div>
                <div>
                  <p className="font-semibold">Fecha de Inicio:</p>
                  <p>{solicitudSeleccionada.fechaInicio}</p>
                </div>
                <div>
                  <p className="font-semibold">Fecha de Fin:</p>
                  <p>{solicitudSeleccionada.fechaFin}</p>
                </div>
                <div>
                  <p className="font-semibold">Ubicación:</p>
                  <p>{solicitudSeleccionada.ubicacion}</p>
                </div>
                <div>
                  <p className="font-semibold">Proyecto:</p>
                  <p>{solicitudSeleccionada.proyecto}</p>
                </div>
                <div>
                  <p className="font-semibold">Empresa:</p>
                  <p>{solicitudSeleccionada.empresa}</p>
                </div>
                <div>
                  <p className="font-semibold">Estado:</p>
                  <p className={`inline-block px-2 py-1 rounded-full ${getEstadoColor(solicitudSeleccionada.estado)}`}>
                    {solicitudSeleccionada.estado}
                  </p>
                </div>
                <div>
                  <p className="font-semibold">Contacto:</p>
                  <p>{solicitudSeleccionada.contacto}</p>
                </div>
                <div>
                  <p className="font-semibold">Teléfono:</p>
                  <p>{solicitudSeleccionada.telefono}</p>
                </div>
                <div>
                  <p className="font-semibold">Email:</p>
                  <p>{solicitudSeleccionada.email}</p>
                </div>
              </div>

              <div className="flex justify-end">
                <Button
                  variant="primary"
                  onClick={() => setModalVisible(false)}
                >
                  Cerrar
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AccountLayout>
  );
};

export default Solicitudes;
