---
layout: post
title:  Create a Jekyll Blog
date:   2017-01-18
author_name: Jackie Johnston
author_image: https://s.gravatar.com/avatar/ceffcbfa4a2c365c07e91177db9b618c?s=300
author_url: https://pennymac.github.io/levelup/jackiejohnston
image: https://source.unsplash.com/lRssALOk1fU/500x300
excerpt: This post will help you set up a very basic Jekyll blog website and host it on GitHub Pages.
tags: [jekyll, liquid, markdown, yaml]
---

## Check the Requirements
First, you'll need the following installed on your dev environment:
 - [Ruby](https://www.ruby-lang.org/en/downloads/) (including development headers, v1.9.3 or above)
 - [RubyGems](https://rubygems.org/pages/download)
 - Linux, Unix, or Mac OS X
 - [GCC](https://gcc.gnu.org/install/) and [Make](https://www.gnu.org/software/make/) (in case your system doesn't have them installed, which you can check by running `gcc -v` and `make -v` in your system's command line interface)

## Getting Started

Run:
```shell
$  gem install jekyll
$  jekyll new levelup # Substitute 'levelup' with the name of your project
$  cd levelup
$  git init # Initialize git repo
$  git add .
$  git commit -m "Initial commit"
## If you use RVM do the following:
$  ruby -v # Check your Ruby version 
$  rvm --ruby-version use 2.3.1@levelup --create # Substitute your Ruby version and gemset name
$  git add .
$  git commit -m "Add RVM wrappers"
```

 - Update Gemfile by changing `RUBY_VERSION` to `"2.3.1"` or whatever you are using.
 - Add `.DS_Store`, `.ruby-gemset`, `ruby-version` to `.gitignore`.
 - Add a `README.md` file if you want for your repo.
 - In the `_config.yml` file, add `- README.md` to list of files under `exclude`. (This will prevent Jekyll from adding them to the distribution folder.)
 - In the `_config.yml` file, remove `email`, `twitter_username`, and `github_username` lines since we won't be using those. Update the `title` and `description` lines, also add or update the following:

```yaml
baseline: /levelup # If you are using on GitHub pages this will be the name of your repo
url: https://pennymac.github.io/ # If you are using on GitHub pages you will have your username as the subdomain
lang: en
timezone: America/Los_Angeles
permalink: /:title # This is just one way to structure your links, 
```


## To turn on live updates
Add `gem "hawkins"` to the `:jekyll_plugins` of your` Gemfile`. Run:

```shell
$  gem install bundler # if necessary
$  bundle
$  jekyll liveserve --incremental --baseurl '' # We are changing the baseurl variable because it will be different when running locally versus on your GitHub pages
```

You might have to visit `127.0.0.1:35729` in your browser to get the message `LiveReload: Browser connected` in your terminal to kick off the live reloading. You should at this point be able to view your site at http://localhost:4000 and have the browser automatically refresh with any updates you make. (Note: If you make a change to the `_config.yml` file, you will have to stop with `ctrl-c` and restart with the `jekyll liveserve --incremental --baseurl ''` command to see the changes.)



## To overwrite the default theme.

 - Remove `theme: minima` from `_config.yml`. Learn more about this theme and how to customize it [here](https://github.com/jekyll/minima).
 - Remove or comment out `gem "minima", "~> 2.0"` from `Gemfile`.
 - Run:

```shell
$  bundle
$  rm about.md
$  mkdir _includes
$  touch _includes/head.html
$  touch _includes/header.html
$  touch _includes/footer.html
$  touch _includes/footer-script.html
$  mkdir _layouts
$  touch _layouts/default.html
$  touch _layouts/post.html
$  mkdir _sass
$  mkdir assets
$  mkdir assets/images
$  mkdir assets/stylesheets
$  mkdir assests/javascripts
$  touch assets/stylesheets/main.scss
$  mv index.md index.html
```

Change layout to `default` in `index.html`. Remove all page content, but home.

Add the following to your `_includes/head.html` file to add Bootstrap and custom CSS to all your `head` tags:

```html
{% raw %}
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">

<title>{% if page.title %}{{ page.title | escape }}{% else %}{{ site.title | escape }}{% endif %}</title>
<meta name="description" content="{{ page.excerpt | default: site.description | strip_html | normalize_whitespace | truncate: 160 | escape }}">
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
<link rel="stylesheet" href="{{ '/assets/stylesheets/main.css' | relative_url }}">
<link rel="canonical" href="{{ page.url | replace:'index.html','' | absolute_url }}">
<link rel="alternate" type="application/rss+xml" title="{{ site.title | escape }}" href="{{ '/feed.xml' | relative_url }}">

<!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
<!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
<!--[if lt IE 9]>
  <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
  <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
<![endif]-->
{% endraw %}
```


Add something like the following to your `_includes/header.html` file to add a simple navbar to the top of all your pages:
```html
{% raw %}
<header class="navbar navbar-default">
  <div class="container">
    <nav class="navbar-header">
      <a class="navbar-brand" href="{{ '/' | relative_url }}">
        <img alt="LevelUp" src="{{ '/assets/images/levelup-logo.svg' | relative_url }}" height="50">
      </a>
    </nav>
  </div>
</header>
{% endraw %}
```


Add the following to your `_includes/footer.html` file to create an RSS feed link at the bottom of all pages:
```html
{% raw %}
<footer class="container text-center">
  <p>Subscribe <a href="{{ '/feed.xml' | relative_url }}">via RSS</a></p>
</footer>
{% endraw %}
```


Add the following to your `_includes/footer-script.html` file to add jQuery and BootstrapJS to all your pages:

```html
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
```

Add the following to your `_layouts/default.html` file:

```html
{% raw %}
<!DOCTYPE html>
<html lang="{{ page.lang | default: site.lang | default: 'en' }}">
  <head>
    {% include head.html %}
  </head>
  <body>
    {% include header.html %}
    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-sm-8 col-sm-offset-2">
          {{ content }}
        </div>
      </div>
    </div>
    {% include footer.html %}
    {% include footer-script.html %}
  </body>
</html>
{% endraw %}
```

Add the following to your `_layouts/post.html` file:
```html
{% raw %}
---
layout: default
---
<article itemscope itemtype="http://schema.org/BlogPosting">

  <header class="text-center">
    <h1 itemprop="name headline">{{ page.title }}<small>{% if page.author %} by <span itemprop="author" itemscope itemtype="http://schema.org/Person"><span itemprop="name">{{ page.author }}</span></span>{% endif %}</small></h1>
    <p><time datetime="{{ page.date | date_to_xmlschema }}" itemprop="datePublished">{{ page.date | date: "%B %-d, %Y" }}</time></p>
    <hr>
  </header>

  <div itemprop="articleBody">
    {{ content }}
  </div>

</article>
{% endraw %}
```

Change the content of your `index.html` file to the following in order to show a listing of your blog posts:

```html
{% raw %}
---
title: LevelUp
layout: default
---

{% for post in site.posts %}
  <small>{{ post.date | date: "%B %-d, %Y" }}</small>
  <h4><a href="{{ post.url | relative_url }}">{{ post.title }}</a> <small>{% if post.author %} by {{ post.author }}{% endif %}</small></h3>
  <p>{{ post.excerpt }} <a href="{{ post.url | relative_url }}">Read more &hellip;</a></p>
  {% unless forloop.last == true %}
    <hr>
  {% endunless %}
{% endfor %}
{% endraw %}
```

Finally, change the autogenerated post in your `_posts` folder to whatever you'd like to start blogging about. The section below will help if you want to discuss code in your posts.

## Add Code Syntax Highlighting

```shell
$  gem install rouge
$  rougify help style # This will list available themes
$  rougify style monokai.sublime > _sass/_syntax-highlighting.scss # substitute your favorite for monokai.sublime
```

Add an `assets/stylesheets/main.scss` file and add the following to it:

```scss
---
---
@charset "utf-8";
@import
  "syntax-highlighting"
;
```

Now armed with a [list of supported languages](https://github.com/jneen/rouge/wiki/List-of-supported-languages-and-lexers) you will then be able to wrap your code blocks in Liquid tags like so:

```liquid
{% raw %}{% highlight ruby %}
def show
  @widget = Widget(params[:id])
  respond_to do |format|
    format.html # show.html.erb
    format.json { render json: @widget }
  end
end
{% endhighlight %}{% endraw %}
```

or on Markdown pages you can also use fenced code blocks like so:


    ```ruby
    def show
      @widget = Widget(params[:id])
      respond_to do |format|
        format.html # show.html.erb
        format.json { render json: @widget }
      end
    end
    ```

Which will output your highlighted code block like so:

```ruby
def show
  @widget = Widget(params[:id])
  respond_to do |format|
    format.html # show.html.erb
    format.json { render json: @widget }
  end
end
``` 

## Hosting on GitHub pages

All you have to do to host your site on GitHub pages is to run a build of your site and then push the contents of your `_site` directory to your `gh-pages` branch. Run:

```shell
$  jekyll build
$  git subtree push --prefix _site origin gh-pages
```

## More Info

If you would like to skip all the above and just snag the code for this website up to this point, pull the `phase1` branch of this repo.

Visit [Jekyll docs](http://jekyllrb.com/docs) for more info.