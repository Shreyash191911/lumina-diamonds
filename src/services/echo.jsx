// Echo hosted backend. No service credentials are shipped to the browser.
import manifest from '../echo.manifest.json';
const API = "http://localhost:3000/api/apps/cmv1dewia00011we4xuapg5or";
const sessionKey = "echo-app-session:cmv1dewia00011we4xuapg5or";
async function request(action, body) {
  const token = sessionStorage.getItem(sessionKey);
  const response = await fetch(API + '?action=' + action, { method: body === undefined ? 'GET' : 'POST', headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: 'Bearer ' + token } : {}) }, ...(body === undefined ? {} : { body: JSON.stringify(body) }) });
  const result = await response.json();
  if (!response.ok) throw new Error(result.error || 'The service is unavailable. Please try again.');
  return result;
}
async function integration(action, body) {
  const url = API + '/integrations?action=' + encodeURIComponent(action);
  const token = sessionStorage.getItem(sessionKey);
  const response = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: 'Bearer ' + token } : {}) }, body: JSON.stringify(body || {}) });
  const result = await response.json();
  if (!response.ok) throw new Error(result.error || 'The integration is not connected yet.');
  return result;
}
export async function getStatus() { return request('status'); }
export async function getProducts() {
  const state = await getStatus();
  if (!state.database) return manifest.products || [];
  return (await request('products')).records;
}
export async function listRecords(collection) {
  const state = await getStatus();
  if (!state.database) return JSON.parse(localStorage.getItem(sessionKey + ':' + collection) || '[]');
  return (await request('records&collection=' + encodeURIComponent(collection))).records;
}
export async function saveRecord(collection, data) {
  if (!(await getStatus()).database) {
    const records = await listRecords(collection); const record = { ...data, id: data.id || crypto.randomUUID() };
    localStorage.setItem(sessionKey + ':' + collection, JSON.stringify([...records.filter(r => r.id !== record.id), record])); return record;
  }
  return (await request('save', { collection, data })).record;
}
export async function deleteRecord(collection, id) {
  if (!(await getStatus()).database) { const records = await listRecords(collection); localStorage.setItem(sessionKey + ':' + collection, JSON.stringify(records.filter(r => r.id !== id))); return; }
  await request('delete', { collection, id });
}
export async function getOrders() { return (await request('orders')).records; }
// No default payment provider: the caller passes the owner's connected
// provider explicitly (read it from getPluginStatus()). The server falls back
// in catalog order only when the caller did not choose.
export async function startCheckout(items, options) {
  const status = await getPluginStatus().catch(() => ({ plugins: {} }));
  const plugins = (status && status.plugins) || {};
  const available = ['stripe', 'paypal', 'razorpay'].filter((p) => plugins[p]);
  const provider = (options && options.provider) || available[0];
  if (!provider || !available.includes(provider)) throw new Error('No payment provider is connected. The owner needs to connect Stripe, PayPal, or Razorpay in Plugins.');
  const requestId = crypto.randomUUID();
  if (provider === 'stripe') {
    const result = await request('checkout', { items, requestId, provider });
    window.location.assign(result.url);
    return result;
  }
  if (provider === 'paypal') {
    const result = await request('checkout', { items, requestId, provider });
    if (result.approveUrl) window.location.assign(result.approveUrl);
    return result;
  }
  const result = await request('checkout', { items, requestId, provider });
  await openRazorpayCheckout(result);
  return result;
}
function loadScript(src) {
  return new Promise((resolve, reject) => {
    if (document.querySelector('script[src="' + src + '"]')) { resolve(); return; }
    const el = document.createElement('script');
    el.src = src; el.async = true;
    el.onload = () => resolve(); el.onerror = () => reject(new Error('Could not load the Razorpay checkout.'));
    document.head.appendChild(el);
  });
}
async function openRazorpayCheckout(order) {
  await loadScript('https://checkout.razorpay.com/v1/checkout.js');
  return new Promise((resolve, reject) => {
    const rzp = new window.Razorpay({
      key: order.keyId, order_id: order.orderId, amount: order.amount, currency: order.currency,
      name: (manifest.products[0] && manifest.products[0].name) || 'Order',
      handler: async (resp) => {
        try {
          const verified = await integration('verify-razorpay-payment', { orderId: resp.razorpay_order_id, paymentId: resp.razorpay_payment_id, signature: resp.razorpay_signature });
          resolve(verified);
          window.location.assign(window.location.pathname + '?payment=success&order_id=' + encodeURIComponent(resp.razorpay_order_id));
        } catch (e) { reject(e); }
      },
      modal: { ondismiss: () => reject(new Error('Payment was cancelled.')) },
    });
    rzp.open();
  });
}
export async function getPluginStatus() { return integration('status', {}); }
export async function sendEmail(to, subject, html, options) { return integration('send-email', { to, subject, html, from: options && options.from, provider: options && options.provider }); }
export async function sendSms(to, body) { return integration('send-sms', { to, body }); }
export async function sendTelegram(chatId, text) { return integration('send-message', { provider: 'telegram', to: chatId, text }); }
export async function sendSlack(channel, text) { return integration('send-message', { provider: 'slack', to: channel, text }); }
export async function trackEvent(event, properties, provider) {
  try { return await integration('track-event', { event, properties: properties || {}, provider }); }
  catch { return { ok: false }; }
}
export async function getUploadUrl(filename, contentType, provider) { return integration('upload-url', { filename, contentType, provider }); }
export async function createPayPalOrder(amount, currency) { return integration('paypal-order', { amount, currency: currency || 'USD' }); }
export async function capturePayPalOrder(orderId) { return integration('capture-paypal-order', { orderId }); }
export async function createRazorpayOrder(amount, currency) { return integration('razorpay-order', { amount, currency: currency || 'INR' }); }
export async function verifyRazorpayPayment(response) { return integration('verify-razorpay-payment', { orderId: response.razorpay_order_id || response.orderId, paymentId: response.razorpay_payment_id || response.paymentId, signature: response.razorpay_signature || response.signature }); }
export async function verifyAuthSession() {
  try { return await integration('auth-status', {}); }
  catch { return { authenticated: false }; }
}
