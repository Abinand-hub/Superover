import React, { useState, useEffect, useMemo } from 'react';
import { api } from '../../services/api';
import { CricketMatch, Player, PlayerRole, PredictionQuestion, QuestionDefinition } from '../../types';
import { 
  PlusCircle, 
  Trash2, 
  Sparkles, 
  Calendar, 
  Users, 
  Trophy, 
  Shield, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  Play, 
  Square, 
  UserPlus, 
  Edit3,
  Flame,
  Layers,
  ArrowRight,
  Search,
  X,
  Globe,
  Image as ImageIcon,
  HelpCircle,
  RotateCcw,
  Database,
  Plus,
  ArrowLeft,
  Eye,
  Bookmark,
  BookmarkCheck,
  Save,
  AlertCircle,
  Smartphone,
  Check
} from 'lucide-react';
import { formatINR } from '../../utils/payoutCalculator';
import { getTeamLogoUrl, PRESET_LOGO_CATALOG, TEAM_LOGO_MAP } from '../../utils/teamLogoHelper';
import { DEFAULT_QUESTIONS } from '../../data/initialData';

interface ManualMatchCreatorProps {
  allMatches: CricketMatch[];
  onCreateMatch: (match: CricketMatch) => void;
  onUpdateMatch: (match: CricketMatch) => void;
  onReloadData?: () => void;
  onGoToLifecycle?: () => void;
  onGoToSettle?: (matchId: string) => void;
  onGoToSquads?: (matchId: string) => void;
}

// Full Master Question Bank for Cricket Contests
export const MASTER_QUESTION_BANK = [
  {
    category: '🏏 Batting Categories',
    questions: [
      { shortTitle: 'Top Batter Match', title: 'Who will be the Top Batter in the match?', subtitle: 'Most runs scored in the match', type: 'PLAYER' as const, criteria: 'PLAYER', iconName: 'BAT' },
      { shortTitle: 'Best Striker', title: 'Who will be the Best Striker?', subtitle: 'Highest batting strike rate in the match', type: 'PLAYER' as const, criteria: 'PLAYER', iconName: 'STAR' },
      { shortTitle: 'Most 6s', title: 'Which batter will hit the most 6s?', subtitle: 'Highest number of 6s by a batter', type: 'PLAYER' as const, criteria: 'PLAYER', iconName: 'TICKET' },
      { shortTitle: 'Most 4s', title: 'Which batter will hit the most 4s?', subtitle: 'Highest number of boundaries (4s) hit', type: 'PLAYER' as const, criteria: 'PLAYER', iconName: 'TICKET' },
      { shortTitle: 'Top Batter Team 1', title: 'Top Batter (Team 1)', subtitle: 'Most runs scored for Team 1', type: 'PLAYER' as const, criteria: 'PLAYER', iconName: 'BAT' },
      { shortTitle: 'Top Batter Team 2', title: 'Top Batter (Team 2)', subtitle: 'Most runs scored for Team 2', type: 'PLAYER' as const, criteria: 'PLAYER', iconName: 'BAT' },
    ]
  },
  {
    category: '⚡ Bowling & Fielding Categories',
    questions: [
      { shortTitle: 'Top Bowler Match', title: 'Who will be the Top Bowler in the match?', subtitle: 'Most wickets taken in the match', type: 'PLAYER' as const, criteria: 'PLAYER', iconName: 'BOWL' },
      { shortTitle: 'Most Economical Bowler', title: 'Most Economical Bowler', subtitle: 'Lowest bowling economy rate in the match', type: 'PLAYER' as const, criteria: 'PLAYER', iconName: 'SHIELD' },
      { shortTitle: 'Most Dot Balls', title: 'Who will bowl the most dot balls?', subtitle: 'Highest number of dot balls bowled', type: 'PLAYER' as const, criteria: 'PLAYER', iconName: 'SHIELD' },
      { shortTitle: 'Most Catches', title: 'Most Catches / Dismissals', subtitle: 'Wicketkeeper or fielder with most catches', type: 'PLAYER' as const, criteria: 'PLAYER', iconName: 'SHIELD' },
      { shortTitle: 'Top Bowler Team 1', title: 'Top Bowler (Team 1)', subtitle: 'Most wickets for Team 1', type: 'PLAYER' as const, criteria: 'PLAYER', iconName: 'BOWL' },
      { shortTitle: 'Top Bowler Team 2', title: 'Top Bowler (Team 2)', subtitle: 'Most wickets for Team 2', type: 'PLAYER' as const, criteria: 'PLAYER', iconName: 'BOWL' },
      { shortTitle: 'Most Expensive Bowler', title: 'Most Expensive Bowler', subtitle: 'Most runs conceded in the match', type: 'PLAYER' as const, criteria: 'PLAYER', iconName: 'ALERT' },
    ]
  },
  {
    category: '🏆 Match & Performance Outcomes',
    questions: [
      { shortTitle: 'Match Winner', title: 'Which team will win the match?', subtitle: 'Pick the winning team', type: 'TEAM' as const, criteria: 'TEAM', iconName: 'TROPHY' },
      { shortTitle: 'Man of the Match', title: 'Who will be judged as the player of the match?', subtitle: 'Best performer of the match', type: 'PLAYER' as const, criteria: 'PLAYER', iconName: 'STAR' },
    ]
  }
];

