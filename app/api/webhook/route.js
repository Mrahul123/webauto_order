import { supabase } from "@/lib/supabase";

export async function POST(req) {
  try {
    const text = await req.text();
    console.log("🔥 RAW BODY:", text);

    let body;
    try {
      body = JSON.parse(text);
    } catch (err) {
      return Response.json(
        { error: "Invalid JSON", raw: text },
        { status: 400 }
      );
    }

    console.log("🔥 PARSED BODY:", body);

    const transactionId =
      body.transactionId ||
      body.transaction_id ||
      body.data?.transactionId ||
      body.data?.transaction_id;

    const status =
      body.status ||
      body.paymentStatus ||
      body.data?.status;

    console.log("TRX:", transactionId);
    console.log("STATUS:", status);

    if (!transactionId) {
      return Response.json(
        { error: "transactionId tidak ditemukan", body },
        { status: 400 }
      );
    }

    if (status === "PAID" || status === "paid" || status === "success") {
      const { data, error } = await supabase
        .from("orders")
        .update({
          status: "paid",
            delivery_status: "sent"
        })
        .eq("transaction_id", transactionId)
        .select();

      if (error) {
        console.log("❌ DB UPDATE ERROR:", error);
        return Response.json({ error: error.message }, { status: 500 });
      }

      console.log("✅ STATUS UPDATED:", data);

      return Response.json({
        message: "Payment updated to paid",
        transactionId,
        data
      });
    }

    return Response.json({
      message: "Webhook diterima tapi status belum paid",
      transactionId,
      status
    });

  } catch (error) {
    console.log("❌ WEBHOOK ERROR:", error);

    return Response.json(
      { error: error.message },
      { status: 500 }
    );
  }
}