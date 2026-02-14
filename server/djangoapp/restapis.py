# Uncomment the imports below before you add the function code
import requests
import os
from dotenv import load_dotenv

load_dotenv()

backend_url = os.getenv(
    'backend_url', default="http://localhost:3030")
sentiment_analyzer_url = os.getenv(
    'sentiment_analyzer_url',
    default="http://localhost:5050/")

# def get_request(endpoint, **kwargs):
# Add code for get requests to back end
def get_request(endpoint, **kwargs):
    params = ""
    if(kwargs):
        for key,value in kwargs.items():
            params=params+key+"="+value+"&"

    request_url = backend_url+endpoint+"?"+params

    print("GET from {} ".format(request_url))
    try:
        # Call get method of requests library with URL and parameters
        response = requests.get(request_url)
        return response.json()
    except:
        # If any error occurs
        print("Network exception occurred")
# def analyze_review_sentiments(text):
# request_url = sentiment_analyzer_url+"analyze/"+text
# Add code for retrieving sentiments
# def analyze_review_sentiments(text):
#     request_url = sentiment_analyzer_url+"analyze/"+text
#     try:
#         # Call get method of requests library with URL and parameters
#         response = requests.get(request_url, verify=False)
#         return response.json()
#     except Exception as err:
#         print(f"Unexpected {err=}, {type(err)=}")
#         print("Network exception occurred")
#         return None

def analyze_review_sentiments(text):
    request_url = sentiment_analyzer_url + "analyze/" + text
    try:
        # verify=False handles lab SSL issues
        response = requests.get(request_url, verify=False, timeout=5)
        
        # Log the status to your terminal
        print(f"Sentiment API Status: {response.status_code} for URL: {request_url}")
        
        if response.status_code == 200:
            return response.json()
        else:
            print(f"Sentiment API returned error: {response.text}")
            return None
    except Exception as err:
        print(f"Sentiment Connection Error: {err}")
        return None

# def post_review(data_dict):
# Add code for posting review

def post_review(data_dict):
    request_url = backend_url+"/insert_review"
    try:
        response = requests.post(request_url,json=data_dict)
        print(response.json())
        return response.json()
    except:
        print("Network exception occurred")