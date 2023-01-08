import mongoose from "mongoose";

const messageSchema = mongoose.Schema(
    {
       
        job:{
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Employer'
        },
        
      
        message:{
            type: String,
            default:'hello'
        },
    }
)

const Message = mongoose.model('Message', messageSchema)
export default Message;