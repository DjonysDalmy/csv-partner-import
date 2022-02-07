import { Router } from "express";
import multer from "multer";

import { handle } from "./importPartner/controller";

const router = Router();

const upload = multer({
    dest: "./uploads"
});

router.post('/partners', upload.single("file"), handle);

export { router };