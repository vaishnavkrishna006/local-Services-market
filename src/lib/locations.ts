export type CityData = {
  city: string;
  state: string;
  areas: string[];
};

export const indianCities: CityData[] = [
  {
    city: "Mumbai",
    state: "Maharashtra",
    areas: [
      "Andheri", "Bandra", "Borivali", "Churchgate", "Colaba",
      "Dadar", "Goregaon", "Juhu", "Kandivali", "Kurla",
      "Lower Parel", "Malad", "Mulund", "Navi Mumbai", "Powai",
      "Thane", "Versova", "Vikhroli", "Vile Parle", "Worli"
    ]
  },
  {
    city: "Delhi",
    state: "Delhi",
    areas: [
      "Connaught Place", "Dwarka", "Greater Kailash", "Hauz Khas",
      "Janakpuri", "Karol Bagh", "Lajpat Nagar", "Mayur Vihar",
      "Nehru Place", "Pitampura", "Rajouri Garden", "Rohini",
      "Saket", "South Extension", "Vasant Kunj", "Vasant Vihar",
      "Chandni Chowk", "Defence Colony", "Green Park", "Paharganj"
    ]
  },
  {
    city: "Bangalore",
    state: "Karnataka",
    areas: [
      "Koramangala", "Indiranagar", "Whitefield", "HSR Layout",
      "Jayanagar", "JP Nagar", "Electronic City", "Marathahalli",
      "BTM Layout", "Banashankari", "Malleshwaram", "Rajajinagar",
      "Hebbal", "Yelahanka", "Bannerghatta Road", "MG Road",
      "Brigade Road", "Sadashivanagar", "Basavanagudi", "Vijayanagar"
    ]
  },
  {
    city: "Hyderabad",
    state: "Telangana",
    areas: [
      "Banjara Hills", "Jubilee Hills", "Madhapur", "Gachibowli",
      "HITEC City", "Kondapur", "Kukatpally", "Secunderabad",
      "Ameerpet", "Begumpet", "Dilsukhnagar", "LB Nagar",
      "Manikonda", "Miyapur", "Narsingi", "SR Nagar",
      "Somajiguda", "Toli Chowki", "Uppal", "Sainikpuri"
    ]
  },
  {
    city: "Chennai",
    state: "Tamil Nadu",
    areas: [
      "T. Nagar", "Anna Nagar", "Adyar", "Velachery",
      "Mylapore", "Nungambakkam", "Besant Nagar", "Guindy",
      "Porur", "Chromepet", "Tambaram", "Sholinganallur",
      "OMR", "ECR", "Thiruvanmiyur", "Kodambakkam",
      "Egmore", "Kilpauk", "Royapettah", "Perambur"
    ]
  },
  {
    city: "Kolkata",
    state: "West Bengal",
    areas: [
      "Salt Lake", "New Town", "Park Street", "Ballygunge",
      "Howrah", "Jadavpur", "Gariahat", "Alipore",
      "Behala", "Dum Dum", "Garia", "Lake Town",
      "Rajarhat", "Sealdah", "Tollygunge", "Bhawanipur",
      "Esplanade", "Golf Green", "Kasba", "Kankurgachi"
    ]
  },
  {
    city: "Pune",
    state: "Maharashtra",
    areas: [
      "Koregaon Park", "Viman Nagar", "Kothrud", "Hinjewadi",
      "Baner", "Aundh", "Wakad", "Hadapsar",
      "Kharadi", "Magarpatta", "Shivajinagar", "Deccan",
      "Camp", "Pimpri-Chinchwad", "Kalyani Nagar", "Swargate",
      "Kondhwa", "NIBM", "Bavdhan", "Pashan"
    ]
  },
  {
    city: "Ahmedabad",
    state: "Gujarat",
    areas: [
      "SG Highway", "Prahlad Nagar", "Satellite", "Vastrapur",
      "Navrangpura", "CG Road", "Maninagar", "Bodakdev",
      "Thaltej", "Bopal", "Gota", "Chandkheda",
      "Ambawadi", "Ellis Bridge", "Paldi", "Naranpura",
      "Gurukul", "Shahibaug", "Ashram Road", "Vejalpur"
    ]
  },
  {
    city: "Jaipur",
    state: "Rajasthan",
    areas: [
      "C-Scheme", "Vaishali Nagar", "Malviya Nagar", "Mansarovar",
      "Tonk Road", "Raja Park", "Bapu Nagar", "Jagatpura",
      "Sodala", "MI Road", "Bani Park", "Ajmer Road",
      "Jhotwara", "Sanganer", "Vidhyadhar Nagar", "Sitapura",
      "Lal Kothi", "Tilak Nagar", "Shyam Nagar", "Durgapura"
    ]
  },
  {
    city: "Lucknow",
    state: "Uttar Pradesh",
    areas: [
      "Hazratganj", "Gomti Nagar", "Aliganj", "Indira Nagar",
      "Aminabad", "Charbagh", "Mahanagar", "Alambagh",
      "Vikas Nagar", "Jankipuram", "Aashiyana", "Rajajipuram",
      "Chinhat", "Cantonment", "Saharaganj", "Husainabad",
      "Chowk", "Kaiserbagh", "Nishatganj", "Daliganj"
    ]
  }
];

/** Get a flat list of all "Area, City" location strings */
export function getAllLocations(): string[] {
  return indianCities.flatMap((city) =>
    city.areas.map((area) => `${area}, ${city.city}`)
  );
}

/** Get city names only */
export function getCityNames(): string[] {
  return indianCities.map((c) => c.city);
}

/** Get areas for a specific city */
export function getAreasForCity(cityName: string): string[] {
  const city = indianCities.find(
    (c) => c.city.toLowerCase() === cityName.toLowerCase()
  );
  return city ? city.areas : [];
}
