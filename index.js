const { Cluster } =  require('puppeteer-cluster');

const REQUEST_COUNT = 100;
const REQUEST_PAGE = 'https://staging.marvelousdesigner.com/learn/newfeature';

(async ()=> {
    console.log(`[Stress Test] Start Time : ${new Date()}`)
    const cluster = await Cluster.launch({
        concurrency: Cluster.CONCURRENCY_CONTEXT,
        maxConcurrency: REQUEST_COUNT
    });

    await cluster.task(async ({page, data: url})=> {
        await page.goto(url);
    });
    Array.from({length:REQUEST_COUNT}).map(()=> {
        cluster.queue(REQUEST_PAGE);
    })


   await cluster.idle();
   await cluster.close();
    console.log(`[Stress Test] End Time : ${new Date()}`)
})();

