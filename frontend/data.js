// =============================================================================
// VYAPAAR SARTHI | GOVERNMENT OF INDIA | MINISTRY OF SOCIAL JUSTICE & EMPOWERMENT
// COMPLETE DATASET: 32 BUSINESSES WITH DISTINCT IMAGES & 100% 7-LANGUAGE DICTIONARY
// =============================================================================

const NATIONWIDE_REGIONS = {
  "Odisha": {
    "districts": [
      "Khordha",
      "Cuttack",
      "Puri",
      "Ganjam",
      "Sambalpur",
      "Balasore",
      "Mayurbhanj",
      "Sundargarh",
      "Angul",
      "Kalahandi"
    ],
    "sample_villages": [
      "Hansapal (Pilot)",
      "Naharkanta",
      "Balianta",
      "Pandra",
      "Pipili",
      "Jatani",
      "Choudwar",
      "Banki",
      "Niali",
      "Bhubaneswar Peri-Urban"
    ]
  },
  "Bihar": {
    "districts": [
      "Gaya",
      "Patna",
      "Muzaffarpur",
      "Nalanda",
      "Bhagalpur",
      "Darbhanga",
      "Purnia",
      "Rohtas"
    ],
    "sample_villages": [
      "Bodh Gaya",
      "Manpur",
      "Tekari",
      "Fatuha",
      "Danapur Rural",
      "Bakhtiyarpur",
      "Rajgir Rural",
      "Bikram"
    ]
  },
  "Uttar Pradesh": {
    "districts": [
      "Varanasi",
      "Lucknow",
      "Gorakhpur",
      "Prayagraj",
      "Ayodhya",
      "Kanpur Nagar",
      "Meerut",
      "Jhansi"
    ],
    "sample_villages": [
      "Sarnath Rural",
      "Kashi Vidyapeeth",
      "Pindra",
      "Malihabad",
      "Bakshi Ka Talab",
      "Chauri Chaura",
      "Naini Peri-Urban"
    ]
  },
  "Maharashtra": {
    "districts": [
      "Pune",
      "Nagpur",
      "Nashik",
      "Kolhapur",
      "Aurangabad (Chhatrapati Sambhajinagar)",
      "Solapur",
      "Satara",
      "Amravati"
    ],
    "sample_villages": [
      "Baramati",
      "Shirur",
      "Junnar",
      "Hingna",
      "Kamptee",
      "Dindori",
      "Niphad",
      "Shirol"
    ]
  },
  "West Bengal": {
    "districts": [
      "Howrah",
      "Hooghly",
      "South 24 Parganas",
      "North 24 Parganas",
      "Nadia",
      "Purba Medinipur",
      "Murshidabad",
      "Bardhaman"
    ],
    "sample_villages": [
      "Singur",
      "Uluberia Rural",
      "Domjur",
      "Bagnan",
      "Baruipur Rural",
      "Diamond Harbour",
      "Ranaghat",
      "Tamluk"
    ]
  },
  "Madhya Pradesh": {
    "districts": [
      "Indore",
      "Bhopal",
      "Ujjain",
      "Jabalpur",
      "Gwalior",
      "Sagar",
      "Rewa",
      "Sehore"
    ],
    "sample_villages": [
      "Mhow Rural",
      "Sanwer",
      "Depalpur",
      "Berasia",
      "Ichhawar",
      "Tarana",
      "Sihora",
      "Patan"
    ]
  },
  "Rajasthan": {
    "districts": [
      "Jaipur",
      "Jodhpur",
      "Udaipur",
      "Kota",
      "Alwar",
      "Bikaner",
      "Ajmer",
      "Sikar"
    ],
    "sample_villages": [
      "Sanganer Rural",
      "Chaksu",
      "Bassí",
      "Luni",
      "Bilara",
      "Mavli",
      "Vallabhnagar",
      "Behror"
    ]
  },
  "Tamil Nadu": {
    "districts": [
      "Madurai",
      "Coimbatore",
      "Tiruchirappalli",
      "Salem",
      "Thanjavur",
      "Tirunelveli",
      "Erode",
      "Vellore"
    ],
    "sample_villages": [
      "Alanganallur",
      "Vadipatti",
      "Melur",
      "Pollachi Rural",
      "Sulur",
      "Manachanallur",
      "Kumbakonam Rural"
    ]
  },
  "Telangana": {
    "districts": [
      "Warangal",
      "Karimnagar",
      "Khammam",
      "Nizamabad",
      "Rangareddy",
      "Nalgonda",
      "Mahabubnagar",
      "Siddipet"
    ],
    "sample_villages": [
      "Wardhannapet",
      "Ghanpur",
      "Huzurabad",
      "Jammikunta",
      "Ibrahimpatnam Rural",
      "Miryalaguda Rural"
    ]
  },
  "Andhra Pradesh": {
    "districts": [
      "Krishna",
      "Guntur",
      "Visakhapatnam",
      "East Godavari",
      "Chittoor",
      "Kurnool",
      "Anantapur",
      "Nellore"
    ],
    "sample_villages": [
      "Gannavaram",
      "Vuyyuru",
      "Tenali Rural",
      "Mangalagiri Rural",
      "Anakapalle Rural",
      "Madanapalle Rural"
    ]
  },
  "Gujarat": {
    "districts": [
      "Ahmedabad",
      "Surat",
      "Rajkot",
      "Vadodara",
      "Mehsana",
      "Anand",
      "Kheda",
      "Bhavnagar"
    ],
    "sample_villages": [
      "Sanand Rural",
      "Dholka",
      "Bardoli Rural",
      "Kamrej",
      "Gondal Rural",
      "Petlad",
      "Nadiad Rural"
    ]
  },
  "Karnataka": {
    "districts": [
      "Bengaluru Rural",
      "Mysuru",
      "Belagavi",
      "Tumakuru",
      "Dharwad",
      "Hassan",
      "Mandya",
      "Shivamogga"
    ],
    "sample_villages": [
      "Doddaballapura",
      "Nelamangala",
      "Nanjangud",
      "Hunsur",
      "Channapatna",
      "Maddur Rural"
    ]
  }
};

