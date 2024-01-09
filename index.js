import 'dotenv/config';
import fetch from 'node-fetch';
import { getDomainHotOrNot } from './openAi.js';
import { namecheapApiCall } from './namecheap.js'
import { toBase64 } from './toFile.js'
import { sendMail } from './mail.js';

const ms2s = (ms) => {
    let seconds = ms/1000
    return seconds
}

const getAuctionList = async () => {
    const oneDay = 86400000;
    const today = Date.now();
    const tomorrow = today+oneDay
    let range = `${ms2s(today)}_${ms2s(tomorrow)}`
    try {
        let params = {
            orderby: 'end_time',
            direction: 'asc',
            tld: 'net,org,com',
            endDate: range,
            noHyphens: true,
            noNumbers: true
        }
        const data = await namecheapApiCall('sales', params);
        return data.items;
    } catch (error) {
        console.error(error);
    }
}

const getBidList = async () => {
    try {
        const data = await namecheapApiCall('user/bids');
        return data
        // Process the data
    } catch (error) {
        console.error(error);
    }
}

const getAutctionById = async (id) => {
    try {
        const data = await namecheapApiCall(`sales/${id}`,);
        return data
        // Process the data
    } catch (error) {
        console.error(error);
    }
}

const main = async () => {
    try {
        let domainNames = await getAuctionList();
        let domains = domainNames.map(domain => ({ 
            name: domain.name,
            backlinksCount: domain.backlinksCount, 
            estibotValue: domain.estibotValue, 
            keywordSearchCount: domain.keywordSearchCount, 
            renewPrice: domain.renewPrice, 
            bindInfo: {
                startPrice: domain.startPrice,
                currentPrice: domain.price, 
                bidCount: domain.bidCount, 
                auctionUrl: `https://www.namecheap.com/market/${domain.name}`
            }
        }));
        let domainApproval = await getDomainHotOrNot(JSON.stringify(domains))
        let response = (domainApproval.choices[0].message)
        let content = await toBase64(domainApproval.choices[0].message.content)
        console.log({response: response, content: content})
        sendMail(content)
    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
};

main();