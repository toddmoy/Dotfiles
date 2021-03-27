# dotfiles

These are my dotfiles. There are many like it, but this one is mine.

## General

| Preference         | Notes                                                                 |
| :----------------- | :-------------------------------------------------------------------- |
| Code Formatters    | Prettier                                                              |
| Color Scheme       | One Dark Vivid for Hyper, VS Code, and Vim                            |
| Dotfiles Manager   | [Dotfiles](https://github.com/rhysd/dotfiles)                         |
| Editor             | VSCode, Vim                                                           |
| Prompt             | Zsh with [Spaceship](https://github.com/denysdovhan/spaceship-prompt) |
| Terminal           | [Hyper.js](https://hyper.is/)                                         |
| Terminal 2         | iTerm 2                                                               |
| Vim Plugin Manager | [Vundle](https://github.com/VundleVim/Vundle.vim)                     |

## Installation

_General_

1. Install `dotfiles` in your `$PATH`.
1. Run `dotfiles clone toddmoy/dotfiles` in a directory where you want to store the files.
1. Run `dotfiles link`. You might need to remove old dotfiles, as it won't overrite existing ones.

_Add Node Packages_

1. Run `npm install -g spaceship-prompt prettier`.

_Vim_

1. Run `:PlugInstall` in vim.

_VS Code_

1. Run `rm -rf ~/Library/Application\ Support/Code/User`
2. Run `ln -s ./vscode/User ~/Library/Application\ Support/Code/User`

_iTerm 2_

1. Install Operator Mono
2. Run `tic xterm-256color-italic.terminfo`
3. In iTerm preferences, go to Profiles > Terminal > Report Terminal Type and
   type in `xterm-256color-italic`
