# VoyageX Fleet Booking App - Logistics Vehicle Booking System

A comprehensive B2B logistics platform for managing and booking vehicles with real-time availability checking, built with Node.js, React, and MongoDB.

## 📘 Project Overview

VoyageX Fleet Booking App is a modern logistics and fleet management platform designed for seamless vehicle booking and scheduling. Built using the MERN stack (MongoDB, Express.js, React, Node.js), it allows users to search, view, and book transport vehicles based on capacity, route, and availability. The app ensures efficient booking with real-time conflict checks, a user-friendly interface, and secure backend integration.

## 🎯 Key Features

### 🚛 Vehicle Fleet Management
- **Add New Vehicles**: Register vehicles with capacity, tire count, and specifications
- **Fleet Overview**: Complete vehicle inventory management
- **Capacity-based Filtering**: Search vehicles by weight capacity requirements

### 📍 Smart Route & Availability System
- **Real-time Availability**: Check vehicle availability based on route and time
- **Ride Duration Calculation**: Automated estimation using pincode-based logic
- **Conflict Prevention**: Robust booking overlap detection and prevention
- **Time Window Management**: Precise start and end time calculations

### 📅 Booking Management
- **Instant Booking**: Reserve available vehicles with conflict validation
- **Customer Management**: Track bookings by customer ID
- **Race Condition Prevention**: Double-verification before booking confirmation
- **Booking History**: Complete audit trail of all reservations

### 🔐 Authentication & Security
- **JWT-based Authentication**: Secure token-based user authentication
- **User Registration & Login**: Complete signup and signin functionality
- **Protected Routes**: Secure access to booking and management features
- **Role-based Access**: Admin and user role management

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database for vehicles, bookings, and users
- **Mongoose** - MongoDB object modeling
- **JWT** - Authentication tokens
- **bcrypt** - Password hashing
- **Jest** - Unit testing framework

### Frontend
- **React.js** - Frontend framework
- **Axios** - HTTP client for API requests
- **React Router** - Client-side routing
- **Date-time Picker** - Time selection components
- **TailwindCSS or CSS3** - Modern responsive styling

## 📋 API Endpoints

### Vehicle Management
```
POST /api/v1/vehicles/add-vehicle                    # Add new vehicle
GET  /api/v1/vehicles/available/search               # Search available vehicles
```

### Booking System
```
POST /api/v1/booking/book-vehicle/:id                    # Create new booking
PUT /api/v1/booking/cancel-booking/:id                   # Cancel booking (bonus)
GET /api/bookings/user-bookings                          # Get all bookings of a user
GET /api/bookings/user-cancelled-bookings                # Get all canceled bookings of a user
```

### Authentication
```
POST /api/v1/user/register               # User registration
POST /api/v1/user/login                  # User login
GET  /api/v1/user/logout                 # User logout
```

## 🔧 API Specifications

### Add Vehicle
**POST** `/api/v1/vehicles/add-vehicle `
```json
{
  "name": "Truck-001",
  "capacityKg": 5000,
  "tyres": 6
}
```
**Response**: `201 Created` with vehicle object

### Search Available Vehicles
**GET** `/api/v1/vehicles/available/search`
```
Query Parameters:
- capacityRequired: Number (e.g., 500)
- fromPincode: String (e.g., "110001")
- toPincode: String (e.g., "400001")
- startTime: ISO Date (e.g., "2023-10-27T10:00:00Z")
```
**Response**: Array of available vehicles with `estimatedRideDurationHours`

### Create Booking
**POST** `/api/v1/booking/book-vehicle/:id`
```json
{
  "vehicleId": "vehicle_id_here",
  "fromPincode": "110001",
  "toPincode": "400001",
  "startTime": "2023-10-27T10:00:00Z",
  "customerId": "customer_id_here"
}
```
**Responses**:
- `201 Created` - Booking successful
- `409 Conflict` - Vehicle already booked
- `404 Not Found` - Vehicle doesn't exist

## 🧮 Core Logic

### Ride Duration Calculation
```javascript
estimatedRideDurationHours = Math.abs(parseInt(toPincode) - parseInt(fromPincode)) % 24
```
*Note: This is simplified logic for demonstration. Production systems would use actual mapping services.*

### Availability Algorithm
1. Filter vehicles by capacity requirement
2. Calculate ride duration and end time
3. Check for booking conflicts in time window
4. Return available vehicles with duration estimates

### Conflict Prevention
- Double-verification before booking creation
- Race condition handling between search and book operations
- Atomic booking operations with database transactions

## 🏗️ Project Structure

