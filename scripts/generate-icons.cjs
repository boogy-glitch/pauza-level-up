/**
 * Generate PNG and ICO icons from SVG for Electron installer.
 * Run: node scripts/generate-icons.js
 *
 * If 'sharp' is not installed, it will create a simple fallback PNG.
 */

const fs = require('fs');
const path = require('path');

const buildDir = path.join(__dirname, '..', 'build');
const svgPath = path.join(__dirname, '..', 'public', 'icon.svg');

if (!fs.existsSync(buildDir)) {
  fs.mkdirSync(buildDir, { recursive: true });
}

// Copy SVG as fallback
fs.copyFileSync(svgPath, path.join(buildDir, 'icon.svg'));

async function generateWithSharp() {
  try {
    const sharp = require('sharp');
    const svgBuffer = fs.readFileSync(svgPath);

    // Generate 256x256 PNG
    await sharp(svgBuffer)
      .resize(256, 256)
      .png()
      .toFile(path.join(buildDir, 'icon.png'));

    console.log('✓ icon.png generated (256x256)');

    // Generate 512x512 PNG for high-res
    await sharp(svgBuffer)
      .resize(512, 512)
      .png()
      .toFile(path.join(buildDir, 'icon-512.png'));

    console.log('✓ icon-512.png generated (512x512)');

    // Generate ICO (Windows) - multiple sizes
    const sizes = [16, 32, 48, 64, 128, 256];
    const icoImages = [];

    for (const size of sizes) {
      const pngBuffer = await sharp(svgBuffer)
        .resize(size, size)
        .png()
        .toBuffer();
      icoImages.push({ size, buffer: pngBuffer });
    }

    // Simple ICO file format
    const icoBuffer = createIco(icoImages);
    fs.writeFileSync(path.join(buildDir, 'icon.ico'), icoBuffer);

    console.log('✓ icon.ico generated');
  } catch (e) {
    if (e.code === 'MODULE_NOT_FOUND') {
      console.log('⚠ sharp not found. Install it for icon generation:');
      console.log('  npm install --save-dev sharp');
      console.log('');
      console.log('Copying SVG as fallback (electron-builder will convert it).');
    } else {
      throw e;
    }
  }
}

function createIco(images) {
  const headerSize = 6;
  const dirEntrySize = 16;
  const numImages = images.length;

  let dataOffset = headerSize + (dirEntrySize * numImages);
  const entries = [];
  const buffers = [];

  for (const img of images) {
    entries.push({
      width: img.size >= 256 ? 0 : img.size,
      height: img.size >= 256 ? 0 : img.size,
      dataSize: img.buffer.length,
      offset: dataOffset,
    });
    buffers.push(img.buffer);
    dataOffset += img.buffer.length;
  }

  const header = Buffer.alloc(headerSize);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // ICO type
  header.writeUInt16LE(numImages, 4);

  const dirEntries = Buffer.alloc(dirEntrySize * numImages);
  entries.forEach((entry, i) => {
    const offset = i * dirEntrySize;
    dirEntries.writeUInt8(entry.width, offset);
    dirEntries.writeUInt8(entry.height, offset + 1);
    dirEntries.writeUInt8(0, offset + 2); // color palette
    dirEntries.writeUInt8(0, offset + 3); // reserved
    dirEntries.writeUInt16LE(1, offset + 4); // color planes
    dirEntries.writeUInt16LE(32, offset + 6); // bits per pixel
    dirEntries.writeUInt32LE(entry.dataSize, offset + 8);
    dirEntries.writeUInt32LE(entry.offset, offset + 12);
  });

  return Buffer.concat([header, dirEntries, ...buffers]);
}

generateWithSharp();
