import requests
import json
import uuid

# Base URL of the API
BASE_URL = "0.0.0.0:7755"  # Adjust this to match your server's URL & port

# Helper function to print the response
def print_response(response):
    print(f"Status Code: {response.status_code}")
    print("Headers:")
    print(response.headers)
    print("JSON Response:")
    print(json.dumps(response.json(), indent=4))

# Test the creation of a new paste
def test_create_paste():
    content = "This is a test paste content." * 1000  # Adjust the length as needed
    response = requests.post(f"{BASE_URL}/api/paste", json={"content": content})
    print_response(response)
    return response.json()["url"]

# Test retrieving a specific paste by ID
def test_get_paste(paste_id):
    response = requests.get(f"{BASE_URL}/api/paste/{paste_id}")
    print_response(response)

# Test retrieving all pastes
def test_get_all_pastes():
    response = requests.get(f"{BASE_URL}/api/pastes")
    print_response(response)

# Test exceeding the word count limit for paste creation
def test_exceed_word_limit():
    content = "This is a test paste content." * 10000  # Adjust the length to exceed the limit
    response = requests.post(f"{BASE_URL}/api/paste", json={"content": content})
    print_response(response)

# Main function to run the tests
def main():
    print("Running tests:")
    print("\nTest Create Paste:")
    paste_url = test_create_paste()
    print("\nTest Get Paste:")
    test_get_paste(paste_url.split("/")[-1])  # Extract the ID from the URL
    print("\nTest Get All Pastes:")
    test_get_all_pastes()
    print("\nTest Exceed Word Limit:")
    test_exceed_word_limit()

if __name__ == "__main__":
    main()
