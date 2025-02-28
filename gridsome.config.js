// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

const tailwind = require("tailwindcss");
const purgecss = require("@fullhuman/postcss-purgecss");

const postcssPlugins = [tailwind()];

if (process.env.NODE_ENV === "production") postcssPlugins.push(purgecss());

module.exports = {
  siteName: "Like Lion @ JBNU",
  siteDescription: "JBNU Like Lion 8th Intro Page",
  siteUrl: "https://caesiumy.github.io",
  pathPrefix: "/8th-intro-page",
  titleTemplate: "멋쟁이 사자처럼 - 전북대",
  plugins: [
    {
      use: "@gridsome/plugin-google-analytics",
      options: {
        id: "UA-159657781-1",
      },
    },
    {
      use: "@gridsome/source-filesystem",
      options: {
        path: "faqs/**/*.md",
        typeName: "Post",
        refs: {
          tags: {
            typeName: "Tag",
            create: true,
          },
        },
      },
    },
    {
      use: "@gridsome/source-filesystem",
      options: {
        path: "services/**/*.md",
        typeName: "service",
      },
    },
    {
      use: "gridsome-plugin-rss",
      options: {
        contentTypeName: "Post",
        feedOptions: {
          title: "JBNU Like Lion",
          feed_url: "https://caesiumy.github.io/8th-intro-page/rss.xml",
          site_url: "https://caesiumy.github.io/8th-intro-page",
        },
        feedItemOptions: (node) => ({
          title: node.title,
          description: node.summary,
          url: "https://caesiumy.github.io/8th-intro-page" + node.path,
          author: "Caesiumy",
          date: node.date,
        }),
        output: {
          dir: "./static",
          name: "rss.xml",
        },
      },
    },
    {
      use: "@gridsome/plugin-sitemap",
      options: {
        cacheTime: 600000, // default
      },
    },
  ],
  templates: {
    Tag: "/tag/:id",
  },
  transformers: {
    remark: {
      plugins: [
        [
          "gridsome-plugin-remark-shiki",
          { theme: "Material-Theme-Palenight", skipInline: true },
        ],
      ],
      externalLinksTarget: "_blank",
      externalLinksRel: ["nofollow", "noopener", "noreferrer"],
      anchorClassName: "icon icon-link",
    },
  },
  css: {
    loaderOptions: {
      postcss: {
        plugins: postcssPlugins,
      },
    },
  },
};
