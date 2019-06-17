-- Adminer 4.7.1 MySQL dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

DROP TABLE IF EXISTS `cart`;
CREATE TABLE `cart` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `cart_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


DROP TABLE IF EXISTS `cart_attribute`;
CREATE TABLE `cart_attribute` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cart_id` int(11) NOT NULL,
  `field` varchar(255) NOT NULL,
  `value` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `cart_id` (`cart_id`),
  CONSTRAINT `cart_attribute_ibfk_1` FOREIGN KEY (`cart_id`) REFERENCES `cart` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


DROP TABLE IF EXISTS `category`;
CREATE TABLE `category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category_sector_id` int(11) NOT NULL,
  `parent_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `category_sector_id` (`category_sector_id`),
  CONSTRAINT `category_ibfk_1` FOREIGN KEY (`category_sector_id`) REFERENCES `category_sector` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `category` (`id`, `category_sector_id`, `parent_id`, `name`, `image`, `created_at`, `updated_at`) VALUES
(1,	1,	0,	'Kuliner',	'kuliner.png',	'2019-06-12 06:06:48',	'2019-06-12 06:06:48'),
(2,	1,	0,	'Craft',	'craft.png',	'2019-06-12 06:06:48',	'2019-06-12 06:06:48'),
(3,	1,	0,	'Fashion',	'fashion.png',	'2019-06-12 06:06:48',	'2019-06-12 06:06:48'),
(4,	1,	1,	'Menu Sarapan',	'sarapan.png',	'2019-06-12 06:06:48',	'2019-06-12 06:06:48'),
(5,	1,	1,	'Makanan Siap Saji',	'siapsaji.png',	'2019-06-12 06:06:48',	'2019-06-12 06:06:48'),
(6,	1,	1,	'Minuman',	'minuman.png',	'2019-06-12 06:06:48',	'2019-06-12 06:06:48'),
(7,	2,	0,	'Laptop',	'laptop.png',	'2019-06-12 06:06:48',	'2019-06-12 06:06:48'),
(8,	2,	0,	'Handphone',	'handphone.png',	'2019-06-12 06:06:48',	'2019-06-12 06:06:48'),
(9,	2,	0,	'Kamera',	'kamera.png',	'2019-06-12 06:06:48',	'2019-06-12 06:06:48');

DROP TABLE IF EXISTS `category_sector`;
CREATE TABLE `category_sector` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `category_sector` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1,	'Khas Tangsel',	'2019-06-12 06:06:48',	'2019-06-12 06:06:48'),
(2,	'Peralatan Elektronik',	'2019-06-12 06:06:48',	'2019-06-12 06:06:48'),
(3,	'Aksesoris Elektronik',	'2019-06-12 06:06:48',	'2019-06-12 06:06:48');

DROP TABLE IF EXISTS `product`;
CREATE TABLE `product` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category_id` int(11) NOT NULL,
  `seller_id` int(11) NOT NULL,
  `name` varchar(255) CHARACTER SET latin1 NOT NULL,
  `description` text CHARACTER SET latin1 NOT NULL,
  `quantity` int(11) NOT NULL,
  `weight` int(11) NOT NULL COMMENT 'gram',
  `price` int(11) NOT NULL,
  `view` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `product` (`id`, `category_id`, `seller_id`, `name`, `description`, `quantity`, `weight`, `price`, `view`, `created_at`, `updated_at`) VALUES
