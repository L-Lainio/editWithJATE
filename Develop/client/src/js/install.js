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
  // why is it setAttribute like this?
  butInstall.setAttribute('disabled', true);
  butInstall.textContent = 'Installed!';
});

// Event handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
  console.log('appinstalled', event);
  // maybe testing out this console.log
 });
