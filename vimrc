set nocompatible
filetype off

set rtp+=~/.vim/bundle/Vundle.vim
call vundle#begin()

Plugin 'VundleVim/Vundle.vim'
Plugin 'joshdick/onedark.vim'
Plugin 'editorconfig/editorconfig-vim'
Plugin 'airblade/vim-gitgutter'
Plugin 'prettier/vim-prettier'

syntax on

call vundle#end()

syntax on
colorscheme onedark

:set number
:set laststatus=2

filetype plugin indent on
