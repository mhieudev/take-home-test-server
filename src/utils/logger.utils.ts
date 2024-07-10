import { createLogger, format, transports } from 'winston'
import chalk from 'chalk'

const { combine, timestamp, printf, colorize } = format

const logFormat = printf(({ timestamp, level, message }) => `${chalk.blue(`[${timestamp}]`)} ${level}: ${message}`)

export const apiLogging = createLogger({
  transports: [
    new transports.Console({
      format: combine(timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }), logFormat, colorize({ all: true })),
    }),
    new transports.File({
      filename: 'combined.log',
      format: combine(timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }), logFormat, colorize({ all: true })),
    }),
  ],
})

export const logger = createLogger({
  transports: [
    new transports.Console({
      format: combine(timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }), logFormat, colorize({ all: true })),
    }),
  ],
})
