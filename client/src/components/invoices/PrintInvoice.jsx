import {Modal, Button} from "antd";

const PrintInvoice = ({isModalOpen, setIsModalOpen}) => {
  return (
    <div>
      <Modal
        title="Fatura Yazdır"
        open={isModalOpen}
        footer={false}
        onCancel={() => setIsModalOpen(false)}
        width={800}
      >
        <section className="py-20 bg-black">
          <div className="max-w-5xl mx-auto bg-white px-6">
            <article className="overflow-hidden">
              <div className="logo">
                <h2 className="text-4xl font-bold text-slate-700 my-6">LOGO</h2>
              </div>
              <div className="invoice-details">
                <div className="grid sm:grid-cols-4 grid-cols-3 gap-12">
                  <div className="text-md text-slate-500">
                    <p className="font-bold text-slate-700">Fatura Detayı:</p>
                    <p>Unwrapped</p>
                    <p>Fake Street 123</p>
                    <p>San Javier</p>
                    <p>CA 1234</p>
                  </div>
                  <div className="text-md text-slate-500">
                    <p className="font-bold text-slate-700">Fatura:</p>
                    <p>The Boring Company</p>
                    <p>Tesla Street 007</p>
                    <p>Frisco</p>
                    <p>CA 0000</p>
                  </div>
                  <div className="text-md text-slate-500">
                    <p className="font-bold text-slate-700">Fatura Numarası:</p>
                    <p>00051</p>
                    <p className="font-bold text-slate-700 mt-2">Fatura Tarihi:</p>
                    <p>31.10.2023</p>
                  </div>
                  <div className="text-md text-slate-500 sm:block hidden">
                    <p className="font-bold text-slate-700">Şartlar:</p>
                    <p>10 gün</p>
                    <p className="font-bold text-slate-700 mt-2">Vade Tarihi:</p>
                    <p>09.11.2023</p>
                  </div>
                </div>
              </div>
              <div className="invoice-table-area">
                <table className="min-w-full divide-y divide-slate-500 overflow-hidden">
                  <thead>
                  <tr className="border-b border-slate-200">
                    <th scope="col" className="py-3.5 text-left text-md font-normal text-slate-700 sm:table-cell hidden">
                      Görsel
                    </th>
                    <th scope="col" className="py-3.5 text-left text-md font-normal text-slate-700 sm:table-cell hidden">
                      Başlık
                    </th>
                    <th scope="col" className="py-3.5 text-left text-md font-normal text-slate-700 sm:hidden" colSpan="4">
                      Başlık
                    </th>
                    <th scope="col" className="py-3.5 text-right text-md font-normal text-slate-700 sm:table-cell hidden">
                      Fiyat
                    </th>
                    <th scope="col" className="py-3.5 text-right text-md font-normal text-slate-700 sm:table-cell hidden">
                      Adet
                    </th>
                    <th scope="col" className="py-3.5 text-right text-md font-normal text-slate-700">
                      Toplam
                    </th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr className="border-b border-slate-200">
                    <td className="py-4 pr-3 sm:table-cell hidden">
                      <img
                        src="https://i.lezzet.com.tr/images-xxlarge-secondary/elma-nasil-yenir-221135ca-f383-474c-a4f5-ad02a45db978.jpg"
                        className="w-12 h-12 object-cover"
                      />
                    </td>
                    <td className="py-4 pr-3 sm:table-cell hidden">
                      <div className="flex flex-col">
                        <span className="font-medium text-left">Şalgam</span>
                        <span className="sm:hidden inline-block text-xs">Firim Fiyatı: 5₺</span>
                      </div>
                    </td>
                    <td className="py-4 pr-3 sm:hidden" colSpan="4">
                      <div className="flex flex-col">
                        <span className="font-medium text-left">Şalgam</span>
                        <span className="sm:hidden inline-block text-xs">Firim Fiyatı: 5₺</span>
                      </div>
                    </td>
                    <td className="py-4 pr-3 text-right sm:table-cell hidden">
                      <span>5₺</span>
                    </td>
                    <td className="py-4 pr-3 text-right sm:table-cell hidden">
                      <span>1</span>
                    </td>
                    <td className="py-4 text-right">
                      <span>5.00₺</span>
                    </td>
                  </tr>
                  </tbody>
                  <tfoot>
                  <tr>
                    <th className="text-right pt-4 sm:table-cell hidden" colSpan="4" scope="row">
                      <span className="font-normal text-slate-700">Ara Toplam</span>
                    </th>
                    <th className="text-left pt-4 sm:hidden" colSpan="4" scope="row">
                      <p className="font-normal text-slate-700">Ara Toplam</p>
                    </th>
                    <th className="text-right pt-4" scope="row">
                      <span className="font-normal text-slate-700">61₺</span>
                    </th>
                  </tr>
                  <tr>
                    <th className="text-right pt-4 sm:table-cell hidden" colSpan="4" scope="row">
                      <span className="font-normal text-slate-700">KDV (%8)</span>
                    </th>
                    <th className="text-left pt-4 sm:hidden" colSpan="4" scope="row">
                      <p className="font-normal text-slate-700">KDV (%8)</p>
                    </th>
                    <th className="text-right pt-4" scope="row">
                      <span className="font-normal text-red-700">+4.56₺</span>
                    </th>
                  </tr>
                  <tr>
                    <th className="text-right pt-4 sm:table-cell hidden" colSpan="4" scope="row">
                      <span className="font-normal text-slate-700">Toplam</span>
                    </th>
                    <th className="text-left pt-4 sm:hidden" colSpan="4" scope="row">
                      <p className="font-normal text-slate-700">Toplam</p>
                    </th>
                    <th className="text-right pt-4" scope="row">
                      <span className="font-normal text-slate-700">65.56₺</span>
                    </th>
                  </tr>
                  </tfoot>
                </table>
                <div className="py-9">
                  <div className="border-t pt-9 border-slate-200">
                    <p className="text-sm font-light text-slate-700">
                      Ödeme koşulları 14 gündür. Paketlenmemiş Borçların Geç Ödenmesi Yasası 0000'e göre, serbest
                      çalışanların bu süreden sonra borçların ödenmemesi durumunda 00.00 gecikme ücreti talep etme hakkına
                      sahip olduklarını ve bu noktada bu ücrete ek olarak yeni bir fatura sunulacağını lütfen unutmayın.
                      Revize faturanın 14 gün içinde ödenmemesi durumunda, vadesi geçmiş hesaba ek faiz ve %8 yasal oran
                      artı %0,5 Bank of England tabanı olmak üzere toplam %8,5 uygulanacaktır. Taraflar Kanun hükümleri
                      dışında sözleşme yapamazlar.
                    </p>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </section>
        <div className="flex justify-end mt-4">
          <Button type="primary" size="large">Yazdır</Button>
        </div>
      </Modal>
    </div>
  );
};

export default PrintInvoice;