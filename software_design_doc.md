

# APIs

## API Endpoint: /api/memory

* HTTP Method: GET

* Purpose: Retrieve all memory instances from the Django database.

* Request Parameters: None for this endpoint.

* Request Body: None, as this is a GET request.

* Response:
  * Status Code: 200 OK
  * Response Body:
  * ```[
    {
        "id": int,
        "title": string,
        "created_date": datetime in ISO 8601 format (e.g., "2023-08-20T14:41:20.879949-07:00"),
        "review_dates": array of dates (can be empty)
    },
    ...
    ]
