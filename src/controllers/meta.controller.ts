import { Request, Response } from "express";
import { metaService } from "../services/meta.service.js";

export const sendTextMessage = async (
  req: Request,
  res: Response
) => {
  try {
    const { to, message } = req.body;

    if (
      typeof to !== "string" ||
      typeof message !== "string"
    ) {
      return res.status(400).json({
        success: false,
        message: "to and message are required",
      });
    }

    if (!to.trim() || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: "to and message cannot be empty",
      });
    }

    const result =
      await metaService.sendTextMessage(
        to.trim(),
        message.trim()
      );

    return res.status(200).json({
      success: true,
      message: "WhatsApp message sent successfully",
      data: result,
    });
  } catch (error) {
    console.error("Send message error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to send WhatsApp message",
    });
  }
};