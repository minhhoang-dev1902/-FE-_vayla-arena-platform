declare module "*.svg" {
	const content: import("next/image").StaticImageData | string;
	export default content;
}
