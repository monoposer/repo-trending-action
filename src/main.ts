import * as core from '@actions/core'
import {getNowDate, writeMarkdown} from './file'
import {getTrendingWeekly} from './api'

const XITU_HOST = 'e.juejin.cn'

async function run(): Promise<void> {
  try {
    const lang: string = core.getInput('lang')
    core.info(`get ${lang} repo trending`) // debug is only output if you set the secret `ACTIONS_STEP_DEBUG` to true

    const repoItems = await getTrendingWeekly({host: XITU_HOST, lang})
    core.debug(JSON.stringify(repoItems))

    const date = getNowDate()
    const path = `${process.cwd()}/${lang}/${date}.md`

    core.info('creating file and writing....')
    await writeMarkdown(path, lang, repoItems)
    core.info('writing completed....')
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
