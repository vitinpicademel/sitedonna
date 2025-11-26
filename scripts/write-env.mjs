#!/usr/bin/env node
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'

const ENV_PATH = resolve(process.cwd(), '.env.local')

function parseEnv(content) {
  const map = new Map()
  content.split(/\r?\n/).forEach((line) => {
    if (!line || /^\s*#/.test(line)) return
    const idx = line.indexOf('=')
    if (idx === -1) return
    const key = line.slice(0, idx).trim()
    const val = line.slice(idx + 1).trim()
    if (key) map.set(key, val)
  })
  return map
}

function formatEnv(map) {
  return Array.from(map.entries())
    .map(([k, v]) => `${k}=${v}`)
    .join('\n') + '\n'
}

// load current
const current = existsSync(ENV_PATH) ? parseEnv(readFileSync(ENV_PATH, 'utf8')) : new Map()

// apply args KEY=VALUE
process.argv.slice(2).forEach((arg) => {
  const idx = arg.indexOf('=')
  if (idx === -1) return
  const key = arg.slice(0, idx)
  const val = arg.slice(idx + 1)
  current.set(key, val)
})

// write back
writeFileSync(ENV_PATH, formatEnv(current), 'utf8')
console.log(`.env.local atualizado em ${ENV_PATH}`)

















