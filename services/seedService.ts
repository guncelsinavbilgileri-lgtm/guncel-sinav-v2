import { setNewsItem, clearNews } from './newsService';
import { addExamDetail, addFeeDetail, addHowToApply, addAcademicCalendar } from './examService';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

export const seedDatabase = async () => {
  console.log("Starting seed process...");
  try {
    const initialNews = [
      {
        id: 'news_1',
        title: 'Kasım Seminerlerinde Süre Uzatıldı',
        date: '2025-11-20',
        imageUrl: 'https://images.unsplash.com/photo-1524178232363-1fb28f74b671?auto=format&fit=crop&q=80&w=600',
        content: 'Kasım 2025 ara tatilinde tamamlanması gereken Mesleki Çalışma Seminer eğitimi, teknik aksaklıklar ve sitede oluşan yoğunluk nedeniyle zorlukla tamamlanabilmişti. Tamamlayamayan öğretmenler için eğitimler 23 Kasım Pazar saat 23:59\'a kadar uzatıldı.',
        category: 'Sınav',
        order: 1
      },
      {
        id: 'news_2',
        title: 'Kasım 2025 Seminerleri',
        date: '2025-11-07',
        imageUrl: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=600',
        content: 'Milli Eğitim Bakanlığı Kasım 2025 ara tatilinde yapılacak Mesleki Çalışma Seminerlerini açıkladı.',
        category: 'Sınav',
        order: 2
      }
    ];

    console.log("Seeding news...");
    for (const item of initialNews) {
      const { id, ...newsData } = item;
      await setNewsItem(newsData, id);
    }

    console.log("Seeding exam details...");
    const initialExamDetail = {
      title: 'Güncel Sınavlar',
      lastUpdate: '11/04/2026',
      content: `Başvuruya açık **1** sınavda toplam **3** oturum listelenmiştir.

## AÖF SINAVLARI:
1. Güz Dönem Sonu Sınavı
Toplam 3 oturum görevi vardır.

| Son Başvuru Tarih - Saat | Sınav Tarih - Saat |
| :--- | :--- |
| 24.12.2025 - 23:59 | 17.01.2026 - 09:00 |
| | 17.01.2026 - 13:00 |
| | 18.01.2026 - 09:00 |
`,
      imageUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=800'
    };
    await addExamDetail(initialExamDetail, '1');

    console.log("Seeding fee details...");
    const initialFeeDetail = {
      title: 'Sınav Ücretleri',
      lastUpdate: '11/04/2026',
      content: `## MEB:
| Görev | Net Ücret |
| :--- | :--- |
| Salon Başkanı | 1.626 TL |
| Gözetmen | 1.577 TL |
| Yedek Gözetmen | 1.182 TL |

## ÖSYM:
| Görev | Net Ücret |
| :--- | :--- |
| Salon Başkanı | 1.370 TL |
| Gözetmen | 1.226 TL |

### ÖNEMLİ NOTLAR:
Hesaplara yatan net ücretler; vergi dilimi ve kesintilere göre değişiklik gösterebilir. Lütfen resmi duyuruları takip ediniz.
`,
      imageUrl: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?q=80&w=800&auto=format&fit=crop'
    };
    await addFeeDetail(initialFeeDetail, '1');

    console.log("Seeding how to apply...");
    const initialHowToApply = {
      title: 'Nasıl Başvurulur?',
      lastUpdate: '11/04/2026',
      content: `## Sınav Görevi Başvuru Adımları

Sınav görevlerine başvurmak için aşağıdaki adımları takip edebilirsiniz:

### 1. MEB Sınavları (GİS)
* **MEBBİS** şifrenizle sisteme giriş yapın.
* **Sınav İşlemleri** modülüne tıklayın.
* **Sınav Görevi İsteği** menüsünden aktif sınavları seçin.

### 2. ÖSYM Sınavları (GİS)
* **ÖSYM GİS** (Görevli İşlemleri Sistemi) adresine gidin.
* E-Devlet veya ÖSYM şifrenizle giriş yapın.
* **Tercih Süreci**ndeki sınavlar arasından seçim yapın.

### 3. Anadolu Üniversitesi (AUGİS)
* **AUGİS** sistemine giriş yapın.
* Profil bilgilerinizin güncel olduğundan emin olun.
* Aktif görev taleplerini onaylayın.

> **NOT:** Başvuru yaptıktan sonra onay sürecini takip etmeyi ve görev çıktılarınızı almayı unutmayın!
`,
      imageUrl: 'https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&q=80&w=800'
    };
    await addHowToApply(initialHowToApply, '1');

    console.log("Seeding academic calendar...");
    const initialCalendar = {
      title: '2025-2026 Akademik Takvim',
      lastUpdate: '11/04/2026',
      content: `## 2025-2026 Eğitim Öğretim Yılı Takvimi

Milli Eğitim Bakanlığı tarafından açıklanan resmi takvim bilgileridir:

### Okul Açılış ve Kapanış
* **Okulların Açılması:** 8 Eylül 2025
* **Okulların Kapanması:** 26 Haziran 2026

### Ara Tatiller ve Yarıyıl Tatili
* **1. Dönem Ara Tatili:** 10-14 Kasım 2025
* **Yarıyıl Tatili (15 Tatil):** 19-30 Ocak 2026
* **2. Dönem Ara Tatili:** 6-10 Nisan 2026

### Önemli Hatırlatmalar
* Tatil tarihleri hafta sonları ile birleşmektedir.
* Resmi tatiller (29 Ekim, 23 Nisan, 19 Mayıs vb.) ayrıca tatil ilan edilir.
`,
      imageUrl: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&q=80&w=800'
    };
    await addAcademicCalendar(initialCalendar, '1');

    console.log("Seeding app settings...");
    await setDoc(doc(db, 'settings', 'app_config'), {
      shareUrl: 'https://onelink.to/guncelsinav',
      privacyUrl: 'https://guncelsinav.com/privacy',
      termsUrl: 'https://guncelsinav.com/terms',
      updatedAt: serverTimestamp()
    });

    console.log("Seed process completed successfully.");
    return true;
  } catch (error: any) {
    console.error("Seed error:", error);
    // Hatayı yukarı fırlatalım ki Info.tsx yakalayabilsin
    throw error;
  }
};
