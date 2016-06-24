import notifier from 'node-notifier';
import player from 'play-sound';
import path from 'path';
import fs from 'fs';
import badwords from 'badwords/array';
import _ from 'lodash';
import P from 'bluebird';

P.promisifyAll(fs);

const myPlayer = player();

function getRandomBadword(capitalized = true) {
  const badword = _.shuffle(badwords)[0];

  return capitalized ? _.capitalize(badword) : badword;
}

function getRandomNoticeDataGotIt() {
  return P.props({
    sounds: fs.readdirAsync('assets/sounds/back'),
    images: fs.readdirAsync('assets/images/back'),
  }).then((files) => {
    const { sounds, images } = files;

    const soundFilePath = path.resolve(`assets/sounds/back/${_.shuffle(sounds)[0]}`);
    const iconPath = path.resolve(`assets/images/back/${_.shuffle(images)[0]}`);
    const imagePath = path.resolve(`assets/images/back/${_.shuffle(images)[0]}`);

    return {
      notification: {
        title: `Yay! Your Internet is back!`,
        message: `Rejoice and live forever in eternal happiness and peace!`,
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

    const soundFilePath = path.resolve(`assets/sounds/gone/${_.shuffle(sounds)[0]}`);
    const iconPath = path.resolve(`assets/images/gone/${_.shuffle(images)[0]}`);
    const imagePath = path.resolve(`assets/images/gone/${_.shuffle(images)[0]}`);

    return {
      notification: {
        title: `${getRandomBadword()}!`,
        message: `${getRandomBadword()}! ${getRandomBadword()}! ${getRandomBadword()}!!! Your Internet is back!`,
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
      myPlayer.play(data.sound, (err) => err && console.log(err));
      notifier.notify(data.notification);
    });
}

function notifyInternetConnectionGone() {
  getRandomNoticeDataGone()
    .then((data) => {
      myPlayer.play(data.sound, (err) => err && console.log(err));
      notifier.notify(data.notification);
    });
}

export default {
  notifyInternetConnectionGotIt,
  notifyInternetConnectionGone,
};
