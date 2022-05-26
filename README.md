# inline-hook-examples

A collection of AWS Lambda functions demonstrating various Okta inline hooks.

## Prerequisites

* An OIE-enabled Okta tenant

* An AWS Account

* Command line interfaces for running/deploying
  * Node/NPM
  * AWS CLI
  * Terraform

## Set Up

1. Clone this repo and install the necessary Node packages

    ```bash
    git clone https://github.com/mdwallick/inline-hook-examples.git && cd inline-hook-examples
    npm install
    ```

2. Set up terraform

    ```bash
    cd terraform
    cp terraform.tfvars.sample terraform.tfvars
    ```

    Edit terraform.tfvars and fill in your Okta tenant details

    ```bash
    org_name  = "<okta_subdomain, e.g. atko>"
    base_url  = "<the okta domain  e.g. oktapreview.com, okta.com, or okta-emea.com>"
    api_token = "<okta_api_token>"
    ```

    Run terraform to create all the necessary Okta objects

    ```bash
    make all
    ```

3. There are more steps, but I need to document them.
