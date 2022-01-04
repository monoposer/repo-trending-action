import * as file from 'fs-extra'
import {RepoItem} from './api'

export function getNowDate(): string {
  const date = new Date()
  let month: string | number = date.getMonth() + 1
  let dateStr: string | number = date.getDate()

  if (month <= 9) {
    month = `0${month}`
  }
  if (dateStr <= 9) {
    dateStr = `0${dateStr}`
  }
  return `${date.getFullYear()}${month}${dateStr}`
}

export async function writeMarkdown(
  fp: string,
  lang: string,
  datas: RepoItem[]
): Promise<void> {
  // create file and title
  await file.ensureFile(fp)
  await file.writeFile(fp, `## ${lang} weekly\n`, {flag: 'w'})

  for (const data of datas) {
    const content = `\n\r#### [${data.username}/ ${data.reponame}](${data.url})\n\r>  ${data.description}\n\r+ start: ${data.starCount}\n\r+ fork: ${data.forkCount}\n\r---`
    await file.writeFile(fp, content, {flag: 'a'})
  }
}
