import {default as req} from 'request-promise-native';
import { PORT } from '../src/server.mjs';

export const SERIAL_MODE = 'serial';
export const PARALLEL_MODE = 'parallel';
export const DEFAULT_URL = `http://localhost:${PORT}`;

export async function request(reqCount, reqType) {
    const res = [];
    if (reqType === SERIAL_MODE) {
        for (let idx=0; idx < reqCount; idx++){
            const requestUrl = `${DEFAULT_URL}/${reqType}/${idx+1}`;
            try{
                //console.log(`requesting for ${requestUrl}`);
                const response = await req(requestUrl);
                //console.log(`response for ${requestUrl} - ${response}`);
                res.push({
                    request: requestUrl,
                    response: response
                })
            } catch (e) {
                // Do something if error happens
                console.error(`${requestUrl} - An error occurs ${e.message}`);
            }
        }
    } else
    if (reqType === PARALLEL_MODE) {
        try {
            const promises = [];
            for (let idx = 0; idx < reqCount; idx++) {
                const requestUrl = `${DEFAULT_URL}/${reqType}/${idx+1}`;
                //console.log(`requesting for ${requestUrl}`);
                promises.push(req(requestUrl).then((response) => {
                    //console.log(`response for ${requestUrl} - ${response}`);
                    res.push({
                        request: requestUrl,
                        response: response
                    })
                }).catch((e) => {
                    console.error(`${requestUrl} - An error occurs ${e.message}`);
                }));
            }
            await Promise.all(promises);
        } catch (e) {
            // Do something if error happens
            console.error('An error occurs', e.message);
        }
    }
    return res;
}

