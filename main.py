import torch
import torch.nn as nn
import timm
import numpy as np
from torchvision import transforms, models
from PIL import Image
import torch_optimizer as optim
import pandas as pd
import streamlit as st

# Set constants
LEARNING_RATE = 1e-4
MODEL_NAME = 'Mobile_Pit'
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
checkpoint_path = "Mobile_Pit_last_checkpoint.pt"  # Update to your checkpoint path

# Define the models (MobileNetV2 and PiT)
Model_P = "pit_b_224"
MODEL_NAME = 'Mobile_Pit'

# MobileNetV2 Model Setup
Model_Mobile = models.mobilenet_v2(pretrained=True)
num_features_mobile = Model_Mobile.classifier[1].in_features
Model_Mobile.classifier = nn.Identity()

# PiT (DeiT-style) Model Setup using timm
Model_pit = timm.create_model(Model_P, pretrained=True, num_classes=5)
num_features_pit = Model_pit.head.in_features
Model_pit.head = nn.Identity()

# Combined Model Class
class CombinedModel(nn.Module):
    def __init__(self, Model_Mobile, Model_pit, num_classes):
        super(CombinedModel, self).__init__()
        self.Model_Mobile = Model_Mobile
        self.Model_pit = Model_pit
        self.fc = nn.Linear(num_features_mobile + num_features_pit, num_classes)

    def forward(self, x):
        Model_Mobile_features = self.Model_Mobile(x)
        Model_pit_features = self.Model_pit(x)

        if len(Model_Mobile_features.shape) > 2:
            Model_Mobile_features = Model_Mobile_features.flatten(1)
        if len(Model_pit_features.shape) > 2:
            Model_pit_features = Model_pit_features.flatten(1)

        combined_features = torch.cat((Model_Mobile_features, Model_pit_features), dim=1)
        output = self.fc(combined_features)
        return output

# Initialize the combined model
model_co = CombinedModel(Model_Mobile, Model_pit, num_classes=5).to(device)

# Load model from checkpoint
def load_model_from_checkpoint(checkpoint_path, device):
    checkpoint = torch.load(checkpoint_path, map_location=device)
    model_co.load_state_dict(checkpoint["model_state_dict"])
    model_co.to(device)
    model_co.eval()
    return model_co

# Load the model
model = load_model_from_checkpoint(checkpoint_path, device)

# Class names for predictions
class_names = ['No_DR', 'Mild', 'Moderate', 'Severe', 'Proliferate_DR']

# Prediction function for a single image
def predict_image(img, model, device):
    transform = transforms.Compose([
        transforms.Resize((224, 224)),
        transforms.ToTensor(),
        transforms.Normalize([0.485, 0.456, 0.406],
                             [0.229, 0.224, 0.225])
    ])

    img_tensor = transform(img).unsqueeze(0).to(device)
    model.eval()

    with torch.no_grad():
        outputs = model(img_tensor)
        pred_class = torch.argmax(outputs, dim=1).item()

    return pred_class, class_names[pred_class]

# Streamlit UI
def main():
    st.title("Diabetic Retinopathy Prediction")
    st.write("Upload an image of the retina scan to predict the severity of diabetic retinopathy.")

    # Image upload
    uploaded_image = st.file_uploader("Choose a retina scan image", type=["png", "jpg", "jpeg"])

    if uploaded_image is not None:
        # Open the image
        img = Image.open(uploaded_image).convert("RGB")
        
        # Display the uploaded image
        st.image(img, caption="Uploaded Image", use_column_width=True)

        # Prediction
        pred_class, label = predict_image(img, model, device)

        # Display the prediction
        st.write(f"Prediction: {label}")
        st.write(f"Class Index: {pred_class}")

if __name__ == "__main__":
    main()
