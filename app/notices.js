import notifier from 'node-notifier';

function notifyInternetConnectionGotIt() {
  notifier.notify('Got Internet!');
}

function notifyInternetConnectionGone() {
  notifier.notify('F**ity f**k, it\'s gone...');
}

export default {
  notifyInternetConnectionGotIt,
  notifyInternetConnectionGone,
};
