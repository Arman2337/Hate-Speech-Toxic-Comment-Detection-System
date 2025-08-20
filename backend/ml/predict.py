import os
import sys
import json
import joblib
import numpy as np
from preprocess import clean_text

# --- Fix: Build paths relative to this file ---
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "model.pkl")
VECTORIZER_PATH = os.path.join(BASE_DIR, "vectorizer.pkl")

# Load model & vectorizer
model = joblib.load(MODEL_PATH)
vectorizer = joblib.load(VECTORIZER_PATH)

labels = ["toxic", "severe_toxic", "obscene", "threat", "insult", "identity_hate"]

def predict_scores(text):
    cleaned_text = clean_text(text)
    vectorized_text = vectorizer.transform([cleaned_text])
    probabilities = model.predict_proba(vectorized_text)

    scores = {}
    for i, label in enumerate(labels):
        prob_array = probabilities[i] if isinstance(probabilities, list) else probabilities[:, i]
        if isinstance(prob_array, np.ndarray) and prob_array.ndim > 1:
            scores[label] = prob_array[0, 1]  # positive class
        else:
            scores[label] = float(prob_array[0]) if len(prob_array) > 0 else 0.0

    overall_score = int(np.max(list(scores.values())) * 100)
    classification = "✅ NON-TOXIC"
    if overall_score > 75:
        classification = "❌ TOXIC"
    elif overall_score > 40:
        classification = "⚠️ POTENTIALLY TOXIC"

    return {
        "overallScore": overall_score,
        "classification": classification,
        "categories": {label: round(score * 100) for label, score in scores.items()}
    }

if __name__ == "__main__":
    if len(sys.argv) > 1:
        input_text = sys.argv[1]
        output = predict_scores(input_text)
        print(json.dumps(output))
    else:
        print(json.dumps({"error": "No input text provided"}))
