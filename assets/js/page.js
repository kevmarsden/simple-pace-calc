// Add an event listener to close the dropdown menu when the user clicks outside of it
document.addEventListener('click', (e) => {
  if (navbar.contains(e.target)) {
    // If the user clicks inside the navbar, do nothing
    return;
  }
  // Otherwise, close the dropdown menu
  dropdownMenu.classList.add('hidden');
});

// Add event listeners to each menu item to close the dropdown menu when the user hovers over a different item
const menuItems = document.querySelectorAll('.navbar-collapse li');
menuItems.forEach((item) => {
  item.addEventListener('mouseenter', () => {
    dropdownMenu.classList.add('hidden');
  });
});

// Get the navbar elements
const navbar = document.querySelector('.navbar-expand-lg');
const dropdownMenu = document.querySelector('.navbar-collapse');

// Add an event listener to the navbar toggle button
navbar.addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON') {
    // If the navbar toggle button is clicked, toggle the dropdown menu
    dropdownMenu.classList.toggle('hidden');
  }
});

