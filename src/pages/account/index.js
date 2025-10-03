import { useState } from 'react';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';

import Button from '@/components/Button/index';
import Card from '@/components/Card/index';
import Content from '@/components/Content/index';
import Meta from '@/components/Meta/index';
import { AccountLayout } from '@/layouts/index';
import { useTranslation } from 'react-i18next';

const Welcome = () => {
  const { t } = useTranslation();

  return (
    <AccountLayout>
      <Meta title="reclutapersonal - Dashboard" />
      <Content.Title
        title="Estado de tu cuenta"
        subtitle="Resumen de tu actividad"
      />
      <Content.Divider />
      <Content.Container>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          <Card>
            <Card.Body title="Solicitudes pendientes" />
            <Card.Footer>
              <span className="text-2xl text-center font-bold text-brand-orange w-full">
                2
              </span>
            </Card.Footer>
          </Card>

          <Card>
            <Card.Body title="Solicitudes ok" />
            <Card.Footer>
              <span className="text-2xl text-center font-bold text-green-600 w-full">
                4
              </span>
            </Card.Footer>
          </Card>

          <Card>
            <Card.Body title="Créditos" />
            <Card.Footer>
              <span className="text-2xl text-center font-bold text-brand-blue w-full">
                100
              </span>
            </Card.Footer>
          </Card>
        </div>
      </Content.Container>
    </AccountLayout>
  );
};

export default Welcome;
