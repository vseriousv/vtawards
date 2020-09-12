import config from "../constants/config-typescript";
import axios from 'axios';

class RestHelper {

		isAuthorization (authorization: boolean): object {
				return authorization ?
					{ headers: { Authorization: 'Bearer ' + localStorage.getItem('jwt')}} :
					{};
		}

		async getEntity(urn: string, authorization: boolean):Promise<object> {

				const uri = config.API_URL + urn

				return await axios.get(
						uri,
						this.isAuthorization(authorization)
				);
		}

		async postEntity(urn: string, dataSend: object, authorization: boolean):Promise<object>  {
				const uri = config.API_URL + urn;

				return await axios.post(
						uri,
						dataSend,
						this.isAuthorization(authorization)
				);
		}

		async postFormData(urn: string, dataSend: object, authorization: boolean):Promise<object>  {
			const uri = config.API_URL + urn;

			return await axios.post(
					uri,
					dataSend,
					{ headers: authorization? { 
						Authorization: 'Bearer ' + localStorage.getItem('jwt'),
						ContentType: 'multipart/form-data',
						}: {ContentType: 'multipart/form-data'}
					}
			);
		}
		
		async putEntity (urn: string, dataSend: object, authorization: boolean):Promise<object>  {
				const uri = config.API_URL + urn

				return await axios.put(
						uri,
						dataSend,
						this.isAuthorization(authorization)
				);
		}

		async deleteEntity (urn: string, authorization: boolean):Promise<object>  {
				const uri = config.API_URL + urn

				return await axios.delete(
						uri,
						this.isAuthorization(authorization)
				);
		}
}

export default RestHelper;
