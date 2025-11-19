# Bupa Arabia Mobile App

A comprehensive mobile insurance and digital health application built with React and Tailwind CSS, featuring the Bupa blue color scheme (#005EB8).

## 🎯 Overview

This is a full-featured mobile application that combines insurance management with digital health services. The app provides users with easy access to their benefits, appointments, claims, and healthcare services all in one place.

## ✨ Key Features

### 🔐 Authentication Flow
- **Splash Screen**: Animated brand introduction with the Bupa logo and tagline
- **Login**: Multiple login methods (Phone, Email, National ID/IQAMA)
- **OTP Verification**: Secure 6-digit OTP with auto-detection and countdown timer
- **Onboarding**: 3 interactive slides introducing key app features

### 🏠 Main Dashboard
The central hub featuring 8 main service tiles:
- Digital Consultation
- Appointments Management
- Claims & Reimbursement
- Order Medication
- Home Lab Services
- Vaccination Requests
- Benefits Overview
- AI Assistant

### 🤖 AI Assistant
- **Conversational Interface**: ChatGPT-style chat interface
- **Voice Commands**: Hold-to-speak voice input with visual feedback
- **Quick Actions**: Smart button suggestions based on context
- **Intelligent Responses**: Contextual answers about benefits, appointments, claims, and more
- **Real-time Typing Indicators**: Shows when AI is processing

### 🩺 Digital Consultation
- **Specialty Selection**: Choose from 8+ medical specialties
- **Doctor Profiles**: View detailed doctor information including:
  - Ratings and reviews
  - Hospital affiliation
  - Years of experience
  - Languages spoken
  - Next available slot
- **Time Slot Booking**: Calendar view with available times
- **Consultation Type**: Choose between video or audio call
- **Confirmation Flow**: 4-step booking process with progress indicator

### 📅 Appointments Management
- **Upcoming Appointments**: View all scheduled appointments
- **Past History**: Access previous appointment records
- **Quick Actions**:
  - Join video calls (for today's appointments)
  - Navigate to hospital location
  - Reschedule or cancel
- **Appointment Details**: Complete information including doctor, specialty, date, time, location

### 💊 Order Medication
- **Current Prescriptions**: View all refillable medications
- **Coverage Information**: See co-pay and coverage status
- **Multi-select**: Order multiple medications at once
- **Delivery Tracking**: Estimated delivery times
- **Order History**: Track past medication orders
- **Smart Indicators**: Shows refills remaining and next refill date

### 🧪 Home Lab Services
- **Available Tests**: 5+ common lab tests including:
  - Complete Blood Count (CBC)
  - Thyroid Function Test
  - Blood Glucose
  - Vitamin D
  - Lipid Profile
- **Home Visit Booking**: Schedule technician visits
- **Fasting Requirements**: Clear indicators for tests requiring fasting
- **Results Access**: Download past lab reports as PDFs
- **Coverage Details**: View pricing and co-pay information

### 💉 Vaccination Services
- **Available Vaccines**: Comprehensive vaccine list with eligibility
- **Recommended Vaccines**: AI-powered recommendations based on user profile
- **Location Options**: Choose between clinic visit or home service
- **Vaccination History**: Track past vaccinations and next due dates
- **Coverage Status**: See which vaccines are fully covered

### 🏥 Insurance Benefits
- **25 Coverage Areas**: Complete breakdown including:
  - Inpatient Hospitalization
  - Outpatient Services
  - Emergency Services
  - Maternity & Newborn Care
  - Dental, Optical, Mental Health
  - And 18+ more specialty areas
- **Utilization Tracking**: Visual progress bars showing usage:
  - Green (0-49%): Good
  - Orange (50-79%): Fair
  - Red (80-100%): High utilization
- **Detailed Descriptions**: What each benefit means for users
- **Min/Max Coverage**: Clear minimum and maximum coverage amounts
- **Search Functionality**: Quickly find specific benefits

### 🏥 Hospital Network Coverage
- **Partner Hospitals**: Complete list of network hospitals
- **Coverage Details**: View per hospital:
  - Outpatient coverage (co-pay & deductible)
  - Inpatient coverage (co-pay & deductible)
- **Visit Tracking**: Monitor visits used vs. allowed with color-coded progress
- **Specialty Information**: See available specialties at each hospital
- **Eligibility Badges**: Visual indicators (Full Coverage, Partial, Not Covered)
- **Quick Actions**: Call hospital or get navigation directions
- **Search**: Filter hospitals by name, city, or specialty

### 📋 Claims & Timeline
- **Submit Claims**: AI-powered chatbot interface for claims submission
- **Document Upload**: Three separate upload categories:
  - Medical Invoice/Receipt (required)
  - Medical Report/Prescription (required)
  - Additional Documents (optional)
- **Smart Validation**: Real-time validation with visual status indicators
- **Claims History**: View past claims with status tracking
- **Timeline View**: Track claim progress through review stages

### 👤 Profile Management
- **User Information**: Complete profile including:
  - Member ID
  - IQAMA Number
  - Plan type and renewal date
  - Contact information
- **Family Members**: Manage dependents
- **Quick Access**: Insurance card, medical history, addresses, settings
- **Logout**: Secure logout returning to login screen

### 🧭 Navigation
- **Bottom Navigation Bar**: 5 main sections:
  - Home
  - Appointments
  - Benefits
  - Profile
  - AI Assistant (floating button)
- **Breadcrumb Navigation**: Easy back navigation throughout the app
- **Contextual Links**: Smart navigation between related features

## 🎨 Design System

### Color Scheme
- **Primary Blue**: #005EB8 (Bupa Arabia brand color)
- **Secondary Blues**: #00A3E0, #0077D4, #0091EA
- **Status Colors**:
  - Green: Success, low utilization
  - Orange: Warning, medium utilization
  - Red: Alert, high utilization
  - Yellow: Pending, attention needed

### Typography
- Clean, readable fonts
- Hierarchical text sizes
- Consistent spacing and line heights

### Components
- **Cards**: Elevated white cards with subtle shadows
- **Buttons**: Rounded, accessible with clear states
- **Progress Bars**: Horizontal bars with color-coded status
- **Badges**: Color-coded tags for status and categories
- **Icons**: Lucide React icons styled in Bupa blue

### Mobile-First Design
- Optimized for mobile viewports
- Touch-friendly tap targets
- Smooth animations and transitions
- Bottom navigation for thumb-friendly access

## 🛠 Technical Stack

- **React**: Component-based UI framework
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling
- **Motion/React**: Smooth animations (formerly Framer Motion)
- **Shadcn/ui**: High-quality UI components
- **Lucide React**: Beautiful icon library

## 📱 User Flow

1. **App Launch**: Splash screen → Login → OTP → Onboarding
2. **Main Dashboard**: Central hub with all features accessible
3. **Feature Navigation**: Tap any service tile to access that feature
4. **AI Assistant**: Available from floating button on bottom nav
5. **Bottom Navigation**: Quick access to most-used sections
6. **Profile**: Access settings, dependents, and logout

## 🔑 Key Highlights

- **Comprehensive Coverage**: All major insurance and health services in one app
- **AI-Powered**: Intelligent chatbot for claims and general assistance
- **Visual Utilization**: Clear progress bars show benefit usage
- **Hospital Network**: Detailed hospital coverage with visit tracking
- **Multi-Service**: From consultations to lab tests to vaccinations
- **User-Friendly**: Intuitive navigation with clear visual hierarchy
- **Accessible**: Large touch targets and readable text
- **Secure**: OTP verification and secure logout

## 📄 Components Structure

```
/components
├── SplashScreen.tsx          # Animated app intro
├── Login.tsx                 # Multi-method authentication
├── OTPVerification.tsx       # 6-digit OTP with timer
├── Onboarding.tsx           # 3-slide introduction
├── Dashboard.tsx            # Main hub with 8 service tiles
├── Home.tsx                 # Alternative home with AI suggestions
├── AIAssistant.tsx          # Chat + voice AI interface
├── DigitalConsultation.tsx  # Book doctor consultations
├── Appointments.tsx         # Manage appointments
├── Medication.tsx           # Order prescriptions
├── HomeLab.tsx              # Book home lab tests
├── Vaccination.tsx          # Request vaccinations
├── Benefits.tsx             # View insurance benefits
├── HospitalNetwork.tsx      # Hospital coverage details
├── ClaimsTimeline.tsx       # Claims history
├── SubmitReimbursement.tsx  # AI claims submission
└── Profile.tsx              # User profile & settings
```

## 🚀 Getting Started

The app starts with the splash screen and guides users through authentication before accessing the main dashboard. All features are accessible from the central dashboard or bottom navigation.

## 🎯 Future Enhancements

- Real-time notifications for appointments and claims
- Integration with health tracking devices
- Telemedicine video call implementation
- Prescription refill reminders
- Family account switching
- Document scanning with OCR
- Multi-language support (Arabic/English)
- Dark mode theme

---

**Built with ❤️ for Bupa Arabia**
*Your Health, Connected.*
