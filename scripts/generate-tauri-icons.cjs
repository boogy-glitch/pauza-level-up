const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const svgPath = path.join(__dirname, '..', 'public', 'icon.svg');
const iconsDir = path.join(__dirname, '..', 'src-tauri', 'icons');
const buildDir = path.join(__dirname, '..', 'build');

if (!fs.existsSync(iconsDir)) fs.mkdirSync(iconsDir, { recursive: true });

async function generate() {
  const svgBuffer = fs.readFileSync(svgPath);

  // Tauri required icons
  const sizes = [
    { name: '32x32.png', size: 32 },
    { name: '128x128.png', size: 128 },
    { name: '128x128@2x.png', size: 256 },
  ];

  for (const { name, size } of sizes) {
    await sharp(svgBuffer).resize(size, size).png().toFile(path.join(iconsDir, name));
    console.log(`OK ${name}`);
  }

  // ICO for Windows
  const icoSizes = [16, 32, 48, 64, 128, 256];
  const icoImages = [];
  for (const size of icoSizes) {
    const buf = await sharp(svgBuffer).resize(size, size).png().toBuffer();
    icoImages.push({ size, buffer: buf });
  }

  const headerSize = 6;
  const dirEntrySize = 16;
  let dataOffset = headerSize + dirEntrySize * icoImages.length;
  const entries = [];
  const buffers = [];
  for (const img of icoImages) {
    entries.push({ width: img.size >= 256 ? 0 : img.size, height: img.size >= 256 ? 0 : img.size, dataSize: img.buffer.length, offset: dataOffset });
    buffers.push(img.buffer);
    dataOffset += img.buffer.length;
  }
  const header = Buffer.alloc(headerSize);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(icoImages.length, 4);
  const dirEntries = Buffer.alloc(dirEntrySize * icoImages.length);
  entries.forEach((e, i) => {
    const o = i * dirEntrySize;
    dirEntries.writeUInt8(e.width, o);
    dirEntries.writeUInt8(e.height, o + 1);
    dirEntries.writeUInt8(0, o + 2);
    dirEntries.writeUInt8(0, o + 3);
    dirEntries.writeUInt16LE(1, o + 4);
    dirEntries.writeUInt16LE(32, o + 6);
    dirEntries.writeUInt32LE(e.dataSize, o + 8);
    dirEntries.writeUInt32LE(e.offset, o + 12);
  });
  const icoBuffer = Buffer.concat([header, dirEntries, ...buffers]);
  fs.writeFileSync(path.join(iconsDir, 'icon.ico'), icoBuffer);
  console.log('OK icon.ico');
}

generate().catch(console.error);
