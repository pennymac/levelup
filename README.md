# LevelUp
This is a demo site built with [Jekyll 3](https://jekyllrb.com/).

You can view it on GitHub Pages at: [https://pennymac.github.io/levelup/](https://pennymac.github.io/levelup/)

## Requirements

 - [Ruby](https://www.ruby-lang.org/en/downloads/) (including development headers, v1.9.3 or above)
 - [RubyGems](https://rubygems.org/pages/download)
 - Linux, Unix, or Mac OS X
 - [GCC](https://gcc.gnu.org/install/) and [Make](https://www.gnu.org/software/make/) (in case your system doesn’t have them installed, which you can check by running `gcc -v` and `make -v` in your system’s command line interface)

## Usage

Run the following commands in your console:
```
$  git clone git@github.com:pennymac/levelup.git
$  cd levelup
$  bundle install
```

For development, run:
```
$  jekyll liveserve --incremental --baseurl ''
```

then navigate to `http://localhost:4000/` in your browser.

To create a build for production, run:
```
$  JEKYLL_ENV=production jekyll build
```
Then upload the contents of the `_site` directory to your webhost.

The command to do this on GitHub pages is:
```
$  git subtree push --prefix _site origin gh-pages
```

## Contributing
Create a feature branch off of master and make a pull-request.