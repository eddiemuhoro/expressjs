import mongoose from "mongoose";

const loginSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
         selectedFile: {
            type: String,
            default: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUJkC07QFuZvIeLEadibGh6ZkDXshm8PakYYzPMMZywg&s'
        },
      
        date: {
            type: Date,
            default: Date.now
        }
    }
)

const User = mongoose.model('User', loginSchema)
export default User;