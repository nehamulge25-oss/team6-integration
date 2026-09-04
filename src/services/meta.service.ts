import axios from "axios";
import { env } from "../config/env.js";

export const metaService = {
  async sendTextMessage(
    to: string,
    message: string
  ) {
    try {
      if (!env.metaPhoneNumberId) {
        throw new Error("META_PHONE_NUMBER_ID is not configured");
      }

      if (!env.metaAccessToken) {
        throw new Error("META_ACCESS_TOKEN is not configured");
      }

      const url =
        `https://graph.facebook.com/` +
        `${env.metaGraphApiVersion}/` +
        `${env.metaPhoneNumberId}/messages`;

      const response = await axios.post(
        url,
        {
          messaging_product: "whatsapp",
          to,
          type: "text",
          text: {
            body: message,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${env.metaAccessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          "Meta API Error:",
          error.response?.data || error.message
        );
      } else {
        console.error(
          "Meta service error:",
          error
        );
      }

      throw new Error("Failed to send WhatsApp message");
    }
  },
};