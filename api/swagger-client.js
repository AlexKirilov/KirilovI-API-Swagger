export default {
  "openapi": "3.0.0",
  "info": {
    "version": "1.0.0",
    "title": "Client API Requests",
    "description": "API for different types of E-Commerce WebSites",
    "license": {
      "name": "MIT",
      "url": "https://opensource.org/licenses/MIT"
    }
  },
  "tags": [
    {
      "name": "Auth",
      "description": "Authorisation request connected only with the platform. Hidden from customers documentation"
    },
    {
      "name": "Customers",
      "description": "CRUD operations"
    },
    {
      "name": "Products",
      "description": "CRUD operations"
    },
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
      "WebSiteAuth": {
        "type": "apiKey",
        "in": "header",
        "name": "WebSite"
      },
      "SiteIDAuth": {
        "type": "apiKey",
        "in": "header",
        "name": "SiteData"
      }
    },
    "schemas": {
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
      "ProductDTO": {
        "type": "object",
        "required": [
          "name",
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
            "type": "date"
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
      },
      "OrdersDTO": {
        "type": "object",
        "required": [
          "flag",
          "asGift",
          "clientNotes",
          "country",
          "town",
          "postcode",
          "address",
          "address1",
          "address2",
          "phone"
        ],
        "properties": {
          "_id": {
            "type": "string",
            "uniqueItems": true
          },
          "handlerID": {
            "type": "string"
          },
          "createDate": {
            "type": "string",
            "format": "date-time"
          },
          "orderDate": {
            "type": "string",
            "format": "date-time"
          },
          "canceledDate": {
            "type": "string",
            "format": "date-time"
          },
          "approvedDate": {
            "type": "string",
            "format": "date-time"
          },
          "sendForDeliveryDate": {
            "type": "string",
            "format": "date-time"
          },
          "deliveredDate": {
            "type": "string",
            "format": "date-time"
          },
          "order": {
            "type": "array",
            "items": {
              "type": "object"
            }
          },
          "flag": {
            "type": "string"
          },
          "clientNotes": {
            "type": "string"
          },
          "asGift": {
            "type": "boolean"
          },
          "trackingNumber": {
            "type": "string"
          },
          "deliveryCompanyName": {
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
            "address": {
              "type": "string"
            },
            "address1": {
              "type": "string"
            },
            "address2": {
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
    }
  },
  "security": [
    {
      "TokenAuth": []
    },
    {
      "SiteIDAuth": []
    },
    {
      "WebSiteAuth": []
    }
  ],
  "paths": {
    "/products": {
      "get": {
        "tags": [
          "Products"
        ],
        "summary": "Listing products",
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
        "summary": "Take product by productID",
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
    // Client WebSites - Auth
    "/auth/sign-in": {
      "post": {
        "tags": [
          "Auth"
        ],
        "summary": "Platform Login Form",
        "description": "Login form which authorise the user by provided email, password and sideId by generating a site token",
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
    // Clients CRUD Requests
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

    "/orders/{id}": {
      "get": {
        "tags": [
          "Platform Orders"
        ],
        "summary": "Take order by ID",
        "description": "Returns data for selected order",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "description": "The order ID",
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
                  "$ref": "#/components/schemas/OrdersDTO"
                }
              },
              "application/xml": {
                "schema": {
                  "$ref": "#/components/schemas/OrdersDTO"
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
    }

  }
}