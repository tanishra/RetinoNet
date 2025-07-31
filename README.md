# RetinoNet 🧿
> Retinopathy detection using Deep Learning

---

## 🚀 Overview
**RetinoNet** is an AI-driven platform for early detection of diabetic retinopathy from retinal fundus images.  
It leverages a deep learning model to classify images and provides users with an intuitive web interface to upload images, view diagnostic results, and access past reports.

The goal is to make retinal disease detection more **accessible**, **scalable**, and **accurate** — helping to prevent vision loss through early intervention.

---

## ✨ Features
- 🔍 Upload retinal fundus images and get instant predictions
- 🧠 Deep learning-based image classification (CNN model)
- 📈 User authentication (Login/Signup)
- 📂 Access and manage previous diagnostic reports
- 💻 Frontend built with modern web technologies (React/Next.js)
- 🚀 Backend model served via API (Flask/express.js)
- 🎯 Designed for real-world usability and scalability

---

## 🧠 How It Works
1. **Image Upload** – User uploads a retinal image via the web interface.
2. **Model Inference** – The backend processes the image using a pre-trained deep learning model.
3. **Prediction Result** – The model classifies the image (e.g., Mild, Moderate, Severe DR).
4. **Report Generation** – Results are displayed and optionally saved for later access.

---

## 🧠 Model Architecture
1. **Hybrid Design** – Combines **MobileNetV2** for lightweight and efficient feature extraction with a **PiT (Pooling-based Vision Transformer)** for capturing global context and attention across the image.
2. **Feature Extraction (MobileNetV2)** – Uses MobileNetV2 as a backbone to extract high-level features from retinal fundus images with minimal computational cost, making the model suitable for real-time inference.
3. **Transformer Encoding (PiT)** – The features from MobileNetV2 are passed into a PiT-based Vision Transformer, which applies self-attention mechanisms to capture long-range spatial relationships.
4. **Classification Head** – The output from the transformer is flattened and fed into fully connected layers to classify the input image into various diabetic retinopathy stages (e.g., No DR, Mild, Moderate, Severe, Proliferative).
5. **Optimization (LAMB Optimizer)** – The model is trained using the **LAMB (Layer-wise Adaptive Moments)** optimizer, enabling large-batch training with stable convergence and improved performance on deep architectures.

---


## 🛠 Tech Stack
- **Deep Learning:** TensorFlow / Keras
- **Frontend:** React.js / Next.js
- **Backend:** Flask/express.js
- **Other:** Git LFS for managing large model files

---

## 🚧 Future Enhancements

1. **Mobile App Integration** – Develop a mobile application to enable users and healthcare providers to capture and analyze retinal images on the go.
2. **Multi-language Support** – Add support for multiple languages to improve accessibility for non-English-speaking users.
3. **Cloud Deployment** – Deploy the application and model on cloud platforms (e.g., AWS, GCP) for better scalability, availability, and real-time inference.
4. **EHR System Integration** – Integrate with Electronic Health Record (EHR) systems to streamline data flow between diagnostics and clinical records.
5. **Explainable AI (XAI)** – Incorporate visual explanations (like Grad-CAM) to help users understand why a certain prediction was made.

---


## 🤝 Contributing
Pull requests are welcome!
If you find a bug or want to improve the project, feel free to fork and submit a PR.
