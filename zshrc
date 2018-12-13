# Set Spaceship ZSH as a prompt
# https://github.com/denysdovhan/spaceship-prompt
# npm install -g spaceship-prompt
autoload -U promptinit; promptinit
prompt spaceship
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
fpath=($fpath "/Users/toddmoy/.zfunctions")
export PATH="$PATH:$HOME/bin"
export PATH="$PATH:/usr/local/Cellar/postgresql@9.6/9.6.10/bin"