// Preset popular squads for fast 1-click setup
const PRESET_TEAMS: Record<string, { name: string; code: string; logoUrl: string; squad: { name: string; shortName: string; role: PlayerRole }[] }> = {
  IND: {
    name: 'India',
    code: 'IND',
    logoUrl: 'https://flagcdn.com/w160/in.png',
    squad: [
      { name: 'Rohit Sharma', shortName: 'R. Sharma', role: 'BAT' },
      { name: 'Virat Kohli', shortName: 'V. Kohli', role: 'BAT' },
      { name: 'Suryakumar Yadav', shortName: 'S. Yadav', role: 'BAT' },
      { name: 'Rishabh Pant', shortName: 'R. Pant', role: 'WK' },
      { name: 'Hardik Pandya', shortName: 'H. Pandya', role: 'AR' },
      { name: 'Axar Patel', shortName: 'A. Patel', role: 'AR' },
      { name: 'Ravindra Jadeja', shortName: 'R. Jadeja', role: 'AR' },
      { name: 'Shivam Dube', shortName: 'S. Dube', role: 'AR' },
      { name: 'Kuldeep Yadav', shortName: 'K. Yadav', role: 'BOWL' },
      { name: 'Jasprit Bumrah', shortName: 'J. Bumrah', role: 'BOWL' },
      { name: 'Arshdeep Singh', shortName: 'A. Singh', role: 'BOWL' },
    ]
  },
  AUS: {
    name: 'Australia',
    code: 'AUS',
    logoUrl: 'https://flagcdn.com/w160/au.png',
    squad: [
      { name: 'Travis Head', shortName: 'T. Head', role: 'BAT' },
      { name: 'Mitchell Marsh', shortName: 'M. Marsh', role: 'AR' },
      { name: 'Glenn Maxwell', shortName: 'G. Maxwell', role: 'AR' },
      { name: 'Marcus Stoinis', shortName: 'M. Stoinis', role: 'AR' },
      { name: 'Josh Inglis', shortName: 'J. Inglis', role: 'WK' },
      { name: 'Tim David', shortName: 'T. David', role: 'BAT' },
      { name: 'Matthew Wade', shortName: 'M. Wade', role: 'WK' },
      { name: 'Pat Cummins', shortName: 'P. Cummins', role: 'BOWL' },
      { name: 'Mitchell Starc', shortName: 'M. Starc', role: 'BOWL' },
      { name: 'Adam Zampa', shortName: 'A. Zampa', role: 'BOWL' },
      { name: 'Josh Hazlewood', shortName: 'J. Hazlewood', role: 'BOWL' },
    ]
  },
  ENG: {
    name: 'England',
    code: 'ENG',
    logoUrl: 'https://flagcdn.com/w160/gb-eng.png',
    squad: [
      { name: 'Jos Buttler', shortName: 'J. Buttler', role: 'WK' },
      { name: 'Phil Salt', shortName: 'P. Salt', role: 'WK' },
      { name: 'Jonny Bairstow', shortName: 'J. Bairstow', role: 'BAT' },
      { name: 'Harry Brook', shortName: 'H. Brook', role: 'BAT' },
      { name: 'Liam Livingstone', shortName: 'L. Livingstone', role: 'AR' },
      { name: 'Moeen Ali', shortName: 'M. Ali', role: 'AR' },
      { name: 'Sam Curran', shortName: 'S. Curran', role: 'AR' },
      { name: 'Chris Jordan', shortName: 'C. Jordan', role: 'BOWL' },
      { name: 'Jofra Archer', shortName: 'J. Archer', role: 'BOWL' },
      { name: 'Adil Rashid', shortName: 'A. Rashid', role: 'BOWL' },
      { name: 'Reece Topley', shortName: 'R. Topley', role: 'BOWL' },
    ]
  },
  SA: {
    name: 'South Africa',
    code: 'SA',
    logoUrl: 'https://flagcdn.com/w160/za.png',
    squad: [
      { name: 'Quinton de Kock', shortName: 'Q. de Kock', role: 'WK' },
      { name: 'Reeza Hendricks', shortName: 'R. Hendricks', role: 'BAT' },
      { name: 'Aiden Markram', shortName: 'A. Markram', role: 'BAT' },
      { name: 'Heinrich Klaasen', shortName: 'H. Klaasen', role: 'WK' },
      { name: 'David Miller', shortName: 'D. Miller', role: 'BAT' },
      { name: 'Tristan Stubbs', shortName: 'T. Stubbs', role: 'BAT' },
      { name: 'Marco Jansen', shortName: 'M. Jansen', role: 'AR' },
      { name: 'Keshav Maharaj', shortName: 'K. Maharaj', role: 'BOWL' },
      { name: 'Kagiso Rabada', shortName: 'K. Rabada', role: 'BOWL' },
      { name: 'Anrich Nortje', shortName: 'A. Nortje', role: 'BOWL' },
      { name: 'Tabraiz Shamsi', shortName: 'T. Shamsi', role: 'BOWL' },
    ]
  },
  PAK: {
    name: 'Pakistan',
    code: 'PAK',
    logoUrl: 'https://flagcdn.com/w160/pk.png',
    squad: [
      { name: 'Babar Azam', shortName: 'B. Azam', role: 'BAT' },
      { name: 'Mohammad Rizwan', shortName: 'M. Rizwan', role: 'WK' },
      { name: 'Fakhar Zaman', shortName: 'F. Zaman', role: 'BAT' },
      { name: 'Usman Khan', shortName: 'U. Khan', role: 'BAT' },
      { name: 'Iftikhar Ahmed', shortName: 'I. Ahmed', role: 'AR' },
      { name: 'Shadab Khan', shortName: 'S. Khan', role: 'AR' },
      { name: 'Imad Wasim', shortName: 'I. Wasim', role: 'AR' },
      { name: 'Shaheen Afridi', shortName: 'S. Afridi', role: 'BOWL' },
      { name: 'Naseem Shah', shortName: 'N. Shah', role: 'BOWL' },
      { name: 'Haris Rauf', shortName: 'H. Rauf', role: 'BOWL' },
      { name: 'Mohammad Amir', shortName: 'M. Amir', role: 'BOWL' },
    ]
  },
  NZ: {
    name: 'New Zealand',
    code: 'NZ',
    logoUrl: 'https://flagcdn.com/w160/nz.png',
    squad: [
      { name: 'Finn Allen', shortName: 'F. Allen', role: 'BAT' },
      { name: 'Devon Conway', shortName: 'D. Conway', role: 'WK' },
      { name: 'Kane Williamson', shortName: 'K. Williamson', role: 'BAT' },
      { name: 'Daryl Mitchell', shortName: 'D. Mitchell', role: 'AR' },
      { name: 'Glenn Phillips', shortName: 'G. Phillips', role: 'AR' },
      { name: 'James Neesham', shortName: 'J. Neesham', role: 'AR' },
      { name: 'Mitchell Santner', shortName: 'M. Santner', role: 'AR' },
      { name: 'Tim Southee', shortName: 'T. Southee', role: 'BOWL' },
      { name: 'Trent Boult', shortName: 'T. Boult', role: 'BOWL' },
      { name: 'Lockie Ferguson', shortName: 'L. Ferguson', role: 'BOWL' },
      { name: 'Ish Sodhi', shortName: 'I. Sodhi', role: 'BOWL' },
    ]
  },
  WI: {
    name: 'West Indies',
    code: 'WI',
    logoUrl: 'https://flagcdn.com/w160/jm.png',
    squad: [
      { name: 'Brandon King', shortName: 'B. King', role: 'BAT' },
      { name: 'Johnson Charles', shortName: 'J. Charles', role: 'BAT' },
      { name: 'Nicholas Pooran', shortName: 'N. Pooran', role: 'WK' },
      { name: 'Rovman Powell', shortName: 'R. Powell', role: 'BAT' },
      { name: 'Sherfane Rutherford', shortName: 'S. Rutherford', role: 'BAT' },
      { name: 'Andre Russell', shortName: 'A. Russell', role: 'AR' },
      { name: 'Romario Shepherd', shortName: 'R. Shepherd', role: 'AR' },
      { name: 'Roston Chase', shortName: 'R. Chase', role: 'AR' },
      { name: 'Akeal Hosein', shortName: 'A. Hosein', role: 'BOWL' },
      { name: 'Alzarri Joseph', shortName: 'A. Joseph', role: 'BOWL' },
      { name: 'Gudakesh Motie', shortName: 'G. Motie', role: 'BOWL' },
    ]
  },
  CSK: {
    name: 'Chennai Super Kings',
    code: 'CSK',
    logoUrl: 'https://documents.iplt20.com/ipl/CSK/logos/Logo-square/CSKsquare.png',
    squad: [
      { name: 'Ruturaj Gaikwad', shortName: 'R. Gaikwad', role: 'BAT' },
      { name: 'Devon Conway', shortName: 'D. Conway', role: 'BAT' },
      { name: 'Daryl Mitchell', shortName: 'D. Mitchell', role: 'AR' },
      { name: 'Shivam Dube', shortName: 'S. Dube', role: 'AR' },
      { name: 'Ravindra Jadeja', shortName: 'R. Jadeja', role: 'AR' },
      { name: 'MS Dhoni', shortName: 'MS Dhoni', role: 'WK' },
      { name: 'Sameer Rizvi', shortName: 'S. Rizvi', role: 'BAT' },
      { name: 'Shardul Thakur', shortName: 'S. Thakur', role: 'BOWL' },
      { name: 'Deepak Chahar', shortName: 'D. Chahar', role: 'BOWL' },
      { name: 'Tushar Deshpande', shortName: 'T. Deshpande', role: 'BOWL' },
      { name: 'Matheesha Pathirana', shortName: 'M. Pathirana', role: 'BOWL' },
    ]
  },
  MI: {
    name: 'Mumbai Indians',
    code: 'MI',
    logoUrl: 'https://documents.iplt20.com/ipl/MI/Logos/Logo-square/MI_Square.png',
    squad: [
      { name: 'Rohit Sharma', shortName: 'R. Sharma', role: 'BAT' },
      { name: 'Ishan Kishan', shortName: 'I. Kishan', role: 'WK' },
      { name: 'Suryakumar Yadav', shortName: 'S. Yadav', role: 'BAT' },
      { name: 'Tilak Varma', shortName: 'T. Varma', role: 'BAT' },
      { name: 'Hardik Pandya', shortName: 'H. Pandya', role: 'AR' },
      { name: 'Tim David', shortName: 'T. David', role: 'BAT' },
      { name: 'Romario Shepherd', shortName: 'R. Shepherd', role: 'AR' },
      { name: 'Gerald Coetzee', shortName: 'G. Coetzee', role: 'BOWL' },
      { name: 'Piyush Chawla', shortName: 'P. Chawla', role: 'BOWL' },
      { name: 'Jasprit Bumrah', shortName: 'J. Bumrah', role: 'BOWL' },
      { name: 'Nuwan Thushara', shortName: 'N. Thushara', role: 'BOWL' },
    ]
  },
  RCB: {
    name: 'Royal Challengers Bengaluru',
    code: 'RCB',
    logoUrl: 'https://documents.iplt20.com/ipl/RCB/Logos/Logo-square/RCBsquare.png',
    squad: [
      { name: 'Faf du Plessis', shortName: 'F. du Plessis', role: 'BAT' },
      { name: 'Virat Kohli', shortName: 'V. Kohli', role: 'BAT' },
      { name: 'Rajat Patidar', shortName: 'R. Patidar', role: 'BAT' },
      { name: 'Glenn Maxwell', shortName: 'G. Maxwell', role: 'AR' },
      { name: 'Cameron Green', shortName: 'C. Green', role: 'AR' },
      { name: 'Dinesh Karthik', shortName: 'D. Karthik', role: 'WK' },
      { name: 'Mahipal Lomror', shortName: 'M. Lomror', role: 'AR' },
      { name: 'Karn Sharma', shortName: 'K. Sharma', role: 'BOWL' },
      { name: 'Lockie Ferguson', shortName: 'L. Ferguson', role: 'BOWL' },
      { name: 'Mohammed Siraj', shortName: 'M. Siraj', role: 'BOWL' },
      { name: 'Yash Dayal', shortName: 'Y. Dayal', role: 'BOWL' },
    ]
  },
  KKR: {
    name: 'Kolkata Knight Riders',
    code: 'KKR',
    logoUrl: 'https://documents.iplt20.com/ipl/KKR/Logos/Logo-square/KKRsquare.png',
    squad: [
      { name: 'Philip Salt', shortName: 'P. Salt', role: 'WK' },
      { name: 'Sunil Narine', shortName: 'S. Narine', role: 'AR' },
      { name: 'Venkatesh Iyer', shortName: 'V. Iyer', role: 'AR' },
      { name: 'Shreyas Iyer', shortName: 'S. Iyer', role: 'BAT' },
      { name: 'Rinku Singh', shortName: 'R. Singh', role: 'BAT' },
      { name: 'Andre Russell', shortName: 'A. Russell', role: 'AR' },
      { name: 'Ramandeep Singh', shortName: 'R. Singh', role: 'AR' },
      { name: 'Mitchell Starc', shortName: 'M. Starc', role: 'BOWL' },
      { name: 'Vaibhav Arora', shortName: 'V. Arora', role: 'BOWL' },
      { name: 'Harshit Rana', shortName: 'H. Rana', role: 'BOWL' },
      { name: 'Varun Chakaravarthy', shortName: 'V. Chakaravarthy', role: 'BOWL' },
    ]
  },
  ROT: {
    name: 'Rotterdam Dockers',
    code: 'ROT',
    logoUrl: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=160&auto=format&fit=crop&q=80',
    squad: [
      { name: 'Bas de Leede', shortName: 'B. de Leede', role: 'AR' },
      { name: 'Max O\'Dowd', shortName: 'M. O\'Dowd', role: 'BAT' },
      { name: 'Scott Edwards', shortName: 'S. Edwards', role: 'WK' },
      { name: 'Vikramjit Singh', shortName: 'V. Singh', role: 'BAT' },
      { name: 'Colin Ackermann', shortName: 'C. Ackermann', role: 'AR' },
      { name: 'Teja Nidamanuru', shortName: 'T. Nidamanuru', role: 'BAT' },
      { name: 'Roelof van der Merwe', shortName: 'R. v.d. Merwe', role: 'AR' },
      { name: 'Logan van Beek', shortName: 'L. van Beek', role: 'BOWL' },
      { name: 'Aryan Dutt', shortName: 'A. Dutt', role: 'BOWL' },
      { name: 'Paul van Meekeren', shortName: 'P. v Meekeren', role: 'BOWL' },
      { name: 'Vivian Kingma', shortName: 'V. Kingma', role: 'BOWL' },
    ]
  },
  GLA: {
    name: 'Glasgow Cosmics',
    code: 'GLA',
    logoUrl: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=160&auto=format&fit=crop&q=80',
    squad: [
      { name: 'George Munsey', shortName: 'G. Munsey', role: 'BAT' },
      { name: 'Michael Jones', shortName: 'M. Jones', role: 'BAT' },
      { name: 'Brandon McMullen', shortName: 'B. McMullen', role: 'AR' },
      { name: 'Richie Berrington', shortName: 'R. Berrington', role: 'BAT' },
      { name: 'Matthew Cross', shortName: 'M. Cross', role: 'WK' },
      { name: 'Michael Leask', shortName: 'M. Leask', role: 'AR' },
      { name: 'Chris Greaves', shortName: 'C. Greaves', role: 'AR' },
      { name: 'Mark Watt', shortName: 'M. Watt', role: 'BOWL' },
      { name: 'Christopher Sole', shortName: 'C. Sole', role: 'BOWL' },
      { name: 'Brad Wheal', shortName: 'B. Wheal', role: 'BOWL' },
      { name: 'Safyaan Sharif', shortName: 'S. Sharif', role: 'BOWL' },
    ]
  },
  BW: {
    name: 'Belfast Wolves',
    code: 'BW',
    logoUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=160&auto=format&fit=crop&q=80',
    squad: [
      { name: 'Paul Stirling', shortName: 'P. Stirling', role: 'BAT' },
      { name: 'Andrew Balbirnie', shortName: 'A. Balbirnie', role: 'BAT' },
      { name: 'Lorcan Tucker', shortName: 'L. Tucker', role: 'WK' },
      { name: 'Harry Tector', shortName: 'H. Tector', role: 'BAT' },
      { name: 'Curtis Campher', shortName: 'C. Campher', role: 'AR' },
      { name: 'George Dockrell', shortName: 'G. Dockrell', role: 'AR' },
      { name: 'Mark Adair', shortName: 'M. Adair', role: 'AR' },
      { name: 'Barry McCarthy', shortName: 'B. McCarthy', role: 'BOWL' },
      { name: 'Craig Young', shortName: 'C. Young', role: 'BOWL' },
      { name: 'Josh Little', shortName: 'J. Little', role: 'BOWL' },
      { name: 'Ben White', shortName: 'B. White', role: 'BOWL' },
    ]
  },
  AF: {
    name: 'Amsterdam Flames',
    code: 'AF',
    logoUrl: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=160&auto=format&fit=crop&q=80',
    squad: [
      { name: 'Wesley Barresi', shortName: 'W. Barresi', role: 'BAT' },
      { name: 'Michael Levitt', shortName: 'M. Levitt', role: 'BAT' },
      { name: 'Sybrand Engelbrecht', shortName: 'S. Engelbrecht', role: 'BAT' },
      { name: 'Noah Croes', shortName: 'N. Croes', role: 'WK' },
      { name: 'Saqib Zulfiqar', shortName: 'S. Zulfiqar', role: 'AR' },
      { name: 'Shariz Ahmad', shortName: 'S. Ahmad', role: 'AR' },
      { name: 'Kyle Klein', shortName: 'K. Klein', role: 'BOWL' },
      { name: 'Ryan Klein', shortName: 'R. Klein', role: 'BOWL' },
      { name: 'Daniel Doram', shortName: 'D. Doram', role: 'BOWL' },
      { name: 'Fred Klaassen', shortName: 'F. Klaassen', role: 'BOWL' },
      { name: 'Timm van der Gugten', shortName: 'T. v.d. Gugten', role: 'BOWL' },
    ]
  },
  BR: {
    name: 'Barbados Royals',
    code: 'BR',
    logoUrl: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=160&auto=format&fit=crop&q=80',
    squad: [
      { name: 'Rovman Powell', shortName: 'R. Powell', role: 'BAT' },
      { name: 'Quinton de Kock', shortName: 'Q. de Kock', role: 'WK' },
      { name: 'David Miller', shortName: 'D. Miller', role: 'BAT' },
      { name: 'Rahkeem Cornwall', shortName: 'R. Cornwall', role: 'AR' },
      { name: 'Jason Holder', shortName: 'J. Holder', role: 'AR' },
      { name: 'Alick Athanaze', shortName: 'A. Athanaze', role: 'BAT' },
      { name: 'Obed McCoy', shortName: 'O. McCoy', role: 'BOWL' },
      { name: 'Maheesh Theekshana', shortName: 'M. Theekshana', role: 'BOWL' },
      { name: 'Naveen-ul-Haq', shortName: 'Naveen-ul-Haq', role: 'BOWL' },
      { name: 'Keshav Maharaj', shortName: 'K. Maharaj', role: 'BOWL' },
      { name: 'Ramon Simmonds', shortName: 'R. Simmonds', role: 'BOWL' },
    ]
  },
  TKR: {
    name: 'Trinbago Knight Riders',
    code: 'TKR',
    logoUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=160&auto=format&fit=crop&q=80',
    squad: [
      { name: 'Kieron Pollard', shortName: 'K. Pollard', role: 'AR' },
      { name: 'Nicholas Pooran', shortName: 'N. Pooran', role: 'WK' },
      { name: 'Andre Russell', shortName: 'A. Russell', role: 'AR' },
      { name: 'Sunil Narine', shortName: 'S. Narine', role: 'AR' },
      { name: 'Jason Roy', shortName: 'J. Roy', role: 'BAT' },
      { name: 'Tim David', shortName: 'T. David', role: 'BAT' },
      { name: 'Dwayne Bravo', shortName: 'D. Bravo', role: 'AR' },
      { name: 'Akeal Hosein', shortName: 'A. Hosein', role: 'BOWL' },
      { name: 'Waqar Salamkheil', shortName: 'W. Salamkheil', role: 'BOWL' },
      { name: 'Terrance Hinds', shortName: 'T. Hinds', role: 'BOWL' },
      { name: 'Jayden Seales', shortName: 'J. Seales', role: 'BOWL' },
    ]
  }
};

