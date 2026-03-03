import { articles } from './src/lib/mock-data';

let hasError = false;
articles.forEach((a, i) => {
    if (!a.title) { console.log("Missing title at index", i); hasError = true; }
    if (!a.author) { console.log("Missing author at index", i, a.slug); hasError = true; }
    if (!a.category) { console.log("Missing category at index", i, a.slug); hasError = true; }
    if (!a.content) { console.log("Missing content at index", i, a.slug); hasError = true; }
    if (!a.image) { console.log("Missing image at index", i, a.slug); hasError = true; }
});
if (!hasError) console.log("All articles look good!");
