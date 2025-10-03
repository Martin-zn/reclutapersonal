// Local stand-in for values formerly from '@prisma/client'
const InvitationStatus = { ACCEPTED: 'ACCEPTED' };
import { updateStatus } from '@/prisma/services/membership';

import { validateSession } from '@/config/api-validation';

const handler = async (req, res) => {
  const { method } = req;

  if (method === 'PUT') {
    await validateSession(req, res);
    const { memberId } = req.body;
    await updateStatus(memberId, InvitationStatus.ACCEPTED);
    res.status(200).json({ data: { updatedAt: new Date() } });
  } else {
    res
      .status(405)
      .json({ errors: { error: { msg: `${method} method unsupported` } } });
  }
};

export default handler;
