import { readFileSync, writeFileSync } from 'fs';

// Read the JSON file
const data = JSON.parse(readFileSync('temp.json', 'utf-8'));

// Extract teams array
const teams = data.data.eventByCode.teams.filter(
  (t: any) => t.team.quickStats !== null
);

// Sort by each of the 4 metrics (by rank - lower is better)
const sortedByTot = [...teams].sort((a, b) => 
  a.team.quickStats.tot.rank - b.team.quickStats.tot.rank
);

const sortedByAuto = [...teams].sort((a, b) => 
  a.team.quickStats.auto.rank - b.team.quickStats.auto.rank
);

const sortedByDc = [...teams].sort((a, b) => 
  a.team.quickStats.dc.rank - b.team.quickStats.dc.rank
);

const sortedByEg = [...teams].sort((a, b) => 
  a.team.quickStats.eg.rank - b.team.quickStats.eg.rank
);

// Output as separate JSON files
writeFileSync('sorted_by_tot.json', JSON.stringify(sortedByTot, null, 2));
writeFileSync('sorted_by_auto.json', JSON.stringify(sortedByAuto, null, 2));
writeFileSync('sorted_by_dc.json', JSON.stringify(sortedByDc, null, 2));
writeFileSync('sorted_by_eg.json', JSON.stringify(sortedByEg, null, 2));

console.log('Created 4 sorted JSON files:');
console.log('- sorted_by_tot.json (sorted by total rank)');
console.log('- sorted_by_auto.json (sorted by auto rank)');
console.log('- sorted_by_dc.json (sorted by dc rank)');
console.log('- sorted_by_eg.json (sorted by eg rank)');
