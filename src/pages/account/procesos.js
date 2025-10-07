import { useState } from 'react';
import { useRouter } from 'next/router';
import { EyeIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

import Button from '@/components/Button/index';
import Card from '@/components/Card/index';
import Content from '@/components/Content/index';
import Meta from '@/components/Meta/index';
import { AccountLayout } from '@/layouts/index';

const Procesos = () => {
  const router = useRouter();

  // Estado inicial de demostración - ordenado por fecha de más reciente a más antiguo
  const [procesos] = useState([
    {
      id: 1,
      titulo: 'Operarios de Construcción',
      cantidadTrabajadores: 5,
      ubicacion: 'Santiago, RM',
      salario: '$500.000 - $700.000',
      estado: 'Activo',
      fechaCreacion: '2025-09-20',
      postulantes: 2,
      candidatos: [
        {
          nombre: 'Juan Pérez',
          telefono: '+56 9 1234 5678',
          email: 'juan.perez@email.com',
          cv: 'https://example.com/cv/juan-perez.pdf',
        },
        {
          nombre: 'María González',
          telefono: '+56 9 8765 4321',
          email: 'maria.gonzalez@email.com',
          cv: 'https://example.com/cv/maria-gonzalez.pdf',
        },
      ],
    },
    {
      id: 2,
      titulo: 'Maestros Pintores',
      cantidadTrabajadores: 3,
      ubicacion: 'Valparaíso',
      salario: '$450.000 - $600.000',
      estado: 'En Revisión',
      fechaCreacion: '2025-10-01',
      postulantes: 1,
      candidatos: [
        {
          nombre: 'Pedro Soto',
          telefono: '+56 9 2468 1357',
          email: 'pedro.soto@email.com',
          cv: null,
        },
      ],
    },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [procesoSeleccionado, setProcesoSeleccionado] = useState(null);

  const getEstadoColor = (estado) => {
    switch (estado) {
      case 'Activo':
        return 'bg-green-100 text-green-800';
      case 'En Revisión':
        return 'bg-yellow-100 text-yellow-800';
      case 'Finalizado':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const verProceso = (proceso) => {
    setProcesoSeleccionado(proceso);
    setModalVisible(true);
  };

  const editarProceso = (id) => {
    alert(`Editar proceso ${id}`);
  };

  const eliminarProceso = (id) => {
    alert(`Eliminar proceso ${id}`);
  };

  return (
    <AccountLayout>
      <Meta title="Procesos de Reclutamiento" />
      <Content.Title
        title="Procesos de Reclutamiento"
        subtitle="Gestiona tus procesos de reclutamiento"
      />
      <Content.Divider />
      <Content.Container>
        <Card>
          {procesos.length === 0 ? (
            <div className="p-6 text-center">
              <p className="text-gray-500 mb-4">
                No hay procesos de reclutamiento creados.
              </p>
              <Button
                variant="primary"
                onClick={() => router.push('/account/nuevo-proceso')}
              >
                Crear Nuevo Proceso
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Título
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Trabajadores
                    </th>

                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Salario
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Estado
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Postulantes
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Fecha
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {procesos.map((proceso) => (
                    <tr key={proceso.id}>
                      <td className="px-4 py-2 text-sm">{proceso.titulo}</td>
                      <td className="px-4 py-2 text-sm">
                        {proceso.cantidadTrabajadores}
                      </td>
                      <td className="px-4 py-2 text-sm">{proceso.salario}</td>
                      <td className="px-4 py-2 text-sm">
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${getEstadoColor(
                            proceso.estado
                          )}`}
                        >
                          {proceso.estado}
                        </span>
                      </td>
                      <td className="px-4 py-2 text-sm">
                        {proceso.postulantes}
                      </td>
                      <td className="px-4 py-2 text-sm">
                        {proceso.fechaCreacion}
                      </td>
                      <td className="px-4 py-2 text-sm">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => verProceso(proceso)}
                            className="text-blue-600 hover:text-blue-800"
                            title="Ver proceso"
                          >
                            <EyeIcon className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => editarProceso(proceso.id)}
                            className="text-yellow-600 hover:text-yellow-800"
                            title="Editar proceso"
                          >
                            <PencilIcon className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => eliminarProceso(proceso.id)}
                            className="text-red-600 hover:text-red-800"
                            title="Eliminar proceso"
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
          )}
        </Card>
      </Content.Container>

      {/* Modal de Detalles del Proceso */}
      {modalVisible && procesoSeleccionado && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-2xl">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">
                  {procesoSeleccionado.titulo}
                </h3>
                <span
                  className={`px-2 py-1 rounded-full ${getEstadoColor(
                    procesoSeleccionado.estado
                  )}`}
                >
                  {procesoSeleccionado.estado}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="font-semibold">Cantidad de Trabajadores:</p>
                  <p>{procesoSeleccionado.cantidadTrabajadores}</p>
                </div>
                <div>
                  <p className="font-semibold">Ubicación:</p>
                  <p>{procesoSeleccionado.ubicacion}</p>
                </div>
                <div>
                  <p className="font-semibold">Salario:</p>
                  <p>{procesoSeleccionado.salario}</p>
                </div>
                <div>
                  <p className="font-semibold">Fecha de Creación:</p>
                  <p>{procesoSeleccionado.fechaCreacion}</p>
                </div>
                <div>
                  <p className="font-semibold">Postulantes:</p>
                  <p>{procesoSeleccionado.postulantes}</p>
                </div>
                <div>
                  <p className="font-semibold">Créditos Utilizados:</p>
                  <p>{procesoSeleccionado.cantidadTrabajadores * 12390} CLP</p>
                </div>
              </div>

              {/* Listado de Candidatos */}
              <div className="mt-6">
                <h4 className="text-lg font-semibold mb-3">
                  Candidatos Reclutados
                </h4>
                <div className="bg-gray-50 rounded-lg p-4">
                  {procesoSeleccionado.postulantes > 0 ? (
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead>
                        <tr>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
                            Nombre
                          </th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
                            Teléfono
                          </th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
                            Email
                          </th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
                            CV
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {procesoSeleccionado.candidatos.map(
                          (candidato, index) => (
                            <tr key={index}>
                              <td className="px-4 py-2 text-sm">
                                {candidato.nombre}
                              </td>
                              <td className="px-4 py-2 text-sm">
                                {candidato.telefono}
                              </td>
                              <td className="px-4 py-2 text-sm">
                                {candidato.email}
                              </td>
                              <td className="px-4 py-2 text-sm">
                                {candidato.cv ? (
                                  <a
                                    href={candidato.cv}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:text-blue-800"
                                  >
                                    Ver CV
                                  </a>
                                ) : (
                                  <span className="text-gray-400">
                                    No disponible
                                  </span>
                                )}
                              </td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                  ) : (
                    <p className="text-gray-500 text-sm">
                      Aún no hay candidatos reclutados para este proceso.
                    </p>
                  )}
                </div>
              </div>

              <div className="flex justify-between mt-6">
                <Button
                  variant="outline"
                  onClick={() => setModalVisible(false)}
                >
                  Volver al listado
                </Button>
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

export default Procesos;
