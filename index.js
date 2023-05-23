const setup = () => {
    let firstCard = undefined;
    let secondCard = undefined;
    let winCheckTimeout = null;
    $(".card").on("click", function () {

        if (winCheckTimeout !== null) {
            clearTimeout(winCheckTimeout);
            winCheckTimeout = null;
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

            winCheckTimeout = setTimeout(() => {
                if ($(".card:not(.no-click)").length === 0) {
                    alert("You have won!");
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

$(document).ready(setup);
