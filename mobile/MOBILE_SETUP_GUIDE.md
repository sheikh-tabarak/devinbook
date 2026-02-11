# DevinBook Mobile App - Complete Setup & Testing Guide

## 📱 Overview

This is the **DevinBook Mobile App** built with **React Native** and **Expo**. It works on both **Android** and **iOS** platforms and uses the same backend APIs as the web application.

---

## 🎯 Project Structure

```
mobile/
├── App.tsx                 # Main app entry point
├── app.json               # Expo configuration
├── package.json           # Dependencies
├── src/
│   ├── screens/           # All app screens
│   ├── components/        # Reusable components
│   ├── navigation/        # Navigation setup
│   ├── services/          # API services
│   ├── contexts/          # React contexts (Auth, Theme)
│   ├── types/             # TypeScript types
│   ├── utils/             # Utility functions
│   └── constants/         # Constants (colors, API URLs)
└── assets/                # Images, fonts, icons
```

---

## 🚀 Getting Started

### Prerequisites

1. **Node.js** (v16 or higher) - Already installed ✅
2. **Expo CLI** - Installed via npx ✅
3. **Expo Go App** - Download on your iPhone from App Store
4. **Android Studio** (Optional - for Android emulator on Windows)

### Installation

Dependencies are already installed! If you need to reinstall:

```bash
cd mobile
npm install
```

---

## 🧪 Testing on Windows

### Method 1: Using Your iPhone (Recommended for iOS Testing)

1. **Install Expo Go on your iPhone:**
   - Open App Store
   - Search for "Expo Go"
   - Install the app

2. **Start the development server:**
   ```bash
   cd mobile
   npm start
   ```

3. **Connect your iPhone:**
   - Make sure your iPhone and Windows PC are on the **same Wi-Fi network**
   - Open Expo Go app on your iPhone
   - Scan the QR code shown in the terminal or browser
   - The app will load on your iPhone!

4. **Live Reload:**
   - Any changes you make to the code will automatically reload on your phone
   - Shake your phone to open the developer menu

### Method 2: Using Android Emulator on Windows

1. **Install Android Studio:**
   - Download from: https://developer.android.com/studio
   - During installation, make sure to install Android SDK and Android Virtual Device (AVD)

2. **Create an Android Virtual Device:**
   - Open Android Studio
   - Go to Tools → Device Manager
   - Click "Create Device"
   - Select a device (e.g., Pixel 5)
   - Select a system image (e.g., Android 13)
   - Finish setup

3. **Start the emulator:**
   - Open Android Studio → Device Manager
   - Click the play button next to your virtual device

4. **Run the app:**
   ```bash
   cd mobile
   npm run android
   ```

### Method 3: Using Web Browser (For Quick Testing)

```bash
cd mobile
npm run web
```

This opens the app in your browser at `http://localhost:8081`

**Note:** Some native features won't work in web mode.

---

## 📱 Testing on Your iPhone

### Option A: Expo Go (Development)

**Pros:**
- Instant updates
- No build required
- Perfect for development

**Cons:**
- Requires internet connection
- Limited to Expo SDK features

**Steps:**
1. Install Expo Go from App Store
2. Run `npm start` in the mobile folder
3. Scan QR code with Expo Go app

### Option B: Build Standalone App (Production-like)

**For iOS (Requires Apple Developer Account - $99/year):**

1. **Install EAS CLI:**
   ```bash
   npm install -g eas-cli
   ```

2. **Login to Expo:**
   ```bash
   eas login
   ```

3. **Configure the build:**
   ```bash
   eas build:configure
   ```

4. **Build for iOS:**
   ```bash
   eas build --platform ios
   ```

5. **Install on iPhone:**
   - After build completes, you'll get a download link
   - Open link on your iPhone
   - Follow instructions to install

**For Testing Without Developer Account:**
- Use Expo Go (Option A above)
- Or use TestFlight (requires developer account)

---

## 🔧 Configuration

### Backend API Configuration

