import notifier from 'node-notifier';
import player from 'play-sound';

const myPlayer = player();

function notifyInternetConnectionGotIt() {
  notifier.notify('Got Internet!');
}

function notifyInternetConnectionGone() {
  myPlayer.play('sounds/gone/linda-wypierdalac.mp3', (err) => console.log(err));
  notifier.notify('F**ity f**k, it\'s gone...');
}

export default {
  notifyInternetConnectionGotIt,
  notifyInternetConnectionGone,
};
