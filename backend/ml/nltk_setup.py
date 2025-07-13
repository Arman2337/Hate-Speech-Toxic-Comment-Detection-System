import nltk

# Standard downloads
nltk.download('stopwords')
nltk.download('punkt')
nltk.download('wordnet')

# Fix: punkt_tab is part of 'punkt', but force re-download
nltk.download('punkt_tab')  # Redownloading fixes the subdir issue

# Optional: for safer tokenization
nltk.download('omw-1.4')
