import { Router } from "express";
import multer from "multer";
import { authenticate } from "../middlewares/authenticate.js";
import { prisma } from "../helper/pooler.js";

const router = Router();

// Storage configuration for uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // make sure this folder exists
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/newItem", upload.single("image"), async (req, res) => {
  try {
    const { name, category, price, rating } = req.body;

    if (!name || !category || !price || !rating) {
      return res.status(400).json({ success: false, msg: "Missing fields" });
    }

    const validCategories = [
      "ring",
      "necklace",
      "bracelet",
      "earring",
      "pendant",
      "chain",
    ];
    if (!validCategories.includes(category)) {
      return res.status(400).json({ success: false, msg: "Invalid category" });
    }
    const prismaCategory = category.toUpperCase();

    const newItem = await prisma.goldItem.create({
      data: {
        name,
        category: prismaCategory, // Send UPPERCASE enum key
        price: parseFloat(price),
        rating: parseFloat(rating),
        image: req.file ? req.file.filename : null,
      },
    });

    res.status(201).json({ success: true, item: newItem });
  } catch (e) {
    console.error("Error creating item:", e.message, e.stack);
    res.status(500).json({ success: false, msg: "Server error" });
  }
});

export default router;
