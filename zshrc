export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
fpath=($fpath "/Users/toddmoy/.zfunctions")

# Set Spaceship ZSH as a prompt
autoload -U promptinit; promptinit
prompt spaceship

# Add command completion
autoload -U compinit
compinit

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
alias ga="git add ."
alias gc="git commit -m"
alias gp="git pull"
alias gpp="git push"
alias gl="git log"
alias gs="git status"
alias ls="ls -G"
alias weather="curl v2.wttr.in"
alias d="dirs -v | head -10"

# Add direnv
eval "$(direnv hook zsh)"

# Change directory by typing path without `cd`
setopt autocd autopushd

# Add macros

# What's listening on port?
# Usage: `listening {ps|port}`
listening() {
    if [ $# -eq 0 ]; then
        sudo lsof -iTCP -sTCP:LISTEN -n -P
    elif [ $# -eq 1 ]; then
        sudo lsof -iTCP -sTCP:LISTEN -n -P | grep -i --color $1
    else
        echo "Usage: listening [pattern]"
    fi
}
