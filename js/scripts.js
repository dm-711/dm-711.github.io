/* Search Containers */

// Get all search containers
let searchContainers = document.querySelectorAll('.search-container');

// Loop through each search container
searchContainers.forEach(searchContainer => {
  // Get references to the search input, clear button, and search icon for this container
  let searchInput = searchContainer.querySelector('input[type="text"]');
  let clearBtn = searchContainer.querySelector('.clear-icon');
  let searchIcon = searchContainer.querySelector('.search-icon');

  // Show/hide the clear button based on whether there is text in the search input
  searchInput.addEventListener('input', () => {
    clearBtn.style.display = searchInput.value ? 'block' : 'none';
  });

  // Clear the search input and hide the clear button when the clear button is clicked
  clearBtn.addEventListener('click', () => {
    searchInput.value = '';
    clearBtn.style.display = 'none';
  });

  // Change the color of the search icon and clear button when the search input is in focus
  searchInput.addEventListener('focus', () => {
    searchIcon.style.color = '#007bff';
    clearBtn.style.color = '#007bff';
  });

  // Change the color of the search icon and clear button when the search input is out of focus
  searchInput.addEventListener('blur', () => {
    searchIcon.style.color = '#aaa';
    clearBtn.style.color = '#aaa';
  });
});

/* End Search Containers */

/* Help Methods */

// Set the size of a child element based on the size of its parent element
function adjustSize(parentClass, childClass, width = true, height = true) {
    let parent = document.querySelector(parentClass);
    let child = document.querySelector(childClass);
    if (width) {
      child.style.width = parent.clientWidth + 'px';
    }
    if (height) {
        child.style.height = parent.clientHeight + 'px';
    }
}

// Debounce a function call so that it only gets called once every specified delay
function debounce(func, delay) {
    let timeout;
    return function () {
        let context = this,
            args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(function () {
            timeout = null;
            func.apply(context, args);
        }, delay);
    };
}

// When the DOM is loaded, set the sizes of various elements and set up a debounced resize event listener
document.addEventListener('DOMContentLoaded', function () {
    // Set the sizes of various elements
    adjustSize('.header', '.header-container');
    adjustSize('.left-sidebar', '.left-sidebar-container');
    adjustSize('.left-sidebar', '.footer', true,false);
    adjustSize('.right-sidebar', '.right-sidebar-container');
    adjustSize('.categories', '.search-container', true, false);
    adjustSize('.right-sidebar', '.slider-container .slider', true, false);

    // Set up a debounced resize event listener
    let debouncedResize = debounce(function () {
        adjustSize('.header', '.header-container');
        adjustSize('.left-sidebar', '.left-sidebar-container');
        adjustSize('.left-sidebar', '.footer', true, false);
        adjustSize('.right-sidebar', '.right-sidebar-container');
        adjustSize('.categories', '.search-container', true, false);
        adjustSize('.right-sidebar', '.slider-container .slider', true, false);
    }, 100);

    window.addEventListener('resize', debouncedResize);
});

/* End Help Methods */

/* Header Container */

let myElement = document.querySelector('.header-container');
let lastScrollPosition = 0;

function handleScroll() {
  let currentScrollPosition = window.pageYOffset;

  if (currentScrollPosition > lastScrollPosition) {
    // scrolling down
    myElement.style.position = 'relative';
  } else {
    // scrolling up
    myElement.style.position = 'fixed';
  }

  lastScrollPosition = currentScrollPosition;
}

window.addEventListener('scroll', debounce(handleScroll, 10));

let sidebar = document.querySelector('.left-sidebar');
let sidebarOpen = false;

function openSidebar() {

  if (sidebarOpen) {
    closeSidebar();
  } else {
    sidebar.classList.add('left-sidebar-responsive');
    sidebar.style.display = 'flex';
    sidebarOpen = true;
  
    // Event listener for scrolling
    document.addEventListener('scroll', closeSidebarOnScroll);
  
    // Event listener for window resize
    window.addEventListener('resize', closeSidebarOnResize);
    
    // Event listener for fullscreen change
    document.addEventListener('fullscreenchange', closeSidebarOnFullscreenChange);
  
    // Event listener for window minimize
    window.addEventListener('blur', closeSidebarOnBlur);
  
    // Event listener for window ordering change
    window.addEventListener('focus', closeSidebarOnFocus);
  }
}

function closeSidebar() {
  sidebar.style.display = 'none';
  toggleMenu();
  sidebar.classList.remove('left-sidebar-responsive');
  sidebarOpen = false;

  // Remove event listener for scrolling
  document.removeEventListener('scroll', closeSidebarOnScroll);

  // Remove event listener for window resize
  window.removeEventListener('resize', closeSidebarOnResize);

  // Remove event listener for fullscreen change
  document.removeEventListener('fullscreenchange', closeSidebarOnFullscreenChange);

  // Remove event listener for window minimize
  window.removeEventListener('blur', closeSidebarOnBlur);

  // Remove event listener for window ordering change
  window.removeEventListener('focus', closeSidebarOnFocus);
}

