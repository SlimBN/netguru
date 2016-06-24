import isOnline from 'is-online';
import notices from './notices';

let currentlyOnline = true;

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

function checkRecurrent() {
  isOnline((err, online) => {
    if (online) {
      console.log('Got Internet');
      handleOnline();
    } else {
      console.log('Internet is gone');
      handleOffline();
    }

    setTimeout(checkRecurrent, 3000);
  });
}

checkRecurrent();
