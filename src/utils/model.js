import path from "path"
import fs from "fs"
import jwt from "jsonwebtoken"
import sha256 from "sha256"


export default {
    read: (fileName) => {
        const data = fs.readFileSync(path.join(process.cwd(), "src", "database", fileName + ".json"), "utf8")
        return JSON.parse(data) || []
    },
    write: (fileName, data) => {
        fs.writeFileSync(path.join(process.cwd(), "src", "database", fileName + ".json"), JSON.stringify(data, null, 4))
    },
    sing: (payload) => {

        return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" })
    },
    verify: (payload) => {
        return jwt.verify(payload, process.env.JWT_SECRET)
    },

    sha256: (data) => {
        return sha256(data)
    } 
}