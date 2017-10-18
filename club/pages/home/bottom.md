# Welcome
The SPA Framework allows for easy generic site creation, aimed for modularity and ease. SPA-Framework was built with React and Bootstrap. This site is a template for this framework. Feel free to download, clone, tweak this up to your liking. Have fun!

# Getting Started
## Navigation
Site navigation is handled through the JSON file `resources/navigation.json`, where the page references are linked, physical links are defined, and URL routing is handled. To add additional pages, or modify any of the pages here, try editing `navigation.json`. The bootstrap navbar at the top is also configured through this JSON file, allowing for easy access to additional pages.

## Sudo-HTML
You will notice that a lot of the pages defined are simple HTML pages. However, upon closer examination, you will find markdown syntax (this entire page is markdown, but is defined as `bottom.html` instead). Each of these HTML files accepts markdown text, so that formatting can appear in this view.

## Nested pages
You can also nest pages too.<br/><br/><Button role="button" class="btn btn-outline-secondary" onclick="window.location.href = '/club/home/nested';">Nested Page Test</Button><br/><br/>
You can have as many as you want!
## Homepage
This site doesn't have to run on the root of a server, or GitHub pages website. In fact, that would be problematic since every request after `/` would be directed to the frameworks `index.html`, making it impossible to host anything else. In `navigation.json`, define:
```
"base": "/path/to/your/hosted/directory"
```
and you are all set!