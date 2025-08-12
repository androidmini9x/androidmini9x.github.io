import { format, formatISO, getYear } from "date-fns";
import { ar } from 'date-fns/locale';
import pluginTOC from 'eleventy-plugin-toc';
import markdownIt from 'markdown-it';
import markdownItAnchor from 'markdown-it-anchor';
import embedEverything from "eleventy-plugin-embed-everything";
import Image from "@11ty/eleventy-img";
import { I18nPlugin } from "@11ty/eleventy";

import globalConfig from "./src/_data/globalConfig.js";

export default function(eleventyConfig) {

    // Copy assets to _site
    eleventyConfig.addPassthroughCopy('assets');

    // Set absolute url
    eleventyConfig.addNunjucksFilter("absoluteUrl", (path) => {
        return new URL(path, globalConfig.url).toString();
    });

    // Returns CSS class for home page link
    eleventyConfig.addNunjucksFilter("isHomeLink", function (url, pattern) {
        return (pattern === "/" && url === "/") ||
            (pattern === "/" && url.startsWith("/posts"))
            ? "active"
            : "";
    });

    // Extract reading time
    eleventyConfig.addNunjucksFilter("readingTime", (wordcount) => {
        let readingTime = Math.ceil(wordcount / 220);
        if (readingTime === 1) {
            return `${readingTime} دقيقة`;
        }
        return `${readingTime} دقائق`;
    });

    // Extract word count
    eleventyConfig.addNunjucksFilter("formatWords", (wordcount) => {
        return wordcount.toLocaleString("en");
    });

    // Add my own count to bypass bug in counting arabic letter
    eleventyConfig.addNunjucksFilter("countWords", (text) => {
        return text.split(" ").length;
    });

    // Format dates for sitemap
    eleventyConfig.addNunjucksFilter("sitemapdate", function (date) {
        return format(date, "yyyy-MM-dd");
    });

    // Format dates for JSON-LD
    eleventyConfig.addNunjucksFilter("isodate", function (date) {
        return formatISO(date);
    });

    // Extracts the year from a post
    eleventyConfig.addNunjucksFilter("year", function (post) {
        if (post && post.date) {
            return getYear(post.date);
        }
        return "n/a";
    });

    // Extracts the day of a date
    eleventyConfig.addNunjucksFilter("day", function (date) {
        return format(date, "dd");
    });

    // Extracts the month of a date
    eleventyConfig.addNunjucksFilter("month", function (date) {
        return format(date, "MMM", {locale: ar});
    });

    // Extracts readable date of a date - Arabic
    eleventyConfig.addNunjucksFilter("readableDate", function (date) {
        return format(date, "dd MMM, yyyy", {locale: ar});
    });
    
    // Extracts readable date of a date
    eleventyConfig.addNunjucksFilter("readableDateEN", function (date) {
        return format(date, "MMM dd, yyyy");
    });

    // Create custom collection for getting the newest 5 updates
    eleventyConfig.addCollection("recents", function (collectionApi) {
        return collectionApi.getAllSorted().reverse().slice(0, 5);
    });

    // Generate excerpt from first paragraph
    eleventyConfig.addShortcode("excerpt", (article) =>
        extractExcerpt(article)
    );
    
    // Returns CSS class for active page link
    eleventyConfig.addNunjucksFilter("isActiveLink", function (url, pattern) {
        return url.length > 1 && url.startsWith(pattern) ? "active" : "";
    });

    // Add eleventy-plugin-toc
    eleventyConfig.addPlugin(pluginTOC);

    // Add eleventy-plugin-embed-everything
    eleventyConfig.addPlugin(embedEverything);

    // Set Markdown library
    eleventyConfig.setLibrary(
        'md',
        markdownIt().use(markdownItAnchor)
    );

    // Adding inline SVGs to Eleventy.js
    eleventyConfig.addNunjucksAsyncShortcode("svgIcon", async (filename, className = "") => {
        const metadata = await Image(`./assets/images/${filename}`, {
            formats: ["svg"],
            dryRun: true,
            
        })

        let svgString = metadata.svg[0].buffer.toString();

        if (className) {
            svgString = svgString.replace(
                /<svg([^>]*)>/,
                `<svg$1 class="${className}">`
            );
        }       

        return svgString;
    })

    // Add I18n
	eleventyConfig.addPlugin(I18nPlugin, {
        defaultLanguage: 'en'
    });

    return {
        dir: {
            input: 'src',
        },
        htmlTemplateEngine: 'njk',
    }
};

// Taken from here => https://keepinguptodate.com/pages/2019/06/creating-blog-with-eleventy/
function extractExcerpt(article) {
    if (!Object.prototype.hasOwnProperty.call(article, "templateContent")) {
        console.warn(
            'Failed to extract excerpt: Document has no property "templateContent".'
        );
        return null;
    }

    let excerpt = null;
    const content = article.templateContent;

    const separatorsList = [
        { start: '<!-- Excerpt Start -->', end: '<!-- Excerpt End -->' },
        { start: '<p>', end: '</p>' }
    ];


    separatorsList.some(separators => {
        const startPosition = content.indexOf(separators.start);
        const endPosition = content.indexOf(separators.end);
    
        if (startPosition !== -1 && endPosition !== -1) {
            excerpt = content.substring(startPosition + separators.start.length, endPosition).trim() + ".....";
            return true; // Exit out of array loop on first match
        }
    });

    return excerpt;
}
