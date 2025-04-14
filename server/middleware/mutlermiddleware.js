import multer, { diskStorage } from "multer";
import { join, extname } from "path";
import { existsSync, mkdirSync } from "fs";
import { fileURLToPath } from "url";

// Convert __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = join(__filename, "..");

// Define destination path for uploads folder
const uploadDir = join(__dirname, "../../uploads");

// Ensure the uploads directory exists
if (!existsSync(uploadDir)) {
  mkdirSync(uploadDir, { recursive: true }); // Create the 'uploads' folder if it doesn't exist
}

// Set Storage engine
const storage = diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}${extname(file.originalname)}`);
  },
});

// Set up multer with size limit (30MB) and storage configuration
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 30 }, // 30MB file size limit
});

export default upload;
