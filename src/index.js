let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});
const toyForm = document.querySelector(".add-toy-form");
toyForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = event.target.name.value;
  const image = event.target.image.value;
  const toy = {
    name: name,
    image: image,
    likes: 0,
  };
  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(toy),
  })
    .then((response) => response.json())
    .then((newToy) => {
      const toyCollection = document.querySelector("#toy-collection");
      const toyCard = document.createElement("div");
      toyCard.className = "card";
      toyCard.innerHTML = `
        <h2>${newToy.name}</h2>
        <img src="${newToy.image}" class="toy-avatar" />
        <p>${newToy.likes} Likes </p>
        <button class="like-btn">Like ❤️</button>
      `;
      toyCollection.appendChild(toyCard);
      const likeButton = toyCard.querySelector(".like-btn");
      likeButton.addEventListener("click", () => {
        newToy.likes++;
        fetch(`http://localhost:3000/toys/${newToy.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ likes: newToy.likes }),
        })
          .then((response) => response.json())
          .then((updatedToy) => {
            const likesParagraph = toyCard.querySelector("p");
            likesParagraph.innerText = `${updatedToy.likes} Likes`;
          });
      });
    }
    );
  toyForm.reset();
}
);
const toyCollection = document.querySelector("#toy-collection");
