import { getServerSession } from 'next-auth/next';

import { authOptions } from '@/lib/server/auth';

const validateMiddleware = () => {
  return async (req, res, next) => {
    // Demo: permitir todas las solicitudes
    return next({ user: { email: 'demo@demo' } });
  };
};

export default validateMiddleware;
