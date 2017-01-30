---
layout: post
title:  How to Contribute to LevelUp
date:   2017-01-27
author: Jackie Johnston
excerpt: This is a quick walk-through on how to create a post for this site.
tags: [jekyll, markdown, yaml]
---

## Getting Started
If this is the first time you've posted, you'll need to install Jekyll and download the repo.
 
### Check the Requirements
First, you'll need the following installed on your dev environment:
 - [Ruby](https://www.ruby-lang.org/en/downloads/) (including development headers, v2.3.1)
 - [RubyGems](https://rubygems.org/pages/download)
 - Linux, Unix, or Mac OS X
 - [GCC](https://gcc.gnu.org/install/) and [Make](https://www.gnu.org/software/make/) (in case your system doesn't have them installed, which you can check by running `gcc -v` and `make -v` in your system's command line interface)


### Download the Repo

Run:
```shell
$  git clone git@github.com:jackiejohnston/levelup.git
$  cd levelup
$  rvm --ruby-version use 2.3.1@levelup --create # optional, if you use RVM
$  bundle
$  git checkout -b post/my-awesome-post-title # create a branch off of master
$  jekyll liveserve --incremental --baseurl ''
```

At this point you can go to `http://localhost:4000/` in your browser to see the site.

### Create a post

Make a new Markdown file in the `_posts` directory named according to the following format, where `YEAR` is a four-digit number and `MONTH` and `DAY` are both two-digit numbers:

```
YEAR-MONTH-DAY-title.md
```
 For example, these are the two I've created so far:

```
2017-01-18-create-a-jekyll-blog.md
2017-01-27-how-to-contribute-to-levelup.md
```

### YAML Front Matter

The first thing in your new file will be YAML front matter set between triple-dashed lines. Here's the what I'm using on the current post:

```
{% raw %}---
layout: post
title: How to Contribute to LevelUp
date:   2017-01-27
author: Jackie Johnston
excerpt: This is a quick walk-through on how to create a post for this site.
tags: [jekyll, markdown, yaml]
---{% endraw %}
```
You will obviously change all the values here except for the first one which you'll leave as `post`.

### Write your post

You are now ready to compose your post using [Markdown](https://guides.github.com/features/mastering-markdown/). You can use fenced code blocks for syntax highlighting like so:


    ```ruby
    def show
      @widget = Widget(params[:id])
      respond_to do |format|
        format.html # show.html.erb
        format.json { render json: @widget }
      end
    end
    ```

Which will output to:

```ruby
def show
  @widget = Widget(params[:id])
  respond_to do |format|
    format.html # show.html.erb
    format.json { render json: @widget }
  end
end
``` 

Here's a [list of supported languages](https://github.com/jneen/rouge/wiki/List-of-supported-languages-and-lexers) that you can use.

### Adding Photos & Videos

To add a responsive image like the following:

![Laptop computer on desk]({{ baseurl }}/assets/images/desktop.jpg){:class="img-responsive"}

Just add the photo to the `assets/images` directory and use the following tag in your post:

```markdown{% raw %}
![Image alt text here.]({{ baseurl }}/assets/images/desktop.jpg){:class="img-responsive"}
{% endraw %}```

To embed a YouTube video like the following:

{% youtube FOfIoCi9uTI %}

First get the video id. It will be everything after the `v=`. So for `youtube.com/watch?v=FOfIoCi9uTI` the id is `FOfIoCi9uTI`. Then add it to a Liquid tag like:

```liquid{% raw %}
{% youtube FOfIoCi9uTI %}
```{% endraw %}

If instead you have a Vimeo video, take the id from the URL, such as `vimeo.com/22439234` and add to a Vimeo Liquid tag:

```liquid{% raw %}
{% vimeo 170526921 %}
```{% endraw %}

to get this:

{% vimeo 170526921 %}


### Preview & Build

You will be able to preview your blog post by running:

```shell
$  jekyll liveserve --incremental --baseurl ''
```

Your post will be listed on the homepage with a link.

Once it looks perfect, run:

```shell
$  JEKYLL_ENV=production jekyll build
$  git add .
$  git commit -m "Added new post"
$  git push origin post/my-awesome-post-title
```

### Pull Request

Then go to the [repo](https://github.com/jackiejohnston/levelup) and create a merge request.

Start blogging now!

