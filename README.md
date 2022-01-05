# Trending Repo Weekly

[中文说明](README-zh.md)

This action crawl the hottest repo of github trending:

- You can use the input parameter lang: go , java, javascript, vue and so on

# Usage

See [action.yml](action.yml)

Basic:

```yaml
steps:
    - uses: actions/checkout@master
    - uses: monoposer/repo-trending-action@v1.2.0
       with:
           lang: go
```

Matrix

```yaml
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

# Sample With Push Changes
> Since this repository is for a single lang, multi-lang needs to be combined with workflow and github-push-action

+ Single lang,  see [single-template](https://github.com/SolaTyolo/repo-trending/blob/main/.github/workflows/go.yml)
+ Multi-language acquisition in two modes
  - Use multiple workflows, and the input parameters and time settings in each workflow are different. For details, see [go-sample](https://github.com/SolaTyolo/repo-trending/blob/main/.github/workflows/go.yml) and [rust-sample](https://github.com/SolaTyolo/repo-trending/blob/main/.github/workflows/rust.yml)
  - Use the matrix feature of the workflow, see  [parallel-sample](https://github.com/SolaTyolo/repo-trending/blob/main/.github/workflows/parallel.yml)


# License

The scripts and documentation in this project are released under the [MIT License](LICENSE)
