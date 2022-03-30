# Tomb stone app info

## Installation
0. Run `nvm use` to use required node version
1. `npm install` in root directory
2. `npm install` in /client directory
3. Make sure .ENV file is populated with\
  &nbsp;
  **For Basic Login**
  - DB_CONNECT (get it from Mongo DD and make sure all variables are correcly set, especially password, which can be acceseed @Database Access);
  - TOKEN_SECRET (Can be grabbed from live project ENV vars)\
  &nbsp;
  **For Image Upload**
  - CLOUDINARY_API_KEY
  - CLOUDINARY_API_SECRET
  - CLOUDINARY_NAME
4. Run `npm run dev` for dev environment

