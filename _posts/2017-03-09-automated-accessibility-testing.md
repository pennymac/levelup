---
layout: post
title:  Automated Accessibility Testing
date:   2017-03-09
author_name: Jackie Johnston
author_image: https://s.gravatar.com/avatar/ceffcbfa4a2c365c07e91177db9b618c?s=300
author_url: https://pennymac.github.io/levelup/jackiejohnston
image: https://source.unsplash.com/JVSgcV8_vb4/500x300
excerpt: You can set up a Grunt task to check for different levels of accessibility.
tags: [accessibility, testing]
---

## Why automate accessibility testing?

There are a lot of rules when it comes to accessibility standards. Check out the [W3C Recommendation for WCAG 2.0](https://www.w3.org/TR/WCAG20/) and you'll see what I mean. There are some sites that have boiled these standards down to checklists and these, like the one at [The A11Y Project](http://a11yproject.com/checklist.html), are a good place to start to get a handle on what you need to do. But it would be tedious to go through the checklist for each of your pages and manually look through the code for each item.

In addition to checklists, there are also some ways to test your site online. One validator that I like is WAVE which you can [access from their website](http://wave.webaim.org/) or through the [WAVE Chrome extension](https://chrome.google.com/webstore/detail/wave-evaluation-tool/jbbplnpkjmmeebjpijfedlgcdilocofh?hl=en-US). These are great for a quick look, but don't have the ability to set different criteria, say between conformance levels AA and AAA.

I'm sure there are a huge number of ways out there to automatically test for accessibility. The one we'll be looking at uses [AccessSniff](https://github.com/yargalot/AccessSniff) and [HTML Codesniffer](https://github.com/squizlabs/HTML_CodeSniffer) along with a Grunt plugin called [grunt-accessibility](https://github.com/yargalot/grunt-accessibility). (Please note, if you are a Gulp fan, there is a [Gulp plugin](https://github.com/yargalot/gulp-accessibility) you can use instead, though that is beyond the scope of this tutorial.)

## How to set up a Grunt task to test your pages.

If you can run your website locally, this solution should work for you. I've tested it with a Jekyll static site and a Rails site so far. You can also test any pages already on the internet.

If you are not already set up with Node.js, npm and the grunt-cli, please follow the [instructions to get started with Grunt](http://gruntjs.com/getting-started).

Next, at the root of your project, if you don't already have one, add a `package.json` file with the following:

```json
{
  "name": "my-project-name",
  "version": "0.1.0",
  "main": "Gruntfile.js",
  "devDependencies": {
    "grunt": "^1.0.1",
    "grunt-accessibility": "^5.0.0"
  }
}
```
Customize the name and version number of your project.

Then if you don't already have one, add a `Gruntfile.js` at the root of your project with the following:

```javascript
module.exports = function(grunt) {

  grunt.initConfig({

    accessibility: {
      options: {
        // Levels are WCAG2A, WCAG2AA, WCAG2AAA, and Section508
        accessibilityLevel: "WCAG2AAA",
        browser: true,
        // reportType: "json",
        // reportLocation: "reports",
        reportLevels: {
          notice: false,
          warning: false,
          error: true
        },
        ignore: [
          // "WCAG2AAA.Principle1.Guideline1_4.1_4_6.G17"
        ]
      },
      test: {
        options: {
          urls: [
            "http://localhost:3000/",
            "http://localhost:3000/users/sign_in"
          ]
        }
      }
    }

  });


  grunt.loadNpmTasks("grunt-accessibility");

  grunt.registerTask("default", ["accessibility"]); 

};
```
You can change the `assessibilityLevel` to any of the following:
 - WCAG2A
 - WCAG2AA
 - WCAG2AAA
 - Section508

Change the `urls` listed to the ones you want to check locally.

Also, if you uncomment the `reportType` and `reportLocation`, your tests will print the results in both the console and in a file called `report.json` located in the `reports` folder.

You can uncomment the rule under `ignore` or add others to skip certain rules. This might be helpful for instance if you are getting a lot of contrast errors and want to filter them out until you get everything else passing.

You can [check out the documentation](https://github.com/yargalot/AccessSniff) to further configure your options.

Add `node_modules/` to your `.gitignore` file, and run the following to install your necessary modules:
```shell
$  npm install
```

Have your site running in one tab of your command line console, and in the other tab, run:

```shell
$  grunt accessibility --force
```

And that's all there is to it! You should see a print out in the terminal of your error messages. Here's one, I expect you'll see a lot of if you are using the WCAG2AAA standards:

```shell
ERROR WCAG2AAA.Principle1.Guideline1_4.1_4_6.G17.Fail
Line:193 Col:19
This element has insufficient contrast at this conformance level. Expected a contrast ratio of at least 7:1, but text in this element has a contrast ratio of 5.75:1. Recommendation: change text colour to #0656b1.
```

## What it doesn't do.

While automated testing is nice, it can't do everything for you. It can't test your site using a screen reader or keyboard only. And it can't check what your site looks like for different types of color blindness. (Here's [a Chrome extension](https://chrome.google.com/webstore/detail/i-want-to-see-like-the-co/jebeedfnielkcjlcokhiobodkjjpbjia) that can help with that.)

At least for now, we will probably need a combination of checklists, automated testing and human testing.