# Trending Repo Weekly

This action crawl the hottest repo of github trending:

- specified lang: go , java, javascript, vue and so on

# Usage

See [action.yml](action.yml)

Basic:

```yaml
steps:
    - uses: actions/checkout@master
    - uses: monoposer/repo-trending-action@v1.1.0
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
               uses: monoposer/repo-trending-action@v1.1.0
               with:
                   lang: ${{matrix.lang}}
```

# A Demo With Push Changes

> need to use github-push-action to push to repo, see  [template](https://github.com/monoposer/repo-trending-template)

```yaml
jobs:
  Crawl-Build:
    
    runs-on: ubuntu-latest
    steps:
    - name: Checkout repository
      uses: actions/checkout@v2

    - name: Fetch Trending Repo
      uses: monoposer/repo-trending-action@v1.1.0
      with:
        lang: go

    - name: Commit Files
      run:  |
        git config --local user.email "41898282+github-actions[bot]@users.noreply.github.com"
        git config --local user.name "github-actions[bot]"
        git commit -m "Update" -a

    - name: Push Changes
      uses: ad-m/github-push-action@master
      with:
        github_token: ${{secrets.GITHUB_TOKEN}}
        branch: ${{github.ref}}
```

# License

The scripts and documentation in this project are released under the [MIT License](LICENSE)
