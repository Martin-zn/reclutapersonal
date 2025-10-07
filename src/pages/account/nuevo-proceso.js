import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';

const especialidades = [
  'Jornal',
  'Pintor',
  'Electricista',
  'Gasfíter',
  'Carpintero',
  'Albañil',
  'Ceramista',
  'Soldador',
  'Yesero',
  'Operador de Maquinaria',
];

const regiones = [
  {
    name: 'Arica y Parinacota',
    communes: ['Arica', 'Camarones', 'Putre', 'General Lagos'],
  },
  {
    name: 'Tarapacá',
    communes: ['Iquique', 'Alto Hospicio', 'Pozo Almonte', 'Pica'],
  },
  {
    name: 'Antofagasta',
    communes: ['Antofagasta', 'Calama', 'Tocopilla', 'San Pedro de Atacama'],
  },
  {
    name: 'Atacama',
    communes: ['Copiapó', 'Caldera', 'Vallenar', 'Chañaral'],
  },
  {
    name: 'Coquimbo',
    communes: ['La Serena', 'Coquimbo', 'Ovalle', 'Illapel'],
  },
  {
    name: 'Valparaíso',
    communes: ['Valparaíso', 'Viña del Mar', 'Quillota', 'San Antonio'],
  },
  {
    name: 'Metropolitana de Santiago',
    communes: ['Santiago', 'Puente Alto', 'Maipú', 'Las Condes'],
  },
  {
    name: "Libertador General Bernardo O'Higgins",
    communes: ['Rancagua', 'San Fernando', 'Santa Cruz', 'Rengo'],
  },
  {
    name: 'Maule',
    communes: ['Talca', 'Curicó', 'Linares', 'Constitución'],
  },
  {
    name: 'Ñuble',
    communes: ['Chillán', 'San Carlos', 'Coihueco', 'Bulnes'],
  },
  {
    name: 'Biobío',
    communes: ['Concepción', 'Los Ángeles', 'Coronel', 'Lota'],
  },
  {
    name: 'La Araucanía',
    communes: ['Temuco', 'Villarrica', 'Angol', 'Pucón'],
  },
  {
    name: 'Los Ríos',
    communes: ['Valdivia', 'La Unión', 'Panguipulli', 'Río Bueno'],
  },
  {
    name: 'Los Lagos',
    communes: ['Puerto Montt', 'Osorno', 'Castro', 'Ancud'],
  },
  {
    name: 'Aysén del General Carlos Ibáñez del Campo',
    communes: ['Coyhaique', 'Aysén', 'Chile Chico', 'Cochrane'],
  },
  {
    name: 'Magallanes y de la Antártica Chilena',
    communes: ['Punta Arenas', 'Puerto Natales', 'Porvenir', 'Cabo de Hornos'],
  },
];