The app is configured to connect to your backend. Update the API URL in:

**File: `mobile/src/constants/config.ts`**

```typescript
// For local testing on same network
export const API_URL = 'http://192.168.1.21:5000/api';

// For production
// export const API_URL = 'https://your-backend-url.com/api';
```

**Important:** 
- Replace `192.168.1.21` with your Windows PC's local IP address
- To find your IP: Run `ipconfig` in Windows Command Prompt, look for "IPv4 Address"
- Make sure your phone and PC are on the same Wi-Fi network

### App Configuration

**File: `mobile/app.json`**

```json
{
  "expo": {
    "name": "DevinBook",
    "slug": "devinbook",
    "version": "1.3.3",
    "icon": "./assets/icon.png",
    "splash": {
      "image": "./assets/splash.png",
      "backgroundColor": "#8B5CF6"
    }
  }
}
```

---

## 🎨 Design System

The mobile app uses the **same design system** as the web app:

- **Primary Color:** `#8B5CF6` (Purple)
- **Secondary Color:** `#D946EF` (Pink)
- **Typography:** System fonts (San Francisco on iOS, Roboto on Android)
- **Components:** Custom components matching web design

---

## 📂 Key Files Explained

### `App.tsx`
Main entry point that sets up navigation and providers.

### `src/navigation/AppNavigator.tsx`
Handles all navigation logic (Auth stack, Main tabs, etc.)

### `src/services/api.ts`
Centralized API service for all backend calls.

### `src/contexts/AuthContext.tsx`
Manages authentication state across the app.

### `src/screens/`
All screen components (Login, Dashboard, Transactions, etc.)

---

## 🐛 Troubleshooting

### "Unable to connect to development server"
- Make sure your phone and PC are on the same Wi-Fi
- Check if firewall is blocking port 8081
- Try restarting the Expo server

### "Network request failed"
- Check API_URL in config.ts
- Make sure backend server is running (`npm run dev:server` from root)
- Verify your PC's IP address hasn't changed

### "Module not found"
```bash
cd mobile
rm -rf node_modules
npm install
```

### App crashes on startup
- Check the error in Expo Go app
- Look at terminal logs
- Try clearing cache: `npm start --clear`

---

## 📦 Building for Production

### Android APK

```bash
eas build --platform android --profile preview
```

### iOS IPA (Requires Apple Developer Account)

```bash
eas build --platform ios --profile preview
```

### Submit to App Stores

```bash
# Android
eas submit --platform android

# iOS
eas submit --platform ios
```

---

## 🔄 Development Workflow

1. **Start backend server:**
   ```bash
   # From project root
   npm run dev:server
   ```

2. **Start mobile app:**
   ```bash
   cd mobile
   npm start
   ```

3. **Make changes:**
   - Edit files in `src/`
   - App auto-reloads on save

4. **Test on device:**
   - Scan QR code with Expo Go
   - Test features
   - Check console for errors

---

## 📊 Features Implemented

✅ Authentication (Login/Register)
✅ Dashboard with statistics
✅ Transaction management (Add/Edit/Delete)
✅ Category management
✅ Account management
✅ Reports and analytics
✅ Dark/Light theme
✅ Offline support (coming soon)
✅ Push notifications (coming soon)

---

## 🎯 Next Steps

1. **Test on your iPhone** using Expo Go
2. **Customize the design** to match your brand
3. **Add more features** as needed
4. **Build for production** when ready
5. **Submit to App Stores**

---

## 📞 Support

If you encounter any issues:

1. Check this guide first
2. Look at Expo documentation: https://docs.expo.dev
3. Check React Native docs: https://reactnative.dev
4. Search for errors on Stack Overflow

---

## 🎉 Quick Start Commands

```bash
# Start development server
npm start

# Run on Android emulator
npm run android

# Run on iOS simulator (Mac only)
npm run ios

# Run in web browser
npm run web

# Clear cache and restart
npm start --clear
```

---

**Happy Coding! 🚀**
