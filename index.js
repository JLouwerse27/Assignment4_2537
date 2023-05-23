const setup = () => {
    let firstCard = undefined;
    let secondCard = undefined;
    $(".card").on("click", function () {
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
                    // -- reset only the second cuz we can still match another w/ the first
                    // -- esentially this does "nothing" when single card is clicked twice
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
            $(`#${firstCard.id}`).parent().off("click");
            $(`#${secondCard.id}`).parent().off("click");
            firstCard = undefined;
            secondCard = undefined;
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
