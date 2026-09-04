import { tenantService } from "./tenant.service.js";

export const webhookService = {
  async processWebhook(payload: any) {
    console.log("=================================");
    console.log("WEBHOOK RECEIVED");
    console.log("=================================");

    if (!payload || typeof payload !== "object") {
      console.error("Invalid webhook payload");
      return;
    }

    console.log("Object:", payload.object);

    if (payload.object !== "whatsapp_business_account") {
      console.error("Unknown webhook object");
      return;
    }

    const entries = Array.isArray(payload.entry)
      ? payload.entry
      : [];

    if (entries.length === 0) {
      console.error("Webhook contains no entries");
      return;
    }

    for (const entry of entries) {
      const changes = Array.isArray(entry?.changes)
        ? entry.changes
        : [];

      for (const change of changes) {
        const value = change?.value;

        if (!value) {
          console.error("Webhook change has no value");
          continue;
        }

        const phoneNumberId =
          value?.metadata?.phone_number_id;

        console.log(
          "Phone Number ID:",
          phoneNumberId
        );

        if (!phoneNumberId) {
          console.error(
            "Webhook does not contain phone_number_id"
          );
          continue;
        }

        const client =
          await tenantService.findClientByPhoneNumberId(
            phoneNumberId
          );

        if (!client) {
          console.error(
            "No client found for phone_number_id:",
            phoneNumberId
          );
          continue;
        }

        console.log("Client ID:", client.id);
        console.log("Client Name:", client.name);

        const messages = Array.isArray(value.messages)
          ? value.messages
          : [];

        for (const message of messages) {
          console.log("Message ID:", message?.id);
          console.log("From:", message?.from);
          console.log("Message Type:", message?.type);

          if (message?.type === "text") {
            console.log(
              "Message Text:",
              message?.text?.body
            );
          }
        }
      }
    }

    console.log("=================================");
    console.log("WEBHOOK PROCESSING COMPLETE");
    console.log("=================================");
  },
};