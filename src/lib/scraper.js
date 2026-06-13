const fs = require('fs');
const path = require('path');

const TARGET_DIR = path.join(process.env.USERPROFILE, 'Desktop/PES_Operations/incoming_scrapes');

const mockMunicipalFeed = [
  {
    id: "MUNI-2026-1014",
    agency: "City of Oklahoma City and Trusts",
    title: "Lincoln Park Golf Course - Maintenance Building Electrical Service Upgrade",
    description: "Emergency installation of a 400A commercial service panel. Includes complete breakdown of existing structural components, code-compliant conduit installation, and branch breaker panel configuration.",
    source_portal: "BidNet Direct",
    date_scraped: "2026-06-13"
  },
  {
    id: "MUNI-2026-1015",
    agency: "OMES Central Purchasing (State of OK)",
    title: "OKC Agency Complex - Facility Wind Turbine Integration Block-B",
    description: "Procurement, architectural mounting, and structural tie-in of secondary micro wind turbines to supply auxiliary renewable power grids.",
    source_portal: "State Solicitations Portal",
    date_scraped: "2026-06-13"
  },
  {
    id: "MUNI-2026-1016",
    agency: "Moore Public Schools",
    title: "Central Elementary - Classroom Lighting Overhaul & Remodel",
    description: "Retrofitting 42 classrooms with low-voltage energy-efficient LED ballast arrays. Contractor must pull required commercial municipal permits and follow absolute NEC requirements.",
    source_portal: "Suburban School Procurement Board",
    date_scraped: "2026-06-13"
  }
];

function fetchIncomingSolicitations() {
  console.log("Connecting to OKC Metropolitan procurement syndication channels...");
  
  if (!fs.existsSync(TARGET_DIR)) {
    fs.mkdirSync(TARGET_DIR, { recursive: true });
  }

  let count = 0;
  mockMunicipalFeed.forEach(solicitation => {
    const fileName = `feed_${solicitation.id}.json`;
    const fullOutputPath = path.join(TARGET_DIR, fileName);
    
    fs.writeFileSync(fullOutputPath, JSON.stringify(solicitation, null, 2));
    count++;
  });

  console.log(`Successfully ingested and cached ${count} raw solicitation files into incoming operations folder.`);
}

fetchIncomingSolicitations();
