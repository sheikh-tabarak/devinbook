# 📱 DevinBook Mobile - Testing & Deployment Guide

## 🧪 Testing Guide

### Testing on Windows + iPhone (Your Setup)

#### Method 1: Expo Go (Recommended for Development)

**Advantages:**
- ✅ Instant updates
- ✅ No build required
- ✅ Perfect for development
- ✅ Free

**Steps:**
1. Install Expo Go on iPhone (App Store)
2. Start backend: `npm run dev:server`
3. Start mobile: `cd mobile && npm start`
4. Scan QR code with Expo Go
5. App loads in 1-2 minutes

**Requirements:**
- iPhone and PC on same Wi-Fi
- Backend running on port 5000
- Expo Go app installed

---

### Testing on Android Emulator (Windows)

#### Setup Android Emulator

1. **Download Android Studio**
   - URL: https://developer.android.com/studio
   - Size: ~1GB download
   - Install time: 15-20 minutes

2. **Install Android SDK**
   - During installation, select:
     - Android SDK
     - Android SDK Platform
     - Android Virtual Device (AVD)

3. **Create Virtual Device**
   ```
   Android Studio → Tools → Device Manager → Create Device
   
   Recommended: Pixel 5
   System Image: Android 13 (API 33)
   RAM: 2048 MB
   ```

4. **Start Emulator**
   ```
   Device Manager → Click Play button
   Wait for emulator to boot (2-3 minutes first time)
   ```

5. **Run App**
   ```bash
   cd mobile
   npm run android
   ```

**First Run:**
- Takes 5-10 minutes to build
- Subsequent runs: 30 seconds

---

### Testing in Web Browser (Quick Testing)

```bash
cd mobile
npm run web
```

**Opens:** http://localhost:8081

**Note:** Some native features won't work in web mode (camera, notifications, etc.)

---

## 🔧 Configuration for Different Environments

### Development (Local Testing)

**File:** `mobile/src/constants/config.ts`

```typescript
// For testing on same network (iPhone + Windows PC)
export const API_URL = 'http://192.168.1.21:5000/api';

// Replace 192.168.1.21 with YOUR PC's IP address
// Find it: Run 'ipconfig' in Command Prompt
```

### Production (Deployed Backend)

```typescript
// For production with deployed backend
export const API_URL = 'https://devinbook-api.devinsol.com/api';
```

### Using Tunnel (Testing Outside Local Network)

If you want to test when NOT on same Wi-Fi:

```bash
npm start --tunnel
```

This creates a public URL that works anywhere.

---

## 🚀 Building for Production

### Prerequisites

1. **Install EAS CLI**
   ```bash
   npm install -g eas-cli
   ```

2. **Create Expo Account**
   - Go to: https://expo.dev
   - Sign up for free account

3. **Login**
   ```bash
   eas login
   ```

---

### Building for iOS

#### Requirements:
- Apple Developer Account ($99/year)
- Or use Expo's build service (free tier available)

#### Steps:

1. **Configure Build**
   ```bash
   cd mobile
   eas build:configure
   ```

2. **Build for iOS**
   ```bash
   # Development build (for testing)
   eas build --platform ios --profile development
   
   # Production build (for App Store)
   eas build --platform ios --profile production
   ```

3. **Download & Install**
   - Build completes in 10-20 minutes
   - You'll get a download link
   - Open link on iPhone
   - Install the app

#### Testing Without Developer Account:

Use **Expo Go** (free) or **TestFlight** (requires developer account)

---

### Building for Android

#### Requirements:
- Google Play Developer Account ($25 one-time)
- Or just build APK for testing (free)

#### Steps:

1. **Configure Build**
   ```bash
   cd mobile
   eas build:configure
   ```

2. **Build APK (for testing)**
   ```bash
   eas build --platform android --profile preview
   ```

3. **Build AAB (for Play Store)**
   ```bash
   eas build --platform android --profile production
   ```

4. **Download & Install**
   - Build completes in 10-15 minutes
   - Download APK file
   - Transfer to Android device
   - Install and test

---

## 📦 Submitting to App Stores

### iOS App Store

1. **Build Production Version**
   ```bash
   eas build --platform ios --profile production
   ```

2. **Submit to App Store**
   ```bash
   eas submit --platform ios
   ```

3. **Fill App Store Connect**
   - App name, description, screenshots
   - Privacy policy, support URL
   - App category, pricing

