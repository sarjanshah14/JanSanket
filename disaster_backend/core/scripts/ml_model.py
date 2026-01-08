import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error
import joblib
import os

# Load dataset
df = pd.read_csv('Shelter_Resources.csv')

# Feature and target selection
X = df[['current_occupancy', 'capacity','occupancy_rate','empty_beds','is_full']]
y = df[['food_needed', 'water_required']].copy()
y['kits_per_person'] = df['kits_per_person']
y['volunteers_per_person'] = df['volunteers_per_person']

# Train/test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train model
model = RandomForestRegressor(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Evaluate model (optional)
y_pred = model.predict(X_test)
for i, col in enumerate(y.columns):
    mse = mean_squared_error(y_test.iloc[:, i], y_pred[:, i])
    print(f"📊 MSE for {col}: {mse:.2f}")

# Save model
model_dir = os.path.dirname(os.path.abspath(__file__))
model_path = os.path.join(model_dir, 'shelter_resources.pkl')
joblib.dump(model, model_path)

print(f"✅ Model trained and saved at: {model_path}")
