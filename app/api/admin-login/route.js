export async function POST(req) {
  try {
    const body = await req.json();
    const { password } = body;

    if (password === process.env.ADMIN_PASSWORD) {
      return Response.json({ ok: true });
    }

    return Response.json({ ok: false }, { status: 401 });
  } catch (error) {
    return Response.json({ ok: false, error: error.message }, { status: 500 });
  }
}