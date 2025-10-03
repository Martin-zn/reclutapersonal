// Local stand-in for values formerly from '@prisma/client'
const TeamRole = { OWNER: 'OWNER', ADMIN: 'ADMIN', MEMBER: 'MEMBER' };

import { validateSession } from '@/config/api-validation';
import { getMember, toggleRole } from '@/prisma/services/membership';

const handler = async (req, res) => {
  const { method } = req;

  if (method === 'PUT') {
    await validateSession(req, res);
    const { memberId } = req.body;
    const member = getMember(memberId);
    await toggleRole(
      memberId,
      member.teamRole === TeamRole.MEMBER ? TeamRole.OWNER : TeamRole.MEMBER
    );
    res.status(200).json({ data: { updatedAt: new Date() } });
  } else {
    res
      .status(405)
      .json({ errors: { error: { msg: `${method} method unsupported` } } });
  }
};

export default handler;
