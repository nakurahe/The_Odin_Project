const express = require("express");
const db = require("./db/queries");
const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.get("/", async(req, res) => {
    try {
        const loveItems = await db.getAllInventory();
        res.render("pages/index", {
            title: "~ NyanyanyA ~",
            loveItems,
        });
    } catch (error) {
        console.log(error);
        res.status(500).render("pages/error", { title: "Database Error" });
    }
});

app.get("/items/:id", async(req, res) => {
    try {
        const loveItem = await db.getInventoryById(req.params.id);
        if (!loveItem) {
            res.status(404).render("pages/error", { title: "Page Not Found" });
            return;
        }
        res.render("pages/detail", {
            title: loveItem.name,
            loveItem,
        });
    } catch (error) {
        console.log(error);
        res.status(500).render("pages/error", { title: "Database Error" });
    }
});

app.use((req, res) => {
    res.status(404).render("pages/error", { title: "Page Not Found" });
});

app.listen(port, () => {
    console.log(`APP listening at http://localhost:${port}`);
});
