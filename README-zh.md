# Trending Repo Weekly

该action作用是使用稀土的接口获取每周新热门的仓库:
- 可以用参数lang指定语言仓库: go, java, javascript等

# 使用
具体请看  [action.yml](action.yml)

## 单语言用法

```yml
steps:
    - uses: actions/checkout@master
    - uses: monoposer/repo-trending-action@v1.2.0
       with:
           lang: go
```

## 多语言用法
```yml
jobs:
    build:
        runs-on: ubuntu-16.04
        strategy:
            matrix:
                lang: ['go', 'java']
        name: Lang ${{matrix.lang}} Fetcher
        steps:
            - uses: actions/checkout@v2
            - name: Trending Repo
               uses: monoposer/repo-trending-action@v1.2.0
               with:
                   lang: ${{matrix.lang}}
```

# 样例
> 由于本仓库针对的是单个编程语言的获取，所以多语言获取需要结合工作流和push-action的共同完成

+ 单语言获取, 具体请看 [单语言用例]()
+ 多语言获取用两种模式
  - 使用多个工作流，每个工作流中输入参数和时间设置不同即可, 具体可以看 [go用例](https://github.com/SolaTyolo/repo-trending/blob/main/.github/workflows/go.yml) 和 [rust用例](https://github.com/SolaTyolo/repo-trending/blob/main/.github/workflows/rust.yml)
  - 使用单个工作流结合matrix特性, 具体请看 [并行用例](https://github.com/SolaTyolo/repo-trending/blob/main/.github/workflows/parallel.yml)

# License
The scripts and documentation in this project are released under the [MIT License](LICENSE)
