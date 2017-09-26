# Computer Science Club Portal
Join the Computer Science Club and learn JavaScript, the programming language that runs the web! Explore your creative nature by designing and programming interactive websites from the ground up, and learn the beauty of the open source community. Expand your programming skills and learn the basics of applications development applicable to any other computer science related course or project. _All while gaining career and college readiness!_

In this club, you will be exposed to cutting edge code and various programming utilities that drives the world today. Through JavaScript, you will inherently learn many programming concepts that you never dreamed of! The best part is that JavaScript's simplistic syntax makes it easy to pick up, no matter what (even if you have no programming background)! Why not give it a try?
# Site Documentation
## Table of Contents
- [Structure](#project-structure)
- [Development Environment](#development-environment)
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

## Development Environment
>To enable the development environment be sure you have python version > 3.6
### Installation
- Clone this repository

```
git clone https://<Username>@github.com/sbcompsciclub/sbcompsciclub.github.io/
```

- Start the development environment

```
cd sbcompsciclub.github.io
python server.min.py <Host (ie: 0.0.0.0)> <Port (ie: 4000)>
```
>`server.min.py` is an included python script. Further documentation for this script can be found [here](https://github.com/shivanmodha/Python-Tools). If you run into some issues, make sure you have python correctly linked in your system's environmental variables (see ["System Variables"](https://www.computerhope.com/issues/ch000549.htm). 

The development server is now running at `http://<Host>:<Port>`