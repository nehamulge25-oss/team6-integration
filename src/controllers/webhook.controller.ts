import { Request, Response } from "express";
import { env } from "../config/env.js";
import { webhookJob } from "../jobs/webhook.job.js";
export const verifyWebhook = (req: Request, res: Response) => {
  const verifyToken = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (
    verifyToken === env.metaVerifyToken &&
    typeof challenge === "string"
  ) {
    return res.status(200).send(challenge);
  }

  return res.sendStatus(403);
};

export const receiveWebhook = (
  req: Request,
  res: Response
) => {
  console.log("POST /webhook received");

  // Respond immediately
  res.sendStatus(200);

  // Process after response
  setImmediate(() => {
    webhookJob.process(req.body);
  });
};