// src/test/jest.setup.js
global.TextDecoder = require('util').TextDecoder;
const { TextEncoder, TextDecoder } = require('util');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
