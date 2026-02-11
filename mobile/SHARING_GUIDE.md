# How to Share the App for Testing

Since the project uses Expo, you have two primary ways to share the app with friends or testers.

## Option 1: Development Build (Quickest)

This method allows your friend to run the app using the **Expo Go** app on their phone. This is ideal for quick feedback during development.

### Steps:
1.  **Ask your friend to install Expo Go**:
    *   **Android**: Install from Google Play Store ([Expo Go](https://play.google.com/store/apps/details?id=host.exp.exponent)).
    *   **iOS**: Install from App Store ([Expo Go](https://apps.apple.com/us/app/expo-go/id982107779)). Note: On iOS, they might need to be logged into your Expo account or be part of your team.

2.  **Start the Development Server with Tunnel**:
    Run the following command in your terminal (`mobile/` directory):
    ```bash
    npx expo start --tunnel
    ```
    *   This generates a QR code.
    *   The `--tunnel` flag ensures the connection works even if you and your friend are on different Wi-Fi networks.

3.  **Share the QR Code or URL**:
    *   Send the QR code screenshot to your friend.
    *   Or copy the URL (e.g., `exp://...`) from the terminal and send it to them.

## Option 2: Build a Standalone APK (Android Only)

This method generates an installable `.apk` file that you can send directly (e.g., via WhatsApp, Email). It requires setting up EAS (Expo Application Services).

### Prerequisites:
1.  Install EAS CLI: `npm install -g eas-cli`
2.  Log in to Expo: `eas login`
3.  Configure the project: `eas build:configure` (Select `Android`)

### Steps to Build:
1.  Modify `eas.json` to include a profile for APK generation (add this inside `build`):
    ```json
    "preview": {
      "android": {
        "buildType": "apk"
      }
    }
    ```
2.  Run the build command:
    ```bash
    eas build -p android --profile preview
    ```
3.  Wait for the build to finish. EAS will provide a download link for the `.apk` file.
4.  Download the `.apk` and send it to your friend. They can install it directly on their Android device.

## Option 3: Publish with EAS Update (Coming Soon)

Once you have a standalone app installed on their phone, you can push updates instantly using `eas update`. This is advanced and requires the app to be built first.
