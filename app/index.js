import isOnline from 'is-online';
import notices from './notices';

function check() {
  isOnline((err, online) => {
    if (online === true) {
      notices.notifyInternetConnectionGotIt();
    } else if (online === false) {
      notices.notifyInternetConnectionGone();
    } else {
      notices.notifyInternetConnectionDunno();
    }

    setTimeout(check, 3000);
  });
}

check();
