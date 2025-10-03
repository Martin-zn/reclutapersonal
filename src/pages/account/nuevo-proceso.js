import { useState } from 'react';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';

import Button from '@/components/Button/index';
import Card from '@/components/Card/index';
import Content from '@/components/Content/index';
import Meta from '@/components/Meta/index';
import { AccountLayout } from '@/layouts/index';

const NuevoProceso = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [formData, setFormData] = useState({
    // Datos básicos

    titulo: '',
    descripcion: '',
    cantidadTrabajadores: '',
    salario: '',
    ciudad: '',
    comuna: '',
    direccion: '',
    requisitos: '',
    beneficios: '',
    tipoContrato: '',
    horario: '',
    fechaInicio: '',
    // Filtros personalizados
    filtros: [],
  });

  const handleAddFilter = () => {
    setFormData((prevState) => ({
      ...prevState,
      filtros: [...prevState.filtros, { tipo: '', valor: '' }],
    }));
  };

  const handleFilterChange = (index, field, value) => {
    const newFiltros = [...formData.filtros];
    newFiltros[index][field] = value;
    setFormData((prevState) => ({
      ...prevState,
      filtros: newFiltros,
    }));
  };

  const handleRemoveFilter = (index) => {
    setFormData((prevState) => ({
      ...prevState,
      filtros: prevState.filtros.filter((_, i) => i !== index),
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const isFormValid = () => {
    return (
      formData.titulo &&
      formData.descripcion &&
      formData.cantidadTrabajadores &&
      formData.salario &&
      formData.ciudad &&
      formData.comuna &&
      formData.direccion
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid()) return;
    setShowConfirmModal(true);
  };

  const handleConfirmCreate = async () => {
    setIsSubmitting(true);
    try {
      // Simulación de llamada a API
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const response = { status: 200 }; // Simulación de respuesta exitosa

      if (response.status === 200) {
        toast.success(
          'Proceso creado con éxito. Te notificaremos cuando los candidatos confirmen su asistencia.'
        );
        router.push('/account/procesos');
      } else {
        throw new Error('Error al crear el proceso');
      }
    } catch (error) {
      toast.error(
        'Hubo un error al crear el proceso. Por favor, intenta nuevamente.'
      );
    } finally {
      setIsSubmitting(false);
      setShowConfirmModal(false);
    }
  };

  return (
    <AccountLayout>
      <Meta title="Nuevo Proceso" />
      <Content.Title
        title="Nuevo Proceso"
        subtitle="Crea un nuevo proceso de reclutamiento"
      />
      <Content.Divider />
      <Content.Container>
        <Card>
          <form onSubmit={handleSubmit}>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Título del Proceso *
                  </label>
                  <input
                    type="text"
                    name="titulo"
                    value={formData.titulo}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-orange"
                    placeholder="Ej: Operarios de Construcción"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Cantidad de Trabajadores *
                  </label>
                  <input
                    type="number"
                    name="cantidadTrabajadores"
                    value={formData.cantidadTrabajadores}
                    onChange={handleInputChange}
                    required
                    min="1"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-orange"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Descripción del Trabajo *
                </label>
                <textarea
                  name="descripcion"
                  value={formData.descripcion}
                  onChange={handleInputChange}
                  required
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-orange"
                  placeholder="Describe las responsabilidades y tareas principales"
                />
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Salario *
                  </label>
                  <input
                    type="text"
                    name="salario"
                    value={formData.salario}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-orange"
                    placeholder="Ej: $500.000 - $700.000"
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Ciudad *
                    </label>
                    <input
                      type="text"
                      name="ciudad"
                      value={formData.ciudad}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-orange"
                      placeholder="Ej: Santiago"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Comuna *
                    </label>
                    <input
                      type="text"
                      name="comuna"
                      value={formData.comuna}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-orange"
                      placeholder="Ej: Las Condes"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Dirección General *
                    </label>
                    <input
                      type="text"
                      name="direccion"
                      value={formData.direccion}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-orange"
                      placeholder="Ej: Av. Apoquindo 1234"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tipo de Contrato
                  </label>
                  <select
                    name="tipoContrato"
                    value={formData.tipoContrato}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-orange"
                  >
                    <option value="">Seleccionar</option>
                    <option value="indefinido">Indefinido</option>
                    <option value="plazoFijo">Plazo Fijo</option>
                    <option value="porObra">Por Obra</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Fecha de Inicio
                  </label>
                  <input
                    type="date"
                    name="fechaInicio"
                    value={formData.fechaInicio}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-orange"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Horario de Trabajo
                </label>
                <input
                  type="text"
                  name="horario"
                  value={formData.horario}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-orange"
                  placeholder="Ej: Lunes a Viernes 8:00 - 18:00"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Requisitos
                </label>
                <textarea
                  name="requisitos"
                  value={formData.requisitos}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-orange"
                  placeholder="Requisitos específicos para el puesto"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Beneficios
                </label>
                <textarea
                  name="beneficios"
                  value={formData.beneficios}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-orange"
                  placeholder="Beneficios adicionales del trabajo"
                />
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Filtros Personalizados
                </h3>
                {formData.filtros.map((filtro, index) => (
                  <div key={index} className="flex items-center gap-4 mb-4">
                    <div className="flex-1">
                      <input
                        type="text"
                        value={filtro.tipo}
                        onChange={(e) =>
                          handleFilterChange(index, 'tipo', e.target.value)
                        }
                        placeholder="Tipo de filtro (ej: distancia, edad)"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-orange"
                      />
                    </div>
                    <div className="flex-1">
                      <input
                        type="text"
                        value={filtro.valor}
                        onChange={(e) =>
                          handleFilterChange(index, 'valor', e.target.value)
                        }
                        placeholder="Valor del filtro"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-orange"
                      />
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => handleRemoveFilter(index)}
                      className="px-3 py-2"
                    >
                      Eliminar
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleAddFilter}
                  className="mt-2"
                >
                  Agregar Filtro
                </Button>
              </div>
            </div>
            <Card.Footer>
              <div className="flex justify-end space-x-3">
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
                  disabled={!isFormValid() || isSubmitting}
                >
                  Crear Proceso
                </Button>
              </div>
            </Card.Footer>
          </form>
        </Card>
      </Content.Container>

      {/* Modal de Confirmación */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center  z-50">
          <div className="bg-white rounded-lg w-full max-w-2xl p-6">
            <h3 className="text-lg font-bold mb-4">
              Confirmar Creación de Proceso
            </h3>

            <div className="mb-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-semibold">Título:</p>
                  <p>{formData.titulo}</p>
                </div>
                <div>
                  <p className="font-semibold">Cantidad de Trabajadores:</p>
                  <p>{formData.cantidadTrabajadores}</p>
                </div>
                <div>
                  <p className="font-semibold">Ubicación:</p>
                  <p>{formData.ubicacion}</p>
                </div>
                <div>
                  <p className="font-semibold">Salario:</p>
                  <p>{formData.salario}</p>
                </div>
                <div>
                  <p className="font-semibold">Tipo de Contrato:</p>
                  <p>{formData.tipoContrato || 'No especificado'}</p>
                </div>
                <div>
                  <p className="font-semibold">Fecha de Inicio:</p>
                  <p>{formData.fechaInicio || 'No especificada'}</p>
                </div>
              </div>

              <div>
                <p className="font-semibold">Descripción:</p>
                <p>{formData.descripcion}</p>
              </div>

              {formData.requisitos && (
                <div>
                  <p className="font-semibold">Requisitos:</p>
                  <p>{formData.requisitos}</p>
                </div>
              )}

              {formData.beneficios && (
                <div>
                  <p className="font-semibold">Beneficios:</p>
                  <p>{formData.beneficios}</p>
                </div>
              )}
            </div>

            <div className="border-t pt-4 mb-6">
              <p className="font-semibold text-lg">Costo del Servicio:</p>
              <p>
                El costo por cada trabajador reclutado y confirmado será de
                $12.390 CLP.
              </p>
              <p className="text-sm text-gray-600 mt-1">
                Total estimado: $
                {(formData.cantidadTrabajadores * 12390).toLocaleString(
                  'es-CL'
                )}{' '}
                CLP
              </p>
            </div>

            <div className="flex justify-end space-x-3">
              <Button
                variant="outline"
                onClick={() => setShowConfirmModal(false)}
                disabled={isSubmitting}
              >
                Cancelar
              </Button>
              <Button
                variant="primary"
                onClick={handleConfirmCreate}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Creando...' : 'Crear'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </AccountLayout>
  );
};

export default NuevoProceso;
