document.addEventListener('DOMContentLoaded', () => {
  const circles = document.querySelectorAll('.color-circle');
  const status = document.getElementById('status');
  const removeBtn = document.getElementById('remove-buddy');

  // Handle color selection
  circles.forEach(circle => {
    circle.addEventListener('click', () => {
      const selectedColor = circle.dataset.color;
      chrome.storage.local.set({ buddyColor: selectedColor }, () => {
        status.textContent = "Color updated!";
        setTimeout(() => status.textContent = "", 2000);
      });
    });
  });

  // Handle buddy removal
  removeBtn.addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        func: () => {
          const buddy = document.getElementById("desk-buddy");
          if (buddy) {
            buddy.remove();
          }
        }
      });
    });
  });
});
