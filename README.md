# Favicon Downloader: Your Ultimate Favicon Checking & Downloading Tool

Are you a developer, designer, or webmaster looking for an easy way to check and download favicons from any website? Look no further! FaviconExtractor is here to simplify your workflow and save you valuable time.

## What is FaviconExtractor?

FaviconExtractor is a powerful, free online tool that allows you to instantly check and download favicons from any website. With support for multiple sizes ranging from 16x16 to 512x512, our tool ensures you get the perfect favicon for your project needs.

## Key Features

- **Instant Favicon Checking**: Simply enter a domain and click "Check" to see all available favicon sizes.
- **Multiple Size Options**: Download favicons in 13 different sizes, including popular options like 16x16, 32x32, 192x192, and 512x512.
- **One-Click Downloads**: Easily download any favicon size with a single click.
- **HTML Code Generation**: Get ready-to-use HTML code for both default and larger favicon sizes.
- **Free to Use**: No registration required. Use FaviconExtractor as often as you need, completely free of charge.


## Installation

To set up the Favicon Downloader project locally, follow these steps:

1. Clone the repository:

```sh
git clone https://github.com/seadfeng/favicon-downloader.git
cd favicon-downloader
```

2. Install dependencies:

```sh
npm install
# or
yarn install
# or
pnpm install
```

## Usage Guide

### Running the Development Server

To start the development server, run one of the following commands:

