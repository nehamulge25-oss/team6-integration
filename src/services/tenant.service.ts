import { prisma } from "../config/prisma.js";

export const tenantService = {
  async findClientByPhoneNumberId(phoneNumberId: string) {
    return prisma.client.findUnique({
      where: {
        phoneNumberId,
      },
    });
  },

  async getAllClients() {
    return prisma.client.findMany({
      where: {
        isActive: true,
      },
    });
  },
};