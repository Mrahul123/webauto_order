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

    return Response.json({
      message: "OK",
      body
    });

  } catch (error) {
    console.log("❌ WEBHOOK ERROR:", error);

    return Response.json({
      error: error.message
    }, { status: 500 });
  }
}