### Backend em Node

CRUD básico em nodejs com express e postgresql
Antes de começar, instale as dependencias com `npm install`, vá em `./postgres/postgres.js` e substitua os valores pelo nome do seu banco, nome de usuário do banco e senha de usuário do banco como os três primeiros paramentros da função:
`const sequelize = new Sequelize('postgres', 'postgres', '7247', {
  host: 'localhost',
  dialect: 'postgres'
})`

Após isso, inicie a API com `npm run dev`

Acesse `localhost:8000/docs` para acessar o Swagger