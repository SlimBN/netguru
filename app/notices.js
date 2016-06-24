import notifier from 'node-notifier';
import player from 'play-sound';
import path from 'path';

const myPlayer = player();

function getRandomNoticeDataGone() {
  const soundFilePath = path.resolve('sounds/gone/linda-wypierdalac.mp3');

  return {
    notification: {
      title: 'Internet is gone - title',
      subtitle: 'Internet is gone - subtitle',
      message: 'Internet is gone - message',
    },
    sound: soundFilePath,
  };
}

function notifyInternetConnectionGotIt() {
  notifier.notify('Got Internet!');
}

function notifyInternetConnectionGone() {
  const data = getRandomNoticeDataGone();

  myPlayer.play(data.sound, (err) => err && console.log(err));
  notifier.notify(data.notification);
}

export default {
  notifyInternetConnectionGotIt,
  notifyInternetConnectionGone,
};
