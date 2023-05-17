class ApiClient {
    static SERVER_URL = 'http://localhost:8080';
    static GET_CHALLENGE = '/challenges/random';
    static POST_RESULT = '/attempts';
    static GET_ATTEMPS_BY_ALIAS= '/attempts?alias=';

    static async challenge() {
        try {
            const response = await fetch(ApiClient.SERVER_URL + ApiClient.GET_CHALLENGE);
            return response;
        } catch (error) {
            throw error;
        }
    }

    static async sendGuess(user, a, b, guess) {
        try {
            const response = await fetch(ApiClient.SERVER_URL + ApiClient.POST_RESULT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    {
                        userAlias: user,
                        factorA: a,
                        factorB: b,
                        guess: guess
                    }
                )
            });
            return response;
        } catch (error) {
            throw error;
        }
    }

    static async getAttempts(userAlias) {
        const response = await fetch(ApiClient.SERVER_URL + ApiClient.GET_ATTEMPS_BY_ALIAS + userAlias);
        return response;
    }
}

export default ApiClient;