import 'dotenv/config'

const defaultConfig = {
  ENV: 'develop',
  PORT: '8080',
  PUBLIC_URL: 'http://localhost:8080',
}

export type TConfig = {
  [K in keyof typeof defaultConfig]: string
}

export const CONFIG: TConfig = Object.fromEntries(Object.entries(defaultConfig).map(([key, defaultValue]) => [key, process.env[key] ?? defaultValue])) as TConfig
