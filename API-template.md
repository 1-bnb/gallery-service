## Server API

### Get property info
  * GET `/api/properties/id`

**Path Parameters:**
  * `id` property id

**Success Status Code:** `200`

**Returns:** JSON

```json
    {
        "_id": "Number",
        "description": "String",
        "starRating": "Number",
        "reviewTotal": "Number",
        "superhost": "Boolean",
        "location": "String",
        "images": [
          {
            "id": "Number",
            "imageURL": "String",
            "description": "String"
          },
          {
            "id": "Number",
            "imageURL": "String",
            "description": "String"
          },
          {
            "id": "Number",
            "imageURL": "String",
            "description": "String"
          },
          {
            "id": "Number",
            "imageURL": "String",
            "description": "String"
          },
          {
            "id": "Number",
            "imageURL": "String",
            "description": "String"
          },
          {
            "id": "Number",
            "imageURL": "String",              "description": "String"
          },
          {
            "id": "Number",
            "imageURL": "String",
            "description": "String"
          },
          {
            "id": "Number",
            "imageURL": "String",
            "description": "String"
          },
          {
            "id": "Number",
            "imageURL": "String",
            "description": "String"
          },
          {
            "id": "Number",
            "imageURL": "String",
            "description": "String"
          }
          ],
    }
```

### Add property
  * POST `/api/properties/id`

**Success Status Code:** `201`

**Request Body**: Expects JSON with the following keys.

```json
    {
        "_id": "Number",
        "description": "String",
        "starRating": "Number",
        "reviewTotal": "Number",
        "superhost": "Boolean",
        "location": "String",
        "images": [
          {
            "id": "Number",
            "imageURL": "String",
            "description": "String"
          },
          {
            "id": "Number",
            "imageURL": "String",
            "description": "String"
          },
          {
            "id": "Number",
            "imageURL": "String",
            "description": "String"
          },
          {
            "id": "Number",
            "imageURL": "String",
            "description": "String"
          },
          {
            "id": "Number",
            "imageURL": "String",
            "description": "String"
          },
          {
            "id": "Number",
            "imageURL": "String",              "description": "String"
          },
          {
            "id": "Number",
            "imageURL": "String",
            "description": "String"
          },
          {
            "id": "Number",
            "imageURL": "String",
            "description": "String"
          },
          {
            "id": "Number",
            "imageURL": "String",
            "description": "String"
          },
          {
            "id": "Number",
            "imageURL": "String",
            "description": "String"
          }
          ],
    }
```


### Update property info
  * PATCH `/api/restaurant/:id`

**Path Parameters:**
  * `id` restaurant id

**Success Status Code:** `204`

**Request Body**: Expects JSON with any of the following keys (include only keys to be updated)

```json
    {
        "description": "String",
        "starRating": "Number",
        "reviewTotal": "Number",
        "superhost": "Boolean",
        "images": [
                    {
                      "id": "Number",
                      "imageURL": "String",
                      "description": "String"
                    }
                  ]
    }
```

### Delete property
  * DELETE `/api/properties/id`

**Path Parameters:**
  * `id` restaurant id

**Success Status Code:** `204`