# Computer Science Club Portal
Join the Computer Science Club and learn JavaScript, the programming language that runs the web! Explore your creative nature by designing and programming interactive websites from the ground up, and learn the beauty of the open source community. Expand your programming skills and learn the basics of applications development applicable to any other computer science related course or project. _All while gaining career and college readiness!_

In this club, you will be exposed to cutting edge code and various programming utilities that drives the world today. Through JavaScript, you will inherently learn many programming concepts that you never dreamed of! The best part is that JavaScript's simplistic syntax makes it easy to pick up, no matter what (even if you have no programming background)! Why not give it a try?

# Site Documentation (SPA Framework v1)
> This documentation version is out of date as of SPA Framework v2)
## Table of Contents
- [Structure](#project-structure)
- [Development Environment](#development-environment)
    - [Overview](#overview)
    - [Installation](#installation)
    - [Navigation](#navigation)
- [Creating and Managing Pages](#creating-and-managing-pages)
    - [Clean Directory](#clean-directory)
    - [Bottom vs Top](#bottom-vs-top)
    - [Linking to the Navigation](#linking-to-the-navigation)
    - [Content](#content)
- [Portal](#portal)
    - [Authentication](#authentication)
    - [Views](#views)
    - [Edit Defaults and Custom Views](#edit-defaults-and-custom-views)
    - [Equations and Boolean Checking](#equations-and-boolean-checking)
    - [Adding a Member](#adding-a-member)   
    - [Adding Fields](#adding-fields)
    - [Importing and Exporting](#importing-and-exporting)
    - [Graphing](#graphing)
    - [Other](#other)
- [Known Issues](#known-issues)
## Project Structure
- bootstrap/
- pages/
- resources/
    - home/
        - `bottom.json`
        - `top.json`
    - `navigation.json`
- static/
- `index.html`

## Overview
This site was made with [React](https://github.com/facebook/react) and utilizes [Bootstrap v4-alpha](https://github.com/twbs/bootstrap). Many HTML tags link to bootstrap components, so be sure to checkout the bootstrap documentation.

## Development Environment
> To enable the development environment be sure you have python version > 3.6. Furthermore, since this webpage caches a lot of resources, you may have to force a chrome dependency refresh (`Ctrl+Shift+R`) or clear the past hour of browsing cache/data for changes to appear. Going to the development server in incognito mode sometimes works too.

### Installation
- Clone this repository

```BAT
git clone https://<Username>@github.com/sbcompsciclub/sbcompsciclub.github.io/
cd sbcompsciclub.github.io
```

- Start the development environment

```BAT
npx http-server
```
or the Python method
```BAT
python3 server.min.py <Host (i.e. 0.0.0.0)> <Port (i.e. 4000)>
```

> `server.min.py` is an included python script. Further documentation for this script can be found [here](https://github.com/shivanmodha/Python-Tools). If you run into some issues, make sure you have python correctly linked in your system's environmental variables (see [System Variables](https://www.computerhope.com/issues/ch000549.htm). This server script is included for your convience, but any server should work (i.e. apache tomcat, node.js).

The development server is now running at `http://<Host>:<Port>`

### Navigation
The initial resource file this website reads is `resources/navigation.json`, which defines
- Title
- TitleTree
- Default Landing Page
- Links
- URL Forwarding
- Buttons

#### Title
The `title` attribute controls title of the page as seen in the navigation bar
```JSON
"title": <NavBar title text>
```

#### TitleTree
The `titleTree` attribute controls the individual page titles. For example, the home page will have the title <`titleTree`> + "Home".
```JSON
"titleTree": <Default title>
```

#### Default Landing Page
The `default` attribute controls the default page displayed when requesting this website.
```JSON
"default": <Page Link>
```

#### Links and URL Forwarding
The `links` object controls the displayed navbar links and the linked pages accessible through the URL. An example is shown below, followed by a default explanation.
```JSON
"links": {
    "Home": ["left", "component", "component.home"],
    "Beginner": ["left", "component", "component.genericpage", "/pages/beginner"],
    ...
}
```

- The JSON key in `links` defines the page. As long as the key doesn't contain a `"/"` character, this will show up on the navbar as a link and all url requests for `/<key>` will link to this page. Keys that contain the `"/"` character defines the URL link, but not a navigation bar link. Therefore, you can include as many nested pages as possible.
- Each key defines an array, typically of size 4.
    - `key[0]` controls the location of the navbar link, `"left"` or `"right"`.
    - `key[1]` controls the type of link, a `"component"` (defining a webpage) or `"link"` defining an `<a href>`
    - `key[2]` depends on `key[1]`
        - If `component`, this controls the component type
            - `component.home`
            - `component.genericpage`
            - > Further components must be defined in React and must be redeployed

        - If `link`, this controls the `href` pointer
    - `key[3]` (_optional_) defines the arguments sent to the component classes
        - For example, `component.genericpage` takes in a path location defining the markdown resources used to generate the page.

#### Buttons
The `buttons` object controls the displayed navbar buttons.
```JSON
"buttons": {
    "GitHub": ["success", "link", "https://github.com/sbcompsciclub"]
}
```

- The JSON key in `buttons` defines the button name.
- Each key defines an array
    - `key[0]` controls the [bootstrap button type](https://v4-alpha.getbootstrap.com/components/buttons/).
    - `key[1]` controls the type of link, a `"component"` (defining a webpage) or `"link"` defining an `<a href>`
    - `key[2]` depends on `key[1]`
        - If `component`, this controls the component type
            - `component.home`
            - `component.genericpage`
            - > Further components must be defined in React and must be redeployed

        - If `link`, this controls the `href` pointer
    - `key[3]` (_optional_) defines the arguments sent to the component classes
        - For example, `component.genericpage` takes in a path location defining the markdown resources used to generate the page.
        > `key[3]` parameters have not been tested for buttons. Place an issue if you have problems.

## Creating and Managing Pages
### Clean Directory
In order for this to work, each page must be linked to its own directory, where all of the pages resources are located. The basic directory layout looks like this:
```
new-custom-page/
    bottom.md
    bottom.jpg
    top.md
    top.jpg
```

### Linking to the Navigation
Whether or not you want a physical link associated to this subpage, you are going to need a generic URL for it so that it is accessible. Be sure to create an entry in [navigation.json](#navigation)

### Bottom vs Top
The navigation bar is set to be able to handle content above and below it (the homepage is a good example of this). This content is controlled per subpage. Content that will appear below the navigation bar will use the keyword `bottom` while content that will appear above the navigation bar will use the keyword `top`.
- Unfortunately, if you want to use the same resources for both the top and bottom contents, it must be defined twice.
- Top content is optional. Only implement top content files if needed.

### Background Images
Once the directory is linked to the URL, you can add a custom background. By default, the website searches for `bottom.jpg` in the directory linked, so this is as simple as implementing this file. The default background attributes are set to tile mode; therefore, a seamless background works great and is very scalable.

Implementing `top.jpg` will do the same for the top content.

### Content
Adding content to the subpage is as easy as creating a simple markdown file. For bottom content, implement `bottom.md` and for top content implement `top.md`.

Know that this isn't your standard markdown parser either. Normal markdown parser ignore `<html>` code tags, for good reason. Markdown inherently compiles to `HTML`, although I've turned off an `IGNORE_HTML` flag through the react. That way, you can display any content you want, as long as it is feasible through `HTML` itself. Actually, you can even intertwine markdown with `HTML`:
```markdown
# Header 1
# Header 2
Paragraph
<Button>New Button</Button>
```

This will generate the following `HTML` in the backend
```html
<h1 style="BLAHBLAHBLAH">Header 1</h1>
<h2 style="BLAHBLAHBLAH">Header 2</h2>
<p>Paragraph<Button>New Button</Button></p>
```

Notice how the button tag appears inside the paragraph tag. This works to our benefit because it will stay within the content frame the markdown establishes. Unfortuantely, embedding script or styles through `<script>` or `<style>` respectively will not work. A way around this is to embed it to the style or event attributes directly on the `HTML` tag:
```markdown
# Header 1
# Header 2
Paragraph
<Button style="position: absolute; top: 0px; left: 0px" onclick="alert('You clicked me');">New Button</Button>
```
> Yes, this can get overwhelmingly annoying if your trying to do something intense, but thats the price for modularity

If you really need a script there, just use a lambda function inside an event handler attribute.
`<img onerror="()=>{//code here}" src="thing/that/doesn't/exist"/>`

## Portal
This is the portal that the computer science club officers log into.

### Authentication
Sign in with the account was created by you. If you ever forget your password, send yourself a password change email via firebase, or ask the awesome amazing cool developer who is currently managing the portal.

### Views
The current view determines what information is dumped onto the table. The default views are shown in View -> [View Name]. You can switch to any of these views simply by clicking on any of them. The complete view just contains all the information in the database.

### Edit Defaults and Custom Views
If you want to edit the default views that are stored, go to View -> Edit Defaults and type in which view you want to edit. Here a table will be displayed. Editing the database routing will change what values are being displayed for each student. Here you can put in a database routing, equations, or boolean checking, depending on what you need. Editing the header column will change the header of the column in that view when it is loaded up. If you want to create a new view, just put a view name that has not been taken. If you want to delete a view, click the Delete View button after typing in the view name.

You can also use a custom view. Using a custom view allows you to see the information that you want to see, but it does not edit the default views. So if you want to quickly see everyone's first name, you can use a custom view and make a row with a header of `First Name` and a database routing of `name.first`.

### Equations and Boolean Checking
If you would like to add string or numbers, you can use an equation. To use an equation, just add an equal sign before the equation when inputting the database routing. For example, `=5+5` would yield 10 for every student. Now to access values from the database, simply put the routing in for them. If you wanted to show the full name of each student, then using `=Full+Name:+name.first+name.last`. This would give the full name of each student without a space in between. If you want to add a space, use the #s special character. You can add integers or strings from the database or by hardcoding the value. To get the length of anything use the .count "method." By using `=attendance.count` it will return the amount of days that each student has come to the club since the attendance object is a JSON object with every meeting the student has come to.

Using boolean checking is something that would be useful for checking if a student should get club credit. This can be done by using the ? symbol. To check if each student came more than 8 meetings, just use `?{attendance.count}>8`. This will return true if they came to more than eight meetings. Anything put into the curly braces will be fed into the same function that evaluates the `=` expressions. So, if you want to use database routing then use the curly braces. Logical operators are also supported on this since it is fed into an eval function. `?5<8 && 9>0` will be true every time.
**
Be careful what you put into the checking function since it can be accidently used to inject JavaScript code.
**

### Adding / Removing a Member

Adding a member is quick and easy by going to data and then clicking add member. Here fill out the basic information such as first and last name and school id. This will put them into our database as a new student.

Removing a member is just as easy by going to data and then clicking removing member. Here fill out the students id number and then click remove.

### Adding fields

Adding fields are useful to keep track of attendance of each member. To add a field, go to Field -> Add. Here put the database routing that you want to change or add, put the value you want to set it to, and enter the id for the member that you want to do this for. To take attendance, add a field to the attendance object with the a key of the date and a value of where the meeting is being held. For example,
 ```
Database Routing: attendance.10-26-18
Value: DLC
SBID: 10000000
 ```
would signify that the student with the id 10000000 came to the meeting in the DLC on 10-26-18. Adding fields can also be used for editing names, or adding contact information.

### Importing and Exporting
To import a csv file to override the values in the database use the Data -> Import CSV button and choose the file.

To export, use the drop down menu named Export. There will be two options. One will be to download whatever you are currently viewing on the table as csv. The file will be named whatever the view is named. The other option will download a text file with the students that should get credit formatted in the correct way to hand in to the school.

### Current year

You can switch the year that you are viewing by going to Data -> View Next/Previous Year

The year you are viewing is shown to the left of the Refresh Button. If you click it, then it will increment the year up by one.

### Graphing

When you click the `Graph` button a graph of the attendance throughout the past year shows up. The graph includes how many people came on each day, and how many of each grade level came. You can toggle the bar graphs or line graph by clicking the buttons above the graph. For example, by clicking freshman, you will toggle the freshman bar graph.

### Other
The Sign Out button will sign you out.

The Refresh button will refresh that data you are viewing.


## Known Issues
### SPA Redirection (GitHub)
Consider the following example
```
You want to host something completely separate from this website (an example or demo) on this repository, so you create another directory on the root, and add another index.html page that displays index.js content. Naturally, you think that https://sbcompsciclub.github.io/path/to/your/static/page will direct you to your page (as it does through the development server).
```
This doesn't work. Unfortunately, GitHub directs every request after `sbcompsciclub.github.io` to the single page application (SPA) defined at root as `index.html`. While this means the URL handling will strictly work properly through the SPA, it also renders other static page links useless. A request to `https://sbcompsciclub.github.io/path/to/your/static/page` will be directed to `index.html` instead of `/path/to/your/static/page`.
- A simple bypass to this problem is by hosting your static page on another server and linking to it by creating a page and `<iframe>`ing it in.
- A long term solution would be to host the SPA in a subdirectory, instead of on the root
    - This solution must be implemented through React, and will almost 100% break everything for the first week, until we can relink all resources.
