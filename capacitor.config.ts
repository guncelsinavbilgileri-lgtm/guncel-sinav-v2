import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'guncel.sinav.bilgileri',
  appName: 'Güncel Sınav Bilgileri',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
