import mongoose from "mongoose";

const userSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "Username is required"],
            minLength: [5, "Username must be atleast 5 characters"],
            maxLength: [32, "Username must not exeed 32 characters"],
            unique: true
        },

        password: {
            type: String,
            required: [true, "Password is required"],
            minLength: [8, "Password must be atleast 8 characters"],
            maxLength: [16, "Password must not exeed 32 characters"],
            selected: false

        },

        email: {
            type: String,
            required: true,
        },

        address: String,

        phone: {
            type: String,
            required: [true, "Phone is required"],
            minLength: [, "Password must be atleast 8 characters"],
            maxLength: [16, "Password must not exeed 32 characters"],
        },

        profileImage: {
            public_id:{
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        },

        paymentMethods: {
            bankTransfer: {
                bankAccountNumber: String,
                bankAccountName: String,
                bankName: String
            },

            phonePay:{
                phonePayMobileNumber: Number
            },

            payPal: {
                payPalEmail: String
            }

        },

        role: {
            type: String,
            enum: ["Auctioneer", "Bidder", "Super Admin"]
        },

        unpaidCommission: {
            type: Number,
            default:0
        },

        auctionsWon: {
            type: Number,
            default:0
        },

        moneySpent: {
            type: Number,
            default: 0
        }

    },
    {timestamps: true})

const User = mongoose.model("User", userSchema );

export {User}