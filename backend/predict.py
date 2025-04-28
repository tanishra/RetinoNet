from tensorflow.keras.models import load_model
from keras.layers import Dropout
from keras.activations import swish
from PIL import Image
import numpy as np

# Custom dropout class
class FixedDropout(Dropout):
    def call(self, inputs, training=None):
        return super().call(inputs, training=True)

# Load the trained model
model = load_model('model.h5', custom_objects={'FixedDropout': FixedDropout, 'swish': swish})

def predict_diabetic_retinopathy(image_path):
    img = Image.open(image_path).convert('RGB').resize((224, 224))
    img_array = np.array(img) / 255.0
    img_array = np.expand_dims(img_array, axis=0)

    prediction = model.predict(img_array)
    predicted_class = np.argmax(prediction)

    class_names = ['No DR', 'Mild', 'Moderate', 'Severe', 'Proliferative DR']
    return class_names[predicted_class] if predicted_class < len(class_names) else str(predicted_class)
