import 'dotenv/config';
import fetch from 'node-fetch';
import { getDomainHotOrNot } from './openAi.js';

const ms2s = (ms) => {
    let seconds = ms/1000
    return seconds
}

const getAuctionList = async () => {
    const oneDay = 86400000;
    const today = Date.now();
    const tomorrow = today+oneDay
    let range = `${ms2s(today)}_${ms2s(tomorrow)}`
    let query = `https://aftermarketapi.namecheap.com/client/api/sales?orderby=end_time&direction=desc&tld=net,org,com&endDate=${range}&noHyphens=true&noNumbers=true`
    const response = await fetch(query, {
        headers: { 'Authorization': process.env.NAMECHEAP_MARKET_API }
    });

    if (!response.ok) {
        throw new Error(`API call failed: ${response.status}`);
    }

    const data = await response.json();
    return data.items;
};

const main = async () => {
    try {
        let domainNames = await getAuctionList();
        let domains = domainNames.map(domain => ({ name: domain.name, backlinksCount: domain.backlinksCount, estibotValue: domain.estibotValue, keywordSearchCount: domain.keywordSearchCount, renewPrice: domain.renewPrice, bindInfo: { startPrice: domain.startPrice, currentPrice: domain.price, bidCount: domain.bidCount, auctionUrl: `https://www.namecheap.com/market/${domain.name}` }}));
        let domainApproval = await getDomainHotOrNot(JSON.stringify(domains))
        console.log(domainApproval.choices[0].message)
    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
};

main();
