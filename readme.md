# GraphQL with Prisma Simple Example

This repositary is for learning purpose, feel free to use it as boilerplate or create an issue if there is anything to improve! Thanks.

Stack: 
  - GraphQL
  - ApolloServer
  - Prisma


## How to install
- `git clone https://github.com/saqirmdevx/GraphQL-App.git`

Install dependencies: 
- `cd GraphQL-App`
- `yarn install`

Create `.env` file in base folder (You can do also `prisma init`). 
Setup MYSQL or Postgre Database - Check tutorial on google.

Edit `.env`
- `DATABASE_URL=mysql://root:admin@localhost:3306/dbname` -- For Mysql
- `DATABASE_URL=postgresql://test:test@localhost:5432/dbname` -- For Postgre 

Apply prisma application: 
- `prisma db push`

Generate graphQL Scheme for typescript
- `yarn generate`

Run application: 
- `yarn start`