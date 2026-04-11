
export const handleShare = async () => {
  const shareData = {
    title: 'Güncel Sınav Bilgileri',
    text: 'Öğretmenler için güncel sınav görevleri ve ücretleri rehberi. Hemen indir:',
    url: 'https://onelink.to/guncelsinav' // Kullanıcı bu linki onelink ile değiştirebilir
  };

  try {
    if (navigator.share) {
      await navigator.share(shareData);
    } else {
      // Fallback for browsers that don't support navigator.share
      const shareText = `${shareData.text} ${shareData.url}`;
      const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
      window.open(whatsappUrl, '_blank');
    }
  } catch (err) {
    console.log('Paylaşım iptal edildi veya bir hata oluştu:', err);
  }
};
