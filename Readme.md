# EbbingHaus Planner
![image](https://github.com/xshen053/ebbinghaus-plan-scheduler/assets/97472036/4c28ccec-8bfa-4de6-9404-7ee5326394c0)

# Frontend Start

```
npm install
npm start
```

# Backend start

```
docker-compose up -d
python manage.py runserver
```

# Common Issues

## Webpack build failing with ERR_OSSL_EVP_UNSUPPORTED

solution:

https://stackoverflow.com/questions/69394632/webpack-build-failing-with-err-ossl-evp-unsupported

a easy way to solve

```
macOS and Linux
You should have installed NVM (Node Version Manager). If you never had before, just run this command in your terminal:
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

Open your project

Open the terminal in your project

Run the command nvm install 16.13.0 or any older version

After the installation is completed, run nvm use 16.13.0
```

```
nvm install 16.13.0
nvm use 16.13.0
```

# Development

## Backend Development

I use python virtual environment to make sure it doesn't affect my local environment

```
python3 -m venv ebbinghaus-env
source ebbinghaus-env/bin/activate
```
