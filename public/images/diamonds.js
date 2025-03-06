const diamonds = [
  {
    id: 1,
    name: "Cushion Brilliant Cut Diamond",
    price: "1,500.00 $",
    shape: "Cushion Brilliant",
    shortDescription:
      "Lab-grown cushion brilliant cut diamond with exceptional sparkle.",
    description:
      "This 1.00-carat cushion brilliant cut diamond features an F color and VS1 clarity, certified by IGI.",
    diamondCutDesign: "Cushion Brilliant",
    carat: 1.0,
    measurements: "5.95 x 5.86 x 3.74",
    images: [
      "/images/EmeraldCut.png",
      "/images/EmeraldCut.png",
      "/images/EmeraldCut.png",
    ],
  },
  {
    id: 2,
    name: "Asscher Cut Diamond",
    price: "3,000.00 $",
    shape: "Asscher",
    shortDescription: "Lab-grown Asscher cut diamond with excellent clarity.",
    description:
      "This 2.07-carat Asscher cut diamond features an F color and VS2 clarity, certified by GIA.",
    diamondCutDesign: "Asscher",
    carat: 2.07,
    measurements: "6.99 x 6.94 x 4.63",
    images: [
      "/images/Asscher.png",
      "/images/Asscher.png",
      "/images/Asscher.png",
    ],
  },
  {
    id: 3,
    name: "Emerald Cut Diamond",
    price: "10,000.00 $",
    shape: "Emerald",
    shortDescription: "Lab-grown emerald cut diamond with stunning clarity.",
    description:
      "This 5.02-carat emerald cut diamond features an F color and VS2 clarity, certified by IGI.",
    diamondCutDesign: "Emerald",
    carat: 5.02,
    measurements: "12.23 x 7.89 x 5.20",
    images: [
      "/images/EmeraldCut.png",
      "/images/EmeraldCut.pngg",
      "/images/EmeraldCut.png",
    ],
  },
  {
    id: 4,
    name: "Cushion Brilliant Cut Diamond",
    price: "4,000.00 $",
    shape: "Cushion Brilliant",
    shortDescription:
      "Lab-grown cushion brilliant cut diamond with vivid blue color.",
    description:
      "This 2.01-carat cushion brilliant cut diamond features a vivid blue color and VS2 clarity, certified by IGI.",
    diamondCutDesign: "Cushion Brilliant",
    carat: 2.01,
    measurements: "7.73 x 7.13 x 4.72",
    images: [
      "/images/CushionBrilliant.png",
      "/images/CushionBrilliant.png",
      "/images/CushionBrilliant.png",
    ],
  },
  {
    id: 5,
    name: "Emerald Cut Diamond",
    price: "12,000.00 $",
    shape: "Emerald",
    shortDescription: "Lab-grown emerald cut diamond with fancy blue color.",
    description:
      "This 5.01-carat emerald cut diamond features a fancy blue color and VS2 clarity, certified by IGI.",
    diamondCutDesign: "Emerald",
    carat: 5.01,
    measurements: "11.83 x 8.12 x 5.42",
    images: [
      "/images/EmeraldCut.png",
      "/images/EmeraldCut.png",
      "/images/EmeraldCut.png",
    ],
  },
  {
    id: 6,
    name: "Emerald Cut Diamond",
    price: "1,500.00 $",
    shape: "Emerald",
    shortDescription: "Lab-grown emerald cut diamond with excellent clarity.",
    description:
      "This 1.00-carat emerald cut diamond features an E color and VS1 clarity, certified by IGI.",
    diamondCutDesign: "Emerald",
    carat: 1.0,
    measurements: "6.58 x 4.80 x 3.18",
    images: [
      "/images/EmeraldCut.png",
      "/images/EmeraldCut.png",
      "/images/EmeraldCut.png",
    ],
  },
  {
    id: 7,
    name: "Heart Brilliant Cut Diamond",
    price: "4,500.00 $",
    shape: "Heart Brilliant",
    shortDescription:
      "Lab-grown heart brilliant cut diamond with excellent clarity.",
    description:
      "This 2.03-carat heart brilliant cut diamond features an F color and VS2 clarity, certified by IGI.",
    diamondCutDesign: "Heart Brilliant",
    carat: 2.03,
    measurements: "8.34 x 8.66 x 4.78",
    images: [
      "/images/HeartBrilliant.png",
      "/images/HeartBrilliant.png",
      "/images/HeartBrilliant.png",
    ],
  },
  {
    id: 8,
    name: "Round Brilliant Cut Diamond",
    price: "4,500.00 $",
    shape: "Round Brilliant",
    shortDescription:
      "Lab-grown round brilliant cut diamond with excellent clarity.",
    description:
      "This 2.03-carat round brilliant cut diamond features an F color and SII clarity, certified by IGI.",
    diamondCutDesign: "Round Brilliant",
    carat: 2.03,
    measurements: "8.08 x 8.12 x 5.03",
    images: [
      "/images/RoundBrilliant.png",
      "/images/RoundBrilliant.png",
      "/images/RoundBrilliant.png",
    ],
  },
  {
    id: 9,
    name: "Emerald Cut Diamond",
    price: "5,000.00 $",
    shape: "Emerald",
    shortDescription: "Lab-grown emerald cut diamond with excellent clarity.",
    description:
      "This 2.04-carat emerald cut diamond features an F color and VS1 clarity, certified by IGI.",
    diamondCutDesign: "Emerald",
    carat: 2.04,
    measurements: "8.42 x 6.12 x 4.00",
    images: [
      "/images/EmeraldCut.png",
      "/images/EmeraldCut.png",
      "/images/EmeraldCut.png",
    ],
  },
  {
    id: 10,
    name: "Round Brilliant Cut Diamond",
    price: "5,000.00 $",
    shape: "Round Brilliant",
    shortDescription:
      "Lab-grown round brilliant cut diamond with excellent clarity.",
    description:
      "This 2.00-carat round brilliant cut diamond features an F color and VS1 clarity, certified by IGI.",
    diamondCutDesign: "Round Brilliant",
    carat: 2.0,
    measurements: "8.12 x 8.19 x 4.84",
    images: [
      "/images/RoundBrilliant.png",
      "/images/RoundBrilliant.png",
      "/images/RoundBrilliant.png",
    ],
  },
  {
    id: 11,
    name: "Princess Cut Diamond",
    price: "5,500.00 $",
    shape: "Princess",
    shortDescription: "Lab-grown princess cut diamond with fancy blue color.",
    description:
      "This 2.21-carat princess cut diamond features a fancy blue color and SII clarity, certified by IGI.",
    diamondCutDesign: "Princess",
    carat: 2.21,
    measurements: "7.04 x 7.03 x 5.06",
    images: [
      "/images/CushionBrilliant.png",
      "/images/CushionBrilliant.png",
      "/images/CushionBrilliant.png",
    ],
  },
  {
    id: 12,
    name: "Square Emerald Cut Diamond",
    price: "7,500.00 $",
    shape: "Square Emerald",
    shortDescription:
      "Lab-grown square emerald cut diamond with excellent clarity.",
    description:
      "This 3.01-carat square emerald cut diamond features an F color and S11 clarity.",
    diamondCutDesign: "Square Emerald",
    carat: 3.01,
    measurements: "7.93 x 7.96 x 5.29",
    images: [
      "/images/SquareEmeraldCut.png",
      "/images/SquareEmeraldCut.png",
      "/images/SquareEmeraldCut.png",
    ],
  },
  {
    id: 13,
    name: "Emerald Cut Diamond",
    price: "3,000.00 $",
    shape: "Emerald",
    shortDescription: "Lab-grown emerald cut diamond with excellent clarity.",
    description:
      "This 1.50-carat emerald cut diamond features an E color and VS1 clarity, certified by IGI.",
    diamondCutDesign: "Emerald",
    carat: 1.5,
    measurements: "7.44 x 5.23 x 3.80",
    images: [
      "/images/EmeraldCut.png",
      "/images/EmeraldCut.png",
      "/images/EmeraldCut.png",
    ],
  },
  {
    id: 14,
    name: "PearCutDiamond",
    price: "15,000.00 $",
    shape: "Pear",
    shortDescription: "Lab-grown pear cut diamond with excellent clarity.",
    description:
      "This 5.00-carat pear cut diamond features an E color and S11 clarity, certified by IGI.",
    diamondCutDesign: "Pear",
    carat: 5.0,
    measurements: "15.14 x 9.31 x 5.95",
    images: [
      "/images/PearCutDiamond.png",
      "/images/PeatCutDiamond.png",
      "/images/PearCutDiamond.png",
    ],
  },
];

export default diamonds;
