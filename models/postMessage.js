import mongoose from "mongoose";

//
const schema = mongoose.Schema(
    {
        user:{
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        
       
        title:{
            type: String,
            default:'hello'
        },
        description:{
            type: String,
            default:'hello'
        },
        employer: {
            type: String,
            default:'hello'
        },
        location: {
            type: String,
            default:'hello'
        },
        salary:{
            type: Number,
            default: 78

        },
        imageurl:{
            type: String,
            default: 'https://upload.wikimedia.org/wikipedia/commons/c/cd/University-of-Alabama-EngineeringResearchCenter-01.jpg'
        },
       
        isClaimed:{
            type: Boolean,
            default: false
        }
    },
    {
        timeStamps: true
    }
)


const PostMessage= mongoose.model('Goal', schema)

export default PostMessage;