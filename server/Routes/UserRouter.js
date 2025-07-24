const { Router } = require("express")
const { VerifyAdmin, VerifySuperAdmin,ForgotPassword, ResetPassword, SignIn, SignUp, SuperAdminSignIn  } = require("../Controllers/UserController.js");

const router=Router()

router.post("/sign-up",SignUp)
router.post("/sign-in",SignIn)
router.post("/super-admin-sign-in",SuperAdminSignIn)
router.post("/forgot-password",ForgotPassword)
router.post("/reset-password/:id/:token",ResetPassword)
router.post("/verify-admin",VerifyAdmin)
router.post("/verify-super-admin",VerifySuperAdmin)

module.exports=router