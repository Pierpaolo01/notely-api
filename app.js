const express = require('express');
const app = express();
const noteRoutes = require('./routes/note.routes')

app.use(express.json())

app.use('/api', noteRoutes)

app.listen(3000, () => {
    console.log('app running on port 3000')
})
