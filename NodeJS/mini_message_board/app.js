const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');
const path = require('path');

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

// Path to the JSON file
const filePath = path.join(__dirname, 'data.json');

const readData = (filePath) => {
		const data = fs.readFileSync(filePath, 'utf8');
		return JSON.parse(data);
}

const writeData = (filePath, data) => {
		fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

let messages = readData(filePath);
 
app.get('/', (req, res) => {
    res.render('pages/index',{
        messages: messages,
        title: 'Mini Message Board' });
});

app.get('/message/new', (req, res) => {
    res.render('pages/new', {title: 'New Message'});
});

app.post('/message/new', (req, res) => {
    const message = {
				id: messages.length + 1,
        text: req.body.text,
        user: req.body.user,
        added: new Date()
    };
    messages.push(message);
		writeData(filePath, messages);
    res.redirect('/');
});

app.get('/message/:id', (req, res) => {
	const id = req.params.id;
	const message = messages.find(m => m.id === parseInt(id));
	if (message) {
			res.render('pages/message', { title: 'Message Details', message: message });
	} else {
			res.status(404).send('Message Not Found');
	}
});

app.use((req, res) => {
		res.status(404).send('Page Not Found');
});

app.listen(port, () => {
    console.log(`App listening at port ${port}`);
});