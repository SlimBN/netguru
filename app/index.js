import isOnline from 'is-online';
import notices from './notices';

let currentlyOnline = true;

function check() {
  isOnline((err, online) => {
    if (online) {
      handleOnline();
    } else {
      handleOffline();
    }

    setTimeout(check, 3000);
  });
}

function handleOnline() {
  if (!currentlyOnline) {
    notices.notifyInternetConnectionGotIt();
  }
  currentlyOnline = true;
}

function handleOffline() {
  if (currentlyOnline) {
    notices.notifyInternetConnectionGone();
  }
  currentlyOnline = false;
}

check();
