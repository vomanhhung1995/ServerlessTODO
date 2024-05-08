"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
require("source-map-support/register");
const jsonwebtoken_1 = require("jsonwebtoken");
const logger_1 = require("../../utils/logger");
const jwksClient = require("jwks-rsa");
const logger = (0, logger_1.createLogger)('auth');
const jwksUrl = 'https://dev-udacity-hungvm1.us.auth0.com/.well-known/jwks.json';
const handler = async (event) => {
    logger.info('Authorizing a user', event.authorizationToken);
    try {
        const jwtToken = await verifyToken(event.authorizationToken);
        logger.info('User was authorized', jwtToken);
        return {
            principalId: jwtToken.sub,
            policyDocument: {
                Version: '2012-10-17',
                Statement: [
                    {
                        Action: 'execute-api:Invoke',
                        Effect: 'Allow',
                        Resource: '*'
                    }
                ]
            }
        };
    }
    catch (e) {
        logger.error('User not authorized', { error: e.message });
        return {
            principalId: 'user',
            policyDocument: {
                Version: '2012-10-17',
                Statement: [
                    {
                        Action: 'execute-api:Invoke',
                        Effect: 'Deny',
                        Resource: '*'
                    }
                ]
            }
        };
    }
};
exports.handler = handler;
async function verifyToken(authHeader) {
    const token = getToken(authHeader);
    const jwt = (0, jsonwebtoken_1.decode)(token, { complete: true });
    const client = await jwksClient({
        jwksUri: jwksUrl
    });
    const signingKey = await client.getSigningKey(jwt.header.kid);
    const publicKey = signingKey.getPublicKey();
    return (0, jsonwebtoken_1.verify)(token, publicKey, {
        algorithms: ['RS256']
    });
}
function getToken(authHeader) {
    if (!authHeader)
        throw new Error('No authentication header');
    if (!authHeader.toLowerCase().startsWith('bearer '))
        throw new Error('Invalid authentication header');
    const split = authHeader.split(' ');
    const token = split[1];
    return token;
}
//# sourceMappingURL=auth0Authorizer.js.map