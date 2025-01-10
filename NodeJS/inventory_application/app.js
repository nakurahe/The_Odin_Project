const express = require("express");
const db = require("./db/queries");
const app = express();

const multer = require("multer");
const upload = multer({ dest: "public/images" });

const port = 3000;
const randomItemNumber = 3;
const genres = ["Mental", "Physical", "General"];

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async(req, res) => {
    try {
        const loveItems = await db.getKRandomInventory(randomItemNumber);
        res.render("pages/index", {
            title: "~ NyanyanyA ~",
            loveItems,
            h1Contents: "Welcome to Nyanya Love Item Admin Page!",
            pContents: `Here are ${randomItemNumber} items that you might love ❤️`,
        });
    } catch (error) {
        console.log(error);
        res.status(500).render("pages/error", { title: "Database Error" });
    }
});

app.get("/items/new", (req, res) => {
    res.render("pages/new", { title: "New Item", genres, });
});

app.post("/items", upload.single('image_path') ,async(req, res) => {
    const { name, description, energy_level, provider, genre } = req.body;
    try {
        const providers = Array.isArray(provider) ? provider : [provider];
        const providerString = providers.join(" | "); // Join providers with " | "

        const image_path = req.file ? `/images/${req.file.filename}` : null;
        await db.createItem({
            name,
            description,
            energy_level: parseInt(energy_level, 10),
            provider: providerString,
            genre,
            image_path,
        });
        res.redirect("/");
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
        // const purchaseHistory = await db.getPurchaseHistoryByItemId(parseInt(id));
        // loveItem.purchaseHistory = purchaseHistory;
        res.render("pages/detail", {
            title: loveItem.name,
            loveItem,
        });
    } catch (error) {
        console.log(error);
        res.status(500).render("pages/error", { title: "Database Error" });
    }
});

app.get("/items", async(req, res) => {
    try {
        const loveItems = await db.getAllInventory();
        res.render("pages/index", {
            title: "All Items",
            loveItems,
            pContents: "Here are all current available items ❤️",
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
