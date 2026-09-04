import { Request, Response } from "express";
import { tenantService } from "../services/tenant.service.js";

export const getClients = async (
  _req: Request,
  res: Response
) => {
  try {
    const clients = await tenantService.getAllClients();

    return res.status(200).json({
      success: true,
      data: clients,
    });
  } catch (error) {
    console.error("Get clients error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to get clients",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

export const createClient = async (
  req: Request,
  res: Response
) => {
  try {
    const { id, name, phoneNumberId, isActive } = req.body;

    if (!id || !name || !phoneNumberId) {
      return res.status(400).json({
        success: false,
        message: "id, name and phoneNumberId are required",
      });
    }

    const existingClient =
      await tenantService.findClientByPhoneNumberId(phoneNumberId);

    if (existingClient) {
      return res.status(409).json({
        success: false,
        message: "A client with this phoneNumberId already exists",
      });
    }

    const client = await tenantService.createClient({
      id,
      name,
      phoneNumberId,
      isActive,
    });

    return res.status(201).json({
      success: true,
      message: "Client created successfully",
      data: client,
    });
  } catch (error) {
    console.error("Create client error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create client",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

export const updateClient = async (
  req: Request,
  res: Response
) => {
  try {
    const id = String(req.params.id);

    const { name, phoneNumberId, isActive } = req.body;

    const existingClient = await tenantService.findClientById(id);

    if (!existingClient) {
      return res.status(404).json({
        success: false,
        message: "Client not found",
      });
    }

    if (phoneNumberId) {
      const phoneClient =
        await tenantService.findClientByPhoneNumberId(phoneNumberId);

      if (phoneClient && phoneClient.id !== id) {
        return res.status(409).json({
          success: false,
          message: "A client with this phoneNumberId already exists",
        });
      }
    }

    const updateData: {
      name?: string;
      phoneNumberId?: string;
      isActive?: boolean;
    } = {};

    if (name !== undefined) {
      updateData.name = name;
    }

    if (phoneNumberId !== undefined) {
      updateData.phoneNumberId = phoneNumberId;
    }

    if (isActive !== undefined) {
      updateData.isActive = isActive;
    }

    const client = await tenantService.updateClient(id, updateData);

    return res.status(200).json({
      success: true,
      message: "Client updated successfully",
      data: client,
    });
  } catch (error) {
    console.error("Update client error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update client",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

export const deleteClient = async (
  req: Request,
  res: Response
) => {
  try {
    const id = String(req.params.id);

    const existingClient = await tenantService.findClientById(id);

    if (!existingClient) {
      return res.status(404).json({
        success: false,
        message: "Client not found",
      });
    }

    await tenantService.deleteClient(id);

    return res.status(200).json({
      success: true,
      message: "Client deleted successfully",
    });
  } catch (error) {
    console.error("Delete client error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete client",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};