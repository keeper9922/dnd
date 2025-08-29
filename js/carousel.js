track = document.querySelector(".track");
items = document.querySelectorAll(".carousel-item");
prev = document.querySelector(".prev");
next = document.querySelector(".next");

let index = 0;
document.addEventListener("DOMContentLoaded", () => {
    console.log(items.length);
    for (let i = 0; i < items.length; i++) {
        // items[i].style.gridTemplateColumns = `repeat(${items[i].childNodes.length}, 1fr)`;
        console.log(items[i].childNodes.length);
        console.log(" ");
    }
});
function update() {
    track.style.transform = `translateX(${-100*index}%)`;
}
prev.addEventListener('click', () => {
    if (index > 0) index--;
    update();
});

next.addEventListener('click', () => {
    if (index < items.length - 1) index++;
    update();
});