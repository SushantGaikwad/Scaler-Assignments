// WRITE SOLUTION HERE
const allStars = document.querySelectorAll(".star");
console.log(">>>  allStars : ", allStars);
const count = document.getElementById("count");
let rating = 0;
allStars.forEach((star) => {
  star.addEventListener("mouseenter", () => {
    console.log(">>>  mouseover : ");
    const dataIndex = star.getAttribute("data-index");
    console.log(">>>  dataIndex : ", dataIndex);
    addClass(dataIndex);
  });
  star.addEventListener("mouseout", () => {
    removeClass();
    rating = 0;
  });
  star.addEventListener("click", () => {
    console.log(">>>  clicked : ");
    const dataIndex = star.getAttribute("data-index");
    console.log(">>>  dataIndex : ", dataIndex);
    addClass(dataIndex);
    rating = dataIndex;
    updateRating(rating);
  });
});

const addClass = (value) => {
  allStars.forEach((star) => {
    const dataIndex = star.getAttribute("data-index");
    star.classList.toggle("star-filled", dataIndex <= value);
  });
};

const removeClass = () => {
  allStars.forEach((star) => {
    star.classList.remove("star-filled");
  });
};

const updateRating = (value) => {
  count.innerText = rating;
  // allStars.forEach((star) => {
  //   const dataIndex = star.getAttribute("data-index");
  //   if (dataIndex <= value) {
  //     star.classList.add("filled");
  //   }
  // });
};


// Get all the star elements
// const stars = document.querySelectorAll('.star');

// // Initialize the star points global value
// let starPoints = 0;

// // Function to update the stars color and star points count
// function updateStars(event, clicked = false) {
//   // Get the target star index
//   const targetIndex = parseInt(event.target.getAttribute('data-index'));

//   // Loop through all the stars
//   stars.forEach((star, index) => {
//     // Add or remove the 'star-filled' class based on the target index
//     if (index < targetIndex) {
//       star.classList.add('star-filled');
//     } else {
//       star.classList.remove('star-filled');
//     }
//   });

//   // Update the star points global value
//   starPoints = clicked ? targetIndex : starPoints;

//   // Update the Rating Count
//   document.getElementById('count').textContent = starPoints;
// }

// // Event listeners
// stars.forEach(star => {
//   // Mouse hover event
//   star.addEventListener('mouseover', updateStars);

//   // Mouse click event
//   star.addEventListener('click', event => {
//     updateStars(event, true);
//   });
// });

// // Mouse leave event for the star container
// document.getElementById('star-container').addEventListener('mouseleave', () => {
//   // Update the stars color based on the star points global value
//   updateStars({ target: stars[starPoints - 1] });
// });