import multer, { diskStorage } from "multer";
import { join, extname } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { existsSync, mkdirSync } from "fs";

// 🛠️ Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ✅ Define upload path
const destinationPath = join(__dirname, "./uploads");

// ✅ Ensure the uploads directory exists
if (!existsSync(destinationPath)) {
  mkdirSync(destinationPath, { recursive: true });
}

// ✅ Set up storage
const storage = diskStorage({
  destination: function (req, file, cb) {
    cb(null, destinationPath);
  },
  filename: function (req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}${extname(file.originalname)}`);
  },
});

// ✅ Set up multer
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 30 }, // 30MB
});

export default upload;
