import {HttpClient} from '@actions/http-client'

interface TrendingParams {
  host: string
  lang: string
}

export type RepoItem = {
  url: string
  username: string
  reponame: string
  description: string
  startCount: string
  forkCount: string
}

interface ApiResponse {
  code: number
  data: RepoItem[]
}

export async function getTrendingWeekly(
  params: TrendingParams
): Promise<RepoItem[]> {
  const jsonData = {
    category: 'upcome',
    period: 'week',
    lang: params.lang,
    offset: 0,
    limit: 10
  }
  const headers = {
    'content-type': 'application/json',
    'cache-control': 'no-cache',
    'user-agent':
      'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36'
  }
  const http = new HttpClient()
  const data = await http.postJson<ApiResponse>(
    `https://${params.host}/resources/github`,
    jsonData,
    headers
  )

  if (data.result === null) {
    throw new Error(' trending api Fatal!')
  }

  if (data.result.code === 200) {
    return data.result.data
  } else {
    throw new Error(`api code is not 200, code: ${data.result.code}`)
  }
}
