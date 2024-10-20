# KISAN CONNECT API

### Description
KISAN CONNECT is a RESTful API built to streamline the agricultural supply chain, connecting farmers, buyers, and delivery agents. The API facilitates efficient communication and transaction management between these entities, providing features such as user authentication, produce listing, order placement, and delivery tracking.

### Features
- **User Authentication**: Secure login for farmers, buyers, and delivery agents.
- **Produce Management**: Farmers can list their products with detailed information.
- **Order Management**: Buyers can place and manage orders for agricultural products.
- **Delivery Tracking**: Delivery agents can update the delivery status and track orders.
- **Role-based Access**: Different user roles with specific permissions.

### Tech Stack
- **Backend**: Node.js, Express , TypeScript
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)

### Create User

#### Endpoint:
`POST /user/createUser`

#### Description:
This endpoint is used to create a new user with their personal details and address.

#### Request:
- **URL**: `http://localhost:3000/user/createUser`
- **Method**: `POST`
- **Content-Type**: `application/json`

#### Request Body (raw JSON):
```json
{
    "name": "Ramesh",
    "email": "ramesh@gmail.com",
    "password": "12345678",
    "phoneNumber": "9030808053",
    "address": {
        "doorNo": "29-818/1",
        "area": "MaruthiNagar,Dharmavaram",
        "landmark": "Near Ram Temple",
        "district": "Anantapur",
        "state": "Andhra Pradesh",
        "pincode": "515671"
    }
}
```

## Response Success
```json
{
    "name": "Ramesh",
    "email": "ramesh1@gmail.com",
    "password": "$2a$10$kGuQtQ56wTXBYhUnUJYZC.mUkZJRxmGXt2VYKVCasXiJho6thH1N2",
    "phoneNumber": "9030808053",
    "address": {
        "doorNo": "29-818/1",
        "area": "MaruthiNagar,Dharmavaram",
        "landmark": "Near Ram Temple",
        "district": "Anantapur",
        "state": "Andhra Pradesh",
        "pincode": "515671"
    },
    "roles": {
        "isAdmin": false,
        "isDeliveryBoy": false,
        "isFarmer": false,
        "isCustomer": true
    },
    "_id": "6707c6348fd0fbaaf077470f",
    "__v": 0
}
```
## if email exists Response
```json
{
    "error": "Email already exists"
}
```


### User Login

#### Endpoint:
`GET /user/login`

#### Description:
This endpoint is used to log in a user by validating their email and password. Upon successful login, a JSON Web Token (JWT) is returned for authenticated access to protected routes.

#### Request:
- **URL**: `http://localhost:3000/user/login`
- **Method**: `GET`
- **Content-Type**: `application/json`

#### Request Body (raw JSON):
```json
{
    "email": "ramesh@gmail.com",
    "password": "12345678"
}
```

## On success
```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZGVkYWMxYjFhMGNjNzJkYTlmMTc0NiIsImVtYWlsIjoicmFtZXNoQGdtYWlsLmNvbSIsIm5hbWUiOiJSYW1lc2giLCJpc0FkbWluIjpmYWxzZSwiaXNGYXJtZXIiOmZhbHNlLCJpc0RlbGl2ZXJ5Qm95IjpmYWxzZSwiaWF0IjoxNzI4NTYyOTE0fQ.yi1EIyVR0xYIW9zgEYkFtLDFRX8YzCm8OonDn4ho1to"
}
```

## On Failure
```json
{
    "error": "Invalid email or password"
}
```
### Add Carousel Item

#### Endpoint:
`POST /admin/carousel/addcarousel`

#### Description:
This endpoint allows admins to upload a new image and title to the carousel. The image is uploaded as a file, and the response returns the image as a base64-encoded string.

#### Request:
- **URL**: `http://localhost:3000/admin/carousel/addcarousel`
- **Method**: `POST`
- **Content-Type**: `multipart/form-data`

