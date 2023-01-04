import mongoose from "mongoose";

const loginSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            trim: true
        },
        password: {
            type: String,
            required: true
        },
        phoneNum: {
            type: String,
            required: true
        },
         selectedFile: {
            type: String,
            default: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUJkC07QFuZvIeLEadibGh6ZkDXshm8PakYYzPMMZywg&s'
        },

        resetPasswordToken: {
            type: String,
            required: false
        },

        resetPasswordExpires: {
            type: Date,
            required: false
        },

        date: {
            type: Date,
            default: Date.now
        }
    }
)

const Employer = mongoose.model('Employer', loginSchema)
export default Employer;