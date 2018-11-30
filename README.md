# dotfiles

These are my dotfiles. There are many like it, but this one is mine.

## General

| Preference         | Notes                                                                 |
| :----------------- | :-------------------------------------------------------------------- |
| Color Scheme       | One Dark Vivid for Hyper, VS Code, and Vim                            |
| Terminal           | [Hyper.js](https://hyper.is/)                                         |
| Prompt             | Zsh with [Spaceship](https://github.com/denysdovhan/spaceship-prompt) |
| Editor             | VSCode, Vim                                                           |
| Vim Plugin Manager | [Vundle](https://github.com/VundleVim/Vundle.vim)                     |
| Dotfiles Manager   | [Dotfiles](https://github.com/rhysd/dotfiles)                         |
| Code Formatters    | Prettier                                                              |

## Installation

_General_

1. Install `dotfiles` in your `$PATH`
1. Run `dotfiles clone toddmoy/dotfiles` in a directory where you want to store the files
1. Run `dotfiles link`. You might need to remove old dotfiles, as it won't overrite existing ones.

_Add Node Packages_

1. `npm install -g spaceship-prompt prettier`

_Vim_

1. Run `:PluginInstall` in vim
