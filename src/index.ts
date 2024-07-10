import { app } from './app'
import { CONFIG } from './config'
import { connectDatabase } from './database'

import { logger } from './utils'

async function main() {
  await connectDatabase()
  app.listen(CONFIG.PORT)
  logger.info(`Server API listen on PORT: ${CONFIG.PORT}`)
}

main()
