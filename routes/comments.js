import express from 'express'
import Comment from "../schemas/comment.js"

const router = express.Router()

//create
router.post('/', async (req,res) => {
    try {
        const {postId, content} = req.body
        if(!content) {
            return res.status(400).json({message: 'Please enter comment content'})
        }
        const newComment = new Comment ({postId, content})
        await newComment.save()
        res.json({ "message": "You have created a comment."})
    } catch (error) {
        res.status(500).json({ message: 'Failed to create comment', error: error.message })
    }
})

//get
router.get('/post/:postId', async (req, res) => {
    try {
        const comments = await Comment.find({ postId: req.params.postId });
        if (comments.length === 0) {
            return res.status(404).json({ message: 'No comments found for this post' });
        }
        res.json(comments);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch comments', error: error.message });
    }
});
//edit
router.put('/:id', async (req, res) => {
    try {
        const { content } = req.body;
        if (!content) {
            return res.status(400).json({ message: 'The data type is not valid' });
        }

        const comment = await Comment.findById(req.params.id);
        
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        comment.content = content;
        await comment.save();
        res.json(comment);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update comment', error: error.message })
    }
});

//delete
router.delete('/:id', async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        await Comment.findByIdAndDelete(req.params.id);
        res.json({ message: 'Your Comment has been deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete comment', error: error.message })
    }
});



export default router