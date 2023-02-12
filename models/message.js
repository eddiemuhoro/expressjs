import mongoose from "mongoose";

const messageSchema = mongoose.Schema(
    {
        description:{
            type: String,
            required: true,
        },
        name:{
            type: String,
        },
        user:[{
            type: mongoose.Schema.Types.ObjectId,
            default: null,
            ref: 'User'
        }],
   
        
    }
)

const Message = mongoose.model('Message', messageSchema)
export default Message;