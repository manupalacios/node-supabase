import express from 'express'
import bodyParser from 'body-parser'

import conceptos from './entities/conceptos/handler.js'

const { json, urlencoded } = bodyParser;
const router = express.Router()

router.use(json({ limit: '10mb' }))
router.use(urlencoded({ extended: true }))

router.use(conceptos)

export default router
