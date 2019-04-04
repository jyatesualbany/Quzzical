# Before you start testing
I didn't include the node_modules because there huge and its bad practice to include them.

## Nodejs Install
I recommend installing Node via a package manage but it can be downloaded directly from: https://nodejs.org/en/
If on ubuntu, use the commands (first updates apt):

```bash 
sudo apt-get update
sudo apt-install nodejs
```

If on MacOS, use the Brew command:
```bash
brew install node
```

If on Windows, simply download the installer directly from the website listed above. 

## Setup
Go into the root folder and run npm init. This will create the node_modules folder. Firstly, you will need to install the create-react-app package globally.
Do so with the following command:

```bash
npm install -g create-react-app
```

## Install dependencies in root
In the root folder, look in the package.json file you cloned from the git. Make sure the package name is the same as the name of the root folder name
If there is already a node_modules folder, run the following command:

```bash
rm -rf node_modules
```

After making sure the package.json file is in the root folder, run the following command (which will download all necessary dependencies):
```bash
npm install
```

## Run the create-react-app command to build the project

For the Frontend part of the project I used react so you need to use

```bash
create-react-app <name of folder>
```

## Merging code from the git

After the react-app folder has been created, replace all of the contents of the folder with the contents of the react-app folder from the git

Then "cd" into the react-app folder, and run the following command:

```bash
npm install
```

## Running the program

Return to the root directory, and run the command:

```bash
npm run <name of react-app folder>
```
