import isOnline from 'is-online';

function check() {
  isOnline((err, online) => {
    console.log(online);

    setTimeout(check, 3000);
  });
}

check();

console.log('hello world!');
