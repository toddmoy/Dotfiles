set nocompatible
filetype off

set rtp+=~/.vim/bundle/Vundle.vim
call vundle#begin()

Plugin 'VundleVim/Vundle.vim'
Plugin 'editorconfig/editorconfig-vim'
Plugin 'airblade/vim-gitgutter'
Plugin 'prettier/vim-prettier'
Plugin 'ctrlpvim/ctrlp.vim'
Plugin 'itchyny/lightline.vim'

call vundle#end()

syntax on

:set number

" Configuration for Lightline
:set laststatus=2
let g:lightline = {
      \ 'colorscheme': 'seoul256',
      \ }


" Ctrl P Triggers
let g:ctrlp_map = '<c-p>'
let g:ctrlp_cmd = 'CtrlP'

filetype plugin indent on
