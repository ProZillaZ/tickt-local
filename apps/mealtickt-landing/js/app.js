const openPopupIcon = document.getElementById("open-popup");
const closePopupIcon = document.getElementById("close-popup");
const navbarPopup = document.querySelector(".navbar__popup");

// Initially hide the close icon
closePopupIcon.style.display = "none";

// Function to show the popup
const showPopup = () => {
  navbarPopup.classList.add("active");
  openPopupIcon.style.display = "none";
  closePopupIcon.style.display = "block";
};

// Function to hide the popup
const hidePopup = () => {
  navbarPopup.classList.remove("active");
  closePopupIcon.style.display = "none";
  openPopupIcon.style.display = "block";
};

// Add event listeners for toggling the popup and icons
openPopupIcon.addEventListener("click", (event) => {
  event.stopPropagation();
  showPopup();
});

closePopupIcon.addEventListener("click", (event) => {
  event.stopPropagation();
  hidePopup();
});

// Close popup if clicking outside of it
document.addEventListener("click", (event) => {
  if (!navbarPopup.contains(event.target) && event.target !== openPopupIcon) {
    hidePopup();
  }
});

AOS.init();
