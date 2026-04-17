
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { Share } from '@capacitor/share';
import { Capacitor } from '@capacitor/core';

export const handleShare = async () => {
  let shareUrl = 'https://onelink.to/guncelsinav'; // Varsayılan link
  
  try {
    const settingsDoc = await getDoc(doc(db, 'settings', 'app_config'));
    if (settingsDoc.exists()) {
      const data = settingsDoc.data();
      if (data.shareUrl) {
        shareUrl = data.shareUrl;
      }
    }
  } catch (err) {
    console.log('Link çekilirken hata oluştu, varsayılan kullanılıyor:', err);
  }

  const shareData = {
    title: 'Güncel Sınav Bilgileri',
    text: 'Öğretmenler için güncel sınav görevleri ve ücretleri rehberi. Hemen indir:',
    url: shareUrl,
    dialogTitle: 'Arkadaşlarınla Paylaş'
  };

  try {
    // Eğer gerçek bir cihazdaysak (iOS/Android)
    if (Capacitor.isNativePlatform()) {
      await Share.share({
        title: shareData.title,
        text: shareData.text,
        url: shareData.url,
        dialogTitle: shareData.dialogTitle,
      });
    } 
    // Web tarayıcısı veya önizleme ekranındaysak
    else if (navigator.share) {
      await navigator.share(shareData);
    } 
    else {
      const shareText = `${shareData.text} ${shareData.url}`;
      await navigator.clipboard.writeText(shareText);
      alert("Paylaşım linki başarıyla kopyalandı! İstediğiniz yere yapıştırıp paylaşabilirsiniz.");
      
      const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
      window.open(whatsappUrl, '_blank');
    }
  } catch (err) {
    console.log('Paylaşım işlemi sırasında bir durum oluştu:', err);
  }
};
