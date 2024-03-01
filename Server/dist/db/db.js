"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostModel = exports.UserModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const dotenv = __importStar(require("dotenv"));
// Load environment variables from .env file
dotenv.config();
const userSchema = new mongoose_1.Schema({
    username: { type: String },
    password: String
});
const UserModel = mongoose_1.default.model('User', userSchema);
exports.UserModel = UserModel;
const postSchema = new mongoose_1.Schema({
    title: String,
    description: String,
    images: String
});
const PostModel = mongoose_1.default.model('Post', postSchema);
exports.PostModel = PostModel;
// ================> Connect to MongoDB <======================
const MONGODB_URI = process.env.MONGODB_URI;
mongoose_1.default.connect(MONGODB_URI, {})
    .then(() => console.log('Connected to MongoDB'))
    .catch(error => console.error('Error connecting to MongoDB:', error));