const BUSINESSES_DATA = [
  {
    "id": "BIZ-01",
    "name": "Solar-Powered Milk Chilling & Paneer/Curd Processing Unit",
    "category": "Dairy & Value Addition",
    "preferable_scheme": "Mukhyamantri Krushi Udyog Yojana (MKUY)",
    "scheme_code": "SCHEME-MKUY-18",
    "alternative_schemes": [
      "PMFME (35% Subsidy)",
      "Commercial Term Loan Scheme"
    ],
    "credit_tier": "Term Loan Tier (Commercial Agri-Enterprise)",
    "project_cost_inr": 480000,
    "beneficiary_margin_inr": 48000,
    "margin_percent": "10%",
    "loan_amount_inr": 432000,
    "effective_interest_rate": "Commercial bank rate with 40-50% back-ended capital subsidy",
    "subsidy_benefit": "₹1,92,000 to ₹2,40,000 (40% for General, 50% for Women/SC/ST)",
    "tenure": "7 Years (6-month moratorium)",
    "local_rationale": "Adjacent Balianta block produces surplus milk, but farmers sell to middlemen at low rates (₹32-34/L). A chilling and paneer unit at Hansapal can supply fresh paneer/curd directly to Bhubaneswar sweet shops & restaurants at ₹280-320/kg.",
    "target_market": "Bhubaneswar caterers, sweet shops, Rasulgarh wholesale buyers",
    "roi_payback_period": "18 - 24 months",
    "impact_score": "High (Empowers 15-20 local dairy farmers with higher milk procurement prices)",
    "image_url": "assets/dairy_thumb.jpg",
    "sector": "Agro-Processing & Dairy",
    "viability_score": 96,
    "viability_tag": "EXCELLENT VIABILITY (90%+)",
    "unit_economics": {
      "daily_output": "Commercial micro capacity for Solar-Powered Milk Chilling",
      "unit_cost": "65% – 70% of gross revenue",
      "selling_price": "Competitive haat benchmark pricing",
      "monthly_profit": "₹33,600 – ₹52,800",
      "breakeven": "6-8 Months"
    },
    "swot": {
      "strengths": [
        "Hyper-local consumer demand for Solar-Powered Milk Chilling along regional rural transit corridors.",
        "Low 10% Margin requirement of just ₹48,000 accessible to rural SHGs and individual youth."
      ],
      "weaknesses": [
        "Requires disciplined daily raw material inventory and quality controls.",
        "Initial dependence on local retail trader credit collection cycles."
      ],
      "opportunities": [
        "Concessional credit access under Mukhyamantri Krushi Udyog Yojana (MKUY) with capital margin subsidy.",
        "Expanding customer reach into adjoining peri-urban mandis and weekly rural haats."
      ],
      "threats": [
        "Seasonal monsoon dampness or summer heat requiring climate-proofed shed storage.",
        "Fluctuation in semi-raw material input costs from regional suppliers."
      ]
    },
    "threats_radar": [
      {
        "threat": "Monsoon Road Waterlogging & Dampness",
        "level": "Moderate",
        "mitigation": "Elevated pucca flooring (+3 ft) and poly-sheet moisture protection."
      },
      {
        "threat": "Working Capital Cash Flow Squeeze",
        "level": "Moderate",
        "mitigation": "30% Opex allocation (₹144,000) reserved in bank account."
      },
      {
        "threat": "Equipment Maintenance Delay",
        "level": "Low",
        "mitigation": "Standardized machinery with locally serviceable spare parts."
      }
    ]
  },
  {
    "id": "BIZ-02",
    "name": "Commercial Mushroom Farming & Solar Dehydration (Oyster & Paddy Straw)",
    "category": "Agri-Allied Processing",
    "preferable_scheme": "Mahila Kisan Sashaktikaran Pariyojana (MKSP) / Mission Shakti",
    "scheme_code": "SCHEME-MKSP-04",
    "alternative_schemes": [
      "Mahila Samriddhi Yojana (4% rate)",
      "Micro Finance Scheme"
    ],
    "credit_tier": "Micro Finance Tier",
    "project_cost_inr": 135000,
    "beneficiary_margin_inr": 13500,
    "margin_percent": "10%",
    "loan_amount_inr": 121500,
    "effective_interest_rate": "0.0% p.a. (Under Odisha Mission Shakti Interest Subvention for WSHGs)",
    "subsidy_benefit": "100% Interest Subvention (Zero interest payable by women SHG upon prompt repayment)",
    "tenure": "3 Years (3-month moratorium)",
    "local_rationale": "High daily consumption of fresh mushroom in Odisha households. Abundant paddy straw available locally from nearby farming belts; quick 25-day crop cycle generates rapid weekly cashflow.",
    "target_market": "Rasulgarh vegetable market, local weekly haats, local apartment complexes",
    "roi_payback_period": "8 - 12 months",
    "impact_score": "High (Excellent for women SHGs or youth with limited indoor space)",
    "image_url": "assets/mushroom_thumb.jpg",
    "sector": "Agro-Processing & Dairy",
    "viability_score": 92,
    "viability_tag": "EXCELLENT VIABILITY (90%+)",
    "unit_economics": {
      "daily_output": "Commercial micro capacity for Commercial Mushroom Farming",
      "unit_cost": "65% – 70% of gross revenue",
      "selling_price": "Competitive haat benchmark pricing",
      "monthly_profit": "₹9,450 – ₹14,850",
      "breakeven": "6-8 Months"
    },
    "swot": {
      "strengths": [
        "Hyper-local consumer demand for Commercial Mushroom Farming along regional rural transit corridors.",
        "Low 10% Margin requirement of just ₹13,500 accessible to rural SHGs and individual youth."
      ],
      "weaknesses": [
        "Requires disciplined daily raw material inventory and quality controls.",
        "Initial dependence on local retail trader credit collection cycles."
      ],
      "opportunities": [
        "Concessional credit access under Mahila Kisan Sashaktikaran Pariyojana (MKSP) / Mission Shakti with capital margin subsidy.",
        "Expanding customer reach into adjoining peri-urban mandis and weekly rural haats."
      ],
      "threats": [
        "Seasonal monsoon dampness or summer heat requiring climate-proofed shed storage.",
        "Fluctuation in semi-raw material input costs from regional suppliers."
      ]
    },
    "threats_radar": [
      {
        "threat": "Monsoon Road Waterlogging & Dampness",
        "level": "Moderate",
        "mitigation": "Elevated pucca flooring (+3 ft) and poly-sheet moisture protection."
      },
      {
        "threat": "Working Capital Cash Flow Squeeze",
        "level": "Moderate",
        "mitigation": "30% Opex allocation (₹40,500) reserved in bank account."
      },
      {
        "threat": "Equipment Maintenance Delay",
        "level": "Low",
        "mitigation": "Standardized machinery with locally serviceable spare parts."
      }
    ]
  },
  {
    "id": "BIZ-03",
    "name": "Bio-Fertilizer & Vermicompost Packaging Unit",
    "category": "Green Agri-Input",
    "preferable_scheme": "Aajeevika Microfinance Yojana (AMY) / Micro Finance Scheme",
    "scheme_code": "SCHEME-AMY-05",
    "alternative_schemes": [
      "PMMY (Shishu)",
      "Micro Finance Scheme (SCA)"
    ],
    "credit_tier": "Micro Finance Tier",
    "project_cost_inr": 120000,
    "beneficiary_margin_inr": 12000,
    "margin_percent": "10%",
    "loan_amount_inr": 108000,
    "effective_interest_rate": "5.0% p.a. (Concessional SCA rate)",
    "subsidy_benefit": "Zero physical collateral, margin assistance available",
    "tenure": "3 Years (3-month moratorium)",
    "local_rationale": "Utilizes cattle manure from Balianta-Hansapal dairy farms and urban vegetable waste from Rasulgarh market. Huge demand for 5kg/10kg packed vermicompost from Bhubaneswar rooftop gardeners and nurseries.",
    "target_market": "Plant nurseries along NH-16, urban home gardens, organic vegetable growers",
    "roi_payback_period": "10 - 14 months",
    "impact_score": "Very High (Circular waste-to-wealth model)",
    "image_url": "assets/organic_thumb.jpg",
    "sector": "Agro-Processing & Dairy",
    "viability_score": 94,
    "viability_tag": "EXCELLENT VIABILITY (90%+)",
    "unit_economics": {
      "daily_output": "Commercial micro capacity for Bio-Fertilizer",
      "unit_cost": "65% – 70% of gross revenue",
      "selling_price": "Competitive haat benchmark pricing",
      "monthly_profit": "₹8,400 – ₹13,200",
      "breakeven": "6-8 Months"
    },
    "swot": {
      "strengths": [
        "Hyper-local consumer demand for Bio-Fertilizer along regional rural transit corridors.",
        "Low 10% Margin requirement of just ₹12,000 accessible to rural SHGs and individual youth."
      ],
      "weaknesses": [
        "Requires disciplined daily raw material inventory and quality controls.",
        "Initial dependence on local retail trader credit collection cycles."
      ],
      "opportunities": [
        "Concessional credit access under Aajeevika Microfinance Yojana (AMY) / Micro Finance Scheme with capital margin subsidy.",
        "Expanding customer reach into adjoining peri-urban mandis and weekly rural haats."
      ],
      "threats": [
        "Seasonal monsoon dampness or summer heat requiring climate-proofed shed storage.",
        "Fluctuation in semi-raw material input costs from regional suppliers."
      ]
    },
    "threats_radar": [
      {
        "threat": "Monsoon Road Waterlogging & Dampness",
        "level": "Moderate",
        "mitigation": "Elevated pucca flooring (+3 ft) and poly-sheet moisture protection."
      },
      {
        "threat": "Working Capital Cash Flow Squeeze",
        "level": "Moderate",
        "mitigation": "30% Opex allocation (₹36,000) reserved in bank account."
      },
      {
        "threat": "Equipment Maintenance Delay",
        "level": "Low",
        "mitigation": "Standardized machinery with locally serviceable spare parts."
      }
    ]
  },
  {
    "id": "BIZ-04",
    "name": "Hydroponic Green Fodder & Cattle Mineral Mixture Production",
    "category": "Livestock Support Services",
    "preferable_scheme": "Kisan Credit Card (KCC) for Animal Husbandry",
    "scheme_code": "SCHEME-KCC-11",
    "alternative_schemes": [
      "MKUY (40% Subsidy)",
      "Term Loan Scheme"
    ],
    "credit_tier": "Term Loan / Working Capital Tier",
    "project_cost_inr": 250000,
    "beneficiary_margin_inr": 25000,
    "margin_percent": "10%",
    "loan_amount_inr": 225000,
    "effective_interest_rate": "4.0% p.a. (Standard 7% minus 3% Prompt Repayment Subvention)",
    "subsidy_benefit": "3% Annual Interest Subvention + Collateral-free up to ₹2 Lakh",
    "tenure": "5 Years (Annual renewal linked to production cycle)",
    "local_rationale": "Urban expansion has reduced natural grazing pastures in Hansapal/Naharkanta. Hydroponic fodder produces high-protein green feed in 8 days with 90% less water, boosting dairy yield by 15-20%.",
    "target_market": "Local dairy farmers and gaushalas across Balianta & Khordha district",
    "roi_payback_period": "14 - 18 months",
    "impact_score": "High (Solves the chronic green fodder shortage)",
    "image_url": "assets/solar_dryer.jpg",
    "sector": "Agro-Processing & Dairy",
    "viability_score": 86,
    "viability_tag": "HIGH VIABILITY (80-89%)",
    "unit_economics": {
      "daily_output": "Commercial micro capacity for Hydroponic Green Fodder",
      "unit_cost": "65% – 70% of gross revenue",
      "selling_price": "Competitive haat benchmark pricing",
      "monthly_profit": "₹17,500 – ₹27,500",
      "breakeven": "6-8 Months"
    },
    "swot": {
      "strengths": [
        "Hyper-local consumer demand for Hydroponic Green Fodder along regional rural transit corridors.",
        "Low 10% Margin requirement of just ₹25,000 accessible to rural SHGs and individual youth."
      ],
      "weaknesses": [
        "Requires disciplined daily raw material inventory and quality controls.",
        "Initial dependence on local retail trader credit collection cycles."
      ],
      "opportunities": [
        "Concessional credit access under Kisan Credit Card (KCC) for Animal Husbandry with capital margin subsidy.",
        "Expanding customer reach into adjoining peri-urban mandis and weekly rural haats."
      ],
      "threats": [
        "Seasonal monsoon dampness or summer heat requiring climate-proofed shed storage.",
        "Fluctuation in semi-raw material input costs from regional suppliers."
      ]
    },
    "threats_radar": [
      {
        "threat": "Monsoon Road Waterlogging & Dampness",
        "level": "Moderate",
        "mitigation": "Elevated pucca flooring (+3 ft) and poly-sheet moisture protection."
      },
      {
        "threat": "Working Capital Cash Flow Squeeze",
        "level": "Moderate",
        "mitigation": "30% Opex allocation (₹75,000) reserved in bank account."
      },
      {
        "threat": "Equipment Maintenance Delay",
        "level": "Low",
        "mitigation": "Standardized machinery with locally serviceable spare parts."
      }
    ]
  },
  {
    "id": "BIZ-05",
    "name": "High-Density Freshwater Biofloc Fish Culture",
    "category": "Aquaculture",
    "preferable_scheme": "Mukhyamantri Krushi Udyog Yojana (MKUY - Fisheries)",
    "scheme_code": "SCHEME-MKUY-18",
    "alternative_schemes": [
      "KCC Fisheries",
      "PM Matsya Sampada Yojana (PMMSY)"
    ],
    "credit_tier": "Term Loan Tier",
    "project_cost_inr": 350000,
    "beneficiary_margin_inr": 35000,
    "margin_percent": "10%",
    "loan_amount_inr": 315000,
    "effective_interest_rate": "Commercial bank rate with 40-50% capital subsidy",
    "subsidy_benefit": "₹1,40,000 (40% General) / ₹1,75,000 (50% Women/SC/ST)",
    "tenure": "7 Years (6-month moratorium)",
    "local_rationale": "High fish consumption in Odisha (Rohu, Catla, Tilapia). Near Kuakhai river with easy water access; 2-4 biofloc tanks produce high yield on a small 1,000 sq ft footprint without large ponds.",
    "target_market": "Hansapal local fish vendors, Rasulgarh wholesale fish market",
    "roi_payback_period": "14 - 20 months",
    "impact_score": "High (Protects fish harvest from external flood washouts)",
    "image_url": "assets/fish_thumb.jpg",
    "sector": "Agro-Processing & Dairy",
    "viability_score": 93,
    "viability_tag": "EXCELLENT VIABILITY (90%+)",
    "unit_economics": {
      "daily_output": "Commercial micro capacity for High-Density Freshwater Biofloc Fish Culture",
      "unit_cost": "65% – 70% of gross revenue",
      "selling_price": "Competitive haat benchmark pricing",
      "monthly_profit": "₹24,500 – ₹38,500",
      "breakeven": "6-8 Months"
    },
    "swot": {
      "strengths": [
        "Hyper-local consumer demand for High-Density Freshwater Biofloc Fish Culture along regional rural transit corridors.",
        "Low 10% Margin requirement of just ₹35,000 accessible to rural SHGs and individual youth."
      ],
      "weaknesses": [
        "Requires disciplined daily raw material inventory and quality controls.",
        "Initial dependence on local retail trader credit collection cycles."
      ],
      "opportunities": [
        "Concessional credit access under Mukhyamantri Krushi Udyog Yojana (MKUY - Fisheries) with capital margin subsidy.",
        "Expanding customer reach into adjoining peri-urban mandis and weekly rural haats."
      ],
      "threats": [
        "Seasonal monsoon dampness or summer heat requiring climate-proofed shed storage.",
        "Fluctuation in semi-raw material input costs from regional suppliers."
      ]
    },
    "threats_radar": [
      {
        "threat": "Monsoon Road Waterlogging & Dampness",
        "level": "Moderate",
        "mitigation": "Elevated pucca flooring (+3 ft) and poly-sheet moisture protection."
      },
      {
        "threat": "Working Capital Cash Flow Squeeze",
        "level": "Moderate",
        "mitigation": "30% Opex allocation (₹105,000) reserved in bank account."
      },
      {
        "threat": "Equipment Maintenance Delay",
        "level": "Low",
        "mitigation": "Standardized machinery with locally serviceable spare parts."
      }
    ]
  },
  {
    "id": "BIZ-06",
    "name": "Ornamental Plant Nursery & Highway Garden Boutique",
    "category": "Horticulture & Retail",
    "preferable_scheme": "Pradhan Mantri MUDRA Yojana (PMMY - Kishore Tier)",
    "scheme_code": "SCHEME-MUDRA-07",
    "alternative_schemes": [
      "Term Loan Scheme (SCA)",
      "Stand-Up India"
    ],
    "credit_tier": "Term Loan Tier",
    "project_cost_inr": 220000,
    "beneficiary_margin_inr": 22000,
    "margin_percent": "10%",
    "loan_amount_inr": 198000,
    "effective_interest_rate": "8.5% - 9.5% p.a. (Bank MSME rate)",
    "subsidy_benefit": "100% Collateral-Free & Zero Third-Party Guarantee under CGFMU",
    "tenure": "5 Years (6-month moratorium)",
    "local_rationale": "High vehicle transit on NH-16 bypass where commuters frequently stop for plants/ceramic pots; rapid development of residential apartments in Hansapal creates high landscaping demand.",
    "target_market": "Apartment residents, highway commuters, corporate offices in Mancheswar",
    "roi_payback_period": "12 - 16 months",
    "impact_score": "Medium-High (Aesthetic and ecological enhancement)",
    "image_url": "assets/honey_bee.jpg",
    "sector": "Agro-Processing & Dairy",
    "viability_score": 85,
    "viability_tag": "HIGH VIABILITY (80-89%)",
    "unit_economics": {
      "daily_output": "Commercial micro capacity for Ornamental Plant Nursery",
      "unit_cost": "65% – 70% of gross revenue",
      "selling_price": "Competitive haat benchmark pricing",
      "monthly_profit": "₹15,400 – ₹24,200",
      "breakeven": "6-8 Months"
    },
    "swot": {
      "strengths": [
        "Hyper-local consumer demand for Ornamental Plant Nursery along regional rural transit corridors.",
        "Low 10% Margin requirement of just ₹22,000 accessible to rural SHGs and individual youth."
      ],
      "weaknesses": [
        "Requires disciplined daily raw material inventory and quality controls.",
        "Initial dependence on local retail trader credit collection cycles."
      ],
      "opportunities": [
        "Concessional credit access under Pradhan Mantri MUDRA Yojana (PMMY - Kishore Tier) with capital margin subsidy.",
        "Expanding customer reach into adjoining peri-urban mandis and weekly rural haats."
      ],
      "threats": [
        "Seasonal monsoon dampness or summer heat requiring climate-proofed shed storage.",
        "Fluctuation in semi-raw material input costs from regional suppliers."
      ]
    },
    "threats_radar": [
      {
        "threat": "Monsoon Road Waterlogging & Dampness",
        "level": "Moderate",
        "mitigation": "Elevated pucca flooring (+3 ft) and poly-sheet moisture protection."
      },
      {
        "threat": "Working Capital Cash Flow Squeeze",
        "level": "Moderate",
        "mitigation": "30% Opex allocation (₹66,000) reserved in bank account."
      },
      {
        "threat": "Equipment Maintenance Delay",
        "level": "Low",
        "mitigation": "Standardized machinery with locally serviceable spare parts."
      }
    ]
  },
  {
    "id": "BIZ-07",
    "name": "Backyard Country Poultry (Kadaknath & Desi Banaraja) Hatchery",
    "category": "Poultry & Livestock",
    "preferable_scheme": "Kisan Credit Card (KCC - Poultry) / Mahila Samriddhi Yojana",
    "scheme_code": "SCHEME-KCC-11",
    "alternative_schemes": [
      "Mahila Samriddhi Yojana (4% rate)",
      "Micro Finance Scheme"
    ],
    "credit_tier": "Micro Finance Tier",
    "project_cost_inr": 140000,
    "beneficiary_margin_inr": 14000,
    "margin_percent": "10%",
    "loan_amount_inr": 126000,
    "effective_interest_rate": "4.0% p.a. (Under KCC prompt repayment incentive) or 4.0% under MSY",
    "subsidy_benefit": "3% Annual interest subvention, zero mortgage on family land",
    "tenure": "3 Years (3-month moratorium)",
    "local_rationale": "Desi poultry fetches double the price of broiler chickens (₹380-450/kg vs ₹160/kg). A small egg incubator unit supplying day-old desi chicks to local villagers creates a decentralized rearing network.",
    "target_market": "Rural homesteads for rearing, local dhabas and meat shops",
    "roi_payback_period": "9 - 12 months",
    "impact_score": "High (High household livelihood integration)",
    "image_url": "assets/poultry_thumb.jpg",
    "sector": "Agro-Processing & Dairy",
    "viability_score": 92,
    "viability_tag": "EXCELLENT VIABILITY (90%+)",
    "unit_economics": {
      "daily_output": "Commercial micro capacity for Backyard Country Poultry (Kadaknath",
      "unit_cost": "65% – 70% of gross revenue",
      "selling_price": "Competitive haat benchmark pricing",
      "monthly_profit": "₹9,800 – ₹15,400",
      "breakeven": "6-8 Months"
    },
    "swot": {
      "strengths": [
        "Hyper-local consumer demand for Backyard Country Poultry (Kadaknath along regional rural transit corridors.",
        "Low 10% Margin requirement of just ₹14,000 accessible to rural SHGs and individual youth."
      ],
      "weaknesses": [
        "Requires disciplined daily raw material inventory and quality controls.",
        "Initial dependence on local retail trader credit collection cycles."
      ],
      "opportunities": [
        "Concessional credit access under Kisan Credit Card (KCC - Poultry) / Mahila Samriddhi Yojana with capital margin subsidy.",
        "Expanding customer reach into adjoining peri-urban mandis and weekly rural haats."
      ],
      "threats": [
        "Seasonal monsoon dampness or summer heat requiring climate-proofed shed storage.",
        "Fluctuation in semi-raw material input costs from regional suppliers."
      ]
    },
    "threats_radar": [
      {
        "threat": "Monsoon Road Waterlogging & Dampness",
        "level": "Moderate",
        "mitigation": "Elevated pucca flooring (+3 ft) and poly-sheet moisture protection."
      },
      {
        "threat": "Working Capital Cash Flow Squeeze",
        "level": "Moderate",
        "mitigation": "30% Opex allocation (₹42,000) reserved in bank account."
      },
      {
        "threat": "Equipment Maintenance Delay",
        "level": "Low",
        "mitigation": "Standardized machinery with locally serviceable spare parts."
      }
    ]
  },
  {
    "id": "BIZ-08",
    "name": "Two-Wheeler EV Charging & Smart Battery Swapping Station",
    "category": "Clean Energy & Mobility",
    "preferable_scheme": "Prime Minister's Employment Generation Programme (PMEGP)",
    "scheme_code": "SCHEME-PMEGP-13",
    "alternative_schemes": [
      "PMMY (Tarun)",
      "Commercial Term Loan Scheme"
    ],
    "credit_tier": "Term Loan Tier",
    "project_cost_inr": 420000,
    "beneficiary_margin_inr": 42000,
    "margin_percent": "10% (5% for Special Categories)",
    "loan_amount_inr": 378000,
    "effective_interest_rate": "Commercial bank rate cushioned by large government grant",
    "subsidy_benefit": "25% (₹1,05,000) for General / 35% (₹1,47,000) for Special Category (Rural)",
    "tenure": "7 Years (6-month moratorium)",
    "local_rationale": "Hansapal junction is a gateway connecting delivery riders (Swiggy, Zomato, Amazon, Flipkart) commuting between Bhubaneswar and Cuttack. High demand for fast battery swaps and emergency charging.",
    "target_market": "Gig delivery workers, local commuters, electric auto-rickshaws",
    "roi_payback_period": "16 - 22 months",
    "impact_score": "High (Accelerates EV adoption in peri-urban belts)",
    "image_url": "assets/ev_thumb.jpg",
    "sector": "Green Energy & EV",
    "viability_score": 89,
    "viability_tag": "HIGH VIABILITY (80-89%)",
    "unit_economics": {
      "daily_output": "Commercial micro capacity for Two-Wheeler EV Charging",
      "unit_cost": "65% – 70% of gross revenue",
      "selling_price": "Competitive haat benchmark pricing",
      "monthly_profit": "₹29,400 – ₹46,200",
      "breakeven": "6-8 Months"
    },
    "swot": {
      "strengths": [
        "Hyper-local consumer demand for Two-Wheeler EV Charging along regional rural transit corridors.",
        "Low 10% Margin requirement of just ₹42,000 accessible to rural SHGs and individual youth."
      ],
      "weaknesses": [
        "Requires disciplined daily raw material inventory and quality controls.",
        "Initial dependence on local retail trader credit collection cycles."
      ],
      "opportunities": [
        "Concessional credit access under Prime Minister's Employment Generation Programme (PMEGP) with capital margin subsidy.",
        "Expanding customer reach into adjoining peri-urban mandis and weekly rural haats."
      ],
      "threats": [
        "Seasonal monsoon dampness or summer heat requiring climate-proofed shed storage.",
        "Fluctuation in semi-raw material input costs from regional suppliers."
      ]
    },
    "threats_radar": [
      {
        "threat": "Monsoon Road Waterlogging & Dampness",
        "level": "Moderate",
        "mitigation": "Elevated pucca flooring (+3 ft) and poly-sheet moisture protection."
      },
      {
        "threat": "Working Capital Cash Flow Squeeze",
        "level": "Moderate",
        "mitigation": "30% Opex allocation (₹126,000) reserved in bank account."
      },
      {
        "threat": "Equipment Maintenance Delay",
        "level": "Low",
        "mitigation": "Standardized machinery with locally serviceable spare parts."
      }
    ]
  },
  {
    "id": "BIZ-09",
    "name": "Refrigerated / Insulated Mini-Van Agro-Logistics Service",
    "category": "Logistics & Supply Chain",
    "preferable_scheme": "PM Formalisation of Micro Food Processing Enterprises (PMFME)",
    "scheme_code": "SCHEME-PMFME-12",
    "alternative_schemes": [
      "Stand-Up India Scheme",
      "PMMY (Tarun)"
    ],
    "credit_tier": "Term Loan Tier",
    "project_cost_inr": 650000,
    "beneficiary_margin_inr": 65000,
    "margin_percent": "10%",
    "loan_amount_inr": 585000,
    "effective_interest_rate": "Commercial bank rate with 35% capital subsidy",
    "subsidy_benefit": "35% Credit-Linked Capital Subsidy (₹2,27,500 non-refundable grant)",
    "tenure": "7 Years (6-month moratorium)",
    "local_rationale": "Solves perishable transit spoilage. Ferries milk, fresh paneer, and leafy vegetables from Balianta rural farms directly to Rasulgarh cold storage and city supermarkets without spoilage during extreme summer heat.",
    "target_market": "Dairy cooperatives, commercial farmers, FMCG distributors",
    "roi_payback_period": "20 - 26 months",
    "impact_score": "Very High (Cuts rural post-harvest losses significantly)",
    "image_url": "assets/cold_storage.jpg",
    "sector": "Agro-Processing & Dairy",
    "viability_score": 91,
    "viability_tag": "EXCELLENT VIABILITY (90%+)",
    "unit_economics": {
      "daily_output": "Commercial micro capacity for Refrigerated / Insulated Mini-Van Agro-Logistics Service",
      "unit_cost": "65% – 70% of gross revenue",
      "selling_price": "Competitive haat benchmark pricing",
      "monthly_profit": "₹45,500 – ₹71,500",
      "breakeven": "6-8 Months"
    },
    "swot": {
      "strengths": [
        "Hyper-local consumer demand for Refrigerated / Insulated Mini-Van Agro-Logistics Service along regional rural transit corridors.",
        "Low 10% Margin requirement of just ₹65,000 accessible to rural SHGs and individual youth."
      ],
      "weaknesses": [
        "Requires disciplined daily raw material inventory and quality controls.",
        "Initial dependence on local retail trader credit collection cycles."
      ],
      "opportunities": [
        "Concessional credit access under PM Formalisation of Micro Food Processing Enterprises (PMFME) with capital margin subsidy.",
        "Expanding customer reach into adjoining peri-urban mandis and weekly rural haats."
      ],
      "threats": [
        "Seasonal monsoon dampness or summer heat requiring climate-proofed shed storage.",
        "Fluctuation in semi-raw material input costs from regional suppliers."
      ]
    },
    "threats_radar": [
      {
        "threat": "Monsoon Road Waterlogging & Dampness",
        "level": "Moderate",
        "mitigation": "Elevated pucca flooring (+3 ft) and poly-sheet moisture protection."
      },
      {
        "threat": "Working Capital Cash Flow Squeeze",
        "level": "Moderate",
        "mitigation": "30% Opex allocation (₹195,000) reserved in bank account."
      },
      {
        "threat": "Equipment Maintenance Delay",
        "level": "Low",
        "mitigation": "Standardized machinery with locally serviceable spare parts."
      }
    ]
  },
  {
    "id": "BIZ-10",
    "name": "Commercial Vehicle Hydraulic Hose & Pneumatic Quick-Repair Service",
    "category": "Highway Automotive Support",
    "preferable_scheme": "Pradhan Mantri MUDRA Yojana (PMMY - Kishore Tier)",
    "scheme_code": "SCHEME-MUDRA-07",
    "alternative_schemes": [
      "PMEGP (Service Sector)",
      "Term Loan Scheme (SCA)"
    ],
    "credit_tier": "Term Loan Tier",
    "project_cost_inr": 280000,
    "beneficiary_margin_inr": 28000,
    "margin_percent": "10%",
    "loan_amount_inr": 252000,
    "effective_interest_rate": "8.5% - 9.5% p.a.",
    "subsidy_benefit": "Zero collateral security required for machinery crimper purchase",
    "tenure": "5 Years (6-month moratorium)",
    "local_rationale": "High volume of dumpers, tippers, and freight trucks on NH-16. When hydraulic hoses burst, trucks are stranded for hours. A specialized crimping and high-pressure hose repair unit captures high-margin emergency business.",
    "target_market": "Highway freight trucks, construction equipment operators, earthmovers",
    "roi_payback_period": "10 - 15 months",
    "impact_score": "Medium (Vital transit infrastructure service)",
    "image_url": "assets/construction_thumb.jpg",
    "sector": "Rural Construction & Infra",
    "viability_score": 83,
    "viability_tag": "HIGH VIABILITY (80-89%)",
    "unit_economics": {
      "daily_output": "Commercial micro capacity for Commercial Vehicle Hydraulic Hose",
      "unit_cost": "65% – 70% of gross revenue",
      "selling_price": "Competitive haat benchmark pricing",
      "monthly_profit": "₹19,600 – ₹30,800",
      "breakeven": "6-8 Months"
    },
    "swot": {
      "strengths": [
        "Hyper-local consumer demand for Commercial Vehicle Hydraulic Hose along regional rural transit corridors.",
        "Low 10% Margin requirement of just ₹28,000 accessible to rural SHGs and individual youth."
      ],
      "weaknesses": [
        "Requires disciplined daily raw material inventory and quality controls.",
        "Initial dependence on local retail trader credit collection cycles."
      ],
      "opportunities": [
        "Concessional credit access under Pradhan Mantri MUDRA Yojana (PMMY - Kishore Tier) with capital margin subsidy.",
        "Expanding customer reach into adjoining peri-urban mandis and weekly rural haats."
      ],
      "threats": [
        "Seasonal monsoon dampness or summer heat requiring climate-proofed shed storage.",
        "Fluctuation in semi-raw material input costs from regional suppliers."
      ]
    },
    "threats_radar": [
      {
        "threat": "Monsoon Road Waterlogging & Dampness",
        "level": "Moderate",
        "mitigation": "Elevated pucca flooring (+3 ft) and poly-sheet moisture protection."
      },
      {
        "threat": "Working Capital Cash Flow Squeeze",
        "level": "Moderate",
        "mitigation": "30% Opex allocation (₹84,000) reserved in bank account."
      },
      {
        "threat": "Equipment Maintenance Delay",
        "level": "Low",
        "mitigation": "Standardized machinery with locally serviceable spare parts."
      }
    ]
  },
  {
    "id": "BIZ-11",
    "name": "Highway Healthy Millet-Cafe & Refreshment Pitstop",
    "category": "Food Services & Hospitality",
    "preferable_scheme": "Mission Shakti WSHG Window (Odisha Millets Mission)",
    "scheme_code": "SCHEME-MSHAKTI-17",
    "alternative_schemes": [
      "Micro Finance Scheme (SCA)",
      "PM SVANidhi"
    ],
    "credit_tier": "Micro Finance Tier",
    "project_cost_inr": 140000,
    "beneficiary_margin_inr": 14000,
    "margin_percent": "10%",
    "loan_amount_inr": 126000,
    "effective_interest_rate": "0.0% p.a. (Under Mission Shakti 0% interest subvention for WSHGs)",
    "subsidy_benefit": "Zero interest cost + priority branding support from Odisha Millets Mission",
    "tenure": "3 Years (3-month moratorium)",
    "local_rationale": "Aligned with the Odisha Millets Mission. Offers hygienic ragi mudhi, millet snacks, freshly brewed tea, and fresh coconut water along NH-16, appealing to health-conscious highway motorists and travelers.",
    "target_market": "Highway commuters, inter-city travelers between Bhubaneswar-Cuttack",
    "roi_payback_period": "7 - 10 months",
    "impact_score": "High (Promotes local indigenous millet consumption)",
    "image_url": "assets/spices_thumb.jpg",
    "sector": "Agro-Processing & Dairy",
    "viability_score": 90,
    "viability_tag": "EXCELLENT VIABILITY (90%+)",
    "unit_economics": {
      "daily_output": "Commercial micro capacity for Highway Healthy Millet-Cafe",
      "unit_cost": "65% – 70% of gross revenue",
      "selling_price": "Competitive haat benchmark pricing",
      "monthly_profit": "₹9,800 – ₹15,400",
      "breakeven": "6-8 Months"
    },
    "swot": {
      "strengths": [
        "Hyper-local consumer demand for Highway Healthy Millet-Cafe along regional rural transit corridors.",
        "Low 10% Margin requirement of just ₹14,000 accessible to rural SHGs and individual youth."
      ],
      "weaknesses": [
        "Requires disciplined daily raw material inventory and quality controls.",
        "Initial dependence on local retail trader credit collection cycles."
      ],
      "opportunities": [
        "Concessional credit access under Mission Shakti WSHG Window (Odisha Millets Mission) with capital margin subsidy.",
        "Expanding customer reach into adjoining peri-urban mandis and weekly rural haats."
      ],
      "threats": [
        "Seasonal monsoon dampness or summer heat requiring climate-proofed shed storage.",
        "Fluctuation in semi-raw material input costs from regional suppliers."
      ]
    },
    "threats_radar": [
      {
        "threat": "Monsoon Road Waterlogging & Dampness",
        "level": "Moderate",
        "mitigation": "Elevated pucca flooring (+3 ft) and poly-sheet moisture protection."
      },
      {
        "threat": "Working Capital Cash Flow Squeeze",
        "level": "Moderate",
        "mitigation": "30% Opex allocation (₹42,000) reserved in bank account."
      },
      {
        "threat": "Equipment Maintenance Delay",
        "level": "Low",
        "mitigation": "Standardized machinery with locally serviceable spare parts."
      }
    ]
  },
  {
    "id": "BIZ-12",
    "name": "Industrial Wooden Pallet & Box Repair/Manufacturing Unit",
    "category": "Logistics Ancillary",
    "preferable_scheme": "Prime Minister's Employment Generation Programme (PMEGP)",
    "scheme_code": "SCHEME-PMEGP-13",
    "alternative_schemes": [
      "PMMY (Kishore)",
      "Term Loan Scheme"
    ],
    "credit_tier": "Term Loan Tier",
    "project_cost_inr": 310000,
    "beneficiary_margin_inr": 31000,
    "margin_percent": "10% (5% for Special Categories)",
    "loan_amount_inr": 279000,
    "effective_interest_rate": "Commercial bank rate with 25-35% capital subsidy",
    "subsidy_benefit": "35% Rural Margin Money Grant (₹1,08,500 non-refundable subsidy)",
    "tenure": "7 Years (6-month moratorium)",
    "local_rationale": "Hansapal is minutes away from Mancheswar Industrial Estate and warehouse clusters. Warehouses require hundreds of wooden/plastic pallets daily for stacking and fork-lift handling.",
    "target_market": "Mancheswar industrial warehouses, logistics depots along NH-16",
    "roi_payback_period": "14 - 18 months",
    "impact_score": "Medium-High (Consistent B2B institutional orders)",
    "image_url": "assets/pottery_craft_thumb.jpg",
    "sector": "Eco-Crafts & Waste Upcycling",
    "viability_score": 82,
    "viability_tag": "HIGH VIABILITY (80-89%)",
    "unit_economics": {
      "daily_output": "Commercial micro capacity for Industrial Wooden Pallet",
      "unit_cost": "65% – 70% of gross revenue",
      "selling_price": "Competitive haat benchmark pricing",
      "monthly_profit": "₹21,700 – ₹34,100",
      "breakeven": "6-8 Months"
    },
    "swot": {
      "strengths": [
        "Hyper-local consumer demand for Industrial Wooden Pallet along regional rural transit corridors.",
        "Low 10% Margin requirement of just ₹31,000 accessible to rural SHGs and individual youth."
      ],
      "weaknesses": [
        "Requires disciplined daily raw material inventory and quality controls.",
        "Initial dependence on local retail trader credit collection cycles."
      ],
      "opportunities": [
        "Concessional credit access under Prime Minister's Employment Generation Programme (PMEGP) with capital margin subsidy.",
        "Expanding customer reach into adjoining peri-urban mandis and weekly rural haats."
      ],
      "threats": [
        "Seasonal monsoon dampness or summer heat requiring climate-proofed shed storage.",
        "Fluctuation in semi-raw material input costs from regional suppliers."
      ]
    },
    "threats_radar": [
      {
        "threat": "Monsoon Road Waterlogging & Dampness",
        "level": "Moderate",
        "mitigation": "Elevated pucca flooring (+3 ft) and poly-sheet moisture protection."
      },
      {
        "threat": "Working Capital Cash Flow Squeeze",
        "level": "Moderate",
        "mitigation": "30% Opex allocation (₹93,000) reserved in bank account."
      },
      {
        "threat": "Equipment Maintenance Delay",
        "level": "Low",
        "mitigation": "Standardized machinery with locally serviceable spare parts."
      }
    ]
  },
  {
    "id": "BIZ-13",
    "name": "Interlocking Concrete Paver Block & Boundary Post Unit",
    "category": "Construction Ancillary",
    "preferable_scheme": "Prime Minister's Employment Generation Programme (PMEGP)",
    "scheme_code": "SCHEME-PMEGP-13",
    "alternative_schemes": [
      "Stand-Up India Scheme",
      "Term Loan Scheme (SCA)"
    ],
    "credit_tier": "Term Loan Tier",
    "project_cost_inr": 490000,
    "beneficiary_margin_inr": 49000,
    "margin_percent": "10%",
    "loan_amount_inr": 441000,
    "effective_interest_rate": "Commercial bank rate with 35% margin money grant",
    "subsidy_benefit": "35% Rural Capital Subsidy (₹1,71,500 direct grant credited to bank)",
    "tenure": "7 Years (6-month moratorium)",
    "local_rationale": "Semi-urban residential layouts, plotting schemes, and farmhouses in Hansapal/Balianta require boundary pillars and paver blocks for driveways. Sand and aggregate readily available from local river beds.",
    "target_market": "Local property developers, independent homebuilders, road contractors",
    "roi_payback_period": "15 - 20 months",
    "impact_score": "High (Generates local semi-skilled employment)",
    "image_url": "assets/construction_thumb.jpg",
    "sector": "Rural Construction & Infra",
    "viability_score": 89,
    "viability_tag": "HIGH VIABILITY (80-89%)",
    "unit_economics": {
      "daily_output": "Commercial micro capacity for Interlocking Concrete Paver Block",
      "unit_cost": "65% – 70% of gross revenue",
      "selling_price": "Competitive haat benchmark pricing",
      "monthly_profit": "₹34,300 – ₹53,900",
      "breakeven": "6-8 Months"
    },
    "swot": {
      "strengths": [
        "Hyper-local consumer demand for Interlocking Concrete Paver Block along regional rural transit corridors.",
        "Low 10% Margin requirement of just ₹49,000 accessible to rural SHGs and individual youth."
      ],
      "weaknesses": [
        "Requires disciplined daily raw material inventory and quality controls.",
        "Initial dependence on local retail trader credit collection cycles."
      ],
      "opportunities": [
        "Concessional credit access under Prime Minister's Employment Generation Programme (PMEGP) with capital margin subsidy.",
        "Expanding customer reach into adjoining peri-urban mandis and weekly rural haats."
      ],
      "threats": [
        "Seasonal monsoon dampness or summer heat requiring climate-proofed shed storage.",
        "Fluctuation in semi-raw material input costs from regional suppliers."
      ]
    },
    "threats_radar": [
      {
        "threat": "Monsoon Road Waterlogging & Dampness",
        "level": "Moderate",
        "mitigation": "Elevated pucca flooring (+3 ft) and poly-sheet moisture protection."
      },
      {
        "threat": "Working Capital Cash Flow Squeeze",
        "level": "Moderate",
        "mitigation": "30% Opex allocation (₹147,000) reserved in bank account."
      },
      {
        "threat": "Equipment Maintenance Delay",
        "level": "Low",
        "mitigation": "Standardized machinery with locally serviceable spare parts."
      }
    ]
  },
  {
    "id": "BIZ-14",
    "name": "Aluminum Fabrication & UPVC Door/Window Workshop",
    "category": "Fabrication & Housing",
    "preferable_scheme": "PM Vishwakarma Scheme (Artisan / Fabrication Category)",
    "scheme_code": "SCHEME-VISHWAKARMA-10",
    "alternative_schemes": [
      "PMEGP (Manufacturing)",
      "PMMY (Kishore)"
    ],
    "credit_tier": "Concessional Artisan / Term Loan Tier",
    "project_cost_inr": 380000,
    "beneficiary_margin_inr": 38000,
    "margin_percent": "10% (0% under pure Vishwakarma tranches)",
    "loan_amount_inr": 342000,
    "effective_interest_rate": "5.0% Fixed per annum (Concessional subsidized interest)",
    "subsidy_benefit": "₹15,000 modern toolkit grant + 5% fixed interest subvention",
    "tenure": "5 Tranches up to 48 months",
    "local_rationale": "High residential construction boom in Hansapal, Naharkanta, and Pandra. UPVC and aluminum sections are replacing traditional wood due to termite resistance and modern aesthetics.",
    "target_market": "New residential duplexes, apartment renovations, commercial shops",
    "roi_payback_period": "12 - 16 months",
    "impact_score": "Medium-High (High value-added margins per square foot)",
    "image_url": "assets/construction_thumb.jpg",
    "sector": "Rural Construction & Infra",
    "viability_score": 96,
    "viability_tag": "EXCELLENT VIABILITY (90%+)",
    "unit_economics": {
      "daily_output": "Commercial micro capacity for Aluminum Fabrication",
      "unit_cost": "65% – 70% of gross revenue",
      "selling_price": "Competitive haat benchmark pricing",
      "monthly_profit": "₹26,600 – ₹41,800",
      "breakeven": "6-8 Months"
    },
    "swot": {
      "strengths": [
        "Hyper-local consumer demand for Aluminum Fabrication along regional rural transit corridors.",
        "Low 10% Margin requirement of just ₹38,000 accessible to rural SHGs and individual youth."
      ],
      "weaknesses": [
        "Requires disciplined daily raw material inventory and quality controls.",
        "Initial dependence on local retail trader credit collection cycles."
      ],
      "opportunities": [
        "Concessional credit access under PM Vishwakarma Scheme (Artisan / Fabrication Category) with capital margin subsidy.",
        "Expanding customer reach into adjoining peri-urban mandis and weekly rural haats."
      ],
      "threats": [
        "Seasonal monsoon dampness or summer heat requiring climate-proofed shed storage.",
        "Fluctuation in semi-raw material input costs from regional suppliers."
      ]
    },
    "threats_radar": [
      {
        "threat": "Monsoon Road Waterlogging & Dampness",
        "level": "Moderate",
        "mitigation": "Elevated pucca flooring (+3 ft) and poly-sheet moisture protection."
      },
      {
        "threat": "Working Capital Cash Flow Squeeze",
        "level": "Moderate",
        "mitigation": "30% Opex allocation (₹114,000) reserved in bank account."
      },
      {
        "threat": "Equipment Maintenance Delay",
        "level": "Low",
        "mitigation": "Standardized machinery with locally serviceable spare parts."
      }
    ]
  },
  {
    "id": "BIZ-15",
    "name": "Contractors' Tool & Equipment Rental Hub (JCB Tools, Scaffolding, Mixers)",
    "category": "Equipment Rental Services",
    "preferable_scheme": "Pradhan Mantri MUDRA Yojana (PMMY - Kishore/Tarun Tier)",
    "scheme_code": "SCHEME-MUDRA-07",
    "alternative_schemes": [
      "PMEGP (Service Sector)",
      "Term Loan Scheme (SCA)"
    ],
    "credit_tier": "Term Loan Tier",
    "project_cost_inr": 450000,
    "beneficiary_margin_inr": 45000,
    "margin_percent": "10%",
    "loan_amount_inr": 405000,
    "effective_interest_rate": "8.5% - 9.5% p.a.",
    "subsidy_benefit": "Zero physical mortgage needed for high-utilization rental machinery",
    "tenure": "5 Years (6-month moratorium)",
    "local_rationale": "Small local village masons cannot afford to buy concrete mixers, steel shuttering plates, vibrators, and jackhammers. A local tool rental depot generates recurring daily rental cashflow.",
    "target_market": "Petty contractors, individual housebuilders, village plumbers/electricians",
    "roi_payback_period": "14 - 18 months",
    "impact_score": "High (Empowers hundreds of unorganized construction workers)",
    "image_url": "assets/tractor.jpg",
    "sector": "Rural Construction & Infra",
    "viability_score": 88,
    "viability_tag": "HIGH VIABILITY (80-89%)",
    "unit_economics": {
      "daily_output": "Commercial micro capacity for Contractors' Tool",
      "unit_cost": "65% – 70% of gross revenue",
      "selling_price": "Competitive haat benchmark pricing",
      "monthly_profit": "₹31,500 – ₹49,500",
      "breakeven": "6-8 Months"
    },
    "swot": {
      "strengths": [
        "Hyper-local consumer demand for Contractors' Tool along regional rural transit corridors.",
        "Low 10% Margin requirement of just ₹45,000 accessible to rural SHGs and individual youth."
      ],
      "weaknesses": [
        "Requires disciplined daily raw material inventory and quality controls.",
        "Initial dependence on local retail trader credit collection cycles."
      ],
      "opportunities": [
        "Concessional credit access under Pradhan Mantri MUDRA Yojana (PMMY - Kishore/Tarun Tier) with capital margin subsidy.",
        "Expanding customer reach into adjoining peri-urban mandis and weekly rural haats."
      ],
      "threats": [
        "Seasonal monsoon dampness or summer heat requiring climate-proofed shed storage.",
        "Fluctuation in semi-raw material input costs from regional suppliers."
      ]
    },
    "threats_radar": [
      {
        "threat": "Monsoon Road Waterlogging & Dampness",
        "level": "Moderate",
        "mitigation": "Elevated pucca flooring (+3 ft) and poly-sheet moisture protection."
      },
      {
        "threat": "Working Capital Cash Flow Squeeze",
        "level": "Moderate",
        "mitigation": "30% Opex allocation (₹135,000) reserved in bank account."
      },
      {
        "threat": "Equipment Maintenance Delay",
        "level": "Low",
        "mitigation": "Standardized machinery with locally serviceable spare parts."
      }
    ]
  },
  {
    "id": "BIZ-16",
    "name": "Solar Rooftop Installation & Inverter Emergency Repair Service",
    "category": "Renewable Energy & Electrical",
    "preferable_scheme": "PM Surya Ghar: Muft Bijli Yojana (Enterprise Solarization)",
    "scheme_code": "SCHEME-SURYAGHAR-19",
    "alternative_schemes": [
      "PMEGP (Green Energy)",
      "PMMY (Kishore)"
    ],
    "credit_tier": "Term Loan Tier",
    "project_cost_inr": 290000,
    "beneficiary_margin_inr": 29000,
    "margin_percent": "10%",
    "loan_amount_inr": 261000,
    "effective_interest_rate": "~7.0% p.a. (Concessional green credit)",
    "subsidy_benefit": "Direct central capital subsidy of up to ₹78,000",
    "tenure": "7 Years (3-month moratorium)",
    "local_rationale": "Frequent summer power outages and cyclone threats in Khordha district make power backup critical. PM Surya Ghar Muft Bijli Yojana is driving massive rooftop solar demand among suburban homeowners.",
    "target_market": "Hansapal independent homes, poultry sheds, micro-enterprises",
    "roi_payback_period": "11 - 15 months",
    "impact_score": "Very High (Enhances disaster resilience during cyclones)",
    "image_url": "assets/solar_dryer.jpg",
    "sector": "Green Energy & EV",
    "viability_score": 96,
    "viability_tag": "EXCELLENT VIABILITY (90%+)",
    "unit_economics": {
      "daily_output": "Commercial micro capacity for Solar Rooftop Installation",
      "unit_cost": "65% – 70% of gross revenue",
      "selling_price": "Competitive haat benchmark pricing",
      "monthly_profit": "₹20,300 – ₹31,900",
      "breakeven": "6-8 Months"
    },
    "swot": {
      "strengths": [
        "Hyper-local consumer demand for Solar Rooftop Installation along regional rural transit corridors.",
        "Low 10% Margin requirement of just ₹29,000 accessible to rural SHGs and individual youth."
      ],
      "weaknesses": [
        "Requires disciplined daily raw material inventory and quality controls.",
        "Initial dependence on local retail trader credit collection cycles."
      ],
      "opportunities": [
        "Concessional credit access under PM Surya Ghar: Muft Bijli Yojana (Enterprise Solarization) with capital margin subsidy.",
        "Expanding customer reach into adjoining peri-urban mandis and weekly rural haats."
      ],
      "threats": [
        "Seasonal monsoon dampness or summer heat requiring climate-proofed shed storage.",
        "Fluctuation in semi-raw material input costs from regional suppliers."
      ]
    },
    "threats_radar": [
      {
        "threat": "Monsoon Road Waterlogging & Dampness",
        "level": "Moderate",
        "mitigation": "Elevated pucca flooring (+3 ft) and poly-sheet moisture protection."
      },
      {
        "threat": "Working Capital Cash Flow Squeeze",
        "level": "Moderate",
        "mitigation": "30% Opex allocation (₹87,000) reserved in bank account."
      },
      {
        "threat": "Equipment Maintenance Delay",
        "level": "Low",
        "mitigation": "Standardized machinery with locally serviceable spare parts."
      }
    ]
  },
  {
    "id": "BIZ-17",
    "name": "Mobile Plumbing, Sanitary & Electrical Maintenance Van",
    "category": "On-Demand Home Services",
    "preferable_scheme": "PM SVANidhi (Tranche 3) / PMMY (Shishu-Kishore)",
    "scheme_code": "SCHEME-SVANIDHI-09",
    "alternative_schemes": [
      "Micro Finance Scheme (SCA)",
      "PMMY (Shishu)"
    ],
    "credit_tier": "Micro Finance Tier",
    "project_cost_inr": 130000,
    "beneficiary_margin_inr": 13000,
    "margin_percent": "10%",
    "loan_amount_inr": 117000,
    "effective_interest_rate": "Base bank rate with 7.0% interest subsidy under SVANidhi",
    "subsidy_benefit": "7% Interest Subsidy credited directly + ₹1,200/year digital cashback",
    "tenure": "3 Years (Immediate repayment)",
    "local_rationale": "New housing societies struggle to find trustworthy, quick-response plumbers and electricians for burst pipes, motor repair, and wiring faults. A branded two-wheeler/three-wheeler service creates instant trust.",
    "target_market": "Apartment societies, duplex gated communities in Hansapal-Naharkanta",
    "roi_payback_period": "6 - 9 months",
    "impact_score": "High (High daily cash collections, low overheads)",
    "image_url": "assets/digital_kiosk_thumb.jpg",
    "sector": "Digital & Rural Services",
    "viability_score": 87,
    "viability_tag": "HIGH VIABILITY (80-89%)",
    "unit_economics": {
      "daily_output": "Commercial micro capacity for Mobile Plumbing, Sanitary",
      "unit_cost": "65% – 70% of gross revenue",
      "selling_price": "Competitive haat benchmark pricing",
      "monthly_profit": "₹9,100 – ₹14,300",
      "breakeven": "6-8 Months"
    },
    "swot": {
      "strengths": [
        "Hyper-local consumer demand for Mobile Plumbing, Sanitary along regional rural transit corridors.",
        "Low 10% Margin requirement of just ₹13,000 accessible to rural SHGs and individual youth."
      ],
      "weaknesses": [
        "Requires disciplined daily raw material inventory and quality controls.",
        "Initial dependence on local retail trader credit collection cycles."
      ],
      "opportunities": [
        "Concessional credit access under PM SVANidhi (Tranche 3) / PMMY (Shishu-Kishore) with capital margin subsidy.",
        "Expanding customer reach into adjoining peri-urban mandis and weekly rural haats."
      ],
      "threats": [
        "Seasonal monsoon dampness or summer heat requiring climate-proofed shed storage.",
        "Fluctuation in semi-raw material input costs from regional suppliers."
      ]
    },
    "threats_radar": [
      {
        "threat": "Monsoon Road Waterlogging & Dampness",
        "level": "Moderate",
        "mitigation": "Elevated pucca flooring (+3 ft) and poly-sheet moisture protection."
      },
      {
        "threat": "Working Capital Cash Flow Squeeze",
        "level": "Moderate",
        "mitigation": "30% Opex allocation (₹39,000) reserved in bank account."
      },
      {
        "threat": "Equipment Maintenance Delay",
        "level": "Low",
        "mitigation": "Standardized machinery with locally serviceable spare parts."
      }
    ]
  },
  {
    "id": "BIZ-18",
    "name": "Mechanized Puffed Rice (Mudhi) & Flattened Rice (Chuda) Processing",
    "category": "Food Processing",
    "preferable_scheme": "PM Formalisation of Micro Food Processing Enterprises (PMFME)",
    "scheme_code": "SCHEME-PMFME-12",
    "alternative_schemes": [
      "PMEGP (Manufacturing)",
      "Term Loan Scheme (SCA)"
    ],
    "credit_tier": "Term Loan Tier",
    "project_cost_inr": 340000,
    "beneficiary_margin_inr": 34000,
    "margin_percent": "10%",
    "loan_amount_inr": 306000,
    "effective_interest_rate": "Commercial bank rate with 35% capital subsidy",
    "subsidy_benefit": "35% Capital Subsidy (₹1,19,000 non-refundable grant)",
    "tenure": "6 Years (6-month moratorium)",
    "local_rationale": "Mudhi and Chuda are breakfast staples consumed in 90%+ of households across Odisha. Sourcing local paddy and roasting with modern electric/roaster machines delivers hygienic, high-margin packaged snacks.",
    "target_market": "Kirana retail stores, roadside tea stalls, wholesale grocery distributors",
    "roi_payback_period": "12 - 16 months",
    "impact_score": "High (Staple food product with year-round non-cyclical demand)",
    "image_url": "assets/flour_mill.jpg",
    "sector": "Agro-Processing & Dairy",
    "viability_score": 94,
    "viability_tag": "EXCELLENT VIABILITY (90%+)",
    "unit_economics": {
      "daily_output": "Commercial micro capacity for Mechanized Puffed Rice (Mudhi)",
      "unit_cost": "65% – 70% of gross revenue",
      "selling_price": "Competitive haat benchmark pricing",
      "monthly_profit": "₹23,800 – ₹37,400",
      "breakeven": "6-8 Months"
    },
    "swot": {
      "strengths": [
        "Hyper-local consumer demand for Mechanized Puffed Rice (Mudhi) along regional rural transit corridors.",
        "Low 10% Margin requirement of just ₹34,000 accessible to rural SHGs and individual youth."
      ],
      "weaknesses": [
        "Requires disciplined daily raw material inventory and quality controls.",
        "Initial dependence on local retail trader credit collection cycles."
      ],
      "opportunities": [
        "Concessional credit access under PM Formalisation of Micro Food Processing Enterprises (PMFME) with capital margin subsidy.",
        "Expanding customer reach into adjoining peri-urban mandis and weekly rural haats."
      ],
      "threats": [
        "Seasonal monsoon dampness or summer heat requiring climate-proofed shed storage.",
        "Fluctuation in semi-raw material input costs from regional suppliers."
      ]
    },
    "threats_radar": [
      {
        "threat": "Monsoon Road Waterlogging & Dampness",
        "level": "Moderate",
        "mitigation": "Elevated pucca flooring (+3 ft) and poly-sheet moisture protection."
      },
      {
        "threat": "Working Capital Cash Flow Squeeze",
        "level": "Moderate",
        "mitigation": "30% Opex allocation (₹102,000) reserved in bank account."
      },
      {
        "threat": "Equipment Maintenance Delay",
        "level": "Low",
        "mitigation": "Standardized machinery with locally serviceable spare parts."
      }
    ]
  },
  {
    "id": "BIZ-19",
    "name": "Cold-Pressed (Kachi Ghani) Mustard & Groundnut Oil Expeller",
    "category": "Agro-Processing",
    "preferable_scheme": "PM Formalisation of Micro Food Processing Enterprises (PMFME)",
    "scheme_code": "SCHEME-PMFME-12",
    "alternative_schemes": [
      "PMEGP (Agro-Processing)",
      "MKUY (40% Subsidy)"
    ],
    "credit_tier": "Term Loan Tier",
    "project_cost_inr": 410000,
    "beneficiary_margin_inr": 41000,
    "margin_percent": "10%",
    "loan_amount_inr": 369000,
    "effective_interest_rate": "Bank MSME rate with 35% credit-linked capital subsidy",
    "subsidy_benefit": "35% Capital Grant (₹1,43,500 credited upfront against loan)",
    "tenure": "6 Years (6-month moratorium)",
    "local_rationale": "Odisha cuisine heavily relies on pungent pure mustard oil. Consumers in peri-urban areas are shifting away from adulterated refined oils towards live cold-pressed oils. Oilcake (khali) by-product is sold to dairy farmers.",
    "target_market": "Local residential consumers, restaurants, sweetmakers",
    "roi_payback_period": "14 - 18 months",
    "impact_score": "High (Twin revenue from oil + cattle feed cake)",
    "image_url": "assets/oil_mill_thumb.jpg",
    "sector": "Agro-Processing & Dairy",
    "viability_score": 86,
    "viability_tag": "HIGH VIABILITY (80-89%)",
    "unit_economics": {
      "daily_output": "Commercial micro capacity for Cold-Pressed (Kachi Ghani) Mustard",
      "unit_cost": "65% – 70% of gross revenue",
      "selling_price": "Competitive haat benchmark pricing",
      "monthly_profit": "₹28,700 – ₹45,100",
      "breakeven": "6-8 Months"
    },
    "swot": {
      "strengths": [
        "Hyper-local consumer demand for Cold-Pressed (Kachi Ghani) Mustard along regional rural transit corridors.",
        "Low 10% Margin requirement of just ₹41,000 accessible to rural SHGs and individual youth."
      ],
      "weaknesses": [
        "Requires disciplined daily raw material inventory and quality controls.",
        "Initial dependence on local retail trader credit collection cycles."
      ],
      "opportunities": [
        "Concessional credit access under PM Formalisation of Micro Food Processing Enterprises (PMFME) with capital margin subsidy.",
        "Expanding customer reach into adjoining peri-urban mandis and weekly rural haats."
      ],
      "threats": [
        "Seasonal monsoon dampness or summer heat requiring climate-proofed shed storage.",
        "Fluctuation in semi-raw material input costs from regional suppliers."
      ]
    },
    "threats_radar": [
      {
        "threat": "Monsoon Road Waterlogging & Dampness",
        "level": "Moderate",
        "mitigation": "Elevated pucca flooring (+3 ft) and poly-sheet moisture protection."
      },
      {
        "threat": "Working Capital Cash Flow Squeeze",
        "level": "Moderate",
        "mitigation": "30% Opex allocation (₹123,000) reserved in bank account."
      },
      {
        "threat": "Equipment Maintenance Delay",
        "level": "Low",
        "mitigation": "Standardized machinery with locally serviceable spare parts."
      }
    ]
  },
  {
    "id": "BIZ-20",
    "name": "Micro Spice Grinding & Customized Packaging (Panch Phoron & Turmeric)",
    "category": "Agro-Processing",
    "preferable_scheme": "Mahila Samriddhi Yojana (MSY) / Mission Shakti",
    "scheme_code": "SCHEME-MSY-03",
    "alternative_schemes": [
      "PMFME (Micro)",
      "Micro Finance Scheme (SCA)"
    ],
    "credit_tier": "Micro Finance Tier",
    "project_cost_inr": 125000,
    "beneficiary_margin_inr": 12500,
    "margin_percent": "10%",
    "loan_amount_inr": 112500,
    "effective_interest_rate": "4.0% p.a. (Mahila Samriddhi concessional rate) or 0% under Mission Shakti",
    "subsidy_benefit": "4% Subsidized Interest Rate + Zero collateral for women entrepreneurs",
    "tenure": "5 Years (6-month moratorium)",
    "local_rationale": "Raw spices (turmeric, coriander, cumin, mustard) can be sourced in bulk from rural mandis and pulverized into authentic chemical-free powders in 100g/250g pouches for retail shops.",
    "target_market": "Local grocery shops, highway restaurants, residential consumers",
    "roi_payback_period": "8 - 11 months",
    "impact_score": "Medium-High (Ideal for women-led SHG micro-enterprise)",
    "image_url": "assets/spices_thumb.jpg",
    "sector": "Agro-Processing & Dairy",
    "viability_score": 93,
    "viability_tag": "EXCELLENT VIABILITY (90%+)",
    "unit_economics": {
      "daily_output": "Commercial micro capacity for Micro Spice Grinding",
      "unit_cost": "65% – 70% of gross revenue",
      "selling_price": "Competitive haat benchmark pricing",
      "monthly_profit": "₹8,750 – ₹13,750",
      "breakeven": "6-8 Months"
    },
    "swot": {
      "strengths": [
        "Hyper-local consumer demand for Micro Spice Grinding along regional rural transit corridors.",
        "Low 10% Margin requirement of just ₹12,500 accessible to rural SHGs and individual youth."
      ],
      "weaknesses": [
        "Requires disciplined daily raw material inventory and quality controls.",
        "Initial dependence on local retail trader credit collection cycles."
      ],
      "opportunities": [
        "Concessional credit access under Mahila Samriddhi Yojana (MSY) / Mission Shakti with capital margin subsidy.",
        "Expanding customer reach into adjoining peri-urban mandis and weekly rural haats."
      ],
      "threats": [
        "Seasonal monsoon dampness or summer heat requiring climate-proofed shed storage.",
        "Fluctuation in semi-raw material input costs from regional suppliers."
      ]
    },
    "threats_radar": [
      {
        "threat": "Monsoon Road Waterlogging & Dampness",
        "level": "Moderate",
        "mitigation": "Elevated pucca flooring (+3 ft) and poly-sheet moisture protection."
      },
      {
        "threat": "Working Capital Cash Flow Squeeze",
        "level": "Moderate",
        "mitigation": "30% Opex allocation (₹37,500) reserved in bank account."
      },
      {
        "threat": "Equipment Maintenance Delay",
        "level": "Low",
        "mitigation": "Standardized machinery with locally serviceable spare parts."
      }
    ]
  },
  {
    "id": "BIZ-21",
    "name": "Fresh Idli/Dosa Batter & Chapati/Roti Semi-Automated Unit",
    "category": "Ready-to-Cook Foods",
    "preferable_scheme": "Pradhan Mantri MUDRA Yojana (PMMY - Kishore Tier)",
    "scheme_code": "SCHEME-MUDRA-07",
    "alternative_schemes": [
      "Mission Shakti WSHG",
      "Micro Finance Scheme"
    ],
    "credit_tier": "Micro Finance Tier",
    "project_cost_inr": 135000,
    "beneficiary_margin_inr": 13500,
    "margin_percent": "10%",
    "loan_amount_inr": 121500,
    "effective_interest_rate": "8.5% p.a.",
    "subsidy_benefit": "Zero collateral security, fast single-window processing",
    "tenure": "3 Years (3-month moratorium)",
    "local_rationale": "Growing population of working couples, IT employees, and students in Hansapal-Rasulgarh apartments who need instant, preservative-free fresh breakfast batter and machine-rolled rotis every morning.",
    "target_market": "Apartment societies, local grocery stores, working professionals",
    "roi_payback_period": "6 - 9 months",
    "impact_score": "High (Instant daily morning turnover with high margins)",
    "image_url": "assets/flour_mill.jpg",
    "sector": "Agro-Processing & Dairy",
    "viability_score": 85,
    "viability_tag": "HIGH VIABILITY (80-89%)",
    "unit_economics": {
      "daily_output": "Commercial micro capacity for Fresh Idli/Dosa Batter",
      "unit_cost": "65% – 70% of gross revenue",
      "selling_price": "Competitive haat benchmark pricing",
      "monthly_profit": "₹9,450 – ₹14,850",
      "breakeven": "6-8 Months"
    },
    "swot": {
      "strengths": [
        "Hyper-local consumer demand for Fresh Idli/Dosa Batter along regional rural transit corridors.",
        "Low 10% Margin requirement of just ₹13,500 accessible to rural SHGs and individual youth."
      ],
      "weaknesses": [
        "Requires disciplined daily raw material inventory and quality controls.",
        "Initial dependence on local retail trader credit collection cycles."
      ],
      "opportunities": [
        "Concessional credit access under Pradhan Mantri MUDRA Yojana (PMMY - Kishore Tier) with capital margin subsidy.",
        "Expanding customer reach into adjoining peri-urban mandis and weekly rural haats."
      ],
      "threats": [
        "Seasonal monsoon dampness or summer heat requiring climate-proofed shed storage.",
        "Fluctuation in semi-raw material input costs from regional suppliers."
      ]
    },
    "threats_radar": [
      {
        "threat": "Monsoon Road Waterlogging & Dampness",
        "level": "Moderate",
        "mitigation": "Elevated pucca flooring (+3 ft) and poly-sheet moisture protection."
      },
      {
        "threat": "Working Capital Cash Flow Squeeze",
        "level": "Moderate",
        "mitigation": "30% Opex allocation (₹40,500) reserved in bank account."
      },
      {
        "threat": "Equipment Maintenance Delay",
        "level": "Low",
        "mitigation": "Standardized machinery with locally serviceable spare parts."
      }
    ]
  },
  {
    "id": "BIZ-22",
    "name": "Traditional Odisha Sweet (Chhena Poda & Rasabali) Packaging Unit",
    "category": "Ethnic Food Processing",
    "preferable_scheme": "PM Formalisation of Micro Food Processing Enterprises (PMFME - ODOP)",
    "scheme_code": "SCHEME-PMFME-12",
    "alternative_schemes": [
      "PMEGP (Food Sector)",
      "Term Loan Scheme (SCA)"
    ],
    "credit_tier": "Term Loan Tier",
    "project_cost_inr": 360000,
    "beneficiary_margin_inr": 36000,
    "margin_percent": "10%",
    "loan_amount_inr": 324000,
    "effective_interest_rate": "Commercial bank rate with 35% capital subsidy",
    "subsidy_benefit": "35% Capital Subsidy (₹1,26,000 grant) under ODOP Milk Sweet cluster",
    "tenure": "6 Years (6-month moratorium)",
    "local_rationale": "Hansapal is located on the route between Pahala (famous for Rasagola) and Bhubaneswar. Vacuum-packaging authentic baked Chhena Poda extends shelf life to 15 days, allowing highway sales and gift packaging.",
    "target_market": "Highway gift travelers, airport shops, local festival orders",
    "roi_payback_period": "12 - 16 months",
    "impact_score": "Very High (Preserves and commercializes regional GI-level sweet heritage)",
    "image_url": "assets/dairy_thumb.jpg",
    "sector": "Agro-Processing & Dairy",
    "viability_score": 92,
    "viability_tag": "EXCELLENT VIABILITY (90%+)",
    "unit_economics": {
      "daily_output": "Commercial micro capacity for Traditional Odisha Sweet (Chhena Poda",
      "unit_cost": "65% – 70% of gross revenue",
      "selling_price": "Competitive haat benchmark pricing",
      "monthly_profit": "₹25,200 – ₹39,600",
      "breakeven": "6-8 Months"
    },
    "swot": {
      "strengths": [
        "Hyper-local consumer demand for Traditional Odisha Sweet (Chhena Poda along regional rural transit corridors.",
        "Low 10% Margin requirement of just ₹36,000 accessible to rural SHGs and individual youth."
      ],
      "weaknesses": [
        "Requires disciplined daily raw material inventory and quality controls.",
        "Initial dependence on local retail trader credit collection cycles."
      ],
      "opportunities": [
        "Concessional credit access under PM Formalisation of Micro Food Processing Enterprises (PMFME - ODOP) with capital margin subsidy.",
        "Expanding customer reach into adjoining peri-urban mandis and weekly rural haats."
      ],
      "threats": [
        "Seasonal monsoon dampness or summer heat requiring climate-proofed shed storage.",
        "Fluctuation in semi-raw material input costs from regional suppliers."
      ]
    },
    "threats_radar": [
      {
        "threat": "Monsoon Road Waterlogging & Dampness",
        "level": "Moderate",
        "mitigation": "Elevated pucca flooring (+3 ft) and poly-sheet moisture protection."
      },
      {
        "threat": "Working Capital Cash Flow Squeeze",
        "level": "Moderate",
        "mitigation": "30% Opex allocation (₹108,000) reserved in bank account."
      },
      {
        "threat": "Equipment Maintenance Delay",
        "level": "Low",
        "mitigation": "Standardized machinery with locally serviceable spare parts."
      }
    ]
  },
  {
    "id": "BIZ-23",
    "name": "Sal & Areca Nut Leaf Biodegradable Plate/Bowl Manufacturing",
    "category": "Eco-Packaging & Green Manufacturing",
    "preferable_scheme": "Prime Minister's Employment Generation Programme (PMEGP)",
    "scheme_code": "SCHEME-PMEGP-13",
    "alternative_schemes": [
      "Mission Shakti WSHG",
      "Micro Finance Scheme (SCA)"
    ],
    "credit_tier": "Micro Finance Tier",
    "project_cost_inr": 138000,
    "beneficiary_margin_inr": 13800,
    "margin_percent": "10% (5% for Special Categories)",
    "loan_amount_inr": 124200,
    "effective_interest_rate": "Bank rate with 35% non-refundable grant for rural units",
    "subsidy_benefit": "35% Rural Margin Subsidy (₹48,300 government grant)",
    "tenure": "3 Years (3-month moratorium)",
    "local_rationale": "Odisha state ban on single-use plastics has created a massive shortage of dining plates for weddings, temple feasts, and street food vendors. Raw leaves easily procurable from surrounding rural belts.",
    "target_market": "Catering services, local temple trusts, roadside dhabas and food stalls",
    "roi_payback_period": "8 - 12 months",
    "impact_score": "Very High (Direct environmental impact; replaces plastic waste)",
    "image_url": "assets/leaf_plates_thumb.jpg",
    "sector": "Eco-Crafts & Waste Upcycling",
    "viability_score": 84,
    "viability_tag": "HIGH VIABILITY (80-89%)",
    "unit_economics": {
      "daily_output": "Commercial micro capacity for Sal",
      "unit_cost": "65% – 70% of gross revenue",
      "selling_price": "Competitive haat benchmark pricing",
      "monthly_profit": "₹9,660 – ₹15,180",
      "breakeven": "6-8 Months"
    },
    "swot": {
      "strengths": [
        "Hyper-local consumer demand for Sal along regional rural transit corridors.",
        "Low 10% Margin requirement of just ₹13,800 accessible to rural SHGs and individual youth."
      ],
      "weaknesses": [
        "Requires disciplined daily raw material inventory and quality controls.",
        "Initial dependence on local retail trader credit collection cycles."
      ],
      "opportunities": [
        "Concessional credit access under Prime Minister's Employment Generation Programme (PMEGP) with capital margin subsidy.",
        "Expanding customer reach into adjoining peri-urban mandis and weekly rural haats."
      ],
      "threats": [
        "Seasonal monsoon dampness or summer heat requiring climate-proofed shed storage.",
        "Fluctuation in semi-raw material input costs from regional suppliers."
      ]
    },
    "threats_radar": [
      {
        "threat": "Monsoon Road Waterlogging & Dampness",
        "level": "Moderate",
        "mitigation": "Elevated pucca flooring (+3 ft) and poly-sheet moisture protection."
      },
      {
        "threat": "Working Capital Cash Flow Squeeze",
        "level": "Moderate",
        "mitigation": "30% Opex allocation (₹41,400) reserved in bank account."
      },
      {
        "threat": "Equipment Maintenance Delay",
        "level": "Low",
        "mitigation": "Standardized machinery with locally serviceable spare parts."
      }
    ]
  },
  {
    "id": "BIZ-24",
    "name": "Corrugated Box & Paper Carry-Bag Semi-Automatic Making Machine",
    "category": "Packaging Manufacturing",
    "preferable_scheme": "Prime Minister's Employment Generation Programme (PMEGP)",
    "scheme_code": "SCHEME-PMEGP-13",
    "alternative_schemes": [
      "Stand-Up India",
      "Term Loan Scheme (SCA)"
    ],
    "credit_tier": "Term Loan Tier",
    "project_cost_inr": 460000,
    "beneficiary_margin_inr": 46000,
    "margin_percent": "10% (5% for Special Categories)",
    "loan_amount_inr": 414000,
    "effective_interest_rate": "Commercial bank rate with 35% rural grant",
    "subsidy_benefit": "35% Margin Money Subsidy (₹1,61,000 non-refundable subsidy)",
    "tenure": "7 Years (6-month moratorium)",
    "local_rationale": "Close to Mancheswar industrial units, e-commerce dispatch hubs, and retail apparel stores at Symphony Mall/Rasulgarh that consume tens of thousands of paper bags and packaging cartons weekly.",
    "target_market": "Garment stores, sweet shops, pharmaceutical stores, Mancheswar factories",
    "roi_payback_period": "16 - 22 months",
    "impact_score": "High (Substitutes banned plastic bags)",
    "image_url": "assets/leaf_plates_thumb.jpg",
    "sector": "Eco-Crafts & Waste Upcycling",
    "viability_score": 91,
    "viability_tag": "EXCELLENT VIABILITY (90%+)",
    "unit_economics": {
      "daily_output": "Commercial micro capacity for Corrugated Box",
      "unit_cost": "65% – 70% of gross revenue",
      "selling_price": "Competitive haat benchmark pricing",
      "monthly_profit": "₹32,200 – ₹50,600",
      "breakeven": "6-8 Months"
    },
    "swot": {
      "strengths": [
        "Hyper-local consumer demand for Corrugated Box along regional rural transit corridors.",
        "Low 10% Margin requirement of just ₹46,000 accessible to rural SHGs and individual youth."
      ],
      "weaknesses": [
        "Requires disciplined daily raw material inventory and quality controls.",
        "Initial dependence on local retail trader credit collection cycles."
      ],
      "opportunities": [
        "Concessional credit access under Prime Minister's Employment Generation Programme (PMEGP) with capital margin subsidy.",
        "Expanding customer reach into adjoining peri-urban mandis and weekly rural haats."
      ],
      "threats": [
        "Seasonal monsoon dampness or summer heat requiring climate-proofed shed storage.",
        "Fluctuation in semi-raw material input costs from regional suppliers."
      ]
    },
    "threats_radar": [
      {
        "threat": "Monsoon Road Waterlogging & Dampness",
        "level": "Moderate",
        "mitigation": "Elevated pucca flooring (+3 ft) and poly-sheet moisture protection."
      },
      {
        "threat": "Working Capital Cash Flow Squeeze",
        "level": "Moderate",
        "mitigation": "30% Opex allocation (₹138,000) reserved in bank account."
      },
      {
        "threat": "Equipment Maintenance Delay",
        "level": "Low",
        "mitigation": "Standardized machinery with locally serviceable spare parts."
      }
    ]
  },
  {
    "id": "BIZ-25",
    "name": "Plastic & Cardboard Waste Baling/Shredding Aggregation Depot",
    "category": "Recycling & Circular Economy",
    "preferable_scheme": "Mahila Adhikarita Yojana (MAY) / PMEGP",
    "scheme_code": "SCHEME-MAY-06",
    "alternative_schemes": [
      "PMEGP (Recycling)",
      "Term Loan Scheme (SCA)"
    ],
    "credit_tier": "Term Loan Tier",
    "project_cost_inr": 320000,
    "beneficiary_margin_inr": 32000,
    "margin_percent": "10% (Nil for Safai Karamchari women)",
    "loan_amount_inr": 288000,
    "effective_interest_rate": "1.0% to 4.0% p.a. (Under NSKFDC Mahila Adhikarita window)",
    "subsidy_benefit": "Ultra-low 1-4% interest rate for sanitation worker families",
    "tenure": "5 Years (6-month moratorium)",
    "local_rationale": "Massive volumes of packaging waste generated by wholesale markets and logistics warehouses along NH-16. Compacted and baled plastic/cardboard sells at premium rates to industrial recycling plants.",
    "target_market": "Industrial paper and plastic recyclers in Cuttack & Mancheswar",
    "roi_payback_period": "11 - 15 months",
    "impact_score": "Very High (Keeps Kuakhai riverbanks and roadsides clean)",
    "image_url": "assets/cold_storage.jpg",
    "sector": "Eco-Crafts & Waste Upcycling",
    "viability_score": 83,
    "viability_tag": "HIGH VIABILITY (80-89%)",
    "unit_economics": {
      "daily_output": "Commercial micro capacity for Plastic",
      "unit_cost": "65% – 70% of gross revenue",
      "selling_price": "Competitive haat benchmark pricing",
      "monthly_profit": "₹22,400 – ₹35,200",
      "breakeven": "6-8 Months"
    },
    "swot": {
      "strengths": [
        "Hyper-local consumer demand for Plastic along regional rural transit corridors.",
        "Low 10% Margin requirement of just ₹32,000 accessible to rural SHGs and individual youth."
      ],
      "weaknesses": [
        "Requires disciplined daily raw material inventory and quality controls.",
        "Initial dependence on local retail trader credit collection cycles."
      ],
      "opportunities": [
        "Concessional credit access under Mahila Adhikarita Yojana (MAY) / PMEGP with capital margin subsidy.",
        "Expanding customer reach into adjoining peri-urban mandis and weekly rural haats."
      ],
      "threats": [
        "Seasonal monsoon dampness or summer heat requiring climate-proofed shed storage.",
        "Fluctuation in semi-raw material input costs from regional suppliers."
      ]
    },
    "threats_radar": [
      {
        "threat": "Monsoon Road Waterlogging & Dampness",
        "level": "Moderate",
        "mitigation": "Elevated pucca flooring (+3 ft) and poly-sheet moisture protection."
      },
      {
        "threat": "Working Capital Cash Flow Squeeze",
        "level": "Moderate",
        "mitigation": "30% Opex allocation (₹96,000) reserved in bank account."
      },
      {
        "threat": "Equipment Maintenance Delay",
        "level": "Low",
        "mitigation": "Standardized machinery with locally serviceable spare parts."
      }
    ]
  },
  {
    "id": "BIZ-26",
    "name": "Coir Pith Block & Coconut Husk Fiber Briquette Unit",
    "category": "Agro-Waste Upcycling",
    "preferable_scheme": "PMEGP (Coir Board Rural Industry Window)",
    "scheme_code": "SCHEME-PMEGP-13",
    "alternative_schemes": [
      "NBCFDC (OBC Scheme)",
      "Term Loan Scheme"
    ],
    "credit_tier": "Term Loan Tier",
    "project_cost_inr": 370000,
    "beneficiary_margin_inr": 37000,
    "margin_percent": "10%",
    "loan_amount_inr": 333000,
    "effective_interest_rate": "Commercial bank rate with 35% capital subsidy",
    "subsidy_benefit": "35% Rural Margin Grant (₹1,29,500 non-refundable subsidy)",
    "tenure": "7 Years (6-month moratorium)",
    "local_rationale": "Tons of empty green coconuts discarded daily along the Puri-Cuttack corridor. Processing husk into compressed coir pith blocks for plant nurseries and coir yarn provides high export/domestic demand.",
    "target_market": "Plant nurseries, greenhouse farmers, landscaping agencies",
    "roi_payback_period": "14 - 18 months",
    "impact_score": "High (Eliminates rotting coconut husk mosquito breeding)",
    "image_url": "assets/leaf_plates_thumb.jpg",
    "sector": "Eco-Crafts & Waste Upcycling",
    "viability_score": 90,
    "viability_tag": "EXCELLENT VIABILITY (90%+)",
    "unit_economics": {
      "daily_output": "Commercial micro capacity for Coir Pith Block",
      "unit_cost": "65% – 70% of gross revenue",
      "selling_price": "Competitive haat benchmark pricing",
      "monthly_profit": "₹25,900 – ₹40,700",
      "breakeven": "6-8 Months"
    },
    "swot": {
      "strengths": [
        "Hyper-local consumer demand for Coir Pith Block along regional rural transit corridors.",
        "Low 10% Margin requirement of just ₹37,000 accessible to rural SHGs and individual youth."
      ],
      "weaknesses": [
        "Requires disciplined daily raw material inventory and quality controls.",
        "Initial dependence on local retail trader credit collection cycles."
      ],
      "opportunities": [
        "Concessional credit access under PMEGP (Coir Board Rural Industry Window) with capital margin subsidy.",
        "Expanding customer reach into adjoining peri-urban mandis and weekly rural haats."
      ],
      "threats": [
        "Seasonal monsoon dampness or summer heat requiring climate-proofed shed storage.",
        "Fluctuation in semi-raw material input costs from regional suppliers."
      ]
    },
    "threats_radar": [
      {
        "threat": "Monsoon Road Waterlogging & Dampness",
        "level": "Moderate",
        "mitigation": "Elevated pucca flooring (+3 ft) and poly-sheet moisture protection."
      },
      {
        "threat": "Working Capital Cash Flow Squeeze",
        "level": "Moderate",
        "mitigation": "30% Opex allocation (₹111,000) reserved in bank account."
      },
      {
        "threat": "Equipment Maintenance Delay",
        "level": "Low",
        "mitigation": "Standardized machinery with locally serviceable spare parts."
      }
    ]
  },
  {
    "id": "BIZ-27",
    "name": "Commercial 20L Purified RO Drinking Water ATM & Jar Delivery",
    "category": "Essential Utilities",
    "preferable_scheme": "Prime Minister's Employment Generation Programme (PMEGP - Service)",
    "scheme_code": "SCHEME-PMEGP-13",
    "alternative_schemes": [
      "PMMY (Tarun)",
      "Term Loan Scheme (SCA)"
    ],
    "credit_tier": "Term Loan Tier",
    "project_cost_inr": 330000,
    "beneficiary_margin_inr": 33000,
    "margin_percent": "10%",
    "loan_amount_inr": 297000,
    "effective_interest_rate": "Commercial bank rate with 35% rural margin grant",
    "subsidy_benefit": "35% Rural Margin Money Subsidy (₹1,15,500 grant)",
    "tenure": "7 Years (6-month moratorium)",
    "local_rationale": "Groundwater in some Kuakhai riverine pockets suffers from high iron and seasonal turbidity during floods. High recurring demand for chilled 20L purified water jars from local shops, offices, and homes.",
    "target_market": "Roadside shops, offices, residential households, construction sites",
    "roi_payback_period": "10 - 14 months",
    "impact_score": "Very High (Prevents water-borne illnesses in the community)",
    "image_url": "assets/dairy_thumb.jpg",
    "sector": "Digital & Rural Services",
    "viability_score": 82,
    "viability_tag": "HIGH VIABILITY (80-89%)",
    "unit_economics": {
      "daily_output": "Commercial micro capacity for Commercial 20L Purified RO Drinking Water ATM",
      "unit_cost": "65% – 70% of gross revenue",
      "selling_price": "Competitive haat benchmark pricing",
      "monthly_profit": "₹23,100 – ₹36,300",
      "breakeven": "6-8 Months"
    },
    "swot": {
      "strengths": [
        "Hyper-local consumer demand for Commercial 20L Purified RO Drinking Water ATM along regional rural transit corridors.",
        "Low 10% Margin requirement of just ₹33,000 accessible to rural SHGs and individual youth."
      ],
      "weaknesses": [
        "Requires disciplined daily raw material inventory and quality controls.",
        "Initial dependence on local retail trader credit collection cycles."
      ],
      "opportunities": [
        "Concessional credit access under Prime Minister's Employment Generation Programme (PMEGP - Service) with capital margin subsidy.",
        "Expanding customer reach into adjoining peri-urban mandis and weekly rural haats."
      ],
      "threats": [
        "Seasonal monsoon dampness or summer heat requiring climate-proofed shed storage.",
        "Fluctuation in semi-raw material input costs from regional suppliers."
      ]
    },
    "threats_radar": [
      {
        "threat": "Monsoon Road Waterlogging & Dampness",
        "level": "Moderate",
        "mitigation": "Elevated pucca flooring (+3 ft) and poly-sheet moisture protection."
      },
      {
        "threat": "Working Capital Cash Flow Squeeze",
        "level": "Moderate",
        "mitigation": "30% Opex allocation (₹99,000) reserved in bank account."
      },
      {
        "threat": "Equipment Maintenance Delay",
        "level": "Low",
        "mitigation": "Standardized machinery with locally serviceable spare parts."
      }
    ]
  },
  {
    "id": "BIZ-28",
    "name": "Jan Aushadhi Generic Pharmacy & Rural Tele-Health Kiosk",
    "category": "Healthcare Support",
    "preferable_scheme": "Pradhan Mantri Bhartiya Janaushadhi Pariyojana (PMBJP) + PMMY",
    "scheme_code": "SCHEME-MUDRA-07",
    "alternative_schemes": [
      "Stand-Up India",
      "Term Loan Scheme (SCA)"
    ],
    "credit_tier": "Term Loan Tier",
    "project_cost_inr": 350000,
    "beneficiary_margin_inr": 35000,
    "margin_percent": "10%",
    "loan_amount_inr": 315000,
    "effective_interest_rate": "8.5% - 9.0% p.a. (Collateral-free PMMY Kishore)",
    "subsidy_benefit": "Direct PMBJP Government Incentive of up to ₹5.00 Lakh (paid as 15% monthly purchase incentive)",
    "tenure": "5 Years (6-month moratorium)",
    "local_rationale": "Saves villagers from traveling 5-8 km into central Bhubaneswar hospitals for routine chronic medicines (diabetes, hypertension) and basic tele-doctor consultations.",
    "target_market": "Villagers of Hansapal, Naharkanta, Balianta belt",
    "roi_payback_period": "12 - 16 months",
    "impact_score": "Very High (Cuts rural out-of-pocket health expenditures by 60%)",
    "image_url": "assets/digital_kiosk_thumb.jpg",
    "sector": "Digital & Rural Services",
    "viability_score": 89,
    "viability_tag": "HIGH VIABILITY (80-89%)",
    "unit_economics": {
      "daily_output": "Commercial micro capacity for Jan Aushadhi Generic Pharmacy",
      "unit_cost": "65% – 70% of gross revenue",
      "selling_price": "Competitive haat benchmark pricing",
      "monthly_profit": "₹24,500 – ₹38,500",
      "breakeven": "6-8 Months"
    },
    "swot": {
      "strengths": [
        "Hyper-local consumer demand for Jan Aushadhi Generic Pharmacy along regional rural transit corridors.",
        "Low 10% Margin requirement of just ₹35,000 accessible to rural SHGs and individual youth."
      ],
      "weaknesses": [
        "Requires disciplined daily raw material inventory and quality controls.",
        "Initial dependence on local retail trader credit collection cycles."
      ],
      "opportunities": [
        "Concessional credit access under Pradhan Mantri Bhartiya Janaushadhi Pariyojana (PMBJP) + PMMY with capital margin subsidy.",
        "Expanding customer reach into adjoining peri-urban mandis and weekly rural haats."
      ],
      "threats": [
        "Seasonal monsoon dampness or summer heat requiring climate-proofed shed storage.",
        "Fluctuation in semi-raw material input costs from regional suppliers."
      ]
    },
    "threats_radar": [
      {
        "threat": "Monsoon Road Waterlogging & Dampness",
        "level": "Moderate",
        "mitigation": "Elevated pucca flooring (+3 ft) and poly-sheet moisture protection."
      },
      {
        "threat": "Working Capital Cash Flow Squeeze",
        "level": "Moderate",
        "mitigation": "30% Opex allocation (₹105,000) reserved in bank account."
      },
      {
        "threat": "Equipment Maintenance Delay",
        "level": "Low",
        "mitigation": "Standardized machinery with locally serviceable spare parts."
      }
    ]
  },
  {
    "id": "BIZ-29",
    "name": "Digital Seva & Banking Business Correspondent (BC) Point",
    "category": "Financial & Digital Services",
    "preferable_scheme": "NHFDC Divyangjan Scheme (or PMMY Shishu for Youth)",
    "scheme_code": "SCHEME-NHFDC-15",
    "alternative_schemes": [
      "PMMY (Shishu)",
      "Micro Finance Scheme (SCA)"
    ],
    "credit_tier": "Micro Finance Tier",
    "project_cost_inr": 110000,
    "beneficiary_margin_inr": 11000,
    "margin_percent": "10% (Nil for PwD up to ₹5 Lakh)",
    "loan_amount_inr": 99000,
    "effective_interest_rate": "5.0% - 6.0% p.a. (NHFDC concessional rate)",
    "subsidy_benefit": "Concessional 5% interest rate + 1% special rebate for women",
    "tenure": "5 Years (3-month moratorium)",
    "local_rationale": "Provides doorstep Aadhaar-enabled payments (AePS), Direct Benefit Transfer (DBT) withdrawals, utility bill payments, loan applications, and document printing for local agrarian workers and senior citizens.",
    "target_market": "Local village residents, beneficiaries of PM-KISAN & KALIA schemes",
    "roi_payback_period": "6 - 9 months",
    "impact_score": "High (Direct financial inclusion enabler)",
    "image_url": "assets/digital_kiosk_thumb.jpg",
    "sector": "Digital & Rural Services",
    "viability_score": 96,
    "viability_tag": "EXCELLENT VIABILITY (90%+)",
    "unit_economics": {
      "daily_output": "Commercial micro capacity for Digital Seva",
      "unit_cost": "65% – 70% of gross revenue",
      "selling_price": "Competitive haat benchmark pricing",
      "monthly_profit": "₹7,700 – ₹12,100",
      "breakeven": "6-8 Months"
    },
    "swot": {
      "strengths": [
        "Hyper-local consumer demand for Digital Seva along regional rural transit corridors.",
        "Low 10% Margin requirement of just ₹11,000 accessible to rural SHGs and individual youth."
      ],
      "weaknesses": [
        "Requires disciplined daily raw material inventory and quality controls.",
        "Initial dependence on local retail trader credit collection cycles."
      ],
      "opportunities": [
        "Concessional credit access under NHFDC Divyangjan Scheme (or PMMY Shishu for Youth) with capital margin subsidy.",
        "Expanding customer reach into adjoining peri-urban mandis and weekly rural haats."
      ],
      "threats": [
        "Seasonal monsoon dampness or summer heat requiring climate-proofed shed storage.",
        "Fluctuation in semi-raw material input costs from regional suppliers."
      ]
    },
    "threats_radar": [
      {
        "threat": "Monsoon Road Waterlogging & Dampness",
        "level": "Moderate",
        "mitigation": "Elevated pucca flooring (+3 ft) and poly-sheet moisture protection."
      },
      {
        "threat": "Working Capital Cash Flow Squeeze",
        "level": "Moderate",
        "mitigation": "30% Opex allocation (₹33,000) reserved in bank account."
      },
      {
        "threat": "Equipment Maintenance Delay",
        "level": "Low",
        "mitigation": "Standardized machinery with locally serviceable spare parts."
      }
    ]
  },
  {
    "id": "BIZ-30",
    "name": "Commercial Garment Alteration & Security Guard/School Uniform Stitching Unit",
    "category": "Apparel & Textiles",
    "preferable_scheme": "PM Vishwakarma Scheme (Darzi / Tailor Trade)",
    "scheme_code": "SCHEME-VISHWAKARMA-10",
    "alternative_schemes": [
      "Mahila Samriddhi Yojana (4%)",
      "Mission Shakti WSHG"
    ],
    "credit_tier": "Concessional Artisan / Micro Finance Tier",
    "project_cost_inr": 130000,
    "beneficiary_margin_inr": 13000,
    "margin_percent": "10% (0% under Vishwakarma direct tranche)",
    "loan_amount_inr": 117000,
    "effective_interest_rate": "5.0% Fixed per annum",
    "subsidy_benefit": "₹15,000 free electronic sewing machine/toolkit e-voucher + ₹500/day skill training stipend",
    "tenure": "Tranche 1: 18 months, Tranche 2: 30 months",
    "local_rationale": "Hundreds of private security personnel, factory staff at Mancheswar, and students at nearby schools require uniform tailoring and rapid turnaround alterations. 3-4 motorized sewing machines provide steady contract revenue.",
    "target_market": "Local schools, security guard agencies, Mancheswar industrial workforce",
    "roi_payback_period": "7 - 10 months",
    "impact_score": "High (Empowers local women tailors with dignified regular income)",
    "image_url": "assets/handloom.jpg",
    "sector": "Eco-Crafts & Waste Upcycling",
    "viability_score": 88,
    "viability_tag": "HIGH VIABILITY (80-89%)",
    "unit_economics": {
      "daily_output": "Commercial micro capacity for Commercial Garment Alteration",
      "unit_cost": "65% – 70% of gross revenue",
      "selling_price": "Competitive haat benchmark pricing",
      "monthly_profit": "₹9,100 – ₹14,300",
      "breakeven": "6-8 Months"
    },
    "swot": {
      "strengths": [
        "Hyper-local consumer demand for Commercial Garment Alteration along regional rural transit corridors.",
        "Low 10% Margin requirement of just ₹13,000 accessible to rural SHGs and individual youth."
      ],
      "weaknesses": [
        "Requires disciplined daily raw material inventory and quality controls.",
        "Initial dependence on local retail trader credit collection cycles."
      ],
      "opportunities": [
        "Concessional credit access under PM Vishwakarma Scheme (Darzi / Tailor Trade) with capital margin subsidy.",
        "Expanding customer reach into adjoining peri-urban mandis and weekly rural haats."
      ],
      "threats": [
        "Seasonal monsoon dampness or summer heat requiring climate-proofed shed storage.",
        "Fluctuation in semi-raw material input costs from regional suppliers."
      ]
    },
    "threats_radar": [
      {
        "threat": "Monsoon Road Waterlogging & Dampness",
        "level": "Moderate",
        "mitigation": "Elevated pucca flooring (+3 ft) and poly-sheet moisture protection."
      },
      {
        "threat": "Working Capital Cash Flow Squeeze",
        "level": "Moderate",
        "mitigation": "30% Opex allocation (₹39,000) reserved in bank account."
      },
      {
        "threat": "Equipment Maintenance Delay",
        "level": "Low",
        "mitigation": "Standardized machinery with locally serviceable spare parts."
      }
    ]
  },
  {
    "id": "BIZ-31",
    "name": "Agro-Service Custom Hiring Center (Mini-Tiller, Sprayers & Water Pumps)",
    "category": "Farm Mechanization Services",
    "preferable_scheme": "Mukhyamantri Krushi Udyog Yojana (MKUY - Farm Mechanization)",
    "scheme_code": "SCHEME-MKUY-18",
    "alternative_schemes": [
      "Sub-Mission on Agricultural Mechanization (SMAM - 40% Subsidy)",
      "Term Loan Scheme"
    ],
    "credit_tier": "Term Loan Tier",
    "project_cost_inr": 480000,
    "beneficiary_margin_inr": 48000,
    "margin_percent": "10%",
    "loan_amount_inr": 432000,
    "effective_interest_rate": "Bank agriculture loan rate with 40-50% capital subsidy",
    "subsidy_benefit": "40% (₹1,92,000) for General / 50% (₹2,40,000) for Women/SC/ST/Agri-graduates",
    "tenure": "7 Years (6-month moratorium)",
    "local_rationale": "Smallholder farmers in Balianta and Hansapal own less than 1-2 acres and cannot purchase expensive machinery. Renting battery-operated sprayers, paddy weeders, and diesel pumps by the hour ensures high equipment utilization.",
    "target_market": "Smallholder vegetable and paddy farmers in the 5-10 km radius",
    "roi_payback_period": "14 - 18 months",
    "impact_score": "Very High (Reduces farm labor bottlenecks during planting/harvest)",
    "image_url": "assets/tractor.jpg",
    "sector": "Agro-Processing & Dairy",
    "viability_score": 95,
    "viability_tag": "EXCELLENT VIABILITY (90%+)",
    "unit_economics": {
      "daily_output": "Commercial micro capacity for Agro-Service Custom Hiring Center (Mini-Tiller, Sprayers",
      "unit_cost": "65% – 70% of gross revenue",
      "selling_price": "Competitive haat benchmark pricing",
      "monthly_profit": "₹33,600 – ₹52,800",
      "breakeven": "6-8 Months"
    },
    "swot": {
      "strengths": [
        "Hyper-local consumer demand for Agro-Service Custom Hiring Center (Mini-Tiller, Sprayers along regional rural transit corridors.",
        "Low 10% Margin requirement of just ₹48,000 accessible to rural SHGs and individual youth."
      ],
      "weaknesses": [
        "Requires disciplined daily raw material inventory and quality controls.",
        "Initial dependence on local retail trader credit collection cycles."
      ],
      "opportunities": [
        "Concessional credit access under Mukhyamantri Krushi Udyog Yojana (MKUY - Farm Mechanization) with capital margin subsidy.",
        "Expanding customer reach into adjoining peri-urban mandis and weekly rural haats."
      ],
      "threats": [
        "Seasonal monsoon dampness or summer heat requiring climate-proofed shed storage.",
        "Fluctuation in semi-raw material input costs from regional suppliers."
      ]
    },
    "threats_radar": [
      {
        "threat": "Monsoon Road Waterlogging & Dampness",
        "level": "Moderate",
        "mitigation": "Elevated pucca flooring (+3 ft) and poly-sheet moisture protection."
      },
      {
        "threat": "Working Capital Cash Flow Squeeze",
        "level": "Moderate",
        "mitigation": "30% Opex allocation (₹144,000) reserved in bank account."
      },
      {
        "threat": "Equipment Maintenance Delay",
        "level": "Low",
        "mitigation": "Standardized machinery with locally serviceable spare parts."
      }
    ]
  },
  {
    "id": "BIZ-32",
    "name": "Two-Wheeler Multi-Brand Service & Detailing Workshop",
    "category": "Automotive Services",
    "preferable_scheme": "Pradhan Mantri MUDRA Yojana (PMMY - Kishore Tier)",
    "scheme_code": "SCHEME-MUDRA-07",
    "alternative_schemes": [
      "PMEGP (Service)",
      "Term Loan Scheme (SCA)"
    ],
    "credit_tier": "Term Loan Tier",
    "project_cost_inr": 310000,
    "beneficiary_margin_inr": 31000,
    "margin_percent": "10%",
    "loan_amount_inr": 279000,
    "effective_interest_rate": "8.5% - 9.5% p.a.",
    "subsidy_benefit": "Collateral-free financing for hydraulic ramps and pneumatic tools",
    "tenure": "5 Years (6-month moratorium)",
    "local_rationale": "Hansapal has an enormous daily flow of two-wheelers. Authorized showrooms in Bhubaneswar charge high servicing labor rates. A modern multi-brand garage with pneumatic ramps and computerized oil changes captures steady loyalty.",
    "target_market": "Daily highway commuters, delivery riders, local youth",
    "roi_payback_period": "11 - 15 months",
    "impact_score": "Medium-High (Reliable daily servicing cashflow)",
    "image_url": "assets/ev_thumb.jpg",
    "sector": "Green Energy & EV",
    "viability_score": 87,
    "viability_tag": "HIGH VIABILITY (80-89%)",
    "unit_economics": {
      "daily_output": "Commercial micro capacity for Two-Wheeler Multi-Brand Service",
      "unit_cost": "65% – 70% of gross revenue",
      "selling_price": "Competitive haat benchmark pricing",
      "monthly_profit": "₹21,700 – ₹34,100",
      "breakeven": "6-8 Months"
    },
    "swot": {
      "strengths": [
        "Hyper-local consumer demand for Two-Wheeler Multi-Brand Service along regional rural transit corridors.",
        "Low 10% Margin requirement of just ₹31,000 accessible to rural SHGs and individual youth."
      ],
      "weaknesses": [
        "Requires disciplined daily raw material inventory and quality controls.",
        "Initial dependence on local retail trader credit collection cycles."
      ],
      "opportunities": [
        "Concessional credit access under Pradhan Mantri MUDRA Yojana (PMMY - Kishore Tier) with capital margin subsidy.",
        "Expanding customer reach into adjoining peri-urban mandis and weekly rural haats."
      ],
      "threats": [
        "Seasonal monsoon dampness or summer heat requiring climate-proofed shed storage.",
        "Fluctuation in semi-raw material input costs from regional suppliers."
      ]
    },
    "threats_radar": [
      {
        "threat": "Monsoon Road Waterlogging & Dampness",
        "level": "Moderate",
        "mitigation": "Elevated pucca flooring (+3 ft) and poly-sheet moisture protection."
      },
      {
        "threat": "Working Capital Cash Flow Squeeze",
        "level": "Moderate",
        "mitigation": "30% Opex allocation (₹93,000) reserved in bank account."
      },
      {
        "threat": "Equipment Maintenance Delay",
        "level": "Low",
        "mitigation": "Standardized machinery with locally serviceable spare parts."
      }
    ]
  }
];

