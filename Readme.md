# Memocheat
a tool harnessing memory science to helped users transform time management, directing focus to proactive learning over repetitive reviews.


## Table of Contents

- [Background](#background)
- [Objective](#objective)
- [High-level Architecture](#high-level-architecture)
  - [Software Architecture](#software-architecture)
  - [Data Flow Diagram (DFD)](#data-flow-diagram-dfd)
  - [Database Schema](#database-schema)
  - [External Services or APIs](#external-services-or-apis)
- [APIs](#apis)
- [UI/UX Design](#uiux-design)
- [Development Plan](#development-plan)
  - [User Stories](#user-stories)
  - [Use Cases](#use-cases)
- [Testing](#testing)
- [Installation/Usage](#installationusage)
- [Deployment](#deployment)



## Background

We are learning every day. But what we are doing is learn, forget, learn, forget. We have wasted lots of time memorizing the same things repeatedly.

I tried other task (memory) planners before, but the problem is they are either not flexible or hard to get started with:

* Some need you to install an app and register an account.
* some can automatically generate a list, but you cannot insert new task in that list!

So I decided to develop one that is light and more flexible

## Objective

Build a light tool harnessing memory science to helped users transform time management, directing focus to proactive learning over repetitive reviews.

## High-level Architecture

### Software architecture
![SA](https://github.com/xshen053/MemoCheat/blob/main/img/software-architecture.png?raw=true)

### Data Flow diagram (DFD)
![DFD](https://github.com/xshen053/MemoCheat/blob/main/img/data-flow-diagram.png?raw=true)


### Database schema
![db-schema](https://github.com/xshen053/MemoCheat/blob/main/img/memocheat-db-schema.png?raw=true)

### External services or APIs
Don't have any now


## APIs

### API Endpoint: /api/memory (GET)

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

### API Endpoint: /api/memory (POST)

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

### API Endpoint: /api/mark_as_reviewed/\<int:memory_id\>/ (POST)

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

## UI/UX Design

## Development Plan

### User stories

- [ ] As a user, I want to create new memories.
- [ ] As a user, I want to know what memories I want to review today and tomorrow
- [ ] As a user, I want to remove a card (mark as reviewed) when I finish reviewing that card
- [ ] As a user, if I accidentally review a card, I can withdraw
- [ ] As a user, I want to have a calendar to know what I need to review everyday

### Use cases

- [ ] Add a new memory
- [ ] Delete a memory
- [ ] Modify a memory
- [ ] Search a memory
- [ ] Cannot mark a yesterday memory as finished
- [ ] Display memory to be reviewed for today and tomorrow using card
- [ ] Show memory of everyday using a calendar
- [ ] Provide a mark-as-review button to update memory reviewed today
- [ ] Automatically calculate reviewed date of a memory when it was added and store these info in the postgreSQL
- [ ] Add duplicate memory, alert user
- [ ] When a memory is reviewed, click that button, and that card disappeared
- [ ] Withdraw the last step (when a memory is accidentally marked as reviewed, withdraw)
- [ ] Show a notification bar when a memory is added
- [ ] Show a notification bar when a memory is marked as reviewed
- [ ] Memory title max length 200




#### Stretch goal
- [ ] Store users’ usernames and passwords
- [ ] Store users’ personal memory 
- [ ] Handle multiple user at the same time
- [ ] Results are stored in postgreSQL


## Testing
- [ ] TODO

## Installation/Usage
- [ ] TODO

## Deployment
- [ ] Deploy to aws (optional)
