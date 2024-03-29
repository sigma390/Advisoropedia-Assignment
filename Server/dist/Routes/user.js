"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Auth_1 = require("../middleware/Auth");
const db_1 = require("../db/db");
const validate_middleware_1 = __importDefault(require("../middleware/validate-middleware"));
const auth_Val_1 = require("../validator/auth-Val");
const bcrypt_1 = __importDefault(require("bcrypt"));
const router = express_1.default.Router();
// router.post('/signup',validate(signUpSchema), async (req:Request, res:Response) => {
//   const { username, password } = req.body;
//   try {
//     const user = await User.findOne({ username });
//     if (user) {
//       res.status(403).json({ message: 'User already exists' });
//     } else {
//       const newUser = new User({ username, password });
//       await newUser.save();
//       const token = jwt.sign({ username, role: 'user' }, SECRET, { expiresIn: '1h' });
//       res.json({ message: 'User created successfully', token });
//     }
//   } catch (error) {
//     console.error('Error creating user:', error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// });
// //========================> Login Route <===================
// let attempts:any = {};
// router.post('/login', async (req: Request, res: Response) => {
//   const { username, password } = req.body;
//   try {
//     const user = await User.findOne({ username, password });
//     if (user) {
//       const token = jwt.sign({ username, role: 'user' }, SECRET, { expiresIn: '1h' });
//       return res.json({ message: 'Logged in successfully', token });
//     } else {
//         attempts[username] = (attempts[username] || 0) + 1;
//       if (attempts[username] > 3) {
//         return res.status(403).json({ message: 'Max Attempts Reached Try in 10 minutes' });
//       }else{
//         return res.status(403).json({ message: 'Invalid username or password' });
//       }
//     }
//   } catch (error) {
//     console.error('Error logging in:', error);
//     return res.status(500).json({ message: 'Internal Server Error' });
//   }
// });
//=====================================> Encryption Testing <======================
router.post('/signup', (0, validate_middleware_1.default)(auth_Val_1.signUpSchema), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        // Check if the user already exists
        const user = yield db_1.User.findOne({ username });
        if (user) {
            return res.status(403).json({ message: 'User already exists' });
        }
        // Encrypt the password using bcrypt
        // const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds
        // Create a new user with the hashed password
        const newUser = new db_1.User({ username, password });
        console.log(password);
        yield newUser.save();
        // Generate JWT token
        const token = jsonwebtoken_1.default.sign({ username, role: 'user' }, Auth_1.SECRET, { expiresIn: '1h' });
        return res.json({ message: 'User created successfully', token });
    }
    catch (error) {
        console.error('Error creating user:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}));
// Login Route
let attempts = {};
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        // Find the user by username
        const user = yield db_1.User.findOne({ username });
        if (!user) {
            // User not found
            attempts[username] = (attempts[username] || 0) + 1;
            if (attempts[username] > 3) {
                return res.status(403).json({ message: 'Max Attempts Reached. Try again in 10 minutes' });
            }
            else {
                return res.status(403).json({ message: 'Invalid username or password' });
            }
        }
        // Compare hashed password
        const passwordMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!passwordMatch) {
            attempts[username] = (attempts[username] || 0) + 1;
            if (attempts[username] > 3) {
                return res.status(403).json({ message: 'Max Attempts Reached. Try again in 10 minutes' });
            }
            else {
                return res.status(403).json({ message: 'Invalid username or password' });
            }
        }
        // Password matched, generate JWT token
        const token = jsonwebtoken_1.default.sign({ username, role: 'user' }, Auth_1.SECRET, { expiresIn: '1h' });
        return res.json({ message: 'Logged in successfully', token });
    }
    catch (error) {
        console.error('Error logging in:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}));
//===========================> Get all posts Route <=============
//=================>  proper Authentication is applied on this route <===================
router.get('/posts', Auth_1.authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const posts = yield db_1.Post.find({});
    res.json({ posts });
}));
// just for testing purpse i have added this create Post route
router.post('/post', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const post = new db_1.Post(req.body);
    yield post.save();
    res.json({ message: 'Post created successfully', postId: post.id });
}));
exports.default = router;
function middleware() {
    throw new Error('Function not implemented.');
}
