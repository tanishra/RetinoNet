# Use Python 3.10.18 slim version
FROM python:3.10.18-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV HF_TOKEN = "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"

# Set work directory
WORKDIR /backend

# Install system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    libglib2.0-0 \
    libsm6 \
    libxrender1 \
    libxext6 \
    git \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements first (for better caching)
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the app
COPY . .

# Ensure upload directory exists
RUN mkdir -p static/uploads

# Expose the port your Flask app runs on
EXPOSE 5001

# Run the Flask server
CMD ["python", "server.py"]
