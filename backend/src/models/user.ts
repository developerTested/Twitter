import mongoose, { Model, Schema } from "mongoose"
import bcrypt from "bcrypt"

type UserMethods = {
    isPasswordCorrect(password: string): Promise<Boolean>,
}

export type userType = {
    _id: string,
    display_name: string,
    user_name: string,
    email: string,
    password: string,
    avatar?: string,
    bio?: string,
    refreshToken?: string
}

export type UserModel = Model<userType, {}, UserMethods>;

const userSchema = new Schema<userType, UserModel, UserMethods>({
    display_name: {
        type: String,
        trim: true,
        required: [true, "Name field is required"],
        minlength: [1, "Name must be at least 1 character long"],
        maxlength: [20, "Name must be at most 20 characters long"],
    },
    user_name: {
        type: String,
        index: true,
        trim: true,
        unique: true,
        required: [true, "User Name field is required"],
        minlength: [3, "User Name must be at least 3 characters long"],
        maxlength: [20, "User Name must be at most 20 characters long"],
    },
    email: {
        type: String,
        required: [true, "Email field is required"],
    },
    password: {
        type: String,
        required: [true, "Password field is required"],
    },
    avatar: {
        type: String,
    },
    bio: {
        type: String,
    },
    refreshToken: {
        type: String,
    },
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function (password: string) {
    return await bcrypt.compare(password, this.password)
}

userSchema.set('toJSON', {
    transform: (doc, ret) => {
        delete ret.password;
        delete ret.refreshToken;
        delete ret.__v;
        return ret;
    },
});

const User = mongoose.model("User", userSchema)

export default User;