export const config = {
  runtime: 'edge',
};

const BOT_AGENTS = [
  "facebookexternalhit",
  "WhatsApp",
  "Twitterbot",
  "LinkedInBot",
  "Embedly",
  "quora link preview",
  "showyoubot",
  "outbrain",
  "pinterest/0.",
  "developers.google.com/+/web/snippet",
  "slackbot",
  "Discordbot",
  "TelegramBot",
  "Googlebot",
  "bingbot",
];

export default async function handler(req) {
  const url = new URL(req.url);
  const code = url.searchParams.get('code') || '';
  const userAgent = req.headers.get('user-agent') || '';
  
  const isBot = BOT_AGENTS.some((bot) => 
    userAgent.toLowerCase().includes(bot.toLowerCase())
  );

  const supabaseUrl = `https://mnocxtuirejggqyfoyys.supabase.co/functions/v1/og-referral?ref=${code}`;

  if (isBot) {
    // Pour les bots : fetch le HTML et le renvoyer directement
    const response = await fetch(supabaseUrl, {
      headers: { 'User-Agent': userAgent }
    });
    const html = await response.text();
    return new Response(html, {
      headers: { 'Content-Type': 'text/html; charset=utf-8' }
    });
  }

  // Pour les humains : redirection
  return Response.redirect(`https://arcanes.be/signup?ref=${code}`, 302);
}
