# Contract testing - Consumer POC

## 1. Setup

```bash
pnpm install
```

## 2. Start Consumer

```bash
pnpm start
```

## 3 Run contract tests using PactFlow.io broker

- validate producer expectations and generate contract

  ```bash
  pnpm test:pact
  ```

- setup environment vars

  - bash

  ```bash
  export PACT_BROKER_BASE_URL=https://domain.pactflow.io
  export PACT_BROKER_TOKEN=*****
  ```

  - powershell

  ```powershell
  [System.Environment]::SetEnvironmentVariable('PACT_BROKER_BASE_URL','https://danrusu.pactflow.io')
  [System.Environment]::SetEnvironmentVariable('PACT_BROKER_TOKEN','*****')
  ```

- publish contract to PactFlow.io

  ```powershell
  docker run --rm `
    -w /opt/pact `
    -v ${PWD}/pact/pacts:/opt/pact `
    -e PACT_BROKER_BASE_URL `
    -e PACT_BROKER_TOKEN `
    pactfoundation/pact-cli:latest publish . `
    --consumer-app-version 1.0.0 `
    --branch master
  ```
