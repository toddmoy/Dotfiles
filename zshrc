export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
fpath=($fpath "/Users/toddmoy/.zfunctions")

# Set Spaceship ZSH as a prompt
autoload -U promptinit; promptinit
prompt spaceship

# Add RVM to PATH for scripting. Make sure this is the last PATH variable change.
export PATH="$PATH:$HOME/.rvm/bin"

# Add local bin
export PATH="$PATH:$HOME/bin"

# Add path to Postgres
export PATH="$PATH:/usr/local/Cellar/postgresql@9.6/9.6.10/bin"

# Add path to Node modules
export  PATH="$PATH:/usr/local/bin"

# Add aliases
alias fixvideo='sudo killall VDCAssistant'
alias fixaudio='sudo killall coreaudiod'