(3,	3,	1,	'M-7XL Kemeja Hawaii Lengan Pendek Motif Print Bunga Ukuran untuk Pantai',	'Only printed shirt for sale,  Tshirt is not included.\r\n1.For different computer monitors, the color of the actual item may vary slightly from the above images, thanks for your understanding.\r\n2. Please allow 1-3cm differs due to manual measurement, thanks\r\n#Baju_pantai_pria \r\n#kemeja #kemejalenganpanjang #kemejalenganpendek #kemejagrosir #kemejamurah #kemejadiskon #kemejapria #kemejacowok #kemejalakilaki #kemejapolos #kemejasablon #kemejarumah #kemejasantai #kemejapesta #kemejapergi #kemejakuliah #kemejakerja ',	8997,	250,	125400,	0,	'2019-06-17 03:57:48',	'2019-06-17 03:57:48'),
(4,	3,	1,	'Kemeja Pantai Casual Motif Bunga untuk Pria',	'size : M,L,XL,2XL\r\nLocation:China\r\nMaterial: cotton&polyster\r\nbutton-down-shirts closure\r\nLight Weight and Short Sleeves makes you Feel Comfortable All Time\r\nPackage include:1PCS MEN shirt.\r\n\r\nAttention:\r\n1.For different computer monitors, the color of the actual item may vary slightly from the above images, thanks for your understanding.\r\n2. Please allow 1-3cm differs due to manual measurement, thanks\r\n#Baju_pantai_pria #shirt #men #tops #clothes #summer #beach #hawaiian #hawaiian_shirt',	7999,	250,	162000,	0,	'2019-06-17 03:57:48',	'2019-06-17 03:57:48'),
(5,	3,	2,	'Duapola Remple Ribbon Maxi Skirt 88188',	'- Koleksi bawahan dari duapola\r\n- Rok maxi dengan bahan kaos yang lembut, adem dan jatuh\r\n- Model payung, lebar dibawah, dengan karet di keliling pinggang\r\n- Tambahan tali pita di pinggang\r\n- Bahan elastis dan nyaman digunakan\r\n\r\nSATU UKURAN\r\nLingkar pinggang : 70cm bisa ditarik sampai 110cm\r\nLingkar pinggul : 130cm\r\nPanjang rok : 94-95cm',	12,	250,	119999,	0,	'2019-06-17 03:57:48',	'2019-06-17 03:57:48'),
(6,	3,	2,	'Eiza by duapola Remple Amunzen Cardigan 8821',	'- Koleksi luaran dari Eiza\r\n- Cardigan dengan model remple di bagian bawah dan bagian lengan yang cantik\r\n- Kait di bagian depan atas untuk membantu supaya tidak terlalu terbuka\r\n- Bahan dari amunzen stretch yang lembut dan enak dipakai\r\n- Sangat cocok digunakan untuk sehari-hari\r\n- Tersedia dalam 3 ukuran S, M dan L\r\n\r\nUkuran S\r\nLingkar Dada = 92cm\r\nPanjang = 60cm\r\nPanjang Tangan = 42cm \r\nLingkar Ketiak = 42cm\r\nLingkar Lengan = 34cm\r\n\r\nUkuran M\r\nLingkar Dada = 96cm\r\nPanjang = 62cm\r\nPanjang Tangan = 44cm \r\nLingkar Ketiak = 42cm\r\nLingkar Lengan = 34cm\r\n\r\nUkuran L\r\nLingkar Dada =100cm\r\nPanjang = 64cm\r\nPanjang Tangan = 46cm \r\nLingkar Ketiak = 42cm\r\nLingkar Lengan = 34cm\r\n\r\nPETUNJUK PERAWATAN\r\nCuci menggunakan air hangat dan deterjen lembut. \r\nCuci dengan pakaian senada. \r\nDapat dicuci tangan maupun mesin. \r\nJemur pada sisi dalam. \r\nSetrika dengan suhu sedang',	6,	250,	129000,	0,	'2019-06-17 03:57:48',	'2019-06-17 03:57:48'),
(7,	5,	3,	'Seblak Mommy Seblak Basah Instant Mommyindo - Netto 100gr',	'Seblak merupakan makanan khas bandung yang terbuat dari kerupuk udang kering..\r\nSeblak merupakan seblak yang diseduh, ditiriskan, dan ditumis dengan bumbu halus (bawang merah, bawang putih, cabai , garam, merica, dan kencur), dilengkapi topping yang berbeda, biasanya dijual di gerobak..\r\n\r\nKini Seblak Basah Instan Mommy hadir dalam bentuk cup dengan cara penyajian yang lebih praktis, dan dapat dikonsumsi kapan saja, dimana saja.. \r\n\r\nTersedia dalam lima macam rasa:\r\n- Original \r\n- Rendang\r\n- Rica - Rica\r\n- Pecel\r\n- Iga Bakar\r\n\r\n#seblak #seblakmommy #seblakinstan #seblakoriginal #seblakrendang #mommy #mommyindo',	8280,	100,	9000,	0,	'2019-06-17 03:57:48',	'2019-06-17 03:57:48'),
(8,	5,	3,	'Naraya Oat Choco Netto 400 gr (Isi 40 pcs x @10gr)',	'EXP 2020. Silahkan Tambahkan Kardus Paking untuk keamanan paket anda. 1 Kg muat hanya 2 pak saja\r\n\r\nOat Choco Naraya selain merupakan snack yang rasanya enak, ternyata juga mengandung banyak manfaat. Oat choco Naraya ini meskipun bentuknya kecil namun mempunyai khasiat yang besar. Berbeda dengan snack-snack lainnya yang hanya menang di rasa saja, namun oat choco Naraya ini juga menang di kandungan gizi dan juga memiliki rasa yang enak dan lezat.  Dalam setiap bungkusnya mengandung Serat, KalsiumProtein, Karbohidrat, Vitamin E dan B, Zink, Kalium. Mengkonsumsi tiga bungkus oat choco Naraya, setara seperti kita meminum segelas sereal bernutrisi. \r\nDapat di konsumsi langsung, maupun di sajikan sebagai sereal untuk minuman (tambah susu, atau seduh air panas). \r\n\r\nDiimpor oleh PT Interfood Sukses Jasindo, ber-BPOM dan memiliki logo halal MUI. Import dari Fujian, China. 1 bks isi 40 pcs dgn netto 40x@10gr. 1 kg muat 2 bks, karena kami selalu memakai kardus utk packagingnya.\r\n\r\nVarian tersedia :\r\n1. Oat Choco Vanilla/White\r\n2. Oat Choco Chocolate\r\n3. Oat Choco Pandan\r\n4. Oat Choco Sweet Potato\r\n5. Oat Choco Green Tea\r\n\r\n#oatchoco #oat #naraya #narayaoatchoco #oatchoconaraya #oatchocomurah #oatchoconarayamurah #narayaoat #oatchocovanila #oatchocopandan #oatchococoklat #oatchocoubiungu',	2663,	10,	25750,	0,	'2019-06-17 03:57:48',	'2019-06-17 03:57:48'),
(9,	8,	4,	'Samsung Galaxy Note 9 RAM 8GB / ROM 512GB (Free Tachyon Micro SD 512GB)',	'Detail\r\nUkuran layar: 6.4 inci, 1440 x 2960 pixels, 18.5:9 ratio, Curved Super AMOLED capacitive touchscreen, 16M colors\r\nMemori: RAM 8 GB, ROM 512 GB, MicroSD up to 400 GB\r\nSistem operasi: Android 8.1 (Oreo)\r\nCPU: Exynos 9810 Octa-core (4x2.7 GHz Mongoose M3 & 4x1.8 GHz Cortex-A55)\r\nGPU: Mali-G72 MP18\r\nKamera: Dual 12 MP, f/1.5-2.4, 26mm, 1/2.55\", 1.4µm, dual pixel PDAF, OIS; 12 MP, f/2.4, 52mm, 1/3.6\", 1µm, AF, OIS, 2x optical zoom, depan 8 MP, f/1.7, 25mm, 1/3.6\", 1.22µm, AF\r\nSIM: Hybrid Dual SIM (Nano-SIM)\r\nBaterai: Non-removable Li-Ion 4000 mAh\r\nGaransi Resmi',	3,	600,	17999000,	0,	'2019-06-17 03:57:48',	'2019-06-17 03:57:48'),
(10,	8,	4,	'Samsung Galaxy A7 4GB / 64GB (SM-A750GZ)',	'Samsung Galaxy A7 4GB / 64GB (SM-A750GZ)\r\nGaransi Samsung SEIN 1 Tahun\r\nSM-A750GZBUXID	Blue\r\nSM-A750GZDUXID	Gold\r\nSM-A750GZKUXID	Black\r\n\r\nProsesor\r\nCPU Speed\r\n2.2GHz, 1.6GHz\r\nCPU Type\r\nOcta-Core\r\nDisplay\r\nSize (Main_Display)\r\n153.6mm (6.0\" full rectangle) / 151.8mm (6.0\" rounded corners)\r\nResolusi (Main Display)\r\n2220 x 1080 (FHD+)\r\nTeknologi (Main Display)\r\nSuper AMOLED\r\nKedalaman Warna (Main Display)\r\n16M\r\nKamera\r\nRear Camera - Resolution (Multiple)\r\n24.0 MP + 5.0 MP + 8.0 MP\r\nRear Camera - F Number (Multiple)\r\nF1.7 , F2.2 , F2.4\r\nMain Camera - Auto Focus\r\nYes\r\nRear Camera - OIS\r\nNo\r\nFront Camera - Resolution\r\n24.0 MP\r\nFront Camera - F Number\r\nF2.0\r\nFront Camera - Auto Focus\r\nNo\r\nFront Camera - OIS\r\nNo\r\nMain Camera - Flash\r\nYes\r\nFront Camera - Flash\r\nYes\r\nResolusi Rekaman Video\r\nFHD (1920 x 1080) @30fps\r\nMemori\r\nRAM Size (GB)\r\n4\r\nROM Size (GB)\r\n64\r\nAvailable Memory Size * (GB)\r\n50.2\r\nDukungan Memori Eksternal\r\nMicroSD (Up to 512GB)\r\nJaringan\r\nNumber of SIM\r\nDual-SIM\r\nSIM size\r\nNano-SIM (4FF)\r\nSIM Slot Type\r\nSIM + SIM 2 + MicroSD\r\nInfra\r\n2G GSM, 3G WCDMA, 4G LTE FDD, 4G LTE TDD\r\n2G GSM\r\nGSM850, GSM900, DCS1800, PCS1900\r\n3G UMTS\r\nB1(2100), B2(1900), B4(AWS), B5(850), B8(900)\r\n4G FDD LTE\r\nB1(2100), B2(1900), B3(1800), B4(AWS), B5(850), B7(2600), B8(900), B12(700), B13(700), B17(700), B20(800), B28(700), B66(AWS-3)\r\n4G TDD LTE\r\nB38(2600), B40(2300), B41(2500)\r\nKonektivitas\r\nANT+\r\nYa\r\nUSB Interface\r\nMicro USB\r\nVersi USB\r\nUSB 2.0\r\nTeknologi Lokasi\r\nGPS, Glonass, Beidou\r\nEarjack\r\n3.5mm Stereo\r\nMHL\r\nTidak\r\nWi-Fi\r\n802.11 a/b/g/n/ac 2.4G+5GHz, VHT80\r\nWi-Fi Direct\r\nYa\r\nVersi Bluetooth\r\nBluetooth v5.0 (LE up to 2 Mbps)\r\nNFC\r\nYes\r\nPC Sync.\r\nSmart Switch (PC version)\r\nSistem Operasi\r\nAndroid\r\nInformasi Umum\r\nWarna\r\nBlue\r\nForm Factor\r\nTouch Bar\r\nSensors\r\nAccelerometer, Fingerprint Sensor, Gyro Sensor, Geomagnetic Sensor, Hall Sensor, Light Sensor, Proximity Sensor\r\nSpesifikasi Fisik\r\nDimension (HxWxD, mm)\r\n159.8 x 76.8 x 7.5\r\nWeight (g)\r\n168\r\nBaterai\r\nInternet Usage Time(3G) (Hours)\r\nUp to 12\r\nInternet Usage Time(LTE) (Hours)\r\nUp to 14\r\nInternet Usage Time(Wi-Fi) (Hours)\r\nUp to 14\r\nVideo Playback Time (Hours)\r\nUp to 17\r\nStandard Battery Capacity (mAh)\r\n3300\r\nAudio Playback Time (Hours)\r\nUp to 48\r\nAudio Playback Time (Hours, Always On Display Off)\r\nUp to 74\r\nTalk Time (3G WCDMA) (Hours)\r\nUp to 19\r\nAudio dan Video\r\nVideo Playing Format\r\nMP4, M4V, 3GP, 3G2, WMV, ASF, AVI, FLV, MKV, WEBM\r\nVideo Playing Resolution\r\nFHD (1920 x 1080) @60fps\r\nAudio Playing Format\r\nMP3, M4A, 3GA, AAC, OGG, OGA, WAV, WMA, AMR, AWB, FLAC, MID, MIDI, XMF, MXMF, IMY, RTTTL, RTX, OTA\r\nAplikasi dan Layanan\r\nGear Support\r\nGalaxy Watch, Gear Circle (Manager Support), Gear Fit, Gear Fit2, Gear Fit2 Pro, Gear Sport, Gear1, Gear2, Gear2 Neo, Gear S, Gear S2, Gear S3, Gear IconX, Gear IconX2\r\nS-Voice\r\nTidak\r\nMobile TV\r\nTidak',	135,	600,	3400000,	0,	'2019-06-17 03:57:48',	'2019-06-17 03:57:48'),
(11,	7,	5,	'Lenovo Ideapad 330 14AST (A9 9425, Win10, 4GB, 1TB, 14\" HD, AMD Integrated R5, DVD, Hitam|Grey|Blue)',	'Lenovo Ideapad 330 14AST 81D50038ID Onyx Black | 81D50039ID Platinum Grey | 81D5003AID Midnight Blue - Win10 Home, Integrated VGA (shared dengan prosesor)\r\n\r\nNotebook ini dipersenjatai prosessor A9-9425 berkecepatan 3.1GHz hingga 3.7GHz serta Radeon R5 Graphics yang memiliki performa cukup handal untuk kegiatan harian. Game PES 2017 masih bisa dimainkan dengan low settings.\r\n\r\nSpesifikasi:\r\n• Prosesor: AMD A9-9425 (Dual Core, 3.1GHz - 3.7GHz, 1MB Cache)\r\n• Operating System: Windows 10 Home 64 Bit\r\n• RAM: 1x 4GB DDR4-2133MHz (1 Slot, Max 8GB)\r\n• Storage: 1TB 5400RPM\r\n• Display: 14\" HD (1366 x 768) Antiglare\r\n• Graphics: Integrated Radeon R5 Graphics\r\n• ODD: DVD RW\r\n• Webcam: 0.3Mp, fixed focus with mono microphone\r\n• Battery: 2 Cell 30Wh (Sekitar 2-3 jam, tergantung pemakaian)\r\n• Wireless: WiFi 1x1 AC, Bluetooth 4.1\r\n• Audio: Stereo\r\n• Speaker: 2 x 1.5W Speakers with Dolby Audio\r\n• Backlit Keyboard: No\r\n• External Ports: 1x USB 2.0, 1x USB 3.0, 4-in-1 Card Reader (SD/SDHC/SDXC/MMC), HDMI, RJ45 (10/100 Mbps), Audio Jack, Kensington Slot\r\n• Laptop Dimensions (WxDxH): Net 338.3 x 249.9 x 22.7 mm | Box 493 x 317 x 71 mm\r\n• Laptop Weight: Net 2.1 kg | Box 2.5 kg\r\n• Warranty: 2 Tahun (Part & Labour)\r\n\r\nPaket Berisi:\r\n• 1 x Lenovo Ideapad 330-14AST\r\n• 1 x Adaptor\r\n• 1 x Buku Panduan\r\n• 1 x Tas\r\n\r\nCATATAN:\r\n- Windows 10 sudah terinstall dari pabrik & akan aktivasi otomatis saat terhubung dengan internet stabil. Proses Windows update butuh proses cukup lama & laptop mungkin akan restart beberapa kali.\r\n- Lisensi Microsoft Office (Word, Excel, Powerpoint) berbeda dengan Windows & TIDAK termasuk dalam paket. Aplikasi Microsoft Office yang tersedia dari Windows adalah trial version. Jika ingin lanjut pakai setelah masa percobaan selesai, aktivasikan Microsoft Office dengan beli lisensi secara terpisah.\r\n- Tidak dapat CD driver. Driver laptop tersedia di web:\r\nhttps://pcsupport.lenovo.com/id/en/products/laptops-and-netbooks/300-series/330-14ast/81d5/81d50038id/downloads\r\n- Hanya ada 1 slot RAM, untuk upgrade RAM, 4GB terpasang dicabut, lalu ditukar dengan 8GB.\r\n\r\nPENGIRIMAN\r\nWaktu pengiriman di hari yg sama: max Pk 13 status order \"Perlu Dikirim\".\r\nJadwal pengiriman: Senin - Sabtu (Minggu / hari libur nasional tutup)\r\n- GoSend Instant: atur pickup max pk 15\r\n- Selain GoSend: siang / sore hari\r\n\r\nBiaya Ongkir:\r\n- Subsidi ikut program Shopee yang berlaku.\r\n- Sudah termasuk asuransi pengiriman. Mohon videokan sebelum dan selama unboxing untuk bukti klaim ke JNE untuk kerusakan barang karena pengiriman.\r\n- SUDAH termasuk packing kayu JNE (ongkir untuk packing kayu =2x ongkir tanpa packing kayu).\r\n\r\n#Lenovo #Laptop #Ideapad #IP330 #14AST #AMD #A9 #9425 #4GB #1TB #14\" #Radeon #DVD #38ID #39ID #3AID #Win10 #Windows',	41,	2000,	4849000,	0,	'2019-06-17 03:57:48',	'2019-06-17 03:57:48'),
(12,	7,	5,	'Lenovo Legion Y530 72ID (i7 8750H, Win10, 8GB, 1TB + 16GB Optane, 15.6\" FHD 60Hz, NVIDIA GTX1050 4G)',	'Lenovo Legion Y530-15ICH 81FV0072ID - Intel Optane Memory, Full HD IPS 60Hz, Dedicated NVIDIA GX1050 4GB\r\n\r\nLaptop Gaming, Evolved\r\nLaptop 15,6\" ini memberi pengalaman bermain game dengan keseimbangan antara kinerja & portabilitas.\r\n\r\nNikmati pengalaman komputasi lebih cepat, lebih lancar, & responsif dengan memori Intel Optane, sebuah akselerator sistem yang cerdas & mudah beradaptasi.\r\n\r\nSpesifikasi:\r\n- Processor: Intel Core i7-8750H (6 Cores 2.2 - 4.1GHz, 9MB Cache)\r\n- OS: Windows 10 Home 64 Bit\r\n- Display: 15.6\" Full HD (1920 x 1080) IPS Antiglare 60Hz\r\n- Graphics: Dedicated NVIDIA GeForce GTX 1050 DDR5 4GB + Integrated Intel UHD Graphics 630\r\n- RAM: 1x 8 GB DDR4-2666MHz (2 Slot, Max 16GB)\r\n- HDD: 1TB HDD + 16GB M.2 PCIE Optane Memory\r\n- Webcam: HD 720 Pixels Camera with integrated microphone\r\n- Battery: 3 Cell 52.5 Wh (Max 5 jam, tergantung pemakaian)\r\n- Wifi 2 x 2 AC + Bluetooth 4.1\r\n- Audio: Harman Kardon Speaker\r\n- Backlit Keyboard: Warna Putih\r\n- Interface: 1x USB 3.1 (Type-C), 3x USB 3.0, Mini DisplayPort 1.4, HDMI, RJ-45 (Gigabit LAN), Audio combo jack, Kensington Lock slot\r\n- ODD: Tidak ada DVD RW\r\n- Laptop Dimensions: Netto 365 x 260 x 24.2 mm | Box 440 x 381 x 127 mm\r\n- Laptop Weight: Netto 2.3 kg | Box 4.08 kg\r\n- Garansi: 2 Tahun (Part & Labour) + Accidental Damage Protection\r\n\r\nPaket berisi:\r\n•	1 x Lenovo Ideapad Legion Y530 15ICH\r\n•	1 x Adaptor\r\n•	1 x Buku Panduan\r\n•	1 x Lenovo Backpack\r\n•	BONUS: Mouse M200 + Mat + McAfee e-Card 3th (khusus di Shopee)\r\n\r\nCATATAN:\r\n- Windows 10 sudah terinstall dari pabrik dan akan aktivasi otomatis saat terhubung dengan internet yang stabil. Proses Windows updates butuh proses cukup lama dan laptop mungkin akan restart beberapa kali.\r\n- Lisensi Microsoft Office (Word, Excel, Powerpoint) berbeda dengan Windows dan TIDAK termasuk dalam paket. Aplikasi Microsoft Office yang tersedia dari Windows adalah trial version. Jika ingin lanjut pakai setelah masa percobaan selesai, Anda perlu aktivasi Microsoft Office dengan beli lisensi secara terpisah.\r\n- TIDAK ada CD driver. Driver laptop tersedia di web: https://pcsupport.lenovo.com/us/en/products/laptops-and-netbooks/legion-series/legion-y530-15ich/81fv/downloads?searchLocation=PSPDoc_S\r\n- Referensi tentang Intel Optane: https://www.intel.co.id/content/www/id/id/architecture-and-technology/optane-memory.html\r\n \r\nPENGIRIMAN\r\nJadwal pengiriman ke kurir: Senin - Sabtu (Minggu & hari libur nasional tutup)\r\n- GoSend Instant: atur pickup paling lambat pk 16.30\r\n- Selain GoSend: siang / sore hari\r\n\r\nBiaya Ongkir:\r\n- Subsidi mengikuti program Shopee yg berlaku.\r\n- Sudah termasuk asuransi pengiriman. Mohon videokan sebelum & selama unboxing untuk bukti klaim ke JNE untuk kerusakan barang karena pengiriman.\r\n- SUDAH termasuk packing kayu (ongkir packing kayu JNE =2x ongkir tanpa packing kayu).\r\n- Jika ingin tambah packing kayu, chat sebelum order, berat akan kami sesuaikan.\r\n\r\n#Gaming #Lenovo #Legion #Y530 #15ICH #72ID #Intel #i7 #8750H #8GB #1TB #15.6\" #Windows #NVIDIA #GeForce #GTX1050 #Optane #81FV0072ID',	6,	25000,	16999000,	0,	'2019-06-17 03:57:48',	'2019-06-17 03:57:48');

