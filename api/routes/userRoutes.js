import { Router } from "express";
import {
  AllSector,
  UserSector,
  UserSectorUpdate,
  deleteSector,
} from "../controllers/UserController.js";

const router = Router();

router.post("/user", UserSector);
router.get("/user", AllSector);
router.delete("/user/:id", deleteSector);
router.put("/user", UserSectorUpdate);

export default router;
