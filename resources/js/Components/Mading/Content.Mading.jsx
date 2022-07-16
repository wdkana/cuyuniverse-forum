const Content = () => {
  return (
    <div className="lg:px-10 px-2 py-2">
      <div className="lg:px-8 px-2 py-2 card lg:card-side bg-base-300 shadow-xl">
        <figure><img src="/assets/images/sunmori1.jpeg" alt="Album" width={500} height={500} /></figure>
        <div className="card-body">
          <div className="text-center">
            <h2 className="font-extrabold text-xl">Motoran santuy bareng Dea Afrizal & subscriber Bandung</h2>
            <div className="p-4">
              <h5>LOKASI TIKUM :</h5>
              <small>
                06:50 - RSUD OTO ISKANDAR DI NATA GADING TUTUKA SOREANG KAB.BANDUNG
              </small>
              <a href="https://goo.gl/maps/pRNskif9mJnGkhcXA" className="btn btn-link btn-xs">check maps disini</a>
              <p>Minggu, 17 Juli 2022</p>

            </div>
          </div>
          <div className="my-2">
            <p className="font-extrabold">Peralatan yang direkomendasikan untuk dibawa:</p>
            <ol>
              <li>Jaket</li>
              <li>Obat - obatan/suplemen pribadi</li>
              <li>Air minum & snack</li>
              <li>Sarung Tangan</li>
              <li>Jas Hujan</li>
              <li>dan lainnya</li>
              <li></li>
            </ol>
          </div>
          <div className="my-2">
            <p className="font-extrabold">Tambahan Catatan</p>
            <ol>
              <li>Harap datang tepat waktu untuk menghindari keterlambatan perjalanan & menghindari macet.</li>
              <li>Kecepatan konvoy menuju tempat tujuan tidak Cepat maupun Tidak Lambat (40-70kmh)</li>
              <li>Tertib selama berkendara dan sopan saat berada di tujuan</li>
              <li>Pastikan kondisi BADAN Sehat</li>
              <li>Siapkan uang tunai (gak harus banyak), untuk berjaga-jaga aja bisi laper</li>
              <li>Jika ada penambahan dan atau perubahan acara, akan diinfokan menyusul.</li>
            </ol>
          </div>
          <div className="card-actions justify-end">
            <a href="https://chat.whatsapp.com/BuTcQeoDspw1XJhosakUi6" className="btn btn-primary">Ikut Grup Mori #1</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Content