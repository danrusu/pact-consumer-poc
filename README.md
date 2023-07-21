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

- setup environment vars

  ```bash
  export PACT_BROKER_BASE_URL=https://domain.pactflow.io
  export PACT_BROKER_TOKEN=******
  export PACT_PUBLISH=true
  export PACT_TAGS="test,v1"
  ```

- validate producer expectations and generate contract

  ```bash
  pnpm test:pact
  ```

- publish contract to PactFlow.io

  ```bash
  pnpm pact:publish
  ```

  ## [Pipeline setup](./.gitlab-cy.yml)