// Resto de regiones omitidas por brevedad

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
    especialidad: '',
    salarioMin: '',
    salarioMax: '',
    region: '',
    comuna: '',
    direccion: '',
    tipoContrato: '',
    horarioInicio: '',
    horarioFin: '',
    requisitos: [],
    beneficios: [],
  });

  const requisitosOpciones = [
    'Edad mínima: 18 años',
    'Edad máxima: 50 años',
    'Experiencia mínima: 1 año',
    'Experiencia mínima: 2 años',
    'Experiencia mínima: 3 años',
    'Experiencia mínima: 5 años',
    'Disponibilidad para viajar',
    'Disponibilidad para trabajar en turnos',
    'Licencia de conducir clase B',
    'Residencia en la zona',
    'Manejo de herramientas específicas',
    'Certificaciones vigentes',
    'Trabajo en altura',
    'Trabajo en espacios confinados'
  ];

  const beneficiosOpciones = [
    'Seguro de salud complementario',
    'Seguro de vida',
    'Aguinaldo',
    'Bono de producción',
    'Bono de asistencia',
    'Alimentación',
    'Transporte',
    'Uniforme',
    'Capacitación',
    'Posibilidad de desarrollo',
    'Estacionamiento',
    'Gimnasio',
    'Días administrativos',
    'Horario flexible'
  ];

  const agregarRequisito = (requisito) => {
    if (requisito && !formData.requisitos.includes(requisito)) {
      setFormData({
        ...formData,
        requisitos: [...formData.requisitos, requisito]
      });
    }
  };

  const eliminarRequisito = (index) => {
    setFormData({
      ...formData,
      requisitos: formData.requisitos.filter((_, i) => i !== index),
    });
  };

  const agregarBeneficio = (beneficio) => {
    if (beneficio && !formData.beneficios.includes(beneficio)) {
      setFormData({
        ...formData,
        beneficios: [...formData.beneficios, beneficio]
      });
    }
  };

  const eliminarBeneficio = (index) => {
    setFormData({
      ...formData,
      beneficios: formData.beneficios.filter((_, i) => i !== index),
    });
  };

  const [comunasDisponibles, setComunasDisponibles] = useState([]);

  useEffect(() => {
    if (formData.region) {
      const regionSeleccionada = regiones.find(
        (r) => r.name === formData.region
      );
      if (regionSeleccionada) {
        setComunasDisponibles(regionSeleccionada.communes);
      }
    } else {
      setComunasDisponibles([]);
    }
  }, [formData.region]);

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
      formData.especialidad &&
      formData.salarioMin &&
      formData.salarioMax &&
      formData.region &&
      formData.comuna &&
      formData.direccion &&
      formData.horarioInicio &&
      formData.horarioFin
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar campos requeridos
    if (
      !formData.titulo ||
      !formData.descripcion ||
      !formData.cantidadTrabajadores ||
      !formData.especialidad ||
      !formData.salarioMin ||
      !formData.salarioMax ||
      !formData.tipoContrato ||
      !formData.horarioInicio ||
      !formData.horarioFin ||
      !formData.region ||
      !formData.comuna ||
      !formData.direccion ||
      formData.requisitos.length === 0 ||
      formData.beneficios.length === 0
    ) {
      alert('Por favor, complete todos los campos requeridos');
      return;
    }

    // Validar que el salario máximo sea mayor que el mínimo
    if (Number(formData.salarioMax) <= Number(formData.salarioMin)) {
      alert('El salario máximo debe ser mayor que el salario mínimo');
      return;
    }

    // Validar que la hora de término sea posterior a la hora de inicio
    if (formData.horarioFin <= formData.horarioInicio) {
      alert('La hora de término debe ser posterior a la hora de inicio');
      return;
    }

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
              <div className="space-y-6">
                <div>
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

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Especialidad *
                    </label>
                    <select
                      name="especialidad"
                      value={formData.especialidad}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-orange"
                    >
                      <option value="">Seleccionar especialidad</option>
                      {especialidades.map((esp) => (
                        <option key={esp} value={esp}>
                          {esp}
                        </option>
                      ))}
                    </select>
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
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Descripción de la oferta *
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
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Salario Mínimo *
                    </label>
                    <input
                      type="number"
                      name="salarioMin"
                      value={formData.salarioMin}
                      onChange={handleInputChange}
                      required
                      min="0"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-orange"
                      placeholder="Ej: 500000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Salario Máximo *
                    </label>
                    <input
                      type="number"
                      name="salarioMax"
                      value={formData.salarioMax}
                      onChange={handleInputChange}
                      required
                      min="0"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-orange"
                      placeholder="Ej: 700000"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Región *
                    </label>
                    <select
                      name="region"
                      value={formData.region}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-orange"
                    >
                      <option value="">Seleccionar región</option>
                      {regiones.map((region) => (
                        <option key={region.name} value={region.name}>
                          {region.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Comuna *
                    </label>
                    <select
                      name="comuna"
                      value={formData.comuna}
                      onChange={handleInputChange}
                      required
                      disabled={!formData.region}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-orange"
                    >
                      <option value="">Seleccionar comuna</option>
                      {comunasDisponibles.map((comuna) => (
                        <option key={comuna} value={comuna}>
                          {comuna}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
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

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tipo de Contrato *
                  </label>
                  <select
                    name="tipoContrato"
                    value={formData.tipoContrato}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-orange"
                  >
                    <option value="">Seleccionar</option>
                    <option value="indefinido">Indefinido</option>
                    <option value="plazoFijo">Plazo Fijo</option>
                    <option value="porObra">Por Obra</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Hora de Inicio *
                    </label>
                    <input
                      type="time"
                      name="horarioInicio"
                      value={formData.horarioInicio}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-orange"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Hora de Término *
                    </label>
                    <input
                      type="time"
                      name="horarioFin"
                      value={formData.horarioFin}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-orange"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Requisitos *
                  </label>
                  <div className="space-y-4">
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-orange"
                      onChange={(e) => agregarRequisito(e.target.value)}
                      value=""
                    >
                      <option value="">Seleccionar requisito</option>
                      {requisitosOpciones.map((requisito) => (
                        <option key={requisito} value={requisito}>
                          {requisito}
                        </option>
                      ))}
                    </select>
                    <div className="space-y-2">
                      {formData.requisitos.map((requisito, index) => (
                        <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded-md">
                          <span className="flex-1">{requisito}</span>
                          <button
                            type="button"
                            onClick={() => eliminarRequisito(index)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Beneficios *
                  </label>
                  <div className="space-y-4">
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-orange"
                      onChange={(e) => agregarBeneficio(e.target.value)}
                      value=""
                    >
                      <option value="">Seleccionar beneficio</option>
                      {beneficiosOpciones.map((beneficio) => (
                        <option key={beneficio} value={beneficio}>
                          {beneficio}
                        </option>
                      ))}
                    </select>
                    <div className="space-y-2">
                      {formData.beneficios.map((beneficio, index) => (
                        <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded-md">
                          <span className="flex-1">{beneficio}</span>
                          <button
                            type="button"
                            onClick={() => eliminarBeneficio(index)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
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
                  <p className="font-semibold">Especialidad:</p>
                  <p>{formData.especialidad}</p>
                </div>
                <div>
                  <p className="font-semibold">Cantidad de Trabajadores:</p>
                  <p>{formData.cantidadTrabajadores}</p>
                </div>
                <div>
                  <p className="font-semibold">Salario:</p>
                  <p>
                    ${formData.salarioMin.toLocaleString()} - $
                    {formData.salarioMax.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="font-semibold">Ubicación:</p>
                  <p>
                    {formData.region}, {formData.comuna}
                  </p>
                </div>
                <div>
                  <p className="font-semibold">Dirección:</p>
                  <p>{formData.direccion}</p>
                </div>
                <div>
                  <p className="font-semibold">Tipo de Contrato:</p>
                  <p>{formData.tipoContrato}</p>
                </div>
                <div>
                  <p className="font-semibold">Horario:</p>
                  <p>
                    {formData.horarioInicio} - {formData.horarioFin}
                  </p>
                </div>
              </div>

              <div>
                <p className="font-semibold">Descripción:</p>
                <p>{formData.descripcion}</p>
              </div>

              <div>
                <p className="font-semibold">Requisitos:</p>
                <ul className="list-disc list-inside ml-4">
                  {formData.requisitos.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="font-semibold">Beneficios:</p>
                <ul className="list-disc list-inside ml-4">
                  {formData.beneficios.map((ben, index) => (
                    <li key={index}>{ben}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <p className="font-semibold">Requisitos:</p>
              <ul className="list-disc list-inside ml-4">
                {formData.requisitos.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </div>

            <div>
              <p className="font-semibold">Beneficios:</p>
              <ul className="list-disc list-inside ml-4">
                {formData.beneficios.map((ben, index) => (
                  <li key={index}>{ben}</li>
                ))}
              </ul>
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