export const ManualMatchCreator: React.FC<ManualMatchCreatorProps> = ({
  allMatches,
  onCreateMatch,
  onUpdateMatch,
  onReloadData,
  onGoToLifecycle,
  onGoToSettle,
  onGoToSquads
}) => {
  // Form State (Default blank values as requested)
  const [team1Name, setTeam1Name] = useState('');
  const [team1Code, setTeam1Code] = useState('');
  const [team1Logo, setTeam1Logo] = useState('');
  
  const [team2Name, setTeam2Name] = useState('');
  const [team2Code, setTeam2Code] = useState('');
  const [team2Logo, setTeam2Logo] = useState('');

  const [seriesName, setSeriesName] = useState('');
  const [format, setFormat] = useState('T20');
  const [venue, setVenue] = useState('');
  const [maxEntriesPerUser, setMaxEntriesPerUser] = useState<number>(5);
  const [totalPool, setTotalPool] = useState<number>(0);

  // Dynamic Question Bank from Database
  const [dbQuestions, setDbQuestions] = useState<any[]>([]);

  useEffect(() => {
    api.getQuestionBank().then((data: any) => {
      if (Array.isArray(data) && data.length > 0) {
        setDbQuestions(data);
      }
    }).catch(console.error);
  }, []);

  const dynamicCategories = useMemo(() => {
    const customFromDb = dbQuestions.filter(dbQ => {
      const staticList = MASTER_QUESTION_BANK.flatMap(c => c.questions);
      return !staticList.some(s => s.shortTitle.toLowerCase() === (dbQ.shortTitle || '').toLowerCase());
    });

    if (customFromDb.length === 0) return MASTER_QUESTION_BANK;

    return [
      {
        category: '⭐ Added Question Bank Categories',
        questions: customFromDb.map(q => ({
          shortTitle: q.shortTitle,
          title: q.title,
          subtitle: q.subtitle || q.title,
          type: q.type || 'PLAYER',
          criteria: q.type || 'PLAYER',
          iconName: q.iconName || 'STAR',
          optionsType: q.optionsType,
          options: q.options
        }))
      },
      ...MASTER_QUESTION_BANK
    ];
  }, [dbQuestions]);

  // Flag Picker Modal State
  const [pickingLogoFor, setPickingLogoFor] = useState<'team1' | 'team2' | null>(null);
  const [logoSearchQuery, setLogoSearchQuery] = useState('');
  const [customLogoInput, setCustomLogoInput] = useState('');

  // Start Date / Time
  const defaultDateTime = () => {
    const d = new Date(Date.now() + 2 * 60 * 60 * 1000);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const hours = String(d.getHours()).padStart(2, '0');
    const mins = String(d.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${mins}`;
  };
  const [startDateTime, setStartDateTime] = useState(defaultDateTime());
  const [currentTime, setCurrentTime] = useState(Date.now());

  // Live countdown clock ticker
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Compute remaining time string
  const getMatchCountdown = () => {
    const startMs = new Date(startDateTime).getTime();
    if (isNaN(startMs)) return 'Invalid Date';
    const diffMs = startMs - currentTime;
    if (diffMs <= 0) return '🔴 Match start time has passed / Live';

    const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    const diffSecs = Math.floor((diffMs % (1000 * 60)) / 1000);

    if (diffHrs >= 24) {
      const days = Math.floor(diffHrs / 24);
      const remHrs = diffHrs % 24;
      return `${days}d ${remHrs}h ${diffMins}m ${diffSecs}s until match starts`;
    }

    return `${String(diffHrs).padStart(2, '0')}h ${String(diffMins).padStart(2, '0')}m ${String(diffSecs).padStart(2, '0')}s until match starts`;
  };

  // Squad Lists (Default blank squads)
  const [squad1, setSquad1] = useState<Player[]>([]);
  const [squad2, setSquad2] = useState<Player[]>([]);

  // 6 Questions Customizable by Admin
  const [customQuestions, setCustomQuestions] = useState<PredictionQuestion[]>(DEFAULT_QUESTIONS);
  const [showQuestionEditor, setShowQuestionEditor] = useState(false);
  const [questionBankModalIndex, setQuestionBankModalIndex] = useState<number | null>(null); // Index of question to swap/replace
  const [questionBankSearch, setQuestionBankSearch] = useState('');

  const [activeSquadTab, setActiveSquadTab] = useState<'team1' | 'team2'>('team1');
  const [newPlayerName, setNewPlayerName] = useState('');
  const [newPlayerRole, setNewPlayerRole] = useState<PlayerRole>('BAT');
  const [bulkPlayerText, setBulkPlayerText] = useState('');
  const [showBulkInput, setShowBulkInput] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Pre-Publish Review Modal State & Active Tab
  const [showPreviewModal, setShowPreviewModal] = useState<boolean>(false);
  const [previewMatchData, setPreviewMatchData] = useState<CricketMatch | null>(null);
  const [previewTab, setPreviewTab] = useState<'fan-lobby' | 'fan-questions' | 'audit'>('fan-lobby');
  const [validationError, setValidationError] = useState<string | null>(null);

  // ---------------------------------------------------------------------------
  // DYNAMIC TOURNAMENT & TEAM/SQUAD AUTO-SAVE REGISTRY (Per User Request)
  // ---------------------------------------------------------------------------
  const [customSavedTournaments, setCustomSavedTournaments] = useState<string[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const saved = localStorage.getItem('superover_custom_tournaments');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [customSavedTeams, setCustomSavedTeams] = useState<Record<string, { name: string; code: string; logoUrl: string; squad: { name: string; shortName: string; role: PlayerRole }[] }>>(() => {
    if (typeof window === 'undefined') return {};
    try {
      const saved = localStorage.getItem('superover_saved_teams_registry');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [savedFeedbackMessage, setSavedFeedbackMessage] = useState<string | null>(null);
  const [teamCategoryFilter, setTeamCategoryFilter] = useState<'ALL' | 'CUSTOM' | 'IPL' | 'EUROPEAN' | 'CPL' | 'INTERNATIONAL'>('ALL');
  const [teamPresetSearch, setTeamPresetSearch] = useState<string>('');

  // Unified Tournaments list (Built-in + Saved Custom + Harvested from allMatches)
  const allAvailableTournaments = useMemo(() => {
    const set = new Set<string>();
    const defaults = [
      'ETPL 2026',
      'CPL 2026',
      'IPL 2026',
      'European T20 Premier League 2026',
      'ICC T20 World Cup 2026',
      'Big Bash League 2026',
      'Pakistan Super League 2026',
      'The Hundred 2026',
      'Caribbean Premier League 2026',
      'International Bilateral Series'
    ];
    defaults.forEach(t => set.add(t));
    customSavedTournaments.forEach(t => t && set.add(t.trim()));
    allMatches.forEach(m => {
      if (m.series && m.series.trim()) set.add(m.series.trim());
    });
    return Array.from(set);
  }, [customSavedTournaments, allMatches]);

  // Unified Teams & Squads dictionary (PRESET_TEAMS + Harvested from allMatches + Saved Custom)
  const allAvailableTeams = useMemo(() => {
    const map: Record<string, { name: string; code: string; logoUrl: string; category?: string; squad: { name: string; shortName: string; role: PlayerRole }[] }> = {
      ...PRESET_TEAMS
    };

    // Harvest from all existing matches in database
    allMatches.forEach(m => {
      if (m.team1?.code && m.squadTeam1 && m.squadTeam1.length > 0) {
        const code = m.team1.code.toUpperCase().trim();
        if (!map[code] || map[code].squad.length === 0) {
          map[code] = {
            name: m.team1.name || code,
            code,
            logoUrl: m.team1.logoUrl || getTeamLogoUrl(code, m.team1.name),
            category: 'Recent',
            squad: m.squadTeam1.map(p => ({
              name: p.name,
              shortName: p.shortName || p.name,
              role: p.role || 'BAT'
            }))
          };
        }
      }
      if (m.team2?.code && m.squadTeam2 && m.squadTeam2.length > 0) {
        const code = m.team2.code.toUpperCase().trim();
        if (!map[code] || map[code].squad.length === 0) {
          map[code] = {
            name: m.team2.name || code,
            code,
            logoUrl: m.team2.logoUrl || getTeamLogoUrl(code, m.team2.name),
            category: 'Recent',
            squad: m.squadTeam2.map(p => ({
              name: p.name,
              shortName: p.shortName || p.name,
              role: p.role || 'BAT'
            }))
          };
        }
      }
    });

    // Merge custom saved teams from localStorage (highest priority)
    Object.entries(customSavedTeams).forEach(([code, data]) => {
      if (data && data.code) {
        map[code.toUpperCase()] = {
          ...data,
          category: 'Saved Custom'
        };
      }
    });

    return map;
  }, [customSavedTeams, allMatches]);

  const saveCustomTournament = (name: string, silent = false) => {
    const trimmed = name.trim();
    if (!trimmed) return;
    setCustomSavedTournaments(prev => {
      if (prev.includes(trimmed)) return prev;
      const next = [trimmed, ...prev];
      try {
        localStorage.setItem('superover_custom_tournaments', JSON.stringify(next));
      } catch {}
      return next;
    });
    if (!silent) {
      setSavedFeedbackMessage(`✅ Tournament "${trimmed}" saved for future match prompts!`);
      setTimeout(() => setSavedFeedbackMessage(null), 3000);
    }
  };

  const saveCustomTeam = (teamObj: { name: string; code: string; logoUrl: string; squad: Player[] }, silent = false) => {
    const code = teamObj.code.trim().toUpperCase();
    const name = teamObj.name.trim();
    if (!code || !name) {
      if (!silent) alert('Please enter both team name and code before saving.');
      return;
    }
    const squadToSave = teamObj.squad.map(p => ({
      name: p.name,
      shortName: p.shortName || p.name,
      role: p.role || 'BAT'
    }));

    setCustomSavedTeams(prev => {
      const next = {
        ...prev,
        [code]: {
          name,
          code,
          logoUrl: teamObj.logoUrl || getTeamLogoUrl(code, name),
          squad: squadToSave
        }
      };
      try {
        localStorage.setItem('superover_saved_teams_registry', JSON.stringify(next));
      } catch {}
      return next;
    });

    if (!silent) {
      setSavedFeedbackMessage(`✅ Saved "${name} (${code})" with ${squadToSave.length} players for future matches!`);
      setTimeout(() => setSavedFeedbackMessage(null), 3500);
    }
  };

  // Auto-detect logo & auto-load squad when team code or name changes
  const handleTeam1Change = (name: string, code: string) => {
    setTeam1Name(name);
    setTeam1Code(code);
    const autoLogo = getTeamLogoUrl(code, name);
    if (autoLogo) setTeam1Logo(autoLogo);

    // If matches a known saved preset team and squad is currently empty, autofill squad
    const matched = allAvailableTeams[code.toUpperCase()] || Object.values(allAvailableTeams).find(t => t.name.toLowerCase() === name.trim().toLowerCase());
    if (matched && matched.squad && matched.squad.length > 0 && squad1.length === 0) {
      setSquad1(
        matched.squad.map((pl, idx) => ({
          id: `p_${matched.code.toLowerCase()}_${idx + 1}`,
          name: pl.name,
          shortName: pl.shortName || pl.name,
          team: matched.code,
          teamName: matched.name,
          role: pl.role || 'BAT',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
          country: matched.name,
          recentForm: ['45', '1/18', '28*'],
          careerStatHighlight: 'Key Player'
        }))
      );
      if (matched.logoUrl && !team1Logo) setTeam1Logo(matched.logoUrl);
    }
  };

  const handleTeam2Change = (name: string, code: string) => {
    setTeam2Name(name);
    setTeam2Code(code);
    const autoLogo = getTeamLogoUrl(code, name);
    if (autoLogo) setTeam2Logo(autoLogo);

    // If matches a known saved preset team and squad is currently empty, autofill squad
    const matched = allAvailableTeams[code.toUpperCase()] || Object.values(allAvailableTeams).find(t => t.name.toLowerCase() === name.trim().toLowerCase());
    if (matched && matched.squad && matched.squad.length > 0 && squad2.length === 0) {
      setSquad2(
        matched.squad.map((pl, idx) => ({
          id: `p_${matched.code.toLowerCase()}_${idx + 1}`,
          name: pl.name,
          shortName: pl.shortName || pl.name,
          team: matched.code,
          teamName: matched.name,
          role: pl.role || 'BAT',
          avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
          country: matched.name,
          recentForm: ['52', '2/22', '41*'],
          careerStatHighlight: 'Key Player'
        }))
      );
      if (matched.logoUrl && !team2Logo) setTeam2Logo(matched.logoUrl);
    }
  };

  // 1-Click Preset Selection for Team 1
  const applyPresetTeam1 = (code: string) => {
    const p = allAvailableTeams[code.toUpperCase()] || Object.values(allAvailableTeams).find(t => t.code.toUpperCase() === code.toUpperCase() || t.name.toLowerCase() === code.toLowerCase());
    if (!p) return;
    setTeam1Name(p.name);
    setTeam1Code(p.code);
    setTeam1Logo(p.logoUrl || getTeamLogoUrl(p.code, p.name));
    if (p.squad && p.squad.length > 0) {
      setSquad1(
        p.squad.map((pl, idx) => ({
          id: `p_${p.code.toLowerCase()}_${idx + 1}`,
          name: pl.name,
          shortName: pl.shortName || pl.name,
          team: p.code,
          teamName: p.name,
          role: pl.role || 'BAT',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
          country: p.name,
          recentForm: ['45', '1/18', '28*'],
          careerStatHighlight: 'Key Player'
        }))
      );
    }
  };

  // 1-Click Preset Selection for Team 2
  const applyPresetTeam2 = (code: string) => {
    const p = allAvailableTeams[code.toUpperCase()] || Object.values(allAvailableTeams).find(t => t.code.toUpperCase() === code.toUpperCase() || t.name.toLowerCase() === code.toLowerCase());
    if (!p) return;
    setTeam2Name(p.name);
    setTeam2Code(p.code);
    setTeam2Logo(p.logoUrl || getTeamLogoUrl(p.code, p.name));
    if (p.squad && p.squad.length > 0) {
      setSquad2(
        p.squad.map((pl, idx) => ({
          id: `p_${p.code.toLowerCase()}_${idx + 1}`,
          name: pl.name,
          shortName: pl.shortName || pl.name,
          team: p.code,
          teamName: p.name,
          role: pl.role || 'BAT',
          avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
          country: p.name,
          recentForm: ['52', '2/22', '41*'],
          careerStatHighlight: 'Key Player'
        }))
      );
    }
  };

  // Select Flag from Modal
  const handleSelectLogo = (item: { name: string; code: string; logoUrl: string }) => {
    if (pickingLogoFor === 'team1') {
      setTeam1Logo(item.logoUrl);
      if (!team1Name || team1Name === 'India') setTeam1Name(item.name);
      if (!team1Code || team1Code === 'IND') setTeam1Code(item.code);
    } else if (pickingLogoFor === 'team2') {
      setTeam2Logo(item.logoUrl);
      if (!team2Name || team2Name === 'Australia') setTeam2Name(item.name);
      if (!team2Code || team2Code === 'AUS') setTeam2Code(item.code);
    }
    setPickingLogoFor(null);
  };

  // Apply Custom URL
  const handleApplyCustomUrl = () => {
    if (!customLogoInput.trim()) return;
    if (pickingLogoFor === 'team1') setTeam1Logo(customLogoInput.trim());
    else if (pickingLogoFor === 'team2') setTeam2Logo(customLogoInput.trim());
    setCustomLogoInput('');
    setPickingLogoFor(null);
  };

  // Add Individual Player
  const handleAddPlayer = () => {
    if (!newPlayerName.trim()) return;
    const teamCode = activeSquadTab === 'team1' ? team1Code : team2Code;
    const teamN = activeSquadTab === 'team1' ? team1Name : team2Name;
    const newP: Player = {
      id: `p_${teamCode.toLowerCase()}_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      name: newPlayerName.trim(),
      shortName: newPlayerName.trim().split(' ').pop() || newPlayerName.trim(),
      team: teamCode,
      teamName: teamN,
      role: newPlayerRole,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      country: teamN,
      recentForm: ['35', '1/15'],
      careerStatHighlight: 'Squad Member'
    };

    if (activeSquadTab === 'team1') {
      setSquad1([...squad1, newP]);
    } else {
      setSquad2([...squad2, newP]);
    }
    setNewPlayerName('');
  };

  // Bulk Add Players
  const handleBulkAdd = () => {
    if (!bulkPlayerText.trim()) return;
    const lines = bulkPlayerText.split('\n').map(l => l.trim()).filter(Boolean);
    const teamCode = activeSquadTab === 'team1' ? team1Code : team2Code;
    const teamN = activeSquadTab === 'team1' ? team1Name : team2Name;

    const newPlayers: Player[] = lines.map((name, idx) => ({
      id: `p_${teamCode.toLowerCase()}_${Date.now()}_${idx}`,
      name,
      shortName: name.split(' ').pop() || name,
      team: teamCode,
      teamName: teamN,
      role: 'BAT',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      country: teamN,
      recentForm: ['25', '1/20'],
      careerStatHighlight: 'Squad Player'
    }));

    if (activeSquadTab === 'team1') {
      setSquad1([...squad1, ...newPlayers]);
    } else {
      setSquad2([...squad2, ...newPlayers]);
    }
    setBulkPlayerText('');
    setShowBulkInput(false);
  };

  // Remove Player
  const handleRemovePlayer = (id: string, team: 'team1' | 'team2') => {
    if (team === 'team1') {
      setSquad1(squad1.filter(p => p.id !== id));
    } else {
      setSquad2(squad2.filter(p => p.id !== id));
    }
  };

  // Update Player Role
  const handleUpdatePlayerRole = (team: 'team1' | 'team2', playerId: string, newRole: PlayerRole) => {
    if (team === 'team1') {
      setSquad1(squad1.map(p => p.id === playerId ? { ...p, role: newRole } : p));
    } else {
      setSquad2(squad2.map(p => p.id === playerId ? { ...p, role: newRole } : p));
    }
  };

  // Update Question in Custom Questions List
  const handleUpdateQuestion = (index: number, field: keyof PredictionQuestion, value: any) => {
    const updated = [...customQuestions];
    updated[index] = { ...updated[index], [field]: value };
    setCustomQuestions(updated);
  };

  // Select Question from Bank for a slot
  const handleSelectQuestionFromBank = (slotIndex: number, bankQuestion: typeof MASTER_QUESTION_BANK[0]['questions'][0]) => {
    const updated = [...customQuestions];
    const found = bankQuestion;
    updated[slotIndex] = {
      ...updated[slotIndex],
      shortTitle: found.shortTitle,
      title: found.title,
      subtitle: found.subtitle,
      type: found.type as any,
      optionsType: found.type === 'PLAYER' ? 'DYNAMIC_SQUAD' : 'FIXED',
      criteria: found.criteria as any,
      iconName: found.iconName as any
    };
    setCustomQuestions(updated);
    setQuestionBankModalIndex(null);
  };

  const handleSelectFromBank = (bankQ: typeof MASTER_QUESTION_BANK[0]['questions'][0]) => {
    if (questionBankModalIndex !== null) {
      handleSelectQuestionFromBank(questionBankModalIndex, bankQ);
    }
  };

  const handleSelectQuestionDropdown = (index: number, selectedShortTitle: string) => {
    const allBankQuestions = dynamicCategories.flatMap(cat => cat.questions);
    const found = allBankQuestions.find(q => q.shortTitle === selectedShortTitle);
    if (!found) return;
    handleSelectQuestionFromBank(index, found);
  };

  // Step 1: Initiate Publish - Validate and Open Match Preview Modal
  const handleInitiatePublish = () => {
    if (!team1Name.trim() || !team2Name.trim()) {
      setValidationError('⚠️ Please enter both Team 1 and Team 2 names before opening preview.');
      setTimeout(() => setValidationError(null), 5000);
      return;
    }

    if (squad1.length === 0 || squad2.length === 0) {
      setValidationError('⚠️ Please ensure both teams have at least 1 player in their squad roster before preview.');
      setTimeout(() => setValidationError(null), 5000);
      return;
    }

    setValidationError(null);
    setPreviewTab('fan-lobby');

    const matchStart = new Date(startDateTime);
    const startTimeIso = isNaN(matchStart.getTime()) 
      ? new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString() 
      : matchStart.toISOString();

    const lockTimeIso = new Date(new Date(startTimeIso).getTime() - 15 * 60 * 1000).toISOString();

    const squad1PlayerNames = squad1.map(p => p.name);
    const squad2PlayerNames = squad2.map(p => p.name);
    const allPlayerNames = [...squad1PlayerNames, ...squad2PlayerNames];

    // Build Questions populated with strictly segregated squad options
    const configuredQuestions = customQuestions.map(q => {
      const titleLower = (q.title || '').toLowerCase();
      const shortTitleLower = (q.shortTitle || '').toLowerCase();
      const subTitleLower = (q.subtitle || '').toLowerCase();

      const isTeam1Strict = titleLower.includes('team 1') || 
                            titleLower.includes('(team 1)') ||
                            shortTitleLower.includes('team 1') ||
                            subTitleLower.includes('team 1');

      const isTeam2Strict = titleLower.includes('team 2') || 
                            titleLower.includes('(team 2)') ||
                            shortTitleLower.includes('team 2') ||
                            subTitleLower.includes('team 2');

      if (q.type === 'TEAM') {
        return {
          ...q,
          optionsType: 'FIXED' as const,
          options: [team1Name.trim() || 'Team 1', team2Name.trim() || 'Team 2']
        };
      }

      if (q.type === 'PLAYER' || q.optionsType === 'DYNAMIC_SQUAD') {
        if (isTeam1Strict) {
          return {
            ...q,
            optionsType: 'DYNAMIC_SQUAD' as const,
            options: squad1PlayerNames
          };
        } else if (isTeam2Strict) {
          return {
            ...q,
            optionsType: 'DYNAMIC_SQUAD' as const,
            options: squad2PlayerNames
          };
        } else {
          return {
            ...q,
            optionsType: 'DYNAMIC_SQUAD' as const,
            options: allPlayerNames
          };
        }
      }

      return q;
    });

    const matchId = `match_${Date.now()}`;
    const constructedMatch: CricketMatch = {
      id: matchId,
      title: `${team1Name.trim()} vs ${team2Name.trim()}`,
      series: seriesName.trim() || 'Featured Series',
      matchNumber: `Match ${allMatches.length + 1}`,
      team1: {
        code: team1Code.trim() || 'T1',
        name: team1Name.trim(),
        shortName: team1Code.trim() || 'T1',
        logoUrl: team1Logo.trim() || getTeamLogoUrl(team1Code, team1Name),
        color: '#FF6B00',
        accentColor: '#FF8800',
        flagOrLogo: '🏏',
      },
      team2: {
        code: team2Code.trim() || 'T2',
        name: team2Name.trim(),
        shortName: team2Code.trim() || 'T2',
        logoUrl: team2Logo.trim() || getTeamLogoUrl(team2Code, team2Name),
        color: '#004C97',
        accentColor: '#00C8FF',
        flagOrLogo: '⚡',
      },
      venue: venue.trim() || 'Cricket Stadium',
      city: venue.split(',')[1]?.trim() || 'Host City',
      startTime: startTimeIso,
      lockTime: lockTimeIso,
      status: 'UPCOMING',
      format: (format || 'T20') as any,
      totalPool: Number(totalPool) || 100000,
      totalEntries: 0,
      entryFees: [25, 50, 100],
      maxEntriesPerUser: Number(maxEntriesPerUser) || 5,
      squadTeam1: squad1.map(p => ({ ...p, team: team1Code.trim(), teamName: team1Name.trim() })),
      squadTeam2: squad2.map(p => ({ ...p, team: team2Code.trim(), teamName: team2Name.trim() })),
      questions: configuredQuestions as QuestionDefinition[],
    };

    setPreviewMatchData(constructedMatch);
    setShowPreviewModal(true);
  };

  // Step 2: Confirm and Publish Match Live to DB
  const handleConfirmPublish = async () => {
    if (!previewMatchData) return;

    setIsSubmitting(true);

    try {
      // Auto-save tournament to registry
      if (seriesName.trim()) {
        saveCustomTournament(seriesName.trim(), true);
      }

      // Auto-save both teams with squad rosters to registry
      if (team1Name.trim() && team1Code.trim()) {
        saveCustomTeam({
          name: team1Name.trim(),
          code: team1Code.trim(),
          logoUrl: team1Logo.trim() || getTeamLogoUrl(team1Code, team1Name),
          squad: squad1
        }, true);
      }

      if (team2Name.trim() && team2Code.trim()) {
        saveCustomTeam({
          name: team2Name.trim(),
          code: team2Code.trim(),
          logoUrl: team2Logo.trim() || getTeamLogoUrl(team2Code, team2Name),
          squad: squad2
        }, true);
      }

      await onCreateMatch(previewMatchData);
      setShowPreviewModal(false);
      setSuccessMessage(`✅ Match "${previewMatchData.title}" successfully created and published! Redirecting to Match Lifecycle...`);

      setTimeout(() => {
        if (onGoToLifecycle) {
          onGoToLifecycle();
        }
      }, 1500);
    } catch (e: any) {
      console.error(e);
      alert('Error creating match: ' + (e.message || 'Unknown error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#080C1D] p-6 rounded-3xl border border-[#1A223E] shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-[#FF6B00]/20 text-[#FF8800] text-[10px] font-black uppercase tracking-wider border border-[#FF6B00]/30">
              Manual Contest Organizer
            </span>
            <span className="text-xs text-slate-400">100% Admin Controlled</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2 mt-1">
            <PlusCircle className="w-6 h-6 text-[#FF8800]" />
            Create Match Manually
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Build your contest with custom team flags, squads, exact start time with live countdown, and custom admin questions from Question Bank.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={handleInitiatePublish}
            className="px-4 py-2 rounded-2xl bg-gradient-to-r from-[#FF6B00] to-[#FFAA00] text-slate-950 text-xs font-black flex items-center gap-1.5 shadow-lg shadow-[#FF6B00]/20 hover:brightness-110 transition-all cursor-pointer"
          >
            <Eye className="w-4 h-4" />
            <span>👁️ Preview Contest on User End</span>
          </button>

          {onGoToLifecycle && (
            <button
              type="button"
              onClick={onGoToLifecycle}
              className="px-4 py-2 rounded-2xl bg-[#131A38] hover:bg-[#1A223E] border border-[#1A223E] text-xs font-bold text-[#FFAA00] flex items-center gap-2 transition-all cursor-pointer"
            >
              <Trophy className="w-4 h-4" />
              <span>Go to Lifecycle →</span>
            </button>
          )}
        </div>
      </div>

      {successMessage && (
        <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 font-bold text-xs flex items-center justify-between shadow-lg animate-pulse">
          <span>{successMessage}</span>
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
        </div>
      )}

      {/* Main Creation Form Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT COLUMN: Match Details & Teams (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Match Settings Card */}
          <div className="p-6 rounded-3xl bg-[#0D122B] border border-[#1A223E] space-y-4 shadow-xl">
            <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
              <Trophy className="w-4 h-4 text-[#FF6B00]" />
              1. Match General Information
            </h3>

            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[11px] font-bold text-slate-400">
                    Series / Tournament Name:
                  </label>
                  <span className="text-[10px] text-slate-500">Auto-saved for future prompts</span>
                </div>
                
                <input
                  type="text"
                  list="tournament-presets-list"
                  value={seriesName}
                  onChange={(e) => setSeriesName(e.target.value)}
                  placeholder="e.g. ETPL 2026, CPL 2026, IPL 2026..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#080C1D] border border-[#1A223E] text-white text-xs font-bold focus:outline-none focus:border-[#FF6B00]"
                />

                <datalist id="tournament-presets-list">
                  {allAvailableTournaments.map((tourn) => (
                    <option key={tourn} value={tourn} />
                  ))}
                </datalist>

                {/* Quick 1-Click Tournament Prompts */}
                <div className="mt-2 flex items-center gap-1.5 flex-wrap">
                  <span className="text-[10px] text-slate-500 font-bold mr-1">Prompts:</span>
                  {allAvailableTournaments.slice(0, 8).map((tourn) => (
                    <button
                      key={tourn}
                      type="button"
                      onClick={() => setSeriesName(tourn)}
                      className={`px-2 py-0.5 rounded-lg text-[10px] font-bold transition-all border ${
                        seriesName.toLowerCase() === tourn.toLowerCase()
                          ? 'bg-[#FF6B00]/20 text-[#FF8800] border-[#FF6B00]/50 font-black'
                          : 'bg-[#080C1D] text-slate-400 hover:text-white border-[#1A223E] hover:border-slate-700'
                      }`}
                    >
                      + {tourn}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-400 block mb-1">
                  Match Format:
                </label>
                <select
                  value={format}
                  onChange={(e) => setFormat(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#080C1D] border border-[#1A223E] text-white text-xs font-bold focus:outline-none focus:border-[#FF6B00]"
                >
                  <option value="T20">T20 (20 Overs)</option>
                  <option value="ODI">ODI (50 Overs)</option>
                  <option value="TEST">TEST Match</option>
                  <option value="T10">T10 (10 Overs)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Date & Time Picker with Real-time Countdown */}
              <div>
                <label className="text-[11px] font-bold text-slate-400 block mb-1">
                  📅 Match Date & Start Time:
                </label>
                <input
                  type="datetime-local"
                  value={startDateTime}
                  onChange={(e) => setStartDateTime(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#080C1D] border border-[#1A223E] text-white text-xs font-mono font-bold focus:outline-none focus:border-[#FF6B00]"
                />
                
                {/* LIVE COUNTDOWN DISPLAY */}
                <div className="mt-2 p-2.5 rounded-xl bg-[#080C1D] border border-amber-500/30 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-400 animate-pulse flex-shrink-0" />
                  <div className="text-[11px] font-mono font-bold text-amber-300 truncate">
                    {getMatchCountdown()}
                  </div>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-400 block mb-1">
                  📍 Venue & City:
                </label>
                <input
                  type="text"
                  value={venue}
                  onChange={(e) => setVenue(e.target.value)}
                  placeholder="e.g. Wankhede Stadium, Mumbai"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#080C1D] border border-[#1A223E] text-white text-xs font-bold focus:outline-none focus:border-[#FF6B00]"
                />
              </div>
            </div>

            {/* Entry Limit Controls */}
            <div className="pt-3 border-t border-[#1A223E]">
              <div>
                <label className="text-[11px] font-bold text-slate-400 block mb-1.5">
                  👥 Max Entries Allowed Per Fan:
                </label>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {[1, 3, 5, 10, 20].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setMaxEntriesPerUser(num)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                        maxEntriesPerUser === num
                          ? 'bg-[#FF6B00] text-slate-950 border-[#FF8800] font-black shadow-md'
                          : 'bg-[#080C1D] text-slate-300 border-[#1A223E] hover:border-slate-700'
                      }`}
                    >
                      {num} {num === 1 ? 'Entry' : 'Entries'}
                    </button>
                  ))}
                  <input
                    type="number"
                    min="1"
                    max="50"
                    value={maxEntriesPerUser}
                    onChange={(e) => setMaxEntriesPerUser(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-16 px-2 py-1.5 rounded-xl bg-[#080C1D] border border-[#1A223E] text-white text-xs font-bold text-center focus:outline-none focus:border-[#FF6B00]"
                    title="Custom max entries"
                  />
                </div>
                <span className="text-[10px] text-slate-400 block mt-1">
                  Limits how many slips one fan can submit for this fixture.
                </span>
              </div>
            </div>
          </div>

          {/* Teams Setup Card */}
          <div className="p-6 rounded-3xl bg-[#0D122B] border border-[#1A223E] space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#FFAA00]" />
                2. Competing Teams & Squad Presets
              </h3>
              {savedFeedbackMessage && (
                <span className="text-xs font-bold text-emerald-400 animate-pulse bg-emerald-950/40 px-2.5 py-1 rounded-lg border border-emerald-500/30">
                  {savedFeedbackMessage}
                </span>
              )}
            </div>

            {/* Quick Preset Selector Section with Category Filter & Search */}
            <div className="space-y-2.5 p-3.5 rounded-2xl bg-[#080C1D] border border-[#1A223E]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                  ⚡ 1-Click Load Team & Squad to {activeSquadTab === 'team1' ? 'Team 1' : 'Team 2'}:
                </span>

                <div className="relative">
                  <Search className="w-3 h-3 text-slate-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={teamPresetSearch}
                    onChange={(e) => setTeamPresetSearch(e.target.value)}
                    placeholder="Search preset team..."
                    className="pl-7 pr-2.5 py-1 rounded-lg bg-[#0D122B] border border-[#1A223E] text-white text-[11px] placeholder:text-slate-500 focus:outline-none focus:border-[#FF6B00] w-36 sm:w-44"
                  />
                </div>
              </div>

              {/* Category Filter Pills */}
              <div className="flex items-center gap-1.5 flex-wrap text-[10px]">
                {[
                  { id: 'ALL', label: 'All Teams' },
                  { id: 'CUSTOM', label: '⭐ Saved / Recent' },
                  { id: 'EUROPEAN', label: '🌍 European T20' },
                  { id: 'CPL', label: '🌴 CPL' },
                  { id: 'IPL', label: '🏆 IPL' },
                  { id: 'INTERNATIONAL', label: '🏏 International' },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setTeamCategoryFilter(cat.id as any)}
                    className={`px-2 py-0.5 rounded-md font-bold transition-all ${
                      teamCategoryFilter === cat.id
                        ? 'bg-gradient-to-r from-[#FF6B00] to-[#FF8800] text-slate-950 font-black shadow-sm'
                        : 'bg-[#131A38] text-slate-400 hover:text-white border border-[#1A223E]'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Preset Chips */}
              <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto custom-scrollbar pt-1">
                {Object.entries(allAvailableTeams)
                  .filter(([code, t]) => {
                    if (teamPresetSearch) {
                      const q = teamPresetSearch.toLowerCase();
                      if (!code.toLowerCase().includes(q) && !t.name.toLowerCase().includes(q)) return false;
                    }
                    if (teamCategoryFilter === 'CUSTOM') return t.category === 'Saved Custom' || t.category === 'Recent';
                    if (teamCategoryFilter === 'EUROPEAN') return ['ROT', 'GLA', 'BW', 'AF'].includes(code);
                    if (teamCategoryFilter === 'CPL') return ['BR', 'TKR', 'SKNP', 'GAW'].includes(code);
                    if (teamCategoryFilter === 'IPL') return ['CSK', 'MI', 'RCB', 'KKR'].includes(code);
                    if (teamCategoryFilter === 'INTERNATIONAL') return ['IND', 'AUS', 'ENG', 'SA', 'PAK', 'NZ', 'WI'].includes(code);
                    return true;
                  })
                  .map(([code, t]) => (
                    <button
                      key={code}
                      type="button"
                      onClick={() => {
                        if (activeSquadTab === 'team1') applyPresetTeam1(code);
                        else applyPresetTeam2(code);
                      }}
                      className="px-2 py-1 rounded-lg bg-[#0D122B] hover:bg-[#131A38] text-slate-300 hover:text-white border border-[#1A223E] hover:border-[#FF6B00]/40 text-[11px] font-bold transition-all flex items-center gap-1.5 shadow-sm"
                      title={`${t.name} • ${t.squad?.length || 0} players`}
                    >
                      <img 
                        src={t.logoUrl || getTeamLogoUrl(code, t.name)} 
                        alt={code} 
                        className="w-3.5 h-3.5 object-contain rounded-sm"
                        onError={(e) => { (e.target as HTMLImageElement).src = 'https://flagcdn.com/w160/un.png'; }}
                      />
                      <span>+ {code}</span>
                      <span className="text-[9px] text-slate-500 font-mono">({t.squad?.length || 0})</span>
                    </button>
                  ))}
              </div>
            </div>

            {/* Datalists for Input Autocomplete */}
            <datalist id="team-name-suggestions">
              {Object.values(allAvailableTeams).map((t) => (
                <option key={t.code + t.name} value={t.name}>{t.code} ({t.squad?.length || 0} players)</option>
              ))}
            </datalist>

            <datalist id="team-code-suggestions">
              {Object.values(allAvailableTeams).map((t) => (
                <option key={t.code} value={t.code}>{t.name}</option>
              ))}
            </datalist>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {/* Team 1 Box */}
              <div className="p-4 rounded-2xl bg-[#080C1D] border border-[#FF6B00]/30 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-[#FF8800] uppercase tracking-wider">TEAM 1</span>
                  
                  {/* Flag / Logo Clicker */}
                  <button
                    type="button"
                    onClick={() => setPickingLogoFor('team1')}
                    className="p-1 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700 flex items-center gap-1.5 transition-all group"
                    title="Click to change flag or logo"
                  >
                    <img
                      src={team1Logo || getTeamLogoUrl(team1Code, team1Name)}
                      alt={team1Code}
                      className="w-7 h-7 object-contain rounded"
                      onError={(e) => { (e.target as HTMLImageElement).src = 'https://flagcdn.com/w160/un.png'; }}
                    />
                    <span className="text-[10px] text-slate-400 group-hover:text-white font-bold pr-1">Change</span>
                  </button>
                </div>

                <div>
                  <label className="text-[10px] text-slate-400 font-bold block mb-1">Full Name:</label>
                  <input
                    type="text"
                    list="team-name-suggestions"
                    value={team1Name}
                    onChange={(e) => handleTeam1Change(e.target.value, team1Code)}
                    placeholder="e.g. Rotterdam Dockers"
                    className="w-full px-3 py-2 rounded-xl bg-[#0D122B] border border-[#1A223E] text-white text-xs font-bold"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-slate-400 font-bold block mb-1">Code (3-4 Letters):</label>
                  <input
                    type="text"
                    list="team-code-suggestions"
                    value={team1Code}
                    onChange={(e) => handleTeam1Change(team1Name, e.target.value.toUpperCase())}
                    placeholder="e.g. ROT"
                    className="w-full px-3 py-2 rounded-xl bg-[#0D122B] border border-[#1A223E] text-white text-xs font-bold uppercase"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-slate-400 font-bold block mb-1">Flag / Logo URL:</label>
                  <input
                    type="text"
                    value={team1Logo}
                    onChange={(e) => setTeam1Logo(e.target.value)}
                    placeholder="https://flagcdn.com/w160/in.png"
                    className="w-full px-3 py-1.5 rounded-lg bg-[#0D122B] border border-[#1A223E] text-slate-300 text-[11px] font-mono"
                  />
                </div>

                {/* Save Team 1 to Presets */}
                <button
                  type="button"
                  onClick={() => saveCustomTeam({ name: team1Name, code: team1Code, logoUrl: team1Logo, squad: squad1 })}
                  className="w-full py-1.5 rounded-xl bg-[#131A38] hover:bg-[#1A223E] text-slate-300 hover:text-white border border-[#1A223E] text-[11px] font-bold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Save className="w-3 h-3 text-[#FFAA00]" />
                  <span>Save Team 1 & Squad ({squad1.length}) for Future</span>
                </button>
              </div>

              {/* Team 2 Box */}
              <div className="p-4 rounded-2xl bg-[#080C1D] border border-[#00C8FF]/30 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-[#00C8FF] uppercase tracking-wider">TEAM 2</span>
                  
                  {/* Flag / Logo Clicker */}
                  <button
                    type="button"
                    onClick={() => setPickingLogoFor('team2')}
                    className="p-1 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700 flex items-center gap-1.5 transition-all group"
                    title="Click to change flag or logo"
                  >
                    <img
                      src={team2Logo || getTeamLogoUrl(team2Code, team2Name)}
                      alt={team2Code}
                      className="w-7 h-7 object-contain rounded"
                      onError={(e) => { (e.target as HTMLImageElement).src = 'https://flagcdn.com/w160/un.png'; }}
                    />
                    <span className="text-[10px] text-slate-400 group-hover:text-white font-bold pr-1">Change</span>
                  </button>
                </div>

                <div>
                  <label className="text-[10px] text-slate-400 font-bold block mb-1">Full Name:</label>
                  <input
                    type="text"
                    list="team-name-suggestions"
                    value={team2Name}
                    onChange={(e) => handleTeam2Change(e.target.value, team2Code)}
                    placeholder="e.g. Glasgow Cosmics"
                    className="w-full px-3 py-2 rounded-xl bg-[#0D122B] border border-[#1A223E] text-white text-xs font-bold"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-slate-400 font-bold block mb-1">Code (3-4 Letters):</label>
                  <input
                    type="text"
                    list="team-code-suggestions"
                    value={team2Code}
                    onChange={(e) => handleTeam2Change(team2Name, e.target.value.toUpperCase())}
                    placeholder="e.g. GLA"
                    className="w-full px-3 py-2 rounded-xl bg-[#0D122B] border border-[#1A223E] text-white text-xs font-bold uppercase"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-slate-400 font-bold block mb-1">Flag / Logo URL:</label>
                  <input
                    type="text"
                    value={team2Logo}
                    onChange={(e) => setTeam2Logo(e.target.value)}
                    placeholder="https://flagcdn.com/w160/au.png"
                    className="w-full px-3 py-1.5 rounded-lg bg-[#0D122B] border border-[#1A223E] text-slate-300 text-[11px] font-mono"
                  />
                </div>

                {/* Save Team 2 to Presets */}
                <button
                  type="button"
                  onClick={() => saveCustomTeam({ name: team2Name, code: team2Code, logoUrl: team2Logo, squad: squad2 })}
                  className="w-full py-1.5 rounded-xl bg-[#131A38] hover:bg-[#1A223E] text-slate-300 hover:text-white border border-[#1A223E] text-[11px] font-bold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Save className="w-3 h-3 text-sky-400" />
                  <span>Save Team 2 & Squad ({squad2.length}) for Future</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Squad Builder, Admin Questions & Publish Action (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Squad Management Card */}
          <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-[#0D122B] border border-[#1A223E] space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
                <Users className="w-4 h-4 text-purple-400" />
                3. Squad Rosters
              </h3>
              <button
                type="button"
                onClick={() => setShowBulkInput(!showBulkInput)}
                className="text-[11px] text-[#FF8800] hover:underline font-bold"
              >
                {showBulkInput ? '← Cancel Bulk' : '+ Bulk Paste'}
              </button>
            </div>

            {/* Squad Switch Tabs */}
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setActiveSquadTab('team1')}
                className={`py-2 px-2.5 sm:py-2.5 sm:px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 sm:gap-2 ${
                  activeSquadTab === 'team1'
                    ? 'bg-gradient-to-r from-[#FF6B00] to-[#FF8800] text-slate-950 shadow-md shadow-[#FF6B00]/30'
                    : 'bg-[#080C1D] text-slate-400 hover:text-white border border-[#1A223E]'
                }`}
              >
                <img 
                  src={team1Logo || getTeamLogoUrl(team1Code, team1Name)} 
                  alt={team1Code} 
                  className="w-4 h-4 object-contain rounded-sm shrink-0"
                  onError={(e) => { (e.target as HTMLImageElement).src = 'https://flagcdn.com/w160/un.png'; }}
                />
                <span className="truncate">{team1Code || 'Team 1'} ({squad1.length})</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveSquadTab('team2')}
                className={`py-2 px-2.5 sm:py-2.5 sm:px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 sm:gap-2 ${
                  activeSquadTab === 'team2'
                    ? 'bg-gradient-to-r from-[#FF6B00] to-[#FF8800] text-slate-950 shadow-md shadow-[#FF6B00]/30'
                    : 'bg-[#080C1D] text-slate-400 hover:text-white border border-[#1A223E]'
                }`}
              >
                <img 
                  src={team2Logo || getTeamLogoUrl(team2Code, team2Name)} 
                  alt={team2Code} 
                  className="w-4 h-4 object-contain rounded-sm shrink-0"
                  onError={(e) => { (e.target as HTMLImageElement).src = 'https://flagcdn.com/w160/un.png'; }}
                />
                <span className="truncate">{team2Code || 'Team 2'} ({squad2.length})</span>
              </button>
            </div>

            {/* Bulk Add Box */}
            {showBulkInput ? (
              <div className="p-3.5 rounded-2xl bg-[#080C1D] border border-[#1A223E] space-y-2">
                <label className="text-[10px] text-slate-400 font-bold block">
                  Paste player names (1 per line). You can add role e.g. "Jasprit Bumrah (BOWL)":
                </label>
                <textarea
                  rows={5}
                  value={bulkPlayerText}
                  onChange={(e) => setBulkPlayerText(e.target.value)}
                  placeholder="Rohit Sharma (BAT)&#10;Virat Kohli (BAT)&#10;Jasprit Bumrah (BOWL)"
                  className="w-full px-3 py-2 rounded-xl bg-[#0D122B] border border-[#1A223E] text-white text-xs font-mono focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleBulkAdd}
                  className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-black text-xs transition-colors"
                >
                  Import Players to {activeSquadTab === 'team1' ? team1Code : team2Code}
                </button>
              </div>
            ) : (
              /* Add Single Player Input - Fully Mobile Responsive */
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  value={newPlayerName}
                  onChange={(e) => setNewPlayerName(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') handleAddPlayer(); }}
                  placeholder="Player Name (e.g. Hardik Pandya)"
                  className="w-full sm:flex-1 min-w-0 px-3 py-2.5 rounded-xl bg-[#080C1D] border border-[#1A223E] text-white text-xs font-bold focus:outline-none focus:border-[#FF6B00]"
                />
                <div className="flex gap-2 w-full sm:w-auto">
                  <select
                    value={newPlayerRole}
                    onChange={(e) => setNewPlayerRole(e.target.value as any)}
                    className="flex-1 sm:w-20 px-2 py-2.5 rounded-xl bg-[#080C1D] border border-[#1A223E] text-white text-xs font-bold cursor-pointer"
                  >
                    <option value="BAT">BAT</option>
                    <option value="BOWL">BOWL</option>
                    <option value="AR">AR</option>
                    <option value="WK">WK</option>
                  </select>
                  <button
                    type="button"
                    onClick={handleAddPlayer}
                    className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-[#FF6B00] hover:bg-[#FF8800] text-slate-950 font-black text-xs transition-all flex items-center justify-center gap-1.5 shrink-0"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add</span>
                  </button>
                </div>
              </div>
            )}

            {/* Current Selected Squad Player List */}
            <div className="max-h-52 overflow-y-auto space-y-1.5 pr-1 scrollbar-thin">
              {(activeSquadTab === 'team1' ? squad1 : squad2).map((p, idx) => (
                <div
                  key={p.id || idx}
                  className="p-2 rounded-xl bg-[#080C1D] border border-[#1A223E] flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="w-5 h-5 rounded-lg bg-slate-800 text-slate-400 font-bold text-[10px] flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <span className="font-bold text-white truncate">{p.name}</span>
                    <span className={`px-1.5 py-0.5 rounded text-[9px] font-black shrink-0 ${
                      p.role === 'BAT' ? 'bg-sky-500/20 text-sky-400' :
                      p.role === 'BOWL' ? 'bg-rose-500/20 text-rose-400' :
                      p.role === 'WK' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
                    }`}>
                      {p.role}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleRemovePlayer(p.id, activeSquadTab)}
                    className="p-1 text-slate-500 hover:text-rose-400 transition-colors shrink-0"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            {/* 4. ADMIN CONTEST QUESTIONS WITH QUESTION BANK PICKER */}
            <div className="p-3.5 sm:p-4 rounded-2xl bg-[#080C1D] border border-[#1A223E] space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                <div>
                  <span className="text-[11px] font-black text-[#FF8800] uppercase tracking-wider flex items-center gap-1.5">
                    <HelpCircle className="w-4 h-4 text-[#FFAA00]" />
                    4. Admin Contest Questions ({customQuestions.length})
                  </span>
                  <p className="text-[10px] text-slate-400 mt-0.5">
                    Pick standard questions from the Question Bank dropdown for each slot.
                  </p>
                </div>
                
                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    type="button"
                    onClick={() => setCustomQuestions(DEFAULT_QUESTIONS)}
                    className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] font-bold border border-slate-700 flex items-center gap-1 transition-all"
                    title="Reset to default 6 questions"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Reset 6</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setQuestionBankModalIndex(null)}
                    className="px-2.5 py-1 rounded-lg bg-purple-600/30 hover:bg-purple-600/50 text-purple-300 border border-purple-500/40 text-[10px] font-black flex items-center gap-1 transition-all"
                  >
                    <Database className="w-3 h-3" />
                    <span>Browse Bank</span>
                  </button>
                </div>
              </div>

              {/* Questions List with Direct Dropdown Selector */}
              <div className="space-y-3 pt-1">
                {customQuestions.map((q, idx) => {
                  const titleLower = (q.title || '').toLowerCase();
                  const shortTitleLower = (q.shortTitle || '').toLowerCase();
                  const isTeam1 = titleLower.includes('team 1') || shortTitleLower.includes('team 1');
                  const isTeam2 = titleLower.includes('team 2') || shortTitleLower.includes('team 2');

                  return (
                    <div key={q.id || idx} className="p-3 rounded-2xl bg-[#0D122B] border border-[#1A223E] space-y-2.5 text-xs hover:border-[#FF6B00]/40 transition-colors">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded-md bg-[#FF6B00]/20 text-[#FF8800] font-black text-[10px] flex items-center justify-center border border-[#FF6B00]/30 shrink-0">
                            #{idx + 1}
                          </span>
                          <span className="text-[11px] font-black text-white">Question #{idx + 1}:</span>
                        </div>

                        {/* Player / Team Scope Badge */}
                        <div className="self-start sm:self-auto">
                          {isTeam1 ? (
                            <span className="px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[9px] font-black tracking-wide flex items-center gap-1">
                              🏏 {team1Code || 'Team 1'} Players Only
                            </span>
                          ) : isTeam2 ? (
                            <span className="px-2 py-0.5 rounded-md bg-sky-500/20 text-sky-300 border border-sky-500/30 text-[9px] font-black tracking-wide flex items-center gap-1">
                              🏏 {team2Code || 'Team 2'} Players Only
                            </span>
                          ) : q.type === 'TEAM' ? (
                            <span className="px-2 py-0.5 rounded-md bg-purple-500/20 text-purple-300 border border-purple-500/30 text-[9px] font-black tracking-wide flex items-center gap-1">
                              🏆 Team Selection
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[9px] font-black tracking-wide flex items-center gap-1">
                              👥 Both Teams Players
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Dropdown Selector */}
                      <div>
                        <select
                          value={q.shortTitle || ''}
                          onChange={(e) => handleSelectQuestionDropdown(idx, e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-[#080C1D] border border-[#1A223E] text-white text-xs font-bold focus:outline-none focus:border-[#FF6B00] cursor-pointer"
                        >
                          <option value="" disabled>-- Select Question from Bank --</option>
                          {dynamicCategories.map((group) => (
                            <optgroup key={group.category} label={group.category} className="bg-[#0D122B] text-[#FFAA00] font-bold">
                              {group.questions.map((bankQ) => (
                                <option key={bankQ.shortTitle} value={bankQ.shortTitle} className="text-white bg-[#080C1D] font-medium">
                                  {bankQ.shortTitle} — {bankQ.title}
                                </option>
                              ))}
                            </optgroup>
                          ))}
                        </select>
                      </div>

                      {/* Title & Subtitle detail fields */}
                      <div className="space-y-1.5 pt-1">
                        <div>
                          <label className="text-[10px] text-slate-400 font-bold block mb-0.5">Question Display Title:</label>
                          <input
                            type="text"
                            value={q.title}
                            onChange={(e) => handleUpdateQuestion(idx, 'title', e.target.value)}
                            placeholder="Question Title"
                            className="w-full px-2.5 py-1.5 rounded-lg bg-[#080C1D] border border-[#1A223E] text-white text-xs font-bold focus:outline-none focus:border-[#FF6B00]"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] text-slate-400 font-bold block mb-0.5">Subtitle / Scoring Criteria:</label>
                          <input
                            type="text"
                            value={q.subtitle || ''}
                            onChange={(e) => handleUpdateQuestion(idx, 'subtitle', e.target.value)}
                            placeholder="Subtitle / Criteria description"
                            className="w-full px-2.5 py-1.5 rounded-lg bg-[#080C1D] border border-[#1A223E] text-slate-300 text-[11px] focus:outline-none focus:border-[#FF6B00]"
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* PREVIEW STEP BUTTON (STEP 2 OF 2) */}
            <div className="space-y-2 pt-2">
              {validationError && (
                <div className="p-3.5 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold flex items-center gap-2.5 animate-pulse">
                  <AlertCircle className="w-4 h-4 shrink-0 text-amber-400" />
                  <span>{validationError}</span>
                </div>
              )}

              <button
                type="button"
                onClick={handleInitiatePublish}
                disabled={isSubmitting}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#FF6B00] via-[#FF8800] to-[#FFAA00] hover:brightness-110 active:scale-[0.99] text-slate-950 font-black text-sm flex items-center justify-center gap-2.5 shadow-xl shadow-[#FF6B00]/30 transition-all disabled:opacity-50 group cursor-pointer"
                id="btn-publish-manual-match"
              >
                <Eye className="w-5 h-5 text-slate-950 group-hover:scale-110 transition-transform" />
                <span>👁️ Preview Contest on User End (Step 2 of 2)</span>
                <ArrowRight className="w-4 h-4 text-slate-950 ml-1" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 font-medium">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                <span>Clarify questions, inspect squad options &amp; edit before going live to fans</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* QUESTION BANK PICKER POPUP MODAL */}
      {questionBankModalIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#050816]/90 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-[#0D122B] border border-[#1A223E] rounded-3xl shadow-2xl overflow-hidden my-auto p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-[#1A223E] pb-4">
              <div>
                <h3 className="text-base font-black text-white flex items-center gap-2">
                  <Database className="w-5 h-5 text-purple-400" />
                  Select Question from Bank for Slot #{questionBankModalIndex + 1}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Click any question to slot it directly into your match contest.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setQuestionBankModalIndex(null)}
                className="p-1.5 rounded-xl bg-[#080C1D] text-slate-400 hover:text-white border border-[#1A223E]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search Bank */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={questionBankSearch}
                onChange={(e) => setQuestionBankSearch(e.target.value)}
                placeholder="Search question bank (e.g. bowler, catches, striker, sixes, runs)..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#080C1D] border border-[#1A223E] text-white text-xs font-bold focus:outline-none focus:border-purple-400"
              />
            </div>

            {/* Question Categories Grid */}
            <div className="max-h-80 overflow-y-auto space-y-4 pr-1 scrollbar-thin">
              {dynamicCategories.map((cat) => {
                const filteredQuestions = cat.questions.filter(q => 
                  !questionBankSearch.trim() ||
                  q.title.toLowerCase().includes(questionBankSearch.toLowerCase()) ||
                  q.shortTitle.toLowerCase().includes(questionBankSearch.toLowerCase()) ||
                  q.subtitle.toLowerCase().includes(questionBankSearch.toLowerCase())
                );

                if (filteredQuestions.length === 0) return null;

                return (
                  <div key={cat.category} className="space-y-2">
                    <span className="text-[11px] font-black text-[#FFAA00] uppercase tracking-wider block">
                      {cat.category}
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {filteredQuestions.map((q) => (
                        <div
                          key={q.shortTitle}
                          onClick={() => handleSelectFromBank(q)}
                          className="p-3 rounded-2xl bg-[#080C1D] hover:bg-[#131A38] border border-[#1A223E] hover:border-purple-500/50 cursor-pointer flex flex-col justify-between gap-2 transition-all group"
                        >
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-[10px] font-black text-[#FF8800] uppercase tracking-wider">
                                {q.shortTitle}
                              </span>
                              <span className="px-1.5 py-0.2 rounded bg-purple-500/20 text-purple-300 text-[9px] font-mono uppercase">
                                {q.type}
                              </span>
                            </div>
                            <h4 className="text-xs font-bold text-white group-hover:text-purple-300 transition-colors">
                              {q.title}
                            </h4>
                            <p className="text-[10px] text-slate-400 mt-0.5">
                              {q.subtitle}
                            </p>
                          </div>

                          <div className="pt-1.5 border-t border-[#1A223E] flex items-center justify-between">
                            <span className="text-[9px] text-slate-500 font-bold">Options: {q.type === 'PLAYER' ? 'Squad Roster' : 'Team 1 / Team 2'}</span>
                            <span className="text-[10px] font-black text-purple-400 group-hover:underline">Select →</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* FLAG & LOGO PICKER POPUP MODAL */}
      {pickingLogoFor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#050816]/90 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-[#0D122B] border border-[#1A223E] rounded-3xl shadow-2xl overflow-hidden my-auto p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-[#1A223E] pb-4">
              <div>
                <h3 className="text-base font-black text-white flex items-center gap-2">
                  <Globe className="w-5 h-5 text-[#FF6B00]" />
                  Pick Flag or Logo for {pickingLogoFor === 'team1' ? team1Name || 'Team 1' : team2Name || 'Team 2'}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Select an official IPL crest, international country flag, or paste a custom image URL.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setPickingLogoFor(null)}
                className="p-1.5 rounded-xl bg-[#080C1D] text-slate-400 hover:text-white border border-[#1A223E]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search Box */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={logoSearchQuery}
                onChange={(e) => setLogoSearchQuery(e.target.value)}
                placeholder="Search by country or team name (e.g. Australia, CSK, Pakistan, England)..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#080C1D] border border-[#1A223E] text-white text-xs font-bold focus:outline-none focus:border-[#FF6B00]"
              />
            </div>

            {/* Custom Logo URL Paste Input */}
            <div className="p-3.5 rounded-2xl bg-[#080C1D] border border-[#1A223E] flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-slate-400 flex-shrink-0" />
              <input
                type="text"
                value={customLogoInput}
                onChange={(e) => setCustomLogoInput(e.target.value)}
                placeholder="Or paste any custom Image/Flag URL here..."
                className="flex-1 bg-transparent text-white text-xs font-mono focus:outline-none placeholder:text-slate-500"
              />
              <button
                type="button"
                onClick={handleApplyCustomUrl}
                disabled={!customLogoInput.trim()}
                className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-[#FF6B00] to-[#FF8800] text-slate-950 font-black text-xs disabled:opacity-40"
              >
                Apply URL
              </button>
            </div>

            {/* Catalog Grid */}
            <div className="max-h-80 overflow-y-auto space-y-4 pr-1 scrollbar-thin">
              {PRESET_LOGO_CATALOG.map((cat) => {
                const filteredTeams = cat.teams.filter(t => 
                  !logoSearchQuery.trim() || 
                  t.name.toLowerCase().includes(logoSearchQuery.toLowerCase()) || 
                  t.code.toLowerCase().includes(logoSearchQuery.toLowerCase())
                );

                if (filteredTeams.length === 0) return null;

                return (
                  <div key={cat.category} className="space-y-2">
                    <span className="text-[11px] font-black text-[#FFAA00] uppercase tracking-wider block">
                      {cat.category}
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {filteredTeams.map((team) => (
                        <button
                          key={team.name + team.code}
                          type="button"
                          onClick={() => handleSelectLogo(team)}
                          className="p-2.5 rounded-xl bg-[#080C1D] hover:bg-[#131A38] border border-[#1A223E] hover:border-[#FF6B00]/50 flex items-center gap-2.5 text-left transition-all group"
                        >
                          <img
                            src={team.logoUrl}
                            alt={team.name}
                            className="w-7 h-7 object-contain rounded flex-shrink-0 group-hover:scale-110 transition-transform"
                            onError={(e) => { (e.target as HTMLImageElement).src = 'https://flagcdn.com/w160/un.png'; }}
                          />
                          <div className="min-w-0 flex-1">
                            <div className="font-bold text-white text-xs truncate group-hover:text-[#FF8800]">
                              {team.name}
                            </div>
                            <div className="text-[10px] text-slate-500 font-mono">
                              {team.code}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* MATCH PREVIEW & VERIFICATION MODAL BEFORE PUBLISHING (USER-END SIMULATION) */}
      {showPreviewModal && previewMatchData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#050816]/90 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-3xl bg-[#0D122B] border border-indigo-500/40 rounded-3xl shadow-2xl overflow-hidden my-auto flex flex-col max-h-[94vh]">
            
            {/* Modal Header */}
            <div className="p-4 sm:p-6 border-b border-[#1A223E] bg-[#080C1D] flex-shrink-0">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-gradient-to-r from-[#FF6B00]/20 to-[#FFAA00]/20 text-[#FFAA00] text-[10px] font-black uppercase border border-[#FFAA00]/30 flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      STEP 2: PRE-PUBLISH USER-END PREVIEW
                    </span>
                    <span className="text-xs text-slate-400 font-mono">Format: {previewMatchData.format}</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-black text-white font-display">
                    Preview Match as Seen by Fans
                  </h3>
                  <p className="text-xs text-slate-400">
                    Verify how the lobby card, question choices, and squad rosters appear before going live.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setShowPreviewModal(false)}
                  className="w-9 h-9 rounded-xl bg-[#131A38] hover:bg-[#1A223E] text-slate-400 hover:text-white border border-[#1A223E] flex items-center justify-center transition-colors flex-shrink-0"
                  title="Close and edit"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Checklist & Verification Status Strip */}
              <div className="mt-3.5 p-2.5 rounded-xl bg-[#0D122B] border border-emerald-500/30 flex flex-wrap items-center justify-between gap-2 text-[11px] font-bold text-emerald-300">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{previewMatchData.team1.code} vs {previewMatchData.team2.code}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Squads: {previewMatchData.squadTeam1.length} &amp; {previewMatchData.squadTeam2.length} Players</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>6 Prediction Questions Ready</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Lock: 15m Before Toss</span>
                </div>
              </div>

              {/* View Switcher Tabs */}
              <div className="flex items-center gap-2 mt-3 pt-3 border-t border-[#1A223E]/80 overflow-x-auto pb-0.5 scrollbar-none">
                {[
                  { id: 'fan-lobby', label: '📱 1. Fan Lobby Card', icon: Smartphone },
                  { id: 'fan-questions', label: '🎯 2. Fan Prediction Screen (6 Questions)', icon: Sparkles },
                  { id: 'audit', label: '📋 3. Squad & Metadata Audit', icon: Layers },
                ].map((tab) => {
                  const Icon = tab.icon;
                  const isActive = previewTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setPreviewTab(tab.id as any)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 whitespace-nowrap ${
                        isActive
                          ? 'bg-gradient-to-r from-[#FF6B00] to-[#FF8800] text-slate-950 shadow-md shadow-[#FF6B00]/30'
                          : 'bg-[#131A38] text-slate-400 hover:text-white border border-[#1A223E]'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1 scrollbar-thin">
              
              {/* TAB 1: FAN LOBBY CARD PREVIEW */}
              {previewTab === 'fan-lobby' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-1 border-b border-[#1A223E]">
                    <span className="text-xs font-black text-slate-300 uppercase tracking-wider flex items-center gap-2">
                      <Smartphone className="w-4 h-4 text-[#FF6B00]" />
                      How this match card appears to fans in the Lobby:
                    </span>
                    <span className="text-[11px] text-emerald-400 font-bold bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/30">
                      Live Preview
                    </span>
                  </div>

                  {/* Realistic Match Card Replica */}
                  <div className="max-w-md mx-auto rounded-2xl border border-[#FF6B00]/35 bg-gradient-to-b from-[#0D122B] to-[#080B1A] shadow-2xl overflow-hidden">
                    {/* Top Banner */}
                    <div className="px-4 py-2.5 bg-[#080C1D] border-b border-[#1A223E] flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2 truncate">
                        <span className="px-1.5 py-0.5 rounded bg-[#131A38] text-[#FF6B00] font-black text-[10px] uppercase border border-[#FF6B00]/20">
                          {previewMatchData.format}
                        </span>
                        <span className="font-bold text-slate-200 truncate">
                          {previewMatchData.series}
                        </span>
                      </div>

                      <span className="px-2 py-0.5 rounded-full bg-[#FF6B00]/15 text-[#FFAA00] border border-[#FF6B00]/30 font-bold text-[11px] flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#FF6B00]" />
                        <span>{getMatchCountdown()}</span>
                      </span>
                    </div>

                    {/* Team Clash Banner */}
                    <div className="p-5">
                      <div className="flex items-center justify-between gap-4">
                        {/* Team 1 */}
                        <div className="flex-1 flex flex-col items-center text-center">
                          <div className="w-14 h-14 rounded-2xl p-1 flex items-center justify-center relative border bg-[#0D122B] border-slate-700 shadow-inner">
                            <img 
                              src={previewMatchData.team1.logoUrl} 
                              alt={previewMatchData.team1.code} 
                              className="w-10 h-10 object-contain rounded-lg"
                              onError={(e) => { (e.target as HTMLImageElement).src = 'https://flagcdn.com/w160/un.png'; }}
                            />
                            <div className="absolute -bottom-1 text-[9px] font-black px-1.5 py-0.2 rounded bg-amber-500 text-slate-950 shadow-sm">
                              {previewMatchData.team1.code}
                            </div>
                          </div>
                          <span className="text-xs font-bold text-white mt-2 line-clamp-1">
                            {previewMatchData.team1.name}
                          </span>
                        </div>

                        {/* VS Badge */}
                        <div className="flex flex-col items-center">
                          <span className="w-8 h-8 rounded-full bg-[#131A38] border border-[#1A223E] text-[#FF6B00] text-xs font-black flex items-center justify-center shadow-md">
                            VS
                          </span>
                          <span className="text-[10px] text-slate-400 font-medium mt-1">
                            {new Date(previewMatchData.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>

                        {/* Team 2 */}
                        <div className="flex-1 flex flex-col items-center text-center">
                          <div className="w-14 h-14 rounded-2xl p-1 flex items-center justify-center relative border bg-[#0D122B] border-slate-700 shadow-inner">
                            <img 
                              src={previewMatchData.team2.logoUrl} 
                              alt={previewMatchData.team2.code} 
                              className="w-10 h-10 object-contain rounded-lg"
                              onError={(e) => { (e.target as HTMLImageElement).src = 'https://flagcdn.com/w160/un.png'; }}
                            />
                            <div className="absolute -bottom-1 text-[9px] font-black px-1.5 py-0.2 rounded bg-indigo-500 text-white shadow-sm">
                              {previewMatchData.team2.code}
                            </div>
                          </div>
                          <span className="text-xs font-bold text-white mt-2 line-clamp-1">
                            {previewMatchData.team2.name}
                          </span>
                        </div>
                      </div>

                      {/* Venue & Prize Pool */}
                      <div className="mt-4 pt-3 border-t border-[#1A223E] flex items-center justify-between text-xs">
                        <div className="flex items-center gap-1.5 text-slate-400 text-[11px] truncate max-w-[180px]">
                          <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                          <span className="truncate">{previewMatchData.venue}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] text-slate-400 block">Total Pool</span>
                          <span className="text-emerald-400 font-black font-mono">₹{previewMatchData.totalPool.toLocaleString()}</span>
                        </div>
                      </div>

                      {/* Entry Fee Chips Simulation */}
                      <div className="mt-3 flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5">
                          {[25, 50, 100].map((fee) => (
                            <span key={fee} className="px-2 py-1 rounded-lg bg-[#131A38] text-slate-300 text-[10px] font-bold border border-[#1A223E]">
                              ₹{fee}
                            </span>
                          ))}
                        </div>
                        <span className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#FF6B00] to-[#FF8800] text-slate-950 font-black text-xs shadow-md">
                          Enter Match →
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: FAN PREDICTION SCREEN (6 QUESTIONS PREVIEW) */}
              {previewTab === 'fan-questions' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-1 border-b border-[#1A223E]">
                    <span className="text-xs font-black text-slate-300 uppercase tracking-wider flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#FF6B00]" />
                      Interactive 6 Prediction Questions (Test Dropdown Options):
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono">
                      6 of 6 Questions Active
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {previewMatchData.questions.map((q, idx) => {
                      const titleLower = (q.title || '').toLowerCase();
                      const shortTitleLower = (q.shortTitle || '').toLowerCase();
                      const subTitleLower = (q.subtitle || '').toLowerCase();

                      const isTeam1Strict = titleLower.includes('team 1') || titleLower.includes('(team 1)') || shortTitleLower.includes('team 1') || subTitleLower.includes('team 1');
                      const isTeam2Strict = titleLower.includes('team 2') || titleLower.includes('(team 2)') || shortTitleLower.includes('team 2') || subTitleLower.includes('team 2');

                      let scopeBadge = '👥 Both Teams Players';
                      let scopeBg = 'bg-teal-500/15 text-teal-300 border-teal-500/30';

                      if (q.type === 'TEAM') {
                        scopeBadge = '🏆 Pick Team Winner';
                        scopeBg = 'bg-amber-500/15 text-amber-300 border-amber-500/30';
                      } else if (isTeam1Strict) {
                        scopeBadge = `🏏 ${previewMatchData.team1.code} Squad Only`;
                        scopeBg = 'bg-orange-500/15 text-orange-300 border-orange-500/30';
                      } else if (isTeam2Strict) {
                        scopeBadge = `⚡ ${previewMatchData.team2.code} Squad Only`;
                        scopeBg = 'bg-blue-500/15 text-blue-300 border-blue-500/30';
                      }

                      return (
                        <div
                          key={q.id || idx}
                          className="p-4 rounded-2xl bg-[#080C1D] border border-[#1A223E] space-y-3 shadow-lg"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <span className="w-6 h-6 rounded-lg bg-[#FF6B00]/20 text-[#FF8800] text-xs font-black flex items-center justify-center border border-[#FF6B00]/40">
                                #{idx + 1}
                              </span>
                              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${scopeBg}`}>
                                {scopeBadge}
                              </span>
                            </div>

                            <span className="text-[10px] text-slate-400 font-mono">
                              {q.options?.length || 0} Options
                            </span>
                          </div>

                          <div>
                            <h4 className="text-xs font-black text-white">{q.title}</h4>
                            <p className="text-[11px] text-slate-400 mt-0.5">{q.subtitle || 'Standard contest criteria'}</p>
                          </div>

                          {/* Real Test Dropdown for Admin to Inspect Squad List */}
                          <div className="pt-2 border-t border-[#131A38]">
                            <label className="text-[10px] text-slate-500 font-bold block mb-1">
                              Fan Selection Dropdown ({q.options?.length || 0} choices):
                            </label>
                            <select
                              defaultValue=""
                              className="w-full px-3 py-2 rounded-xl bg-[#0D122B] border border-[#1A223E] text-slate-200 text-xs font-bold focus:outline-none focus:border-[#FF6B00]"
                            >
                              <option value="" disabled>-- Click to inspect fan options --</option>
                              {q.options?.map((opt, optIdx) => (
                                <option key={optIdx} value={opt} className="bg-[#080C1D] text-white">
                                  {opt}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* TAB 3: SQUAD & METADATA AUDIT */}
              {previewTab === 'audit' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-1 border-b border-[#1A223E]">
                    <span className="text-xs font-black text-slate-300 uppercase tracking-wider flex items-center gap-2">
                      <Layers className="w-4 h-4 text-purple-400" />
                      Full Match Settings &amp; Squad Rosters Audit:
                    </span>
                  </div>

                  {/* Metadata Table */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                    <div className="p-3 rounded-xl bg-[#080C1D] border border-[#1A223E]">
                      <span className="text-[10px] text-slate-400 uppercase font-bold block">Series</span>
                      <span className="text-white font-bold truncate block">{previewMatchData.series}</span>
                    </div>
                    <div className="p-3 rounded-xl bg-[#080C1D] border border-[#1A223E]">
                      <span className="text-[10px] text-slate-400 uppercase font-bold block">Start Time</span>
                      <span className="text-white font-mono font-bold block truncate">
                        {new Date(previewMatchData.startTime).toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <div className="p-3 rounded-xl bg-[#080C1D] border border-[#1A223E]">
                      <span className="text-[10px] text-slate-400 uppercase font-bold block">Lock Time</span>
                      <span className="text-amber-400 font-mono font-bold block">15 Min Prior</span>
                    </div>
                    <div className="p-3 rounded-xl bg-[#080C1D] border border-[#1A223E]">
                      <span className="text-[10px] text-slate-400 uppercase font-bold block">Prize Pool</span>
                      <span className="text-emerald-400 font-mono font-bold block">₹{previewMatchData.totalPool.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Side-by-side Squad Rosters */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Team 1 Squad */}
                    <div className="p-4 rounded-2xl bg-[#080C1D] border border-[#FF6B00]/30 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <img src={previewMatchData.team1.logoUrl} alt="" className="w-5 h-5 object-contain" />
                          <span className="font-black text-white text-xs">{previewMatchData.team1.name} ({previewMatchData.team1.code})</span>
                        </div>
                        <span className="px-2 py-0.5 rounded bg-[#FF6B00]/20 text-[#FFAA00] text-[10px] font-bold font-mono">
                          {previewMatchData.squadTeam1.length} Players
                        </span>
                      </div>

                      <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1 scrollbar-thin">
                        {previewMatchData.squadTeam1.map((p, pIdx) => (
                          <div key={p.id || pIdx} className="px-2.5 py-1.5 rounded-lg bg-[#0D122B] border border-[#1A223E] flex items-center justify-between text-xs">
                            <span className="font-bold text-white">{pIdx + 1}. {p.name}</span>
                            <span className="px-1.5 py-0.5 rounded bg-slate-800 text-[9px] font-mono font-bold text-slate-300">{p.role}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Team 2 Squad */}
                    <div className="p-4 rounded-2xl bg-[#080C1D] border border-[#00C8FF]/30 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <img src={previewMatchData.team2.logoUrl} alt="" className="w-5 h-5 object-contain" />
                          <span className="font-black text-white text-xs">{previewMatchData.team2.name} ({previewMatchData.team2.code})</span>
                        </div>
                        <span className="px-2 py-0.5 rounded bg-sky-500/20 text-sky-400 text-[10px] font-bold font-mono">
                          {previewMatchData.squadTeam2.length} Players
                        </span>
                      </div>

                      <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1 scrollbar-thin">
                        {previewMatchData.squadTeam2.map((p, pIdx) => (
                          <div key={p.id || pIdx} className="px-2.5 py-1.5 rounded-lg bg-[#0D122B] border border-[#1A223E] flex items-center justify-between text-xs">
                            <span className="font-bold text-white">{pIdx + 1}. {p.name}</span>
                            <span className="px-1.5 py-0.5 rounded bg-slate-800 text-[9px] font-mono font-bold text-slate-300">{p.role}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer CTA Buttons */}
            <div className="p-4 sm:p-5 border-t border-[#1A223E] bg-[#080C1D] flex flex-col sm:flex-row items-center justify-between gap-3 flex-shrink-0">
              <button
                type="button"
                onClick={() => setShowPreviewModal(false)}
                className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-[#131A38] hover:bg-[#1A223E] text-slate-200 hover:text-white text-xs font-black flex items-center justify-center gap-2 border border-[#1A223E] transition-all cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>← Back &amp; Edit Details (Fix Mistakes)</span>
              </button>

              <button
                type="button"
                onClick={handleConfirmPublish}
                disabled={isSubmitting}
                className="w-full sm:w-auto px-7 py-3 rounded-2xl bg-gradient-to-r from-[#FF6B00] via-[#FF8800] to-[#FFAA00] hover:brightness-110 active:scale-[0.99] text-slate-950 font-black text-sm flex items-center justify-center gap-2.5 shadow-xl shadow-[#FF6B00]/30 transition-all disabled:opacity-50 cursor-pointer"
              >
                <Flame className="w-5 h-5 fill-current" />
                <span>{isSubmitting ? 'Publishing Live...' : '🔥 🚀 Confirm &amp; Publish Live to Fans'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