const TRANSLATIONS = {
  "en": {
    "govIndia": "GOVERNMENT OF INDIA",
    "govIndiaHindi": "भारत सरकार",
    "portalTitle": "Vyapaar Sarthi",
    "tagline": "Rural Micro-Enterprise Advisory & Concessional Scheme Navigator | Ministry of Social Justice & Empowerment",
    "lblTheme": "Dark Mode",
    "lblLanguage": "Select Language:",
    "ashokaPillarBadge": "State Emblem of India",
    "navHome": "Home",
    "navFeasibility": "Feasibility & Threats",
    "navFinancials": "Financial Engine (10%)",
    "navEnterprises": "32 Enterprise Catalog",
    "navDashboard": "Beneficiary Dashboard",
    "navCompare": "Compare Schemes",
    "navVideo": "Video Guide",
    "btnLogin": "Login / Register",
    "btnLogout": "Logout",
    "heroBadge": "OFFICIAL MSJE MICRO-ENTERPRISE INTELLIGENCE SYSTEM",
    "heroHeading": "AI-Powered Hyper-Local Feasibility & Concessional Credit Portal",
    "heroDesc": "Democratizing rural industrial intelligence across 766 districts. Assess market demand, input supply chain risks, 10% margin beneficiary economics, and channelize MSJE concessional credit seamlessly.",
    "heroChip1": "10% Beneficiary Margin",
    "heroChip2": "Up to 50% Capital Subsidy",
    "heroChip3": "CGTMSE Collateral-Free",
    "heroChip4": "5% Interest Subvention",
    "statDistricts": "766 Districts",
    "statDistrictsSub": "Pan-India Gram Panchayats Mapped",
    "statStates": "28 States & 8 UTs",
    "statStatesSub": "Unified LGD Directory Integrated",
    "statBizPlans": "32 Profitable Plans",
    "statBizPlansSub": "DPRs with Unit Economics",
    "statSubsidy": "Up to ₹1.25 Lakh",
    "statSubsidySub": "Concessional Capital Subsidy",
    "tabFeasibility": "Hyper-Local Feasibility & Threat Radar",
    "tabFinancials": "Smart Financial Engine & Scheme Navigator (10% Margin)",
    "lblWelcome": "Welcome",
    "lblGuest": "Beneficiary Profile",
    "lblCategory": "Social Category",
    "lblLocation": "Target Location",
    "lblPreferredBiz": "Active Enterprise Plan",
    "btnSwitchBiz": "Switch Business",
    "btnEditProfile": "Edit Profile / Change Location",
    "secCategoriesTitle": "Target Social Beneficiary Categories (Select for Tailored Concessional Schemes)",
    "catScSt": "Scheduled Caste / Tribe (SC/ST)",
    "catScStDesc": "NSFDC / NSTFDC capital subsidies up to 40% & 4% interest term loans.",
    "catObc": "Other Backward Classes (OBC)",
    "catObcDesc": "NBCFDC term credit at 4%-5% concessional rates with margin cover.",
    "catDivyangjan": "Divyangjan (PwD)",
    "catDivyangjanDesc": "NHFDC micro-venture funding with 5% interest subvention for disabled entrepreneurs.",
    "catWomen": "Women Self-Help Groups (SHG)",
    "catWomenDesc": "Mahila Samriddhi Yojana with collateral-free financing and marketing linkages.",
    "catEws": "General EWS / Micro-Enterprises",
    "catEwsDesc": "PMEGP / PM-Mudra concessional credit with 25%-35% rural margin subsidy.",
    "secFeasibilityHeading": "Hyper-Local Feasibility & Threat Assessment",
    "secFeasibilitySub": "Spatial AI analysis of raw material supply, local competition, seasonal price volatility, and climate hazards.",
    "lblSelectBiz": "Select Rural Micro-Enterprise:",
    "lblViabilityScore": "Overall Viability Score",
    "radarTitle": "5-Pillar Viability Radar",
    "radarPillar1": "Raw Material Proximity",
    "radarPillar2": "Local Haat Demand Velocity",
    "radarPillar3": "Supply Chain & Transit Resilience",
    "radarPillar4": "Working Capital Liquidity",
    "radarPillar5": "Climate & Monsoon Risk Mitigation",
    "swotTitle": "Hyper-Local SWOT Intelligence",
    "swotStrengths": "Strengths & Locational Edge",
    "swotWeaknesses": "Operational Constraints",
    "swotOpportunities": "Market & Subsidy Catalysts",
    "swotThreats": "Mitigated Hazards",
    "calendarTitle": "12-Month Seasonal Demand & Cash Flow Volatility Calendar",
    "calendarSub": "Plan working capital buffer according to cyclical haat demand and monsoon transit.",
    "competitorTitle": "Local Market Competitor & Infrastructure POI Map",
    "thPoiName": "Enterprise / POI Name",
    "thPoiType": "Category",
    "thPoiDist": "Distance",
    "thPoiImpact": "Competitive Impact",
    "secFinancialHeading": "Smart Financial Structuring & Concessional Scheme Engine",
    "secFinancialSub": "Dynamic 10% beneficiary margin structuring, MSJE capital subsidy optimization, and automated bank DPR generation.",
    "lblSchemeMatched": "Recommended Concessional Scheme:",
    "cardProjectCost": "Total Project Cost",
    "cardSubsidy": "Govt Capital Subsidy",
    "cardMargin": "Beneficiary Margin (10%)",
    "cardLoan": "Bank Term Loan (90%)",
    "cardInterest": "Effective Concessional Rate",
    "cardEmi": "Monthly EMI (5-Yr Repayment)",
    "cardBreakeven": "Estimated Breakeven",
    "cardWorkingCap": "Working Capital Reserve",
    "waterfallTitle": "Waterfall Cash Flow & Revenue Projection (Monthly)",
    "thRevenue": "Gross Monthly Inflow",
    "thOpex": "Raw Material & Opex",
    "thEmi": "Bank Concessional EMI",
    "thNetProfit": "Net Cash Retained by Beneficiary",
    "secDocsTitle": "Mandatory Bank DPR Documentation Checklist",
    "docAadhaar": "Aadhaar Card & PAN Card / Identity Verification",
    "docResidence": "Gram Panchayat Residence / Domicile Certificate",
    "docCaste": "Caste / Category Certificate (for SC/ST/OBC/Divyangjan subsidy)",
    "docQuotation": "Equipment & Machinery Quotation from Certified Vendor",
    "docLand": "Premises Proof (Self-owned deed or Rent Agreement on stamp paper)",
    "secWhereToSubmit": "Where to Submit Your Application (Lead District Banks & SCAs)",
    "btnDownloadDprPdf": "Download Bank-Ready DPR (PDF)",
    "btnShareWhatsApp": "Share Plan on WhatsApp",
    "btnCompareSchemes": "Compare All Concessional Schemes",
    "catalogTitle": "32 Profitable Rural Micro-Enterprise Blueprints",
    "catalogSub": "Curated with unit economics, equipment requirements, and tailored MSJE financing.",
    "filterAll": "All Enterprises (32)",
    "filterAgro": "Agro-Processing & Dairy",
    "filterGreen": "Green Energy & EV",
    "filterCrafts": "Eco-Crafts & Waste Upcycling",
    "filterDigital": "Digital & Rural Services",
    "searchBizPlaceholder": "Search by enterprise name, sector or investment range...",
    "btnSelectEnterprise": "Analyze Feasibility & DPR",
    "dashTitle": "Beneficiary Advisory & Loan Tracker Dashboard",
    "dashSub": "Track your DPR formulation status, bank appraisal, and subsidy claim.",
    "dashAppStatus": "Application Stage: DPR Ready for Bank Submission",
    "dashNextStep": "Next Action: Submit printed DPR with quotation at Lead District Bank",
    "modalLoginTitle": "Beneficiary Onboarding & Location Setup",
    "lblFullName": "Full Name:",
    "lblMobile": "Mobile Number (10 Digits):",
    "lblSocialCategory": "Social / Target Category:",
    "lblState": "State / Union Territory:",
    "lblDistrict": "District:",
    "lblVillage": "Village / Town / Gram Panchayat:",
    "lblPincode": "Postal PIN Code:",
    "lblBizStatus": "Current Enterprise Status:",
    "optNewBiz": "Planning to Start a New Micro-Enterprise",
    "optExpandBiz": "Already Running a Business & Looking to Expand",
    "optSwitchBiz": "Want to Switch to a More Profitable Enterprise",
    "btnLoginSubmit": "Save Profile & Enter Advisory Portal",
    "lblDemoCredentials": "Quick Demo Auto-Fill:",
    "btnDemoFill": "Use Demo Beneficiary Profile",
    "compareModalTitle": "MSJE & Central Concessional Credit Schemes Comparison Matrix",
    "thScheme": "Scheme Name",
    "thTarget": "Target Category",
    "thMaxProject": "Max Project Limit",
    "thSubsidyPct": "Capital Subsidy %",
    "thInterestRate": "Effective Interest Rate",
    "thCollateral": "Collateral Requirement",
    "videoModalTitle": "Portal Video Demonstration & Voice Guide for Rural Entrepreneurs",
    "videoDesc": "Step-by-step audio-visual walkthrough in your regional language explaining how to select an enterprise, read feasibility scores, and obtain a 10% margin bank sanction.",
    "audioTitle": "Audio Sarthi (Voice Assistant)",
    "audioDesc": "Listen to the complete business appraisal and bank guidelines in your mother tongue.",
    "btnPlayVoice": "Listen in Your Language",
    "btnPauseVoice": "Pause Audio",
    "footerCopyright": "Vyapaar Sarthi — Ministry of Social Justice and Empowerment, Government of India. Designed for Rural Micro-Enterprises.",
    "lblQuarterlyEmi": "Quarterly EMI Repayment",
    "lblMonthlyEq": "Monthly Equivalent Burden",
    "lblTotalInterest": "Total Loan Interest Over Tenure",
    "lblTotalRepaid": "Total Repaid Over Tenure",
    "videoSectionTitle": "Official Video Demonstration & Voice Guide for Rural Entrepreneurs",
    "videoSectionDesc": "A complete audio-visual walkthrough explaining how to select an enterprise, read feasibility scores, and obtain a 10% margin bank sanction.",
    "inputTitle": "Select Location & Enterprise Parameters",
    "lblMargin": "Available Margin Capital (10%)",
    "navCatalog": "32 Enterprise Catalog"
  },
  "hi": {
    "govIndia": "भारत सरकार",
    "govIndiaHindi": "GOVERNMENT OF INDIA",
    "portalTitle": "व्यापार सारथी",
    "tagline": "ग्रामीण सूक्ष्म उद्यम परामर्श एवं रियायती ऋण योजना पोर्टल | सामाजिक न्याय एवं अधिकारिता मंत्रालय",
    "lblTheme": "डार्क मोड",
    "lblLanguage": "भाषा चुनें:",
    "ashokaPillarBadge": "भारत का राज्य प्रतीक (अशोक स्तंभ)",
    "navHome": "मुख्य पृष्ठ",
    "navFeasibility": "व्यवहार्यता एवं जोखिम",
    "navFinancials": "वित्तीय गणना (10%)",
    "navEnterprises": "32 उद्यम निर्देशिका",
    "navDashboard": "लाभार्थी डैशबोर्ड",
    "navCompare": "योजना तुलना",
    "navVideo": "वीडियो मार्गदर्शिका",
    "btnLogin": "लॉगिन / पंजीकरण",
    "btnLogout": "लॉगआउट",
    "heroBadge": "सामाजिक न्याय एवं अधिकारिता मंत्रालय की आधिकारिक ग्रामीण उद्यम प्रणाली",
    "heroHeading": "एआई-संचालित अति-स्थानीय व्यवहार्यता एवं रियायती ऋण पोर्टल",
    "heroDesc": "766 ग्रामीण जिलों में सूक्ष्म उद्यमों को सशक्त बनाना। कच्चे माल, स्थानीय मांग, 10% लाभार्थी पूंजी और सरकारी सब्सिडी का सटीक विश्लेषण।",
    "heroChip1": "मात्र 10% लाभार्थी अंशदान",
    "heroChip2": "50% तक पूंजीगत सब्सिडी",
    "heroChip3": "सीजीटीएमएसई संपार्श्विक-मुक्त ऋण",
    "heroChip4": "5% ब्याज अनुदान (सब्सिडी)",
    "statDistricts": "766 जिले",
    "statDistrictsSub": "अखिल भारतीय ग्राम पंचायतें मैप की गईं",
    "statStates": "28 राज्य एवं 8 केंद्र शासित प्रदेश",
    "statStatesSub": "एकीकृत एलजीडी निर्देशिका शामिल",
    "statBizPlans": "32 लाभदायक योजनाएं",
    "statBizPlansSub": "इकाई अर्थशास्त्र युक्त पूर्ण डीपीआर",
    "statSubsidy": "₹1.25 लाख तक",
    "statSubsidySub": "रियायती पूंजी सब्सिडी",
    "tabFeasibility": "अति-स्थानीय व्यवहार्यता एवं जोखिम रडार",
    "tabFinancials": "स्मार्ट वित्तीय इंजन एवं योजना नेविगेटर (10% अंशदान)",
    "lblWelcome": "स्वागत है",
    "lblGuest": "लाभार्थी प्रोफाइल",
    "lblCategory": "सामाजिक श्रेणी",
    "lblLocation": "कार्यक्षेत्र / स्थान",
    "lblPreferredBiz": "सक्रिय उद्यम योजना",
    "btnSwitchBiz": "व्यवसाय बदलें",
    "btnEditProfile": "प्रोफाइल बदलें / नया स्थान चुनें",
    "secCategoriesTitle": "लक्षित सामाजिक श्रेणी चुनें (अनुकूलित रियायती ऋण योजनाओं के लिए)",
    "catScSt": "अनुसूचित जाति / जनजाति (SC/ST)",
    "catScStDesc": "एनएसएफडीसी / एनएसटीएफडीसी के तहत 40% तक पूंजीगत सब्सिडी एवं 4% रियायती ब्याज दर।",
    "catObc": "अन्य पिछड़ा वर्ग (OBC)",
    "catObcDesc": "एनबीसीएफडीसी के अंतर्गत 4%-5% प्रभावी ब्याज दर एवं मार्जिन सहायता।",
    "catDivyangjan": "दिव्यांगजन (PwD)",
    "catDivyangjanDesc": "एनएचएफडीसी विशेष सूक्ष्म उद्यम योजना 5% ब्याज अनुदान के साथ।",
    "catWomen": "महिला स्वयं सहायता समूह (SHG)",
    "catWomenDesc": "महिला समृद्धि योजना संपार्श्विक-मुक्त वित्तपोषण एवं विपणन सहायता।",
    "catEws": "सामान्य आर्थिक कमजोर वर्ग (EWS)",
    "catEwsDesc": "पीएमईजीपी / पीएम-मुद्रा रियायती ऋण 25%-35% ग्रामीण मार्जिन सब्सिडी के साथ।",
    "secFeasibilityHeading": "अति-स्थानीय व्यवहार्यता एवं जोखिम मूल्यांकन",
    "secFeasibilitySub": "कच्चे माल की उपलब्धता, स्थानीय हाट मांग, मौसमी उतार-चढ़ाव एवं जलवायु जोखिमों का विश्लेषण।",
    "lblSelectBiz": "ग्रामीण सूक्ष्म उद्यम चुनें:",
    "lblViabilityScore": "कुल व्यवहार्यता स्कोर",
    "radarTitle": "5-स्तंभ व्यवहार्यता रडार",
    "radarPillar1": "कच्चे माल की निकटता",
    "radarPillar2": "स्थानीय हाट मांग गति",
    "radarPillar3": "आपूर्ति श्रृंखला एवं परिवहन लचीलापन",
    "radarPillar4": "कार्यशील पूंजी तरलता",
    "radarPillar5": "मौसम एवं मानसून जोखिम निवारण",
    "swotTitle": "अति-स्थानीय स्वॉट (SWOT) विश्लेषण",
    "swotStrengths": "मजबूतियां एवं स्थानीय लाभ",
    "swotWeaknesses": "परिचालन सीमाएं",
    "swotOpportunities": "बाजार एवं सब्सिडी के अवसर",
    "swotThreats": "निवारित जोखिम",
    "calendarTitle": "12-महीने का मौसमी मांग एवं नकदी प्रवाह कैलेंडर",
    "calendarSub": "मौसमी मांग और मानसूनी परिवहन के अनुसार कार्यशील पूंजी की योजना बनाएं।",
    "competitorTitle": "स्थानीय बाजार प्रतिस्पर्धी एवं बुनियादी ढांचा मानचित्र",
    "thPoiName": "उद्यम / प्रतिष्ठान का नाम",
    "thPoiType": "श्रेणी",
    "thPoiDist": "दूरी",
    "thPoiImpact": "प्रतिस्पर्धी प्रभाव",
    "secFinancialHeading": "स्मार्ट वित्तीय संरचना एवं रियायती ऋण इंजन",
    "secFinancialSub": "10% लाभार्थी पूंजी संरचना, सरकारी सब्सिडी अनुकूलन एवं स्वचालित बैंक डीपीआर तैयार करना।",
    "lblSchemeMatched": "अनुशंसित रियायती योजना:",
    "cardProjectCost": "कुल परियोजना लागत",
    "cardSubsidy": "सरकारी पूंजी सब्सिडी",
    "cardMargin": "लाभार्थी अंशदान (10%)",
    "cardLoan": "बैंक मियादी ऋण (90%)",
    "cardInterest": "प्रभावी रियायती ब्याज दर",
    "cardEmi": "मासिक किस्त (EMI) - 5 वर्ष",
    "cardBreakeven": "अनुमानित सम-विच्छेद (ब्रेकईवन)",
    "cardWorkingCap": "कार्यशील पूंजी आरक्षित",
    "waterfallTitle": "मासिक नकदी प्रवाह एवं आय प्रक्षेपण",
    "thRevenue": "सकल मासिक आय",
    "thOpex": "कच्चा माल एवं संचालन खर्च",
    "thEmi": "रियायती बैंक किस्त",
    "thNetProfit": "लाभार्थी का शुद्ध मासिक लाभ",
    "secDocsTitle": "अनिवार्य बैंक डीपीआर दस्तावेज चेकलिस्ट",
    "docAadhaar": "आधार कार्ड एवं पैन कार्ड / पहचान सत्यापन",
    "docResidence": "ग्राम पंचायत निवास / अधिवास प्रमाण पत्र",
    "docCaste": "जाति / श्रेणी प्रमाण पत्र (सब्सिडी हेतु आवश्यक)",
    "docQuotation": "प्रमाणित विक्रेता से मशीनरी एवं उपकरण कोटेशन",
    "docLand": "परिसर स्वामित्व दस्तावेज या स्टाम्प पेपर पर किरायानामा",
    "secWhereToSubmit": "आवेदन कहां जमा करें (अग्रणी जिला बैंक एवं एससीए कार्यालय)",
    "btnDownloadDprPdf": "बैंक-मान्य डीपीआर डाउनलोड करें (PDF)",
    "btnShareWhatsApp": "व्हाट्सएप पर साझा करें",
    "btnCompareSchemes": "सभी रियायती योजनाओं की तुलना करें",
    "catalogTitle": "32 लाभदायक ग्रामीण सूक्ष्म उद्यम योजनाएं",
    "catalogSub": "इकाई अर्थशास्त्र, मशीनरी विवरण एवं अनुकूलित सरकारी वित्तपोषण सहित।",
    "filterAll": "सभी उद्यम (32)",
    "filterAgro": "कृषि-प्रसंस्करण एवं डेयरी",
    "filterGreen": "हरित ऊर्जा एवं ई-वाहन",
    "filterCrafts": "पर्यावरण-अनुकूल शिल्प एवं पुनर्चक्रण",
    "filterDigital": "डिजिटल एवं ग्रामीण सेवाएं",
    "searchBizPlaceholder": "उद्यम के नाम, क्षेत्र या निवेश सीमा से खोजें...",
    "btnSelectEnterprise": "व्यवहार्यता एवं डीपीआर देखें",
    "dashTitle": "लाभार्थी परामर्श एवं ऋण ट्रैकर डैशबोर्ड",
    "dashSub": "अपनी डीपीआर स्थिति, बैंक मूल्यांकन एवं सब्सिडी दावे को ट्रैक करें।",
    "dashAppStatus": "आवेदन चरण: बैंक में जमा करने हेतु डीपीआर तैयार",
    "dashNextStep": "अगला कदम: कोटेशन सहित मुद्रित डीपीआर अग्रणी जिला बैंक में जमा करें",
    "modalLoginTitle": "लाभार्थी ऑनबोर्डिंग एवं स्थान विवरण",
    "lblFullName": "पूरा नाम:",
    "lblMobile": "मोबाइल नंबर (10 अंक):",
    "lblSocialCategory": "सामाजिक / लक्षित श्रेणी:",
    "lblState": "राज्य / केंद्र शासित प्रदेश:",
    "lblDistrict": "जिला:",
    "lblVillage": "गाँव / कस्बा / ग्राम पंचायत:",
    "lblPincode": "पिन कोड:",
    "lblBizStatus": "वर्तमान उद्यम स्थिति:",
    "optNewBiz": "नया सूक्ष्म उद्यम शुरू करने की योजना",
    "optExpandBiz": "पहले से व्यवसाय चल रहा है और विस्तार करना चाहते हैं",
    "optSwitchBiz": "अधिक लाभदायक उद्यम में बदलना चाहते हैं",
    "btnLoginSubmit": "प्रोफाइल सहेजें और पोर्टल में प्रवेश करें",
    "lblDemoCredentials": "त्वरित डेमो प्रोफाइल:",
    "btnDemoFill": "डेमो प्रोफाइल भरें",
    "compareModalTitle": "रियायती ऋण योजनाओं की तुलनात्मक तालिका",
    "thScheme": "योजना का नाम",
    "thTarget": "लक्षित श्रेणी",
    "thMaxProject": "अधिकतम परियोजना लागत",
    "thSubsidyPct": "पूंजी सब्सिडी %",
    "thInterestRate": "प्रभावी ब्याज दर",
    "thCollateral": "गारंटी / बंधक की आवश्यकता",
    "videoModalTitle": "ग्रामीण उद्यमियों के लिए वीडियो एवं ध्वनि मार्गदर्शिका",
    "videoDesc": "अपनी भाषा में चरण-दर-चरण ऑडियो-विजुअल ट्यूटोरियल, जिसमें उद्यम चयन, व्यवहार्यता स्कोर और 10% बैंक स्वीकृति की पूरी प्रक्रिया समझाई गई है।",
    "audioTitle": "ऑडियो सारथी (ध्वनि सहायक)",
    "audioDesc": "अपनी मातृभाषा में संपूर्ण व्यावसायिक विश्लेषण और बैंक दिशानिर्देश सुनें।",
    "btnPlayVoice": "अपनी भाषा में सुनें",
    "btnPauseVoice": "ऑडियो रोकें",
    "footerCopyright": "व्यापार सारथी — सामाजिक न्याय एवं अधिकारिता मंत्रालय, भारत सरकार। ग्रामीण सूक्ष्म उद्यमों के लिए विशेष रूप से विकसित।",
    "lblQuarterlyEmi": "त्रैमासिक किस्त (EMI) भुगतान",
    "lblMonthlyEq": "मासिक समकक्ष बोझ",
    "lblTotalInterest": "कुल देय ऋण ब्याज",
    "lblTotalRepaid": "अवधि में कुल पुनर्भुगतान",
    "videoSectionTitle": "ग्रामीण उद्यमियों के लिए आधिकारिक वीडियो एवं ध्वनि मार्गदर्शिका",
    "videoSectionDesc": "अपनी भाषा में चरण-दर-चरण ऑडियो-विजुअल ट्यूटोरियल, जिसमें उद्यम चयन, व्यवहार्यता स्कोर और 10% बैंक स्वीकृति की पूरी प्रक्रिया समझाई गई है।",
    "inputTitle": "स्थान एवं उद्यम मापदंड चुनें",
    "lblMargin": "उपलब्ध मार्जिन पूंजी (10%)",
    "navCatalog": "32 उद्यम निर्देशिका"
  },
  "or": {
    "govIndia": "ଭାରତ ସରକାର",
    "govIndiaHindi": "GOVERNMENT OF INDIA",
    "portalTitle": "ବ୍ୟାପାର ସାରଥୀ",
    "tagline": "ଗ୍ରାମୀଣ କ୍ଷୁଦ୍ର ଉଦ୍ୟୋଗ ପରାମର୍ଶ ଏବଂ ରିହାତି ଋଣ ଯୋଜନା ପୋର୍ଟାଲ | ସାମାଜିକ ନ୍ୟାୟ ଏବଂ ସଶକ୍ତୀକରଣ ମନ୍ତ୍ରଣାଳୟ",
    "lblTheme": "ଡାର୍କ ମୋଡ୍",
    "lblLanguage": "ଭାଷା ବାଛନ୍ତୁ:",
    "ashokaPillarBadge": "ଭାରତର ରାଷ୍ଟ୍ରୀୟ ପ୍ରତୀକ (ଅଶୋକ ସ୍ତମ୍ଭ)",
    "navHome": "ମୁଖ୍ୟ ପୃଷ୍ଠା",
    "navFeasibility": "ସମ୍ଭାବ୍ୟତା ଏବଂ ବିପଦ",
    "navFinancials": "ଆର୍ଥିକ ହିସାବ (10%)",
    "navEnterprises": "32 ଉଦ୍ୟୋଗ ତାଲିକା",
    "navDashboard": "ହିତାଧିକାରୀ ଡ୍ୟାସବୋର୍ଡ",
    "navCompare": "ଯୋଜନା ତୁଳନା",
    "navVideo": "ଭିଡିଓ ଗାଇଡ୍",
    "btnLogin": "ଲଗ୍ଇନ୍ / ପଞ୍ଜୀକରଣ",
    "btnLogout": "ଲଗ୍ଆଉଟ୍",
    "heroBadge": "ଭାରତ ସରକାରଙ୍କ ସାମାଜିକ ନ୍ୟାୟ ମନ୍ତ୍ରଣାଳୟର ସରକାରୀ ଗ୍ରାମୀଣ ଉଦ୍ୟୋଗ ପୋର୍ଟାଲ",
    "heroHeading": "ଏଆଇ-ଚାଳିତ ଅତି-ସ୍ଥାନୀୟ ସମ୍ଭାବ୍ୟତା ଏବଂ ରିହାତି ଋଣ ପୋର୍ଟାଲ",
    "heroDesc": "766 ଗ୍ରାମୀଣ ଜିଲ୍ଲାରେ କ୍ଷୁଦ୍ର ଉଦ୍ୟୋଗୀମାନଙ୍କୁ ସଶକ୍ତ କରିବା। କଞ୍ଚାମାଲ ଯୋଗାଣ, ସ୍ଥାନୀୟ ବଜାର ଚାହିଦା, 10% ପୁଞ୍ଜି ଏବଂ ସରକାରୀ ସବସିଡିର ସଠିକ୍ ଆକଳନ।",
    "heroChip1": "ମାତ୍ର 10% ହିତାଧିକାରୀ ଅଂଶଧନ",
    "heroChip2": "50% ପର୍ଯ୍ୟନ୍ତ ସରକାରୀ ସବସିଡି",
    "heroChip3": "ସମ୍ପତ୍ତି ବନ୍ଧକ ବିନା ବ୍ୟାଙ୍କ ଋଣ (CGTMSE)",
    "heroChip4": "5% ସୁଧ ରିହାତି ଅନୁଦାନ",
    "statDistricts": "766 ଜିଲ୍ଲା",
    "statDistrictsSub": "ସମଗ୍ର ଭାରତର ଗ୍ରାମ ପଞ୍ଚାୟତ ସଂଯୁକ୍ତ",
    "statStates": "28 ରାଜ୍ୟ ଓ 8 କେନ୍ଦ୍ରଶାସିତ ଅଞ୍ଚଳ",
    "statStatesSub": "ଏକୀକୃତ ଏଲଜିଡି ଡିରେକ୍ଟୋରୀ ସହିତ ଯୋଡ଼ା",
    "statBizPlans": "32 ଲାଭଜନକ ବ୍ୟବସାୟ",
    "statBizPlansSub": "ୟୁନିଟ୍ ଅର୍ଥନୀତି ସହିତ ସମ୍ପୂର୍ଣ୍ଣ ଡିପିଆର",
    "statSubsidy": "₹1.25 ଲକ୍ଷ ପର୍ଯ୍ୟନ୍ତ",
    "statSubsidySub": "ରିହାତି ପୁଞ୍ଜି ସବସିଡି",
    "tabFeasibility": "ଅତି-ସ୍ଥାନୀୟ ସମ୍ଭାବ୍ୟତା ଓ ବିପଦ ରାଡାର",
    "tabFinancials": "ସ୍ମାର୍ଟ ଆର୍ଥିକ ଇଞ୍ଜିନ ଓ ରିହାତି ଯୋଜନା (10% ଅଂଶଧନ)",
    "lblWelcome": "ସ୍ଵାଗତ",
    "lblGuest": "ହିତାଧିକାରୀ ପ୍ରୋଫାଇଲ୍",
    "lblCategory": "ସାମାଜିକ ବର୍ଗ",
    "lblLocation": "ଲକ୍ଷ୍ୟ ସ୍ଥାନ / ଅଞ୍ଚଳ",
    "lblPreferredBiz": "ସକ୍ରିୟ ଉଦ୍ୟୋଗ ଯୋଜନା",
    "btnSwitchBiz": "ବ୍ୟବସାୟ ବଦଳାନ୍ତୁ",
    "btnEditProfile": "ପ୍ରୋଫାଇଲ୍ ସଂଶୋଧନ କରନ୍ତୁ",
    "secCategoriesTitle": "ଲକ୍ଷିତ ସାମାଜିକ ବର୍ଗ ବାଛନ୍ତୁ (ବିଶେଷ ରିହାତି ଋଣ ଯୋଜନା ପାଇଁ)",
    "catScSt": "ଅନୁସୂଚିତ ଜାତି / ଜନଜାତି (SC/ST)",
    "catScStDesc": "NSFDC / NSTFDC ଅଧୀନରେ 40% ପର୍ଯ୍ୟନ୍ତ ସବସିଡି ଏବଂ 4% ସୁଧ ହାର।",
    "catObc": "ଅନ୍ୟାନ୍ୟ ପଛୁଆ ବର୍ଗ (OBC)",
    "catObcDesc": "NBCFDC ଅଧୀନରେ 4%-5% ସୁଲଭ ସୁଧରେ ବ୍ୟାଙ୍କ ଋଣ ଏବଂ ସବସିଡି।",
    "catDivyangjan": "ଦିବ୍ୟାଙ୍ଗଜନ (PwD)",
    "catDivyangjanDesc": "NHFDC ସ୍ୱତନ୍ତ୍ର କ୍ଷୁଦ୍ର ଉଦ୍ୟୋଗ ପାଣ୍ଠି 5% ସୁଧ ରିହାତି ସହିତ।",
    "catWomen": "ମହିଳା ସ୍ୱୟଂ ସହାୟକ ଗୋଷ୍ଠୀ (SHG)",
    "catWomenDesc": "ମହିଳା ସମୃଦ୍ଧି ଯୋଜନା ବିନା ବନ୍ଧକରେ ସୁଲଭ ଋଣ ଏବଂ ବଜାର ସଂଯୋଗ।",
    "catEws": "ସାଧାରଣ ଆର୍ଥିକ ଅନଗ୍ରସର (EWS)",
    "catEwsDesc": "PMEGP / PM-ମୁଦ୍ରା ରିହାତି ଋଣ 25%-35% ଗ୍ରାମୀଣ ମାର୍ଜିନ ସବସିଡି ସହିତ।",
    "secFeasibilityHeading": "ଅତି-ସ୍ଥାନୀୟ ସମ୍ଭାବ୍ୟତା ଏବଂ ବିପଦ ମୂଲ୍ୟାଙ୍କନ",
    "secFeasibilitySub": "ସ୍ଥାନୀୟ କଞ୍ଚାମାଲ, ହାଟ ବଜାର ଚାହିଦା, ଋତୁକାଳୀନ ଦର ପରିବର୍ତ୍ତନ ଏବଂ ପ୍ରାକୃତିକ ବିପଦର ବିଶ୍ଳେଷଣ।",
    "lblSelectBiz": "ଗ୍ରାମୀଣ କ୍ଷୁଦ୍ର ଉଦ୍ୟୋଗ ବାଛନ୍ତୁ:",
    "lblViabilityScore": "ସାମଗ୍ରିକ ସମ୍ଭାବ୍ୟତା ସ୍କୋର",
    "radarTitle": "5-ସ୍ତମ୍ଭ ସମ୍ଭାବ୍ୟତା ରାଡାର",
    "radarPillar1": "କଞ୍ଚାମାଲ ନିକଟବର୍ତ୍ତୀତା",
    "radarPillar2": "ସ୍ଥାନୀୟ ହାଟ ଚାହିଦା ବେଗ",
    "radarPillar3": "ଯୋଗାଣ ଶୃଙ୍ଖଳା ଓ ପରିବହନ ସ୍ଥିରତା",
    "radarPillar4": "କାର୍ଯ୍ୟକାରୀ ପୁଞ୍ଜି ତରଳତା",
    "radarPillar5": "ଜଳବାୟୁ ଓ ବର୍ଷା ବିପଦ ନିୟନ୍ତ୍ରଣ",
    "swotTitle": "ଅତି-ସ୍ଥାନୀୟ SWOT ବିଶ୍ଳେଷଣ",
    "swotStrengths": "ଶକ୍ତି ଓ ସ୍ଥାନୀୟ ଫାଇଦା",
    "swotWeaknesses": "ପରିଚାଳନାଗତ ସୀମାବଦ୍ଧତା",
    "swotOpportunities": "ବଜାର ଓ ସବସିଡି ସୁଯୋଗ",
    "swotThreats": "ନିବାରିତ ବିପଦ",
    "calendarTitle": "12-ମାସର ଋତୁକାଳୀନ ଚାହିଦା ଓ ନଗଦ ପ୍ରବାହ କ୍ୟାଲେଣ୍ଡର",
    "calendarSub": "ବଜାର ଚାହିଦା ଏବଂ ବର୍ଷା ଋତୁର ପରିବହନ ଅନୁସାରେ କାର୍ଯ୍ୟକାରୀ ପୁଞ୍ଜି ପରିଚାଳନା କରନ୍ତୁ।",
    "competitorTitle": "ସ୍ଥାନୀୟ ବଜାର ପ୍ରତିଦ୍ୱନ୍ଦ୍ୱୀ ଏବଂ ଭିତ୍ତିଭୂମି ମାନଚିତ୍ର",
    "thPoiName": "ଉଦ୍ୟୋଗ / ସ୍ଥାନର ନାମ",
    "thPoiType": "ବର୍ଗ",
    "thPoiDist": "ଦୂରତା",
    "thPoiImpact": "ପ୍ରତିଦ୍ୱନ୍ଦ୍ୱିତା ପ୍ରଭାବ",
    "secFinancialHeading": "ସ୍ମାର୍ଟ ଆର୍ଥିକ ସଂରଚନା ଏବଂ ରିହାତି ଋଣ ଇଞ୍ଜିନ",
    "secFinancialSub": "10% ହିତାଧିକାରୀ ଅଂଶଧନ, ସରକାରୀ ସବସିଡି ସଂଯୋଗ ଏବଂ ସ୍ୱୟଂଚାଳିତ ବ୍ୟାଙ୍କ ଡିପିଆର।",
    "lblSchemeMatched": "ସୁପାରିଶ କରାଯାଇଥିବା ସରକାରୀ ଯୋଜନା:",
    "cardProjectCost": "ମୋଟ ପ୍ରକଳ୍ପ ଖର୍ଚ୍ଚ",
    "cardSubsidy": "ସରକାରୀ ପୁଞ୍ଜି ସବସିଡି",
    "cardMargin": "ହିତାଧିକାରୀ ଅଂଶଧନ (10%)",
    "cardLoan": "ବ୍ୟାଙ୍କ ମିଆଦି ଋଣ (90%)",
    "cardInterest": "ରିହାତି ସୁଧ ହାର",
    "cardEmi": "ମାସିକ କିସ୍ତି (EMI) - 5 ବର୍ଷ",
    "cardBreakeven": "ଆନୁମାନିକ ବ୍ରେକ୍-ଇଭେନ୍ ସମୟ",
    "cardWorkingCap": "କାର୍ଯ୍ୟକାରୀ ପୁଞ୍ଜି ସଂରକ୍ଷଣ",
    "waterfallTitle": "ମାସିକ ନଗଦ ପ୍ରବାହ ଏବଂ ଆୟ ଆକଳନ",
    "thRevenue": "ମୋଟ ମାସିକ ଆୟ",
    "thOpex": "କଞ୍ଚାମାଲ ଏବଂ ପରିଚାଳନା ଖର୍ଚ୍ଚ",
    "thEmi": "ରିହାତି ବ୍ୟାଙ୍କ କିସ୍ତି",
    "thNetProfit": "ହିତାଧିକାରୀଙ୍କ ଶୁଦ୍ଧ ମାସିକ ଲାଭ",
    "secDocsTitle": "ଆବଶ୍ୟକୀୟ ବ୍ୟାଙ୍କ ଡିପିଆର କାଗଜପତ୍ର ତାଲିକା",
    "docAadhaar": "ଆଧାର କାର୍ଡ ଏବଂ ପ୍ୟାନ୍ କାର୍ଡ ପ୍ରମାଣପତ୍ର",
    "docResidence": "ଗ୍ରାମ ପଞ୍ଚାୟତ ବାସିନ୍ଦା ପ୍ରମାଣପତ୍ର",
    "docCaste": "ଜାତି / ବର୍ଗ ପ୍ରମାଣପତ୍ର (ସବସିଡି ପାଇଁ ଅତ୍ୟାବଶ୍ୟକ)",
    "docQuotation": "ଯନ୍ତ୍ରପାତି ଏବଂ ମେସିନାରୀ କୋଟେସନ୍",
    "docLand": "ଉଦ୍ୟୋଗ ସ୍ଥାନର ମାଲିକାନା କିମ୍ବା ଭଡ଼ା ଚୁକ୍ତିପତ୍ର",
    "secWhereToSubmit": "ଆବେଦନ କେଉଁଠାରେ ଦାଖଲ କରିବେ (ଲିଡ୍ ବ୍ୟାଙ୍କ ଏବଂ ନିଗମ କାର୍ଯ୍ୟାଳୟ)",
    "btnDownloadDprPdf": "ବ୍ୟାଙ୍କ ଡିପିଆର ଡାଉନଲୋଡ୍ କରନ୍ତୁ (PDF)",
    "btnShareWhatsApp": "ହ୍ୱାଟ୍ସଆପ୍ ରେ ପଠାନ୍ତୁ",
    "btnCompareSchemes": "ସମସ୍ତ ରିହାତି ଯୋଜନା ତୁଳନା କରନ୍ତୁ",
    "catalogTitle": "32 ଲାଭଜନକ ଗ୍ରାମୀଣ କ୍ଷୁଦ୍ର ଉଦ୍ୟୋଗ ଯୋଜନା",
    "catalogSub": "ୟୁନିଟ୍ ଅର୍ଥନୀତି, ଯନ୍ତ୍ରପାତି ବିବରଣୀ ଏବଂ ରିହାତି ଋଣ ସହିତ ସଂଯୁକ୍ତ।",
    "filterAll": "ସମସ୍ତ ଉଦ୍ୟୋଗ (32)",
    "filterAgro": "କୃଷି-ପ୍ରକ୍ରିୟାକରଣ ଓ ଦୁଗ୍ଧ",
    "filterGreen": "ସବୁଜ ଶକ୍ତି ଓ ଇ-ଗାଡ଼ି",
    "filterCrafts": "ହସ୍ତଶିଳ୍ପ ଓ ବର୍ଜ୍ୟ ପୁନଃବ୍ୟବହାର",
    "filterDigital": "ଡିଜିଟାଲ୍ ଓ ଗ୍ରାମୀଣ ସେବା",
    "searchBizPlaceholder": "ଉଦ୍ୟୋଗ ନାମ, କ୍ଷେତ୍ର ବା ନିବେଶ ପରିମାଣ ଅନୁସାରେ ଖୋଜନ୍ତୁ...",
    "btnSelectEnterprise": "ସମ୍ଭାବ୍ୟତା ଓ ଡିପିଆର ଦେଖନ୍ତୁ",
    "dashTitle": "ହିତାଧିକାରୀ ପରାମର୍ଶ ଏବଂ ଋଣ ଟ୍ରାକର୍ ଡ୍ୟାସବୋର୍ଡ",
    "dashSub": "ନିଜ ଡିପିଆର ସ୍ଥିତି, ବ୍ୟାଙ୍କ ଯାଞ୍ଚ ଏବଂ ସବସିଡି ପ୍ରକ୍ରିୟା ଟ୍ରାକ୍ କରନ୍ତୁ।",
    "dashAppStatus": "ଆବେଦନ ସ୍ଥିତି: ବ୍ୟାଙ୍କ ଦାଖଲ ପାଇଁ ଡିପିଆର ପ୍ରସ୍ତୁତ",
    "dashNextStep": "ପରବର୍ତ୍ତୀ ପଦକ୍ଷେପ: ମୁଦ୍ରିତ ଡିପିଆର କୋଟେସନ୍ ସହ ଲିଡ୍ ବ୍ୟାଙ୍କରେ ଦାଖଲ କରନ୍ତୁ",
    "modalLoginTitle": "ହିତାଧିକାରୀ ପଞ୍ଜୀକରଣ ଏବଂ ସ୍ଥାନ ବିବରଣୀ",
    "lblFullName": "ପୂରା ନାମ:",
    "lblMobile": "ମୋବାଇଲ୍ ନମ୍ବର (10 ଅଙ୍କ):",
    "lblSocialCategory": "ସାମାଜିକ / ଲକ୍ଷ୍ୟ ବର୍ଗ:",
    "lblState": "ରାଜ୍ୟ / କେନ୍ଦ୍ରଶାସିତ ଅଞ୍ଚଳ:",
    "lblDistrict": "ଜିଲ୍ଲା:",
    "lblVillage": "ଗ୍ରାମ / ସହର / ଗ୍ରାମ ପଞ୍ଚାୟତ:",
    "lblPincode": "ପିନ୍ କୋଡ୍:",
    "lblBizStatus": "ବର୍ତ୍ତମାନର ବ୍ୟବସାୟ ସ୍ଥିତି:",
    "optNewBiz": "ନୂତନ କ୍ଷୁଦ୍ର ଉଦ୍ୟୋଗ ଆରମ୍ଭ କରିବାକୁ ଯୋଜନା",
    "optExpandBiz": "ପୂର୍ବରୁ ବ୍ୟବସାୟ ଚାଲୁଅଛି ଏବଂ ବିସ୍ତାର କରିବାକୁ ଚାହୁଁଛନ୍ତି",
    "optSwitchBiz": "ଅଧିକ ଲାଭଜନକ ବ୍ୟବସାୟକୁ ପରିବର୍ତ୍ତନ କରିବାକୁ ଚାହୁଁଛନ୍ତି",
    "btnLoginSubmit": "ପ୍ରୋଫାଇଲ୍ ସଂରକ୍ଷଣ କରି ପୋର୍ଟାଲ୍ ପ୍ରବେଶ କରନ୍ତୁ",
    "lblDemoCredentials": "ଡେମୋ ପ୍ରୋଫାଇଲ୍:",
    "btnDemoFill": "ଡେମୋ ପ୍ରୋଫାଇଲ୍ ବ୍ୟବହାର କରନ୍ତୁ",
    "compareModalTitle": "ସରକାରୀ ରିହାତି ଋଣ ଯୋଜନା ତୁଳନାତ୍ମକ ତାଲିକା",
    "thScheme": "ଯୋଜନାର ନାମ",
    "thTarget": "ଲକ୍ଷିତ ବର୍ଗ",
    "thMaxProject": "ସର୍ବାଧିକ ପ୍ରକଳ୍ପ ସୀମା",
    "thSubsidyPct": "ପୁଞ୍ଜି ସବସିଡି %",
    "thInterestRate": "ପ୍ରଭାବୀ ସୁଧ ହାର",
    "thCollateral": "ସମ୍ପତ୍ତି ବନ୍ଧକ ଆବଶ୍ୟକତା",
    "videoModalTitle": "ଗ୍ରାମୀଣ ଉଦ୍ୟୋଗୀମାନଙ୍କ ପାଇଁ ଭିଡିଓ ଓ ସ୍ୱର ନିର୍ଦ୍ଦେଶିକା",
    "videoDesc": "ଉଦ୍ୟୋଗ ଚୟନ, ସମ୍ଭାବ୍ୟତା ସ୍କୋର ଏବଂ 10% ବ୍ୟାଙ୍କ ଋଣ ମଞ୍ଜୁରୀ ପାଇଁ ଆଞ୍ଚଳିକ ଭାଷାରେ ଭିଡିଓ ସହାୟତା।",
    "audioTitle": "ଅଡିଓ ସାରଥୀ (ସ୍ୱର ସହାୟକ)",
    "audioDesc": "ନିଜ ମାତୃଭାଷାରେ ସମ୍ପୂର୍ଣ୍ଣ ବ୍ୟବସାୟିକ ବିଶ୍ଳେଷଣ ଏବଂ ବ୍ୟାଙ୍କ ନିୟମାବଳୀ ଶୁଣନ୍ତୁ।",
    "btnPlayVoice": "ଆପଣଙ୍କ ଭାଷାରେ ଶୁଣନ୍ତୁ",
    "btnPauseVoice": "ଅଡିଓ ବନ୍ଦ କରନ୍ତୁ",
    "footerCopyright": "ବ୍ୟାପାର ସାରଥୀ — ସାମାଜିକ ନ୍ୟାୟ ଏବଂ ସଶକ୍ତୀକରଣ ମନ୍ତ୍ରଣାଳୟ, ଭାରତ ସରକାର। ଗ୍ରାମୀଣ କ୍ଷୁଦ୍ର ଉଦ୍ୟୋଗୀଙ୍କ ସଶକ୍ତୀକରଣ ପାଇଁ ଉଦ୍ଦିଷ୍ଟ।",
    "lblQuarterlyEmi": "ତ୍ରୈମାସିକ କିସ୍ତି (EMI) ପରିଶୋଧ",
    "lblMonthlyEq": "ମାସିକ ସମତୁଲ୍ୟ ଆର୍ଥିକ ବୋଝ",
    "lblTotalInterest": "ମୋଟ ଦେୟ ଋଣ ସୁଧ",
    "lblTotalRepaid": "ଅବଧି ମଧ୍ୟରେ ମୋଟ ପରିଶୋଧିତ ରାଶି",
    "videoSectionTitle": "ଗ୍ରାମୀଣ ଉଦ୍ୟୋଗୀମାନଙ୍କ ପାଇଁ ଅଫିସିଆଲ୍ ଭିଡିଓ ଓ ସ୍ୱର ନିର୍ଦ୍ଦେଶିକା",
    "videoSectionDesc": "ଉଦ୍ୟୋଗ ଚୟନ, ସମ୍ଭାବ୍ୟତା ସ୍କୋର ଏବଂ 10% ବ୍ୟାଙ୍କ ଋଣ ମଞ୍ଜୁରୀ ପାଇଁ ଆଞ୍ଚଳିକ ଭାଷାରେ ସମ୍ପୂର୍ଣ୍ଣ ଭିଡିଓ ସହାୟତା।",
    "inputTitle": "ସ୍ଥାନ ଏବଂ ଉଦ୍ୟୋଗ ବିବରଣୀ ବାଛନ୍ତୁ",
    "lblMargin": "ଉପଲବ୍ଧ ମାର୍ଜିନ ପୁଞ୍ଜି (10%)",
    "navCatalog": "32 ଉଦ୍ୟୋଗ ତାଲିକା"
  },
  "bn": {
    "govIndia": "ভারত সরকার",
    "govIndiaHindi": "GOVERNMENT OF INDIA",
    "portalTitle": "ব্যাপার সারথী",
    "tagline": "গ্রামীণ ক্ষুদ্র উদ্যোগ পরামর্শ ও রেয়াতি ঋণ প্রকল্প পোর্টাল | সামাজিক ন্যায় ও ক্ষমতায়ন মন্ত্রক",
    "lblTheme": "ডার্ক মোড",
    "lblLanguage": "ভাষা নির্বাচন করুন:",
    "ashokaPillarBadge": "ভারতের জাতীয় প্রতীক (অশোক স্তম্ভ)",
    "navHome": "মূল পাতা",
    "navFeasibility": "সম্ভাব্যতা ও ঝুঁকি",
    "navFinancials": "আর্থিক হিসাব (১০%)",
    "navEnterprises": "৩২ উদ্যোগ ক্যাটালগ",
    "navDashboard": "উপভোক্তা ড্যাশবোর্ড",
    "navCompare": "প্রকল্প তুলনা",
    "navVideo": "ভিডিও নির্দেশিকা",
    "btnLogin": "লগইন / নিবন্ধন",
    "btnLogout": "লগআউট",
    "heroBadge": "সামাজিক ন্যায় ও ক্ষমতায়ন মন্ত্রকের অফিসিয়াল উদ্যোগ পোর্টাল",
    "heroHeading": "এআই-চালিত অতি-স্থানীয় সম্ভাব্যতা ও রেয়াতি ঋণ পোর্টাল",
    "heroDesc": "৭৬৬ গ্রামীণ জেলায় ক্ষুদ্র উদ্যোগীদের ক্ষমতায়ন। কাঁচামাল সরবরাহ, স্থানীয় চাহিদা, ১০% মূলধন ও সরকারি ভর্তুকির সঠিক বিশ্লেষণ।",
    "heroChip1": "মাত্র ১০% উপভোক্তা অংশদান",
    "heroChip2": "৫০% পর্যন্ত মূলধন ভর্তুকি",
    "heroChip3": "জামানতবিহীন ঋণ (CGTMSE)",
    "heroChip4": "৫% সুদের ভর্তুকি সহায়তা",
    "statDistricts": "৭৬৬ জেলা",
    "statDistrictsSub": "সর্বভারতীয় গ্রাম পঞ্চায়েত যুক্ত",
    "statStates": "২৮ রাজ্য ও ৮ কেন্দ্রশাসিত অঞ্চল",
    "statStatesSub": "ইউনিফাইড এলজিডি ডিরেক্টরি সমন্বিত",
    "statBizPlans": "৩২ লাভজনক উদ্যোগ",
    "statBizPlansSub": "ইউনিট অর্থনীতি সহ পূর্ণাঙ্গ ডিপিআর",
    "statSubsidy": "₹১.২৫ লাখ পর্যন্ত",
    "statSubsidySub": "রেয়াতি মূলধন ভর্তুকি",
    "tabFeasibility": "অতি-স্থানীয় সম্ভাব্যতা ও ঝুঁকি রাডার",
    "tabFinancials": "স্মার্ট আর্থিক ইঞ্জিন ও রেয়াতি প্রকল্প (১০% অংশদান)",
    "lblWelcome": "স্বাগতম",
    "lblGuest": "উপভোক্তা প্রোফাইল",
    "lblCategory": "সামাজিক শ্রেণি",
    "lblLocation": "টার্গেট অবস্থান",
    "lblPreferredBiz": "সক্রিয় উদ্যোগ পরিকল্পনা",
    "btnSwitchBiz": "ব্যবসা পরিবর্তন করুন",
    "btnEditProfile": "প্রোফাইল পরিবর্তন করুন",
    "secCategoriesTitle": "লক্ষ্যভিত্তিক সামাজিক শ্রেণি নির্বাচন করুন",
    "catScSt": "তফসিলি জাতি / উপজাতি (SC/ST)",
    "catScStDesc": "৪০% পর্যন্ত মূলধন ভর্তুকি এবং ৪% সুদের হারে মেয়াদি ঋণ।",
    "catObc": "অন্যান্য অনগ্রসর শ্রেণি (OBC)",
    "catObcDesc": "NBCFDC-র অধীনে ৪%-৫% রেয়াতি সুদের হারে ঋণ সুবিধা।",
    "catDivyangjan": "দিব্যাঙ্গজন (প্রতিবন্ধী ব্যক্তি)",
    "catDivyangjanDesc": "NHFDC ক্ষুদ্র উদ্যোগ তহবিল ৫% সুদ ভর্তুকি সহ।",
    "catWomen": "মহিলা স্বনির্ভর গোষ্ঠী (SHG)",
    "catWomenDesc": "মহিলা সমৃদ্ধি যোজনায় জামানতবিহীন ঋণ ও বাজার সংযোগ।",
    "catEws": "সাধারণ অর্থনৈতিক দুর্বল শ্রেণি (EWS)",
    "catEwsDesc": "PMEGP / মুদ্রা রেয়াতি ঋণ ২৫%-৩৫% গ্রামীণ ভর্তুকি সহ।",
    "secFeasibilityHeading": "অতি-স্থানীয় সম্ভাব্যতা ও ঝুঁকি মূল্যায়ন",
    "secFeasibilitySub": "কাঁচামালের সান্নিধ্য, স্থানীয় হাটের চাহিদা এবং আবহাওয়া ঝুঁকির বিশ্লেষণ।",
    "lblSelectBiz": "গ্রামীণ ক্ষুদ্র উদ্যোগ নির্বাচন করুন:",
    "lblViabilityScore": "সার্বিক সম্ভাব্যতা স্কোর",
    "radarTitle": "৫-স্তম্ভ সম্ভাব্যতা রাডার",
    "radarPillar1": "কাঁচামালের নৈকট্য",
    "radarPillar2": "স্থানীয় হাটের চাহিদা বেগ",
    "radarPillar3": "সরবরাহ শৃঙ্খল স্থিতিস্থাপকতা",
    "radarPillar4": "চলতি মূলধনের তারল্য",
    "radarPillar5": "জলবায়ু ও বর্ষা ঝুঁকি প্রশমন",
    "swotTitle": "অতি-স্থানীয় SWOT বিশ্লেষণ",
    "swotStrengths": "শক্তি ও স্থানীয় সুবিধা",
    "swotWeaknesses": "পরিচালন সীমাবদ্ধতা",
    "swotOpportunities": "বাজার ও ভর্তুকির সুযোগ",
    "swotThreats": "নিয়ন্ত্রিত ঝুঁকি",
    "calendarTitle": "১২ মাসের মরসুমি চাহিদা ও নগদ প্রবাহ ক্যালেন্ডার",
    "calendarSub": "চাহিদা এবং বর্ষার পরিবহন অনুযায়ী চলতি মূলধনের পরিকল্পনা করুন।",
    "competitorTitle": "স্থানীয় বাজার প্রতিযোগী ও পরিকাঠামো মানচিত্র",
    "thPoiName": "উদ্যোগের নাম",
    "thPoiType": "বিভাগ",
    "thPoiDist": "দূরত্ব",
    "thPoiImpact": "প্রতিযোগিতামূলক প্রভাব",
    "secFinancialHeading": "স্মার্ট আর্থিক কাঠামো ও রেয়াতি ঋণ ইঞ্জিন",
    "secFinancialSub": "১০% উপভোক্তা মূলধন, সরকারি ভর্তুকি সংযোগ এবং স্বয়ংক্রিয় ব্যাংক ডিপিআর।",
    "lblSchemeMatched": "প্রস্তাবিত রেয়াতি প্রকল্প:",
    "cardProjectCost": "মোট প্রকল্প ব্যয়",
    "cardSubsidy": "সরকারি মূলধন ভর্তুকি",
    "cardMargin": "উপভোক্তা অংশদান (১০%)",
    "cardLoan": "ব্যাংক মেয়াদি ঋণ (৯০%)",
    "cardInterest": "কার্যকর রেয়াতি সুদের হার",
    "cardEmi": "মাসিক কিস্তি (EMI) - ৫ বছর",
    "cardBreakeven": "আনুমানিক ব্রেক-ইভেন সময়",
    "cardWorkingCap": "চলতি মূলধন তহবিল",
    "waterfallTitle": "মাসিক নগদ প্রবাহ ও আয়ের প্রক্ষেপণ",
    "thRevenue": "মোট মাসিক আয়",
    "thOpex": "কাঁচামাল ও পরিচালন ব্যয়",
    "thEmi": "রেয়াতি ব্যাংক কিস্তি",
    "thNetProfit": "উপভোক্তার নিট মাসিক লাভ",
    "secDocsTitle": "আবশ্যক ব্যাংক ডিপিআর নথি তালিকা",
    "docAadhaar": "আধার কার্ড ও প্যান কার্ড যাচাইকরণ",
    "docResidence": "গ্রাম পঞ্চায়েত বাসস্থান শংসাপত্র",
    "docCaste": "জাতি / শ্রেণি শংসাপত্র (ভর্তুকির জন্য আবশ্যক)",
    "docQuotation": "মেশিনারির অনুমোদিত বিক্রেতা কোটেশন",
    "docLand": "কাজের জায়গার মালিকানা দলিল বা ভাড়ার চুক্তিপত্র",
    "secWhereToSubmit": "আবেদন কোথায় জমা দেবেন (লিড ব্যাংক ও জেলা কার্যালয়)",
    "btnDownloadDprPdf": "ব্যাংক ডিপিআর ডাউনলোড করুন (PDF)",
    "btnShareWhatsApp": "হোয়াটসঅ্যাপে শেয়ার করুন",
    "btnCompareSchemes": "সকল রেয়াতি প্রকল্পের তুলনা দেখুন",
    "catalogTitle": "৩২টি লাভজনক গ্রামীণ ক্ষুদ্র উদ্যোগ পরিকল্পনা",
    "catalogSub": "ইউনিট অর্থনীতি, সরঞ্জামের বিবরণ এবং রেয়াতি ঋণ সহ সাজানো।",
    "filterAll": "সকল উদ্যোগ (৩২)",
    "filterAgro": "কৃষি-প্রক্রিয়াকরণ ও দুগ্ধ",
    "filterGreen": "সবুজ শক্তি ও ই-যানবাহন",
    "filterCrafts": "পরিবেশ-বান্ধব শিল্প ও পুনর্ব্যবহার",
    "filterDigital": "ডিজিটাল ও গ্রামীণ পরিষেবা",
    "searchBizPlaceholder": "উদ্যোগের নাম বা বিনিয়োগের সীমা দিয়ে অনুসন্ধান করুন...",
    "btnSelectEnterprise": "সম্ভাব্যতা ও ডিপিআর দেখুন",
    "dashTitle": "উপভোক্তা পরামর্শ ও ঋণ ট্র্যাকার ড্যাশবোর্ড",
    "dashSub": "আপনার ডিপিআর স্থিতি, ব্যাংক মূল্যায়ন এবং ভর্তুকি দাবি ট্র্যাক করুন।",
    "dashAppStatus": "আবেদনের পর্যায়: ব্যাংকে জমা দেওয়ার জন্য ডিপিআর প্রস্তুত",
    "dashNextStep": "পরবর্তী পদক্ষেপ: কোটেশন সহ মুদ্রিত ডিপিআর লিড ব্যাংকে জমা দিন",
    "modalLoginTitle": "উপভোক্তা নিবন্ধন ও অবস্থান বিবরণ",
    "lblFullName": "সম্পূর্ণ নাম:",
    "lblMobile": "মোবাইল নম্বর (১০ সংখ্যা):",
    "lblSocialCategory": "সামাজিক / লক্ষ্য শ্রেণি:",
    "lblState": "রাজ্য / কেন্দ্রশাসিত অঞ্চল:",
    "lblDistrict": "জেলা:",
    "lblVillage": "গ্রাম / শহর / পঞ্চায়েত:",
    "lblPincode": "পিন কোড:",
    "lblBizStatus": "বর্তমান ব্যবসায়িক অবস্থা:",
    "optNewBiz": "নতুন ক্ষুদ্র উদ্যোগ শুরু করতে চান",
    "optExpandBiz": "চলমান ব্যবসা সম্প্রসারণ করতে চান",
    "optSwitchBiz": "অধিক লাভজনক উদ্যোগে যেতে চান",
    "btnLoginSubmit": "প্রোফাইল সংরক্ষণ করে প্রবেশ করুন",
    "lblDemoCredentials": "ডেমো প্রোফাইল:",
    "btnDemoFill": "ডেমো তথ্য পূরণ করুন",
    "compareModalTitle": "রেয়াতি ঋণ প্রকল্পসমূহের তুলনামূলক তালিকা",
    "thScheme": "প্রকল্পের নাম",
    "thTarget": "লক্ষ্য শ্রেণি",
    "thMaxProject": "সর্বোচ্চ প্রকল্প সীমা",
    "thSubsidyPct": "মূলধন ভর্তুকি %",
    "thInterestRate": "কার্যকর সুদের হার",
    "thCollateral": "জামানতের প্রয়োজনীয়তা",
    "videoModalTitle": "গ্রামীণ উদ্যোক্তাদের জন্য ভিডিও ও ভয়েস নির্দেশিকা",
    "videoDesc": "উদ্যোগ নির্বাচন, সম্ভাব্যতা স্কোর ও ব্যাংক ঋণ অনুমোদনের সম্পূর্ণ প্রক্রিয়া নিজের ভাষায় দেখুন।",
    "audioTitle": "অডিও সারথী (ভয়েস অ্যাসিস্ট্যান্ট)",
    "audioDesc": "আপনার মাতৃভাষায় সম্পূর্ণ ব্যবসায়িক মূল্যায়ন এবং ব্যাংকের নির্দেশিকা শুনুন।",
    "btnPlayVoice": "আপনার ভাষায় শুনুন",
    "btnPauseVoice": "অডিও থামান",
    "footerCopyright": "ব্যাপার সারথী — সামাজিক ন্যায় ও ক্ষমতায়ন মন্ত্রক, ভারত সরকার।",
    "lblQuarterlyEmi": "ত্রৈমাসিক কিস্তি (EMI) পরিশোধ",
    "lblMonthlyEq": "মাসিক সমতুল্য বোঝা",
    "lblTotalInterest": "মেয়াদে মোট ঋণের সুদ",
    "lblTotalRepaid": "মেয়াদে মোট পরিশোধিত অর্থ",
    "videoSectionTitle": "গ্রামীণ উদ্যোক্তাদের জন্য অফিসিয়াল ভিডিও ও ভয়েস নির্দেশিকা",
    "videoSectionDesc": "উদ্যোগ নির্বাচন, সম্ভাব্যতা স্কোর ও ব্যাংক ঋণ অনুমোদনের সম্পূর্ণ প্রক্রিয়া নিজের ভাষায় দেখুন।",
    "inputTitle": "অবস্থান ও উদ্যোগের বিবরণ নির্বাচন করুন",
    "lblMargin": "উপলব্ধ মূলধন অংশদান (১০%)",
    "navCatalog": "৩২ উদ্যোগ ক্যাটালগ"
  },
  "te": {
    "govIndia": "భారత ప్రభుత్వం",
    "govIndiaHindi": "GOVERNMENT OF INDIA",
    "portalTitle": "వ్యాపార్ సారథి",
    "tagline": "గ్రామీణ సూక్ష్మ వ్యాపార సలహా & రాయితీ రుణ పథకాల పోర్టల్ | సామాజిక న్యాయం మరియు సాధికారత మంత్రిత్వ శాఖ",
    "lblTheme": "డార్క్ మోడ్",
    "lblLanguage": "భాషను ఎంచుకోండి:",
    "ashokaPillarBadge": "భారత జాతీయ చిహ్నం (అశోక స్తంభం)",
    "navHome": "హోమ్",
    "navFeasibility": "సాధ్యత & నష్టభయాలు",
    "navFinancials": "ఆర్థిక ఇంజిన్ (10%)",
    "navEnterprises": "32 వ్యాపారాల కేటలాగ్",
    "navDashboard": "లబ్ధిదారుల డ్యాష్‌బోర్డ్",
    "navCompare": "పథకాల పోలిక",
    "navVideo": "వీడియో గైడ్",
    "btnLogin": "లాగిన్ / రిజిస్ట్రేషన్",
    "btnLogout": "లాగ్అవుట్",
    "heroBadge": "సామాజిక న్యాయ మంత్రిత్వ శాఖ అధికారిక గ్రామీణ వ్యాపార వ్యవస్థ",
    "heroHeading": "ఏఐ-ఆధారిత స్థానిక సాధ్యత & రాయితీ రుణ పోర్టల్",
    "heroDesc": "766 గ్రామీణ జిల్లాలలో సూక్ష్మ పారిశ్రామికవేత్తలకు సాధికారత. ముడిసరుకు సరఫరా, స్థానిక సంత డిమాండ్, 10% లబ్ధిదారు వాటా మరియు ప్రభుత్వ సబ్సిడీల విశ్లేషణ.",
    "heroChip1": "కేవలం 10% లబ్ధిదారు వాటా",
    "heroChip2": "50% వరకు మూలధన సబ్సిడీ",
    "heroChip3": "పూచీకత్తు లేని రుణం (CGTMSE)",
    "heroChip4": "5% వడ్డీ రాయితీ ప్రయోజనం",
    "statDistricts": "766 జిల్లాలు",
    "statDistrictsSub": "అఖిల భారత గ్రామ పంచాయతీలు జోడించబడ్డాయి",
    "statStates": "28 రాష్ట్రాలు & 8 కేంద్రపాలిత ప్రాంతాలు",
    "statStatesSub": "యూనిఫైడ్ LGD డైరెక్టరీతో అనుసంధానం",
    "statBizPlans": "32 లాభదాయక వ్యాపారాలు",
    "statBizPlansSub": "యూనిట్ ఎకనామిక్స్ మరియు పూర్తి DPR",
    "statSubsidy": "₹1.25 లక్షల వరకు",
    "statSubsidySub": "రాయితీ మూలధన సబ్సిడీ",
    "tabFeasibility": "హైపర్-లోకల్ సాధ్యత & ముప్పు రాడార్",
    "tabFinancials": "స్మార్ట్ ఫైనాన్షియల్ ఇంజిన్ & రాయితీ పథకాలు (10% మార్జిన్)",
    "lblWelcome": "స్వాగతం",
    "lblGuest": "లబ్ధిదారు ప్రొఫైల్",
    "lblCategory": "సామాజిక వర్గం",
    "lblLocation": "లక్ష్య ప్రాంతం",
    "lblPreferredBiz": "ఎంపిక చేసుకున్న వ్యాపారం",
    "btnSwitchBiz": "వ్యాపారాన్ని మార్చండి",
    "btnEditProfile": "ప్రొఫైల్ సవరించండి",
    "secCategoriesTitle": "లక్షిత సామాజిక వర్గాన్ని ఎంచుకోండి (ప్రత్యేక రాయితీ పథకాల కోసం)",
    "catScSt": "షెడ్యూల్డ్ కులాలు / తెగలు (SC/ST)",
    "catScStDesc": "NSFDC / NSTFDC ద్వారా 40% వరకు సబ్సిడీ మరియు 4% రాయితీ వడ్డీ రేటు.",
    "catObc": "ఇతర వెనుకబడిన తరగతులు (OBC)",
    "catObcDesc": "NBCFDC కింద 4%-5% వడ్డీతో రాయితీ బ్యాంక్ రుణాలు.",
    "catDivyangjan": "దివ్యాంగులు (వికలాంగులు)",
    "catDivyangjanDesc": "NHFDC సూక్ష్మ రుణ పథకం 5% వడ్డీ సబ్సిడీతో.",
    "catWomen": "మహిళా స్వయం సహాయక సంఘాలు (SHG)",
    "catWomenDesc": "మహిళా సమృద్ధి యోజన కింద పూచీకత్తు లేని రుణాలు.",
    "catEws": "జనరల్ EWS / సూక్ష్మ వ్యాపారులు",
    "catEwsDesc": "PMEGP / ముద్రా రాయితీ రుణాలు 25%-35% గ్రామీణ సబ్సిడీతో.",
    "secFeasibilityHeading": "హైపర్-లోకల్ సాధ్యత & ముప్పు అంచనా",
    "secFeasibilitySub": "ముడిసరుకు లభ్యత, స్థానిక సంత డిమాండ్ మరియు వాతావరణ నష్టభయాల విశ్లేషణ.",
    "lblSelectBiz": "గ్రామీణ సూక్ష్మ వ్యాపారాన్ని ఎంచుకోండి:",
    "lblViabilityScore": "మొత్తం సాధ్యత స్కోరు",
    "radarTitle": "5-స్తంభాల సాధ్యత రాడార్",
    "radarPillar1": "ముడిసరుకు సామీప్యత",
    "radarPillar2": "స్థానిక సంత డిమాండ్ వేగం",
    "radarPillar3": "సరఫరా గొలుసు పటిష్టత",
    "radarPillar4": "వర్కింగ్ క్యాపిటల్ ద్రవ్యత",
    "radarPillar5": "వాతావరణ & వర్ష నష్ట నివారణ",
    "swotTitle": "హైపర్-లోకల్ SWOT విశ్లేషణ",
    "swotStrengths": "బలాలు & స్థానిక ప్రయోజనాలు",
    "swotWeaknesses": "నిర్వహణ పరిమితులు",
    "swotOpportunities": "మార్కెట్ & సబ్సిడీ అవకాశాలు",
    "swotThreats": "నివారించబడిన ముప్పులు",
    "calendarTitle": "12-నెలల కాలానుగుణ డిమాండ్ & నగదు ప్రవాహ క్యాలెండర్",
    "calendarSub": "సీజనల్ డిమాండ్ మరియు వర్షాకాల రవాణాకు అనుగుణంగా నిధుల ప్రణాళిక చేసుకోండి.",
    "competitorTitle": "స్థానిక మార్కెట్ పోటీదారులు & మౌలిక సదుపాయాల మ్యాప్",
    "thPoiName": "వ్యాపారం / సంస్థ పేరు",
    "thPoiType": "వర్గం",
    "thPoiDist": "దూరం",
    "thPoiImpact": "పోటీ ప్రభావం",
    "secFinancialHeading": "స్మార్ట్ ఆర్థిక నిర్మాణం & రాయితీ రుణ ఇంజిన్",
    "secFinancialSub": "10% లబ్ధిదారు వాటా, ప్రభుత్వ సబ్సిడీ అనుసంధానం మరియు ఆటోమేటెడ్ బ్యాంక్ DPR.",
    "lblSchemeMatched": "సిఫార్సు చేయబడిన రాయితీ పథకం:",
    "cardProjectCost": "మొత్తం ప్రాజెక్ట్ ఖర్చు",
    "cardSubsidy": "ప్రభుత్వ మూలధన సబ్సిడీ",
    "cardMargin": "లబ్ధిదారు వాటా (10%)",
    "cardLoan": "బ్యాంక్ టర్మ్ లోన్ (90%)",
    "cardInterest": "రాయితీ వడ్డీ రేటు",
    "cardEmi": "నెలవారీ వాయిదా (EMI) - 5 సం.",
    "cardBreakeven": "అంచనా వేసిన బ్రేక్-ఈవెన్",
    "cardWorkingCap": "వర్కింగ్ క్యాపిటల్ నిల్వ",
    "waterfallTitle": "నెలవారీ నగదు ప్రవాహం & ఆదాయ అంచనా",
    "thRevenue": "మొత్తం నెలవారీ రాబడి",
    "thOpex": "ముడిసరుకు & నిర్వహణ ఖర్చు",
    "thEmi": "రాయితీ బ్యాంక్ వాయిదా",
    "thNetProfit": "లబ్ధిదారు నికర నెలవారీ లాభం",
    "secDocsTitle": "తప్పనిసరి బ్యాంక్ DPR పత్రాల చెక్‌లిస్ట్",
    "docAadhaar": "ఆధార్ కార్డ్ & పాన్ కార్డ్ ధృవీకరణ",
    "docResidence": "గ్రామ పంచాయతీ నివాస ధృవీకరణ పత్రం",
    "docCaste": "కులం / వర్గం సర్టిఫికేట్ (సబ్సిడీ కోసం తప్పనిసరి)",
    "docQuotation": "యంత్రాలు మరియు పరికరాల కొటేషన్",
    "docLand": "స్థల యాజమాన్య పత్రం లేదా అద్దె ఒప్పందం",
    "secWhereToSubmit": "దరఖాస్తు ఎక్కడ సమర్పించాలి (లీడ్ బ్యాంక్ & SCA కార్యాలయాలు)",
    "btnDownloadDprPdf": "బ్యాంక్ DPR డౌన్‌లోడ్ చేసుకోండి (PDF)",
    "btnShareWhatsApp": "వాట్సాప్‌లో షేర్ చేయండి",
    "btnCompareSchemes": "అన్ని రాయితీ పథకాలను పోల్చండి",
    "catalogTitle": "32 లాభదాయక గ్రామీణ సూక్ష్మ వ్యాపార నమూనాలు",
    "catalogSub": "యూనిట్ ఎకనామిక్స్, పరికరాల వివరాలు మరియు రాయితీ రుణాలతో రూపొందించబడింది.",
    "filterAll": "అన్ని వ్యాపారాలు (32)",
    "filterAgro": "వ్యవసాయ ప్రాసెసింగ్ & డెయిరీ",
    "filterGreen": "గ్రీన్ ఎనర్జీ & ఈవీ",
    "filterCrafts": "పర్యావరణ అనుకూల హస్తకళలు",
    "filterDigital": "డిజిటల్ & గ్రామీణ సేవలు",
    "searchBizPlaceholder": "వ్యాపారం పేరు లేదా పెట్టుబడి పరిధి ద్వారా శోధించండి...",
    "btnSelectEnterprise": "సాధ్యత & DPR పరిశీలించండి",
    "dashTitle": "లబ్ధిదారు సలహా & రుణ ట్రాకర్ డ్యాష్‌బోర్డ్",
    "dashSub": "మీ DPR స్థితి, బ్యాంక్ పరిశీలన మరియు సబ్సిడీ క్లెయిమ్‌ను ట్రాక్ చేయండి.",
    "dashAppStatus": "దరఖాస్తు దశ: బ్యాంకులో సమర్పించడానికి DPR సిద్ధంగా ఉంది",
    "dashNextStep": "తదుపరి చర్య: ప్రింట్ చేసిన DPRను కొటేషన్‌తో లీడ్ బ్యాంకులో సమర్పించండి",
    "modalLoginTitle": "లబ్ధిదారు నమోదు & ప్రాంత వివరాలు",
    "lblFullName": "పూర్తి పేరు:",
    "lblMobile": "మొబైల్ నంబర్ (10 అంకెలు):",
    "lblSocialCategory": "సామాజిక / లక్ష్య వర్గం:",
    "lblState": "రాష్ట్రం / కేంద్రపాలిత ప్రాంతం:",
    "lblDistrict": "జిల్లా:",
    "lblVillage": "గ్రామం / పట్టణం / పంచాయతీ:",
    "lblPincode": "పిన్ కోడ్:",
    "lblBizStatus": "ప్రస్తుత వ్యాపార స్థితి:",
    "optNewBiz": "కొత్త సూక్ష్మ వ్యాపారం ప్రారంభించాలని యోచిస్తున్నారు",
    "optExpandBiz": "ఇప్పటికే వ్యాపారం ఉంది, విస్తరించాలనుకుంటున్నారు",
    "optSwitchBiz": "మరింత లాభదాయకమైన వ్యాపారానికి మారాలనుకుంటున్నారు",
    "btnLoginSubmit": "ప్రొఫైల్ సేవ్ చేసి పోర్టల్‌లోకి ప్రవేశించండి",
    "lblDemoCredentials": "డెమో ప్రొఫైల్:",
    "btnDemoFill": "డెమో వివరాలు పూరించండి",
    "compareModalTitle": "రాయితీ రుణ పథకాల పోలిక పట్టిక",
    "thScheme": "పథకం పేరు",
    "thTarget": "లక్షిత వర్గం",
    "thMaxProject": "గరిష్ట ప్రాజెక్ట్ పరిమితి",
    "thSubsidyPct": "మూలధన సబ్సిడీ %",
    "thInterestRate": "రాయితీ వడ్డీ రేటు",
    "thCollateral": "పూచీకత్తు అవసరం",
    "videoModalTitle": "గ్రామీణ పారిశ్రామికవేత్తల కోసం వీడియో & వాయిస్ గైడ్",
    "videoDesc": "వ్యాపార ఎంపిక, సాధ్యత స్కోరు మరియు 10% బ్యాంక్ లోన్ పొందే పూర్తి ప్రక్రియను మీ మాతృభాషలో తెలుసుకోండి.",
    "audioTitle": "ఆడియో సారథి (వాయిస్ అసిస్టెంట్)",
    "audioDesc": "మీ మాతృభాషలో పూర్తి వ్యాపార విశ్లేషణ మరియు బ్యాంక్ మార్గదర్శకాలను వినండి.",
    "btnPlayVoice": "మీ భాషలో వినండి",
    "btnPauseVoice": "ఆడియో ఆపండి",
    "footerCopyright": "వ్యాపార్ సారథి — సామాజిక న్యాయం మరియు సాధికారత మంత్రిత్వ శాఖ, భారత ప్రభుత్వం.",
    "lblQuarterlyEmi": "త్రైమాసిక వాయిదా (EMI) చెల్లింపు",
    "lblMonthlyEq": "నెలవారీ సమానమైన భారం",
    "lblTotalInterest": "మొత్తం చెల్లించాల్సిన వడ్డీ",
    "lblTotalRepaid": "గడువులో మొత్తం చెల్లించిన మొత్తం",
    "videoSectionTitle": "గ్రామీଣ పారిశ్రామికవేత్తల కోసం అధికారిక వీడియో & వాయిస్ గైడ్",
    "videoSectionDesc": "వ్యాపార ఎంపిక, సాధ్యత స్కోరు మరియు 10% బ్యాంక్ లోన్ పొందే పూర్తి ప్రక్రియను మీ మాతୃభాషలో తెలుసుకోండి.",
    "inputTitle": "ప్రాంతం మరియు వ్యాపార వివరాలను ఎంచుకోండి",
    "lblMargin": "అందుబాటులో ఉన్న మూలధనం (10%)",
    "navCatalog": "32 వ్యాపారాల కేటలాగ్"
  },
  "ta": {
    "govIndia": "இந்திய அரசு",
    "govIndiaHindi": "GOVERNMENT OF INDIA",
    "portalTitle": "வியாபார் சாரதி",
    "tagline": "ஊரக சிறுதொழில் ஆலோசனை மற்றும் மானியக் கடன் திட்ட போர்டல் | சமூக நீதி மற்றும் அதிகாரமளித்தல் அமைச்சகம்",
    "lblTheme": "டார்க் மோட்",
    "lblLanguage": "மொழியைத் தேர்ந்தெடுக்கவும்:",
    "ashokaPillarBadge": "இந்திய தேசிய சின்னம் (அசோக தூண்)",
    "navHome": "முகப்பு",
    "navFeasibility": "சாத்தியக்கூறு & அபாயங்கள்",
    "navFinancials": "நிதி கணக்கீடு (10%)",
    "navEnterprises": "32 தொழில்கள் பட்டியல்",
    "navDashboard": "பயனாளர் டாஷ்போர்டு",
    "navCompare": "திட்டங்கள் ஒப்பீடு",
    "navVideo": "வீடியோ வழிகாட்டி",
    "btnLogin": "உள்நுழைவு / பதிவு",
    "btnLogout": "வெளியேறு",
    "heroBadge": "சமூக நீதி அமைச்சகத்தின் அதிகாரப்பூர்வ ஊரக தொழில் தளம்",
    "heroHeading": "AI-இயங்கும் உள்ளூர் சாத்தியக்கூறு & மானியக் கடன் போர்டல்",
    "heroDesc": "766 ஊரக மாவட்டங்களில் சிறுதொழில் முனைவோருக்கு அதிகாரம் அளித்தல். மூலப்பொருள் வழங்கல், சந்தை தேவை, 10% பயனாளி முதலீடு மற்றும் அரசு மானிய பகுப்பாய்வு.",
    "heroChip1": "வெறும் 10% பயனாளி முதலீடு",
    "heroChip2": "50% வரை மூலதன மானியம்",
    "heroChip3": "பிணையில்லா கடன் (CGTMSE)",
    "heroChip4": "5% வட்டி மானிய சலுகை",
    "statDistricts": "766 மாவட்டங்கள்",
    "statDistrictsSub": "அகில இந்திய கிராம ஊராட்சிகள் இணைக்கப்பட்டுள்ளன",
    "statStates": "28 மாநிலங்கள் & 8 யூனியன் பிரதேசங்கள்",
    "statStatesSub": "ஒருங்கிணைந்த LGD அடைவுடன் இணைப்பு",
    "statBizPlans": "32 லாபகரமான தொழில்கள்",
    "statBizPlansSub": "முழுமையான DPR மற்றும் நிதி விவரங்கள்",
    "statSubsidy": "₹1.25 லட்சம் வரை",
    "statSubsidySub": "சலுகை மூலதன மானியம்",
    "tabFeasibility": "உள்ளூர் சாத்தியக்கூறு & அபாய ரேடார்",
    "tabFinancials": "ஸ்மார்ட் நிதி எஞ்சின் & மானியத் திட்டங்கள் (10% பங்கு)",
    "lblWelcome": "வரவேற்கிறோம்",
    "lblGuest": "பயனாளி விவரம்",
    "lblCategory": "சமூகப் பிரிவு",
    "lblLocation": "இலக்கு இருப்பிடம்",
    "lblPreferredBiz": "செயலில் உள்ள தொழில் திட்டம்",
    "btnSwitchBiz": "தொழிலை மாற்றவும்",
    "btnEditProfile": "விவரங்களை மாற்றவும்",
    "secCategoriesTitle": "சமூகப் பிரிவைத் தேர்ந்தெடுக்கவும் (சிறப்பு மானிய திட்டங்களுக்கு)",
    "catScSt": "பட்டியலிடப்பட்ட சாதி / பழங்குடி (SC/ST)",
    "catScStDesc": "NSFDC / NSTFDC கீழ் 40% வரை மானியம் மற்றும் 4% சலுகை வட்டி கடன்.",
    "catObc": "இதர பிற்படுத்தப்பட்ட வகுப்பினர் (OBC)",
    "catObcDesc": "NBCFDC கீழ் 4%-5% சலுகை வட்டியில் வங்கிக் கடன்.",
    "catDivyangjan": "மாற்றுத்திறனாளிகள் (PwD)",
    "catDivyangjanDesc": "NHFDC சிறுதொழில் நிதி 5% வட்டி மானியத்துடன்.",
    "catWomen": "மகளிர் சுயஉதவிக் குழுக்கள் (SHG)",
    "catWomenDesc": "மகிளா சம்ரித்தி யோஜனா கீழ் பிணையில்லா கடன் மற்றும் சந்தை ஆதரவு.",
    "catEws": "பொருளாதாரத்தில் பின்தங்கிய பொதுப்பிரிவினர் (EWS)",
    "catEwsDesc": "PMEGP / முத்ரா சலுகைக் கடன் 25%-35% ஊரக மானியத்துடன்.",
    "secFeasibilityHeading": "உள்ளூர் சாத்தியக்கூறு & அபாய மதிப்பீடு",
    "secFeasibilitySub": "மூலப்பொருள் அருகாமை, உள்ளூர் சந்தை தேவை மற்றும் பருவமழை அபாயங்களின் பகுப்பாய்வு.",
    "lblSelectBiz": "ஊரக சிறுதொழிலைத் தேர்ந்தெடுக்கவும்:",
    "lblViabilityScore": "ஒட்டுமொத்த சாத்தியக்கூறு மதிப்பெண்",
    "radarTitle": "5-தூண் சாத்தியக்கூறு ரேடார்",
    "radarPillar1": "மூலப்பொருள் அருகாமை",
    "radarPillar2": "உள்ளூர் சந்தை தேவை வேகம்",
    "radarPillar3": "விநியோகச் சங்கிலி நிலைத்தன்மை",
    "radarPillar4": "நடைமுறை மூலதன பணப்புழக்கம்",
    "radarPillar5": "பருவமழை மற்றும் காலநிலை அபாயத் தணிப்பு",
    "swotTitle": "உள்ளூர் SWOT பகுப்பாய்வு",
    "swotStrengths": "பலங்கள் & உள்ளூர் நன்மைகள்",
    "swotWeaknesses": "செயல்பாட்டு வரம்புகள்",
    "swotOpportunities": "சந்தை & மானிய வாய்ப்புகள்",
    "swotThreats": "தணிக்கப்பட்ட அபாயங்கள்",
    "calendarTitle": "12-மாத பருவகால தேவை & பணப்புழக்க காலண்டர்",
    "calendarSub": "பருவகால தேவைக்கு ஏற்ப உங்கள் நடைமுறை மூலதனத்தை திட்டமிடுங்கள்.",
    "competitorTitle": "உள்ளூர் சந்தை போட்டியாளர்கள் & உள்கட்டமைப்பு வரைபடம்",
    "thPoiName": "தொழில் / நிறுவன பெயர்",
    "thPoiType": "பிரிவு",
    "thPoiDist": "தூரம்",
    "thPoiImpact": "போட்டித் தாக்கம்",
    "secFinancialHeading": "ஸ்மார்ட் நிதி கட்டமைப்பு & மானியக் கடன் எஞ்சின்",
    "secFinancialSub": "10% பயனாளி முதலீடு, அரசு மானிய இணைப்பு மற்றும் தானியங்கி வங்கி DPR தயாரிப்பு.",
    "lblSchemeMatched": "பரிந்துரைக்கப்பட்ட சலுகைத் திட்டம்:",
    "cardProjectCost": "மொத்த திட்டச் செலவு",
    "cardSubsidy": "அரசு மூலதன மானியம்",
    "cardMargin": "பயனாளி பங்கு (10%)",
    "cardLoan": "வங்கி தவணைக் கடன் (90%)",
    "cardInterest": "சலுகை வட்டி விகிதம்",
    "cardEmi": "மாதாந்திர தவணை (EMI) - 5 ஆண்டுகள்",
    "cardBreakeven": "எதிர்பார்க்கப்படும் பிரேக்-ஈவன்",
    "cardWorkingCap": "நடைமுறை மூலதன இருப்பு",
    "waterfallTitle": "மாதாந்திர பணப்புழக்கம் & வருமான மதிப்பீடு",
    "thRevenue": "மொத்த மாதாந்திர வருவாய்",
    "thOpex": "மூலப்பொருள் & இயக்கச் செலவுகள்",
    "thEmi": "சலுகை வங்கி தவணை",
    "thNetProfit": "பயனாளியின் நிகர மாதாந்திர லாபம்",
    "secDocsTitle": "வங்கி DPR கட்டாய ஆவணங்கள் சரிபார்ப்புப் பட்டியல்",
    "docAadhaar": "ஆதார் கார்டு & பான் கார்டு சரிபார்ப்பு",
    "docResidence": "கிராம ஊராட்சி இருப்பிடச் சான்றிதழ்",
    "docCaste": "சாதிச் சான்றிதழ் (மானியம் பெற கட்டாயம்)",
    "docQuotation": "இயந்திரங்களுக்கான அதிகாரப்பூர்வ விலைப்பட்டியல் (Quotation)",
    "docLand": "தொழில் இடத்துக்கான உரிமை பத்திரம் அல்லது வாடகை ஒப்பந்தம்",
    "secWhereToSubmit": "விண்ணப்பத்தை எங்கு சமர்ப்பிக்க வேண்டும் (லீட் வங்கி மற்றும் SCA அலுவலகம்)",
    "btnDownloadDprPdf": "வங்கி DPR பதிவிறக்கம் செய்க (PDF)",
    "btnShareWhatsApp": "வாட்ஸ்அப்பில் பகிரவும்",
    "btnCompareSchemes": "அனைத்து சலுகைத் திட்டங்களையும் ஒப்பிடவும்",
    "catalogTitle": "32 லாபகரமான ஊரக சிறுதொழில் திட்டங்கள்",
    "catalogSub": "யூனிட் எகனாமிக்ஸ், இயந்திர விவரங்கள் மற்றும் சலுகைக் கடன்களுடன் தொகுக்கப்பட்டது.",
    "filterAll": "அனைத்து தொழில்கள் (32)",
    "filterAgro": "வேளாண் பதப்படுத்துதல் & பால்பண்ணை",
    "filterGreen": "பசுமை ஆற்றல் & மின்-வாகனம்",
    "filterCrafts": "சுற்றுச்சூழல் கைவினைப்பொருட்கள்",
    "filterDigital": "டிஜிட்டல் & ஊரக சேவைகள்",
    "searchBizPlaceholder": "தொழில் பெயர் அல்லது முதலீட்டு வரம்பில் தேடவும்...",
    "btnSelectEnterprise": "சாத்தியக்கூறு & DPR பார்க்க",
    "dashTitle": "பயனாளி ஆலோசனை & கடன் கண்காணிப்பு டாஷ்போர்டு",
    "dashSub": "உங்கள் DPR நிலை, வங்கி மதிப்பீடு மற்றும் மானியக் கோரிக்கையைக் கண்காணிக்கவும்.",
    "dashAppStatus": "விண்ணப்ப நிலை: வங்கியில் சமர்ப்பிக்க DPR தயாராக உள்ளது",
    "dashNextStep": "அடுத்த நடவடிக்கை: அச்சிடப்பட்ட DPR-ஐ கொட்டேஷனுடன் லீட் வங்கியில் சமர்ப்பிக்கவும்",
    "modalLoginTitle": "பயனாளி பதிவு & இருப்பிட விவரங்கள்",
    "lblFullName": "முழு பெயர்:",
    "lblMobile": "மொபைல் எண் (10 இலக்கங்கள்):",
    "lblSocialCategory": "சமூகப் பிரிவு:",
    "lblState": "மாநிலம் / யூனியன் பிரதேசம்:",
    "lblDistrict": "மாவட்டம்:",
    "lblVillage": "கிராமம் / நகரம் / ஊராட்சி:",
    "lblPincode": "அஞ்சல் குறியீட்டு எண் (PIN):",
    "lblBizStatus": "தற்போதைய தொழில் நிலை:",
    "optNewBiz": "புதிய சிறுதொழில் தொடங்க திட்டமிட்டுள்ளேன்",
    "optExpandBiz": "ஏற்கனவே தொழில் உள்ளது, விரிவாக்க விரும்புகிறேன்",
    "optSwitchBiz": "அதிக லாபகரமான தொழிலுக்கு மாற விரும்புகிறேன்",
    "btnLoginSubmit": "விவரங்களைச் சேமித்து போர்ட்டலில் நுழையவும்",
    "lblDemoCredentials": "டெமோ விவரங்கள்:",
    "btnDemoFill": "டெமோ தகவல்களை நிரப்புக",
    "compareModalTitle": "சலுகைக் கடன் திட்டங்களின் ஒப்பீட்டு அட்டவணை",
    "thScheme": "திட்டத்தின் பெயர்",
    "thTarget": "இலக்கு பிரிவு",
    "thMaxProject": "அதிகபட்ச திட்ட வரம்பு",
    "thSubsidyPct": "மூலதன மானியம் %",
    "thInterestRate": "சலுகை வட்டி விகிதம்",
    "thCollateral": "பிணைய தேவை",
    "videoModalTitle": "ஊரக தொழில்முனைவோருக்கான வீடியோ & குரல் வழிகாட்டி",
    "videoDesc": "தொழில் தேர்வு, சாத்தியக்கூறு மதிப்பெண் மற்றும் வங்கி கடன் ஒப்புதல் பெறும் முழு செயல்முறையையும் உங்கள் தாய்மொழியில் தெரிந்துகொள்ளுங்கள்.",
    "audioTitle": "ஆடியோ சாரதி (குரல் உதவியாளர்)",
    "audioDesc": "உங்கள் தாய்மொழியில் முழுமையான வணிக பகுப்பாய்வு மற்றும் வங்கி வழிகாட்டுதல்களைக் கேளுங்கள்.",
    "btnPlayVoice": "உங்கள் மொழியில் கேளுங்கள்",
    "btnPauseVoice": "ஆடியோவை நிறுத்துக",
    "footerCopyright": "வியாபார் சாரதி — சமூக நீதி மற்றும் அதிகாரமளித்தல் அமைச்சகம், இந்திய அரசு.",
    "lblQuarterlyEmi": "காலாண்டு தவணை (EMI) செலுத்துதல்",
    "lblMonthlyEq": "மாதாந்திர சமமான சுமை",
    "lblTotalInterest": "மொத்த கடன் வட்டி",
    "lblTotalRepaid": "மொத்த திருப்பிச் செலுத்தப்பட்ட தொகை",
    "videoSectionTitle": "ஊரக தொழில்முனைவோருக்கான அதிகாரப்பூர்வ வீடியோ & குரல் வழிகாட்டி",
    "videoSectionDesc": "தொழில் தேர்வு, சாத்தியக்கூறு மதிப்பெண் மற்றும் வங்கி கடன் ஒப்புதல் பெறும் முழு செயல்முறையையும் உங்கள் தாய்மொழியில் தெரிந்துகொள்ளுங்கள்.",
    "inputTitle": "இருப்பிடம் மற்றும் தொழில் அளவுருக்களைத் தேர்ந்தெடுக்கவும்",
    "lblMargin": "கிடைக்கக்கூடிய முதலீட்டு பங்கு (10%)",
    "navCatalog": "32 தொழில்கள் பட்டியல்"
  },
  "mr": {
    "govIndia": "भारत सरकार",
    "govIndiaHindi": "GOVERNMENT OF INDIA",
    "portalTitle": "व्यापार सारथी",
    "tagline": "ग्रामीण सूक्ष्म उद्योग सल्लागार व सवलतीचे कर्ज योजना पोर्टल | सामाजिक न्याय व सक्षमीकरण मंत्रालय",
    "lblTheme": "डार्क मोड",
    "lblLanguage": "भाषा निवडा:",
    "ashokaPillarBadge": "भारताचे राष्ट्रीय प्रतीक (अशोक स्तंभ)",
    "navHome": "मुख्य पृष्ठ",
    "navFeasibility": "व्यवहार्यता व जोखीम",
    "navFinancials": "आर्थिक इंजिन (१०%)",
    "navEnterprises": "३२ उद्योग कॅटलॉग",
    "navDashboard": "लाभार्थी डॅशबोर्ड",
    "navCompare": "योजना तुलना",
    "navVideo": "व्हिडिओ मार्गदर्शक",
    "btnLogin": "लॉगिन / नोंदणी",
    "btnLogout": "लॉगआउट",
    "heroBadge": "सामाजिक न्याय व सक्षमीकरण मंत्रालयाची अधिकृत ग्रामीण उद्योग प्रणाली",
    "heroHeading": "एआय-चालित अति-स्थानिक व्यवहार्यता व सवलतीचे कर्ज पोर्टल",
    "heroDesc": "७६६ ग्रामीण जिल्ह्यांमधील सूक्ष्म उद्योजकांना सक्षम करणे. कच्चा माल पुरवठा, स्थानिक आठवडी बाजार मागणी, १०% लाभार्थी भांडवल आणि सरकारी अनुदानाचे अचूक विश्लेषण.",
    "heroChip1": "फक्त १०% लाभार्थी स्व-भांडवल",
    "heroChip2": "५०% पर्यंत भांडवली अनुदान (सब्सिडी)",
    "heroChip3": "तारणमुक्त बँक कर्ज (CGTMSE)",
    "heroChip4": "५% व्याज परतावा सवलत",
    "statDistricts": "७६६ जिल्हे",
    "statDistrictsSub": "अखिल भारतीय ग्रामपंचायती समाविष्ट",
    "statStates": "२८ राज्ये व ८ केंद्रशासित प्रदेश",
    "statStatesSub": "एकीकृत एलजीडी निर्देशिकेशी जोडलेले",
    "statBizPlans": "३२ फायदेशीर उद्योग",
    "statBizPlansSub": "युनिट इकॉनॉमिक्ससह परिपूर्ण डीपीआर",
    "statSubsidy": "₹१.२५ लाखांपर्यंत",
    "statSubsidySub": "सवलतीचे भांडवली अनुदान",
    "tabFeasibility": "अति-स्थानिक व्यवहार्यता व जोखीम रडार",
    "tabFinancials": "स्मार्ट वित्तीय इंजिन व सवलतीच्या योजना (१०% स्व-भांडवल)",
    "lblWelcome": "स्वागत आहे",
    "lblGuest": "लाभार्थी प्रोफाइल",
    "lblCategory": "सामाजिक वर्ग",
    "lblLocation": "लक्ष्य ठिकाण",
    "lblPreferredBiz": "सक्रिय उद्योग योजना",
    "btnSwitchBiz": "व्यवसाय बदला",
    "btnEditProfile": "प्रोफाइल बदला",
    "secCategoriesTitle": "लक्षित सामाजिक प्रवर्ग निवडा (विशेष सवलतीच्या कर्ज योजनांसाठी)",
    "catScSt": "अनुसूचित जाती / जमाती (SC/ST)",
    "catScStDesc": "NSFDC / NSTFDC अंतर्गत ४०% पर्यंत अनुदान व ४% सवलतीचे व्याजदर.",
    "catObc": "इतर मागासवर्गीय (OBC)",
    "catObcDesc": "NBCFDC अंतर्गत ४%-५% सवलतीच्या व्याजदराने मुदत कर्ज.",
    "catDivyangjan": "दिव्यांग व्यक्ती (PwD)",
    "catDivyangjanDesc": "NHFDC सूक्ष्म उद्योग योजना ५% व्याज सवलतीसह.",
    "catWomen": "महिला बचत गट (SHG)",
    "catWomenDesc": "महिला समृद्धी योजना विनातारण कर्ज व बाजारपेठ जोडणी.",
    "catEws": "सामान्य आर्थिक दुर्बल घटक (EWS)",
    "catEwsDesc": "PMEGP / मुद्रा सवलतीचे कर्ज २५%-३५% ग्रामीण अनुदानासह.",
    "secFeasibilityHeading": "अति-स्थानिक व्यवहार्यता व जोखीम मूल्यांकन",
    "secFeasibilitySub": "कच्च्या मालाची उपलब्धता, स्थानिक बाजार मागणी आणि हवामान जोखमींचे विश्लेषण.",
    "lblSelectBiz": "ग्रामीण सूक्ष्म उद्योग निवडा:",
    "lblViabilityScore": "एकूण व्यवहार्यता स्कोअर",
    "radarTitle": "५-स्तंभ व्यवहार्यता रडार",
    "radarPillar1": "कच्च्या मालाचे सान्निध्य",
    "radarPillar2": "स्थानिक बाजारातील मागणी",
    "radarPillar3": "पुरवठा साखळी व वाहतूक लवचिकता",
    "radarPillar4": "खेळत्या भांडवलाची तरलता",
    "radarPillar5": "पावसाळा व हवामान जोखीम निवारण",
    "swotTitle": "अति-स्थानिक SWOT विश्लेषण",
    "swotStrengths": "सामर्थ्य व स्थानिक फायदे",
    "swotWeaknesses": "परिचालन मर्यादा",
    "swotOpportunities": "बाजारपेठ व अनुदानाच्या संधी",
    "swotThreats": "निवारलेली संकटे",
    "calendarTitle": "१२ महिन्यांचे हंगामी मागणी व रोख प्रवाह कॅलेंडर",
    "calendarSub": "हंगामी मागणी आणि पावसाळी वाहतुकीनुसार खेळत्या भांडवलाचे नियोजन करा.",
    "competitorTitle": "स्थानिक बाजार स्पर्धक व पायाभूत सुविधा नकाशा",
    "thPoiName": "उद्योग / आस्थापना नाव",
    "thPoiType": "प्रवर्ग",
    "thPoiDist": "अंतर",
    "thPoiImpact": "स्पर्धात्मक प्रभाव",
    "secFinancialHeading": "स्मार्ट वित्तीय रचना व सवलतीचे कर्ज इंजिन",
    "secFinancialSub": "१०% लाभार्थी भांडवल, सरकारी अनुदान आणि स्वयंचलित बँक डीपीआर निर्मिती.",
    "lblSchemeMatched": "शिफारस केलेली सवलतीची योजना:",
    "cardProjectCost": "एकूण प्रकल्प खर्च",
    "cardSubsidy": "सरकारी भांडवली अनुदान",
    "cardMargin": "लाभार्थी स्व-गुंतवणूक (१०%)",
    "cardLoan": "बँक मुदत कर्ज (९०%)",
    "cardInterest": "सवलतीचा व्याजदर",
    "cardEmi": "मासिक हप्ता (EMI) - ५ वर्षे",
    "cardBreakeven": "अंदाजे ब्रेक-इव्हन कालावधी",
    "cardWorkingCap": "खेळते भांडवल राखीव",
    "waterfallTitle": "मासिक रोख प्रवाह व उत्पन्न अंदाज",
    "thRevenue": "एकूण मासिक उत्पन्न",
    "thOpex": "कच्चा माल व परिचालन खर्च",
    "thEmi": "सवलतीचा बँक हप्ता",
    "thNetProfit": "लाभार्थ्याचा निव्वळ मासिक नफा",
    "secDocsTitle": "अनिवार्य बँक डीपीआर कागदपत्रे यादी",
    "docAadhaar": "आधार कार्ड व पॅन कार्ड पडताळणी",
    "docResidence": "ग्रामपंचायत रहिवासी प्रमाणपत्र",
    "docCaste": "जातीचे प्रमाणपत्र (अनुदानासाठी आवश्यक)",
    "docQuotation": "यंत्रसामग्रीचे अधिकृत विक्रेत्याचे कोटेशन",
    "docLand": "जागेचे मालकी हक्क किंवा भाडे करारपत्र",
    "secWhereToSubmit": "अर्ज कोठे सादर करावा (अग्रणी जिल्हा बँक व महामंडळ कार्यालये)",
    "btnDownloadDprPdf": "बँक डीपीआर डाउनलोड करा (PDF)",
    "btnShareWhatsApp": "व्हॉट्सॲपवर पाठवा",
    "btnCompareSchemes": "सर्व सवलतीच्या योजनांची तुलना करा",
    "catalogTitle": "३२ फायदेशीर ग्रामीण सूक्ष्म उद्योग योजना",
    "catalogSub": "युनिट इकॉनॉमिक्स, यंत्रसामग्री तपशील आणि सवलतीच्या कर्जासह.",
    "filterAll": "सर्व उद्योग (३२)",
    "filterAgro": "कृषी-प्रक्रिया व दुग्धव्यवसाय",
    "filterGreen": "हरित ऊर्जा व ई-वाहन",
    "filterCrafts": "पर्यावरणपूरक हस्तकला व पुनर्वापर",
    "filterDigital": "डिजिटल व ग्रामीण सेवा",
    "searchBizPlaceholder": "उद्योग नाव किंवा गुंतवणूक श्रेणीनुसार शोधा...",
    "btnSelectEnterprise": "व्यवहार्यता व डीपीआर पहा",
    "dashTitle": "लाभार्थी सल्लागार व कर्ज ट्रॅकर डॅशबोर्ड",
    "dashSub": "आपली डीपीआर स्थिती, बँक मूल्यांकन आणि अनुदानाचा मागोवा घ्या.",
    "dashAppStatus": "अर्जाचा टप्पा: बँकेत सादर करण्यासाठी डीपीआर सज्ज",
    "dashNextStep": "पुढील पायरी: कोटेशनसह मुद्रित डीपीआर अग्रणी बँकेत सादर करा",
    "modalLoginTitle": "लाभार्थी नोंदणी व ठिकाण तपशील",
    "lblFullName": "पूर्ण नाव:",
    "lblMobile": "मोबाईल क्रमांक (१० अंक):",
    "lblSocialCategory": "सामाजिक प्रवर्ग:",
    "lblState": "राज्य / केंद्रशासित प्रदेश:",
    "lblDistrict": "जिल्हा:",
    "lblVillage": "गाव / शहर / ग्रामपंचायत:",
    "lblPincode": "पिन कोड:",
    "lblBizStatus": "सध्याची व्यवसाय स्थिती:",
    "optNewBiz": "नवीन सूक्ष्म उद्योग सुरू करण्याचा विचार आहे",
    "optExpandBiz": "सध्या व्यवसाय सुरू असून विस्तार करायचा आहे",
    "optSwitchBiz": "अधिक फायदेशीर व्यवसायात बदल करायचा आहे",
    "btnLoginSubmit": "माहिती जतन करा आणि पोर्टलमध्ये प्रवेश करा",
    "lblDemoCredentials": "डेमो प्रोफाइल:",
    "btnDemoFill": "डेमो माहिती भरा",
    "compareModalTitle": "सवलतीच्या कर्ज योजनांची तुलनात्मक सारणी",
    "thScheme": "योजनेचे नाव",
    "thTarget": "लक्षित प्रवर्ग",
    "thMaxProject": "कमाल प्रकल्प मर्यादा",
    "thSubsidyPct": "भांडवली अनुदान %",
    "thInterestRate": "सवलतीचा व्याजदर",
    "thCollateral": "तारण आवश्यकता",
    "videoModalTitle": "ग्रामीण उद्योजकांसाठी व्हिडिओ व ऑडिओ मार्गदर्शक",
    "videoDesc": "उद्योग निवड, व्यवहार्यता स्कोअर आणि १०% बँक कर्ज मंजुरीची संपूर्ण प्रक्रिया आपल्या भाषेत समजून घ्या.",
    "audioTitle": "ऑडिओ सारथी (व्हॉइस असिस्टंट)",
    "audioDesc": "आपल्या मातृभाषेत संपूर्ण व्यावसायिक मूल्यांकन आणि बँक मार्गदर्शक तत्त्वे ऐका.",
    "btnPlayVoice": "आपल्या भाषेत ऐका",
    "btnPauseVoice": "ऑडिओ थांबवा",
    "footerCopyright": "व्यापार सारथी — सामाजिक न्याय व सक्षमीकरण मंत्रालय, भारत सरकार.",
    "lblQuarterlyEmi": "त्रैमासिक हप्ता (EMI) परतफेड",
    "lblMonthlyEq": "मासिक समतुल्य भार",
    "lblTotalInterest": "कालावधीतील एकूण कर्ज व्याज",
    "lblTotalRepaid": "कालावधीत एकूण परतफेड केलेली रक्कम",
    "videoSectionTitle": "ग्रामीण उद्योजकांसाठी अधिकृत व्हिडिओ व ऑडिओ मार्गदर्शक",
    "inputTitle": "ठिकाण व उद्योग निकष निवडा",
    "lblMargin": "उपलब्ध स्व-भांडवल (१०%)",
    "navCatalog": "३२ उद्योग कॅटलॉग",
    "videoSectionDesc": "उद्योग निवड, व्यवहार्यता स्कोअर आणि १०% बँक कर्ज मंजुरीची संपूर्ण प्रक्रिया आपल्या भाषेत समजून घ्या."
  }
};

