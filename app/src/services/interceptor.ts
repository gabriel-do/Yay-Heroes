import ky from 'ky';
import { NONCE } from '../constants/userNonce';
import { API_BASE_URL } from '../constants/apiEndpoints';

const kyInstance = ky.create({
    prefixUrl: API_BASE_URL,
    hooks: {
        beforeRequest: [
            request => {
                request.headers.set('X-WP-Nonce', NONCE);
            }
        ]
    }
});

export default kyInstance;