// destinationData.js
const AllDestinations = [
  {
		"id" : 9,
		"name" : "Sariska",
		"state" : "Rajasthan"
	},
	{
		"id" : 10,
		"name" : "Mulshi",
		"state" : "Maharashtra"
	},
	{
		"id" : 11,
		"name" : "Saswad",
		"state" : "Maharashtra"
	},
	{
		"id" : 12,
		"name" : "Sultan Bathery",
		"state" : "Kerala"
	},
	{
		"id" : 13,
		"name" : "Kabini",
		"state" : "Karnataka"
	},
	{
		"id" : 14,
		"name" : "Lakkidi",
		"state" : "Kerala"
	},
	{
		"id" : 15,
		"name" : "Shendi",
		"state" : "Maharashtra"
	},
	{
		"id" : 16,
		"name" : "Alsisar",
		"state" : "Rajasthan"
	},
	{
		"id" : 17,
		"name" : "Kishanpur",
		"state" : "Rajasthan"
	},
	{
		"id" : 20,
		"name" : "Nathuakhan",
		"state" : "Uttarakhand"
	},
	{
		"id" : 25,
		"name" : "Mukteshwar",
		"state" : "Uttarakhand"
	},
	{
		"id" : 26,
		"name" : "Shitlakhet",
		"state" : "Uttarakhand"
	},
	{
		"id" : 30,
		"name" : "Panchgani",
		"state" : "Maharashtra"
	},
	{
		"id" : 31,
		"name" : "Alibaug",
		"state" : "Maharashtra"
	},
	{
		"id" : 35,
		"name" : "Nainital",
		"state" : "Uttarakhand"
	},
	{
		"id" : 36,
		"name" : "Karjat",
		"state" : "Maharashtra"
	},
	{
		"id" : 38,
		"name" : "Tadoba",
		"state" : "Maharashtra"
	},
	{
		"id" : 40,
		"name" : "Ramgarh",
		"state" : "Uttarakhand"
	},
	{
		"id" : 42,
		"name" : "Chiplun",
		"state" : "Maharashtra"
	},
	{
		"id" : 43,
		"name" : "Udaipur",
		"state" : "Rajasthan"
	},
	{
		"id" : 44,
		"name" : "Ratnagiri",
		"state" : "Maharashtra"
	},
	{
		"id" : 46,
		"name" : "Ganpatipule",
		"state" : "Maharashtra"
	},
	{
		"id" : 47,
		"name" : "Panchkula",
		"state" : "Haryana"
	},
	{
		"id" : 48,
		"name" : "Lonavala",
		"state" : "Maharashtra"
	},
	{
		"id" : 50,
		"name" : "Igatpuri",
		"state" : "Maharashtra"
	},
	{
		"id" : 51,
		"name" : "Koyna",
		"state" : "Maharashtra"
	},
	{
		"id" : 52,
		"name" : "Dapoli",
		"state" : "Maharashtra"
	},
	{
		"id" : 53,
		"name" : "Malshej Ghat",
		"state" : "Maharashtra"
	},
	{
		"id" : 54,
		"name" : "Nashik",
		"state" : "Maharashtra"
	},
	{
		"id" : 55,
		"name" : "Jaipur",
		"state" : "Rajasthan"
	},
	{
		"id" : 56,
		"name" : "Pune",
		"state" : "Maharashtra"
	},
	{
		"id" : 57,
		"name" : "Coorg",
		"state" : "Karnataka"
	},
	{
		"id" : 58,
		"name" : "Kovalam",
		"state" : "Kerala"
	},
	{
		"id" : 59,
		"name" : "Bandhavgarh National Park",
		"state" : "Madhya Pradesh"
	},
	{
		"id" : 63,
		"name" : "Yercaud",
		"state" : "Tamil Nadu"
	},
	{
		"id" : 66,
		"name" : "Ranthambore",
		"state" : "Rajasthan"
	},
	{
		"id" : 71,
		"name" : "Anjuna",
		"state" : "Goa"
	},
	{
		"id" : 75,
		"name" : "Canacona",
		"state" : "Goa"
	},
	{
		"id" : 87,
		"name" : "Bhopal",
		"state" : "Madhya Pradesh"
	},
	{
		"id" : 88,
		"name" : "Kanha National Park",
		"state" : "Madhya Pradesh"
	},
	{
		"id" : 90,
		"name" : "Jodhpur",
		"state" : "Rajasthan"
	},
	{
		"id" : 91,
		"name" : "Candolim",
		"state" : "Goa"
	},
	{
		"id" : 94,
		"name" : "Benaulim",
		"state" : "Goa"
	},
	{
		"id" : 96,
		"name" : "Curtorim",
		"state" : "Goa"
	},
	{
		"id" : 97,
		"name" : "Baga",
		"state" : "Goa"
	},
	{
		"id" : 98,
		"name" : "Pushkar",
		"state" : "Rajasthan"
	},
	{
		"id" : 99,
		"name" : "Panaji",
		"state" : "Goa"
	},
	{
		"id" : 100,
		"name" : "Vagator",
		"state" : "Goa"
	},
	{
		"id" : 101,
		"name" : "Morjim",
		"state" : "Goa"
	},
	{
		"id" : 103,
		"name" : "Kumbhalgarh",
		"state" : "Rajasthan"
	},
	{
		"id" : 104,
		"name" : "Pondicherry",
		"state" : "Puducherry"
	},
	{
		"id" : 106,
		"name" : "Kanha National Park",
		"state" : "Madhya Pradesh"
	},
	{
		"id" : 107,
		"name" : "Palghar",
		"state" : "Maharashtra"
	},
	{
		"id" : 108,
		"name" : "Panheli",
		"state" : "Maharashtra"
	},
	{
		"id" : 109,
		"name" : "Coonoor",
		"state" : "Tamil Nadu"
	},
	{
		"id" : 110,
		"name" : "Ooty",
		"state" : "Tamil Nadu"
	},
	{
		"id" : 116,
		"name" : "Kotagiri",
		"state" : "Tamil Nadu"
	},
	{
		"id" : 117,
		"name" : "Matheran",
		"state" : "Maharashtra"
	},
	{
		"id" : 118,
		"name" : "Virdi",
		"state" : "Maharashtra"
	},
	{
		"id" : 120,
		"name" : "Wayanad",
		"state" : "Kerala"
	},
	{
		"id" : 121,
		"name" : "Munnar",
		"state" : "Kerala"
	},
	{
		"id" : 124,
		"name" : "Kasauli",
		"state" : "Himachal Pradesh"
	},
	{
		"id" : 125,
		"name" : "Shimla",
		"state" : "Himachal Pradesh"
	},
	{
		"id" : 127,
		"name" : "Chorla Ghat",
		"state" : "Goa"
	},
	{
		"id" : 129,
		"name" : "Pangot",
		"state" : "Uttarakhand"
	},
	{
		"id" : 130,
		"name" : "Lansdowne",
		"state" : "Uttarakhand"
	},
	{
		"id" : 131,
		"name" : "Aruvankadu",
		"state" : "Tamil Nadu"
	},
	{
		"id" : 135,
		"name" : "Masinagudi",
		"state" : "Tamil Nadu"
	},
	{
		"id" : 136,
		"name" : "Mussoorie",
		"state" : "Uttarakhand"
	},
	{
		"id" : 137,
		"name" : "Kochi",
		"state" : "Kerala"
	},
	{
		"id" : 138,
		"name" : "Bhimtal",
		"state" : "Uttarakhand"
	},
	{
		"id" : 139,
		"name" : "Dharamshala",
		"state" : "Uttarakhand"
	},
	{
		"id" : 140,
		"name" : "Idukki",
		"state" : "Kerala"
	},
	{
		"id" : 141,
		"name" : "Kumarakom",
		"state" : "Kerala"
	},
	{
		"id" : 142,
		"name" : "Thekkady",
		"state" : "Kerala"
	},
	{
		"id" : 143,
		"name" : "Delhi Ncr",
		"state" : "Delhi"
	},
	{
		"id" : 144,
		"name" : "Mamalakandam",
		"state" : "Kerala"
	},
	{
		"id" : 145,
		"name" : "Alleppey",
		"state" : "Kerala"
	},
	{
		"id" : 146,
		"name" : "Hosur",
		"state" : "Tamil Nadu"
	},
	{
		"id" : 147,
		"name" : "Khadakwasla",
		"state" : "Maharashtra"
	},
	{
		"id" : 148,
		"name" : "Bandipur",
		"state" : "Karnataka"
	},
	{
		"id" : 157,
		"name" : "Karwar",
		"state" : "Karnataka"
	},
	{
		"id" : 160,
		"name" : "Mahabaleshwar",
		"state" : "Maharashtra"
	},
	{
		"id" : 162,
		"name" : "Tala",
		"state" : "Maharashtra"
	},
	{
		"id" : 163,
		"name" : "Sakleshpur",
		"state" : "Karnataka"
	},
	{
		"id" : 164,
		"name" : "Nagarhole",
		"state" : "Karnataka"
	},
	{
		"id" : 165,
		"name" : "Dhanaulti",
		"state" : "Uttarakhand"
	},
	{
		"id" : 166,
		"name" : "Chikmagalur",
		"state" : "Karnataka"
	},
	{
		"id" : 167,
		"name" : "Bengaluru",
		"state" : "Karnataka"
	},
	{
		"id" : 168,
		"name" : "Madikeri",
		"state" : "Karnataka"
	},
	{
		"id" : 170,
		"name" : "Mudigere",
		"state" : "Karnataka"
	},
	{
		"id" : 171,
		"name" : "Hassan",
		"state" : "Karnataka"
	},
	{
		"id" : 172,
		"name" : "Thodernad",
		"state" : "Kerala"
	},
	{
		"id" : 173,
		"name" : "Navi Mumbai",
		"state" : "Maharashtra"
	},
	{
		"id" : 174,
		"name" : "Allampura",
		"state" : "Karnataka"
	},
	{
		"id" : 175,
		"name" : "Khopoli",
		"state" : "Maharashtra"
	},
	{
		"id" : 176,
		"name" : "Pawna",
		"state" : "Maharashtra"
	},
	{
		"id" : 178,
		"name" : "Kamshet",
		"state" : "Maharashtra"
	},
	{
		"id" : 179,
		"name" : "Lavasa",
		"state" : "Maharashtra"
	},
	{
		"id" : 180,
		"name" : "Dehradun",
		"state" : "Uttarakhand"
	},
	{
		"id" : 181,
		"name" : "Shimoga",
		"state" : "Karnataka"
	},
	{
		"id" : 182,
		"name" : "Thane",
		"state" : "Maharashtra"
	},
	{
		"id" : 185,
		"name" : "Hampi",
		"state" : "Karnataka"
	},
	{
		"id" : 186,
		"name" : "Udupi",
		"state" : "Karnataka"
	},
	{
		"id" : 187,
		"name" : "Kodaikanal",
		"state" : "Tamil Nadu"
	},
	{
		"id" : 188,
		"name" : "Mysore",
		"state" : "Karnataka"
	},
	{
		"id" : 195,
		"name" : "Ramnagara",
		"state" : "Karnataka"
	},
	{
		"id" : 196,
		"name" : "Nandi Hills",
		"state" : "Karnataka"
	},
	{
		"id" : 197,
		"name" : "Dahanu",
		"state" : "Maharashtra"
	},
	{
		"id" : 198,
		"name" : "Shahapur",
		"state" : "Maharashtra"
	},
	{
		"id" : 200,
		"name" : "Mount Abu",
		"state" : "Rajasthan"
	},
	{
		"id" : 201,
		"name" : "Rajkot",
		"state" : "Gujarat"
	},
	{
		"id" : 202,
		"name" : "Kannur",
		"state" : "Kerala"
	},
	{
		"id" : 203,
		"name" : "Panshet",
		"state" : "Maharashtra"
	},
	{
		"id" : 204,
		"name" : "Ranakpur",
		"state" : "Rajasthan"
	},
	{
		"id" : 205,
		"name" : "Shivane",
		"state" : "Maharashtra"
	},
	{
		"id" : 206,
		"name" : "Neemrana",
		"state" : "Rajasthan"
	},
	{
		"id" : 207,
		"name" : "Coimbatore",
		"state" : "Tamil Nadu"
	},
	{
		"id" : 208,
		"name" : "Anaikatti",
		"state" : "Tamil Nadu"
	},
	{
		"id" : 209,
		"name" : "Anand",
		"state" : "Gujarat"
	},
	{
		"id" : 210,
		"name" : "Pali",
		"state" : "Rajasthan"
	},
	{
		"id" : 211,
		"name" : "Diu",
		"state" : "Gujarat"
	},
	{
		"id" : 212,
		"name" : "Badami",
		"state" : "Karnataka"
	},
	{
		"id" : 213,
		"name" : "Rishikesh",
		"state" : "Uttarakhand"
	},
	{
		"id" : 214,
		"name" : "Kushalnagar",
		"state" : "Karnataka"
	},
	{
		"id" : 215,
		"name" : "Kanakapura",
		"state" : "Karnataka"
	},
	{
		"id" : 216,
		"name" : "Doddaballapur",
		"state" : "Karnataka"
	},
	{
		"id" : 217,
		"name" : "Mumbai",
		"state" : "Maharashtra"
	},
	{
		"id" : 218,
		"name" : "Satara",
		"state" : "Maharashtra"
	},
	{
		"id" : 219,
		"name" : "Murud",
		"state" : "Maharashtra"
	},
	{
		"id" : 220,
		"name" : "Varca",
		"state" : "Goa"
	},
	{
		"id" : 221,
		"name" : "Jamariya",
		"state" : "Uttarakhand"
	},
	{
		"id" : 222,
		"name" : "Kashipur",
		"state" : "Uttarakhand"
	},
	{
		"id" : 223,
		"name" : "Murbad",
		"state" : "Maharashtra"
	},
	{
		"id" : 224,
		"name" : "Kashid",
		"state" : "Maharashtra"
	},
	{
		"id" : 225,
		"name" : "Nandgaon",
		"state" : "Maharashtra"
	},
	{
		"id" : 226,
		"name" : "Guhagar",
		"state" : "Maharashtra"
	},
	{
		"id" : 227,
		"name" : "Ahmedabad",
		"state" : "Gujarat"
	}
  ];
  
  export default AllDestinations;
  