export default {
  "openapi": "3.0.0",
  "info": {
    "version": "1.0.0",
    "title": "Kirilovi-08 API",
    "description": "API for different types of E-Commerce WebSites",
    "license": {
      "name": "MIT",
      "url": "https://opensource.org/licenses/MIT"
    }
  },
  "tags": [
    {
      "name": "Platform Auth",
      "description": "Authorisation request connected only with the platform. Hidden from customers documentation"
    },
    // TODO: Remove me from API Doc
    {
      "name": "Auth",
      "description": "Authorisation request connected only with the platform. Hidden from customers documentation"
    },
    {
      "name": "Company Owner",
      "description": "CRUD requests for company owners ONLY"
    },
    {
      "name": "Products",
      "description": "CRUD operations"
    },
    {
      "name": "Employees",
      "description": "CRUD operations"
    },
    {
      "name": "Customers",
      "description": "CRUD operations"
    },
    {
      "name": "Platform Customers",
      "description": "CRUD operations"
    },
    {
      "name": "File",
      "description": "Import / Export data"
    }
  ],
  "servers": [
    {
      "url": "http://localhost:4567",
      "description": "Local API"
    },
    {
      "url": "https://web-api-be.herokuapp.com/store",
      "description": "Internal Production"
    }
  ],
  "components": {
    "securitySchemes": {
      "TokenAuth": {
        "type": "apiKey",
        "in": "header",
        "name": "Authorization"
      },
      "SiteID": {
        "type": "apiKey",
        "in": "header",
        "name": "siteID"
      },
    },
    "schemas": {
      "AccountDTO": {
        "type": "object",
        "required": [
          "email",
          "password",
          "SiteID"
        ],
        "properties": {
          "email": {
            "type": "string",
            "required": true
          },
          "password": {
            "type": "string",
            "format": "password",
            "required": true
          },
          "company": {
            "type": "string",
            "required": true
          },
          "firstname": {
            "type": "string",
          },
          "lastname": {
            "type": "string",
          },
          "address": {
            "type": "object",
            "properties": {
              "country": {
                "type": "string",
              },
              "town": {
                "type": "string",
              },
              "postcode": {
                "type": "string",
              },
              "phone": {
                "type": "string"
              },
              "address": {
                "type": "string"
              },
              "address1": {
                "type": "string"
              },
              "address2": {
                "type": "string"
              },
            }
          }
        },
        "xml": {
          "name": "AccountDTO"
        }
      },
      "NewCompany": {
        "type": "object",
        "required": [
          "email",
          "password",
          "company"
        ],
        "properties": {
          "email": {
            "type": "string",
            "required": true
          },
          "password": {
            "type": "string",
            "format": "password",
            "required": true
          },
          "company": {
            "type": "string",
            "required": true
          },
          "firstname": {
            "type": "string",
          },
          "lastname": {
            "type": "string",
          },
          "address": {
            "type": "object",
            "properties": {
              "country": {
                "type": "string",
              },
              "town": {
                "type": "string",
              },
              "postcode": {
                "type": "string",
              },
              "phone": {
                "type": "string"
              },
              "address": {
                "type": "string"
              },
              "address1": {
                "type": "string"
              },
              "address2": {
                "type": "string"
              },
            }
          }
        },
        "xml": {
          "name": "PlatLoginDTO"
        }
      },
      // TODO: Remove me from API Doc
      "NewUserDTO": {
        "type": "object",
        "required": [
          "email",
          "password",
          "lastname",
          "siteID"
        ],
        "properties": {
          "email": {
            "type": "string",
            "required": true
          },
          "password": {
            "type": "string",
            "format": "password",
            "required": true
          },
          "company": {
            "type": "string",
            "required": true
          },
          "firstname": {
            "type": "string"
          },
          "lastname": {
            "type": "string",
            "required": true
          },
          "address": {
            "type": "object",
            "properties": {
              "country": {
                "type": "string",
              },
              "town": {
                "type": "string",
              },
              "postcode": {
                "type": "string",
              },
              "phone": {
                "type": "string"
              },
              "address": {
                "type": "string"
              },
              "address1": {
                "type": "string"
              },
              "address2": {
                "type": "string"
              },
            }
          }
        },
        "xml": {
          "name": "PlatLoginDTO"
        }
      },
      "LoginDTO": {
        "type": "object",
        "required": [
          "email",
          "password",
          "SiteID"
        ],
        "properties": {
          "email": {
            "type": "string",
            "required": true
          },
          "password": {
            "type": "string",
            "format": "password",
            "required": true
          },
          "siteID": {
            "type": "string",
            "required": true
          },
        },
        "xml": {
          "name": "LoginDTO"
        }
      },
      "PlatLoginDTO": {
        "type": "object",
        "required": [
          "email",
          "password",
          "company"
        ],
        "properties": {
          "email": {
            "type": "string",
            "required": true
          },
          "password": {
            "type": "string",
            "format": "password",
            "required": true
          },
          "company": {
            "type": "string",
            "required": true
          }
        },
        "xml": {
          "name": "PlatLoginDTO"
        }
      },
      "ReceivingCreds": {
        "type": "object",
        "properties": {
          "token": {
            "type": "string"
          },
          "username": {
            "type": "string"
          },
        },
        "xml": {
          "name": "ReceivingCreds"
        }
      },
      "ProductDTO": {
        "type": "object",
        "required": [
          "productName",
          "categoryID"
        ],
        "properties": {
          "productName": {
            "type": "string"
          },
          "productDetails": {
            "type": "object",
            "properties": {
              "price": {
                "type": "number"
              },
              "discount": {
                "type": "number"
              },
              "imgURL": {
                "type": "string"
              },
              "iconURL": {
                "type": "string"
              }
            },
          },
          "lastEditDate": {
            "type": "string",
            "format": "date-time"
          }
        },
        "xml": {
          "name": "ProductDTO"
        }
      },
      "ProductListDTO": {
        "type": "object",
        "required": [
          "siteID",
          "categoryID"
        ],
        "properties": {
          "currentPage": {
            "type": "number",
            "default": 1
          },
          "perPage": {
            "type": "number",
            "default": 15
          },
          "results": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "productName": {
                  "type": "string"
                },
                "productDetails": {
                  "type": "object",
                  "properties": {
                    "price": {
                      "type": "number"
                    },
                    "discount": {
                      "type": "number"
                    },
                    "imgURL": {
                      "type": "string"
                    },
                    "iconURL": {
                      "type": "string"
                    }
                  },
                },
                "productName": {
                  "type": "date"
                }
              },
            }
          },
        },
        "xml": {
          "name": "ProductDTO"
        }
      },
      "EmployeeDTO": {
        "type": "object",
        "required": [
          "firstname",
          "lastname",
          "password"
        ],
        "properties": {
          "_id": {
            "type": "string",
            "uniqueItems": true
          },
          "email": {
            "type": "string"
          },
          "firstname": {
            "type": "string"
          },
          "lastname": {
            "type": "string"
          },
          "company": {
            "type": "string"
          },
          "levelAuth": {
            "type": "string"
          },
          "created": {
            "type": "string"
          },
          "lastLogin": {
            "type": "string"
          },
          "personalDiscount": {
            "type": "number"
          },
          "address": {
            "country": {
              "type": "string"
            },
            "town": {
              "type": "string"
            },
            "postcode": {
              "type": "string"
            },
            "adderess": {
              "type": "string"
            },
            "address1": {
              "type": "string"
            },
            "phone": {
              "type": "string"
            }
          }
        },
        "xml": {
          "name": "EmployeeDTO"
        }
      },
      "EmployeeListDTO": {
        "type": "object",
        "required": [
          "siteID",
          "categoryID"
        ],
        "properties": {
          "currentPage": {
            "type": "number",
            "default": 1
          },
          "perPage": {
            "type": "number",
            "default": 15
          },
          "sort": {
            "type": "string",
            "default": "name_property"
          },
          "results": {
            "type": "object",
            "required": [
              "_id",
              "firstname",
              "lastname",
              "password"
            ],
            "properties": {
              "_id": {
                "type": "string",
                "uniqueItems": true
              },
              "siteID": {
                "type": "string"
              },
              "email": {
                "type": "string"
              },
              "firstname": {
                "type": "string"
              },
              "lastname": {
                "type": "string"
              },
              "company": {
                "type": "string"
              },
              "levelAuth": {
                "type": "string"
              },
              "created": {
                "type": "date"
              },
              "lastLogin": {
                "type": "date"
              },
              "personalDiscount": {
                "type": "number"
              },
              "address": {
                "country": {
                  "type": "string"
                },
                "town": {
                  "type": "string"
                },
                "postcode": {
                  "type": "string"
                },
                "adderess": {
                  "type": "string"
                },
                "address1": {
                  "type": "string"
                },
                "phone": {
                  "type": "string"
                }
              }
            },
            "xml": {
              "name": "EmployeeDTO"
            }
          }
        }
      }
    }
  },
  "security": [
    {
      "TokenAuth": []
    },
    {
      "SiteID": []
    }
  ],
  "paths": {
    // Platform Auth
    "/platform/auth/sign-in/{base}": {
      "post": {
        "tags": [
          "Platform Auth"
        ],
        "summary": "Sign In into the platform",
        "description": `Send base64 encoded {"email":"email", "password": "password", "company": "company"  }`,
        "parameters": [
          {
            "name": "base",
            "in": "path",
            "description": `eyJlbWFpbCI6ImVtYWlsIiwgInBhc3N3b3JkIjogInBhc3N3b3JkIiwgImNvbXBhbnkiOiAiY29tcGFueSIgfQ=="`,
            "type": "string",
            "format": "byte",
            "required": true
          }
        ],
        "responses": {
          "200": {
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ReceivingCreds"
                }
              },
              "application/xml": {
                "schema": {
                  "$ref": "#/components/schemas/ReceivingCreds"
                }
              },
              "text/plain": {
                "schema": {
                  "type": "string"
                }
              }
            }
          },
          "401": {
            "description": "Unauthorized"
          },
          "403": {
            "description": "Forbidden"
          },
          "404": {
            "description": "404 Not Found"
          }
        }
      }
    },
    "/platform/auth/sign-up": {
      "post": {
        "tags": [
          "Platform Auth"
        ],
        "summary": "Platform Sign-Up form",
        "description": "Creates a new account and send a confirmation email to the specified email",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/NewCompany"
              }
            },
            "application/xml": {
              "schema": {
                "$ref": "#/components/schemas/NewCompany"
              }
            },
            "text/plain": {
              "schema": {
                "$ref": "#/components/schemas/NewCompany"
              }
            }
          }
        },
        "responses": {
          "200": {
            "content": {
              "text/plain": {
                "schema": {
                  "type": "string",
                  "description": "Confirmation email was send to the specified email"
                }
              }
            }
          }
        }
      }
    },
    "/platform/auth/refresh": {
      "post": {
        "tags": [
          "Platform Auth"
        ],
        "summary": "Token refresh",
        "description": "Requires active and valid token to generate new one with extended expiration time, for the next 60 minutes",
        "responses": {
          "200": {
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ReceivingCreds"
                }
              },
              "application/xml": {
                "schema": {
                  "$ref": "#/components/schemas/ReceivingCreds"
                }
              },
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/ReceivingCreds"
                }
              }
            }
          },
          "500": {
            "description": "Error"
          },
        }
      }
    },
    "/platform/auth/reset": {
      "post": {
        "tags": [
          "Platform Auth"
        ],
        "summary": "Password Reset",
        "description": "Account passwords can be reset by providing the correct company name and the user email. Confirmation email will be send.",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "email": {
                    "type": "string"
                  },
                  "company": {
                    "type": "string"
                  }
                }
              }
            },
            "application/xml": {
              "schema": {
                "type": "object",
                "properties": {
                  "email": {
                    "type": "string"
                  },
                  "company": {
                    "type": "string"
                  }
                }
              }
            },
            "text/plain": {
              "schema": {
                "type": "object",
                "properties": {
                  "email": {
                    "type": "string"
                  },
                  "company": {
                    "type": "string"
                  }
                }
              }
            }
          }
        }
      }
    },

    // Platform Owners
    "/platform/auth/{id}": {
      "get": {
        "tags": [
          "Company Owner"
        ],
        "summary": "Returns account details",
        "responses": {
          "200": {
            "description": "Account details",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/AccountDTO"
                }
              },
              "application/xml": {
                "schema": {
                  "$ref": "#/components/schemas/AccountDTO"
                }
              },
              "text/plain": {
                "schema": {
                  "type": "string"
                }
              }
            }
          },
          "401": {
            "description": "Unauthorized"
          },
          "403": {
            "description": "Forbidden"
          }
        }
      },
      "post": {
        "tags": [
          "Company Owner"
        ],
        "summary": "Update user details",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/AccountDTO"
              }
            },
            "application/xml": {
              "schema": {
                "$ref": "#/components/schemas/AccountDTO"
              }
            },
            "text/plain": {
              "schema": {
                "type": "string"
              }
            }
          }
        }
      },
      "patch": {
        "tags": [
          "Company Owner"
        ],
        "summary": "Updates partly the user details",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/AccountDTO"
              }
            },
            "application/xml": {
              "schema": {
                "$ref": "#/components/schemas/AccountDTO"
              }
            },
            "text/plain": {
              "schema": {
                "type": "string"
              }
            }
          }
        }
      },
      "delete": {
        "tags": [
          "Company Owner"
        ],
        "summary": "WARNING !!! WARNING !!! Cascade deletion will be triggered",
        "description": "WARNING !!! Cascade deletion will be triggered. All connected data with the owner account will be permanently delete",
        "responses": {
          "200": {
            "description": "Complete account and website data deletion was processed."
          },
          "401": {
            "description": "Unauthorized"
          },
          "403": {
            "description": "Forbidden"
          },
          "500": {
            "description": "System error and error details will be provide."
          }
        }
      }
    },

    // Client WebSites - Auth
    "/auth/sign-in": {
      "post": {
        "tags": [
          "Auth"
        ],
        "summary": "Platform Login Form",
        "description": "Login form which authorised the user by provided email, password and sideId by generating a site token",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/NewUserDTO"
              }
            },
            "application/xml": {
              "schema": {
                "$ref": "#/components/schemas/NewUserDTO"
              }
            },
            "text/plain": {
              "schema": {
                "$ref": "#/components/schemas/NewUserDTO"
              }
            }
          }
        },
        "responses": {
          "200": {
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ReceivingCreds"
                }
              },
              "application/xml": {
                "schema": {
                  "$ref": "#/components/schemas/ReceivingCreds"
                }
              },
              "text/plain": {
                "schema": {
                  "type": "string"
                }
              }
            }
          },
          "401": {
            "description": "Unauthorized"
          },
          "403": {
            "description": "Forbidden"
          },
          "404": {
            "description": "404 Not Found"
          }
        }
      }
    },
    "/auth/sign-up": {
      "post": {
        "tags": [
          "Auth"
        ],
        "summary": "Platform Sign-Up form",
        "description": "Creates a new account and send a confirmation email to the specified email",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/NewUserDTO"
              }
            },
            "application/xml": {
              "schema": {
                "$ref": "#/components/schemas/NewUserDTO"
              }
            },
            "text/plain": {
              "schema": {
                "$ref": "#/components/schemas/NewCompany"
              }
            }
          }
        },
        "responses": {
          "200": {
            "content": {
              "text/plain": {
                "schema": {
                  "type": "string",
                  "description": "Confirmation email was send to the specified email"
                }
              }
            }
          }
        }
      }
    },
    "/auth/refresh": {
      "post": {
        "tags": [
          "Auth"
        ],
        "summary": "Token refresh",
        "description": "Requires active and valid token to generate new one with extended expiration time, for the next 60 minutes",
        "responses": {
          "200": {
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ReceivingCreds"
                }
              },
              "application/xml": {
                "schema": {
                  "$ref": "#/components/schemas/ReceivingCreds"
                }
              },
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/ReceivingCreds"
                }
              }
            }
          },
          "500": {
            "description": "Error"
          },
        }
      }
    },

    // Client WebSites - Customers Auth
    // Employees as well ..... ?
    "/auth/{id}": {
      "get": {
        "tags": [
          "Customers"
        ],
        "summary": "Returns account details",
        "responses": {
          "200": {
            "description": "Account details",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/AccountDTO"
                }
              },
              "application/xml": {
                "schema": {
                  "$ref": "#/components/schemas/AccountDTO"
                }
              },
              "text/plain": {
                "schema": {
                  "type": "string"
                }
              }
            }
          },
          "401": {
            "description": "Unauthorized"
          },
          "403": {
            "description": "Forbidden"
          }
        }
      },
      "post": {
        "tags": [
          "Customers"
        ],
        "summary": "Update user details",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/AccountDTO"
              }
            },
            "application/xml": {
              "schema": {
                "$ref": "#/components/schemas/AccountDTO"
              }
            },
            "text/plain": {
              "schema": {
                "type": "string"
              }
            }
          }
        }
      },
      "patch": {
        "tags": [
          "Customers"
        ],
        "summary": "Updates partly the user details",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/AccountDTO"
              }
            },
            "application/xml": {
              "schema": {
                "$ref": "#/components/schemas/AccountDTO"
              }
            },
            "text/plain": {
              "schema": {
                "type": "string"
              }
            }
          }
        }
      },
      "delete": {
        "tags": [
          "Customers"
        ],
        "summary": "Delete Customer Account",
        "description": "Permanently deleting the customer account",
        "responses": {
          "200": {
            "description": "Account was deleted successfully."
          },
          "401": {
            "description": "Unauthorized"
          },
          "403": {
            "description": "Forbidden"
          },
          "500": {
            "description": "System error and error details will be provide."
          }
        }
      }
    },

    // Products
    "/products": {
      "get": {
        "tags": [
          "Products"
        ],
        "summary": "Listing products - Requires SiteID Authorisation",
        "description": "Data can be filtered by Category or/and containing ProductName substring. Data can be sort by each property with descending or ascending data direction",
        "responses": {
          "200": {
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ProductListDTO"
                }
              },
              "application/xml": {
                "schema": {
                  "$ref": "#/components/schemas/ProductListDTO"
                }
              },
              "text/plain": {
                "schema": {
                  "type": "string"
                }
              }
            }
          },
          "401": {
            "description": "Unauthorized"
          },
          "403": {
            "description": "Forbidden"
          },
          "404": {
            "description": "404 Not Found"
          }
        }
      },
      "post": {
        "tags": [
          "Products"
        ],
        "summary": "Add new product",
        "description": "Employees or higher rank can add a new product. API allows adding an extra details(properties) to the DB. All extra details have to go to 'productDetails' object, the rest of the details will be ignored.",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ProductDTO"
              }
            },
            "application/xml": {
              "schema": {
                "$ref": "#/components/schemas/ProductDTO"
              }
            },
            "text/plain": {
              "schema": {
                "$ref": "#/components/schemas/ProductDTO"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "New product was inserted",
            "content": {
              "application/json": {
                "schema": {
                  "type": "string"
                }
              },
              "application/xml": {
                "schema": {
                  "type": "string"
                }
              },
              "text/plain": {
                "schema": {
                  "type": "string"
                }
              }
            }
          },
          "401": {
            "description": "Unauthorized"
          },
          "403": {
            "description": "Forbidden"
          }
        }
      },
      "delete": {
        "tags": [
          "Products"
        ],
        "summary": "Delete Products",
        "description": "Only Employes or higher rank can delete products. Deletion list can be filtered by categoryID, all. To delete all send empty object, or send the categoryID to delete all products connected to it.",
        "parameters": [
          {
            "name": "categoryID",
            "in": "query",
            "description": "All products will be delete by selected category",
            "required": false,
            "schema": {
              "type": "string",
              "description": "5fc40c273c46850014c40313"
            }
          },
          {
            "name": "ids",
            "in": "query",
            "description": "Multiple product ids can be provide as an array",
            "schema": {
              "type": "array",
              "items": {
                "type": "string",
                "description": "'5fc40c273c46850014c40313'"
              }
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Were deleted successfully",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ProductDTO"
                }
              },
              "application/xml": {
                "schema": {
                  "$ref": "#/components/schemas/ProductDTO"
                }
              },
              "text/plain": {
                "schema": {
                  "type": "string"
                }
              }
            }
          },
          "401": {
            "description": "Unauthorized"
          },
          "403": {
            "description": "Forbidden"
          },
          "404": {
            "description": "Not Found"
          }
        }
      }
    },
    "/products/{id}": {
      "get": {
        "tags": [
          "Products"
        ],
        "summary": "Take product by productID - Requires SiteID Authorisation",
        "description": "Return product object",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "description": "The product ID",
            "type": "string",
            "required": true
          }
        ],
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ProductDTO"
                }
              },
              "application/xml": {
                "schema": {
                  "$ref": "#/components/schemas/ProductDTO"
                }
              },
              "text/plain": {
                "schema": {
                  "type": "string"
                }
              }
            }
          },
          "404": {
            "description": "404 Not Found"
          }
        }
      },
      "put": {
        "tags": [
          "Products"
        ],
        "summary": "Product details update by productID",
        "description": "All extra details have to go to 'productDetails' object, the rest of the data will be ignored.",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "description": "The product ID",
            "type": "string",
            "required": true
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ProductDTO"
              }
            },
            "application/xml": {
              "schema": {
                "$ref": "#/components/schemas/ProductDTO"
              }
            },
            "text/plain": {
              "schema": {
                "$ref": "#/components/schemas/ProductDTO"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ProductDTO"
                }
              },
              "application/xml": {
                "schema": {
                  "$ref": "#/components/schemas/ProductDTO"
                }
              },
              "text/plain": {
                "schema": {
                  "type": "string"
                }
              }
            }
          },
          "404": {
            "description": "404 Not Found"
          }
        }
      },
      "patch": {
        "tags": [
          "Products"
        ],
        "summary": "Partial product data update by productID",
        "description": "",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "description": "The product ID",
            "type": "string",
            "required": true
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ProductDTO"
              }
            },
            "application/xml": {
              "schema": {
                "$ref": "#/components/schemas/ProductDTO"
              }
            },
            "text/plain": {
              "schema": {
                "$ref": "#/components/schemas/ProductDTO"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ProductDTO"
                }
              },
              "application/xml": {
                "schema": {
                  "$ref": "#/components/schemas/ProductDTO"
                }
              },
              "text/plain": {
                "schema": {
                  "type": "string"
                }
              }
            }
          },
          "404": {
            "description": "404 Not Found"
          }
        }
      },
      "delete": {
        "tags": [
          "Products"
        ],
        "summary": "Delete Products by Category or Web Site",
        "description": "By specifing the categoryID, all connected products will be deleted. Or skipping the property data will remove all products connected with the website",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "description": "The product ID",
            "type": "string",
            "required": true
          }
        ],
        "responses": {
          "200": {
            "description": "Were deleted successfully"
          }
        }
      }
    },
    "/files/import": {
      "post": {
        "tags": [
          "File"
        ],
        "summary": "Insert Data from a file",
        "description": "Insert data to the Database from a Excel files '.xlsx' and '.csv'. All files must contain ['name', 'price', 'quantity'] columns. All extra columns will be added as well to the Database!!!",
        "requestBody": {
          "required": true,
          "content": {
            "multipart/form-data": {
              "schema": {
                "type": "object",
                "properties": {
                  "file": {
                    "type": "string",
                    "format": "base64"
                  }
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "X number of records were added to the Product table"
          },
          "401": {
            "description": "Unauthorized"
          },
          "403": {
            "description": "Forbidden"
          },
          "404": {
            "description": "404 Not Found"
          }
        }
      }
    },
    "/files/export": {
      "post": {
        "tags": [
          "File"
        ],
        "summary": "Export DB Data to a json file",
        "description": "Export DB Data to a json file. Data can be filtered by All, Date, Category",
        "responses": {
          "200": {
            "description": "X number of records are stored into a json file and it`s ready for downloading"
          },
          "401": {
            "description": "Unauthorized"
          },
          "403": {
            "description": "Forbidden"
          },
          "404": {
            "description": "404 Not Found"
          }
        }
      }
    },
    "/employees": {
      "get": {
        "tags": [
          "Employees"
        ],
        "summary": "Pagination all employees",
        "description": "Data can be filtered by employeeName and/or email substrings. Data can be sort by each property with descending or ascending data direction",
        "parameters": [
          {
            "name": "currentPage",
            "in": "query",
            "required": true,
            "schema": {
              "type": "integer",
              "default": 1
            }
          },
          {
            "name": "perPage",
            "in": "query",
            "description": "Records per page",
            "required": true,
            "schema": {
              "type": "integer",
              "default": 15
            }
          },
          {
            "name": "sort",
            "in": "query",
            "description": "Accept property_name + direction (asc / desc)",
            "required": true,
            "schema": {
              "type": "string",
              "default": "created asc"
            }
          }
        ],
        "responses": {
          "200": {
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/EmployeeListDTO"
                }
              },
              "application/xml": {
                "schema": {
                  "$ref": "#/components/schemas/EmployeeListDTO"
                }
              },
              "text/plain": {
                "schema": {
                  "type": "string"
                }
              }
            }
          },
          "401": {
            "description": "Unauthorized"
          },
          "403": {
            "description": "Forbidden"
          },
          "404": {
            "description": "404 Not Found"
          }
        }
      },
      "post": {
        "tags": [
          "Employees"
        ],
        "summary": "Add new employee",
        "description": "To add new employee, an user with level manager or higher have to create the new account with a temporary password. After login the new employee have to change the password",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/EmployeeDTO"
              }
            },
            "application/xml": {
              "schema": {
                "$ref": "#/components/schemas/EmployeeDTO"
              }
            },
            "text/plain": {
              "schema": {
                "$ref": "#/components/schemas/EmployeeDTO"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "New employee was added",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/EmployeeDTO"
                }
              },
              "application/xml": {
                "schema": {
                  "$ref": "#/components/schemas/EmployeeDTO"
                }
              },
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/EmployeeDTO"
                }
              }
            }
          },
          "401": {
            "description": "Unauthorized"
          },
          "403": {
            "description": "Forbidden"
          }
        }
      },
      "delete": {
        "tags": [
          "Employees"
        ],
        "summary": "Delete all employees",
        "description": "Äll employes connected to selected website will be removed",
        "responses": {
          "200": {
            "description": "X employees were removed from the database 'successfully'",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/EmployeeDTO"
                }
              },
              "application/xml": {
                "schema": {
                  "$ref": "#/components/schemas/EmployeeDTO"
                }
              },
              "text/plain": {
                "schema": {
                  "type": "string"
                }
              }
            }
          },
          "401": {
            "description": "Unauthorized"
          },
          "403": {
            "description": "Forbidden"
          },
          "404": {
            "description": "Not Found"
          }
        }
      }
    },
    "/employees/{id}": {
      "get": {
        "tags": [
          "Employees"
        ],
        "summary": "Take employee by ID",
        "description": "Returns data for selected employee",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "description": "The employee ID",
            "type": "string",
            "required": true
          }
        ],
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/EmployeeDTO"
                }
              },
              "application/xml": {
                "schema": {
                  "$ref": "#/components/schemas/EmployeeDTO"
                }
              },
              "text/plain": {
                "schema": {
                  "type": "string"
                }
              }
            }
          },
          "404": {
            "description": "404 Not Found"
          }
        }
      },
      "put": {
        "tags": [
          "Employees"
        ],
        "summary": "Update employee details by ID",
        "description": "",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "description": "The employee ID",
            "type": "string",
            "required": true
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/EmployeeDTO"
              }
            },
            "application/xml": {
              "schema": {
                "$ref": "#/components/schemas/EmployeeDTO"
              }
            },
            "text/plain": {
              "schema": {
                "$ref": "#/components/schemas/EmployeeDTO"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/EmployeeDTO"
                }
              },
              "application/xml": {
                "schema": {
                  "$ref": "#/components/schemas/EmployeeDTO"
                }
              },
              "text/plain": {
                "schema": {
                  "type": "string"
                }
              }
            }
          },
          "404": {
            "description": "404 Not Found"
          }
        }
      },
      "patch": {
        "tags": [
          "Employees"
        ],
        "summary": "To update partial employee data",
        "description": "",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "description": "The employee ID",
            "type": "string",
            "required": true
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/EmployeeDTO"
              }
            },
            "application/xml": {
              "schema": {
                "$ref": "#/components/schemas/EmployeeDTO"
              }
            },
            "text/plain": {
              "schema": {
                "$ref": "#/components/schemas/EmployeeDTO"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/EmployeeDTO"
                }
              },
              "application/xml": {
                "schema": {
                  "$ref": "#/components/schemas/EmployeeDTO"
                }
              },
              "text/plain": {
                "schema": {
                  "type": "string"
                }
              }
            }
          },
          "404": {
            "description": "404 Not Found"
          }
        }
      },
      "delete": {
        "tags": [
          "Employees"
        ],
        "summary": "Delete selected employee",
        "description": "By providing the employee id, all records connected to it will be removed from the database",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "description": "The employee ID",
            "type": "string",
            "required": true
          }
        ],
        "responses": {
          "200": {
            "description": "Employee_data was deleted successfully"
          }
        }
      }
    },
    "/customers": {
      "get": {
        "tags": [
          "Platform Customers"
        ],
        "summary": "Pagination all customers",
        "description": "Data can be filtered by customers Name and/or email substrings. Data can be sort by each property with descending or ascending data direction",
        "parameters": [
          {
            "name": "currentPage",
            "in": "query",
            "required": true,
            "schema": {
              "type": "integer",
              "default": 1
            }
          },
          {
            "name": "perPage",
            "in": "query",
            "description": "Records per page",
            "required": true,
            "schema": {
              "type": "integer",
              "default": 15
            }
          },
          {
            "name": "sort",
            "in": "query",
            "description": "Accept property_name + direction (asc / desc)",
            "required": true,
            "schema": {
              "type": "string",
              "default": "created asc"
            }
          }
        ],
        "responses": {
          "200": {
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/EmployeeListDTO"
                }
              },
              "application/xml": {
                "schema": {
                  "$ref": "#/components/schemas/EmployeeListDTO"
                }
              },
              "text/plain": {
                "schema": {
                  "type": "string"
                }
              }
            }
          },
          "401": {
            "description": "Unauthorized"
          },
          "403": {
            "description": "Forbidden"
          },
          "404": {
            "description": "404 Not Found"
          }
        }
      },
      "post": {
        "tags": [
          "Platform Customers"
        ],
        "summary": "Add new customers",
        "description": "To add new customers, an user with level manager or higher have to create the new account with a temporary password. After login the new employee have to change the password",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/EmployeeDTO"
              }
            },
            "application/xml": {
              "schema": {
                "$ref": "#/components/schemas/EmployeeDTO"
              }
            },
            "text/plain": {
              "schema": {
                "$ref": "#/components/schemas/EmployeeDTO"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "New customers was added",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/EmployeeDTO"
                }
              },
              "application/xml": {
                "schema": {
                  "$ref": "#/components/schemas/EmployeeDTO"
                }
              },
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/EmployeeDTO"
                }
              }
            }
          },
          "401": {
            "description": "Unauthorized"
          },
          "403": {
            "description": "Forbidden"
          }
        }
      },
      "delete": {
        "tags": [
          "Platform Customers"
        ],
        "summary": "Delete all customers",
        "description": "Äll employes connected to selected website will be removed",
        "responses": {
          "200": {
            "description": "X customers were removed from the database 'successfully'",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/EmployeeDTO"
                }
              },
              "application/xml": {
                "schema": {
                  "$ref": "#/components/schemas/EmployeeDTO"
                }
              },
              "text/plain": {
                "schema": {
                  "type": "string"
                }
              }
            }
          },
          "401": {
            "description": "Unauthorized"
          },
          "403": {
            "description": "Forbidden"
          },
          "404": {
            "description": "Not Found"
          }
        }
      }
    },
    "/customers/{id}": {
      "get": {
        "tags": [
          "Platform Customers"
        ],
        "summary": "Take customer by ID",
        "description": "Returns data for selected customer",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "description": "The customer ID",
            "type": "string",
            "required": true
          }
        ],
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/EmployeeDTO"
                }
              },
              "application/xml": {
                "schema": {
                  "$ref": "#/components/schemas/EmployeeDTO"
                }
              },
              "text/plain": {
                "schema": {
                  "type": "string"
                }
              }
            }
          },
          "404": {
            "description": "404 Not Found"
          }
        }
      },
      "put": {
        "tags": [
          "Platform Customers"
        ],
        "summary": "Update customer details by ID",
        "description": "",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "description": "The customer ID",
            "type": "string",
            "required": true
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/EmployeeDTO"
              }
            },
            "application/xml": {
              "schema": {
                "$ref": "#/components/schemas/EmployeeDTO"
              }
            },
            "text/plain": {
              "schema": {
                "$ref": "#/components/schemas/EmployeeDTO"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/EmployeeDTO"
                }
              },
              "application/xml": {
                "schema": {
                  "$ref": "#/components/schemas/EmployeeDTO"
                }
              },
              "text/plain": {
                "schema": {
                  "type": "string"
                }
              }
            }
          },
          "404": {
            "description": "404 Not Found"
          }
        }
      },
      "patch": {
        "tags": [
          "Platform Customers"
        ],
        "summary": "To update partial customer data",
        "description": "",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "description": "The customer ID",
            "type": "string",
            "required": true
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/EmployeeDTO"
              }
            },
            "application/xml": {
              "schema": {
                "$ref": "#/components/schemas/EmployeeDTO"
              }
            },
            "text/plain": {
              "schema": {
                "$ref": "#/components/schemas/EmployeeDTO"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/EmployeeDTO"
                }
              },
              "application/xml": {
                "schema": {
                  "$ref": "#/components/schemas/EmployeeDTO"
                }
              },
              "text/plain": {
                "schema": {
                  "type": "string"
                }
              }
            }
          },
          "404": {
            "description": "404 Not Found"
          }
        }
      },
      "delete": {
        "tags": [
          "Platform Customers"
        ],
        "summary": "Delete selected customer",
        "description": "By providing the customer id, all records connected to it will be removed from the database",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "description": "The customer ID",
            "type": "string",
            "required": true
          }
        ],
        "responses": {
          "200": {
            "description": "Employee_data was deleted successfully"
          }
        }
      }
    }
  }
}