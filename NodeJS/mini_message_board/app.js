const express = require("express");
const db = require("./db/queries");
const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

// Middleware to handle search queries
app.use(async (req, res, next) => {
    const searchQuery = req.query.search;
    if (searchQuery) {
        try {
            const messages = await db.findMessagesByUsername(searchQuery);
            if (messages.length > 0) {
                return res.redirect(`/message/${messages[0].id}`);
            } else {
                return res.status(404).send("Message Not Found");
            }
        } catch (error) {
            console.log(error);
            return res.status(500).send("Database Server Error");
        }
    }
    next();
});

app.get("/", async (req, res) => {
    try {
        const messages = await db.getAllMessages();
        res.render("pages/index", {
            messages,
            title: "Mini Message Board",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send("Database Server Error");
    }

});

app.get("/message/new", (req, res) => {
    res.render("pages/new", { title: "New Message" });
});

app.post("/message/new", async (req, res) => {
    const message = {
        message: req.body.text,
        username: req.body.user,
    };
    try {
        await db.insertMessage(message);
        res.redirect("/");
    } catch (error) {
        console.log(error);
        res.status(500).send("Database Server Error");
    }
});

app.get("/message/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const message = await db.findMessageByID(parseInt(id));
        if (message) {
            res.render("pages/message", {
                title: "Message Details",
                message: message,
            });
        } else {
            res.status(404).send("Message Not Found");
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Database Server Error");
    }
});

app.use((req, res) => {
    res.status(404).send("Page Not Found");
});

app.listen(port, () => {
    console.log(`App listening at port ${port}`);
});