function closeSidebarOnScroll() {
  if (sidebarOpen) {
    closeSidebar();
  }
}

function closeSidebarOnResize() {
  if (sidebarOpen) {
    closeSidebar();
  }
}

function closeSidebarOnFullscreenChange() {
  // Close sidebar if window enters or exits fullscreen mode
  if (window.screen.width == window.innerWidth && window.screen.height == window.innerHeight) {
    closeSidebar();
  }
}

function closeSidebarOnBlur() {
  // Close sidebar if window is minimized
  closeSidebar();
}

function closeSidebarOnFocus() {
  // Close sidebar if window ordering changes
  closeSidebar();
}

// Define the function that shows or hides the div based on the viewport width
function toggleMenu() {

  let myMenu = document.querySelector('.left-sidebar');

  if (window.innerWidth > 768) {
    myMenu.style.display = 'block';
    adjustSize('.main-container', '.left-sidebar', false, true);
  } else {
    myMenu.style.display = 'none';
  }
}

// Add the event listener to the window object
window.addEventListener('resize', toggleMenu);

function toggleFavorites(favorites) {
  let favoriteButton = favorites;
  let favoriteCount = favorites.querySelector('.favorites-count');
  
  let count = parseInt(favoriteCount.textContent);

  if (!favoriteButton.querySelector('i').classList.contains('material-symbols-filled')) {
    favoriteButton.querySelector('i').classList.add('material-symbols-filled');
    favoriteButton.style.color = '#007bff';
    count++;
  } else {
    favoriteButton.querySelector('i').classList.remove('material-symbols-filled');
    favoriteButton.style.color = '#000000';
    count--;
  }
  favoriteCount.textContent = count;
}

/* End Header Container */

/* Body Container */

function toggleShowmore() {
  let showmore = document.querySelector('.showmore');
  let hidden = document.querySelectorAll('.hidden');
  let current = document.querySelector('.current');
  let contents = document.querySelector('.contents');

  showmore.style.display = 'none';

  hidden.forEach((div) => {
    div.classList.remove('hidden');
  });

  current.classList.remove('current');
  current.querySelector('i').classList.remove('.material-symbols-filled');
  current.querySelector('i').classList.remove('current');

  contents.classList.add('current');

  // Get the next element after showmore
  let next = showmore.nextElementSibling;

  // Scroll to the next element
  next.scrollIntoView({ behavior: "smooth" });
}

/* End Body Container */

/* Image Slider */

// JS for image slider
let images = document.querySelectorAll('.slider img');
var title = document.querySelector('.slider-container .title');
let dotButtons = document.querySelectorAll('.dot-nav button');
let activeImage = 0;
let timer;

// Function to show a specific image
function showImage(index) {
    
    clearTimeout(timer);
    
    images[(activeImage + 1) % images.length].classList.remove('next');
    images[(activeImage - 1 + images.length) % images.length].classList.remove('prev');
    images[activeImage].classList.remove('active');

    dotButtons[activeImage].classList.remove('active');
    
    activeImage = index;
    
    images[(activeImage + 1) % images.length].classList.add('next');
    images[(activeImage - 1 + images.length) % images.length].classList.add('prev');
    images[activeImage].classList.add('active');

    dotButtons[activeImage].classList.add('active');
    
    updateTitle();
    timer = setTimeout(nextImage, 3000);
}

// Function to show the next image
function nextImage() {
    let nextIndex = (activeImage + 1) % images.length;
    showImage(nextIndex);
}

// Function to show the previous image
function prevImage() {
    let prevIndex = (activeImage - 1 + images.length) % images.length;
    showImage(prevIndex);
}

// Function to update the title
function updateTitle() {
    title.textContent = images[activeImage].alt;
}

// Set up event listeners for dot buttons
for (let i = 0; i < dotButtons.length; i++) {
    dotButtons[i].addEventListener('click', function () {
        if (!this.classList.contains('active')) {
            showImage(parseInt(this.getAttribute('data-index')));
        }
    });
}

// Start the slider
timer = setTimeout(nextImage, 3000);
updateTitle();

/* End Image Slider */

/* Form Validate */

