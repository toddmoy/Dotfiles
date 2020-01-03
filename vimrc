set nocompatible
" filetype off

if empty(glob('~/.vim/autoload/plug.vim'))
  silent !curl -fLo ~/.vim/autoload/plug.vim --create-dirs
    \ https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim
  autocmd VimEnter * PlugInstall --sync | source $MYVIMRC
endif

call plug#begin('~/.vim/plugged')
Plug 'editorconfig/editorconfig-vim'
Plug 'prettier/vim-prettier'
Plug 'itchyny/lightline.vim'
Plug 'ctrlpvim/ctrlp.vim'
call plug#end()

" set rtp+=~/.vim/bundle/Vundle.vim
" call vundle#begin()

" Plugin 'VundleVim/Vundle.vim'
" Plugin 'editorconfig/editorconfig-vim'
" Plugin 'airblade/vim-gitgutter'
" Plugin 'prettier/vim-prettier'
" Plugin 'ctrlpvim/ctrlp.vim'
" Plugin 'itchyny/lightline.vim'

" call vundle#end()

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
