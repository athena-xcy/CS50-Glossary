#!/bin/bash
export PATH="$HOME/.pyenv/bin:$PATH"
eval "$(pyenv init -)"
eval "$(pyenv virtualenv-init -)"
cd /home/yanmulin/CS50-Glossary/Zepplin/
pyenv activate zepplin
gunicorn -w4 -b0.0.0.0:8000 manage:app

