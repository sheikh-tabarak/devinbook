const express = require("express");
const router = express.Router();
const accountController = require("../controllers/accountController");
const { protect } = require("../middleware/authMiddleware");

router.use(protect);

router.post("/", accountController.createAccount);
router.get("/", accountController.getAccounts);
router.put("/:id", accountController.updateAccount);
router.delete("/:id", accountController.deleteAccount);
router.post("/:id/mark-report-sent", accountController.markReportSent);

module.exports = router;