DROP TABLE IF EXISTS `product_attribute`;
CREATE TABLE `product_attribute` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` int(11) NOT NULL,
  `field` varchar(255) NOT NULL,
  `value` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `product_attribute_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `product_attribute` (`id`, `product_id`, `field`, `value`) VALUES
(3,	3,	'Size',	'M, L, XL, 2XL, 3XL, 4XL, 5XL, 6XL, 7XL'),
(4,	3,	'Color',	'Navy'),
(5,	4,	'Size',	'M, L, XL, XXL'),
(6,	4,	'Color',	'Pink, Purple'),
(7,	5,	'Warna',	'Hitam, Navy, Cokelat'),
(8,	6,	'Warna',	'Maroon'),
(9,	6,	'Ukuran',	'S, M, L'),
(10,	7,	'Variation',	'Original, Rendang, Rica Rica, Iga Bakar'),
(11,	8,	'Variation',	'Sweet Potato, Pandan, Vanila, Green Tea'),
(12,	9,	'Variation',	'Ocean Blue'),
(13,	10,	'Variation',	'Blue, Gold, Black'),
(14,	11,	'Variation',	'Onyx Black 38ID, Platinum Grey 39ID, Midnight Blue 3AID');

DROP TABLE IF EXISTS `product_discussion`;
CREATE TABLE `product_discussion` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `discussion` text NOT NULL,
  `created_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `product_id` (`product_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `product_discussion_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`),
  CONSTRAINT `product_discussion_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


DROP TABLE IF EXISTS `product_image`;
CREATE TABLE `product_image` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `product_image_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `product_image` (`id`, `product_id`, `name`) VALUES
(3,	3,	'5aa4ee257f8c942ef5132e3875894368.jpeg'),
(4,	4,	'b32b448c40f75fb2ee95623f779e4e69.jpeg'),
(5,	5,	'b08a05185aa77bcdaf7f740e2f66d7b3.jpeg'),
(6,	6,	'875e0e4871b4175b533c36173c6c1689.jpeg'),
(7,	7,	'904ad82f35aae5318b1f6441e23d6e06.jpeg'),
(8,	8,	'066277f94e7aa0ab7fd3f4da4d1ce68c.jpeg'),
(9,	9,	'30bc8c84133ca2108e56b391ddc14811.jpeg'),
(10,	10,	'c64d5d8463c554adea2fe68073d2c66c.jpeg'),
(11,	11,	'2008edebd78cf58389fc1cba0819a6a0.jpeg'),
(12,	12,	'a0b48bb6060502635c3f269ceb8b555b.jpeg');

