import express from 'express'
import connect from './schemas/index.js'
import postRoutes from './routes/post.js'
import commentRoutes from './routes/comments.js'
const app = express()
const PORT = 3000
connect()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
const router = express.Router()

router.get('/', (req,res) =>{
    return res.json({message: "Hi"})
})

app.use('/api/posts', postRoutes)
app.use('/api/comments', commentRoutes)
app.listen(PORT, () => {
    console.log(PORT, "Server opened on port!")
})
