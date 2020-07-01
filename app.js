//Declare Vars
let index = 1;
const slides = document.querySelectorAll('.container');
const paragraphs = document.querySelectorAll('.paraGroup');
const plus = document.querySelector('.next');
const minus = document.querySelector('.prev');

//Initialise Start positions
document.addEventListener('DOMContentLoaded', () => {
  paragraphs[index-1].style.opacity = '1'; //First text is visible on load
  slides[index-1].style.left = '0vw'; //First slide is in viewport
  slides[index].style.left = '90vw'; //second slide is just in the viewport on right
  for (i = index + 1; i< slides.length; i++) {
    slides[i].style.left = '100vw'; //other slides are not visible
  }
});

// Load all event listeners 
loadEventListeners(); 

// Create load all event listeners function
function loadEventListeners() {
  // - slide event
  minus.addEventListener('click', indexMinus);
  // + slide event
  plus.addEventListener('click', indexPlus);
}

//Previous and Next Buttons
function indexMinus() {
  index = index -1;
  if (index < 1) {
    index = 1; //if on first slide you cannot go back anymore
  } else {
    showLastSlide(index); //show last slide
  }

}
function indexPlus() {
  index = index + 1;
  if (index > 9) {
    index = 9; //if on last slide you cannot go forward anymore
  } else {
    showNextSlide(index); //show next slide
  }
}

// Display changes due to button pressed
function showNextSlide(x) {
  fadeOut(x); //fade out text
  //Init counters
  let counter1 = 0; 
  let counter2 = 0;
  let counter3 = 0;
  let id = setInterval(frame, 35); //Call frame function every 35ms
  function frame(){
    if (counter1 == 100){ 
      clearInterval(id);
      fadeIn(x); //when animation is over fade in new text
    } else {
      counter1++; //add one to counter
      let y1 = easeInOut(counter1, 100, 100); //calculate new position from sin() function
      let firstxpos = 0 - y1; 
      slides[x-2].style.left = firstxpos + "vw"; //Set new xpos for this iteration
      if (counter1 < 91) {
        counter2++; //add one to counter
        let y2 = easeInOut(counter2, 90, 90); //calculate new position from sin() function
        let secondxpos = 90 - y2;
        slides[x-1].style.left = secondxpos + "vw";  //Set new xpos for this iteration
      }
      if (counter1 < 91 && counter1 > 80 && x!==slides.length) {
        counter3++;//add one to counter
        let y3 = easeInOut(counter3, 10, 10); //calculate new position from sin() function
        let thirdxpos = 100 - y3;
        slides[x].style.left = thirdxpos +'vw'; //Set new xpos for this iteration
      }
    }
  }

}
function showLastSlide(x) {
  fadeOut(x+2);//fade out text
  //Init counters
  let counter1 = 0;
  let counter2 = 0;
  let counter3 = 0;
  let id = setInterval(frame, 35);
  function frame(){
    if (counter1 == 100){
      clearInterval(id); 
      fadeIn(x); //when animation is over fade in new text
    } else {
      counter1++; //add one to counter
      let y1 = easeInOut(counter1, 100, 100); //calculate new position from sin() function
      let firstxpos = -100 + y1;
      slides[x-1].style.left = firstxpos + "vw"; //Set new xpos for this iteration
      if (counter1 > 10) {
        counter2++; //add one to counter
        let y2 = easeInOut(counter2, 90, 90); //calculate new position from sin() function
        let secondxpos = 0 + y2;
        slides[x].style.left = secondxpos +"vw"; //Set new xpos for this iteration
      }
      if (counter1 > 20 && counter1 < 41 && x!==(slides.length-1)) {
        counter3++; //add one to counter
        let y3 = easeInOut(counter3, 10, 20); //calculate new position from sin() function
        let thirdxpos = 90 + counter3;
        slides[x+1].style.left = thirdxpos +'vw'; //Set new xpos for this iteration
      }
    }
  }
}

function fadeOut(n) {
  paragraphs[n-2].style.opacity = '0'; //fade out text
} 
function fadeIn(n) {
  paragraphs[n-1].style.opacity = '1'; //fade in text
}
function easeInOut (n, counterRange, range) {
  let y = (counterRange/2) * (Math.sin((((n-(range/2))*(Math.PI))/range))+1); //Sin function that eases in and out, range is the max value, counter range is over what counter period the animation will take place
  return y;  
}