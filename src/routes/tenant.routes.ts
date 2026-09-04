import { Router } from "express";
import {
  getClients,
  createClient,
  updateClient,
  deleteClient,
} from "../controllers/tenant.controller.js";

const router = Router();

router.get("/clients", getClients);

router.post("/clients", createClient);

router.put("/clients/:id", updateClient);

router.delete("/clients/:id", deleteClient);

export default router;