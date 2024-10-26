const express = require("express");
const app = express();

app.get("/index.html", (req, res) => res.sendFile(__dirname + "/index.html"));
app.get("/about.html", (req, res) => res.sendFile(__dirname + "/about.html"));
app.get("/contact-me.html", (req, res) => res.sendFile(__dirname + "/contact-me.html"));
app.use((req, res) => res.status(404).sendFile(__dirname + "/404.html"));
const PORT = 3000;
app.listen(PORT);