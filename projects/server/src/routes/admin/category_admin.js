const router = require("express").Router();
const { admin } = require("../../controllers/index");
const { checkAuth } = require("../../middleware/checkAuth")
const { categoryComp } = admin;

router.get("/admin/all_category", checkAuth, categoryComp.allCategory);
router.post("/admin/add_category", checkAuth, categoryComp.addCategory);
router.patch("/admin/edit_category/:id", checkAuth, categoryComp.editCategory);
router.delete("/admin/delete_category/:id", checkAuth, categoryComp.deleteCategory);

module.exports = router;