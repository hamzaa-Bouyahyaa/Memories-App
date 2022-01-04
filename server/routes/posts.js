import express from "express";
import {
  getPostsBySearch,
  getPosts,
  deletePost,
  likePost,
  getPost,
} from "../controllers/posts.js";
import auth from "../middleware/auth.js";
import multer from "multer";
import PostMessage from "../models/postMessage.js";
import mongoose from "mongoose";

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(
      null,
      "C:/Users/TakiAcademy/Desktop/Posti_Ghramek/client/public/uploads"
    );
  },

  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});

const uploads = multer({ storage: storage });

const router = express.Router();

router.get("/", getPosts);
router.get("/search", getPostsBySearch);
router.post("/", auth, uploads.single("selectedFile"), async (req, res) => {
  const { title, message, tags, name } = req.body;
  const selectedFile = req.file;
  const Tags = tags.split(",");

  try {
    if (req.body.title == "" || req.body.message == "" || req.body.tags == "")
      return res
        .status(400)
        .json({ message: "Please fill all of it to create your own memory" });

    const newPost = new PostMessage({
      title,
      message,
      selectedFile: selectedFile.originalname,
      tags: Tags,
      name,
      creator: req.userId,
      createdAt: new Date().toISOString(),
    });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});
router.get("/:id", getPost);
router.patch("/:id", auth, uploads.single("selectedFile"), async (req, res) => {
  const { id: _id } = req.params;
  const { title, message, tags, name } = req.body;
  const selectedFile = req.file;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("No post with that id");
  }
  const updatedPost = await PostMessage.findByIdAndUpdate(
    _id,
    {
      title,
      message,
      selectedFile: selectedFile.originalname,
      tags,
      name,
    },
    { new: true }
  );

  res.json(updatedPost);
});
router.delete("/:id", auth, deletePost);
router.patch("/:id/likePost", auth, likePost);

export default router;
