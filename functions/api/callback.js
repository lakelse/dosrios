export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const code = url.searchParams.get('code');

  if (!code) {
    return postMessageResponse('error', 'Missing authorization code');
  }

  const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      client_id: env.OAUTH_CLIENT_ID,
      client_secret: env.OAUTH_CLIENT_SECRET,
      code,
    }),
  });

  const tokenData = await tokenRes.json();

  if (tokenData.error || !tokenData.access_token) {
    return postMessageResponse('error', tokenData.error_description || 'Failed to obtain access token');
  }

  return postMessageResponse('success', { token: tokenData.access_token, provider: 'github' });
}

function postMessageResponse(status, content) {
  const data = typeof content === 'string' ? content : JSON.stringify(content);
  const message = `authorization:github:${status}:${data}`;

  const html = `<!DOCTYPE html>
<html>
<body>
<pre id="status">Processing...</pre>
<script>
(function () {
  const msg = ${JSON.stringify(message)};
  document.getElementById('status').textContent = msg;
  if (!window.opener) {
    document.getElementById('status').textContent += '\\n\\nERROR: window.opener is null';
    return;
  }
  window.opener.postMessage(msg, '*');
  setTimeout(function() { window.close(); }, 3000);
})();
</script>
</body>
</html>`;

  return new Response(html, {
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
}
