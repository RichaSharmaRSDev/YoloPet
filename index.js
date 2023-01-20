window.onload = function () {
  fetch("index.json")
    .then((response) => response.json())
    .then((jsondata) => append(jsondata));

  function append(jsondata) {
    let data = jsondata;
    let count = 0; //count of 20 pics

    createCards(data, count);
  }

  function createCards(data, count) {
    let reachedLastElement = false;

    for (let i = count * 20; i < count * 20 + 20; i++) {
      //displaying 20 images at once.

      if (i < data.length) {
        console.log(data.length);
        //default details to be displayed.
        let petImage = data[i].src;
        let petName = data[i].name;
        let petAge = data[i].age;

        //additional details to be displayed on click of pet.
        let adoptionFees = data[i].fee;
        let description = data[i].description;
        let gender = data[i].gender;
        let type = data[i].petType;

        // creating individual pet cards
        const petConatiner = document.getElementsByClassName("petContainer");

        var petCards = document.createElement("div");
        petCards.classList.add("petCards");

        petCards.innerHTML = `
        <p class="imageCont"><img class="petImage" src="${petImage}" alt="${description}"></p>
        <p class="petName">${petName}</p>
        <p class="petAge">Age: ${petAge} years</p>
        <button class="cardButton" aria-label="Select to know more about the pet ${petName}.">Show More</button>
        <div class="additionalDetails">
          <p class="type">${type}</p>
          <p class="gender">${gender}</p>
          <p class="adoptionfees">Adoption fee:${adoptionFees}</p>
          <p class="description">${description}</p>
        </div>`;

        petConatiner[0].appendChild(petCards);
      } else {
        reachedLastElement = true;
      }
    }

    if (!reachedLastElement) {
      count++;
    }

    //on click of the pet display additional details
    var cards = document.getElementsByClassName("petCards");
    var cardButtons = document.getElementsByClassName("cardButton");
    for (var i = 0; i < cards.length; i++) {
      var card = cards[i];
      card.onclick = function (e) {
        this.children[4].classList.toggle("active");
      };
      cardButtons.onclick = function (e) {
        this.parent.children[4].classList.toggle("active");
      };
    }

    scrollAddmoreCards(data, count, reachedLastElement);
  }

  function scrollAddmoreCards(data, count, reachedLastElement) {
    //on reaching the last 20th element , display more 20 pets.
    let lastPic = count * 20 - 1;
    window.onscroll = function () {
      if (!reachedLastElement) {
        let lastElement =
          document.querySelector(".petContainer").children[lastPic];

        var distance = lastElement.getBoundingClientRect();

        const isInViewport =
          distance.top >= 0 &&
          distance.left >= 0 &&
          distance.bottom <=
            (window.innerHeight || document.documentElement.clientHeight) &&
          distance.right <=
            (window.innerWidth || document.documentElement.clientWidth);

        if (isInViewport) {
          createCards(data, count);
        }
      }
    };
  }
};
