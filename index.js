const { Cluster } =  require('puppeteer-cluster');

const PAGE_REQUEST_COUNT = 100;

(async ()=> {
    console.log(`[Stress Test] Start Time : ${new Date()}`)
    const cluster = await Cluster.launch({
        concurrency: Cluster.CONCURRENCY_CONTEXT,
        maxConcurrency: PAGE_REQUEST_COUNT
    });

    await cluster.task(async ({page, data: url})=> {
        await page.goto(url);
    });
    Array.from({length:PAGE_REQUEST_COUNT}).map(()=> {
        cluster.queue('https://staging.marvelousdesigner.com/learn/newfeature');
    })


   await cluster.idle();
   await cluster.close();
    console.log(`[Stress Test] End Time : ${new Date()}`)
})();

