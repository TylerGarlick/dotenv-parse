# dotenv-parse

> Validates the existence of the `.env` file, and parses the file to a `Map<string, unknown>`. 

## Installation

Use your favorite package management tool.

```bash

# NPM
npm i @tylergarlick/dotenv-parse

# Yarn
yarn add @tylergarlick/dotenv-parse

```

### Usage

```ts
import parse from 'dotenv-parse'

const run = async () => {
  
  const path = 'path_to_your_root_projects'
  const results = await parse(path)
  console.log(results) // Map<string,unknown>
  
  result.has(`KEY_OF_SOME_SORT`)
  result.get(`KEY_OF_SOME_SORT`)
  
}

```
