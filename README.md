# Présentation de GraphQL
Un bref aperçu de la technologie GraphQL (30 juil 14h  - TransWay)

## Checklist
- [ ] Introduction
- [ ] Configurer le serveur
> Queries
- [ ] Récupérer tous les utilisateurs
- [ ] Récupérer un.e seul.e utilisateur/rice
> Mutations
- [ ] Ajouter un utilisateur
- [ ] mettre à jour un.e utilisateur/rice
- [ ] Supprimer a un.e utilisateur/rice
- [ ] Supprimer tout

## Introduction
**GraphQL** (pour **Graph** **Q**uery **L**anguage), une alternative aux [API REST](https://fr.wikipedia.org/wiki/Representational_state_transfer)(**Re**presentational **S**tate**T**ransfer) est une [langage de requêtes](https://fr.wikipedia.org/wiki/Langage_de_requête), créé par Facebook en 2012, avant d'être publié comme projet [open-source](https://fr.wikipedia.org/wiki/Open_source) en 2015.
> ref: https://fr.wikipedia.org/wiki/GraphQL

## Le langage de requête

### Quelques types de données(Data types)

```graphql
# Enums
enum Gender {
  MALE
  FEMALE
  UNSPECIFIED
}

# Object types
type Address {
  id: ID!  # GraphQL ID type
  userId: ID!
  streetName: String!
  postalCode: Int
  city: String!
  country: String!
}

# Object types (complexe)
type User {
  id: ID!
  name: String!
  age: Int!
  gender: Gender! # enums
  email: String!
  weight: Float  # nullable
  address: Address # Object type
}

# interface
interface Organism {
  id: ID!
  name: String!
  kingdom: Kingdom! # enums
  genus: String!
  species: String!
}

type BlueGreenAlgae implements Organism {
 phylum: String!
}

```

## Queries and Mutations(Resolver)

<img width="1081" alt="Screenshot 2021-07-30 at 11 43 42" src="https://user-images.githubusercontent.com/32494423/127635471-b0ba1471-3c1e-4495-97e0-cb6ad05c2be5.png">

<img width="1530" alt="Screenshot 2021-07-30 at 11 46 32" src="https://user-images.githubusercontent.com/32494423/127635459-9f5672f2-e0f5-47a7-9a59-785175bc7fe4.png">


## Prérequis

- node/NPM
- nestjs cli

## Mise en place du projet
J'ai décidé d'utiliser le framework [Nestjs](https://docs.nestjs.com) (qui utilise [Express](https://expressjs.com/) sous le capot) pour m'aider à accélérer la configuration du serveur.

1. Générer les fichiers du serveur avec le CLI Nest:

Depuis votre répertoire de développement préféré, exécutez ces commandes:

```bash
$ nest new graphql-nest-example
$ cd graphql-nest-example
```

2. Lancez le serveur

```bash
$ npm run start:dev
```

> N:B J'ai eu une erreur en démarrant le serveur.\
> https://stackoverflow.com/questions/66809411/webpack-typescript-errors-on-fresh-nestjs-app

3. Ajouter les dépendances de graphql
```bash
$ npm i @nestjs/graphql graphql apollo-server-express@2.x.x
```
4. Définir l'emplacement du fichier graphQL généré
```ts
// app.module.ts
import { GraphQLModule } from '@nestjs/graphql';
...
$ imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
  ],
```
