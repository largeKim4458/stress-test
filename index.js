const { Cluster } =  require('puppeteer-cluster');

const REQUEST_COUNT = 100;
const REQUEST_PAGE = 'http://front.marvelousdesigner.com:3000/ko/pricing';


(async () => {

    console.log(`[Stress Test] Start Time : ${new Date()} - REQUEST_COUNT : ${REQUEST_COUNT}`)

    const cluster = await Cluster.launch({
        concurrency: Cluster.CONCURRENCY_CONTEXT,
        maxConcurrency: 2,
        monitor: true
    });

    for (const clusterKey in Array.from({length:REQUEST_COUNT })) {
        cluster.queue(async ({ page }) => {
            // await page.setCookie(
            //     [
            //         {
            //             "name":"jwt_token",
            //             "value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJDbG9NREF1dGgiLCJqdGkiOiI2ZmJkOWVhZjQ3YTc0NWI0ODNmMjJhNTdhMmU3ZGIzNyIsImF1dGhfdGltZSI6IjA0LzI2LzIwMjQgMDM6NTk6MTgiLCJleHAiOjE3MTUzMTM1NTgsIm5hbWVpZCI6Il80MDBfIiwiaXNzIjoibWQiLCJhdWQiOiJtZCJ9.mx8bud5HMfhO5VofOdlXRRt81u4Mhz5NodmB5xwh0iU",
            //             "domain": ".marvelousdesigner.com"
            //         }
            //     ]
            // )

            await page.goto(REQUEST_PAGE);
        });
    }

    await cluster.idle();
    await cluster.close();
    console.log(`[Stress Test] End Time : ${new Date()}`)

})();