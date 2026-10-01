import { defineConfig } from 'tsdown'
import { clientBundle } from './tsdown.client.ts'

export default defineConfig([
  {
    name: 'dsh-input-optimizer',
    entry: {
      index: 'src/index.ts',
      typert: 'src/typert.ts',
      remote: 'src/remote.ts'
    },
    outDir: 'lib',
    format: 'esm',
    platform: 'node',
    target: 'es2022',
    dts: false,
    clean: true,
    sourcemap: true,
    outExtensions: () => ({
      js: '.js',
      dts: '.d.ts'
    })
  },
  clientBundle('dsh-input-optimizer', 'src/client.ts')
])
