import { useState } from 'react';

import Button from '@/components/Button/index';
import Card from '@/components/Card/index';
import Content from '@/components/Content/index';
import Meta from '@/components/Meta/index';
import { AccountLayout } from '@/layouts/index';

const Billing = () => {
  const [creditos] = useState(100);
  const [historial] = useState([
    {
      id: 1,
      fecha: '2024-01-15',
      descripcion: 'Compra de créditos',
      monto: '+50',
      tipo: 'compra'
    },
    {
      id: 2,
      fecha: '2024-01-10',
      descripcion: 'Solicitud de personal - Maestro de Obra',
      monto: '-5',
      tipo: 'uso'
    },
    {
      id: 3,
      fecha: '2024-01-08',
      descripcion: 'Solicitud de personal - Ayudante',
      monto: '-3',
      tipo: 'uso'
    },
    {
      id: 4,
      fecha: '2024-01-05',
      descripcion: 'Compra de créditos',
      monto: '+30',
      tipo: 'compra'
    }
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
                {creditos}
              </div>
              <p className="text-gray-600 mb-4">créditos disponibles</p>
              <Button variant="primary">
                Comprar Créditos
              </Button>
            </div>
          </Card>

          {/* Información de Precios */}
          <Card>
            <Card.Body title="Precios de Créditos" />
            <div className="p-6 space-y-3">
              <div className="flex justify-between items-center">
                <span>10 créditos</span>
                <span className="font-bold">$5.000</span>
              </div>
              <div className="flex justify-between items-center">
                <span>50 créditos</span>
                <span className="font-bold">$20.000</span>
              </div>
              <div className="flex justify-between items-center">
                <span>100 créditos</span>
                <span className="font-bold">$35.000</span>
              </div>
              <div className="flex justify-between items-center border-t pt-3">
                <span className="font-bold">200 créditos</span>
                <span className="font-bold text-brand-orange">$60.000</span>
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
                  <tr key={transaccion.id} className="bg-white border-b hover:bg-gray-50">
                    <td className="px-6 py-4">{transaccion.fecha}</td>
                    <td className="px-6 py-4">{transaccion.descripcion}</td>
                    <td className={`px-6 py-4 font-medium ${getMontoColor(transaccion.tipo)}`}>
                      {getMontoSigno(transaccion.tipo)}{transaccion.monto} créditos
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