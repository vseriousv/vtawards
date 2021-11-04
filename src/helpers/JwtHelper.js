import { Base64 } from "js-base64";

class JwtHelper {
	isJwt() {
		return localStorage.getItem("jwt") != null;
	}

	jwtParse() {
		const [hashJWT, dataJwt, secretJWT] = localStorage
			.getItem("jwt")
			.split(".");
		Base64.decode(hashJWT);
		Base64.decode(secretJWT);
		return JSON.parse(Base64.decode(dataJwt));
	}

	isCommittee() {
		if (this.isJwt()) {
			const [hashJWT, dataJwt, secretJWT] = localStorage
				.getItem("jwt")
				.split(".");
			Base64.decode(hashJWT);
			Base64.decode(secretJWT);
			const userAuthRole = JSON.parse(Base64.decode(dataJwt)).role;
			return userAuthRole === "comittee";
		} else {
			return false;
		}
	}

	isFinal() {
		if (this.isJwt()) {
			const [hashJWT, dataJwt, secretJWT] = localStorage
				.getItem("jwt")
				.split(".");
			Base64.decode(hashJWT);
			Base64.decode(secretJWT);
			const userAuthRole = JSON.parse(Base64.decode(dataJwt)).role;
			return userAuthRole === "comittee_main";
		} else {
			return false;
		}
	}

	isAdmin() {
		if (this.isJwt()) {
			const [hashJWT, dataJwt, secretJWT] = localStorage
				.getItem("jwt")
				.split(".");
			Base64.decode(hashJWT);
			Base64.decode(secretJWT);
			const userAuthRole = JSON.parse(Base64.decode(dataJwt)).role;
			return userAuthRole === "admin";
		} else {
			return false;
		}
	}

	isUser() {
		if (this.isJwt()) {
			const [hashJWT, dataJwt, secretJWT] = localStorage
				.getItem("jwt")
				.split(".");
			Base64.decode(hashJWT);
			Base64.decode(secretJWT);
			const userAuthRole = JSON.parse(Base64.decode(dataJwt)).role;
			return userAuthRole === "user";
		} else {
			return false;
		}
	}

	isRight() {
		// if (this.isJwt()) {
		// 	const [hashJWT, dataJwt, secretJWT] = localStorage
		// 		.getItem("jwt")
		// 		.split(".");
		// 	Base64.decode(hashJWT);
		// 	Base64.decode(secretJWT);
		// 	const userAuthRole = JSON.parse(Base64.decode(dataJwt)).role;
		// 	return userAuthRole === "user" || userAuthRole === "admin";
		// } else {
		// 	return false;
		// }
		const tabNumbersRight = ["ADMINDEV"];
		if (this.isJwt()) {
			const [hashJWT, dataJwt, secretJWT] = localStorage
				.getItem("jwt")
				.split(".");
			Base64.decode(hashJWT);
			Base64.decode(secretJWT);
			const userTabNumber = JSON.parse(Base64.decode(dataJwt))["tab_number"];
			const find = tabNumbersRight.findIndex((item) => item.trim().toLowerCase() === userTabNumber.trim().toLowerCase());
			return find >= 0;
		} else {
			return false;
		}
	}
}

export default JwtHelper;
