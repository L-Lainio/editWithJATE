const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
window.addEventListener('beforeinstallprompt', (event) => {
  // is this a correct way to put it  must ask next time?
  event.preventDefault();
  butInstall.style.visibility = 'visible';
  butInstall.textContent = 'Install!'

});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
  const promptEvent = window.deferredPrompt;

  if (!promptEvent) {
    return;
  }

  // Show prompt
  promptEvent.prompt();

  // Reset the deferred prompt variable, it can only be used once.
  window.deferredPrompt = null;

  butInstall.classList.toggle('hidden', true);
  butInstall.setAttribute('disabled', true);
  butInstall.textContent = 'Installed!';
});

// Event handler for the `appinstalled` event
// Event handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
  console.log('appinstalled', event);
  // maybe testing out this console.log
  // Clear prompt
  window.deferredPrompt = null;
});
