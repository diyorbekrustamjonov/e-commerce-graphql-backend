import { fileURLToPath } from "url"
import dotenv from "dotenv"
import path from "path"

const PORT = process.env.PORT ?? 3000 

const __dirname = path.dirname(fileURLToPath(import.meta.url))

dotenv.config({
	path: path.join(__dirname, ".env")
})

export default {
	__dirname,
	PORT
}