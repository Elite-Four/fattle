'use strict'

const sharp = require('sharp')

const encode = module.exports = function encode(graphics) {
  const buffer = new Buffer(graphics.buffer)
  return sharp(buffer, {
    raw: {
      width: encode.width,
      height: encode.height,
      channels: 4
    }
  }).png().compressionLevel(9).toBuffer()
}

encode.width = 256
encode.height = 224