function validateLogIn() {

  event.preventDefault();

  let username = document.forms["login-form"]["username-login"].value;
  let password = document.forms["login-form"]["password-login"].value;
  let errorElement = document.querySelector(".login-dialog .error");

  let usernameRegex = /^[a-zA-Z][a-zA-Z0-9]{4,19}$/;
  let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"|,./<>?])[a-zA-Z\d!@#$%^&*()_+\-=[\]{};':"|,./<>?]{8,}$/;

  if (!username.match(usernameRegex)) {
    errorElement.innerHTML = "Username must be between 5 and 20 characters, start with a letter and contain only letters and numbers";
    return false;
  }

  if (!password.match(passwordRegex)) {
    errorElement.innerHTML = "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number and one special character";
    return false;
  }

  closeDialog();
  alert('Welcome back, ' + username);

  let loginBtn = document.querySelector('.login-button');
  let signupBtn = document.querySelector('.signup-button');

  loginBtn.style.display = 'none';
  signupBtn.style.display = 'none';

  let userElement = document.querySelector(".user");
  let logOut = document.querySelector('.logout');
  userElement.style.display = 'flex';
  logOut.style.display = 'flex';

  let date = new Date();
  let hour = date.getHours();

  let greeting;
  
  if (hour >= 5 && hour < 12) {
    greeting = 'Good morning';
  } else if (hour >= 12 && hour < 18) {
    greeting = 'Good afternoon';
  } else {
    greeting = 'Good evening';
  }
  userElement.textContent = greeting + ', ' + username;
  
  return true;
}

function validateSignUp() {

  event.preventDefault();

  let firstName = document.forms["signup-form"]["first-name"].value;
  let lastName = document.forms["signup-form"]["last-name"].value;
  let email = document.forms["signup-form"]["email"].value;
  let username = document.forms["signup-form"]["username"].value;
  let password = document.forms["signup-form"]["password"].value;
  let confirmPassword = document.forms["signup-form"]["confirm_password"].value;
  let errorElement = document.querySelector(".signup-dialog .error");

  let nameRegex = /^[a-zA-Z]+$/;;
  let emailRegex = /^[a-zA-Z][a-zA-Z0-9]{0,}([_.][a-zA-Z0-9]+)?@[a-zA-Z0-9]+([._][a-zA-Z0-9]+)*\.[a-zA-Z]{2,5}$/;
  let usernameRegex = /^[a-zA-Z][a-zA-Z0-9]{4,19}$/;
  let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"|,./<>?])[a-zA-Z\d!@#$%^&*()_+\-=[\]{};':"|,./<>?]{8,}$/;

  if (!firstName.match(nameRegex)) {
    errorElement.innerHTML = "First name cannot contain special characters";
    return false;
  }

  if (!lastName.match(nameRegex)) {
    errorElement.innerHTML = "Last name cannot contain special characters";
    return false;
  }

  if (!email.match(emailRegex)) {
    errorElement.innerHTML = "Invalid email address";
    return false;
  }

  if (!username.match(usernameRegex)) {
    errorElement.innerHTML = "Username must be between 5 and 20 characters, start with a letter and contain only letters and numbers";
    return false;
  }

  if (!password.match(passwordRegex)) {
    errorElement.innerHTML = "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number and one special character";
    return false;
  }

  if (password !== confirmPassword) {
    errorElement.innerHTML = "Passwords do not match";
    return false;
  }

  closeDialog();
  alert('Thank you for signing up!');

  let loginBtn = document.querySelector('.login-button');
  let signupBtn = document.querySelector('.signup-button');

  loginBtn.style.display = 'none';
  signupBtn.style.display = 'none';

  let userElement = document.querySelector(".user");
  let logOut = document.querySelector('.logout');
  userElement.style.display = 'flex';
  logOut.style.display = 'flex';

  let date = new Date();
  let hour = date.getHours();

  let greeting;
  
  if (hour >= 5 && hour < 12) {
    greeting = 'Good morning';
  } else if (hour >= 12 && hour < 18) {
    greeting = 'Good afternoon';
  } else {
    greeting = 'Good evening';
  }
  userElement.textContent = greeting + ', ' + username;
  
  return true;
}

function closeDialog() {
  let dialog = document.querySelector('.dialog-container');
  let signUpDialog = document.querySelector('.dialog-container .signup-dialog');
  let logInDialog = document.querySelector('.dialog-container .login-dialog');
  dialog.style.display = 'none';
  signUpDialog.style.display = 'none';
  logInDialog.style.display = 'none';
}

function SignUp() {
  document.getElementById("signup-form").reset();
  let dialog = document.querySelector('.dialog-container');
  let signUp = document.querySelector('.dialog-container .signup-dialog');
  dialog.style.display = 'block';
  signUp.style.display = 'block';
}

function Login() {
  document.getElementById("login-form").reset();
  let dialog = document.querySelector('.dialog-container');
  let login = document.querySelector('.dialog-container .login-dialog');
  dialog.style.display = 'block';
  login.style.display = 'block';
}

function LogOut() {

  let confirmation = confirm("Are you sure you want to log out?");

  if (confirmation) {

    document.getElementById("signup-form").reset();
    
    let userElement = document.querySelector(".user");
    let logOut = document.querySelector('.logout');
    userElement.style.display = 'none';
    logOut.style.display = 'none';
  
    let login = document.querySelector('.login-button');
    let signup = document.querySelector('.signup-button');
    login.style.display = 'flex';
    signup.style.display = 'flex';
  }
}

/* End Form Validate */
