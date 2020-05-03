import {Base64} from "js-base64";

class JwtHelper {

    isJwt() {
        return localStorage.getItem("jwt") != null;
    }

    isAdmin() {

        if(this.isJwt()){
            const [hashJWT, dataJwt, secretJWT] = localStorage.getItem("jwt").split('.');
            Base64.decode(hashJWT);
            Base64.decode(secretJWT);
            const userAuthRole = JSON.parse(Base64.decode(dataJwt)).role;
            return userAuthRole === 'admin';
        } else {
            return false;
        }
    }
}

export default JwtHelper;
