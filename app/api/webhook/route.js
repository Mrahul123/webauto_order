export async function POST(req) {
  try {
    const body = await req.json();

    console.log("🔥 WEBHOOK MASUK:", body);

    const { transactionId, status, order_id } = body;

    // 🧠 CEK STATUS PEMBAYARAN
    if (status === "PAID" || status === "success") {
      console.log("💰 PAYMENT SUCCESS:", transactionId);

      // TODO: nanti di sini auto delivery produk
      // contoh:
      // - update database
      // - kirim email / WA
      // - unlock akses user

      return Response.json({
        message: "Payment berhasil diproses",
        transactionId,
        status: "PAID"
      });
    }

    // kalau belum bayar / expired
    return Response.json({
      message: "Webhook diterima (belum paid)",
      status
    });

  } catch (error) {
    console.error("❌ WEBHOOK ERROR:", error);

    return Response.json({
      message: "Webhook error",
      error: error.message
    }, { status: 500 });
  }
}