4. **Wait for Review**
   - Usually 1-3 days
   - Apple reviews the app

### Android Play Store

1. **Build Production Version**
   ```bash
   eas build --platform android --profile production
   ```

2. **Submit to Play Store**
   ```bash
   eas submit --platform android
   ```

3. **Fill Play Console**
   - App name, description, screenshots
   - Privacy policy, support email
   - App category, pricing

4. **Wait for Review**
   - Usually few hours to 1 day
   - Google reviews the app

---

## 🧪 Testing Checklist

### Before Building for Production

- [ ] Test all screens
- [ ] Test authentication (login/register/logout)
- [ ] Test API calls (create/read/update/delete)
- [ ] Test on different screen sizes
- [ ] Test on slow network
- [ ] Test offline behavior
- [ ] Test error handling
- [ ] Update API_URL to production
- [ ] Update app version in app.json
- [ ] Test on real devices (not just emulator)

### Pre-Submission Checklist

- [ ] App icon created (1024x1024)
- [ ] Splash screen created
- [ ] Screenshots taken (all required sizes)
- [ ] Privacy policy written
- [ ] Support email/URL set up
- [ ] App description written
- [ ] Keywords selected (iOS)
- [ ] Category selected
- [ ] Pricing decided
- [ ] Age rating determined
- [ ] Test on multiple devices

---

## 🎯 Performance Testing

### Test on Different Networks

1. **Fast Wi-Fi** - Should load instantly
2. **Slow Wi-Fi** - Should show loading states
3. **4G/5G** - Should work smoothly
4. **Offline** - Should show error messages

### Test on Different Devices

1. **Small phones** (iPhone SE) - UI should fit
2. **Large phones** (iPhone 14 Pro Max) - UI should scale
3. **Tablets** (iPad) - Should look good
4. **Old devices** (iPhone 8) - Should run smoothly

---

## 🐛 Common Build Issues

### Issue: "Build failed - Invalid credentials"
**Solution:**
```bash
eas login
# Re-enter credentials
```

### Issue: "Build failed - Bundle identifier already exists"
**Solution:**
Update `app.json`:
```json
"ios": {
  "bundleIdentifier": "com.yourcompany.devinbook"
}
```

### Issue: "Build failed - Missing assets"
**Solution:**
Ensure all assets exist:
- `assets/icon.png` (1024x1024)
- `assets/splash-icon.png`
- `assets/adaptive-icon.png` (Android)

---

## 📊 Build Profiles

Create `eas.json` in mobile folder:

```json
{
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal",
      "android": {
        "buildType": "apk"
      }
    },
    "production": {
      "autoIncrement": true
    }
  }
}
```

---

## 🔐 Security Checklist

Before deploying:

- [ ] Use HTTPS for API (not HTTP)
- [ ] Store sensitive data securely
- [ ] Validate all user inputs
- [ ] Handle errors gracefully
- [ ] Don't log sensitive information
- [ ] Use environment variables
- [ ] Enable SSL pinning (advanced)
- [ ] Implement rate limiting
- [ ] Add authentication timeout
- [ ] Encrypt local storage

---

## 📈 Post-Launch

### Monitoring

1. **Crash Reporting**
   - Use Sentry or Bugsnag
   - Monitor app crashes

2. **Analytics**
   - Use Firebase Analytics
   - Track user behavior

3. **Performance**
   - Monitor API response times
   - Check app load times

### Updates

1. **OTA Updates** (Over-The-Air)
   ```bash
   eas update --branch production
   ```
   - Users get updates without App Store
   - Only for JS changes, not native code

2. **App Store Updates**
   - For native code changes
   - Requires new build and submission

---

## 🎉 Success Metrics

Track these after launch:

- Downloads/Installs
- Daily Active Users (DAU)
- Monthly Active Users (MAU)
- Retention Rate (Day 1, Day 7, Day 30)
- Session Duration
- Crash-Free Rate (aim for 99%+)
- App Store Rating (aim for 4.5+)

---

## 📞 Support

### Resources

- **Expo Docs:** https://docs.expo.dev
- **React Native Docs:** https://reactnative.dev
- **EAS Build:** https://docs.expo.dev/build/introduction
- **App Store Guidelines:** https://developer.apple.com/app-store/review/guidelines
- **Play Store Guidelines:** https://play.google.com/console/about/guides

---

**Good luck with your mobile app! 🚀📱**
