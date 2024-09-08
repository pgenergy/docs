---
title: Model Training
description: Detailed documentation of the model training process for appliance classification using time-series data.
---

## Overview

This page provides a detailed description of the training process for a machine learning model that classifies household appliances based on their energy consumption patterns during a peak. The model is trained using time-series data collected from various household devices, with peaks in energy consumption identified and labeled.

The code provided follows a deep learning approach using a combination of Convolutional Neural Networks (CNNs) and Recurrent Neural Networks (RNNs) with Gated Recurrent Units (GRUs) to classify time-series data. The following sections break down the code and the methodology applied during training.

## Data Preparation

The dataset consists of power consumption readings from several household devices, with each reading associated with a timestamp and a peak number, identifying significant consumption events (peaks). Each device is labeled based on its type, such as a washing machine, dishwasher, fridge, freezer, and microwave.

### Device Mapping

We map the device types to integer labels for classification:

```python
device_mapping = {
    "washing_machine": 0,
    "dishwasher": 1,
    "freezer": 2,
    "fridge": 3,
    "micro_wave_oven": 4
}
```

### CSV Files

Multiple CSV files are used, each containing energy consumption data for a specific device. Each file is processed and labeled accordingly. A peak number is assigned to differentiate distinct consumption peaks within the same device's data.

### Loading and Scaling Data

A function, `load_device_data()`, is used to read the CSV data, apply the appropriate label to the data, and scale the power consumption values using a `StandardScaler`. This normalization step ensures that the model can better learn from the input data.

### Data Grouping

Once all data is loaded and scaled, the readings are grouped by `peak_number`, resulting in time-series segments. Each segment is then prepared for input into the model. The label for each time-series is stored in a corresponding array.

## Model Architecture

The model utilizes a hybrid CNN-RNN architecture, where the CNN extracts meaningful features from the time-series data, and the RNN captures temporal dependencies between these features.

### CNN Layer

The CNN layer consists of:

- A 1D convolutional layer with 128 filters and a kernel size of 3, used to extract features from the time-series data.
- A max pooling layer for down-sampling the data.
- A dropout layer to prevent overfitting.

### RNN Layers

The RNN portion of the model consists of two bidirectional GRU layers, each with 256 units:

- The first GRU layer returns sequences to feed into the next GRU layer.
- Both GRU layers are wrapped in `Bidirectional` layers to capture dependencies from both past and future time steps.

### Fully Connected Layer

After the RNN layers, the model contains:

- A dense layer with 256 units and `L2` regularization to avoid overfitting.
- A final dense layer with `sigmoid` activation, suitable for multi-label classification tasks.

### Model Summary

```python
model = models.Sequential()

# CNN Layers
model.add(layers.Conv1D(filters=128, kernel_size=3, activation='relu', input_shape=(max_length, 1)))
model.add(BatchNormalization())
model.add(layers.MaxPooling1D(pool_size=2))
model.add(Dropout(0.3))

# Bidirectional GRU Layers
model.add(Bidirectional(GRU(256, return_sequences=True)))
model.add(Dropout(0.3))
model.add(Bidirectional(GRU(256)))
model.add(BatchNormalization())

# Dense Layers
model.add(Dense(256, activation='relu', kernel_regularizer=l2(0.01)))
model.add(Dropout(0.4))
model.add(Dense(num_classes, activation='sigmoid'))
```

## Model Training

The model is trained using binary cross-entropy loss since it's a multi-label classification problem, and the final activation function is sigmoid. The Adam optimizer is used, and a learning rate scheduler reduces the learning rate if no improvement is observed. Additionally, early stopping is applied to prevent overfitting by halting training when validation loss stops improving.

### Class Weights

Given that the dataset may be imbalanced (i.e., some device classes appear more frequently than others), class weights are computed to give more importance to under-represented classes:

```python
class_weights = compute_class_weight(class_weight='balanced', classes=np.unique(y_train_flat), y=y_train_flat)
```

### Callbacks

The model uses two callbacks during training:

- **ReduceLROnPlateau**: Reduces the learning rate if the validation loss plateaus.
- **EarlyStopping**: Stops training if the validation loss does not improve for several epochs.

### Training Process

The model is trained using a custom data generator that batches the time-series data. Padding is applied to ensure all time-series sequences are of equal length.

```python
history = model.fit(train_gen, epochs=100, validation_data=test_gen, callbacks=[lr_scheduler, early_stopping], class_weight=class_weight_dict)
```

## Model Evaluation

After training, the model is evaluated on the test data using accuracy and loss metrics:

```python
test_loss, test_acc = model.evaluate(test_gen)
```

Additionally, the predictions on the test data are used to generate a classification report and multilabel confusion matrices for each device:

```python
report = classification_report(y_test_all, y_pred_rounded, target_names=device_mapping.keys())
```

The confusion matrices for each device are plotted to provide a more detailed view of the model's performance.

## Conclusion

This model uses a CNN-RNN hybrid approach to classify household appliances based on time-series power consumption data. The model architecture captures both local features (via CNN) and temporal dependencies (via GRU). By applying techniques such as early stopping, class weighting, and learning rate scheduling, we aim to optimize the model's performance on an imbalanced dataset.