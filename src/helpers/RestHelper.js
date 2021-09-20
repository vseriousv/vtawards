import config from '../constants/config';
import axios from 'axios';

class RestHelper {
	isAuthorization(authorization) {
		return authorization ?
			{ headers: { Authorization: 'Bearer ' + localStorage.getItem('jwt') } } :
			{};
	}

	async getEntity(urn, authorization) {

		const uri = config.API_URL + urn;

		return await axios.get(
			uri,
			this.isAuthorization(authorization)
		);
	}

	async postEntity(urn, dataSend, authorization) {
		const uri = config.API_URL + urn;

		return await axios.post(
			uri,
			dataSend,
			this.isAuthorization(authorization)
		);
	}

	async deleteEntity(urn, authorization) {
		const uri = config.API_URL + urn;

		return await axios.delete(
			uri,
			this.isAuthorization(authorization)
		);
	}
}

export default RestHelper;
