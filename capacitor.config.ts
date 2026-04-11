import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.guncelsinav.rehberi',
  appName: 'Güncel Sınav Bilgileri',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
