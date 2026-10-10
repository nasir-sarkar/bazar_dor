const BASE_URL_1 = "https://api.api-store.workers.dev/api/bazardor";
const BASE_URL_2 = "https://api.abcz.workers.dev/api/bazardor";

const BN_DIGITS = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];



export const UNIT_BN = {
    kg: "কেজি",
    litre: "লিটার",
    dozen: "ডজন",
    piece: "পিস",
};



async function request(path) {
    let lastError;
    for (const base of [BASE_URL_1, BASE_URL_2]) {
        try {
            const res = await fetch(`${base}${path}`, { next: { revalidate: 3600 } });
            if (res.status === 404) return null;
            if (!res.ok) throw new Error(`Request failed: ${res.status}`);
            return await res.json();
        } catch (error) {
            lastError = error;
        }
    }
    throw lastError;
}



export async function getProducts() {
    return (await request("/products")) ?? [];
}



export async function getProductBySlug(slug) {
    const products = await getProducts();
    return products.find((product) => product.slug === slug) ?? null;
}



export async function getCategories() {
    return (await request("/categories")) ?? [];
}



export async function getCategoryBySlug(slug) {
    const categories = await getCategories();
    return categories.find((category) => category.slug === slug) ?? null;
}



export function toBn(value) {
    const number = Number(value);
    const text = Number.isInteger(number)
        ? number.toLocaleString("en-US")
        : number.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    return text.replace(/\d/g, (digit) => BN_DIGITS[digit]);
}



export function formatTaka(value) {
    return `${toBn(value)} টাকা`;
}



export function formatPercent(pct) {
    const text = Math.abs(pct).toFixed(1).replace(/\d/g, (digit) => BN_DIGITS[digit]);
    return `${text}%`;
}



export function getBanglaDate() {
    return new Date().toLocaleDateString("bn-BD", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "Asia/Dhaka",
    });
}



export function getTopRisers(products, limit = 6) {
    return products
        .filter((product) => product.change.dir === "up")
        .sort((a, b) => b.change.pct - a.change.pct)
        .slice(0, limit);
}



export function getTopFallers(products, limit = 6) {
    return products
        .filter((product) => product.change.dir === "down")
        .sort((a, b) => a.change.pct - b.change.pct)
        .slice(0, limit);
}



export function getPriceSummary(markets) {
    const rows = markets
        .map((item) => ({ ...item, avg: (item.min + item.max) / 2 }))
        .sort((a, b) => a.avg - b.avg);

    return {
        rows,
        min: Math.min(...markets.map((item) => item.min)),
        max: Math.max(...markets.map((item) => item.max)),
        avg: Math.round(rows.reduce((sum, item) => sum + item.avg, 0) / rows.length),
    };
}