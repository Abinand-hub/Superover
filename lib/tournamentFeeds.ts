import Match from '@/models/Match';
import { getPlayerImage } from './playerImageRegistry';

export interface TeamPreset {
  name: string;
  code: string;
  logoUrl?: string;
  country: string;
  category: 'DOMESTIC_IN' | 'GLOBAL_LEAGUE' | 'INTERNATIONAL' | 'EUROPEAN';
  players: Array<{
    name: string;
    role: 'BAT' | 'BOWL' | 'AR' | 'WK';
    careerStatHighlight?: string;
  }>;
}

export const FANCODE_ALL_TEAMS: Record<string, TeamPreset> = {
  // --- DEHRADUN T20 LEAGUE 2026 ---
  DOIWALA_KINGS: {
    name: 'Doiwala Kings',
    code: 'DK',
    logoUrl: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=160&auto=format&fit=crop&q=80',
    country: 'India',
    category: 'DOMESTIC_IN',
    players: [
      { name: 'Vaibhav Bhatt', role: 'WK', careerStatHighlight: 'SR: 168.5 • Captain & Keeper' },
      { name: 'Shashank Rawat', role: 'BAT', careerStatHighlight: 'Avg: 41.2 • 350+ Runs' },
      { name: 'Saurabh Rawat', role: 'BAT', careerStatHighlight: 'Power Hitter • SR: 175.0' },
      { name: 'Vijay Sharma', role: 'AR', careerStatHighlight: 'Avg: 29.5 • 14 Wkts' },
      { name: 'Mayank Mishra', role: 'AR', careerStatHighlight: 'Left-arm Spin • Econ: 6.5' },
      { name: 'Ankit Negi', role: 'BOWL', careerStatHighlight: 'Fast Bowler • Best: 4/18' },
      { name: 'Deepak Joshi', role: 'BOWL', careerStatHighlight: 'Death Overs • Econ: 7.2' },
      { name: 'Pankaj Joshi', role: 'BAT', careerStatHighlight: 'Middle Order Anchor' },
      { name: 'Harshit Verma', role: 'BOWL', careerStatHighlight: 'Best: 3/21' },
      { name: 'Rohit Danu', role: 'AR', careerStatHighlight: 'SR: 155.0' },
      { name: 'Naveen Kumar', role: 'BOWL', careerStatHighlight: 'Econ: 6.8' },
    ]
  },
  VIKASNAGAR_DHAMAKA: {
    name: 'Vikasnagar Dhamaka',
    code: 'VD',
    logoUrl: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=160&auto=format&fit=crop&q=80',
    country: 'India',
    category: 'DOMESTIC_IN',
    players: [
      { name: 'Rohit Rana', role: 'BAT', careerStatHighlight: 'Aggressive Opener • SR: 182.0' },
      { name: 'Aryan Sharma', role: 'WK', careerStatHighlight: 'Avg: 38.0 • 12 Catches' },
      { name: 'Priyanshu Khanduri', role: 'BAT', careerStatHighlight: 'Ranji Trophy Batter' },
      { name: 'Nitin Bisht', role: 'AR', careerStatHighlight: 'SR: 190.0 • 16 Wkts' },
      { name: 'Himanshu Soni', role: 'AR', careerStatHighlight: 'All-Round MVP' },
      { name: 'Sunny Kashyap', role: 'BOWL', careerStatHighlight: 'Leg Spin • Best: 4/14' },
      { name: 'Devendra Bora', role: 'BOWL', careerStatHighlight: 'Pace Spearhead' },
      { name: 'Aman Negi', role: 'BOWL', careerStatHighlight: 'Econ: 7.1' },
      { name: 'Shivam Pundir', role: 'BAT', careerStatHighlight: 'Avg: 32.5' },
      { name: 'Sameer Rawat', role: 'AR', careerStatHighlight: 'Econ: 6.9' },
      { name: 'Gaurav Joshi', role: 'BOWL', careerStatHighlight: 'Best: 3/16' },
    ]
  },
  MUSSOORIE_THUNDER: {
    name: 'Mussoorie Thunder',
    code: 'MT',
    logoUrl: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=160&auto=format&fit=crop&q=80',
    country: 'India',
    category: 'DOMESTIC_IN',
    players: [
      { name: 'Kunal Chandela', role: 'BAT', careerStatHighlight: 'Uttarakhand Pro • Avg: 44.0' },
      { name: 'Avneesh Sudha', role: 'AR', careerStatHighlight: 'SR: 180.0 • 18 Wkts' },
      { name: 'Akhil Rawat', role: 'WK', careerStatHighlight: 'Keeper Batsman • SR: 160.0' },
      { name: 'Agrim Tiwari', role: 'BOWL', careerStatHighlight: 'Left-arm Pacer • Best: 5/15' },
      { name: 'Prashant Bhati', role: 'BOWL', careerStatHighlight: 'Econ: 6.6' },
      { name: 'Yuvraj Chaudhary', role: 'AR', careerStatHighlight: 'SR: 175.0' },
      { name: 'Arya Sethi', role: 'BAT', careerStatHighlight: 'Opener • Avg: 36.0' },
      { name: 'Himanshu Bisht', role: 'BOWL', careerStatHighlight: 'Off-spinner • 15 Wkts' },
      { name: 'Abhay Negi', role: 'AR', careerStatHighlight: 'Fast Bowling All-Rounder' },
      { name: 'Satyam Baliyan', role: 'BOWL', careerStatHighlight: 'Best: 3/20' },
      { name: 'Virendra Singh', role: 'BAT', careerStatHighlight: 'Finisher • SR: 195.0' },
    ]
  },
  SELAQUI_STRIKERS: {
    name: 'Selaqui Strikers',
    code: 'SS',
    logoUrl: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=160&auto=format&fit=crop&q=80',
    country: 'India',
    category: 'DOMESTIC_IN',
    players: [
      { name: 'Tanush Gusain', role: 'AR', careerStatHighlight: 'Captain • SR: 172.0 • 15 Wkts' },
      { name: 'Jagmohan Nagarkoti', role: 'BOWL', careerStatHighlight: 'Express Pace • Best: 4/19' },
      { name: 'Deepesh Nainwal', role: 'WK', careerStatHighlight: 'Avg: 35.0' },
      { name: 'Mukesh Sharma', role: 'BAT', careerStatHighlight: 'SR: 165.0' },
      { name: 'Gaurav Jathar', role: 'AR', careerStatHighlight: 'Econ: 7.0 • 12 Wkts' },
      { name: 'Pawan Suyal', role: 'BOWL', careerStatHighlight: 'Former IPL Pacer' },
      { name: 'Sanjay Rawat', role: 'BAT', careerStatHighlight: 'Middle Order Power' },
      { name: 'Nikhil Pundir', role: 'BOWL', careerStatHighlight: 'Best: 3/15' },
      { name: 'Karanvir Kaushal', role: 'BAT', careerStatHighlight: 'List-A Double Century Legend' },
      { name: 'Rajan Kumar', role: 'BOWL', careerStatHighlight: 'Left-arm Fast' },
      { name: 'Mohit Mittan', role: 'AR', careerStatHighlight: 'SR: 158.0' },
    ]
  },
  RISHIKESH_DRAGONS: {
    name: 'Rishikesh Dragons',
    code: 'RD',
    logoUrl: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=160&auto=format&fit=crop&q=80',
    country: 'India',
    category: 'DOMESTIC_IN',
    players: [
      { name: 'Kamal Singh', role: 'BAT', careerStatHighlight: 'Top Order Solid • Avg: 39.0' },
      { name: 'Swapnil Singh', role: 'AR', careerStatHighlight: 'IPL Star • Spin All-Rounder' },
      { name: 'Akash Madhwal', role: 'BOWL', careerStatHighlight: 'IPL 5/5 Legend • Yorker King' },
      { name: 'Vaibhav Panwar', role: 'WK', careerStatHighlight: 'SR: 170.0' },
      { name: 'Vijay Jethi', role: 'BAT', careerStatHighlight: 'SR: 162.0' },
      { name: 'Mayank Rawat', role: 'AR', careerStatHighlight: 'Hard Hitter • SR: 188.0' },
      { name: 'Sunny Rana', role: 'AR', careerStatHighlight: 'Econ: 6.8 • 14 Wkts' },
      { name: 'Harish Raturi', role: 'BOWL', careerStatHighlight: 'Best: 4/22' },
      { name: 'Kuldeep Singh', role: 'BOWL', careerStatHighlight: 'Econ: 7.2' },
      { name: 'Shubham Rana', role: 'BAT', careerStatHighlight: 'Avg: 31.0' },
      { name: 'Pradeep Chamoli', role: 'BOWL', careerStatHighlight: 'Death Over Bowler' },
    ]
  },

  // --- SHER-E-PUNJAB T20 2026 ---
  JALANDHAR_WARRIORS: {
    name: 'Jalandhar Warriors',
    code: 'JW',
    logoUrl: 'https://flagcdn.com/w160/in.png',
    country: 'India',
    category: 'DOMESTIC_IN',
    players: [
      { name: 'Mandeep Singh', role: 'BAT', careerStatHighlight: 'Punjab Captain • IPL Star' },
      { name: 'Siddarth Kaul', role: 'BOWL', careerStatHighlight: 'India International • Knuckleball Specialist' },
      { name: 'Prabhsimran Singh', role: 'WK', careerStatHighlight: 'Punjab Kings Opener • SR: 195.0' },
      { name: 'Sanvir Singh', role: 'AR', careerStatHighlight: 'Sunrisers Hyderabad Finisher' },
      { name: 'Gurjit Singh', role: 'BOWL', careerStatHighlight: 'Best: 4/16' },
      { name: 'Harpreet Singh', role: 'BAT', careerStatHighlight: 'Avg: 37.0' },
      { name: 'Sohrab Dhaliwal', role: 'AR', careerStatHighlight: 'SR: 178.0 • 12 Wkts' },
      { name: 'Ayush Goyal', role: 'BOWL', careerStatHighlight: 'Econ: 6.9' },
      { name: 'Krish Bhagat', role: 'BOWL', careerStatHighlight: 'Best: 3/18' },
      { name: 'Sahil Sharma', role: 'WK', careerStatHighlight: 'Safe Keeper' },
      { name: 'Arjun Verma', role: 'BAT', careerStatHighlight: 'SR: 155.0' },
    ]
  },
  FAZILKA_FALCONS: {
    name: 'Fazilka Falcons',
    code: 'FF',
    logoUrl: 'https://flagcdn.com/w160/in.png',
    country: 'India',
    category: 'DOMESTIC_IN',
    players: [
      { name: 'Anmolpreet Singh', role: 'BAT', careerStatHighlight: 'SRH / Mumbai Indians Batter' },
      { name: 'Gurnoor Brar', role: 'BOWL', careerStatHighlight: 'Gujarat Titans Express Pacer' },
      { name: 'Gurkeerat Singh Mann', role: 'AR', careerStatHighlight: 'Former India International' },
      { name: 'Salil Arora', role: 'WK', careerStatHighlight: 'Aggressive WK • SR: 174.0' },
      { name: 'Manish Sheoran', role: 'BOWL', careerStatHighlight: 'Best: 4/20' },
      { name: 'Jass Inder Singh', role: 'AR', careerStatHighlight: 'SR: 165.0 • 10 Wkts' },
      { name: 'Karanvir Singh', role: 'BAT', careerStatHighlight: 'Avg: 33.0' },
      { name: 'Deepak Choudhary', role: 'BOWL', careerStatHighlight: 'Econ: 7.1' },
      { name: 'Harjas Tandon', role: 'BAT', careerStatHighlight: 'Solid Anchor' },
      { name: 'Abhay Chaudhary', role: 'AR', careerStatHighlight: 'Econ: 7.4' },
      { name: 'Raghav Goyal', role: 'BOWL', careerStatHighlight: 'Mystery Spin' },
    ]
  },
  AMRITSAR_AVIATORS: {
    name: 'Amritsar Aviators',
    code: 'AA',
    logoUrl: 'https://flagcdn.com/w160/in.png',
    country: 'India',
    category: 'DOMESTIC_IN',
    players: [
      { name: 'Abhishek Sharma', role: 'BAT', careerStatHighlight: 'India Star • Record 16-ball 50' },
      { name: 'Ramandeep Singh', role: 'AR', careerStatHighlight: 'KKR & Team India All-Rounder' },
      { name: 'Mayank Markande', role: 'BOWL', careerStatHighlight: 'IPL Leg Spinner • Best: 4/23' },
      { name: 'Gurnoor Singh', role: 'WK', careerStatHighlight: 'SR: 160.0' },
      { name: 'Pukhraj Mann', role: 'BAT', careerStatHighlight: 'Avg: 36.0' },
      { name: 'Baltej Singh', role: 'BOWL', careerStatHighlight: 'Punjab Pace Leader' },
      { name: 'Emanjot Singh', role: 'AR', careerStatHighlight: 'Econ: 7.0' },
      { name: 'Kunal Malhotra', role: 'BAT', careerStatHighlight: 'SR: 158.0' },
      { name: 'Harshit Takkar', role: 'BOWL', careerStatHighlight: 'Best: 3/14' },
      { name: 'Varun Kumar', role: 'BOWL', careerStatHighlight: 'Econ: 6.8' },
      { name: 'Fatehveer Singh', role: 'AR', careerStatHighlight: 'SR: 165.0' },
    ]
  },
  MOHALI_LEGENDS: {
    name: 'Mohali Legends',
    code: 'ML',
    logoUrl: 'https://flagcdn.com/w160/in.png',
    country: 'India',
    category: 'DOMESTIC_IN',
    players: [
      { name: 'Nehal Wadhera', role: 'BAT', careerStatHighlight: 'Mumbai Indians Power Batter' },
      { name: 'Harpreet Brar', role: 'AR', careerStatHighlight: 'Punjab Kings Spin King' },
      { name: 'Arshdeep Singh', role: 'BOWL', careerStatHighlight: 'T20 World Cup Winner • India Star' },
      { name: 'Sanvir Randhawa', role: 'WK', careerStatHighlight: 'Avg: 34.0' },
      { name: 'Jashanpreet Singh', role: 'BOWL', careerStatHighlight: 'Best: 4/18' },
      { name: 'Uday Saharan', role: 'BAT', careerStatHighlight: 'India U19 World Cup Captain' },
      { name: 'Aryaman Singh', role: 'BAT', careerStatHighlight: 'SR: 162.0' },
      { name: 'Sukhdeep Bajwa', role: 'AR', careerStatHighlight: 'Econ: 7.2' },
      { name: 'Gurwinder Singh', role: 'BOWL', careerStatHighlight: 'Best: 3/22' },
      { name: 'Raghav Dhawan', role: 'AR', careerStatHighlight: 'SR: 154.0' },
      { name: 'Simranjeet Singh', role: 'BOWL', careerStatHighlight: 'Econ: 7.5' },
    ]
  },

  // --- DELHI PREMIER LEAGUE (DPL) 2026 ---
  EAST_DELHI_RIDERS: {
    name: 'East Delhi Riders',
    code: 'EDR',
    logoUrl: 'https://flagcdn.com/w160/in.png',
    country: 'India',
    category: 'DOMESTIC_IN',
    players: [
      { name: 'Anuj Rawat', role: 'WK', careerStatHighlight: 'RCB Wicketkeeper Batter' },
      { name: 'Himmat Singh', role: 'BAT', careerStatHighlight: 'Delhi Ranji Captain' },
      { name: 'Simarjeet Singh', role: 'BOWL', careerStatHighlight: 'CSK Express Pacer' },
      { name: 'Harsh Tyagi', role: 'AR', careerStatHighlight: 'Spin All-Rounder' },
      { name: 'Sujal Singh', role: 'BAT', careerStatHighlight: 'SR: 175.0' },
      { name: 'Rounak Waghela', role: 'AR', careerStatHighlight: 'Econ: 6.7' },
      { name: 'Mayank Rawat', role: 'AR', careerStatHighlight: 'SR: 185.0 • 15 Wkts' },
      { name: 'Bhagwan Singh', role: 'BOWL', careerStatHighlight: 'Best: 4/15' },
      { name: 'Pranav Pant', role: 'BAT', careerStatHighlight: 'Avg: 38.0' },
      { name: 'Navdeep Tomar', role: 'BOWL', careerStatHighlight: 'Econ: 7.0' },
      { name: 'Hardik Sharma', role: 'BOWL', careerStatHighlight: 'Best: 3/19' },
    ]
  },
  SOUTH_DELHI_SUPERSTARS: {
    name: 'South Delhi Superstars',
    code: 'SDS',
    logoUrl: 'https://flagcdn.com/w160/in.png',
    country: 'India',
    category: 'DOMESTIC_IN',
    players: [
      { name: 'Ayush Badoni', role: 'AR', careerStatHighlight: 'LSG Star • Record 19-ball 165 Team' },
      { name: 'Priyansh Arya', role: 'BAT', careerStatHighlight: 'Record 6 Sixes in an Over • 120 Runs' },
      { name: 'Kuldip Yadav', role: 'BOWL', careerStatHighlight: 'Rajasthan Royals Left-Arm Pace' },
      { name: 'Tejaswi Dahiya', role: 'WK', careerStatHighlight: 'SR: 170.0' },
      { name: 'Dhruv Singh', role: 'BAT', careerStatHighlight: 'Avg: 35.0' },
      { name: 'Digvesh Rathi', role: 'BOWL', careerStatHighlight: 'Best: 4/18' },
      { name: 'Sumit Mathur', role: 'AR', careerStatHighlight: 'SR: 160.0 • 12 Wkts' },
      { name: 'Anindo Naharay', role: 'BOWL', careerStatHighlight: 'Econ: 6.8' },
      { name: 'Shubham Dubey', role: 'BAT', careerStatHighlight: 'Finisher' },
      { name: 'Lakshay Sehrawat', role: 'AR', careerStatHighlight: 'Econ: 7.4' },
      { name: 'Aryan Lakra', role: 'BOWL', careerStatHighlight: 'Best: 3/12' },
    ]
  },

  // --- CARIBBEAN PREMIER LEAGUE (CPL) 2026 ---
  TRINBAGO_KNIGHT_RIDERS: {
    name: 'Trinbago Knight Riders',
    code: 'TKR',
    logoUrl: 'https://flagcdn.com/w160/tt.png',
    country: 'Trinidad and Tobago',
    category: 'GLOBAL_LEAGUE',
    players: [
      { name: 'Nicholas Pooran', role: 'WK', careerStatHighlight: 'World No.1 T20 Six Hitter' },
      { name: 'Kieron Pollard', role: 'AR', careerStatHighlight: 'T20 Legend & Captain • 600+ T20s' },
      { name: 'Andre Russell', role: 'AR', careerStatHighlight: 'Highest T20 Strike Rate in History' },
      { name: 'Sunil Narine', role: 'AR', careerStatHighlight: 'IPL MVP • Mystery Spin & Power Opener' },
      { name: 'Akeal Hosein', role: 'BOWL', careerStatHighlight: 'ICC Top Ranked T20 Bowler' },
      { name: 'Tim David', role: 'BAT', careerStatHighlight: 'Australia Power Finisher • SR: 190.0' },
      { name: 'Waqar Salamkheil', role: 'BOWL', careerStatHighlight: 'Left-Arm Wrist Spinner' },
      { name: 'Jayden Seales', role: 'BOWL', careerStatHighlight: 'West Indies Express Pacer' },
      { name: 'Shaqkere Parris', role: 'BAT', careerStatHighlight: 'Emerging CPL Star' },
      { name: 'Terrance Hinds', role: 'AR', careerStatHighlight: 'Death Over Hitter' },
      { name: 'Ali Khan', role: 'BOWL', careerStatHighlight: 'USA Yorker Machine' },
    ]
  },
  GUYANA_AMAZON_WARRIORS: {
    name: 'Guyana Amazon Warriors',
    code: 'GAW',
    logoUrl: 'https://flagcdn.com/w160/gy.png',
    country: 'Guyana',
    category: 'GLOBAL_LEAGUE',
    players: [
      { name: 'Shimron Hetmyer', role: 'BAT', careerStatHighlight: 'CPL Champion • SR: 178.0' },
      { name: 'Imran Tahir', role: 'BOWL', careerStatHighlight: 'Legendary Leg Spinner & Captain' },
      { name: 'Shai Hope', role: 'WK', careerStatHighlight: 'West Indies ODI Captain' },
      { name: 'Romario Shepherd', role: 'AR', careerStatHighlight: 'Mumbai Indians Power Finisher' },
      { name: 'Gudakesh Motie', role: 'BOWL', careerStatHighlight: 'ICC T20 Player of the Month' },
      { name: 'Moeen Ali', role: 'AR', careerStatHighlight: 'England World Cup Winner' },
      { name: 'Dwaine Pretorius', role: 'AR', careerStatHighlight: 'South Africa Death Specialist' },
      { name: 'Rahmanullah Gurbaz', role: 'WK', careerStatHighlight: 'Afghanistan Opener • SR: 185.0' },
      { name: 'Keemo Paul', role: 'AR', careerStatHighlight: 'All-Round Performer' },
      { name: 'Junior Sinclair', role: 'BOWL', careerStatHighlight: 'Off-Spin Mystery' },
      { name: 'Shamar Joseph', role: 'BOWL', careerStatHighlight: 'Gabba Test Hero • 150km/h' },
    ]
  },

  // --- INTERNATIONAL TEAMS ---
  AUSTRALIA: {
    name: 'Australia',
    code: 'AUS',
    logoUrl: 'https://flagcdn.com/w160/au.png',
    country: 'Australia',
    category: 'INTERNATIONAL',
    players: [
      { name: 'Mitchell Marsh', role: 'AR', careerStatHighlight: 'Captain • World Cup Winner' },
      { name: 'Travis Head', role: 'BAT', careerStatHighlight: 'World No.1 T20I Batter • SR: 200+' },
      { name: 'Glenn Maxwell', role: 'AR', careerStatHighlight: 'Big Show • 4 T20I Centuries' },
      { name: 'Marcus Stoinis', role: 'AR', careerStatHighlight: 'Power Finisher • 100+ T20 Wkts' },
      { name: 'Josh Inglis', role: 'WK', careerStatHighlight: '360 Batter • SR: 180.0' },
      { name: 'Tim David', role: 'BAT', careerStatHighlight: 'Death Overs Specialist' },
      { name: 'Adam Zampa', role: 'BOWL', careerStatHighlight: 'Leading T20I Wicket Taker' },
      { name: 'Josh Hazlewood', role: 'BOWL', careerStatHighlight: 'World No.1 T20I Bowler' },
      { name: 'Nathan Ellis', role: 'BOWL', careerStatHighlight: 'Hat-trick Specialist' },
      { name: 'Spencer Johnson', role: 'BOWL', careerStatHighlight: 'Left-Arm Express 148km/h' },
      { name: 'Sean Abbott', role: 'AR', careerStatHighlight: 'Econ: 7.4' },
    ]
  },
  ZIMBABWE: {
    name: 'Zimbabwe',
    code: 'ZIM',
    logoUrl: 'https://flagcdn.com/w160/zw.png',
    country: 'Zimbabwe',
    category: 'INTERNATIONAL',
    players: [
      { name: 'Sikandar Raza', role: 'AR', careerStatHighlight: 'Captain • World Ranked All-Rounder' },
      { name: 'Craig Ervine', role: 'BAT', careerStatHighlight: 'Experienced Anchor' },
      { name: 'Brian Bennett', role: 'BAT', careerStatHighlight: 'Young Opener • SR: 170.0' },
      { name: 'Clive Madande', role: 'WK', careerStatHighlight: 'Safe Keeper & Finisher' },
      { name: 'Ryan Burl', role: 'AR', careerStatHighlight: 'Leg Spin & 6 Sixes Star' },
      { name: 'Blessing Muzarabani', role: 'BOWL', careerStatHighlight: 'IPL & PSL Pacer • Height & Bounce' },
      { name: 'Richard Ngarava', role: 'BOWL', careerStatHighlight: 'ICC Top 10 T20 Bowler' },
      { name: 'Wellington Masakadza', role: 'BOWL', careerStatHighlight: 'Left-Arm Spin' },
      { name: 'Faraz Akram', role: 'AR', careerStatHighlight: 'Medium Pacer' },
      { name: 'Dion Myers', role: 'BAT', careerStatHighlight: 'Avg: 32.0' },
      { name: 'Luke Jongwe', role: 'AR', careerStatHighlight: 'Death Overs Specialist' },
    ]
  },
  INDIA: {
    name: 'India',
    code: 'IND',
    logoUrl: 'https://flagcdn.com/w160/in.png',
    country: 'India',
    category: 'INTERNATIONAL',
    players: [
      { name: 'Suryakumar Yadav', role: 'BAT', careerStatHighlight: 'Captain • World T20 Legend' },
      { name: 'Hardik Pandya', role: 'AR', careerStatHighlight: 'World Cup Winner • Premier All-Rounder' },
      { name: 'Jasprit Bumrah', role: 'BOWL', careerStatHighlight: 'Best Bowler on Earth • Econ: 4.8' },
      { name: 'Axar Patel', role: 'AR', careerStatHighlight: 'World Cup Final Hero' },
      { name: 'Arshdeep Singh', role: 'BOWL', careerStatHighlight: 'T20 World Cup Leading Wicket Taker' },
      { name: 'Rinku Singh', role: 'BAT', careerStatHighlight: 'Elite Finisher • Avg: 60+ in T20I' },
      { name: 'Sanju Samson', role: 'WK', careerStatHighlight: 'Consecutive T20I Centurion' },
      { name: 'Kuldeep Yadav', role: 'BOWL', careerStatHighlight: 'Left-Arm Chinaman Mystery' },
      { name: 'Shivam Dube', role: 'AR', careerStatHighlight: 'Spin Destroyer' },
      { name: 'Varun Chakaravarthy', role: 'BOWL', careerStatHighlight: 'Mystery Spin • 5/17 vs SA' },
      { name: 'Abhishek Sharma', role: 'BAT', careerStatHighlight: 'Power Opener • SR: 195.0' },
    ]
  },
  AFGHANISTAN: {
    name: 'Afghanistan',
    code: 'AFG',
    logoUrl: 'https://flagcdn.com/w160/af.png',
    country: 'Afghanistan',
    category: 'INTERNATIONAL',
    players: [
      { name: 'Rashid Khan', role: 'AR', careerStatHighlight: 'Captain • World Greatest T20 Spinner' },
      { name: 'Rahmanullah Gurbaz', role: 'WK', careerStatHighlight: 'T20 World Cup Top Run Scorer' },
      { name: 'Ibrahim Zadran', role: 'BAT', careerStatHighlight: 'Class Opener • Avg: 42.0' },
      { name: 'Mohammad Nabi', role: 'AR', careerStatHighlight: 'The President • 150+ T20Is' },
      { name: 'Fazalhaq Farooqi', role: 'BOWL', careerStatHighlight: 'Leading T20 WC Wicket Taker' },
      { name: 'Noor Ahmad', role: 'BOWL', careerStatHighlight: 'Gujarat Titans Mystery Spin' },
      { name: 'Azmatullah Omarzai', role: 'AR', careerStatHighlight: 'Premier Fast Bowling All-Rounder' },
      { name: 'Gulbadin Naib', role: 'AR', careerStatHighlight: 'Power Finisher' },
      { name: 'Naveen-ul-Haq', role: 'BOWL', careerStatHighlight: 'Slower Ball Expert' },
      { name: 'Karim Janat', role: 'AR', careerStatHighlight: 'SR: 160.0' },
      { name: 'Mohammad Ishaq', role: 'WK', careerStatHighlight: 'Young Talent' },
    ]
  },
  NEPAL: {
    name: 'Nepal',
    code: 'NEP',
    logoUrl: 'https://flagcdn.com/w160/np.png',
    country: 'Nepal',
    category: 'INTERNATIONAL',
    players: [
      { name: 'Rohit Paudel', role: 'BAT', careerStatHighlight: 'Captain • Nepal Superstar' },
      { name: 'Dipendra Singh Airee', role: 'AR', careerStatHighlight: 'World Record 9-ball 50 & 6 Sixes' },
      { name: 'Kushal Bhurtel', role: 'BAT', careerStatHighlight: 'Opener • SR: 175.0' },
      { name: 'Aasif Sheikh', role: 'WK', careerStatHighlight: 'ICC Spirit of Cricket Awardee' },
      { name: 'Sompal Kami', role: 'AR', careerStatHighlight: 'Pace Legend • 100+ Wkts' },
      { name: 'Sandeep Lamichhane', role: 'BOWL', careerStatHighlight: 'Global Franchise Leg Spinner' },
      { name: 'Karan KC', role: 'AR', careerStatHighlight: 'Clutch All-Rounder' },
      { name: 'Kushal Malla', role: 'BAT', careerStatHighlight: 'Record Fastest T20I Century' },
      { name: 'Lalit Rajbanshi', role: 'BOWL', careerStatHighlight: 'Left-Arm Spin • Econ: 6.2' },
      { name: 'Gulshan Jha', role: 'AR', careerStatHighlight: 'Young Power Hitter' },
      { name: 'Abinash Bohara', role: 'BOWL', careerStatHighlight: 'Death Overs Specialist' },
    ]
  },
  UAE: {
    name: 'UAE',
    code: 'UAE',
    logoUrl: 'https://flagcdn.com/w160/ae.png',
    country: 'UAE',
    category: 'INTERNATIONAL',
    players: [
      { name: 'Muhammad Waseem', role: 'BAT', careerStatHighlight: 'Captain • World Top 5 T20 Six Hitter' },
      { name: 'Asif Khan', role: 'BAT', careerStatHighlight: 'Fastest Associate Century' },
      { name: 'Aayan Afzal Khan', role: 'AR', careerStatHighlight: 'Emerging Asia Cup Star' },
      { name: 'Vriitya Aravind', role: 'WK', careerStatHighlight: 'Avg: 38.0 • Reliable Keeper' },
      { name: 'Junaid Siddique', role: 'BOWL', careerStatHighlight: 'Express Pace • Best: 4/12' },
      { name: 'Basil Hameed', role: 'AR', careerStatHighlight: 'Off-Spin All-Rounder' },
      { name: 'Ali Naseer', role: 'AR', careerStatHighlight: 'SR: 170.0 • 15 Wkts' },
      { name: 'Zahoor Khan', role: 'BOWL', careerStatHighlight: 'Slower Yorker Specialist' },
      { name: 'Alishan Sharafu', role: 'BAT', careerStatHighlight: 'Top Order Batter' },
      { name: 'Muhammad Jawadullah', role: 'BOWL', careerStatHighlight: 'Left-Arm Fast' },
      { name: 'Sanchit Sharma', role: 'BOWL', careerStatHighlight: 'Econ: 6.8' },
    ]
  },

  // --- EUROPEAN TEAMS ---
  MADRID: {
    name: 'Madrid Cricket Club',
    code: 'MAD',
    logoUrl: 'https://flagcdn.com/w160/es.png',
    country: 'Spain',
    category: 'EUROPEAN',
    players: [
      { name: 'Galileo Finlayson-Ble', role: 'AR', careerStatHighlight: 'SR: 185.0 • 12 Wkts' },
      { name: 'Marcus Harvey', role: 'WK', careerStatHighlight: 'Avg: 38.5 • 450+ Runs' },
      { name: 'Daniel Walker', role: 'BAT', careerStatHighlight: 'SR: 165.2' },
      { name: 'Adam Langhans', role: 'BAT', careerStatHighlight: 'High Score: 88*' },
      { name: 'Jon Woodward', role: 'BAT', careerStatHighlight: 'SR: 145.0' },
      { name: 'Sumon Hossain', role: 'AR', careerStatHighlight: 'Avg: 28.0 • 15 Wkts' },
      { name: 'Lewis Clark', role: 'AR', careerStatHighlight: 'Econ: 7.2' },
      { name: 'Raheel Shafique', role: 'BOWL', careerStatHighlight: 'Best: 4/12' },
      { name: 'James Bentley', role: 'BOWL', careerStatHighlight: 'Econ: 6.8' },
      { name: 'Sean Stevenson', role: 'BOWL', careerStatHighlight: '18 Wkts in ECS' },
      { name: 'David Stirling', role: 'BOWL', careerStatHighlight: 'Best: 3/9' },
    ]
  },
  CATALUNYA: {
    name: 'Catalunya Cricket Club',
    code: 'CTL',
    logoUrl: 'https://flagcdn.com/w160/es.png',
    country: 'Spain',
    category: 'EUROPEAN',
    players: [
      { name: 'Awais Ahmed', role: 'WK', careerStatHighlight: 'SR: 210.5 • ECS Legend' },
      { name: 'Muhammad Armghan Khan', role: 'BAT', careerStatHighlight: 'Avg: 42.0 • 600+ Runs' },
      { name: 'Yasir Ali', role: 'AR', careerStatHighlight: 'Highest Score: 124*' },
      { name: 'Hamza Nisar', role: 'BAT', careerStatHighlight: 'SR: 175.0' },
      { name: 'Ali Azam', role: 'AR', careerStatHighlight: 'SR: 190.0 • 14 Wkts' },
      { name: 'Sheraz Iqbal', role: 'AR', careerStatHighlight: 'Econ: 8.1 • 10 Wkts' },
      { name: 'Syed Sherazi', role: 'BOWL', careerStatHighlight: 'Best: 4/8' },
      { name: 'Ameer Abdullah', role: 'BOWL', careerStatHighlight: 'Econ: 7.5' },
      { name: 'Gulam Sarwar', role: 'BOWL', careerStatHighlight: '30+ ECS Wkts' },
      { name: 'Rauf Zaman', role: 'WK', careerStatHighlight: 'Safe Hands' },
      { name: 'Asim Javeed', role: 'BOWL', careerStatHighlight: 'Best: 3/14' },
    ]
  },
  PAK_I_CARE: {
    name: 'Pak I Care Badalona',
    code: 'PIC',
    logoUrl: 'https://flagcdn.com/w160/es.png',
    country: 'Spain',
    category: 'EUROPEAN',
    players: [
      { name: 'Muhammad Ihsan', role: 'WK', careerStatHighlight: 'Record: 156 Off 48 Balls' },
      { name: 'Muhammad Babar', role: 'AR', careerStatHighlight: 'ECL MVP • 50+ Wkts' },
      { name: 'Asad Abbas', role: 'BAT', careerStatHighlight: 'SR: 182.0' },
      { name: 'Shehroz Ahmed', role: 'AR', careerStatHighlight: 'Captained 20+ ECS Wins' },
      { name: 'Umair Ahmed', role: 'BAT', careerStatHighlight: 'Avg: 35.0' },
      { name: 'Kamran Muhammad', role: 'AR', careerStatHighlight: 'SR: 195.0 • 18 Wkts' },
      { name: 'Atif Muhammad', role: 'BOWL', careerStatHighlight: 'Econ: 6.9' },
      { name: 'Adeel Shafqat', role: 'BOWL', careerStatHighlight: 'Best: 3/11' },
      { name: 'Ali Ahmed', role: 'BOWL', careerStatHighlight: 'Econ: 7.2' },
      { name: 'Hassan Ali', role: 'BOWL', careerStatHighlight: 'Death Over Specialist' },
      { name: 'Moazzam Rafique', role: 'AR', careerStatHighlight: 'SR: 160.0' },
    ]
  },
  ROYAL_ROMA: {
    name: 'Royal Roma Cricket Club',
    code: 'ROR',
    logoUrl: 'https://flagcdn.com/w160/it.png',
    country: 'Italy',
    category: 'EUROPEAN',
    players: [
      { name: 'Mubarak Hossain', role: 'WK', careerStatHighlight: 'SR: 205.0' },
      { name: 'Arif Muhammad', role: 'BAT', careerStatHighlight: 'Avg: 40.2' },
      { name: 'Rajwinder Singh', role: 'AR', careerStatHighlight: 'SR: 180.0 • 20 Wkts' },
      { name: 'Gagandeep Singh', role: 'BAT', careerStatHighlight: 'SR: 168.0' },
      { name: 'Hassan Mubashar', role: 'BAT', careerStatHighlight: 'Avg: 31.0' },
      { name: 'Sukhwinder Singh', role: 'AR', careerStatHighlight: 'Econ: 7.4' },
      { name: 'Zulqarnain Ali', role: 'BOWL', careerStatHighlight: 'Best: 4/11' },
      { name: 'Umar Shahzad', role: 'BOWL', careerStatHighlight: 'Econ: 6.8' },
      { name: 'Usman Mubashar', role: 'BAT', careerStatHighlight: 'Avg: 28.0' },
      { name: 'Muhammad Bilal', role: 'BOWL', careerStatHighlight: 'Best: 3/15' },
      { name: 'Jitendra Prakash', role: 'BOWL', careerStatHighlight: 'Econ: 7.1' },
    ]
  },
  BRESCIA: {
    name: 'Brescia Cricket Club',
    code: 'BRS',
    logoUrl: 'https://flagcdn.com/w160/it.png',
    country: 'Italy',
    category: 'EUROPEAN',
    players: [
      { name: 'Imad Khan', role: 'WK', careerStatHighlight: 'SR: 215.0 • 50+ ECS 6s' },
      { name: 'Babar Hussain', role: 'BAT', careerStatHighlight: 'Avg: 45.0' },
      { name: 'Qalab Sajjad', role: 'AR', careerStatHighlight: 'Captain • 30 Wkts' },
      { name: 'Naveed Chaudhary', role: 'BAT', careerStatHighlight: 'SR: 172.0' },
      { name: 'Yasir Dullu', role: 'WK', careerStatHighlight: 'Avg: 32.0' },
      { name: 'Ali Raza Islam', role: 'AR', careerStatHighlight: 'SR: 198.0 • 15 Wkts' },
      { name: 'Bashar Khan', role: 'BOWL', careerStatHighlight: 'Best: 4/7' },
      { name: 'Imran Naveed', role: 'BOWL', careerStatHighlight: 'Econ: 6.5' },
      { name: 'Javed Muhammad', role: 'BOWL', careerStatHighlight: 'Econ: 7.0' },
      { name: 'Hassan Raza', role: 'BOWL', careerStatHighlight: 'Best: 3/8' },
      { name: 'Farooq Khan', role: 'BAT', careerStatHighlight: 'SR: 155.0' },
    ]
  },
  DREUX: {
    name: 'Dreux Cricket Club',
    code: 'DCC',
    logoUrl: 'https://flagcdn.com/w160/fr.png',
    country: 'France',
    category: 'EUROPEAN',
    players: [
      { name: 'Ahmad Nabi', role: 'BAT', careerStatHighlight: 'ECL Top Scorer • SR: 220.0' },
      { name: 'Hamza Niaz', role: 'BAT', careerStatHighlight: 'France International • Avg: 36.0' },
      { name: 'Mohammad Nisar', role: 'AR', careerStatHighlight: 'SR: 185.0 • 18 Wkts' },
      { name: 'Tabish Bhatti', role: 'AR', careerStatHighlight: 'ECL Final MVP' },
      { name: 'Kamran Ahmadzai', role: 'AR', careerStatHighlight: 'SR: 190.0' },
      { name: 'Ammar Zahir', role: 'WK', careerStatHighlight: 'Safe Hands Behind Wickets' },
      { name: 'Wahid Abdul', role: 'BOWL', careerStatHighlight: 'Best: 4/10' },
      { name: 'Afridi Yaseen', role: 'BOWL', careerStatHighlight: 'Econ: 6.9' },
      { name: 'Usman Khan', role: 'BOWL', careerStatHighlight: 'Best: 3/12' },
      { name: 'Shahzeb Mohammad', role: 'BAT', careerStatHighlight: 'Avg: 29.0' },
      { name: 'Alexandre Harkouk', role: 'BOWL', careerStatHighlight: 'Econ: 7.4' },
    ]
  },
  OLD_VICTORIANS: {
    name: 'Old Victorians Cricket Club',
    code: 'OV',
    logoUrl: 'https://flagcdn.com/w160/je.png',
    country: 'Jersey',
    category: 'EUROPEAN',
    players: [
      { name: 'Jonty Jenner', role: 'BAT', careerStatHighlight: 'Jersey Captain • Sussex Star' },
      { name: 'Charlie Brennan', role: 'BAT', careerStatHighlight: 'Avg: 34.0 • SR: 165.0' },
      { name: 'Jamie Watling', role: 'WK', careerStatHighlight: 'Avg: 31.0' },
      { name: 'Scott Simpson', role: 'AR', careerStatHighlight: 'SR: 175.0 • 12 Wkts' },
      { name: 'Edward Giles', role: 'BAT', careerStatHighlight: 'SR: 150.0' },
      { name: 'Rob Duckett', role: 'AR', careerStatHighlight: 'Econ: 7.1' },
      { name: 'James Duckett', role: 'BOWL', careerStatHighlight: 'Best: 3/14' },
      { name: 'Matthew Boote', role: 'BOWL', careerStatHighlight: 'Econ: 6.8' },
      { name: 'Theo Pullman', role: 'BOWL', careerStatHighlight: 'Best: 3/19' },
      { name: 'Louis Kelly', role: 'AR', careerStatHighlight: 'SR: 145.0' },
      { name: 'Will Perchard', role: 'BOWL', careerStatHighlight: 'Econ: 7.2' },
    ]
  },
  FORFARSHIRE: {
    name: 'Forfarshire Cricket Club',
    code: 'FOR',
    logoUrl: 'https://flagcdn.com/w160/gb-sct.png',
    country: 'Scotland',
    category: 'EUROPEAN',
    players: [
      { name: 'Craig Wallace', role: 'BAT', careerStatHighlight: 'Scotland International • 100+ Caps' },
      { name: 'Michael Leask', role: 'AR', careerStatHighlight: 'World Cup Legend • SR: 195.0' },
      { name: 'Jack Hogarth', role: 'BOWL', careerStatHighlight: 'Econ: 6.4 • 15 Wkts' },
      { name: 'Callum Garden', role: 'WK', careerStatHighlight: 'Safe Keeper & Hitter' },
      { name: 'Scott Cameron', role: 'AR', careerStatHighlight: 'Scotland Fast Bowler' },
      { name: 'Bryce Carnegie', role: 'BOWL', careerStatHighlight: 'Best: 4/14' },
      { name: 'Fraser Ross', role: 'BOWL', careerStatHighlight: 'Econ: 7.0' },
      { name: 'Lewis James', role: 'BAT', careerStatHighlight: 'Avg: 33.0' },
      { name: 'Glenn Carnegie', role: 'BAT', careerStatHighlight: 'SR: 155.0' },
      { name: 'Fergus Duncan', role: 'BOWL', careerStatHighlight: 'Best: 3/16' },
      { name: 'Lyle Robertson', role: 'AR', careerStatHighlight: 'SR: 160.0' },
    ]
  }
};

