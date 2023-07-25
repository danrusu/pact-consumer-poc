# Contract testing POC - Consumer

- related repository - [pact-provider-poc](https://github.com/danrusu/pact-provider-poc)

## 1. Setup

```powershell
pnpm install
```

## 2. Start Consumer

```powershell
pnpm start
```

## 3 Run contract tests using PactFlow.io broker

- validate producer expectations and generate contract

  ```powershell
  pnpm test:pact
  ```

## 5. [Pact CLI](https://hub.docker.com/r/pactfoundation/pact-cli)

- setup environment vars

  - bash

  ```bash
  export PACT_BROKER_BASE_URL=https://domain.pactflow.io
  export PACT_BROKER_TOKEN=*****
  ```

  - powershell

  ```powershell
  [System.Environment]::SetEnvironmentVariable('PACT_BROKER_BASE_URL','https://domain.pactflow.io')
  [System.Environment]::SetEnvironmentVariable('PACT_BROKER_TOKEN','*****')
  ```

- Publish contract to PactFlow.io

```powershell
$hash=git rev-parse --short head
$branch=git rev-parse --abbrev-ref head
docker run `
  --rm `
  -w /opt/pact `
  -v ${PWD}/pact/pacts:/opt/pact `
  -e PACT_BROKER_BASE_URL `
  -e PACT_BROKER_TOKEN `
  pactfoundation/pact-cli:latest publish . `
  --consumer-app-version $hash `
  --branch $branch `
  --no-merge
```

- Can I deploy

```powershell
$hash=git rev-parse --short head
docker run --rm `
  -w /opt/pact `
  -v ${PWD}:/opt/pact `
  -e PACT_BROKER_BASE_URL `
  -e PACT_BROKER_TOKEN `
  pactfoundation/pact-cli:latest pact-broker can-i-deploy `
  --pacticipant pact-consumer-poc `
  --version $hash `
  --to-environment test
```

- Record deployment/release

```powershell
$hash=git rev-parse --short head
docker run --rm `
  -w /opt/pact `
  -v ${PWD}:/opt/pact `
  -e PACT_BROKER_BASE_URL `
  -e PACT_BROKER_TOKEN `
  pactfoundation/pact-cli:latest pact-broker record-deployment `
  --pacticipant pact-consumer-poc `
  --version $hash `
  --environment test
```
