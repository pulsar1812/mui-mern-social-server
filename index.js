import path from 'path'
import { fileURLToPath } from 'url'
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import multer from 'multer'
import helmet from 'helmet'
import morgan from 'morgan'

// Needed when we use type 'module' in package.json
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config()

const app = express()

// Body parser
app.use(express.json({ limit: '20mb' }))
app.use(express.urlencoded({ limit: '20mb', extended: true }))

// Set security headers
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }))

// Logging middleware in development
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// Enable CORS
app.use(cors())

app.use('/assets', express.static(path.join(__dirname, 'public/assets')))

// File storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/assets')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  },
})
const upload = multer({ storage })

// Connect to MongoDB and listen to PORT 5000
const PORT = process.env.PORT || 5000
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on Port ${PORT}`))
  })
  .catch((error) => console.log('Connection error: ', error))
