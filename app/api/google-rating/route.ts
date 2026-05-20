import { NextResponse } from 'next/server';

export async function GET() {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ rating: 5.0, count: null });
  }

  try {
    // Find Blue Fit by text + coordinates bias (no Place ID needed)
    const url =
      `https://maps.googleapis.com/maps/api/place/findplacefromtext/json` +
      `?input=Blue+Fit+Lent` +
      `&inputtype=textquery` +
      `&fields=rating,user_ratings_total` +
      `&locationbias=point:51.864753,5.852266` +
      `&key=${apiKey}`;

    const res = await fetch(url, { next: { revalidate: 86400 } });

    if (!res.ok) {
      return NextResponse.json({ rating: 5.0, count: null });
    }

    const data = await res.json();
    const place = data.candidates?.[0];

    return NextResponse.json({
      rating: place?.rating ?? 5.0,
      count: place?.user_ratings_total ?? null,
    });
  } catch {
    return NextResponse.json({ rating: 5.0, count: null });
  }
}