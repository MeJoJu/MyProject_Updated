import { Router } from "express";
import {
  validateJobInput,
  validateIdParam,
} from "../errors/validationMiddleware.js";

const router = Router();

import {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
} from "../controllers/jobController.js";

router.route("/").get(getAllJobs).post(validateJobInput, createJob);
router
  .route("/:id")
  .get(validateIdParam, getJob)
  .patch(validateJobInput, updateJob)
  .delete(validateIdParam, deleteJob);

export default router;