const SPEECH_PROMPTS = {
  "hi": {
    "welcome": "व्यापार सारथी में आपका स्वागत है {name} जी। आपका नागरिक प्रोफाइल सफलतापूर्वक सत्यापित हो गया है।",
    "biz_selected": "आपने चुना है {biz}। इसके लिए दस प्रतिशत मार्जिन राशि रुपये {margin} है। कुल परियोजना लागत रुपये {cost} और नब्बे प्रतिशत ऋण राशि रुपये {loan} तय की गई है।",
    "margin_updated": "मार्जिन पूंजी अपडेट हो गई है। कुल व्यवहार्य परियोजना लागत रुपये {cost} है।",
    "ch1": "पहला कदम: अपना राज्य और गाँव चुनें। व्यापार सारथी स्थानीय बाजार की माँग का विश्लेषण करता है।",
    "ch2": "दूसरा कदम: अपनी उपलब्ध मार्जिन राशि दर्ज करें। दस प्रतिशत पर नब्बे प्रतिशत बैंक ऋण स्वचालित रूप से तैयार होगा।",
    "ch3": "तीसरा कदम: व्यवहार्यता स्कोर और जोखिम रडार देखें।",
    "ch4": "चौथा कदम: बैंक शाखा प्रबंधक के लिए आधिकारिक डीपीआर रिपोर्ट डाउनलोड करें।"
  },
  "or": {
    "welcome": "ବ୍ୟାପାର ସାରଥୀରେ ଆପଣଙ୍କୁ ସ୍ୱାଗତ {name} ବାବୁ | ଆପଣଙ୍କ ନାଗରିକ ପ୍ରୋଫାଇଲ୍ ସଫଳତାର ସହ ଯାଞ୍ଚ ହୋଇଛି |",
    "biz_selected": "ଆପଣ ବାଛିଛନ୍ତି {biz} | ଏଥିପାଇଁ ଦଶ ପ୍ରତିଶତ ମାର୍ଜିନ୍ ଟଙ୍କା {margin} ଅଟେ | ସମୁଦାୟ ପ୍ରକଳ୍ପ ମୂଲ୍ୟ ଟଙ୍କା {cost} ଏବଂ ନବେ ପ୍ରତିଶତ ରିହାତି ଋଣ ଟଙ୍କା {loan} ନିର୍ଦ୍ଧାରଣ କରାଗଲା |",
    "margin_updated": "ମାର୍ଜିନ୍ ପୁଞ୍ଜି ଅପଡେଟ୍ ହୋଇଛି | ସମୁଦାୟ ସମ୍ଭାବ୍ୟ ପ୍ରକଳ୍ପ ମୂଲ୍ୟ ଟଙ୍କା {cost} ଅଟେ |",
    "ch1": "ପ୍ରଥମ ପଦକ୍ଷେପ: ଆପଣଙ୍କ ରାଜ୍ୟ ଓ ଗ୍ରାମ ବାଛନ୍ତୁ | ସ୍ଥାନୀୟ ବଜାର ଚାହିଦା ଆକଳନ ହେବ |",
    "ch2": "ଦ୍ୱିତୀୟ ପଦକ୍ଷେପ: ନିଜର ୧୦% ମାର୍ଜିନ୍ ପୁଞ୍ଜି ପ୍ରବେଶ କରନ୍ତୁ | ୯୦% ରିହାତି ଋଣ ହିସାବ ହେବ |",
    "ch3": "ତୃତୀୟ ପଦକ୍ଷେପ: ବ୍ୟବସାୟର ସମ୍ଭାବ୍ୟତା ସ୍କୋର ଏବଂ ବିପଦ ମୁକାବିଲା ଯୋଜନା ଦେଖନ୍ତୁ |",
    "ch4": "ଚତୁର୍ଥ ପଦକ୍ଷେପ: ବ୍ୟାଙ୍କରେ ଦାଖଲ ପାଇଁ ସରକାରୀ ଡିପିଆର ରିପୋର୍ଟ ଡାଉନଲୋଡ୍ କରନ୍ତୁ |"
  },
  "bn": {
    "welcome": "ব্যাপার সারথীতে আপনাকে স্বাগতম {name}। আপনার নাগরিক প্রোফাইল সফলভাবে যাচাই করা হয়েছে।",
    "biz_selected": "আপনি নির্বাচন করেছেন {biz}। এর জন্য ১০ শতাংশ নিজস্ব মার্জিন হল টাকা {margin}। প্রকল্প ব্যয় টাকা {cost} এবং ৯০ শতাংশ ঋণ টাকা {loan}।",
    "margin_updated": "মার্জিন আপডেট হয়েছে। মোট সম্ভাব্য প্রকল্প ব্যয় টাকা {cost}।",
    "ch1": "প্রথম ধাপ: আপনার রাজ্য এবং গ্রাম নির্বাচন করুন।",
    "ch2": "দ্বিতীয় ধাপ: আপনার ১০% মার্জিন মূলধন লিখুন। ৯০% সরকারি ঋণ হিসাব হবে।",
    "ch3": "তৃতীয় ধাপ: ব্যবসায়িক সম্ভাব্যতা স্কোর এবং ঝুঁকি বিশ্লেষণ দেখুন।",
    "ch4": "চতুর্থ ধাপ: ব্যাংকে জমা দেওয়ার জন্য অফিশিয়াল ডিপিআর রিপোর্ট ডাউনলোড করুন।"
  },
  "te": {
    "welcome": "వ్యాపార సారథికి స్వాగతం {name} గారు. మీ ప్రొఫైల్ ధృవీకరించబడింది.",
    "biz_selected": "మీరు {biz} ఎంచుకున్నారు. దీనికి పది శాతం మార్జిన్ రూపాయలు {margin}. మొత్తం ప్రాజెక్ట్ ఖర్చు రూపాయలు {cost}.",
    "margin_updated": "పెట్టుబడి వివరాలు నవీకరించబడ్డాయి. ప్రాజెక్ట్ ఖర్చు రూపాయలు {cost}.",
    "ch1": "మొదటి అడుగు: మీ గ్రామాన్ని ఎంచుకోండి.",
    "ch2": "రెండవ అడుగు: మీ 10% పెట్టుబడిని నమోదు చేయండి.",
    "ch3": "మూడవ అడుగు: సాధ్యత స్కోరు మరియు మార్కెట్ విశ్లేషణను చూడండి.",
    "ch4": "నాల్గవ అడుగు: బ్యాంక్ డిపిఆర్ నివేదికను డౌన్‌లోడ్ చేసుకోండి."
  },
  "ta": {
    "welcome": "வியாபார சாரதிக்கு உங்களை வரவேற்கிறோம் {name}. உங்கள் சுயவிவரம் சரிபார்க்கப்பட்டது.",
    "biz_selected": "நீங்கள் {biz} தேர்ந்தெடுத்துள்ளீர்கள். இதற்கு பத்து சதவீத சொந்த பங்கு ரூபாய் {margin}. மொத்த திட்ட மதிப்பு ரூபாய் {cost}.",
    "margin_updated": "முதலீட்டுத் தொகை புதுப்பிக்கப்பட்டது. திட்ட மதிப்பு ரூபாய் {cost}.",
    "ch1": "படி ஒன்று: உங்கள் கிராமத்தைத் தேர்ந்தெடுக்கவும்.",
    "ch2": "படி இரண்டு: உங்கள் 10% சொந்த முதலீட்டை உள்ளிடவும்.",
    "ch3": "படி மூன்று: தொழில் சாத்தியக்கூறு மற்றும் சந்தை தேவையை அறியவும்.",
    "ch4": "படி நான்கு: வங்கி கடன் விண்ணப்பத்திற்கான டிபிஆர் பதிவிறக்கம் செய்யவும்."
  },
  "mr": {
    "welcome": "व्यापार सारथी मध्ये आपले स्वागत आहे {name}. आपले नागरिक प्रोफाइल सत्यापित झाले आहे.",
    "biz_selected": "आपण {biz} निवडले आहे. याकरिता दहा टक्के मार्जिन रक्कम रुपये {margin} आहे. एकूण प्रकल्प खर्च रुपये {cost}.",
    "margin_updated": "मार्जिन अपडेट केले आहे. संभाव्य प्रकल्प खर्च रुपये {cost}.",
    "ch1": "पहिली पायरी: आपले राज्य आणि गाव निवडा.",
    "ch2": "दुसरी पायरी: आपले 10% भांडवल प्रविष्ट करा. 90% बँक कर्ज तयार होईल.",
    "ch3": "तिसरी पायरी: व्यवसाय व्यवहार्यता स्कोअर आणि धोका रडार तपासा.",
    "ch4": "चौथी पायरी: बँकेत सादर करण्यासाठी अधिकृत डीपीआर अहवाल डाउनलोड करा."
  },
  "en": {
    "welcome": "Welcome to Vyapaar Sarthi, {name}. Your citizen profile is authenticated with the local directory.",
    "biz_selected": "Selected enterprise: {biz}. Required 10% Margin capital is rupees {margin}. Total feasible project cost is rupees {cost} with a 90% loan of rupees {loan}.",
    "margin_updated": "Margin capital updated. Total feasible project cost is rupees {cost}.",
    "ch1": "Step 1: Select your state and village. Vyapaar Sarthi scans 5 to 10 km market demand.",
    "ch2": "Step 2: Enter your 10% margin capital. 90% concessional loan is auto-calculated.",
    "ch3": "Step 3: Review your viability score and localized threat mitigation radar.",
    "ch4": "Step 4: Download your bank-ready Detailed Project Report."
  }
};

