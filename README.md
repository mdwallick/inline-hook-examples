# inline-hook-examples

A collection of AWS Lambda functions demonstrating various Okta inline hooks.

* OIDC token hook adding custom claims

* OIDC token hook that does an allowed network check (for client credentials)

* SAML assertion hook

* Password import hook

* **TODO** registration hook

## Prerequisites

* An OIE-enabled Okta tenant

* An AWS Account

* Command line interfaces for running/deploying
  * Node/NPM
  * AWS CLI

## Set Up

1. Clone this repo and install the necessary Node packages

    ```bash
    git clone https://github.com/mdwallick/inline-hook-examples.git && cd inline-hook-examples
    npm install
    ```

2. There are more steps, but I need to document them.
