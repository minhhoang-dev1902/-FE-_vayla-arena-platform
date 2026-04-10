import { Allerta, Inter } from "next/font/google";
import localFont from "next/font/local";

export const inter = Inter({
	subsets: ["latin"],
	variable: "--ff-inter",
});

export const allerta = Allerta({
	weight: ["400"],
	subsets: ["latin"],
	variable: "--ff-allerta",
});

export const averta = localFont({
	variable: "--ff-averta",
	src: [
		{
			weight: "100",
			style: "normal",
			path: "../../../public/fonts/averta/Averta-Extrathin.otf",
		},
		{
			weight: "100",
			style: "italic",
			path: "../../../public/fonts/averta/Averta-ExtrathinItalic.otf",
		},
		{
			weight: "200",
			style: "normal",
			path: "../../../public/fonts/averta/Averta-Thin.otf",
		},
		{
			weight: "200",
			style: "italic",
			path: "../../../public/fonts/averta/Averta-ThinItalic.otf",
		},
		{
			weight: "300",
			style: "normal",
			path: "../../../public/fonts/averta/Averta-Light.otf",
		},
		{
			weight: "300",
			style: "italic",
			path: "../../../public/fonts/averta/Averta-LightItalic.otf",
		},
		{
			weight: "400",
			style: "normal",
			path: "../../../public/fonts/averta/Averta-Regular.otf",
		},
		{
			weight: "400",
			style: "italic",
			path: "../../../public/fonts/averta/Averta-RegularItalic.otf",
		},
		{
			weight: "600",
			style: "normal",
			path: "../../../public/fonts/averta/Averta-Semibold.otf",
		},
		{
			weight: "600",
			style: "italic",
			path: "../../../public/fonts/averta/Averta-SemiboldItalic.otf",
		},
		{
			weight: "700",
			style: "normal",
			path: "../../../public/fonts/averta/Averta-Bold.otf",
		},
		{
			weight: "700",
			style: "italic",
			path: "../../../public/fonts/averta/Averta-BoldItalic.otf",
		},
		{
			weight: "800",
			style: "normal",
			path: "../../../public/fonts/averta/Averta-ExtraBold.otf",
		},
		{
			weight: "800",
			style: "italic",
			path: "../../../public/fonts/averta/Averta-ExtraBoldItalic.otf",
		},
		{
			weight: "900",
			style: "normal",
			path: "../../../public/fonts/averta/Averta-Black.otf",
		},
		{
			weight: "900",
			style: "italic",
			path: "../../../public/fonts/averta/Averta-BlackItalic.otf",
		},
	],
});
