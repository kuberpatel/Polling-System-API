const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;
require('./config/mongoose');


app.use(express.urlencoded({ extended: true }));

app.use('/', require('./routes'));


//listening on port
app.listen(PORT, () => {
    console.log(`Server is running on port:${PORT}`);
});
