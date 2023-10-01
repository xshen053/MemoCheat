

# APIs

## API Endpoint: /api/memory (GET)

* HTTP Method: GET

* Purpose: Retrieve all memory instances from the Django database.

* Request Parameters: None

* Request Body: None, as this is a GET request.

* Response:
  * Status Code: 200 OK
  * Response Body:
```Json
[
    {
        "id": int,
        "title": string,
        "created_date": datetime in ISO 8601 format (e.g., "2023-08-20T14:41:20.879949-07:00"),
        "review_dates": array of dates (can be empty)
    },
...
]
```

## API Endpoint: /api/memory (POST)

* HTTP Method: POST

* Purpose: Create a new memory instance in the Django database with the provided title.

* Request Parameters: None

* Request Body: 
```Json
{
    "title": "string (Sample Memory Title)"
}
```

* Response:
  * Status Code: 201 Created
  * Response Body:

```Json
{
    "id": 85,
    "title": "Sample Memory Title",
    "created_date": "2023-09-30T23:26:57.618407-07:00",
    "review_dates": [
        {
            "date": "2023-10-21"
        },
        {
            "date": "2023-10-07"
        },
        {
            "date": "2023-10-14"
        },
        {
            "date": "2023-10-04"
        },
        ...
    ]
}
```
  * Error Cases:
    * `400 Bad Request`: If the request body is malformed or missing required attributes.
    * `500 Internal Server Error`: For general server errors.

## API Endpoint: /api/mark_as_reviewed/\<int:memory_id\>/ (POST)

* HTTP Method: POST

* Purpose: Marks a specific memory instance, identified by its ID, as reviewed in the Django database.

* URL Parameters: 
  * memory_id: Integer. The ID of the memory instance to be marked as reviewed.

* Request Body: None

* Response:
  * Status Code: 200 OK
  * Response Body:

```Json
{
    "message": "Memory marked as reviewed."
}
```

  * Error Cases:
    * `400 Bad Request`: If the request body is malformed or missing required attributes.
    * `500 Internal Server Error`: For general server errors.
    * `405 Method Not Allowed` : If using GET

Endpoint Example:

```
http://127.0.0.1:8000/api/mark_as_reviewed/69/
```
