🇺🇸 
This is a  [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).
I've used the [**Django Rest Framework**](https://www.django-rest-framework.org/) for the backend API.


# Getting Started

## Step 0: Clone the project and install dependencies
> **Note**: Before proceeding, ensure you've completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) up to "Creating a new application". Also, ensure you have Python version 3.11.4 or above.

```bash

git clone https://github.com/roberto-fernandino/mobile-gov-app.git

cd mobile-gov-app
npm install

# now lets fix an error with dependencie rn-fetch-blob (THIS IS OBLIGATORY)

# Windows
rm .\node_modules\rn-fetch-blob\react-native.config.js

# Linux (Which u should be using 👍)
rm node_modules/rn-fetch-blob/react-native.config.js

 # And finally
npm cache clean -f 

```

### To run IOS
Install cocoapods following the [*guide*](https://cocoapods.org/)
obs. U can only run IOS in a macOS with Xcode installed since we are not using Expo reason, Expo is not good for professional Applications.
```bash
# Now
cd ios
# Run 
gem uninstall cocoapods activesupport
gem install activesupport -v 6.0.0
gem install cocoapods
pod install

# Now you wait and if u want u can run the application in IOS
```



## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash

# using npm (npx is the npx executioner built for react applications)
npx react-native start --reset-cache # To already clear cache.

# if ask to install dependencies press (Y) and ENTER for all them.

# OR using Yarn
yarn start
```

Second, you will need to apply the migrations and commit it to the database to make everything work.

This can be made with **Django** _the python framework_, from the _root_, running:

```bash
# Installing dependencies (just copy and paste if you are in any linux distro which you should fucking be)
# If you are on windows do the same with windows commands

python -m venv env

# for linux (which you should be using as you are probably a fucking developer).
source /env/bin/activate
pip install -r requirements.txt
# Applying migrations, migrating and creating the admin API user.
python core/manage.py makemigrations
python core/manage.py migrate
# Remember the superuser is just the admin user dont use it for the app.
python core/manage.py createsuperuser

# for windows using Powershell ! NOT RECOMMENDED ! Windows is useless for Developers.
Set-ExecutionPolicy RemoteSigned
.\env\Scripts\activate 
pip install -r .\requirements.txt
# Applying migrations, migrating and creating the admin API user.
python .\core\manage.py makemigrations
python .\core\manage.py migrate
# Remember the superuser is just the admin user dont use it for the app.
python .\core\manage.py createsuperuser

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
# I recommend already run the android emulator and check if ADB found it running:
adb devices # Anywhere in the terminal

# This done now lets bundle, build and start the application with:
# using npm (npx)
npx react-native run-android

# OR using Yarn
yarn android
```

### Commom error that DEVS who mistakenly use WINDOWS to develop software. (looks a joke but isn't)
![image](https://github.com/roberto-fernandino/mobile-gov-app/assets/138389749/3bd83228-8440-4e07-99d0-5750d051421e)

```bash
# To check what's causing this run
netstat -aon | findstr 8081
```

You will see something like:
 ![image](https://github.com/roberto-fernandino/mobile-gov-app/assets/138389749/82a2be6e-857c-4b21-8b9b-1a43b19cd6cf)
Where the red arrow points to the PID of the process windows mistakenly and stupidly run in port=8081
Now lets check what is the process using port 8081:
 - Open Task Manager pressing "ctrl + shift + esc".
 - Paste in the search bar the PID u found with the last command
 - If the process is an daemon (service) it is important so we restart in a diferent port (OR SIMPLY KILL THE PROCESS AND RESTART WATCHMAN IT'S EASIER).

1st way to fix:

- press "win + r"
- after u know the service it is using the port find it in the services manager
- right click on it and restart, this will make it use another por. Now run safe:

```bash
 npx react-native start
```

2nd way to fix:

JUST STOP USING WINDOWS SERIOUSLY, WHAT ARE U DOING ? ? ? Buy a macbook or simply and better install any Linux distro and learn how this magic OS works, i sware it will make you more inteligent and a fkcing REAL developer.


### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

![image](https://github.com/roberto-fernandino/mobile-gov-app/assets/138389749/fc67942d-b7ff-472b-8ac9-0dfe114c735d)

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

## Congratulations! :tada:

You've successfully run my React Native App. :partying_face:

You can acces admin page in [Here](http://127.0.0.1:8000/admin).

Use the account you created with `py manage.py createsuperuser`

# Troubleshooting

If you can't get this to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.

#  🇧🇷 Projeto React Native

Este é um projeto [**React Native**](https://reactnative.dev), inicializado usando [`@react-native-community/cli`](https://github.com/react-native-community/cli). Usei o [**Django Rest Framework**](https://www.django-rest-framework.org/) para a API de backend.

## Começando

### Passo 0: Clone o projeto e instale as dependências
> **Nota**: Certifique-se de que concluiu as instruções de [Configuração do Ambiente React Native](https://reactnative.dev/docs/environment-setup) até o passo "Criando uma nova aplicação".

```bash
git clone https://github.com/roberto-fernandino/mobile-gov-app.git
cd mobile-gov-app
npm install

# Correção de erro com a dependência rn-fetch-blob (ISSO É OBRIGATÓRIO)
rm node_modules/rn-fetch-blob/react-native.config.js
npm cache clean -f
```

## Passo 1: Iniciando os Servidores

Primeiro, você precisará iniciar o **Metro**, o _bundler_ JavaScript que vem _com_ o React Native.

Para iniciar o Metro, execute o seguinte comando na _root_ do seu projeto React Native:

```bash
# Usando npm (npx):
npx react-native start --reset-cache 

# OU usando Yarn:
yarn start
```

Segundo, você precisará aplicar as migrações e enviá-las ao banco de dados para que tudo funcione.

Isso pode ser feito com **Django** _the python framework_, do _root_, executando:

```bash
python -m venv env

# No Linux:
source /env/bin/activate
pip install -r requirements.txt
# Aplicando migrações so pra ter certeza, migrando no banco e criando superusuario.
python core/manage.py makemigrations
python core/manage.py migrate
# Lembre-se o superuser é criado pra ser utilizado no painel de admin no host, não logue com ele no app.
python core/manage.py createsuperuser

# No Windows (usando PowerShell) ! Não Recomendando ! Windows é inutil pra desenvolvedores, muita burocracia, configuraões ruins, pior shell já inventado etc
.\env\Scripts\activate 
pip install -r .\requirements.txt
# Aplicando migrações so pra ter certeza, migrando no banco e criando superusuario.
python .\core\manage.py makemigrations
python .\core\manage.py migrate
# Lembre-se o superuser é criado pra ser utilizado no painel de admin no host, não logue com ele no app.
python .\core\manage.py createsuperuser
```


## Passo 2: Inicie sua Aplicação


Iniciando o servidor da API

```bash
python core/manage.py runserver
```

Agora voce pode acessar o painel de admin a partir [**desse link**](http://127.0.0.1:8000/admin).

Deixe o Metro Bundler rodando em seu próprio terminal. Em um novo terminal, execute o seguinte comando para iniciar sua aplicação Android ou iOS:
Para Android:

### For Android

```bash

# Recomendo que ja inície o emulador pelo android-studio e cheque se o adb achou o emulador rodando:
adb devices # no terminal


# Isso feito agora vamos empacotar, construir e iniciar a aplicação com:
# npm (npx)
npx react-native run-android

# Yarn
yarn android
```

### Commom error that DEVS who mistakenly use WINDOWS to develop software. (looks a joke but isn't)
### Erro comum que "DEVS" que erroneamente cometem o erro DRÁSTICO de utilizar WINDOWS para desenvolver software. (parece piada mas não é)

![image](https://github.com/roberto-fernandino/mobile-gov-app/assets/138389749/3bd83228-8440-4e07-99d0-5750d051421e)

```bash
# Para checar qual proceso ta impedindo o watchman se comunicar com emulador rode:
netstat -aon | findstr 8081
```

Você verá algo como:
 ![image](https://github.com/roberto-fernandino/mobile-gov-app/assets/138389749/82a2be6e-857c-4b21-8b9b-1a43b19cd6cf)

Onde a seta vermelha aponta pro PID (Process Identifier) da porcaria do WINDOWS que erroneamente e estupidamente iniciou na porta=8081
Agora vamos chechar qual é a daemon:
 - Abra o task manager🤮 com "ctrl + shift + esc".
 - Cole o pid na barra de pesquisa
 - Se o processo é uma daemon (serviço do OS para leigos) iremos reiniciar pois é importante. (Caso seja um processo inutil simplesmente mande um sinal KILL e acabe com essa merda).

1st jeito de corrigir:

- press "win + r"
- depois de descobrir qual daemon está causando isso ache ela
- right click e clique em restart, iso fará com que ela use outra porta. Agora rode safe:

```bash
 npx react-native start
```

2nd caminho pra corrigir:

APENAS PARE DE USAR WINDOWS SINCERAMENTE, O QUE EXATAMENTE VOCE TA FAZENDO ??? Compre um macbook ou simplesmente e até melhor instale qualquer Distribuição Linux e aprenda como esse OS magico funciona, eu juro que isso vai te tornar uma pessoa mais inteligente e a porra de um Desenvolvedor de verdade.

Para iOS:

```bash

npm run ios
```
Se tudo estiver configurado _corretamente_, você deverá ver seu novo aplicativo em execução em seu _Android Emulator_ ou _iOS Simulator_ em breve, desde que tenha configurado seu emulador/simulador corretamente.

![imagem](https://github.com/roberto-fernandino/mobile-gov-app/assets/138389749/fc67942d-b7ff-472b-8ac9-0dfe114c735d)

Essa é uma maneira de executar seu aplicativo – você também pode executá-lo diretamente no Android Studio e no Xcode, respectivamente.

## Parabéns! :tada:

Você executou com sucesso meu aplicativo React Native. :festa_face:

Você pode acessar a página de administração em [Aqui](http://127.0.0.1:8000/admin).

Use a conta que você criou com `py manage.py createsuperuser`

# Solução de problemas

Se você não conseguir fazer isso funcionar, consulte a página [Solução de problemas](https://reactnative.dev/docs/troubleshooting).

# Saber mais

Para saber mais sobre React Native, dê uma olhada nos seguintes recursos:

- [Site React Native](https://reactnative.dev) - saiba mais sobre React Native.
- [Primeiros passos](https://reactnative.dev/docs/environment-setup) - uma **visão geral** do React Native e como configurar seu ambiente.
- [Aprenda o básico](https://reactnative.dev/docs/getting-started) - um **tour guiado** pelos **básicos** do React Native.
- [Blog](https://reactnative.dev/blog) - leia as últimas postagens oficiais do **Blog** do React Native.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - o Código Aberto; **repositório** GitHub para React Native.
