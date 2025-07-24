const express = require('express');
const app = express();

// PORT DECLARATION
const PORT = process.env.PORT ?? 5000;

// SERVER INITIALIZATION

app.listen((PORT, () => console.log(`Server listening at PORT:${PORT}`)))

