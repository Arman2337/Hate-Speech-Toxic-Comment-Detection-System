import sys
import json
import joblib
from preprocess import clean_text

# Load model & vectorizer
model = joblib.load("model.pkl")
vectorizer = joblib.load("vectorizer.pkl")
labels = ["toxic", "severe_toxic", "obscene", "threat", "insult", "identity_hate"]

def predict(text):
    cleaned = clean_text(text)
    vect = vectorizer.transform([cleaned])
    result = model.predict(vect)
    matched = [labels[i] for i, val in enumerate(result[0]) if val == 1]
    return {
        "toxic": bool(matched),
        "labels": matched
    }

# CLI support: test from terminal
if __name__ == "__main__":
    input_text = sys.argv[1]
    output = predict(input_text)
    print(json.dumps(output))