DROP TABLE IF EXISTS `product_rating`;
CREATE TABLE `product_rating` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `rating` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `product_id` (`product_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `product_rating_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`),
  CONSTRAINT `product_rating_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


DROP TABLE IF EXISTS `product_review`;
CREATE TABLE `product_review` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `review` text NOT NULL,
  `created_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `product_id` (`product_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `product_review_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`),
  CONSTRAINT `product_review_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


DROP TABLE IF EXISTS `product_specification`;
CREATE TABLE `product_specification` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` int(11) NOT NULL,
  `field` varchar(255) NOT NULL,
  `value` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `product_specification_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `product_specification` (`id`, `product_id`, `field`, `value`) VALUES
(3,	3,	'Merk',	'Tidak Ada Merk'),
(4,	3,	'Bahan',	'Katun'),
(5,	3,	'Style',	'Casual'),
(6,	3,	'Panjang Lengan',	'Pendek'),
(7,	3,	'Garis Leher',	'Neck'),
(8,	3,	'Asal Product',	'Import'),
(9,	4,	'Merk',	'Tidak Ada Merk'),
(10,	4,	'Bahan',	'Katun'),
(11,	5,	'Merk',	'Duapola'),
(12,	5,	'Bahan',	'Katun'),
(13,	5,	'Dikirim Dari',	'KAB. TANGERANG - PAGEDANGAN, BANTEN, ID'),
(14,	6,	'Merk',	'Eiza'),
(15,	6,	'Bahan',	'Moscrepe'),
(16,	6,	'Dikirim Dari',	'KAB. TANGERANG - PAGEDANGAN, BANTEN, ID'),
(17,	7,	'Merk',	'Mommy'),
(18,	7,	'Kadaluarsa',	'2019'),
(19,	7,	'Dikirim Dari',	'KOTA BANDUNG - CICENDO, JAWA BARAT, ID'),
(20,	8,	'Merk',	'Naraya'),
(21,	9,	'Dikirim Dari',	'KOTA BANDUNG - CICENDO, JAWA BARAT, ID'),
(23,	9,	'Merek',	'Samsung'),
(24,	9,	'Model HP',	'Samsung Note 9'),
(25,	9,	'Kapasitas',	'512GB'),
(26,	9,	'Garansi',	'Garansi Resmi'),
(27,	9,	'Tipe Kartu Sim',	'Nano'),
(28,	9,	'Dikirim Dari',	'KOTA JAKARTA UTARA - TANJUNG PRIOK, DKI JAKARTA, ID'),
(29,	10,	'Merek',	'Samsung'),
(30,	10,	'Model HP',	'Samsung A7'),
(31,	10,	'Kapasitas',	'64GB'),
(32,	10,	'Garansi',	'Garansi Resmi'),
(33,	10,	'Tipe Kartu Sim',	'Nano'),
(34,	10,	'Dikirim Dari',	'KOTA JAKARTA UTARA - TANJUNG PRIOK, DKI JAKARTA, ID'),
(36,	11,	'Merek',	'Lenovo'),
(37,	11,	'Operating System',	'Windows 10 Home 64 Bit'),
(38,	11,	'Processor',	'AMD A9-9425 (Dual Core 3.1 - 3.7GHz, 1MB Cache)'),
(39,	11,	'Memory/RAM',	'4 GB DDR4-2133 (1 Slot, Max 8GB)'),
(40,	11,	'Penyimpanan',	'1TB'),
(41,	11,	'Ukuran Layar',	'14\" HD (1366 X 768) Antiglare'),
(42,	11,	'Resolusi',	'1366x768'),
(43,	11,	'Berat',	'>5Kg SUDAH Packing Kayu JNE'),
(44,	11,	'Garansi',	'2 Tahun Garansi Resmi'),
(45,	11,	'Dikirim Dari',	'KOTA JAKARTA PUSAT - SAWAH BESAR, DKI JAKARTA, ID'),
(46,	12,	'Merek',	'Lenovo'),
(47,	12,	'Operating System',	'Windows 10 Home 64 Bit'),
(48,	12,	'Processor',	'Intel Core i7-8750H (6 Cores 2.2 - 4.1GHz, 9MB)'),
(49,	12,	'Memory/RAM',	'8 GB DDR4-2666MHz (2 Slot, Max 16GB)'),
(50,	12,	'Penyimpanan',	'1TB HDD + 16GB M.2 PCIE Optane Memory'),
(51,	12,	'Ukuran Layar',	'15.6\" Full HD (1920 x 1080) IPS Antiglare 60Hz'),
(52,	12,	'Resolusi',	'1920x1080'),
(53,	12,	'Berat',	'>5Kg SUDAH Packing Kayu JNE'),
(54,	12,	'Garansi',	'2 Tahun Garansi Resmi'),
(55,	12,	'Dikirim Dari',	'KOTA JAKARTA PUSAT - SAWAH BESAR, DKI JAKARTA, ID');

DROP TABLE IF EXISTS `product_wishlist`;
CREATE TABLE `product_wishlist` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `product_id` (`product_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `product_wishlist_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`),
  CONSTRAINT `product_wishlist_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


DROP TABLE IF EXISTS `seller`;
CREATE TABLE `seller` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `birthday` date DEFAULT '1970-01-01',
  `gender` enum('NONE','MALE','FEMALE') NOT NULL,
  `phone` bigint(20) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `seller` (`id`, `name`, `email`, `password`, `image`, `birthday`, `gender`, `phone`, `created_at`, `updated_at`) VALUES
(1,	'yohomoo.id',	'yohomoo.id@gmail.com',	'$2b$10$9syRxJogIYo3D5AK.KJ58.9X.Q2eLatbPv3Ox76vq1h63qi/Yu0Pm',	'user-default.png',	'1970-01-01',	'MALE',	62,	'2019-06-01 09:52:32',	'2019-06-01 09:52:32'),
(2,	'duapola',	'duapola@gmail.com',	'$2b$10$xnFerxeJadkkEB4T/x.kKuvm1LeWWeaZ7bxuiVvjdhgn0O.NmsXhq',	'user-default.png',	'1970-01-01',	'NONE',	62,	'2019-06-01 12:49:24',	'2019-06-01 12:49:24'),
(3,	'Snack Master',	'snackmaster@gmail.com',	'$2b$10$xnFerxeJadkkEB4T/x.kKuvm1LeWWeaZ7bxuiVvjdhgn0O.NmsXhq',	'user-default.png',	'1970-01-01',	'NONE',	62,	'2019-06-01 12:49:24',	'2019-06-01 12:49:24'),
(4,	'Samsung Official Shop',	'samsungofficialshop@gmail.com',	'$2b$10$xnFerxeJadkkEB4T/x.kKuvm1LeWWeaZ7bxuiVvjdhgn0O.NmsXhq',	'user-default.png',	'1970-01-01',	'NONE',	62,	'2019-06-01 12:49:24',	'2019-06-01 12:49:24'),
(5,	'Lenovo Official Shop',	'lenovofficialshop@gmail.com',	'$2b$10$xnFerxeJadkkEB4T/x.kKuvm1LeWWeaZ7bxuiVvjdhgn0O.NmsXhq',	'user-default.png',	'1970-01-01',	'NONE',	62,	'2019-06-01 12:49:24',	'2019-06-01 12:49:24');

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `birthday` date DEFAULT '1970-01-01',
  `gender` enum('NONE','MALE','FEMALE') NOT NULL,
  `phone` bigint(20) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `user` (`id`, `name`, `email`, `password`, `image`, `birthday`, `gender`, `phone`, `created_at`, `updated_at`) VALUES
(16,	'DNS PROGRESS',	'dnsprogress@gmail.com',	'$2b$10$9syRxJogIYo3D5AK.KJ58.9X.Q2eLatbPv3Ox76vq1h63qi/Yu0Pm',	'user-default.png',	'1970-01-01',	'MALE',	62,	'2019-06-01 09:52:32',	'2019-06-01 09:52:32'),
(17,	'Dani Susanto',	'dani@gmail.com',	'$2b$10$xnFerxeJadkkEB4T/x.kKuvm1LeWWeaZ7bxuiVvjdhgn0O.NmsXhq',	'user-default.png',	'1970-01-01',	'NONE',	62,	'2019-06-01 12:49:24',	'2019-06-01 12:49:24');

DROP TABLE IF EXISTS `user_address`;
CREATE TABLE `user_address` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `province_id` int(11) NOT NULL,
  `province_name` varchar(255) NOT NULL,
  `city_id` int(11) NOT NULL,
  `city_name` varchar(255) NOT NULL,
  `postal` int(11) NOT NULL,
  `address` text NOT NULL,
  `status` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `user_address_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `user_address` (`id`, `user_id`, `province_id`, `province_name`, `city_id`, `city_name`, `postal`, `address`, `status`, `created_at`, `updated_at`) VALUES
(13,	17,	2,	'Bangka Belitung',	17,	'Kabupaten Badung',	67226,	'Jalan Nangka',	0,	'2019-06-02 15:11:00',	'2019-06-02 15:11:00'),
(14,	17,	2,	'Bangka',	17,	'Kabupaten Badung',	67226,	'Jalan Nangka',	1,	'2019-06-02 15:11:03',	'2019-06-02 15:11:21');

-- 2019-06-17 00:11:55
