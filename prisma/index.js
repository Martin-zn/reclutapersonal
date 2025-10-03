// Demo Prisma client stub with safe no-op methods for any model

const createModelStub = () => ({
  findMany: async () => [],
  findFirst: async () => null,
  findUnique: async () => null,
  create: async () => ({}),
  createMany: async () => ({}),
  update: async () => ({}),
  updateMany: async () => ({}),
  upsert: async () => ({}),
  delete: async () => ({}),
  count: async () => 0,
  aggregate: async () => ({}),
});

const prisma = new Proxy(
  {},
  {
    get: (target, prop) => {
      if (prop === '$disconnect' || prop === '$connect') {
        return async () => {};
      }
      // Return a per-model stub (workspace, user, member, domain, etc.)
      if (!target[prop]) {
        target[prop] = createModelStub();
      }
      return target[prop];
    },
  }
);

export default prisma;
