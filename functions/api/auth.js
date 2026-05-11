export async function onRequest(context) {
  const { env } = context;
  const state = crypto.randomUUID();

  const params = new URLSearchParams({
    client_id: env.OAUTH_CLIENT_ID,
    scope: 'repo',
    state,
  });

  return new Response(null, {
    status: 302,
    headers: {
      'Location': `https://github.com/login/oauth/authorize?${params}`,
      'Set-Cookie': `oauth_state=${state}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=600`,
    },
  });
}
