import mongoose from "mongoose";

//
const schema = mongoose.Schema(
    {
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
       
        title:{
            type: String,
            required: true ['insert text!!']
        },
        description:{
            type: String,
            required: true
        },
        employer: {
            type: String,
            required: true
        },
        location: {
            type: String,
            required: true
        },
        salary:{
            type: Number,

        },
        imageurl:{
            type: String
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