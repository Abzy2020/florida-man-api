const express = require("express");
const cheerio = require("cheerio");
const axios = require("axios");

const PORT = 8000;
const app = express();
const headlines = [];
const uniqueHeadlines = [];

app.get('/', (req, res) => {
    res.json('Welcome to the Florida Man API');
})

//returns all latest florida man headlines
app.get('/headlines', (req, res) => {

    //scrapes headlines from WFLA Channel 8
    axios.get('https://www.wfla.com/?submit=&s=florida+man')
        .then((markup) => {
            const html = markup.data;
            const $ = cheerio.load(html);

            //get all a tags in certain div
            $('a[class=article-list__article-link]', 'div[class=article-list__content]' )
            .each((i, item) => {
                const headline = item.attribs['data-link-label'];
                const url = item.attribs.href;
                const subString = "Florida man";
                
                //checks if headline contains "Florida man"
                if (headline.includes(subString) === true){
                    headlines.push({
                        headline,
                        url
                    });
                }
            });
            
            //pushes every other headline into a new array
            for (var i = 0 ; i < headlines.length ; i = i + 2) {
                uniqueHeadlines.push(headlines[i]);
            }

            console.log(uniqueHeadlines);
            res.send(uniqueHeadlines);
        }).catch(err => console.log(err))
})

//returns a random headline 
app.get('/random_headline', (req, res) => {

    //scrapes headlines from WFLA Channel 8
    axios.get('https://www.wfla.com/?submit=&s=florida+man')
        .then((markup) => {
            const html = markup.data;
            const $ = cheerio.load(html);

            //get all a tags in certain div
            $('a[class=article-list__article-link]', 'div[class=article-list__content]' )
            .each((i, item) => {
                const headline = item.attribs['data-link-label'];
                const url = item.attribs.href;
                const subString = "Florida man";
                
                //checks if headline contains "Florida man"
                if (headline.includes(subString) === true){
                    headlines.push({
                        headline,
                        url
                    });
                }
            });
            
            //pushes every other headline into a new array
            for (var i = 0 ; i < headlines.length ; i = i + 2) {
                uniqueHeadlines.push(headlines[i]);
            }

            randomHeadline = Math.floor(Math.random() * uniqueHeadlines.length)

            console.log(uniqueHeadlines[randomHeadline]);
            res.send(uniqueHeadlines[randomHeadline]);
        }).catch(err => console.log(err))
})

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});