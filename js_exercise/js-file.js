const container = document.querySelector("#container");

// Example of creating a div element
const content = document.createElement("div");
content.classList.add("content");
content.textContent = "This is the glorious text-content!";

container.appendChild(content);

// a <p> with red text that says “Hey I’m red!”
const redWord = document.createElement("p");
redWord.textContent = "Hey I'm red!";
redWord.style.color = "red";

container.appendChild(redWord);

// an <h3> with blue text that says “I’m a blue h3!”
const blueWord = document.createElement("h3");
blueWord.textContent = "I'm a blue h3!";
blueWord.style.color = "blue";

container.appendChild(blueWord);

// a <div> with a black border and pink background color with the following elements inside of it:
// another <h1> that says “I’m in a div”
// a <p> that says “ME TOO!”
const specialDiv = document.createElement("div");
specialDiv.style.border = "1px solid black";
specialDiv.style.backgroundColor = "pink";

specialDiv.appendChild(document.createElement("h1")).textContent = "I'm in a div";
specialDiv.appendChild(document.createElement("p")).textContent = "ME TOO!";

container.appendChild(specialDiv);