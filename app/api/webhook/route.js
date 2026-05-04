import { supabase } from "@/lib/supabase";

export async function POST(req) {
  try {
    const text = await req.text();

    console.log("🔥 RAW BODY:", text);

    let body;
    try {
      body = JSON.parse(text);
    } catch (err) {
      return Response.json({
        error: "Invalid JSON",
        raw: text
      }, { status: 400 });
    }

    console.log("🔥 PARSED BODY:", body);

    const { transactionId, status } = body;

    // 🔥 UPDATE DATABASE JIKA PAID
    if (status === "PAID") {
      const { error } = await supabase
        .from("orders")
        .update({ status: "paid" })
        .eq("transaction_id", transactionId);

      if (error) {
        console.log("❌ DB UPDATE ERROR:", error);
      } else {
        console.log("✅ STATUS UPDATED:", transactionId);
      }
    }

    return Response.json({
      message: "OK"
    });

  } catch (error) {
    console.log("❌ WEBHOOK ERROR:", error);

    return Response.json({
      error: error.message
    }, { status: 500 });
  }
}