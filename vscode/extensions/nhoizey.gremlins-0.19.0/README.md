[![Visual Studio Marketplace](https://img.shields.io/vscode-marketplace/d/nhoizey.gremlins.svg)](https://marketplace.visualstudio.com/items?itemName=nhoizey.gremlins)
[![GitHub package version](https://img.shields.io/github/package-json/v/nhoizey/vscode-gremlins.svg)](https://marketplace.visualstudio.com/items?itemName=nhoizey.gremlins)
[![Travis](https://img.shields.io/travis/nhoizey/vscode-gremlins.svg)](https://travis-ci.org/nhoizey/vscode-gremlins)
[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-v1.4%20adopted-ff69b4.svg)](https://github.com/nhoizey/vscode-gremlins/blob/master/CODE_OF_CONDUCT.md)

# Gremlins tracker for Visual Studio Code

This [Visual Studio Code](https://code.visualstudio.com/) extension reveals some characters that can be harmful because they are invisible or looking like legitimate ones.

## Features

- When there is a zero-width space in the code, the extension shows a red bar
- When there is a zero-width non-joiner in the code, the extension shows a red bar
- A few characters that can be harmful have a light red or orange background
  - Non-breaking spaces
  - Left and right double quotation marks
  - Etc.
- Some other characters are less harmful, but you might be interested in knowing they're here, so they're also shown, in blue
- Move the cursor over the character to have a hint of the potential issue
- A gremlin icon is shown in the gutter for every line that contains at least one of these characters

![A screenshot of Gremlins in action](https://github.com/nhoizey/vscode-gremlins/raw/master/images/screenshot.png)

You can also use the [“Unicode code point of current character” extension](https://marketplace.visualstudio.com/items?itemName=zeithaste.cursorCharCode) to show information about the character under cursor in the status bar.

## Adding new gremlins characters

You can configure the list of characters and how they are shown under user settings key `gremlins.characters`.

As an example, the following snippet adds the "U+000C" FORM FEED character:

```
    "gremlins.characters": {
        "000c" : {
            "zeroWidth": true,
            "description": "FORM FEED (FF)",
            "backgroundColor": "rgba(255,127,80,.5)",
            "overviewRulerColor": "rgba(255,127,80,1)",
        }
    }
```

Please help enhance the extension by suggesting new default characters, through Pull Requests or Issues.

You can find all characters in [Unicode Table](https://unicode-table.com/en/).

## Displaying gremlins in the Problems pane

By default, gremlins will be highligted in the text editor and an icon will be displayed in the gutter for each line with at least one gremlin. You can toggle whether gremlins also show in the Problems pane with user settings key `gremlins.showInProblemPane`.

![A screenshot of Gremlins in Problem Pane](https://github.com/nhoizey/vscode-gremlins/raw/master/images/problems-screenshot.png)

## Displaying end-of-line characters

If you want to display end-of-line characters, you can use the [Render Line Endings plugin](https://marketplace.visualstudio.com/items?itemName=medo64.render-crlf).

# Standing on the shoulders of giants

VS Code Gremlins was initialy heavily inspired by [Sublime Gremlins](https://packagecontrol.io/packages/Gremlins), a [Sublime Text](https://www.sublimetext.com/) 3 plugin to help identify invisible and ambiguous Unicode whitespace characters (zero width spaces, no-break spaces, and similar.).

I later discovered the “Gremlins” name had already been used a long time before, in some editors:

[Bare Bones Software](http://www.barebones.com/)'s famous [BBEdit](http://www.barebones.com/products/bbedit/) HTML and text editor for macOS has a “Zap Gremlins” feature since [its first public release April 12th, 1992](https://groups.google.com/forum/#!topic/comp.sys.mac.announce/gvPGyuX3UCs)!

Here's how it looks in recent versions:

<p style="text-align: center"><img src="https://raw.githubusercontent.com/nhoizey/vscode-gremlins/master/images/bbedit-gremlins.png" width="50%" height="auto" alt="Searching for Gremlins in BBEdit" /></p>

It looks like people liked this feature so much that they made [a dedicated website](http://zapgremlins.com/), unfortunately not anymore. Thanks Archive.org for [the cached version](https://web.archive.org/web/20120618091150/http://zapgremlins.com/):

<p style="text-align: center"><img src="https://raw.githubusercontent.com/nhoizey/vscode-gremlins/master/images/zap-gremlins.jpg" width="75%" height="auto" alt="The Zap Gremlins website" /></p>

## License

MIT
