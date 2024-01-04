const { Cluster } =  require('puppeteer-cluster');

(async ()=> {
    console.log(`[Stress Test] Start Time : ${new Date()}`)
    const cluster = await Cluster.launch({
        concurrency: Cluster.CONCURRENCY_CONTEXT,
        maxConcurrency: 100
    });

    await cluster.task(async ({page, data: url})=> {
        await page.goto(url);
    });
    Array.from({length:100}).map(()=> {
        cluster.queue('https://staging.marvelousdesigner.com/learn/newfeature');
    })


   await cluster.idle();
   await cluster.close();
    console.log(`[Stress Test] End Time : ${new Date()}`)
})();

