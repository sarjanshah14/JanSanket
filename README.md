# Disaster Response Application

A comprehensive disaster response platform that enables real-time disaster reporting, shelter management, volunteer coordination, and resource allocation using machine learning predictions.

## 🌟 Features

### 🚨 Disaster Management
- **Real-time Disaster Reporting**: Report disasters with location, type, severity, and images
- **Interactive Map Visualization**: View disasters and shelters on an interactive map using Leaflet
- **Disaster Verification System**: Admin verification for reported disasters
- **Multiple Disaster Types**: Support for Fire, Flood, Earthquake, Storm/Hurricane, Tornado, Landslide, Tsunami, Volcanic Eruption, Drought, and others

### 🏠 Shelter Management
- **Shelter Directory**: Comprehensive database of emergency shelters
- **Capacity Tracking**: Real-time occupancy and capacity monitoring
- **Resource Prediction**: ML-powered predictions for food, water, medical kits, and volunteer requirements
- **Shelter Verification**: Admin verification system for shelter listings
- **Amenities Tracking**: Detailed shelter amenities and contact information

### 👥 Volunteer Coordination
- **Volunteer Registration**: Comprehensive volunteer application system
- **Role-based Matching**: Specialized roles and certifications tracking
- **Availability Management**: Volunteer availability and location tracking
- **Multi-language Support**: Volunteer language capabilities tracking

### 🤖 Machine Learning Integration
- **Resource Prediction Model**: Random Forest model for predicting shelter resource needs
- **Occupancy-based Predictions**: ML model trained on shelter occupancy data
- **Automated Resource Allocation**: Predicts food, water, medical kits, and volunteer requirements

### 🎨 User Experience
- **Dark/Light Theme**: Toggle between dark and light themes
- **Responsive Design**: Mobile-friendly interface using Bootstrap
- **Real-time Notifications**: WebSocket-based real-time updates
- **Interactive UI**: Modern React-based user interface

## 🛠 Technology Stack

### Frontend
- **React 19.1.0**: Modern React with hooks and functional components
- **React Router DOM**: Client-side routing
- **Bootstrap 5.3.7**: Responsive UI framework
- **Leaflet**: Interactive mapping library
- **Axios**: HTTP client for API communication
- **React Bootstrap**: Bootstrap components for React

### Backend
- **Django 5.2.4**: Python web framework
- **Django REST Framework**: API development
- **Django Channels**: WebSocket support for real-time features
- **SQLite**: Database (can be configured for PostgreSQL/MySQL)
- **JWT Authentication**: Secure user authentication
- **Pillow**: Image processing

### Machine Learning
- **Scikit-learn**: ML algorithms and model training
- **Pandas**: Data manipulation and analysis
- **NumPy**: Numerical computing
- **Joblib**: Model serialization

### Additional Tools
- **Stripe**: Payment processing integration
- **WebSocket**: Real-time communication
- **CORS**: Cross-origin resource sharing

## 📁 Project Structure

```
disaster-response-app/
├── disaster_frontend/          # React frontend application
│   ├── public/                 # Static assets
│   │   ├── assets/            # Images and media
│   │   ├── marker-icons/      # Map marker icons
│   │   └── videos/            # Video assets
│   ├── src/
│   │   ├── components/        # Reusable React components
│   │   ├── pages/             # Page components
│   │   ├── assets/            # Frontend assets
│   │   └── api.js             # API configuration
│   └── package.json
├── disaster_backend/           # Django backend application
│   ├── backend/               # Django project settings
│   ├── core/                  # Main Django app
│   │   ├── models.py          # Database models
│   │   ├── views.py           # API views
│   │   ├── serializers.py     # DRF serializers
│   │   ├── scripts/           # ML scripts and data
│   │   └── migrations/        # Database migrations
│   ├── media/                 # User-uploaded files
│   └── requirements.txt
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- Python (v3.8 or higher)
- pip (Python package manager)
- npm (Node package manager)

### Backend Setup

1. **Navigate to backend directory**:
   ```bash
   cd disaster_backend
   ```

2. **Create virtual environment**:
   ```bash
   python -m venv env
   source env/bin/activate  # On Windows: env\Scripts\activate
   ```

3. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Run migrations**:
   ```bash
   python manage.py migrate
   ```

5. **Create superuser** (optional):
   ```bash
   python manage.py createsuperuser
   ```

6. **Start the backend server**:
   ```bash
   python manage.py runserver
   ```

The backend will be available at `http://localhost:8000`

### Frontend Setup

1. **Navigate to frontend directory**:
   ```bash
   cd disaster_frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm start
   ```

The frontend will be available at `http://localhost:3000`

### Machine Learning Model Setup

1. **Navigate to ML scripts directory**:
   ```bash
   cd disaster_backend/core/scripts
   ```

2. **Train the ML model**:
   ```bash
   python ml_model.py
   ```

This will generate the `shelter_resources.pkl` model file used for resource predictions.

## 📊 API Endpoints

### Authentication
- `POST /api/auth/login/` - User login
- `POST /api/auth/register/` - User registration
- `POST /api/auth/logout/` - User logout

### Disasters
- `GET /api/disasters/` - List all disasters
- `POST /api/disasters/` - Report new disaster
- `GET /api/disasters/{id}/` - Get disaster details
- `PUT /api/disasters/{id}/` - Update disaster
- `DELETE /api/disasters/{id}/` - Delete disaster

### Shelters
- `GET /api/shelters/` - List all shelters
- `POST /api/shelters/` - Add new shelter
- `GET /api/shelters/{id}/` - Get shelter details
- `PUT /api/shelters/{id}/` - Update shelter
- `DELETE /api/shelters/{id}/` - Delete shelter

### Volunteers
- `GET /api/volunteers/` - List all volunteers
- `POST /api/volunteers/` - Register new volunteer
- `GET /api/volunteers/{id}/` - Get volunteer details
- `PUT /api/volunteers/{id}/` - Update volunteer
- `DELETE /api/volunteers/{id}/` - Delete volunteer

### Predictions
- `GET /api/predictions/` - Get resource predictions
- `POST /api/predictions/` - Generate new predictions

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the backend directory:

```env
SECRET_KEY=your-secret-key
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
DATABASE_URL=sqlite:///db.sqlite3
STRIPE_SECRET_KEY=your-stripe-secret-key
STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key
```

### Database Configuration
The application uses SQLite by default. For production, consider using PostgreSQL or MySQL:

```python
# settings.py
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'your_db_name',
        'USER': 'your_db_user',
        'PASSWORD': 'your_db_password',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}
```

## 🧪 Testing

### Backend Tests
```bash
cd disaster_backend
python manage.py test
```

### Frontend Tests
```bash
cd disaster_frontend
npm test
```

## 🚀 Deployment

### Backend Deployment
1. Set `DEBUG=False` in settings
2. Configure production database
3. Set up static file serving
4. Configure environment variables
5. Use Gunicorn or uWSGI for production server

### Frontend Deployment
1. Build the production version:
   ```bash
   npm run build
   ```
2. Deploy the `build` folder to your hosting service
3. Configure API endpoints for production

---

**Note**: This application is designed for disaster response scenarios. Ensure proper testing and validation before using in critical emergency situations.
