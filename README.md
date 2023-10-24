This is a  [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).
By the way i used [**Django Rest Framework**](https://www.django-rest-framework.org/) to build the api behind the scenes.

# Getting Started

## Step 0: Clone the project to any directory

```bash

git clone https://github.com/roberto-fernandino/mobile-gov-app.git
```

> **Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.
> Make sure you have at least 3.11.4 python version installed.

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npx react-native start

# OR using Yarn
yarn start
```

Second, you will need to apply the migrations and commit it to the database to make everything work.

This can be made with **Django**, from the _root_, running:

```bash
# Installing dependencies (just copy and paste if you are in any linux distro which you should fucking be)
# If you are on windows do the same with windows commands

python -m venv env

source /env/bin/activate # for linux (which you should be using as you are probably a fucking developer).
source /env/bin/activate.ps1 # for windows (powershell) ! NOT RECOMMENDED ! Windows is useless for DEVS.
pip install -r requirements.txt

# Applying migrations and migrating
python core/manage.py makemigrations
python core/manage.py migrate
python core/manage.py createsuperuser # to create a super user to access admin page in (http://<dominio>/admin)
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:
Start the django [**DRF**](https://www.django-rest-framework.org/)

### Starting the API server

```bash
# Start the server
python core/manage.py runserver
```

Now you can access API admin page from [**this link**](http://127.0.0.1:8000/admin).

### For Android

```bash
# using npm (npx)
npx react-native run-android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

## Congratulations! :tada:

You've successfully run my React Native App. :partying_face:

# Troubleshooting

If you can't get this to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
