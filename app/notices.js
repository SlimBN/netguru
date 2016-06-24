import notifier from 'node-notifier';

function notifyInternetConnectionGotIt() {
  notifier.notify('Got Internet!');
}

function notifyInternetConnectionGone() {
  notifier.notify('F**ity f**k, it\'s gone...');
}

function notifyInternetConnectionDunno() {
  notifier.notify('Error detecting status of Internet connection. Goodbye come again.');
}

export default {
  notifyInternetConnectionGotIt,
  notifyInternetConnectionGone,
  notifyInternetConnectionDunno,
};
