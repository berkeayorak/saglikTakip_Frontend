import React from 'react';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 flex items-center justify-center p-6">
      <div className="bg-white shadow-2xl rounded-3xl p-8 max-w-4xl w-full transform transition-all duration-300 hover:scale-105">
        <h1 className="text-5xl font-extrabold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-teal-400">
          KIRIKKALE HASTANESİ'ne Hoşgeldiniz
        </h1>
        <p className="text-lg text-gray-700 text-center mb-8">
          KIRIKKALE HASTANESİ'nin Doktor Randevu Sistemine Hoşgeldiniz. Burada, çeşitli uzmanlıklarda deneyimli doktorlarımızdan randevu alabilirsiniz.
        </p>
        <div className="flex flex-col items-center">
          <img
            src="KırıkkaleHastanesi.webp"
            alt="KIRIKKALE HASTANESİ"
            className="mb-6 rounded-2xl shadow-xl transform transition-all duration-300 hover:scale-105"
          />
          <h2 className="text-3xl font-semibold text-gray-900 mb-4">
            KIRIKKALE HASTANESİ Hakkında
          </h2>
          <p className="text-lg text-gray-700 text-center max-w-2xl">
            KIRIKKALE HASTANESİ, topluma en üst düzeyde sağlık hizmetleri sunmaya kendini adamıştır. En son teknolojiye sahip tesislerimiz ve yüksek nitelikli tıbbi personelimiz ile en iyi bakımı almanızı sağlıyoruz. Uzmanlık alanlarımız arasında Kardiyoloji, Dermatoloji, Pediatri, Nöroloji ve daha fazlası bulunmaktadır.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
