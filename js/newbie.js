let btn = $("#newbie_button");
let popup = $(".popup")
let popupParent = $(".popup-fade");
let popupClose = $(".popup-close");
let content = $(".Newbie").find("#newbie-text")
$(btn).on("click", function () {
    $(content).appendTo(popup);
    $(content).css("display", "block");
    $(popupParent).css("display", "block");
});
$(document).on("keydown", function(e) {
    if (e.key === "Escape") {
        e.stopPropagation();
        $(popupParent).css("display", "none");
        $(content).appendTo(btn);
        $(content).css("display", "none");
    }
});
$(popupClose).on("click", function () {
    $(popupParent).css("display", "none");
    $(content).appendTo(btn);
    $(content).css("display", "none");
})
$(popupParent).on("click", function (e) {
    if ($(e.target).closest(popup).length === 0) {
        $(this).css("display", "none");
        $(content).appendTo(btn);
        $(content).css("display", "none");
    }
})