#### Request Body (Form Data):
- `image`: The image file for the carousel (uploaded as a file).
- `title`: The title for the carousel item (String).

#### Example Request (Form Data):
- `image`: Upload an image file.
- `title`: `"New Carousel Item"`

#### Responses:

- **Success (201)**:
```json
{
    "message": "Carousel item created",
    "carouselItem": {
        "image": "base64 string",
        "title": "New Carousel Item",
        "_id": "6707c7bf2285eb06b15850fa",
        "createdAt": "2024-10-10T12:25:35.767Z",
        "updatedAt": "2024-10-10T12:25:35.767Z",
        "__v": 0
    }
}
```


### Get All Carousel Items

#### Endpoint:
`GET /customer/getAllCarousels`

#### Description:
This endpoint retrieves all carousel items for customers, returning a list of items that include an image (base64 string) and title.

#### Request:
- **URL**: `http://localhost:3000/customer/getAllCarousels`
- **Method**: `GET`
- **Content-Type**: `application/json`

#### Response:

- **Success (200)**:
```json
[
  {
    "image": "base64 string",
    "title": "New Carousel Item",
    "_id": "6707c7bf2285eb06b15850fa",
    "createdAt": "2024-10-10T12:25:35.767Z",
    "updatedAt": "2024-10-10T12:25:35.767Z",
    "__v": 0
  }
  // ... other carousel items
]
```


### Delete Carousel Item

#### Endpoint:
`DELETE /admin/carousel/deletecarousel`

#### Description:
This endpoint allows admins to delete a specific carousel item by providing its unique ID.

#### Request:
- **URL**: `http://localhost:3000/admin/carousel/deletecarousel`
- **Method**: `DELETE`
- **Content-Type**: `application/json`

#### Request Body (raw JSON):
```json
{
    "id": "66eab7a0632c6bbd3f425c25"
}
```

## Response success
```json
{
    "message": "Carousel item deleted successfully."
}
```


### Edit Carousel Item

#### Endpoint:
`PUT /admin/carousel/editcarousel`

#### Description:
This endpoint allows admins to edit an existing carousel item by providing a new image, title, and the unique ID of the carousel item.

#### Request:
- **URL**: `http://localhost:3000/admin/carousel/editcarousel`
- **Method**: `PUT`
- **Content-Type**: `multipart/form-data`

#### Headers:
- `Authorization`: Bearer `<authToken>` (Admin token required for authentication)

#### Request Body (Form Data):
- `image`: The updated image file for the carousel (optional if not being changed).
- `id`: The unique ID of the carousel item to be edited.
- `title`: The updated title for the carousel item.

