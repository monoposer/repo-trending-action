import * as core from '@actions/core'
import {getNowDate, writeMarkdown} from './file'
import {getTrendingWeekly} from './api'

const XITU_HOST = 'e.juejin.cn'

async function run(): Promise<void> {
  try {
    const lang: string = core.getInput('lang')
    core.debug(`get ${lang} repo trending`) // debug is only output if you set the secret `ACTIONS_STEP_DEBUG` to true

    const repoItems = await getTrendingWeekly({host: XITU_HOST, lang})
    core.debug(JSON.stringify(repoItems))

    const date = getNowDate()
    const path = `${__dirname}/${lang}/${date}.md`

    core.debug('creating file and writing....')
    await writeMarkdown(path, lang, repoItems)
    core.debug('writing completed....')

    // TODO commit and push
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
