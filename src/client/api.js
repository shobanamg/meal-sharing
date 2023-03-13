const BASE_URL = process.env.REACT_APP_BASE_API_URL;

const fetchBase = async (url, options = {}) => {
    const response = await fetch(url, options);
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    return response.json();
};

export const fetchMeals = async () => {
    return await fetchBase(`${BASE_URL}/meals`);
}
