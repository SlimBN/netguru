import notifier from 'node-notifier';
import player from 'play-sound';
import path from 'path';
import badwords from 'badwords/array';
import _ from 'lodash';

const myPlayer = player();

function getRandomBadword(capitalized = true) {
  const badword = badwords[Math.floor(Math.random() * badwords.length)];

  return capitalized ? _.capitalize(badword) : badword;
}

function getRandomNoticeDataGone() {
  const soundFilePath = path.resolve('assets/sounds/gone/linda-wypierdalac.mp3');

  return {
    notification: {
      title: `${getRandomBadword()}!`,
      message: `${getRandomBadword()}! ${getRandomBadword()}! ${getRandomBadword()}!!! Your Internet connection just stopped working.`,
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
