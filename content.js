const buddy = document.createElement('div');
buddy.id = 'desk-buddy';

const img = document.createElement('img');
img.alt = 'Your Desk Buddy';
img.id = 'buddy-img';

// Set image source based on stored color
chrome.storage.local.get(['buddyColor'], (result) => {
  const color = result.buddyColor || 'red'; // default to red
  img.src = chrome.runtime.getURL(`buddy-${color}.png`);
});

buddy.appendChild(img);
document.body.appendChild(buddy);

img.addEventListener('click', () => {
  img.classList.remove('animate-somersault'); // reset
  void img.offsetWidth; // trigger reflow to restart animation
  img.classList.add('animate-somersault');

});