#### Example Request Body (Form Data):
- `image`: Upload a new image file (optional if the image doesn't need to be updated).
- `id`: `"6707c7bf2285eb06b15850fa"`
- `title`: `"Updated Carousel Title"`

#### Responses:

- **Success (200)**: 
```json
{
    "message": "Carousel item updated",
    "updatedCarouselItem": {
        "image": "base64 string",
        "title": "Updated Carousel Title",
        "_id": "6707c7bf2285eb06b15850fa",
        "createdAt": "2024-10-10T12:25:35.767Z",
        "updatedAt": "2024-10-11T12:45:35.767Z",
        "__v": 0
    }
}
```

## Failure
```json
{
    "message": "Carousel item not found.",
    "id": "66deee00e97f6ba4e4c82265",
    "updatedCarouselItem": null
}
```

### Add Product

#### Endpoint:
`POST /farmer/product/addProduct`

#### Description:
This endpoint allows farmers to add a new product with all relevant details, including an image, to the product catalog.

#### Request:
- **URL**: `http://localhost:3000/farmer/product/addProduct`
- **Method**: `POST`
- **Content-Type**: `multipart/form-data`

#### Headers:
- `Authorization`: Bearer `<authToken>` (Farmer token required for authentication)

#### Request Body (Form Data):
- `image`: The image file of the product (must be uploaded).
- `productName`: The name of the product (e.g., `"Carrot"`).
- `category`: The category of the product (e.g., `"Vegetables"`).
- `description`: A brief description of the product.
- `price`: The price of the product (e.g., `150`).
- `unit`: The unit of measurement (e.g., `"kg"`).
- `stock`: The available stock quantity (e.g., `50`).
- `harvestDate`: The date when the product was harvested (ISO format).
- `expiryDate`: The date when the product will expire (ISO format).
- `farmingMethod`: The method used for farming (e.g., `"Organic"`).
- `deliveryTime`: Estimated delivery time for the product (e.g., `"2-3 days"`).

#### Example Request Body (Form Data):
- `image`: Upload an image file of the product.
- `productName`: `"Carrot"`
- `category`: `"Vegetables"`
- `description`: `"Freshly harvested organic apples from the hills, rich in nutrients and taste."`
- `price`: `150`
- `unit`: `"kg"`
- `stock`: `50`
- `harvestDate`: `"2024-09-01T00:00:00.000Z"`
- `expiryDate`: `"2024-09-15T00:00:00.000Z"`
- `farmingMethod`: `"Organic"`
- `deliveryTime`: `"2-3 days"`

#### Responses:

- **Success (201)**:
```json
{
    "message": "Product item created successfully",
    "productItem": {
        "productName": "Carrot",
        "category": "Vegetables",
        "description": "Freshly harvested organic apples from the hills, rich in nutrients and taste.",
        "price": 150,
        "unit": "kg",
        "stock": 50,
        "image": "base64 string",
        "harvestDate": "2024-09-01T00:00:00.000Z",
        "expiryDate": "2024-09-15T00:00:00.000Z",
        "farmingMethod": "Organic",
        "deliveryTime": "2-3 days",
        "userId": "66ded82861def8aa5acfd8d6",
        "_id": "6707cafb2285eb06b1585104",
        "__v": 0
    }
}
```


### Delete Product

#### Endpoint:
`DELETE /farmer/product/deleteproduct`

#### Description:
This endpoint allows farmers to delete a specific product from the product catalog using its unique ID.

#### Request:
- **URL**: `http://localhost:3000/farmer/product/deleteproduct`
- **Method**: `DELETE`
- **Content-Type**: `application/json`

#### Headers:
- `Authorization`: Bearer `<authToken>` (Farmer token required for authentication)

#### Request Body:
- **JSON**:
```json
{
    "id": "66eaf7a07cc2e223a09b82c4"
}
```
## IF SUCCESS
```json
{
    "message": "Product deleted successfully."
}
```

## IF FAILURE
```json
{
    "message": "Product not found."
}
```


### Get All Products

#### Endpoint:
`GET /customer/getAllProducts`

#### Description:
This endpoint retrieves a list of all available products in the product catalog.

#### Request:
- **URL**: `http://localhost:3000/customer/getAllProducts`
- **Method**: `GET`
- **Content-Type**: `application/json`

#### Responses:

- **Success (200)**:
```json
[
    {
        "productName": "Carrot",
        "category": "Vegetables",
        "description": "Freshly harvested organic apples from the hills, rich in nutrients and taste.",
        "price": 150,
        "unit": "kg",
        "stock": 50,
        "image": "base64 string",
        "harvestDate": "2024-09-01T00:00:00.000Z",
        "expiryDate": "2024-09-15T00:00:00.000Z",
        "farmingMethod": "Organic",
        "deliveryTime": "2-3 days",
        "userId": "66ded82861def8aa5acfd8d6",
        "_id": "6707cafb2285eb06b1585104",
        "__v": 0
    },
    ...
]
```

### Edit Product

#### Endpoint:
`PUT /farmer/product/editproduct`

#### Description:
This endpoint allows farmers to edit the details of an existing product in the product catalog.

#### Request:
- **URL**: `http://localhost:3000/farmer/product/editproduct`
- **Method**: `PUT`
- **Content-Type**: `application/json`

#### Headers:
- `Authorization`: Bearer `<authToken>` (Farmer token required for authentication)

#### Request Body:
- **JSON**:
```json
{
    "image": "base64 string",
    "productName": "Carrot",
    "category": "Vegetables",
    "description": "Freshly harvested organic apples from the hills, rich in nutrients and taste.",
    "price": 150,
    "unit": "kg",
    "stock": 50,
    "harvestDate": "2024-09-01T00:00:00.000Z",
    "expiryDate": "2024-09-15T00:00:00.000Z",
    "farmingMethod": "Organic",
    "deliveryTime": "2-3 days",
    "id": "66eaf7bb7cc2e223a09b82c6" // Product ID to be updated
}
```

## If success
``` json
{
    "message": "Product updated successfully",
    "updatedProduct": {
        "_id": "66eaf7bb7cc2e223a09b82c6",
        "productName": "Carrot",
        "category": "Fruits",
        "description": "Freshly harvested organic apples from the hills, rich in nutrients and taste.",
        "price": 200,
        "unit": "kg",
        "stock": 60,
        "image": "base64 string",
        "harvestDate": "2024-09-01T00:00:00.000Z",
        "expiryDate": "2024-09-15T00:00:00.000Z",
        "farmingMethod": "Organic",
        "deliveryTime": "2-3 days",
        "__v": 0
    }
}

```

## Failure

```json
Server Error
```


### Get All Fruits

#### Endpoint:
`GET /customer/getAllFruits`

#### Description:
This endpoint retrieves a list of all available products in the "Fruits" category.

#### Request:
- **URL**: `http://localhost:3000/customer/getAllFruits`
- **Method**: `GET`
- **Headers**: No header required

#### Response:

- **Success (200)**:
```json
[
    {
        "_id": "66eaf7bb7cc2e223a09b82c6",
        "productName": "Apple",
        "category": "Fruits",
        "description": "Fresh and juicy apples.",
        "price": 100,
        "unit": "kg",
        "stock": 50,
        "image": "base64 string",
        "harvestDate": "2024-09-01T00:00:00.000Z",
        "expiryDate": "2024-09-15T00:00:00.000Z",
        "farmingMethod": "Organic",
        "deliveryTime": "2-3 days",
        "__v": 0
    },
    {
        "_id": "66eaf7bb7cc2e223a09b82c9",
        "productName": "Banana",
        "category": "Fruits",
        "description": "Ripe bananas full of flavor.",
        "price": 50,
        "unit": "kg",
        "stock": 100,
        "image": "base64 string",
        "harvestDate": "2024-09-02T00:00:00.000Z",
        "expiryDate": "2024-09-10T00:00:00.000Z",
        "farmingMethod": "Organic",
        "deliveryTime": "2-3 days",
        "__v": 0
    }
]
```

### Get All Vegetables

#### Endpoint:
`GET /customer/getAllVegetables`

#### Description:
This endpoint retrieves a list of all available products in the "Vegetables" category.

#### Request:
- **URL**: `http://localhost:3000/customer/getAllVegetables`
- **Method**: `GET`
- **Headers**: No header required

#### Response:

- **Success (200)**:
```json
[
    {
        "_id": "66eaf7bb7cc2e223a09b82c7",
        "productName": "Carrot",
        "category": "Vegetables",
        "description": "Fresh and crunchy carrots.",
        "price": 60,
        "unit": "kg",
        "stock": 75,
        "image": "base64 string",
        "harvestDate": "2024-09-01T00:00:00.000Z",
        "expiryDate": "2024-09-15T00:00:00.000Z",
        "farmingMethod": "Organic",
        "deliveryTime": "2-3 days",
        "__v": 0
    },
    {
        "_id": "66eaf7bb7cc2e223a09b82c8",
        "productName": "Spinach",
        "category": "Vegetables",
        "description": "Organic spinach rich in iron.",
        "price": 40,
        "unit": "kg",
        "stock": 50,
        "image": "base64 string",
        "harvestDate": "2024-09-02T00:00:00.000Z",
        "expiryDate": "2024-09-10T00:00:00.000Z",
        "farmingMethod": "Organic",
        "deliveryTime": "2-3 days",
        "__v": 0
    }
]
```

### Get All Grains

#### Endpoint:
`GET /customer/getAllGrains`

#### Description:
This endpoint retrieves a list of all available products in the "Grains" category.

#### Request:
- **URL**: `http://localhost:3000/customer/getAllGrains`
- **Method**: `GET`
- **Headers**: No header required

#### Response:

- **Success (200)**:
```json
[
    {
        "_id": "66eaf7bb7cc2e223a09b82c9",
        "productName": "Rice",
        "category": "Grains",
        "description": "High-quality organic rice.",
        "price": 80,
        "unit": "kg",
        "stock": 100,
        "image": "base64 string",
        "harvestDate": "2024-08-15T00:00:00.000Z",
        "expiryDate": "2025-08-15T00:00:00.000Z",
        "farmingMethod": "Organic",
        "deliveryTime": "2-3 days",
        "__v": 0
    },
    {
        "_id": "66eaf7bb7cc2e223a09b82ca",
        "productName": "Wheat",
        "category": "Grains",
        "description": "Freshly harvested wheat grains.",
        "price": 60,
        "unit": "kg",
        "stock": 80,
        "image": "base64 string",
        "harvestDate": "2024-07-10T00:00:00.000Z",
        "expiryDate": "2025-07-10T00:00:00.000Z",
        "farmingMethod": "Organic",
        "deliveryTime": "2-3 days",
        "__v": 0
    }
]
```

### Get All Dairy

#### Endpoint:
`GET /customer/getAllDairy`

#### Description:
This endpoint retrieves a list of all available products in the "Dairy" category.

#### Request:
- **URL**: `http://localhost:3000/customer/getAllDairy`
- **Method**: `GET`
- **Headers**: No header required

#### Response:

- **Success (200)**:
```json
[
    {
        "_id": "66eaf7bb7cc2e223a09b82cb",
        "productName": "Milk",
        "category": "Dairy",
        "description": "Fresh organic milk.",
        "price": 50,
        "unit": "litre",
        "stock": 200,
        "image": "base64 string",
        "harvestDate": "2024-10-01T00:00:00.000Z",
        "expiryDate": "2024-10-07T00:00:00.000Z",
        "farmingMethod": "Organic",
        "deliveryTime": "1-2 days",
        "__v": 0
    },
    {
        "_id": "66eaf7bb7cc2e223a09b82cc",
        "productName": "Cheese",
        "category": "Dairy",
        "description": "Freshly made cheese.",
        "price": 200,
        "unit": "kg",
        "stock": 50,
        "image": "base64 string",
        "harvestDate": "2024-09-25T00:00:00.000Z",
        "expiryDate": "2024-10-25T00:00:00.000Z",
        "farmingMethod": "Organic",
        "deliveryTime": "2-3 days",
        "__v": 0
    }
]
```

### Get All Other Products

#### Endpoint:
`GET /customer/getAllOthers`

#### Description:
This endpoint retrieves a list of all available products that do not fall into the predefined categories of fruits, vegetables, grains, or dairy.

#### Request:
- **URL**: `http://localhost:3000/customer/getAllOthers`
- **Method**: `GET`
- **Headers**: No header required

#### Response:

- **Success (200)**:
```json
[
    {
        "_id": "66eaf7bb7cc2e223a09b82cd",
        "productName": "Honey",
        "category": "Others",
        "description": "Pure organic honey.",
        "price": 300,
        "unit": "kg",
        "stock": 100,
        "image": "base64 string",
        "harvestDate": "2024-10-05T00:00:00.000Z",
        "expiryDate": "2025-10-05T00:00:00.000Z",
        "farmingMethod": "Organic",
        "deliveryTime": "3-4 days",
        "__v": 0
    },
    {
        "_id": "66eaf7bb7cc2e223a09b82ce",
        "productName": "Olive Oil",
        "category": "Others",
        "description": "High-quality extra virgin olive oil.",
        "price": 500,
        "unit": "litre",
        "stock": 50,
        "image": "base64 string",
        "harvestDate": "2024-09-15T00:00:00.000Z",
        "expiryDate": "2025-09-15T00:00:00.000Z",
        "farmingMethod": "Organic",
        "deliveryTime": "2-3 days",
        "__v": 0
    }
]
```

### Get All Products By Name

#### Endpoint:
`GET /customer/getAllProductsByName?name={productName}`

#### Description:
This endpoint retrieves a list of products that match the specified name. This is useful for searching for products by name in the database.

#### Request:
- **URL**: `http://localhost:3000/customer/getAllProductsByName?name=apple`
- **Method**: `GET`
- **Headers**: No header required

#### Response:

- **Success (200)**:
```json
[
    {
        "_id": "66eaf7bb7cc2e223a09b82cf",
        "productName": "Apple",
        "category": "Fruits",
        "description": "Freshly picked apples from the orchard.",
        "price": 120,
        "unit": "kg",
        "stock": 30,
        "image": "base64 string",
        "harvestDate": "2024-09-01T00:00:00.000Z",
        "expiryDate": "2024-09-15T00:00:00.000Z",
        "farmingMethod": "Organic",
        "deliveryTime": "1-2 days",
        "__v": 0
    },
    {
        "_id": "66eaf7bb7cc2e223a09b82d0",
        "productName": "Green Apple",
        "category": "Fruits",
        "description": "Crisp green apples, perfect for snacking.",
        "price": 130,
        "unit": "kg",
        "stock": 20,
        "image": "base64 string",
        "harvestDate": "2024-09-01T00:00:00.000Z",
        "expiryDate": "2024-09-15T00:00:00.000Z",
        "farmingMethod": "Organic",
        "deliveryTime": "1-2 days",
        "__v": 0
    }
]
```

### Submit Contact Form

#### Endpoint:
`POST /customer/submitContactForm`

#### Description:
This endpoint allows customers to submit a contact form with inquiries about products. It captures the customer's details and their message for further follow-up.

#### Request:
- **URL**: `http://localhost:3000/customer/submitContactForm`
- **Method**: `POST`
- **Headers**: No specific headers required
- **Body** (raw JSON):
```json
{
  "name": "John Doe",
  "email": "johndoe@example.com",
  "subject": "Inquiry about Product",
  "message": "Hello, I am interested in learning more about your product offerings. Could you provide more details on the available options and pricing?"
}
```

## ON SUCCESS
```json
{
    "message": "Contact form submitted successfully."
}
```

### Add Farmer Application

#### Endpoint:
`POST /admin/farmer/addFarmerApplication`

#### Description:
This endpoint allows an admin to submit a farmer application for a user. It requires authentication to retrieve the user's ID and includes details about the farm and the applicant's experience.

#### Request:
- **URL**: `http://localhost:3000/admin/farmer/addFarmerApplication`
- **Method**: `POST`
- **Headers**:
  - `Authorization`: Bearer `<auth token>`
- **Body** (form data):
  - `farmPhoto`: Upload the farm photo
  - `proofPhoto`: Upload the proof photo
  - `farmLocation`: Location of the farm
  - `farmSize`: Size of the farm
  - `experience`: Experience of the farmer

#### Response:

- **Error: Application Already Exists (400)**:
```json
{
    "message": "A farmer application for this user already exists."
}
```


- **Success**:
```json
{
    "message": "Farmer application submitted successfully"
}

```

### Approve Farmer Application

#### Endpoint:
`PUT /admin/farmer/approveFarmer/:farmerId`

#### Description:
This endpoint allows an admin to approve a farmer's application, updating the user's role to farmer. Requires authentication via an authorization token.

#### Request:
- **URL**: `http://localhost:3000/admin/farmer/approveFarmer/:farmerId`
  - Replace `:farmerId` with the actual farmer application ID (e.g., `6703d25c5e0d10b9a06baa97`)
- **Method**: `PUT`
- **Headers**:
  - `Authorization`: Bearer `<auth token>`
  
#### Response:

- **Error: Farmer Already Approved (400)**:
```json
{
    "message": "Farmer application is already approved"
}
```

#### On success
```json

{
    "message": "Farmer application approved and user role updated",
    "farmerApplication": {
        "_id": "6707d0162285eb06b1585117",
        "userId": "6707c6348fd0fbaaf077470f",
        "farmLocation": "123 Farm Street",
        "farmSize": "50 acres",
        "experience": "10 years",
        "farmPhoto": "/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFx…",
        "photoOfProofThatHeIsFarmer": "/9j/4AAQSkZJRgABAQEAlgCWAAD/4UCwRXhpZgAATU0AKgAAAAgABgALAAIAAAAmAAAIYg…",
        "isApproved": true,
        "createdAt": "2024-10-07T12:21:48.728+00:00",
        "updatedAt": "2024-10-07T12:24:28.482+00:00",
        "__v": 0
    }
}
```
### Get All Farmer Applicants

#### Endpoint:
`GET /admin/farmer/getAllFarmerApplicants`

#### Description:
This endpoint retrieves a list of all farmer applications. No authentication or headers are required.

#### Request:
- **URL**: `http://localhost:3000/admin/farmer/getAllFarmerApplicants`
- **Method**: `GET`

#### Response:

- **Success (200)**:
```json
[
  {
    "_id": "6707d0162285eb06b1585117",
    "userId": "6707c6348fd0fbaaf077470f",
    "farmLocation": "123 Farm Street",
    "farmSize": "50 acres",
    "experience": "10 years",
    "farmPhoto": "/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFx…",
    "photoOfProofThatHeIsFarmer": "/9j/4AAQSkZJRgABAQEAlgCWAAD/4UCwRXhpZgAATU0AKgAAAAgABgALAAIAAAAmAAAIYg…",
    "isApproved": false,
    "createdAt": "2024-10-07T12:21:48.728+00:00",
    "updatedAt": "2024-10-07T12:24:28.482+00:00",
    "__v": 0
  },
  ...
]
```


### 1. Add Item to Cart

#### **Endpoint:**
`POST /user/addCartItem`

#### **Description:**
Allows a user to add a product to their cart.

#### **Headers:**
- **authToken**: `<Your Token>`

#### **Request:**
- **Method**: `POST`
- **URL**: `/user/addCartItem`
- **Body**:
```json
{
    "productId": "66eaf7bb7cc2e223a09b82c6",
    "quantity": 2
}
```
#### On success:
```json
{
    "message": "Product added to cart successfully",
    "cartItems": [
        {
            "productId": "66eaf7bb7cc2e223a09b82c6",
            "quantity": 2,
            "_id": "6708b2e1fb170dbe43a137e3"
        }
    ]
}
```

### Update Cart Item

#### **Endpoint:**
`PUT /user/updateCartItem`

#### **Description:**
Allows a user to update the quantity of a product in their cart.

#### **Headers:**
- **authToken**: `<Your Token>`

#### **Request:**
- **Method**: `PUT`
- **URL**: `/user/updateCartItem`
- **Body**:
```json
{
    "productId": "66eaf7bb7cc2e223a09b82c6",
    "quantity": 3
}
```

#### On success
```json
{
    "message": "Cart updated successfully",
    "cartItems": [
        {
            "productId": "66eaf7bb7cc2e223a09b82c6",
            "quantity": 3,
            "_id": "6708b2e1fb170dbe43a137e3"
        }
    ]
}
```

###  Delete Cart Item

#### **Endpoint:**
`DELETE /user/deleteCartItem`

#### **Description:**
Removes a product from the user's cart.

#### **Headers:**
- **authToken**: `<Your Token>`

#### **Request:**
- **Method**: `DELETE`
- **URL**: `/user/deleteCartItem`
- **Body**:
```json
{
    "productId": "66eaf7bb7cc2e223a09b82c6"
}
```

#### On success
```json
{
    "message": "Product removed from cart successfully",
    "cartItems": []
}
```

### 5. Get All Cart Items

#### **Endpoint:**
`GET /user/getAllCartItems`

#### **Description:**
Fetches all the items in the user's cart.

#### **Headers:**
- **authToken**: `<Your Token>`

#### **Request:**
- **Method**: `GET`
- **URL**: `/user/getAllCartItems`

#### **Response:**

- **Success (200) - Cart is empty**:
```json
{
    "message": "Your cart is empty",
    "cartItems": []
}
```
- **Success (200) - Cart is not empty**:
```json
{
    "cartItems": [
        {
            "productId": "66eaf7bb7cc2e223a09b82c6",
            "quantity": 2,
            "_id": "6708b4cffb170dbe43a137f5"
        }
    ]
}

```
###  Place Order

#### **Endpoint:**
`POST /user/placeOrder`

#### **Description:**
This endpoint allows users to place an order for a specific product.

#### **Headers:**
- **authToken**: `<Your Token>`

#### **Request:**
- **Method**: `POST`
- **URL**: `/user/placeOrder`
- **Body**:
```json
{
    "productId": "66eaf7bb7cc2e223a09b82c6",
    "quantity": 2
}

```

#### Response
```json
{
    "message": "Order placed successfully",
    "deliveryItem": {
        "userId": "66dedac1b1a0cc72da9f1746",
        "productId": "66eaf7bb7cc2e223a09b82c6",
        "address": {
            "doorNo": "29-818/1",
            "area": "MaruthiNagar,Dharmavaram",
            "landmark": "Near Ram Temple",
            "district": "Anantapur",
            "state": "Andhra Pradesh",
            "pincode": "515671"
        },
        "quantity": 2,
        "amount": 400
    }
}

```
###  Get All Delivery Items

#### **Endpoint:**
`GET /user/getAllDeliveryItems`

#### **Description:**
This endpoint retrieves a list of all delivery items for the authenticated user.

#### **Headers:**
- **authToken**: `<Your Token>`

#### **Request:**
- **Method**: `GET`
- **URL**: `/user/getAllDeliveryItems`

#### **Response:**

- **Success (200)**:
```json
[
    {
        "address": {
            "doorNo": "29-818/1",
            "area": "MaruthiNagar,Dharmavaram",
            "landmark": "Near Ram Temple",
            "district": "Anantapur",
            "state": "Andhra Pradesh",
            "pincode": "515671"
        },
        "_id": "6708b5befb170dbe43a13814",
        "userId": "66dedac1b1a0cc72da9f1746",
        "productId": "66eaf7bb7cc2e223a09b82c6",
        "quantity": 2,
        "amount": 400,
        "__v": 0
    }
]
```

###  Order Delivered

#### **Endpoint:**
`POST /user/orderDelivered`

#### **Description:**
This endpoint marks a specified order as delivered for a user.

#### **Request Body:**
```json
{
    "userId": "66dedac1b1a0cc72da9f1746",
    "productId": "66eaf7bb7cc2e223a09b82c6"
}
```

#### on success
```json
{
    "message": "Order marked as delivered successfully",
    "deliveredItem": {
        "productId": "66eaf7bb7cc2e223a09b82c6",
        "quantity": 2,
        "orderedDate": "2024-10-11T05:21:02.135Z",
        "amount": 400,
        "_id": "6708b5befb170dbe43a1381b"
    }
}
```
