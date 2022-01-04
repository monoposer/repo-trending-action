import * as core from '@actions/core'
import {getTrendingWeekly} from './api'
import { createMarkdown, writeMarkdown } from './file'

const XITU_HOST = 'e.juejin.cn'

async function run(): Promise<void> {
  try {
    const lang: string = core.getInput('lang')
    core.debug(`get ${lang} repo trending`) // debug is only output if you set the secret `ACTIONS_STEP_DEBUG` to true

    const repoItems = await getTrendingWeekly({host: XITU_HOST, lang})
    core.debug(JSON.stringify(repoItems))
    
    core.debug("creating file and writing....")
    createMarkdown(lang)
    writeMarkdown(repoItems)
    core.debug("writing completed....")
    
    // TODO commit and push

    core.setOutput('time', new Date().toTimeString())
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
