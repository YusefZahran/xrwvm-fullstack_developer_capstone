from flask import Flask, request, jsonify
from nltk.sentiment import SentimentIntensityAnalyzer
import json
import urllib.parse

app = Flask("Sentiment Analyzer")

sia = SentimentIntensityAnalyzer()


@app.get('/')
def home():
    return "Welcome to the Sentiment Analyzer. \
    Use /analyze/text to get the sentiment"


@app.post('/analyze')
def analyze_sentiment():
    data = request.get_json(force=True, silent=True)
    if not data:
        return jsonify({"sentiment": "neutral"})
    text = data.get('text', '')
    scores = sia.polarity_scores(text)
    compound = scores['compound']
    if compound >= 0.05:
        res = "positive"
    elif compound <= -0.05:
        res = "negative"
    else:
        res = "neutral"
    return jsonify({"sentiment": res})


if __name__ == "__main__":
    app.run(debug=True)
