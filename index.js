let clickCount = 0;
let pairs = 0;
let totalPairs; //default, changes based off diff
let DIFFICULTY = undefined;

function setState(state) {
    if(state == "GAME") {
        $("#difficulties").hide();
        $("#start").hide();
        $("#stats").show();
        $("#game_grid").show();
        $("#reset").show();
        $("#colourButtons").show();
        console.log("game state");
    } else if(state == "MENU") {
        DIFFICULTY = undefined;
        //time = 0;
        $("#stats").hide();
        $("#game_grid").hide();
        $("#reset").hide();
        $("#colourButtons").hide();
        $("#difficulties").show();
        $("#start").show();
        console.log("menu state");
    }
}
setState("MENU");

function selectDifficulty() {
    // Default to easy difficulty
    totalPairs = 3;

    $("#easy, #medium, #hard").on("click", function () {
        totalPairs = this.value;
        DIFFICULTY = $(this).attr("id");

        $("#game_grid").removeClass();
        $("#game_grid").addClass($(this).attr("id"));
        $("#game_grid").empty();

        switch ($(this).attr("id")) {
            case "easy":
                time = 30;
                break;
            case "medium":
                time = 100;
                break;
            default:
                time = 200;
        }

        // initializeCards();

        //setState("GAME");
        //makeGrid();
    });
}


function initializeCards() {
    //$("#game_grid").empty();

    fetch('https://pokeapi.co/api/v2/pokemon?limit=450')
    .then(response => response.json())
    .then(data => {
        let pokemonCollection = data.results;
        let randomPokemon = [];

        // Pick random Pokemon based off the selected difficulty
        for (let i = 0; i < totalPairs; i++) {
            let randomIndex = Math.floor(Math.random() * pokemonCollection.length);
            randomPokemon.push(pokemonCollection[randomIndex]);
        }

        // For each random Pokemon, get the Pokemon's data (including image URL)
        Promise.all(
        randomPokemon.map((pokemon, index) => {
            // Return a new Promise for each fetch request
            return fetch(pokemon.url)
            .then(response => response.json())
            .then(pokemonData => {
                // Create two new cards with the Pokemon's image
                for (let i = 0; i < 2; i++) {
                let card = `
                    <div class="card">
                    <img id="img${index * 2 + i + 1}" class="front_face" src="${pokemonData.sprites.other['official-artwork'].front_default}" alt="${pokemonData.name}">
                    <img class="back_face" src="back.webp" alt="">
                    </div>
                `;

                // Append the new card to the game grid
                $("#game_grid").append(card);
                }
            });
        })
        ).then(() => {
        // Now that all fetch requests have completed, we can shuffle the cards and calculate totalPairs

        shuffleCards();

        //totalPairs = $(".card").length / 2;
        console.log("Cards: " + totalPairs);
        //$("#remaining-pairs").text(`Remaining Pairs: ${totalPairs}`);

        // Show the game
        //$("#game").show();

        setup();

        //startTimer();
        });
    });

}

function shuffleCards() {
    let cards = $("#game_grid").children();
    let cardArray = $.makeArray(cards);
  
    // Actually perform the shuffle
    cardArray.sort(function () { return Math.random() - 0.5; });
  
    // Empty the game grid and re-append the cards in the new order
    $("#game_grid").empty();
    $.each(cardArray, function (idx, itm) { $("#game_grid").append(itm); });
  }

function makeGrid() {
    //$("#game_grid").empty();
    for (i = 0; i < totalPairs * 2; i++) {
        var cardDiv = $("<div>").addClass("card");
        // Create the front face image element
        var frontFaceImg = $("<img>")
            .attr("id", `img${i+1}`)
            .addClass("front_face")
            .attr("src", "001.png")
            .attr("alt", "");

        // Create the back face image element
        var backFaceImg = $("<img>")
            .addClass("back_face")
            .attr("src", "back.webp")
            .attr("alt", "");

        // Append the front and back face images to the card div
        cardDiv.append(frontFaceImg, backFaceImg);

        // Append the card div to the game_grid div
        $("#game_grid").append(cardDiv);
    }
    $("#game_grid").append();
    setup();
}

const setup = () => {
    let firstCard = undefined;
    let secondCard = undefined;
    let winCheckTimeout = null;

    $("#click-counter").text(`Number of Clicks: ${clickCount}`);
    $("#pairsLeft").text(`Pairs Left: ${totalPairs - pairs}`);
    $("#pairsMatch").text(`Pairs Matched: ${pairs}`);
    $("#noPairs").text(`Total pairs: ${totalPairs}`);

    $(".card").on("click", function () {
        if (winCheckTimeout !== null) {
            clearTimeout(winCheckTimeout);
            winCheckTimeout = null;
        }

        if (!$(this).hasClass("flip")) {
            clickCount++;
            $("#click-counter").text(`Number of Clicks: ${clickCount}`);
        }

        if (!firstCard) {
            $(this).toggleClass("flip");

            firstCard = $(this).find(".front_face")[0];
        } else {
            if (!secondCard) {
                secondCard = $(this).find(".front_face")[0];
                console.log(firstCard, secondCard);

                if (!(firstCard.id == secondCard.id)) {
                    $(this).toggleClass("flip");
                    match();
                } else {
                    console.log("same id");

// ----------------- just reset the second cuz we can still match another w/ the first -------------
// ----------------- esentially when a single card is clicked twice it appears to do nothing -------
                    secondCard = undefined;
                }
            } else {
                console.log("alrady ha 2 ");
                console.log(firstCard, secondCard);
                //may not need this
            }
        }
    });
    function match() {
        if (firstCard.src == secondCard.src) {
            console.log("match");
            $(`#${firstCard.id}`).parent().off("click").addClass("no-click");
            $(`#${secondCard.id}`).parent().off("click").addClass("no-click");
            firstCard = undefined;
            secondCard = undefined;

            pairs++;

            $("#pairsLeft").text(`Pairs Left: ${totalPairs - pairs}`);
            $("#pairsMatch").text(`Pairs Matched: ${pairs}`);
            $("#noPairs").text(`Total pairs: ${totalPairs}`);

            winCheckTimeout = setTimeout(() => {
                if ($(".card:not(.no-click)").length === 0) {
                    alert(`You've won in ${clickCount} clicks with ${time} seconds left to spare!`);
                    reset();
                }
            }, 1000);
        } else {
            console.log("no match");
            setTimeout(() => {
                $(`#${firstCard.id}`).parent().toggleClass("flip");
                $(`#${secondCard.id}`).parent().toggleClass("flip");
                firstCard = undefined;
                secondCard = undefined;
            }, 1000);
        }
    }
};

//Change the backgroun colour of the cards
$("#dark").on("click", function () {
    $(".front_face").removeClass("sepia");
    $(".front_face").addClass("dark");
    $(".back_face").removeClass("sepia");
    $(".back_face").addClass("dark");
});

$("#sepia").on("click", function () {
    $(".front_face").removeClass("dark");
    $(".front_face").addClass("sepia");
    $(".back_face").removeClass("dark");
    $(".back_face").addClass("sepia");
});

function powerUp() {

    console.log("POWER UP ACTIVATE");

    $(".card:not(.flip)").addClass("powerUp");


    setTimeout(function() {
        $(".card.powerUp").removeClass("powerUp");
    }, 1000);
}


$(document).ready(selectDifficulty);
//$(document).ready(setup);
