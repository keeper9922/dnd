let track = document.querySelector(".track");
let items = document.querySelectorAll(".carousel-item");
let prev = document.querySelector(".prev");
let next = document.querySelector(".next");
let popup = document.querySelector(".popup");
let popupParent = document.querySelector(".popup-fade");
let popupClose = document.querySelector(".popup-close");
let navButtons = document.querySelectorAll("main>header>a");

let index = 0;
function update() {
    track.style.transform = `translateX(${-100*index}%)`;
}

jQuery(function ($) {
    update();
    for (let i = 0; i < navButtons.length; i++) {
        console.log($(navButtons[i]));
        // let content = $(navButtons[i].href).find(".card-full-content")
        // $(navButtons[i]).on("click", function ( ) {
        //     $(content).appendTo(popup);
        //     $(content).css("display", "block");
        //     $(popupParent).css("display", "block");
        // });
        // $(document).on("keydown", function(e) {
        //     if (e.key === "Escape") {
        //         e.stopPropagation();
        //         $(popupParent).css("display", "none");
        //         $(content).appendTo(navButtons[i]);
        //         $(content).css("display", "none");
        //         // $('.popup-fade').fadeOut();
        //     }
        // });
        // $(popupClose).on("click", function () {
        //     $(popupParent).css("display", "none");
        //     $(content).appendTo(navButtons[i]);
        //     $(content).css("display", "none");
        // })
        // $(popupParent).on("click", function (e) {
        //     if ($(e.target).closest(popup).length === 0) {
        //         $(this).css("display", "none");
        //         $(content).appendTo(navButtons[i]);
        //         $(content).css("display", "none");
        //     }
        // })
    }
    for (let i = 0; i < items.length; i++) {
        let cards = items[i].children
        items[i].style.gridTemplateColumns = `repeat(${cards.length-1}, 1fr)`;
        for (let j = 0; j < cards.length; j++) {
            let card = cards[j];
            if(card.className === "card"){
                let content = $(card).find(".card-full-content")
                $(card).on("click", function () {
                    $(content).appendTo(popup);
                    $(content).css("display", "block");
                    // $(popupParent).fadeIn();
                    $(popupParent).css("display", "block");
                });
                $(document).on("keydown", function(e) {
                    if (e.key === "Escape") {
                        e.stopPropagation();
                        $(popupParent).css("display", "none");
                        $(content).appendTo(card);
                        $(content).css("display", "none");
                        // $('.popup-fade').fadeOut();
                    }
                });
                $(popupClose).on("click", function () {
                    $(popupParent).css("display", "none");
                    $(content).appendTo(card);
                    $(content).css("display", "none");
                })
                $(popupParent).on("click", function (e) {
                    if ($(e.target).closest(popup).length === 0) {
                        $(this).css("display", "none");
                        $(content).appendTo(card);
                        $(content).css("display", "none");
                    }
                })
            }
        }
    }
});
prev.addEventListener('click', () => {
    if (index > 0) index--;
    update();
});

next.addEventListener('click', () => {
    if (index < items.length - 1) index++;
    update();
});