const COMPETITOR_POIS = [
  {
    "name": "Jyoti Graphics",
    "type": "commercial",
    "lat": 20.3182,
    "lon": 85.8751
  },
  {
    "name": "M/s Maa Sarala Motor Electricals",
    "type": "industrial",
    "lat": 20.3129,
    "lon": 85.8698
  },
  {
    "name": "Kansari Handicrafts",
    "type": "craft",
    "lat": 20.3144,
    "lon": 85.8712
  },
  {
    "name": "Dutta Fabrication Works",
    "type": "industrial",
    "lat": 20.3168,
    "lon": 85.8735
  },
  {
    "name": "Annapurna Flour Mill",
    "type": "industrial",
    "lat": 20.3195,
    "lon": 85.8782
  },
  {
    "name": "National Highway Tyre Works",
    "type": "commercial",
    "lat": 20.3135,
    "lon": 85.8705
  },
  {
    "name": "Biswanath Sweet Stall",
    "type": "commercial",
    "lat": 20.3159,
    "lon": 85.8741
  },
  {
    "name": "Kuakhai Sand & Brick Supplies",
    "type": "industrial",
    "lat": 20.3115,
    "lon": 85.8675
  },
  {
    "name": "Pandra Cold Warehouse",
    "type": "commercial",
    "lat": 20.3085,
    "lon": 85.8621
  },
  {
    "name": "Balianta Organic Seed Agency",
    "type": "commercial",
    "lat": 20.2642,
    "lon": 85.8985
  }
];

