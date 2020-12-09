set nocompatible
set backspace=indent,eol,start
set background=dark

if empty(glob('~/.vim/autoload/plug.vim'))
  silent !curl -fLo ~/.vim/autoload/plug.vim --create-dirs
    \ https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim
  autocmd VimEnter * PlugInstall --sync | source $MYVIMRC
endif

call plug#begin('~/.vim/plugged')
Plug 'editorconfig/editorconfig-vim'
Plug 'airblade/vim-gitgutter'
Plug 'prettier/vim-prettier'
Plug 'itchyny/lightline.vim'
Plug 'ctrlpvim/ctrlp.vim'
Plug 'tpope/vim-fugitive'
Plug 'tpope/vim-surround'
Plug 'preservim/nerdtree'
Plug 'junegunn/vim-easy-align'
call plug#end()

syntax on

set number
set autoindent

" Configuration for Lightline
set laststatus=2
let g:lightline = {
      \ 'colorscheme': 'seoul256',
      \ }

" Ctrl P Triggers
let g:ctrlp_map = '<c-p>'
let g:ctrlp_cmd = 'CtrlP'

" NERDTree Config
" autocmd vimenter * NERDTree

" Align Github Flavored Markdown tables
au FileType markdown vmap <Leader><Bslash> :EasyAlign*<Bar><Enter>

" Operator Font tweaks
highlight Comment gui=italic
highlight Comment cterm=italic
highlight htmlArg gui=italic
highlight htmlArg cterm=italic


filetype plugin indent on
