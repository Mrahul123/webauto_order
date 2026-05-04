import axios from "axios";
import { supabase } from "@/lib/supabase";

export async function POST(req) {
  const body = await req.json();
  const { product, email, amount } = body;

  const order_id = "INV-" + Date.now();

  try {
    // 🔥 REQUEST KE CASHIFY QRIS V2
    const payment = await axios.post(
      "https://cashify.my.id/api/generate/v2/qris",
      {
        qr_id: process.env.CASHIFY_QRIS_ID,
        amount,
        useUniqueCode: true,
        packageIds: ["com.gojek.gopaymerchant"],
        expiredInMinutes: 5,
        qrType: "dynamic",
        paymentMethod: "qris",
        useQris: true
      },
      {
        headers: {
          "x-license-key": process.env.CASHIFY_LICENSE_KEY,
          "Content-Type": "application/json"
        }
      }
    );

    const qrString = payment.data.data.qr_string;
    const transactionId = payment.data.data.transactionId;
    await supabase.from("orders").insert([
        {
          order_id,
          product,
          email,
          amount,
          transaction_id: transactionId,
          status: "pending"
        }
    ]);

    // 🎨 QR STYLISH (BIRU MUDA)
    const qrStyledUrl = `https://larabert-qrgen.hf.space/v1/create-qr-code?size=500x500&style=2&color=38bdf8&data=${encodeURIComponent(qrString)}`;

    console.log("QR SUCCESS:", transactionId);

    return Response.json({
      message: "Order + QRIS berhasil",
      order_id,
      transactionId,
      qr_image: qrStyledUrl,
      qr_string: qrString
    });

  } catch (error) {
    console.error("ERROR:", error?.response?.data || error.message);

    return Response.json({
      message: "Gagal generate QRIS",
      error: error?.response?.data || error.message
    }, { status: 500 });
  }
}