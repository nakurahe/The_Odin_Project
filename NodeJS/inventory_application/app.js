const express = require("express");
const db = require("./db/queries");
const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

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
    const id = req.params.id;
    try {
        const loveItem = await db.getInventoryById(parseInt(id));
        if (!loveItem) {
            res.status(404).render("pages/error", { title: "Page Not Found" });
            return;
        }
        const purchaseHistory = await db.getPurchaseHistoryByItemId(parseInt(id));
        loveItem.purchaseHistory = purchaseHistory;
        res.render("pages/detail", {
            title: loveItem.name,
            loveItem,
        });
    } catch (error) {
        console.log(error);
        res.status(500).render("pages/error", { title: "Database Error" });
    }
});

app.get("/order/:id", (req, res) => {
    res.render("pages/order", {
        title: "Order",
        id: req.params.id,
    });
});

app.use((req, res) => {
    res.status(404).render("pages/error", { title: "Page Not Found" });
});

app.listen(port, () => {
    console.log(`APP listening at http://localhost:${port}`);
});
