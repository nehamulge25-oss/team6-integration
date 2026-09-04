import { webhookService } from "../services/webhook.service.js";

export const webhookJob = {
  async process(payload: unknown) {
    try {
      await webhookService.processWebhook(payload);
    } catch (error) {
      console.error("Webhook job error:", error);
    }
  },
};