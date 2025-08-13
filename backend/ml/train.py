# import pandas as pd
# from sklearn.feature_extraction.text import TfidfVectorizer
# from sklearn.model_selection import train_test_split
# from sklearn.multiclass import OneVsRestClassifier
# from sklearn.linear_model import LogisticRegression
# from sklearn.metrics import classification_report
# import joblib
# from preprocess import clean_text

# # Load data
# df = pd.read_csv("./data/train.csv")

# # Select input & labels
# X_raw = df["comment_text"]
# y = df[["toxic", "severe_toxic", "obscene", "threat", "insult", "identity_hate"]]

# # Clean text
# X_cleaned = X_raw.apply(clean_text)

# # TF-IDF Vectorization
# vectorizer = TfidfVectorizer(max_features=10000)
# X_vect = vectorizer.fit_transform(X_cleaned)

# # Train/Test Split
# X_train, X_test, y_train, y_test = train_test_split(X_vect, y, test_size=0.2, random_state=42)

# # Train model (multi-label)
# model = OneVsRestClassifier(LogisticRegression(max_iter=1000))
# model.fit(X_train, y_train)

# # Evaluate
# y_pred = model.predict(X_test)
# print(classification_report(y_test, y_pred, target_names=y.columns))

# # Save model & vectorizer
# joblib.dump(model, "model.pkl")
# joblib.dump(vectorizer, "vectorizer.pkl")



import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.model_selection import train_test_split
from sklearn.multiclass import OneVsRestClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import classification_report
import joblib
from preprocess import clean_text

# === Load data ===
df = pd.read_csv("./backend/ml/data/train.csv")

# If your dataset has an ID column, drop it
if "id" in df.columns:
    df = df.drop(columns=["id"])

# Define label columns
label_cols = ["toxic", "severe_toxic", "obscene", "threat", "insult", "identity_hate"]

# Select input & labels
X_raw = df["comment_text"]
y = df[label_cols]

# === Optional: Add custom training examples ===
custom_data = [
    ["You are a horrible person", 1, 0, 0, 0, 1, 0],
    ["You are disgusting", 1, 0, 0, 0, 1, 0],
    ["I hate you", 1, 0, 0, 0, 1, 0],
    ["Nobody likes you", 1, 0, 0, 0, 1, 0],
    ["You are pathetic", 1, 0, 0, 0, 1, 0],
]

df_custom = pd.DataFrame(custom_data, columns=["comment_text"] + label_cols)

# Merge datasets
df_full = pd.concat([df, df_custom], ignore_index=True)

# === Preprocess ===
X_cleaned = df_full["comment_text"].apply(clean_text)

# TF-IDF Vectorization
vectorizer = TfidfVectorizer(max_features=10000)
X_vect = vectorizer.fit_transform(X_cleaned)

# Train/Test Split
X_train, X_test, y_train, y_test = train_test_split(X_vect, df_full[label_cols], test_size=0.2, random_state=42)

# Train model (multi-label classification)
model = OneVsRestClassifier(LogisticRegression(max_iter=1000))
model.fit(X_train, y_train)

# Evaluate
y_pred = model.predict(X_test)
print(classification_report(y_test, y_pred, target_names=label_cols))

# Save model & vectorizer
joblib.dump(model, "backend/ml/model.pkl")
joblib.dump(vectorizer, "backend/ml/vectorizer.pkl")

print("✅ Model and vectorizer saved in backend/ml/")
