const axios = require('axios');

/**
 * 
 * @param {string} stack -  
 * @param {string} level - 
 * @param {string} packageName -  
 * @param {string} message -  .
 * @param {string} token -  
 * @returns {Promise<any|null>} - 
 */
async function Log(stack, level, packageName, message, token) {
    try {
        const response = await axios.post(
            'http://20.244.56.144/evaluation-service/logs',
            {
                stack,
                level,
                package: packageName, 
                message
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error('Log API call failed:', error.message);
        return null;
    }
}

(async () => {
    const stack = 'frontend backend';
    const level = 'debug';
    const packageName = 'auth';
    const message = 'Testing log API';
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiIyMjAzMDMxMjYwMTc3QHBhcnVsdW5pdmVyc2l0eS5hYy5pbiIsImV4cCI6MTc1MDY2NDM1MSwiaWF0IjoxNzUwNjYzNDUxLCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiYjA4NGU0NWYtMTI1Yy00YjU3LTliZWEtNmZhM2Q0NzlmYWZiIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoic3ViaGFzaCBjaGFuZHJhIHBlZGRpcmVkZHkiLCJzdWIiOiJmMmYyYzJmMy1kNzYwLTRhZDAtOTM5OC00YmQ5ZjNjMTk2MzMifSwiZW1haWwiOiIyMjAzMDMxMjYwMTc3QHBhcnVsdW5pdmVyc2l0eS5hYy5pbiIsIm5hbWUiOiJzdWJoYXNoIGNoYW5kcmEgcGVkZGlyZWRkeSIsInJvbGxObyI6IjIyMDMwMzEyNjAxNzciLCJhY2Nlc3NDb2RlIjoiVFJ6Z1dNIiwiY2xpZW50SUQiOiJmMmYyYzJmMy1kNzYwLTRhZDAtOTM5OC00YmQ5ZjNjMTk2MzMiLCJjbGllbnRTZWNyZXQiOiJKdWpKVFRhdlBNVHRoZ3pzIn0.42QbtjkMhrTxv0sygvBIVXh8ddoXRkZxAcHLMuHsJaU';

    const result = await Log(stack, level, packageName, message, token);
    console.log('Log API response:', result);
})();
