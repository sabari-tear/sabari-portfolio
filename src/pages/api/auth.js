const { createHandlers } = require("netlify-cms-oauth-provider-node");
const { loadEnvConfig } = require("@next/env");

loadEnvConfig(process.cwd());

function getRequestOrigin(req) {
  const protocolHeader = req.headers["x-forwarded-proto"];
  const hostHeader = req.headers["x-forwarded-host"] || req.headers.host;
  const forwardedProtocol = Array.isArray(protocolHeader) ? protocolHeader[0] : protocolHeader;
  const host = Array.isArray(hostHeader) ? hostHeader[0] : hostHeader;
  const protocol = forwardedProtocol || (req.socket && req.socket.encrypted ? "https" : "http");
  return `${protocol}://${host}`;
}

function getConfig(req) {
  const requestOrigin = getRequestOrigin(req);
  const origin = process.env.CMS_OAUTH_ORIGIN || requestOrigin;
  const completeUrl = process.env.CMS_OAUTH_COMPLETE_URL || `${requestOrigin}/api/auth`;
  const oauthClientID = process.env.GITHUB_OAUTH_CLIENT_ID || process.env.CMS_GITHUB_OAUTH_CLIENT_ID;
  const oauthClientSecret = process.env.GITHUB_OAUTH_CLIENT_SECRET || process.env.CMS_GITHUB_OAUTH_CLIENT_SECRET;

  if (!oauthClientID || !oauthClientSecret) {
    return { error: "Missing GITHUB_OAUTH_CLIENT_ID or GITHUB_OAUTH_CLIENT_SECRET environment variables." };
  }

  return {
    origin,
    completeUrl,
    oauthClientID,
    oauthClientSecret,
    oauthProvider: "github",
    adminPanelUrl: `${requestOrigin}/admin/`,
    dev: process.env.NODE_ENV !== "production",
  };
}

module.exports = async function handler(req, res) {
  const config = getConfig(req);

  if (config.error) {
    res.status(500).json({ error: config.error });
    return;
  }

  const { begin, complete } = createHandlers(config);

  try {
    const code = typeof req.query.code === "string" ? req.query.code : "";

    if (code) {
      const html = await complete(code, req.query);
      res.status(200).setHeader("Content-Type", "text/html; charset=utf-8").send(html);
      return;
    }

    const state = typeof req.query.state === "string" ? req.query.state : undefined;
    const authorizationUrl = await begin(state);
    res.redirect(302, authorizationUrl);
  } catch (error) {
    const message = error instanceof Error ? error.message : "OAuth flow failed";
    res.status(500).json({ error: message });
  }
};
