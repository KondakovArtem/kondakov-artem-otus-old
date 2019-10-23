import { Server } from 'http';
export const PORT = 3000;

export async function init(){
    const server = new Server((request, response) => {
        //console.log(request.url);
        setTimeout(() => {
            response.end(`done - ${request.url}`);
        }, 100);
    });

    return new Promise((resolve, reject) => {
        server.listen(PORT, (err) => {
            if (err) {
                console.log('something bad happened', err);
                reject(err);
                return
            }
            console.log(`server is listening on ${PORT}`);
            resolve(server);
        });
    })
}