const MSJE_CATEGORIES = {
  "sc": {
    "id": "sc",
    "name": "Scheduled Caste (SC)",
    "corporation": "NSFDC (National SC Finance & Development Corp)",
    "rate_concession": -2,
    "subsidy_pct": "35% – 40% Capital Subsidy",
    "subvention": "5% VISVAS Central Interest Subvention Eligible",
    "schemes": [
      "NSFDC Term Loan",
      "Stand-Up India SC",
      "Dr. Ambedkar Utsav Scheme"
    ]
  },
  "st": {
    "id": "st",
    "name": "Scheduled Tribe (ST)",
    "corporation": "NSTFDC (National ST Finance & Development Corp)",
    "rate_concession": -2.5,
    "subsidy_pct": "40% – 50% Capital Subsidy",
    "subvention": "Adivasi Mahila Sashaktikaran Yojana (AMSY) 4% Concession",
    "schemes": [
      "NSTFDC Term Loan",
      "AMSY Tribal Scheme",
      "Van Dhan Vikas Yojana"
    ]
  },
  "obc": {
    "id": "obc",
    "name": "Other Backward Class (OBC)",
    "corporation": "NBCFDC (National Backward Classes Finance Corp)",
    "rate_concession": -1.5,
    "subsidy_pct": "30% – 35% Capital Subsidy",
    "subvention": "VISVAS 5% Subvention on prompt repayment",
    "schemes": [
      "NBCFDC General Loan",
      "New Swarnima Scheme",
      "PM Vishwakarma Artisan"
    ]
  },
  "divyangjan": {
    "id": "divyangjan",
    "name": "Persons with Disabilities (Divyangjan)",
    "corporation": "NDFDC (National Divyangjan Finance Corp)",
    "rate_concession": -2.5,
    "subsidy_pct": "40% Capital Subsidy",
    "subvention": "Special 4.5% Fixed Concessional Interest Rate",
    "schemes": [
      "NDFDC Divyangjan Swavalamban",
      "PwD Micro-Credit Support"
    ]
  },
  "women_shg": {
    "id": "women_shg",
    "name": "Women SHG / W-Enterprise",
    "corporation": "Ministry of Social Justice & NRLM",
    "rate_concession": -2,
    "subsidy_pct": "35% Back-Ended Capital Subsidy",
    "subvention": "Mahila Samriddhi Yojana (3% - 4% Interest)",
    "schemes": [
      "Stand-Up India Women",
      "Mahila Samriddhi",
      "Mission Shakti 0% Subvention"
    ]
  },
  "general": {
    "id": "general",
    "name": "General / Rural EWS",
    "corporation": "Standard RBI & MSME Concessional Channel",
    "rate_concession": 0,
    "subsidy_pct": "25% – 35% Margin / PMEGP Subsidy",
    "subvention": "PMEGP / PMFME Standard Concession",
    "schemes": [
      "PMEGP Tier Loan",
      "PMFME Agri-Food Scheme",
      "Mudra Tarun Scheme"
    ]
  }
};

