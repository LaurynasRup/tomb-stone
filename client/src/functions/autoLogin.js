import axios from 'axios';

export const autoLogin = async (fn1, fn2) => {
	// Assigned stored token
	const jwt = sessionStorage.getItem('jwt');
	// If there is a token - decode, and login by id
	if (jwt) {
		try {
			const decoded = await axios.get('api/decode/decode_token', {
				headers: {
					'auth-token': jwt,
				},
			});
			const userId = decoded.data.tokenId._id;
			fn1(fn2(userId, jwt));
			// Error - invalid token
			// Clear storage
		} catch (err) {
			sessionStorage.clear();
		}
	}
};
