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

router.post("/newItem",authenticate, upload.single("image"), async (req, res) => {
  try {
    const { name, category, price, rating , description } = req.body;

    if (!name || !category || !price || !rating || !description) {
      return res.status(400).json({ success: false, msg: "Missing fields" });
    }

    const validCategories = [
      "ring",
      "necklace",
      "bracelet",
      "earring",
      "pendant",
      "chain",
      "payal",
      "bangle",
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
        description
      },
    });

    res.status(201).json({ success: true, item: newItem });
  } catch (e) {
    console.error("Error creating item:", e.message, e.stack);
    res.status(500).json({ success: false, msg: "Server error" });
  }
});

// Get all queries
router.get("/queries", authenticate, async (req, res) => {
  try {
    const queries = await prisma.query.findMany();
    res.json({ success: true, queries });
  } catch (err) {
    console.error("Error fetching queries:", err);
    res.status(500).json({ success: false, msg: "Server error" });
  }
});

// Delete query by ID
router.delete("/deleteQueries/:id", authenticate, async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await prisma.query.delete({
      where: { id: parseInt(id) },
    });
    res.json({ success: true, deleted });
  } catch (err) {
    console.error("Error deleting query:", err);
    res.status(500).json({ success: false, msg: "Server error or invalid ID" });
  }
});

router.delete("/deleteItem",authenticate, async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ success: false, msg: "Missing field ID" });
    }

    const deletedItem = await prisma.goldItem.deleteMany({
      where: {
        id
      },
    });

    res.status(201).json({ success: true, item: deletedItem });
  } catch (e) {
    console.error("Error creating item:", e.message, e.stack);
    res.status(500).json({ success: false, msg: "Server error" });
  }
});

export default router;
