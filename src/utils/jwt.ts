// const expressJwt = require('express-jwt');
// import { expressjwt, Request as JWTRequest } from "express-jwt";
import { expressjwt } from "express-jwt";

const authJwt = () => {
    const secret = process.env.secret as string;
    return expressjwt({
        secret,
        algorithms: ['HS256'],
    })

}

export default authJwt;