// All FanCode Fixtures scheduled across the upcoming 2 days (48 hours window)
export const FANCODE_UPCOMING_MATCHUPS = [
  // --- Indian Domestic T20 (Dehradun T20, Sher-E-Punjab, Delhi Premier League) ---
  { t1: 'DOIWALA_KINGS', t2: 'VIKASNAGAR_DHAMAKA', series: 'Dehradun T20 League 2026', format: 'T20', hoursOffset: 3 },
  { t1: 'MUSSOORIE_THUNDER', t2: 'SELAQUI_STRIKERS', series: 'Dehradun T20 League 2026', format: 'T20', hoursOffset: 6 },
  { t1: 'JALANDHAR_WARRIORS', t2: 'FAZILKA_FALCONS', series: 'Sher-E-Punjab T20, 2026', format: 'T20', hoursOffset: 10 },
  { t1: 'EAST_DELHI_RIDERS', t2: 'SOUTH_DELHI_SUPERSTARS', series: 'Delhi Premier League, 2026', format: 'T20', hoursOffset: 14 },
  { t1: 'AMRITSAR_AVIATORS', t2: 'MOHALI_LEGENDS', series: 'Sher-E-Punjab T20, 2026', format: 'T20', hoursOffset: 20 },
  { t1: 'RISHIKESH_DRAGONS', t2: 'VIKASNAGAR_DHAMAKA', series: 'Dehradun T20 League 2026', format: 'T20', hoursOffset: 26 },
  
  // --- Global Leagues (CPL 2026) ---
  { t1: 'TRINBAGO_KNIGHT_RIDERS', t2: 'GUYANA_AMAZON_WARRIORS', series: 'Caribbean Premier League, 2026', format: 'T20', hoursOffset: 30 },

  // --- International / Bilateral & Asia Cup Qualifiers ---
  { t1: 'ZIMBABWE', t2: 'AUSTRALIA', series: 'Australia tour of Zimbabwe, 2026', format: 'T20', hoursOffset: 34 },
  { t1: 'NEPAL', t2: 'UAE', series: "ACC Men's Premier Cup 2026", format: 'T20', hoursOffset: 38 },
  { t1: 'AFGHANISTAN', t2: 'INDIA', series: 'India Tour of Afghanistan, 2026', format: 'T20', hoursOffset: 44 },

  // --- European T10 / ECL ---
  { t1: 'PAK_I_CARE', t2: 'CATALUNYA', series: 'ECS Spain T10 Barcelona', format: 'T10', hoursOffset: 4 },
  { t1: 'MADRID', t2: 'CATALUNYA', series: 'ECS Spain T10 Series', format: 'T10', hoursOffset: 12 },
  { t1: 'ROYAL_ROMA', t2: 'BRESCIA', series: 'ECS Italy T10 Rome', format: 'T10', hoursOffset: 22 },
  { t1: 'DREUX', t2: 'OLD_VICTORIANS', series: 'European Cricket League (ECL) 2026', format: 'T10', hoursOffset: 32 },
  { t1: 'FORFARSHIRE', t2: 'DREUX', series: 'European Cricket League (ECL) 2026', format: 'T10', hoursOffset: 42 },
];

