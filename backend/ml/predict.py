# import os
# import sys
# import json
# import joblib
# import numpy as np
# from preprocess import clean_text

# # --- Fix: Build paths relative to this file ---
# BASE_DIR = os.path.dirname(os.path.abspath(__file__))
# MODEL_PATH = os.path.join(BASE_DIR, "model.pkl")
# VECTORIZER_PATH = os.path.join(BASE_DIR, "vectorizer.pkl")

# # Load model & vectorizer
# model = joblib.load(MODEL_PATH)
# vectorizer = joblib.load(VECTORIZER_PATH)

# labels = ["toxic", "severe_toxic", "obscene", "threat", "insult", "identity_hate"]

# def predict_scores(text):
#     cleaned_text = clean_text(text)
#     vectorized_text = vectorizer.transform([cleaned_text])
#     probabilities = model.predict_proba(vectorized_text)

#     scores = {}
#     for i, label in enumerate(labels):
#         prob_array = probabilities[i] if isinstance(probabilities, list) else probabilities[:, i]
#         if isinstance(prob_array, np.ndarray) and prob_array.ndim > 1:
#             scores[label] = prob_array[0, 1]  # positive class
#         else:
#             scores[label] = float(prob_array[0]) if len(prob_array) > 0 else 0.0

#     overall_score = int(np.max(list(scores.values())) * 100)
#     classification = "✅ NON-TOXIC"
#     if overall_score > 75:
#         classification = "❌ TOXIC"
#     elif overall_score > 40:
#         classification = "⚠️ POTENTIALLY TOXIC"

#     return {
#         "overallScore": overall_score,
#         "classification": classification,
#         "categories": {label: round(score * 100) for label, score in scores.items()}
#     }

# if __name__ == "__main__":
#     if len(sys.argv) > 1:
#         input_text = sys.argv[1]
#         output = predict_scores(input_text)
#         print(json.dumps(output))
#     else:
#         print(json.dumps({"error": "No input text provided"}))


import os
# CHANGE 1: This line is new. It silences TensorFlow warnings.
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3' 
import sys
import json
import numpy as np
import torch
from transformers import AutoTokenizer, AutoModelForSequenceClassification
from preprocess import clean_text

# --- Base directory (you can move model folder later if needed) ---
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_DIR = os.path.join(BASE_DIR, "..", "model", "model_xlmr", "checkpoint-28977")

# --- Load model & tokenizer ---
tokenizer = AutoTokenizer.from_pretrained(MODEL_DIR)
model = AutoModelForSequenceClassification.from_pretrained(MODEL_DIR)
model.eval()  # set to evaluation mode

# --- Labels (same order as during training) ---
labels = ["toxic", "severe_toxic", "obscene", "threat", "insult", "identity_hate"]

def predict_scores(text: str):
    """Predict toxicity scores using fine-tuned XLM-R model."""
    # Clean input text
    cleaned_text = clean_text(text)

    # Tokenize and move to model device
    inputs = tokenizer(cleaned_text, return_tensors="pt", truncation=True, padding=True, max_length=256).to(model.device)

    with torch.no_grad():
        outputs = model(**inputs)
        probs = torch.sigmoid(outputs.logits).cpu().numpy()[0]  # multi-label sigmoid activation

    # Map probabilities to labels
    scores = {label: float(p) for label, p in zip(labels, probs)}

    # Overall classification logic
    overall_score = int(max(scores.values()) * 100)
    if overall_score > 75:
        classification = "❌ TOXIC"
    elif overall_score > 40:
        classification = "⚠️ POTENTIALLY TOXIC"
    else:
        classification = "✅ NON-TOXIC"

    return {
        "overallScore": overall_score,
        "classification": classification,
        "categories": {label: round(score * 100) for label, score in scores.items()}
    }

if __name__ == "__main__":
    if len(sys.argv) > 1:
        input_text = sys.argv[1]
        output = predict_scores(input_text)
        # CHANGE 2: I removed 'ensure_ascii=False' to fix the emoji error.
        print(json.dumps(output)) 
    else:
        print(json.dumps({"error": "No input text provided"}))