import mongoose, { Schema } from 'mongoose';
import { type } from 'node:os';

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            minLength: 3,
            maxLength: 30
        },
        password: {
            type: String,
            required: true,
            minLength: 6,
            maxLength: 30,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

    },
    {
        timestamps: true,
    }
)

//befoore saving any password we have to hashh it
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    };
    this.password = await bcrypt.hash(this.password, 10);
    next();
})

//compare the password with the hashed password in the database
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

export const User = mongoose.model('User', userSchema); 