const SEASONAL_CALENDAR_DATA = [
  {
    "month": "Jan",
    "name": "January",
    "demand": "Peak",
    "status": "green",
    "notes": "Winter harvest, wedding surge, high paneer/mushroom sales"
  },
  {
    "month": "Feb",
    "name": "February",
    "demand": "High",
    "status": "green",
    "notes": "Festive haat demand, high liquid milk & food processing turnover"
  },
  {
    "month": "Mar",
    "name": "March",
    "demand": "Steady",
    "status": "blue",
    "notes": "Pre-summer harvest, steady transit sales on highways"
  },
  {
    "month": "Apr",
    "name": "April",
    "demand": "High",
    "status": "green",
    "notes": "New Year / Baisakhi / Pana Sankranti demand for dairy & beverages"
  },
  {
    "month": "May",
    "name": "May",
    "demand": "Caution",
    "status": "amber",
    "notes": "Peak summer heat (42°C-44°C); ensure solar cooling aeration active"
  },
  {
    "month": "Jun",
    "name": "June",
    "demand": "Steady",
    "status": "blue",
    "notes": "Raja Festival & pre-monsoon construction material demand"
  },
  {
    "month": "Jul",
    "name": "July",
    "demand": "Caution",
    "status": "red",
    "notes": "Heavy monsoon rainfall; maintain elevated plinth storage"
  },
  {
    "month": "Aug",
    "name": "August",
    "demand": "Steady",
    "status": "blue",
    "notes": "Monsoon vegetable processing, mushroom indoor flushes"
  },
  {
    "month": "Sep",
    "name": "September",
    "demand": "High",
    "status": "green",
    "notes": "Pre-Puja retail stock replenishment, packaging box surges"
  },
  {
    "month": "Oct",
    "name": "October",
    "demand": "Peak",
    "status": "green",
    "notes": "Durga Puja & Dussehra festival boom; 3x sales volume"
  },
  {
    "month": "Nov",
    "name": "November",
    "demand": "Peak",
    "status": "green",
    "notes": "Diwali & wedding season; maximum dairy & sweet orders"
  },
  {
    "month": "Dec",
    "name": "December",
    "demand": "High",
    "status": "green",
    "notes": "Winter tourist transit on NH-16, picnic perishables demand"
  }
];

