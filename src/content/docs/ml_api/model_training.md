---
title: Model Training
description: Detailed documentation of the model training process for appliance classification using time-series data.
---

# Overview

This page provides a comprehensive description of the training process for the machine learning model that classifies household appliances based on their energy consumption patterns during a peak. The model leverages time-series data collected from various household devices, identifying significant energy consumption events or "peaks" in each device's data.

The code follows a deep learning approach using a hybrid architecture of Convolutional Neural Networks (CNNs) and Recurrent Neural Networks (RNNs) with Gated Recurrent Units (GRUs) to classify time-series data. This documentation delves into the code, the methodology, and the choices made during model development and training.

# Data Preparation

We use the dataset that we already processed(see [`here`](./data.md)). The dataset consists of power consumption readings from several household devices, each reading associated with a timestamp and a peak number that identifies significant consumption events. The devices are labeled based on their type, such as washing machines, dishwashers, fridges, freezers and microwaves.

## Device Mapping

We map the device types to integer labels for classification, as shown below:

```python
device_mapping = {
    "washing_machine": 0,
    "dishwasher": 1,
    "freezer": 2,
    "fridge": 3,
    "micro_wave_oven": 4
}
```

## CSV Files and Data Loading

The dataset is spread across multiple CSV files, each containing energy consumption data for a specific device. The following steps are applied to each file:

1. **Reading the CSV Data**: The data is loaded from the CSV file.
2. **Labeling**: Each row in the CSV is labeled with the corresponding device's label.
3. **Scaling**: The power consumption values are scaled using a `StandardScaler` to ensure that the model can better learn from the normalized data.

### Loading and Scaling Data

The `load_device_data()` function reads the CSV data, assigns the appropriate label, and scales the power consumption values. This normalization step is critical to eliminate differences in magnitude between various devices' power readings:

```python
def load_device_data(file_path, label, peak_offset, scaler=None):
    df = pd.read_csv(file_path)
    df['label'] = label
    df['peak_number'] += peak_offset
    if scaler:
        df['power'] = scaler.transform(df[['power']])
    return df, df['peak_number'].max() + 1
```

### Data Grouping

After loading and scaling all data, the readings are grouped by `peak_number`, resulting in time-series segments. Each segment represents the power consumption during a specific peak event for a given device. These segments are stored as arrays of power values and prepared for input into the model. The corresponding labels are stored in an array for training purposes.

# Model Architecture

The model utilizes a hybrid CNN-RNN architecture to classify time-series data, with each component playing a specific role:

1. **CNN**: Extracts local features from the time-series data.
2. **RNN (GRU)**: Captures temporal dependencies between features across the time-series.

## CNN Layer

The CNN layer consists of:

- A 1D convolutional layer with 128 filters and a kernel size of 3, which extracts features from the time-series data.
- A max pooling layer to down-sample the data, reducing the dimensionality and emphasizing the most critical features.
- A dropout layer to prevent overfitting.

## RNN Layers

The RNN portion of the model consists of two bidirectional GRU layers, each with 256 units:

- The first GRU layer returns sequences to feed into the next GRU layer, ensuring the model captures patterns over the entire sequence.
- Both GRU layers are wrapped in `Bidirectional` layers to capture dependencies from both past and future time steps, improving the model's ability to recognize patterns irrespective of direction.

## Fully Connected Layer

After the RNN layers, the model contains:

- A dense layer with 256 units and `L2` regularization to avoid overfitting.
- A final dense layer with `sigmoid` activation, suitable for multi-label classification tasks.

## Model Summary

The complete model is defined as follows:

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

# Model Training

The model is trained using binary cross-entropy loss, as it is a multi-label classification problem, and the final activation function is sigmoid. The optimizer used is Adam, with a learning rate scheduler to reduce the learning rate if no improvement is observed in validation loss. Early stopping is also applied to halt training when validation loss stops improving, which prevents overfitting.

## Class Weights

Given that the dataset is imbalanced (some device classes appear more frequently than others), class weights are computed to give more importance to under-represented classes:

```python
class_weights = compute_class_weight(class_weight='balanced', classes=np.unique(y_train_flat), y=y_train_flat)
```

## Callbacks

The model uses two callbacks during training:

- **ReduceLROnPlateau**: Reduces the learning rate if the validation loss plateaus.
- **EarlyStopping**: Stops training if the validation loss does not improve for several epochs.

## Training Process

The model is trained using a custom data generator that batches the time-series data. Padding is applied to ensure all time-series sequences are of equal length, as shown in the following code:

```python
history = model.fit(train_gen, epochs=100, validation_data=test_gen, callbacks=[lr_scheduler, early_stopping], class_weight=class_weight_dict)
```

# Model Evaluation

After training, the model is evaluated on the test data using accuracy and loss metrics:

```python
test_loss, test_acc = model.evaluate(test_gen)
```

Additionally, predictions on the test data are used to generate a classification report and multilabel confusion matrices for each device:

```python
report = classification_report(y_test_all, y_pred_rounded, target_names=device_mapping.keys())
```

The confusion matrices for each device are plotted to provide a more detailed view of the model's performance.

# Conclusion

This model uses a CNN-RNN hybrid approach to classify household appliances based on time-series power consumption data. The model architecture captures both local features (via CNN) and temporal dependencies (via GRU). By applying techniques such as early stopping, class weighting, and learning rate scheduling, we aim to optimize the model's performance on an imbalanced dataset.