```
fleetlink/
├── backend/
│   ├── controllers/
│   │   ├── vehicleController.js
│   │   ├── bookingController.js
│   │   └── authController.js
│   ├── models/
│   │   ├── Vehicle.js
│   │   ├── Booking.js
│   │   └── User.js
│   ├── middleware/
│   │   └── auth.js
│   ├── routes/
│   │   ├── vehicles.js
│   │   ├── bookings.js
│   │   └── auth.js
│   ├── tests/
│   │   ├── vehicle.test.js
│   │   └── booking.test.js
│   └── app.js
│   └── index.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── AddVehicle.js
│   │   │   ├── SearchAndBook.js
│   │   │   └── BookingResults.js
│   │   ├── pages/
│   │   │   ├── Login.js
│   │   │   ├── Dashboard.js
│   │   │   └── VehicleManagement.js
│   │   ├── services/
│   │   │   └── api.js
│   │   └── App.js
│   └── public/
├── docker-compose.yml
├── .env
└── README.md
```

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v16+)
- MongoDB (v5.0+)
- npm or yarn

### Quick Start
1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd fleetlink
   ```

2. **Install dependencies**
   ```bash
   # Backend
   npm install
   
   # Frontend
   cd frontend
   npm install
   cd ..
   ```

3. **Environment Setup**
   Create `.env` file:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/fleetlink
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRE=7d
   NODE_ENV=development
   ```

4. **Start MongoDB**
   ```bash
   mongod
   ```

5. **Run the application**
   ```bash
   # Backend (Terminal 1)
   npm run dev
   
   # Frontend (Terminal 2)
   cd frontend
   npm run dev
   ```
6. **Run Both the applications**
   ```bash
   cd frontend
   npm run dev
   ```
### 🐳 Docker Setup
```bash
# Run entire stack with Docker Compose
docker-compose up -d
```

## 🧪 Testing

### Backend Unit Tests
```bash
# Run all tests
npm test

# Run specific test suites
npm test -- vehicle.test.js
npm test -- booking.test.js
```

### Test Coverage
- Vehicle creation and validation
- Availability checking with overlapping bookings
- Booking conflict detection
- Authentication middleware
- Edge cases and error scenarios

### Postman Testing
Import the provided Postman collection for comprehensive API testing:
- Authentication flows
- Vehicle management operations
- Availability search scenarios
- Booking creation and conflict handling

## 💡 Frontend Features

### Add Vehicle Page
- Form validation for vehicle specifications
- Real-time feedback on submission
- Error handling and success messages

### Search & Book Interface
- Advanced search with multiple criteria
- Date-time picker for booking times
- Real-time availability results
- One-click booking with confirmation

### User Experience
- Loading states for all operations
- Clear error messages and user feedback
- Responsive design for mobile and desktop
- Intuitive navigation and workflows

## 🏆 Bonus Features Implemented

- ✅ **Docker Configuration**: Complete containerization with docker-compose
- ✅ **Enhanced UI/UX**: Loading indicators and improved date pickers
- ✅ **Booking Cancellation**: DELETE endpoint for booking management
- ✅ **Routing**: React Router for navigation
- ✅ **Real-time Validation**: Advanced form validation and feedback

## 🔒 Security Features

- JWT token-based authentication
- Password hashing with bcrypt
- Input validation and sanitization
- Protected API routes
- CORS configuration
- Rate limiting (production ready)

## 📊 Database Schema

### Vehicles Collection
```javascript
{
  name: String,
  capacityKg: Number,
  tyres: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### Bookings Collection
```javascript
{
  vehicleId: ObjectId,
  customerId: String,
  fromPincode: String,
  toPincode: String,
  startTime: Date,
  endTime: Date,
  estimatedRideDurationHours: Number,
  status: String,
  createdAt: Date
}
```

### Users Collection
```javascript
{
  username: String,
  email: String,
  password: String (hashed),
  role: String,
  createdAt: Date
}
```

## 🚀 Deployment

### Production Environment
- Environment-specific configurations
- Database indexes for performance
- Logging and monitoring setup
- Error tracking and alerting

### Scaling Considerations
- Database connection pooling
- Caching for frequent queries
- Load balancing for high availability
- Background job processing for heavy operations

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Write tests for new functionality
4. Ensure all tests pass
5. Commit changes (`git commit -m 'Add amazing feature'`)
6. Push to branch (`git push origin feature/amazing-feature`)
7. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For questions or support, please contact:
- **Email**: ravikumarkush3@gmail.com
- **Documentation**: [API Docs](docs/api.md)
- **Issues**: [GitHub Issues](issues)