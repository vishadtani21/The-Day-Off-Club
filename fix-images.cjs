const sharp = require('sharp')
const path = require('path')

const pub = 'public'

async function run() {
  // 1. Hero: us.png (7.5MB) → us.webp (~100KB)
  try {
    const info = await sharp(path.join(pub, 'us.png'))
      .resize(800)
      .webp({ quality: 82 })
      .toFile(path.join(pub, 'us.webp'))
    console.log('✅ us.webp created:', info.size, 'bytes')
  } catch (e) { console.error('❌ us.webp failed:', e.message) }

  // 2. toi.avif → toi.png (AVIF not supported on many mobile browsers)
  try {
    const info = await sharp(path.join(pub, 'toi.avif'))
      .png()
      .toFile(path.join(pub, 'toi.png'))
    console.log('✅ toi.png created:', info.size, 'bytes')
  } catch (e) { console.error('❌ toi.png failed:', e.message) }

  // 3. Check envelope.webp and newspaper.webp validity
  for (const f of ['envelope.webp', 'newspaper.webp']) {
    try {
      const meta = await sharp(path.join(pub, f)).metadata()
      console.log(`✅ ${f} valid: ${meta.width}x${meta.height} ${meta.format}`)
    } catch (e) {
      console.error(`❌ ${f} INVALID:`, e.message)
    }
  }
}

run()
