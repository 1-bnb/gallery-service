## Server API

### Get property info
  * GET `/api/properties/:id`

**Path Parameters:**
  * `id` property id

**Success Status Code:** `200`

**Returns:** JSON

```json
    {
        // "_id": "Number",
        "description": "String",
        "starRating": "Number",
        "reviewTotal": "Number",
        "superhost": "Boolean",
        "location": "String",
        "images": [
          {
            // "property_id": "Number",
            "imageURL": "String",
            "description": "String"
          },
          {
            // "property_id": "Number",
            "imageURL": "String",
            "description": "String"
          },
          {
            "..."
          }
                  ],
    }
```

### Add property
  * POST `/api/properties/`

**Success Status Code:** `201`

**Request Body**: Expects JSON with the following keys.

```json
    {
        // "_id": "Number",
        "description": "String",
        "starRating": "Number",
        "reviewTotal": "Number",
        "superhost": "Boolean",
        "location": "String",
        "images": [
          {
            // "property_id": "Number",
            "imageURL": "String",
            "description": "String"
          },
          {
            // "property_id": "Number",
            "imageURL": "String",
            "description": "String"
          },
          {
            // "property_id": "Number",
            "imageURL": "String",
            "description": "String"
          },
          {
            // "property_id": "Number",
            "imageURL": "String",
            "description": "String"
          },
          {
            // "property_id": "Number",
            "imageURL": "String",
            "description": "String"
          },
          {
            // "property_id": "Number",
            "imageURL": "String",              "description": "String"
          },
          {
            // "property_id": "Number",
            "imageURL": "String",
            "description": "String"
          },
          {
            // "property_id": "Number",
            "imageURL": "String",
            "description": "String"
          },
          {
            // "property_id": "Number",
            "imageURL": "String",
            "description": "String"
          },
          {
            // "property_id": "Number",
            "imageURL": "String",
            "description": "String"
          }
          ],
    }
```


### Update property info
  * PATCH `/api/properties/:id`

**Path Parameters:**
  * `id` property id

**Success Status Code:** `204`

**Request Body**: Expects JSON with any of the following keys (include only keys to be updated)

```json
    {
        "description": "String",
        "images": [
                    {
                      "imageURL": "String",
                      "description": "String"
                    }
                  ]
    }
```

### Delete property
  * DELETE `/api/properties/:id`

**Path Parameters:**
  * `id` property id

**Success Status Code:** `204`