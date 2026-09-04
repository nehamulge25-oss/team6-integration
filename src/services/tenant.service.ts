import { prisma } from "../config/prisma.js";

export const tenantService = {
  async findClientById(id: string) {
    return prisma.client.findUnique({
      where: {
        id,
      },
    });
  },

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

  async createClient(data: {
    id: string;
    name: string;
    phoneNumberId: string;
    isActive?: boolean;
  }) {
    return prisma.client.create({
      data: {
        id: data.id,
        name: data.name,
        phoneNumberId: data.phoneNumberId,
        isActive: data.isActive ?? true,
      },
    });
  },

  async updateClient(
    id: string,
    data: {
      name?: string;
      phoneNumberId?: string;
      isActive?: boolean;
    }
  ) {
    return prisma.client.update({
      where: {
        id,
      },
      data,
    });
  },

  async deleteClient(id: string) {
    return prisma.client.delete({
      where: {
        id,
      },
    });
  },
};