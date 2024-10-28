import express from 'express'
import Post from '../schemas/post.js'
const router = express.Router()

//GET
router.get('/', async(req,res) => {
    try {
        const posts = await Post.find().sort({createdAt: -1}).select('title author createdAt')
        res.json(posts)
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch posts', error: error.message })
    }
})

//POST
router.post('/', async(req,res) => {
    try {
        const {title, author, password, content} = req.body
        const newPost = new Post({
            title, 
            author, 
            password, 
            content,
            createdAt: new Date()
        })
        await newPost.save();
        res.json({ "message": "You have created a post."})
    } catch (error) {
        res.status(500).json({ message: 'Failed to create post', error: error.message })
    }
})

//Get post details
router.get('/:id', async(req,res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (!post) {
            return res.status(404).json({ message: 'Post not found' })
        }
        res.json(post)
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch post', error: error.message })
    }
})

//Edit
router.put('/:id', async(req,res) => {
    try {
        const {password, content} = req.body
        const post = await Post.findById(req.params.id)
        
        if (!post) {
            return res.status(404).json({ message: 'Post not found' })
        }

        if(post.password === password){
            post.content = content;
            await post.save()
            res.json({ "message": "Your post has been edited."})
        } else {
            res.status(401).json({message: 'Invalid Password'})
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to update post', error: error.message })
    }
})

//Delete
router.delete('/:id', async (req,res) => {
    try {
        const {password} = req.body;
        const post = await Post.findById(req.params.id)

        if (!post) {
            return res.status(404).json({ message: 'Post not found' })
        }

        if (post.password === password) {
            await Post.deleteOne({ _id: req.params.id })
            res.json({message: 'Post deleted'})
        } else {
            res.status(401).json({ message: 'Unauthorized' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete post', error: error.message })
    }
})

export default router