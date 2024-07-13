import { validateToken } from '../services/authentication.js';

export function checkForAuthenticationCookie(cookieName) {
    return (req, res, next) => {
        const tokenCookieValue = req.cookies[cookieName];
        if (!tokenCookieValue) {
            console.log('No token cookie found');
            return next();
        }

        try {
            const userPayload = validateToken(tokenCookieValue);
            req.user = userPayload;
            console.log('User authenticated:', req.user);
            return next();
        } catch (error) {
            console.error('Token validation error:', error);
        }
        next();
    };
}
