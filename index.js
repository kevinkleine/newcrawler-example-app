/* import '@extractus/feed-extractor'; */
/* import * as saaswrap from './saaswrap'; */

/* saaswrap(__dirname) */

import { extract } from '@extractus/feed-extractor'

// extract a RSS
const result = await extract('https://news.google.com/rss')
console.log(result)
// unused  
