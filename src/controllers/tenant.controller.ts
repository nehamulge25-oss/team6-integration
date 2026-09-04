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