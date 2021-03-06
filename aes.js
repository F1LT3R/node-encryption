#!/usr/bin/env node
const encrypt = require('./lib/encrypt');
const decrypt = require('./lib/decrypt');
const password = require('./lib/password');

const argv = process.argv.slice(2);
const [mode, file] = argv;

if (mode === '--help' || mode === '-h' || mode === 'help' || !mode) {
  console.log(`
  Usage:
    aes [encrypt/decrypt] [file]
    
    Examples:
    aes encrypt test.txt
    aes decrypt test.txt
`);
}

console.log(mode, file);

mode && password(mode, ({ password1, password2 }) => {
  if (mode === 'decrypt') {
    decrypt({ file, password: password1 });
    return;
  }
  
  if (password1 !== password2) {
    console.log('Passwords do not match!');
    return;
  } else {
    console.log('Passwords matched.');
  }

  if (mode === 'encrypt') {
    encrypt({ file, password: password2 });
  }
});