```sh
npm run dev
# or
# yarn dev
or
# pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## How to Use FaviconExtractor

1. Enter the domain you want to check in the input field (e.g., www.example.com).
2. Click the "Check" button.
3. Wait for the tool to fetch and analyze the website's favicons.
4. View the results, showing all available favicon sizes for the website.
5. Click "Download" next to any size to save the favicon to your device.
6. Copy the provided HTML code to easily implement the favicon on your own site.

## Why Use FaviconExtractor?

- **Save Time**: No need to manually search through website code or server directories.
- **Comprehensive Results**: Get access to multiple favicon sizes that you might not find otherwise.
- **Stay Up-to-Date**: Ensure you're using the latest favicon for any website you're interested in.
- **Perfect for Research**: Ideal for competitive analysis or inspiration for your own favicon designs.
- **Developer-Friendly**: Get HTML code snippets for quick implementation in your projects.

## Free Favicon  API

Fetches favicons from multiple sources:

- Web Scraper
- Google Favicons
- DuckDuckGo Icons

The API intelligently selects the best source from these options, ensuring reliable and comprehensive favicon retrieval.

```sh
curl https://www.faviconextractor.com/api/proxysites.ai --header 'Content-Type: application/json'
``` 

Output JSON

```json
{
	"url": "https://www.proxysites.ai/",
	"host": "www.proxysites.ai",
	"status": 200,
	"statusText": "OK",
	"icons": [
		{
			"sizes": "57x57",
			"href": "https://asset.proxysites.ai/rails/active_storage/representations/redirect/eyJfcmFpbHMiOnsiZGF0YSI6OCwicHVyIjoiYmxvYl9pZCJ9fQ==--e702ab3bb2a064d7cc1961d5791a9cf8066b8c7f/eyJfcmFpbHMiOnsiZGF0YSI6eyJmb3JtYXQiOiJwbmciLCJyZXNpemUiOjU3fSwicHVyIjoidmFyaWF0aW9uIn19--92e4e3f0c3ca444ac909ff07bd729cc0955c9a41/proxy%20sites.png"
		},
		{
			"sizes": "60x60",
			"href": "https://asset.proxysites.ai/rails/active_storage/representations/redirect/eyJfcmFpbHMiOnsiZGF0YSI6OCwicHVyIjoiYmxvYl9pZCJ9fQ==--e702ab3bb2a064d7cc1961d5791a9cf8066b8c7f/eyJfcmFpbHMiOnsiZGF0YSI6eyJmb3JtYXQiOiJwbmciLCJyZXNpemUiOjYwfSwicHVyIjoidmFyaWF0aW9uIn19--b326659caec69b9d03bb3212d330eb7f2de4867f/proxy%20sites.png"
		},
		{
			"sizes": "72x72",
			"href": "https://asset.proxysites.ai/rails/active_storage/representations/redirect/eyJfcmFpbHMiOnsiZGF0YSI6OCwicHVyIjoiYmxvYl9pZCJ9fQ==--e702ab3bb2a064d7cc1961d5791a9cf8066b8c7f/eyJfcmFpbHMiOnsiZGF0YSI6eyJmb3JtYXQiOiJwbmciLCJyZXNpemUiOjcyfSwicHVyIjoidmFyaWF0aW9uIn19--dda0b07b7faabd93b896f61bd0b8121fe7535812/proxy%20sites.png"
		},
		{
			"sizes": "114x114",
			"href": "https://asset.proxysites.ai/rails/active_storage/representations/redirect/eyJfcmFpbHMiOnsiZGF0YSI6OCwicHVyIjoiYmxvYl9pZCJ9fQ==--e702ab3bb2a064d7cc1961d5791a9cf8066b8c7f/eyJfcmFpbHMiOnsiZGF0YSI6eyJmb3JtYXQiOiJwbmciLCJyZXNpemUiOjExNH0sInB1ciI6InZhcmlhdGlvbiJ9fQ==--e341749eca680cb3ab159803041920833c7147ed/proxy%20sites.png"
		},
		{
			"sizes": "120x120",
			"href": "https://asset.proxysites.ai/rails/active_storage/representations/redirect/eyJfcmFpbHMiOnsiZGF0YSI6OCwicHVyIjoiYmxvYl9pZCJ9fQ==--e702ab3bb2a064d7cc1961d5791a9cf8066b8c7f/eyJfcmFpbHMiOnsiZGF0YSI6eyJmb3JtYXQiOiJwbmciLCJyZXNpemUiOjEyMH0sInB1ciI6InZhcmlhdGlvbiJ9fQ==--2876e6c7d56a4676f98b9461a6c157748dd7f3d8/proxy%20sites.png"
		},
		{
			"sizes": "144x144",
			"href": "https://asset.proxysites.ai/rails/active_storage/representations/redirect/eyJfcmFpbHMiOnsiZGF0YSI6OCwicHVyIjoiYmxvYl9pZCJ9fQ==--e702ab3bb2a064d7cc1961d5791a9cf8066b8c7f/eyJfcmFpbHMiOnsiZGF0YSI6eyJmb3JtYXQiOiJwbmciLCJyZXNpemUiOjE0NH0sInB1ciI6InZhcmlhdGlvbiJ9fQ==--2ef73b7782ea6acca11f4bf18278d20df3ebedc7/proxy%20sites.png"
		},
		{
			"sizes": "152x152",
			"href": "https://asset.proxysites.ai/rails/active_storage/representations/redirect/eyJfcmFpbHMiOnsiZGF0YSI6OCwicHVyIjoiYmxvYl9pZCJ9fQ==--e702ab3bb2a064d7cc1961d5791a9cf8066b8c7f/eyJfcmFpbHMiOnsiZGF0YSI6eyJmb3JtYXQiOiJwbmciLCJyZXNpemUiOjE1Mn0sInB1ciI6InZhcmlhdGlvbiJ9fQ==--5d7e7888c54038462f7d0f5dfcaf9bfb763542b6/proxy%20sites.png"
		},
		{
			"sizes": "180x180",
			"href": "https://asset.proxysites.ai/rails/active_storage/representations/redirect/eyJfcmFpbHMiOnsiZGF0YSI6OCwicHVyIjoiYmxvYl9pZCJ9fQ==--e702ab3bb2a064d7cc1961d5791a9cf8066b8c7f/eyJfcmFpbHMiOnsiZGF0YSI6eyJmb3JtYXQiOiJwbmciLCJyZXNpemUiOjE4MH0sInB1ciI6InZhcmlhdGlvbiJ9fQ==--3607f5859d231a899f00f3075e5ede351a3881a1/proxy%20sites.png"
		},
		{
			"sizes": "512x512",
			"href": "https://asset.proxysites.ai/rails/active_storage/representations/redirect/eyJfcmFpbHMiOnsiZGF0YSI6OCwicHVyIjoiYmxvYl9pZCJ9fQ==--e702ab3bb2a064d7cc1961d5791a9cf8066b8c7f/eyJfcmFpbHMiOnsiZGF0YSI6eyJmb3JtYXQiOiJwbmciLCJyZXNpemUiOjUxMn0sInB1ciI6InZhcmlhdGlvbiJ9fQ==--0681236ad6684680624efd9dab9c9b0fd921b448/proxy%20sites.png"
		},
		{
			"sizes": "192x192",
			"href": "https://asset.proxysites.ai/rails/active_storage/representations/redirect/eyJfcmFpbHMiOnsiZGF0YSI6OCwicHVyIjoiYmxvYl9pZCJ9fQ==--e702ab3bb2a064d7cc1961d5791a9cf8066b8c7f/eyJfcmFpbHMiOnsiZGF0YSI6eyJmb3JtYXQiOiJwbmciLCJyZXNpemUiOjE5Mn0sInB1ciI6InZhcmlhdGlvbiJ9fQ==--f90210217333a1ec45f7289db3308a24a9ca1c30/proxy%20sites.png"
		},
		{
			"sizes": "96x96",
			"href": "https://asset.proxysites.ai/rails/active_storage/representations/redirect/eyJfcmFpbHMiOnsiZGF0YSI6OCwicHVyIjoiYmxvYl9pZCJ9fQ==--e702ab3bb2a064d7cc1961d5791a9cf8066b8c7f/eyJfcmFpbHMiOnsiZGF0YSI6eyJmb3JtYXQiOiJwbmciLCJyZXNpemUiOjk2fSwicHVyIjoidmFyaWF0aW9uIn19--75ad1335c5be72203ba8104f040ae0eae34ae312/proxy%20sites.png"
		},
		{
			"sizes": "32x32",
			"href": "https://asset.proxysites.ai/rails/active_storage/representations/redirect/eyJfcmFpbHMiOnsiZGF0YSI6OCwicHVyIjoiYmxvYl9pZCJ9fQ==--e702ab3bb2a064d7cc1961d5791a9cf8066b8c7f/eyJfcmFpbHMiOnsiZGF0YSI6eyJmb3JtYXQiOiJwbmciLCJyZXNpemUiOjMyfSwicHVyIjoidmFyaWF0aW9uIn19--c8c4db84a6a282f606e045537f16130bddb1019f/proxy%20sites.png"
		},
		{
			"sizes": "16x16",
			"href": "https://asset.proxysites.ai/rails/active_storage/representations/redirect/eyJfcmFpbHMiOnsiZGF0YSI6OCwicHVyIjoiYmxvYl9pZCJ9fQ==--e702ab3bb2a064d7cc1961d5791a9cf8066b8c7f/eyJfcmFpbHMiOnsiZGF0YSI6eyJmb3JtYXQiOiJwbmciLCJyZXNpemUiOjE2fSwicHVyIjoidmFyaWF0aW9uIn19--a249ec28617db7ea4309a9d13a2b4b43d8876d4e/proxy%20sites.png"
		}
	],
	"duration": "5.540"
}
```
 

## Deploy to Cloudflare Pages


### Local Deploy

Simple Deployment

```sh
# install wrangler
npm install -g wrangler

# Cloudflare Login 
wrangler login

# Deploy to Cloudflare Pages
npm run deploy
```

### Deploy by GitHub Actions

For detailed instructions, see [this guide](doc/workflows.md)

## Contributing

We welcome contributions to the Redirect Checker project. Please feel free to submit issues, feature requests, or pull requests.

## License

[MIT License](MIT-LICENSE)

## About

Redirect Checker is maintained by [seadfeng](https://github.com/seadfeng). For more information, visit the [project homepage](https://www.faviconextractor.com/).

## Tags

- redirect-urls
- redirect-page
- redirect-checker