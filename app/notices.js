import notifier from 'node-notifier';
import player from 'play-sound';
import path from 'path';
import fs from 'fs';
import badwords from 'badwords/array';
import _ from 'lodash';
import P from 'bluebird';
import Chance from 'chance';
import say from 'say';

P.promisifyAll(fs);

const chance = new Chance();
const myPlayer = player();

function getRandom(array) {
  return array[chance.integer({ min: 0, max: array.length - 1 })];
}

function getRandomBadword(capitalized = true) {
  const badword = getRandom(badwords);

  return capitalized ? _.capitalize(badword) : badword;
}

function getRandomNoticeDataGotIt() {
  return P.props({
    sounds: fs.readdirAsync('assets/sounds/back'),
    images: fs.readdirAsync('assets/images/back'),
  }).then((files) => {
    const { sounds, images } = files;

    const soundFilePath = path.resolve(`assets/sounds/back/${getRandom(sounds)}`);
    const iconPath = path.resolve(`assets/images/back/${getRandom(images)}`);
    const imagePath = path.resolve(`assets/images/back/${getRandom(images)}`);

    return {
      notification: {
        title: `Yay! Your Internet is back!`,
        message: `🎉 ✨ Rejoice and live forever in eternal happiness and peace! ✨ 🎉`,
        icon: iconPath,
        contentImage: imagePath,
      },
      sound: soundFilePath,
    };
  });
}

function getRandomNoticeDataGone() {
  return P.props({
    sounds: fs.readdirAsync('assets/sounds/gone'),
    images: fs.readdirAsync('assets/images/gone'),
  }).then((files) => {
    const { sounds, images } = files;

    const soundFilePath = path.resolve(`assets/sounds/gone/${getRandom(sounds)}`);
    const iconPath = path.resolve(`assets/images/gone/${getRandom(images)}`);
    const imagePath = path.resolve(`assets/images/gone/${getRandom(images)}`);

    return {
      notification: {
        title: `${getRandomBadword()}!`,
        message: `💀 ☠${getRandomBadword()}! ${getRandomBadword()}! ${getRandomBadword()}!!! Your Internet is gone! ☠ 💀`,
        icon: iconPath,
        contentImage: imagePath,
      },
      sound: soundFilePath,
    };
  });
}

function notifyInternetConnectionGotIt() {
  getRandomNoticeDataGotIt()
    .then((data) => {
      myPlayer.play(data.sound, (err) => err && console.error(err));
      notifier.notify(data.notification);
    });
}

function notifyInternetConnectionGone() {
  getRandomNoticeDataGone()
    .then((data) => {
      if (Math.random() < 0.25 &&
        data.notification.message.replace(/(!|[0-9]|\*)/g, '') === data.notification.message.replace(/!/g, '')) {
        say.speak(data.notification.message.split('!!!')[0]);
      } else {
        myPlayer.play(data.sound, (err) => err && console.error(err));
      }

      notifier.notify(data.notification);
    });
}

export default {
  notifyInternetConnectionGotIt,
  notifyInternetConnectionGone,
};
