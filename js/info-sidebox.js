/* THIS IS TO OPEN OR CLOSE INFO-SIDEBOX BY CLICKING THE INFO ICON */
const infoIcon = document.querySelector("#info-icon-btn");
const infoSidebox = document.querySelector("#info");
const closer = infoSidebox.querySelector(".closer");

infoIcon.addEventListener("click", () => {
    infoSidebox.classList.add("active");
});
closer.addEventListener("click", () => {
    infoSidebox.classList.remove("active");
});