# FDP Mobile

- FDP Mobile - mobile client for iOS and Android devices that allows to manage personal storage files, so that you can access your personal data securely on the go.
- FDP Mobile use  https://github.com/fairDataSociety/fdp-storage
- FDP Mobile was created with https://docs.expo.dev/

- Build for Android: https://expo.dev/artifacts/eas/s8rrL4MGUmWhYYCjtDAG36.aab
- Video demo: https://youtu.be/vl7UkoUlWxw

# Run locally
Clone this repo and run.
1. `npm install`
2. `npm install --global expo-cli`
3. `expo start`
4. To open the app:
On your iPhone or iPad, open the default Apple "Camera" app and scan the QR code you see in the terminal.
On your Android device, press "Scan QR Code" on the "Home" tab of the Expo Go app and scan the QR code you see in the terminal.
For build your application you can use this link : https://docs.expo.dev/build/setup/

# Important

The application is based on fdp-play, which is running on an https-enabled server. For testing, you need to deploy your own fdp-play with https and write it in the application configuration.

### For test
- Link to bee node: https://bee-test.bzzwiki.xyz/
- Login: igorigor
- Password: qwerty

### Problem with bee-js for React Native
- Now opening and downloading files does not work in the application due to a bug for React Native:
https://github.com/fairDataSociety/fdp-storage/issues/110#issuecomment-1211908461
https://github.com/ethersphere/bee-js/issues/757
- I undertake to fix this bug in bee-js to bring the application to a fully working state.
