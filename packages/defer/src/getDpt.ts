import { defer } from '@defer/client'
import { db } from '@repo/database'
import puppeteer, { ElementHandle } from 'puppeteer'

export type NIKData = {
  nama: string | null
  nik: string | null
  nkk: string | null
  provinsi: null | string
  kabupaten: string | null
  kecamatan: string | null
  kelurahan: string | null
  tps: string | null
  alamat: string | null
  lat: string | null
  lon: string | null
  metode: string | null
  lhp:
    | [
        {
          nama: string
          nik: string
          nkk: string
          kecamatan: string
          kelurahan: string
          tps: string
          id: string
          flag: null | string
          source: string
          alamat: string
          lat: string
          lon: string
          metode: string
        },
      ]
    | null
}

export type NIKSidalih = {
  data:
    | {
        findNikSidalih: NIKData | null
      }
    | { findDptb: NIKData | null }
}

const getDpt = async (userId: string, noKtp: string) => {
  return new Promise(async (resolve, _) => {
    const browser = await puppeteer.launch({ args: ['--no-sandbox'], headless: 'new' })

    console.log(`Browser opened with version ${await browser.version()}`)

    const page = await browser.newPage()

    await page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537',
    )

    console.log('User agent has been set')

    // Listen to the 'request' event
    page.on('request', (request) => {
      if (request.method() === 'POST' && request.url() === 'https://cekdptonline.kpu.go.id/v2') {
        console.log('POST request to https://cekdptonline.kpu.go.id/v2 detected')
        console.log('Request headers:', request.headers())

        const body = request.postData()

        console.log('Request body:', body)
      }
    })

    let result: NIKData | null = null

    let correctResponseReceived = false

    let responseCount = 0

    // Listen to the 'response' event
    page.on('response', async (response) => {
      if (response.request().method() === 'POST' && response.request().url() === 'https://cekdptonline.kpu.go.id/v2') {
        console.log('POST response from https://cekdptonline.kpu.go.id/v2 received')
        console.log('Response headers:', response.headers())

        console.log('Parsing response body...')

        const body = (await response.json()) as unknown as NIKSidalih
        console.log('Response body:', body)

        if ('data' in body && 'findNikSidalih' in body.data) {
          const bodyData = body.data.findNikSidalih as NIKData | null

          if (bodyData !== null) {
            result = bodyData
            correctResponseReceived = true
          }
        }

        responseCount += 1

        // Close the browser if the correct response is received or if the response count reaches 5
        if (correctResponseReceived || responseCount >= 5) {
          await browser.close()
        }
      }
    })

    console.log(`Page has been opened`)

    const puppeteerTimeout = 1000 * 1000 // 1000 seconds

    // Increase the timeout to 10 seconds
    page.setDefaultNavigationTimeout(puppeteerTimeout)
    page.setDefaultTimeout(puppeteerTimeout)

    console.log(`Timeout has been set to ${puppeteerTimeout}`)

    // pass the following `waitUntil` option to avoid
    //   unnecessary blocking when loading a page
    await page.goto('https://cekdptonline.kpu.go.id/', { waitUntil: 'networkidle0' })

    console.log(`Page has been loaded`)

    // Find the input field
    const inputField = await page.$('input#__BVID__19')

    if (inputField) {
      console.log(`Input field has been found`)

      // Type into the input field
      await inputField.type(noKtp)

      console.log(`Input field has been filled`)

      await new Promise((resolve) => setTimeout(resolve, 1000))
    }

    const [button] = await page.$x("//button[contains(., 'Pencarian')]")

    if (button) {
      console.log(`Button has been found`)

      // Click the button
      await (button as ElementHandle<Element>).click()
      console.log(`Button has been clicked`)
    }

    await page.waitForRequest((request) => request.url() === 'https://cekdptonline.kpu.go.id/v2')

    await page.waitForResponse((response) => response.url() === 'https://cekdptonline.kpu.go.id/v2')

    // if (result !== null) {
    //   console.log('Result is null, continuing to update user data')

    //   const response = await db.user.update({ where: { id: userId }, data: { nik: noKtp } })

    //   const { lhp, ...rest } = result as NIKData

    //   await db.dpt.create({ data: { userId: response.id, ...rest } })

    //   console.log('User data has been updated')
    // }

    console.log(
      `*********************************\n\nRESULT:\n${JSON.stringify(result)}\n\n*********************************`,
    )

    resolve(result)
  })
}

export default defer(getDpt, {
  retry: 5, // adding retry in case of flakiness issues
})
