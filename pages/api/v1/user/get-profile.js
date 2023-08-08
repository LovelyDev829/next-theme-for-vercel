import Cors from 'cors'
import jwt from 'jsonwebtoken'
import initMiddleware from '@/lib/init-middleware'
import { users as User } from '@/models/index'

// Initialize the cors middleware
const cors = initMiddleware(
    Cors({
        methods: ['GET', 'POST', 'OPTIONS', 'DELETE', 'PUT'],
    })
)

export default async (req, res) => {
    if(!("authorization" in req.headers)){
        return res.status(401).send("No autorization token");
    }
    await cors(req, res)
    try {
        const {userId} = jwt.verify(req.headers.authorization, process.env.JWT_SECRET)
        const user = await User.findByPk(userId);
        res.json(user)
        
    } catch (error) {
        console.log(error.message)
        res.send("Error on apply! Try again.")
    }
}