const LOCAL_BANK_SCA_DIRECTORY = {
  "Lead Bank Office": {
    "title": "Lead District Bank (LDB) Commercial Agriculture Cell",
    "branch": "State Bank of India / UCO Bank, District Circle",
    "role": "Single-window appraisal of DPR and sanction of 90% concessional credit",
    "contact": "Lead District Manager (LDM) Desk | 1800-425-3800",
    "collateral": "100% Collateral-Free under CGTMSE Cover up to ₹10 Lakh"
  },
  "SCA Channelizing Agency": {
    "title": "State Scheduled Castes & Backward Classes Development Finance Corp (SCA)",
    "branch": "District Collectorate Complex, LGD Office",
    "role": "Disbursal of 35%-40% capital margin subsidies and VISVAS interest subventions",
    "contact": "District Welfare Officer Desk | dwo.office@gov.in",
    "collateral": "Direct DBT credit into beneficiary loan account"
  },
  "District Industries Centre": {
    "title": "District Industries Centre (DIC) / MSME Development Facilitation Office",
    "branch": "District Industrial Estate Hub",
    "role": "Udyam Aadhaar registration, PMEGP portal sponsorship, subsidy claim",
    "contact": "General Manager (DIC) Desk | dic.helpline@gov.in",
    "collateral": "Zero inspection fee for micro-enterprises"
  },
  "Common Service Centre": {
    "title": "Gram Panchayat Mo Seva Kendra / CSC Pragati Portal",
    "branch": "Local Gram Panchayat Office",
    "role": "Online document upload, biometric e-KYC, and digital loan tracking",
    "contact": "Village Level Entrepreneur (VLE) Desk | csc.support@gov.in",
    "collateral": "Instant digital submission receipt"
  }
};

const AUDIO_SARTHI_INTENTS = {
  "hi": [
    {
      "q": "मेरे पास 30,000 रुपये हैं, मैं कौन सा व्यवसाय शुरू कर सकता हूँ?",
      "a": "30,000 रुपये मार्जिन में आप मशरूम उत्पादन, जैविक खाद या मिलेट कैफे शुरू कर सकते हैं। 3 लाख तक का 90% ऋण उपलब्ध है।"
    },
    {
      "q": "एससी/एसटी और ओबीसी के लिए क्या रियायतें हैं?",
      "a": "एनएसएफडीसी और एनबीसीएफडीसी के तहत ब्याज दर मात्र 4.5% से 5.5% है और 35% से 40% तक पूंजी सब्सिडी मिलती है।"
    },
    {
      "q": "क्या मुझे बैंक को कोई ज़मीन या गारंटी देनी होगी?",
      "a": "बिल्कुल नहीं! सीजीटीएमएसई के तहत 10 लाख तक के ऋण 100% बिना किसी ज़मीन या गारंटी के स्वीकृत होते हैं।"
    }
  ],
  "or": [
    {
      "q": "ମୋ ପାଖରେ ୩୦,୦୦୦ ଟଙ୍କା ଅଛି, ମୁଁ କେଉଁ ବ୍ୟବସାୟ କରିପାରିବି?",
      "a": "୩୦,୦୦୦ ଟଙ୍କା ମାର୍ଜିନରେ ଆପଣ ଛତୁ ଚାଷ, ଜୈବିକ ଖତ କିମ୍ବା ଡାଏରୀ ଆରମ୍ଭ କରିପାରିବେ | ଏଥିରେ ୯୦% ଋଣ ଉପଲବ୍ଧ |"
    },
    {
      "q": "ଏସସି/ଏସଟି ଓ ଓବିସି ବର୍ଗଙ୍କ ପାଇଁ କଣ ସୁବିଧା ଅଛି?",
      "a": "ଏହି ବର୍ଗଙ୍କ ପାଇଁ ୪% ରୁ ୫% ରିହାତି ସୁଧ ହାର ଏବଂ ୩୫% ରୁ ୪୦% ସରକାରୀ ସବସିଡି ମିଳିଥାଏ |"
    },
    {
      "q": "ବ୍ୟାଙ୍କ ଋଣ ପାଇଁ କୌଣସି ଜମି କିମ୍ବା ବନ୍ଧକ ଦରକାର କି?",
      "a": "ଜମାରୁ ନୁହେଁ | ସରକାରଙ୍କ ନିୟମ ଅନୁସାରେ ୧୦ ଲକ୍ଷ ପର୍ଯ୍ୟନ୍ତ କୌଣସି ବନ୍ଧକ ବିନା ଋଣ ମିଳିବ |"
    }
  ],
  "en": [
    {
      "q": "I have ₹30,000 margin. What business can I start?",
      "a": "With ₹30,000 margin, you can start Mushroom Cultivation, Vermicompost Packaging, or a Millet Cafe. Total loan of ₹2,70,000 is feasible."
    },
    {
      "q": "What special concessions apply for SC, ST and OBC categories?",
      "a": "Under MSJE corporations like NSFDC & NBCFDC, interest rates are lowered to 4.5%-5.5% with up to 40% back-ended capital subsidy."
    },
    {
      "q": "Do I need to give land or gold guarantee to the bank?",
      "a": "No collateral is required! Under CGTMSE, loans up to ₹10 Lakh are 100% guarantee-free with zero physical mortgage."
    }
  ]
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { 
    NATIONWIDE_REGIONS, 
    BUSINESSES_DATA, 
    TRANSLATIONS, 
    SPEECH_PROMPTS, 
    COMPETITOR_POIS,
    MSJE_CATEGORIES,
    SEASONAL_CALENDAR_DATA,
    LOCAL_BANK_SCA_DIRECTORY,
    AUDIO_SARTHI_INTENTS
  };
}
