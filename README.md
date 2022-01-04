
# Trending Repo Weekly

This action crawl the hottest repo of github trending: 
-  specified lang: go , java, javascript, vue and so on


# Usage


See [action.yml](action.yml)

Basic:
```yaml
steps:
    - uses: actions/checkout@master
    - uses: actions/trending-repo-weekly@v1
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
               uses: actions/trending-repo-weekly@v1
               with:
                   lang: ${{matrix.lang}}
```

# License

The scripts and documentation in this project are released under the [MIT License](LICENSE)
