import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js'




// function validateEmail(email) {
//     var re =
//         /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//     return re.test(email);
// }

function validatePassword(password) {
    const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return re.test(password);
}

export const signin = async (req, res) => {
    const { email, password } = req.body


    try {
        const existingUser = await User.findOne({ email });
        if (!existingUser)
            return res.status(404).json({ message: "User doesn't exist,Please try to Sign up" });
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect)
            return res.status(404).json({ message: 'Password incorrect' })

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, 'test', { expiresIn: '1h' })
        res.status(200).json({ result: existingUser, token })

    } catch (error) {
        res.status(500).json({ message: "Something get wrong." });
    }
}


export const signup = async (req, res) => {
    const { email, password, firstName, lastName, confirmPassword } = req.body;

    try {

        const existingUser = await User.findOne({ email });
        if (existingUser)
            return res.status(404).json({ message: "User already exists" });
            
        if (!validatePassword(password)) {
            return res.status(400).json({
                message:
                    "Votre mot de passe doit contenir huit caractères, au moins une lettre majuscule et un chiffre",
            });
        }

        if (password !== confirmPassword)
            return res.status(404).json({ message: "Passwords don't match" });
        const hashedPassword = await bcrypt.hash(password, 12)
        const result = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` })
        const token = jwt.sign({ email: result.email, id: result._id }, 'test', { expiresIn: '1h' })
        return res.status(200).json({ result, token })

    } catch (error) {
        res.status(500).json("Something get wrong.");

    }

}