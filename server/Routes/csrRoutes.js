const {Router} = require("express");
const { createCSR, getAllCSR, getCSRById, updateCSR, deleteCSR } = require("../Controllers/csrController");
const upload = require("../Middleware/Multer");

const CSRRouter = Router();

CSRRouter.post("/create-csr", upload.single("image"), createCSR);
CSRRouter.get("/get-all-csr", getAllCSR);
CSRRouter.get("/get-csr-by-id/:id", getCSRById);
CSRRouter.put("/update-csr/:id",upload.single("image"), updateCSR);
CSRRouter.delete("/delete-csr/:id", deleteCSR);

module.exports = CSRRouter
