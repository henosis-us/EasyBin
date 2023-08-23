### EasyBin API Documentation

#### 1. Home Page (GET `/`)

Renders the home page.

**Python Example:**
```python
import requests

response = requests.get("http://localhost:7755/")
print(response.text)
```

**JavaScript Example:**
```javascript
fetch("http://localhost:7755/")
  .then(response => response.text())
  .then(data => console.log(data));
```

#### 2. Create a New Paste (POST `/paste`)

Creates a new paste and returns the URL as JSON.

**Request Body:** `{ "content": "<paste_content>" }`

**Python Example:**
```python
import requests
import json

payload = {"content": "Hello, World!"}
response = requests.post("http://localhost:7755/paste", json=payload)
print(response.json())
```

**JavaScript Example:**
```javascript
fetch("http://localhost:7755/paste", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ content: "Hello, World!" })
})
  .then(response => response.json())
  .then(data => console.log(data));
```

#### 3. View a Specific Paste by ID (GET `/paste/:id`)

Retrieves a specific paste by its ID.

**Python Example:**
```python
import requests

paste_id = "your-paste-id"
response = requests.get(f"http://localhost:7755/paste/{paste_id}")
print(response.text)
```

**JavaScript Example:**
```javascript
const pasteId = "your-paste-id";
fetch(`http://localhost:7755/paste/${pasteId}`)
  .then(response => response.text())
  .then(data => console.log(data));
```

#### 4. Create a New Paste via API (POST `/api/paste`)

Same as endpoint 2, but designed for API usage.

#### 5. Retrieve a Specific Paste by ID via API (GET `/api/paste/:id`)

Same as endpoint 3, but designed for API usage.

#### 6. Retrieve All Pastes (GET `/api/pastes`)

Retrieves all pastes.

**Python Example:**
```python
import requests

response = requests.get("http://localhost:7755/api/pastes")
print(response.json())
```

**JavaScript Example:**
```javascript
fetch("http://localhost:7755/api/pastes")
  .then(response => response.json())
  .then(data => console.log(data));
```
