# Conference Client

User facing application to manage conference rooms and meetings

## Table of contents

1. [Instalation](###installation)

- [Quick Install](####quick-install)

2. [Configuration](###configuration)
3. [Tets](#tests)
4. [Docs](#docs)
5. [License](#license)

### Installation

#### Prerequisites

Make sure you have installed all of the following prerequisites on your development machine:

- Git - [Download & Install Git](https://git-scm.com/downloads). OSX and Linux machines typically have this already installed.
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- Conference server - [Download & Install Conferece server](https://github.com/ksquareincmx/conference-server).

#### Quik Install

1. Clone the conferece-client repository

```bash
git clone https://github.com/ksquareincmx/conference-client.git conference-client
```

2. Go to the proyect directory

```bash
cd conference-client
```

3. Install dependencies

```bash
yarn
```

### Configuration

1.  Create a `.env.local` file and update it

```bash
cp .env.local.example .env.local
code .env.local
```

This is the structure of the `.env.local`

```bash
  REACT_APP_GOOGLE_CLIENT_ID="[Your google client_id]"
  REACT_APP_SERVER_URI= "http://[server domain]/api/v2/"
```

2. Start the app

```bash
  yarn start
```

### Tests

TODO

### Docs

TODO

### License

[MIT](https://github.com/ksquareincmx/conference-client/blob/master/LICENSE)
