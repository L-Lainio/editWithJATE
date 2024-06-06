const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
window.addEventListener('beforeinstallprompt', (event) => {
    //  Store the trigger events
    window.deferredPrompt = event;
    // Remove the hidden class from the install button
    butInstall.classList.toggle('hidden', false);

});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
const promptEvent = window.deferredPrompt;

if (!promptEvent) {
  return;
}
// Show the install prompt
promptEvent.prompt();
// reset the deferred prompt variable, it can only be used once
window.deferredPrompt = null;

butInstall.classList.toggle('hidden', true);
});

// Event handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    // clear prompt
    window.deferredPrompt = null;
 });
