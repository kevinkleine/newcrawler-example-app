import { extract } from '@extractus/feed-extractor';
let entriesFoundTotal = 0;
let entriesSavedTotal = 0;
export default {
    name: 'News Scanner',
    await: [],
    restart: true,
    restartSeconds: 30,
    restartMaxSeconds: 900,
    restartSteps: 30,
    timeoutStartSeconds: 10,
    timeoutStopSeconds: 10,
    runtimeMaxSeconds: 60,
    exec: async function ({ db, providers, log }) {
        const result = await extract('https://news.google.com/atom');
        entriesFoundTotal += (result.entries || []).length;
        let entriesSaved = 0;
        for (let entry of result.entries) {
            const sentiment = providers.sentiment.fromText(
                entry.description || entry.title || ''
            );
            const existingEntry = await db.news_item.findOne({
                where: {
                    publisher_id: entry.id,
                },
            });
            if (!existingEntry) {
                await db.news_item.create({
                    publisher_id: entry.id,
                    title: entry.title || '',
                    description: entry.description || '',
                    link: entry.link,
                    published: entry.published,
                });
                entriesSaved += 1;
            }
        }
        entriesSavedTotal += entriesSaved;
        return `Found ${result.entries.length} items; saved ${entriesSaved}. Found total ${entriesFoundTotal}; saved total ${entriesSavedTotal}`;
        /* return { */
        /*     entriesFound: result.entries.length, */
        /*     entriesSaved, */
        /*     entriesFoundTotal, */
        /*     entriesSavedTotal, */
        /* }; */
    },
    execPostStop: function () {},
};
