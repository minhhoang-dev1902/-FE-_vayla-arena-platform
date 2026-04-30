import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "cdn.vayla.io",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "img.youtube.com",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "i.ytimg.com",
				pathname: "/**",
			},
		],
	},
};

export default nextConfig;
