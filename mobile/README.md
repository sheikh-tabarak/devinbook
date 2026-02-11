# 📱 DevinBook Mobile App

A cross-platform mobile application for iOS and Android built with React Native and Expo.

## 🎯 Overview

DevinBook Mobile is the companion app for the DevinBook expense tracking platform. It provides a native mobile experience with the same features and design as the web application.

## ✨ Features

- ✅ **Authentication** - Secure login and registration
- ✅ **Dashboard** - Real-time expense overview with statistics
- ✅ **Transactions** - Add, edit, and view transactions
- ✅ **Categories** - Manage expense categories
- ✅ **Accounts** - Track multiple accounts
- ✅ **Reports** - Visual analytics and insights
- ✅ **Offline Support** - Work without internet (coming soon)
- ✅ **Push Notifications** - Stay updated (coming soon)

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- Expo Go app on your phone
- Backend server running

### Installation
```bash
cd mobile
npm install
```

### Configuration
1. Update `src/constants/config.ts` with your backend URL:
```typescript
export const API_URL = 'http://YOUR_IP:5000/api';
```

2. Start the app:
```bash
npm start
```

3. Scan QR code with Expo Go app

## 📖 Documentation

- **[QUICK_START.md](./QUICK_START.md)** - Get started in 5 minutes
- **[MOBILE_SETUP_GUIDE.md](./MOBILE_SETUP_GUIDE.md)** - Complete setup guide

## 🏗️ Architecture

```
src/
├── components/      # Reusable UI components
├── screens/         # App screens
├── navigation/      # Navigation configuration
├── contexts/        # React contexts (Auth, Theme)
├── services/        # API services
├── constants/       # App constants and theme
├── types/           # TypeScript definitions
└── utils/           # Utility functions
```

## 🎨 Design System

The mobile app uses the same design system as the web application:

- **Primary Color:** `#8B5CF6` (Purple)
- **Secondary Color:** `#D946EF` (Pink)
- **Gradient:** Linear gradient from primary to secondary
- **Typography:** System fonts (SF Pro on iOS, Roboto on Android)

## 🔧 Development

### Available Scripts

```bash
npm start          # Start development server
npm run android    # Run on Android emulator
npm run ios        # Run on iOS simulator (Mac only)
npm run web        # Run in web browser
```

### Testing on Devices

#### iOS (iPhone)
1. Install Expo Go from App Store
2. Scan QR code from terminal
3. App loads automatically

#### Android
1. Install Expo Go from Play Store
2. Scan QR code from terminal
3. App loads automatically

## 🌐 API Integration

The mobile app connects to the same backend as the web application:

- **Base URL:** Configured in `src/constants/config.ts`
- **Authentication:** JWT tokens stored in AsyncStorage
- **Endpoints:** All REST API endpoints from backend

## 📦 Building for Production

### iOS
```bash
eas build --platform ios
```

### Android
```bash
eas build --platform android
```

## 🐛 Troubleshooting

### Common Issues

**1. Can't connect to backend**
- Ensure backend is running
- Check API_URL in config.ts
- Verify phone and PC are on same Wi-Fi

**2. App won't load**
- Clear cache: `npm start --clear`
- Restart Expo server
- Check terminal for errors

**3. Build errors**
- Delete node_modules: `rm -rf node_modules`
- Reinstall: `npm install`
- Clear Expo cache: `expo start --clear`

## 📱 Supported Platforms

- ✅ iOS 13.0+
- ✅ Android 5.0+
- ✅ Web (for testing)

## 🔐 Security

- JWT token authentication
- Secure storage with AsyncStorage
- HTTPS in production
- Input validation
- Error handling

## 🚧 Roadmap

- [ ] Offline mode with local database
- [ ] Push notifications
- [ ] Biometric authentication
- [ ] Dark mode
- [ ] Multiple languages
- [ ] Export reports to PDF
- [ ] Budget tracking
- [ ] Recurring transactions

## 📄 License

This project is part of the DevinBook platform.

## 🤝 Support

For issues and questions:
- Check documentation files
- Review troubleshooting section
- Contact development team

---

**Built with ❤️ by Devinsol**