export async function generateUpcomingFanCodeAndInternationalMatches() {
  const now = new Date();
  let createdCount = 0;

  for (const m of FANCODE_UPCOMING_MATCHUPS) {
    const team1Data = FANCODE_ALL_TEAMS[m.t1];
    const team2Data = FANCODE_ALL_TEAMS[m.t2];

    if (!team1Data || !team2Data) continue;

    const matchStartTime = new Date(now.getTime() + m.hoursOffset * 60 * 60 * 1000);
    const apiId = `fc_${m.t1.toLowerCase()}_vs_${m.t2.toLowerCase()}_${matchStartTime.toISOString().slice(0, 10)}`;

    const mapSquad = (team: TeamPreset) => {
      return team.players.map((p, idx) => {
        return {
          id: `p_${team.code.toLowerCase()}_${idx + 1}`,
          name: p.name,
          shortName: p.name.split(' ').slice(-1)[0] || p.name,
          team: team.code,
          teamName: team.name,
          role: p.role,
          avatar: getPlayerImage(p.name, team.code, idx),
          country: team.country,
          recentForm: ['48', '2/15', '35*'],
          careerStatHighlight: p.careerStatHighlight || 'League Star'
        };
      });
    };

    const matchPayload = {
      apiId,
      title: `${team1Data.name} vs ${team2Data.name}`,
      series: m.series,
      format: m.format,
      team1: { 
        name: team1Data.name, 
        code: team1Data.code, 
        logoUrl: team1Data.logoUrl || `https://flagcdn.com/w160/${team1Data.country.toLowerCase().slice(0, 2)}.png` 
      },
      team2: { 
        name: team2Data.name, 
        code: team2Data.code, 
        logoUrl: team2Data.logoUrl || `https://flagcdn.com/w160/${team2Data.country.toLowerCase().slice(0, 2)}.png` 
      },
      matchStartTime: matchStartTime.toISOString(),
      squadTeam1: mapSquad(team1Data),
      squadTeam2: mapSquad(team2Data),
    };

    const existingMatch = await Match.findOne({ apiId });
    if (!existingMatch) {
      await Match.create({
        ...matchPayload,
        status: 'FETCHED',
        questions: [],
        entryFees: [25, 50, 100],
      });
      createdCount++;
    } else if (existingMatch.status === 'FETCHED' || existingMatch.status === 'DRAFT') {
      await Match.updateOne({ apiId }, { $set: matchPayload });
    }
  }

  return { success: true, added: createdCount };
}
