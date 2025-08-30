/**
 * Helpers for constructing affiliate deep links for different providers.  Each
 * function accepts a hotel name or other search term and returns a URL
 * including the partner ID defined in the environment.  If no partner ID is
 * defined the functions still return a base search link.
 */

const bookingId = process.env.NEXT_PUBLIC_AFFILIATE_BOOKING_ID;
const agodaId = process.env.NEXT_PUBLIC_AFFILIATE_AGODA_ID;
const airbnbId = process.env.NEXT_PUBLIC_AFFILIATE_AIRBNB_ID;

export function bookingLink(query: string) {
  const base = 'https://www.booking.com/searchresults.html?ss=' + encodeURIComponent(query);
  return bookingId ? `${base}&aid=${bookingId}` : base;
}

export function agodaLink(query: string) {
  const base = 'https://www.agoda.com/Search?city=' + encodeURIComponent(query);
  return agodaId ? `${base}&cid=${agodaId}` : base;
}

export function airbnbLink(query: string) {
  const base = 'https://www.airbnb.com/s/' + encodeURIComponent(query) + '/homes';
  return airbnbId ? `${base}?af=${airbnbId}` : base;
}