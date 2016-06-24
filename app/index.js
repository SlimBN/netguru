import isOnline from 'is-online';
import notices from './notices';

let currentlyOnline = true;

function check() {
  isOnline((err, online) => {
    if (online) {
      if (!currentlyOnline) {
        notices.notifyInternetConnectionGotIt();
      }
      currentlyOnline = true;
    } else {
      if (currentlyOnline) {
        notices.notifyInternetConnectionGone();
      }
      currentlyOnline = false;
    }

    setTimeout(check, 3000);
  });
}

check();
