export default function handler(req, res) {
  const { code } = req.query;
  const targetUrl = `https://mnocxtuirejggqyfoyys.supabase.co/functions/v1/og-referral?ref=${code}`;
  
  // Proxy la requête vers Supabase Edge Function
  return res.redirect(307, targetUrl);
}
