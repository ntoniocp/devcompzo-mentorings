import { Client } from 'faunadb'

export const dbClient = new Client({
  secret: process.env.FAUNA_DB_SECRET || '',
  domain: process.env.FAUNA_DB_DOMAIN
})