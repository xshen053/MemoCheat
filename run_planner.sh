export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" 
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"


cd /Users/xiaxi/Desktop/ebbinghaus-plan-scheduler/src/ebbinghaus_client
nvm use 16.13.0
npm run dev
