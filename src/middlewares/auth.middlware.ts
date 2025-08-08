import { validateToken } from '../services/user.service.js';
import AppError from '../utils/error.utils.js';

export const isLoggedIn = async (req: any, res: any, next: any) => {
    try{
        const { token } = res.cookie;
        if(!token){
            return next(new AppError("Unauthenticated user, please login", 401))
        }

        const decodedMessage = validateToken(token);

        req.user = decodedMessage;

        next();

    }catch(err){

    }
}

