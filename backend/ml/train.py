import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.model_selection import train_test_split
from sklearn.multiclass import OneVsRestClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import classification_report
import joblib
from preprocess import clean_text

# Load data
df = pd.read_csv("./data/train.csv")

# Select input & labels
X_raw = df["comment_text"]
y = df[["toxic", "severe_toxic", "obscene", "threat", "insult", "identity_hate"]]

# Clean text
X_cleaned = X_raw.apply(clean_text)

# TF-IDF Vectorization
vectorizer = TfidfVectorizer(max_features=10000)
X_vect = vectorizer.fit_transform(X_cleaned)

# Train/Test Split
X_train, X_test, y_train, y_test = train_test_split(X_vect, y, test_size=0.2, random_state=42)

# Train model (multi-label)
model = OneVsRestClassifier(LogisticRegression(max_iter=1000))
model.fit(X_train, y_train)

# Evaluate
y_pred = model.predict(X_test)
print(classification_report(y_test, y_pred, target_names=y.columns))

# Save model & vectorizer
joblib.dump(model, "ml/model.pkl")
joblib.dump(vectorizer, "ml/vectorizer.pkl")
