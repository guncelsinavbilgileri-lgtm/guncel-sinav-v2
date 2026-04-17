
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

export const handleShare = async () => {
  let shareUrl = 'https://onelink.to/guncelsinav'; // Varsayılan link
  
  try {
    // Veritabanından güncel linki çekmeye çalışalım
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
    url: shareUrl
  };

  try {
    if (navigator.share) {
      await navigator.share(shareData);
    } else {
      const shareText = `${shareData.text} ${shareData.url}`;
      const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
      window.open(whatsappUrl, '_blank');
    }
  } catch (err) {
    console.log('Paylaşım iptal edildi veya bir hata oluştu:', err);
  }
};
