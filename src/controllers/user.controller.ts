import User from "../models/User.js";
import { getJWT, getPasswordHash, validateToken, validateUser } from "../services/user.service.js";

export const register = async (req: any, res: any)=> {
    const { email, password, firstName, lastName, role } = req.body;

    if(!email || !password || !firstName) {
        return res.status(400).json({
            message: "Enter the required field",
        })
    }

    const passwordHash: string = await getPasswordHash(password);

    console.log("password Hash: ", passwordHash)

    const resUserData = new User({
        email, password: passwordHash, firstName, lastName, role
    })

    const token = await getJWT(email);

    res.cookie("token", token, { httpOnly: true });

    // await resUserData.save();

    res.json({
        success: true,
        message: resUserData,
    })

}

export const login = async (req: any, res: any)=> {
    const { email, password } = req.body;
    const { token } = req.cookies;

    if (!password || !email) {
        return res.status(400).json({ message: "Enter the required fields" });
      }

    const isValidUser = await validateUser(email, password);

    if(!isValidUser){
        return res.status(400).json({
            error: "invalid field values"
        });
    }

    const decodedMessage = await validateToken(token);
    console.log("decoded Msg: ", decodedMessage);
    // const user = await User.findById(decodedMessage?.id );

    // if(!user) {
    //     console.log("user doesn't exists", user);
    // }    

    const newToken = await getJWT(email);
    res.cookie("token", newToken, { httpOnly: true });

    res.status(200).send({
        success: true,
        message: "user loggedIn successfully..."
    })

}

export const logout = async (req: any, body: any)=> {
    
}

export const getProfile = async (req: any, body: any)=> {

}
