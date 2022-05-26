exports.handler = async(event) => {
  console.log(event);
  let risk_score = "LOW";

  const response = {
    "commands": [{
      "type": "com.okta.assertion.patch",
      "value": [{
          "op": "add",
          "path": "/claims/SSN",
          "value": {
            "attributes": {
              "NameFormat": "urn:oasis:names:tc:SAML:2.0:attrname-format:basic"
            },
            "attributeValues": [{
              "attributes": {
                "xsi:type": "xs:string"
              },
              "value": between(100, 999) + "-" + between(100, 999) + "-" + between(1000, 9999)
            }]
          }
        },
        {
          "op": "add",
          "path": "/claims/account_number",
          "value": {
            "attributes": {
              "NameFormat": "urn:oasis:names:tc:SAML:2.0:attrname-format:basic"
            },
            "attributeValues": [{
              "attributes": {
                "xsi:type": "xs:string"
              },
              "value": "F0" + between(1000, 9999) + "-" + between(1000, 9999)
            }]
          }
        },
        {
          "op": "add",
          "path": "/claims/risk_score",
          "value": {
            "attributes": {
              "NameFormat": "urn:oasis:names:tc:SAML:2.0:attrname-format:basic"
            },
            "attributeValues": [{
              "attributes": {
                "xsi:type": "xs:string"
              },
              "value": risk_score
            }]
          }
        }
      ]
    }]
  };
  return response;
};

function between(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
