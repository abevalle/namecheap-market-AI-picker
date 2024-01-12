import 'dotenv/config';
import fetch from 'node-fetch';

// This function is a wrapper for making Name Cheap API calls.
export const namecheapApiCall = async (endpoint, params = {}) => {
    const baseUrl = 'https://aftermarketapi.namecheap.com/client/api/';
    let query = `${baseUrl}${endpoint}?`;

    for (const [key, value] of Object.entries(params)) {
        query += `${key}=${encodeURIComponent(value)}&`;
    }

    query = query.slice(0, -1);

    console.log('Making NameCheap API Call.')
    const response = await fetch(query, {
        headers: { 'Authorization': process.env.NAMECHEAP_MARKET_API }
    });

    if (!response.ok) {
        throw new Error(`API call failed: ${response.status}`);
    }
    console.log('Ok!')
    return await response.json();
}

