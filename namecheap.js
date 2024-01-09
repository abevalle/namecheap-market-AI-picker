import 'dotenv/config';
import fetch from 'node-fetch';
export const namecheapApiCall = async (endpoint, params = {}) => {
    const baseUrl = 'https://aftermarketapi.namecheap.com/client/api/';
    let query = `${baseUrl}${endpoint}?`;

    for (const [key, value] of Object.entries(params)) {
        query += `${key}=${encodeURIComponent(value)}&`;
    }

    query = query.slice(0, -1);

    const response = await fetch(query, {
        headers: { 'Authorization': process.env.NAMECHEAP_MARKET_API }
    });

    if (!response.ok) {
        throw new Error(`API call failed: ${response.status}`);
    }
    return await response.json();
}

