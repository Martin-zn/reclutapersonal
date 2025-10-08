import { useState } from 'react';

import Button from '@/components/Button/index';
import Card from '@/components/Card/index';
import Content from '@/components/Content/index';
import Meta from '@/components/Meta/index';
import { AccountLayout } from '@/layouts/index';

const Billing = () => {
  const [saldo] = useState(100000);
  const [historial] = useState([
    {
      id: 1,
      fecha: '2024-01-15',
      descripcion: 'Depósito',
      monto: '+50000',
      tipo: 'compra',
    },
    {
      id: 2,
      fecha: '2024-01-10',
      descripcion: 'Solicitud de personal - Maestro de Obra',
      monto: '5000',
      tipo: 'uso',
    },
    {
      id: 3,
      fecha: '2024-01-08',
      descripcion: 'Solicitud de personal - Ayudante',
      monto: '3000',
      tipo: 'uso',
    },
    {
      id: 4,
      fecha: '2024-01-05',
      descripcion: 'Depósito',
      monto: '+30000',
      tipo: 'compra',
    },
  ]);

  const getMontoColor = (tipo) => {
    return tipo === 'compra' ? 'text-green-600' : 'text-red-600';
  };

  const getMontoSigno = (tipo) => {
    return tipo === 'compra' ? '+' : '-';
  };

  return (
    <AccountLayout>
      <Meta title="reclutapersonal - Créditos" />
      <Content.Title
        title="Mis Créditos"
        subtitle="Gestiona tus créditos y revisa el historial de transacciones"
      />
      <Content.Divider />
      <Content.Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Saldo de Créditos */}
          <Card>
            <Card.Body title="Saldo Actual" />
            <div className="p-6 text-center">
              <div className="text-4xl font-bold text-brand-blue mb-2">
                ${new Intl.NumberFormat('es-CL').format(saldo)}
              </div>
              <p className="text-gray-600 mb-4">pesos disponibles</p>
            </div>
          </Card>
          <Card>
            <Card.Body title="Acciones" />
            <div className="p-6 text-center">
              <div className="space-y-4">
                <Button variant="primary" className="w-full">
                  Depositar
                </Button>
                <Button variant="secondary" className="w-full">
                  Retirar
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Historial de Transacciones */}
        <Card>
          <Card.Body title="Historial de Transacciones" />
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th className="px-6 py-3">Fecha</th>
                  <th className="px-6 py-3">Descripción</th>
                  <th className="px-6 py-3">Monto</th>
                </tr>
              </thead>
              <tbody>
                {historial.map((transaccion) => (
                  <tr
                    key={transaccion.id}
                    className="bg-white border-b hover:bg-gray-50"
                  >
                    <td className="px-6 py-4">{transaccion.fecha}</td>
                    <td className="px-6 py-4">{transaccion.descripcion}</td>
                    <td
                      className={`px-6 py-4 font-medium ${getMontoColor(
                        transaccion.tipo
                      )}`}
                    >
                      {getMontoSigno(transaccion.tipo)}$
                      {new Intl.NumberFormat('es-CL').format(transaccion.monto)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </Content.Container>
    </AccountLayout>
  );
};

export default Billing;
