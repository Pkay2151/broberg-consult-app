const express = require("express");
const { Router } = express;
const router = Router();

const validateToken = require("../middleware/tokenVerification.js");

const {
  pendingApprovals,
  getPendingSummary,
  getPendingDetails,
} = require("../controllers/pendingApproval.js");

router.use(validateToken);

router.get("/pending-approvals", pendingApprovals);
router.get("/pending-approvals/details", getPendingDetails);
router.get("/pending-approvals/summary", getPendingSummary);

module.exports = router;
