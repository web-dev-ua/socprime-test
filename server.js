const express = require('express');
const app = express();

app.use(express.static('dist'));

app.get('/names', function (req, res) {
    let namesList = require('./src/json/names.json');
    let needle = req.query.needle;
    let showItemsCount = 5;

    let result = namesList.filter(i => {
        return (!needle || i.toLowerCase().startsWith(needle.toLowerCase()));
    }).slice(0, showItemsCount);

    res.json(result);
});

app.listen(3000, function () {
    console.log('App listening on port 3000!');
});