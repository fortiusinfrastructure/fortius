import { articles } from './src/lib/mock-data';

let hasError = false;
articles.forEach((a, i) => {
    if (!a.excerpt) { console.log("Missing excerpt at index", i, a.slug); hasError = true; }
});
if (!hasError) console.log("All articles have excerpts!");
