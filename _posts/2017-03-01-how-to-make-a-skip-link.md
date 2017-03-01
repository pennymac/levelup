---
layout: post
title:  How to Make a Skip Link
date:   2017-03-01
author_name: Jackie Johnston
author_image: https://s.gravatar.com/avatar/ceffcbfa4a2c365c07e91177db9b618c?s=300
author_url: https://www.jackiejohnston.com
image: https://source.unsplash.com/4m66VBr8zns/500x300
excerpt: This shows one way to make your site easier to navigate by keyboard.
tags: [html, css, accessibility]
---

## What's a Skip Link?

Some website visitors only use their keyboard or a switch device to navigate sites. In order for them to navigate to a link or a form field in the main part of your website, they often have to tab through a ton of content in your header, usually all your menu links. 

But there's an easy way you can allow them fewer clicks to get where they want to go. You can add a *skip link*.

{% youtube rD3db6-vmuo %}
The above video is part of a free [Web Accessibility course](https://www.udacity.com/course/web-accessibility--ud891) on Udacity created by Google.

## Specs

A skip link should only be visible on your page when a user clicks the `tab` key for the first time after the page is loaded. And if the user then clicks the `enter/return` key while this link is in focus, it will take them to the main part of the page and the next time they click the `tab` key they will be focused on the next focusable element in the main part of your page instead of in your header.

## How To

Let's say your page markup looks something like this:

```html
{% raw %}<!DOCTYPE html>
<html lang="en">
  <head>
    ...
  </head>
  <body>
    <header role="navigation">
      ...
    </header>
    <main role="main">
      ...
    </main>
    <footer role="navigation">
      ...
    </footer>
  </body>
</html>{% endraw %}
```

First you'll need to add an anchor link somewhere after the opening `body` tag and before your first focusable content that will link to the element with a `main` id:

```html
<a id="skip-to-main-link" href="#main" class="sr-only sr-only-focusable">Skip to main content.</a>
```

You may have to experiment a little with the best place to put this link. Right after the opening `body` tag would be the easiest location but you may have to put it inside your header before the menu links begin.

Next, add `id="main"` and `tabindex="-1"` attributes to your `main` opening tag (or whatever element you consider the beginning of your main content) so now your markup looks like:

```html
{% raw %}<!DOCTYPE html>
<html lang="en">
  <head>
    ...
  </head>
  <body>
    <a id="skip-to-main-link" href="#main" class="sr-only sr-only-focusable">Skip to main content.</a>
    <header role="navigation">
      ...
    </header>
    <main role="main" id="main" tabindex="-1">
      ...
    </main>
    <footer role="navigation">
      ...
    </footer>
  </body>
</html>{% endraw %}
```

If you are using [Bootstrap v4](https://v4-alpha.getbootstrap.com) in your project, that should be all that's necessary, otherwise add the following to your CSS so that your skip link will only be visible when it's in focus:

```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}

.sr-only-focusable:active, .sr-only-focusable:focus {
  position: static;
  width: auto;
  height: auto;
  margin: 0;
  overflow: visible;
  clip: auto;
}
```

I've added a skip link to this site, so you can go ahead and try it out on this page. Although there's only one link in the menu bar at this point, I have a bunch of social share links on the post pages that you'd have to tab through without the skip link.

## Resources

You can [read more about skip links](http://webaim.org/techniques/skipnav/) in this article on the Web AIM site.

[https://developers.google.com/web/updates/2016/03/focus-start-point?hl=en](https://developers.google.com/web/updates/2016/03/focus-start-point?hl=en)