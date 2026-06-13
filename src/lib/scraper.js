const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const TARGET_DIR = path.join(process.env.USERPROFILE, 'Desktop/PES_Operations/incoming_scrapes');

/**
 * Normalizes incoming raw data streams captured from official 
 * municipal notification networks or unified email ingest points.
 */
function ingestExternalBidStream(rawPayload) {
  if (!rawPayload || typeof rawPayload !== 'object') {
    console.error("[ERROR]: Invalid incoming data block format.");
    return;
  }

  // Ensure target ingestion workspace directory is present
  if (!fs.existsSync(TARGET_DIR)) {
    fs.mkdirSync(TARGET_DIR, { recursive: true });
  }

  // Generate a deterministic hash signature based on the title to avoid processing duplicates
  const hashSignature = crypto.createHash('md5').update(rawPayload.title).digest('hex').substring(0, 8);
  const formattedFileName = `live_feed_${hashSignature}.json`;
  const fullDestinationPath = path.join(TARGET_DIR, formattedFileName);

  const normalizedBid = {
    id: rawPayload.solicitation_number || `OKC-LIVE-${hashSignature.toUpperCase()}`,
    agency: rawPayload.owner_agency || "Unknown Regional Agency",
    title: rawPayload.title,
    description: rawPayload.scope_of_work || rawPayload.description || "",
    source_portal: rawPayload.platform_source || "Vendor Portal Stream",
    date_scraped: new Date().toISOString().split('T')[0]
  };

  try {
    fs.writeFileSync(fullDestinationPath, JSON.stringify(normalizedBid, null, 2));
    console.log(`[INGESTED]: Cached raw data file for: "${normalizedBid.title}"`);
  } catch (err) {
    console.error(`[ERROR]: Failed writing payload data to operations space: ${err.message}`);
  }
}

// SIMULATION: Simulating incoming network packets received via official notifications
const realWorldIncomingStream = [
  {
    solicitation_number: "2026-B-OKC-904",
    owner_agency: "City of Oklahoma City / Public Works",
    title: "Overholser Ranger Station - Interior Commercial Remodel & Panel Upgrade",
    scope_of_work: "Provide all materials, labor, and equipment required to complete the facility remodel. Demolish old wiring layouts, mount new architectural conduit runs, and install modern electrical panels up to local code standard.",
    platform_source: "BidNet Direct (OKC Partner Gateway)"
  },
  {
    solicitation_number: "2026-OMES-881",
    owner_agency: "State of Oklahoma - Central Purchasing",
    title: "Capital Complex Maintenance Grounds - Photovoltaic Array Infrastructure",
    scope_of_work: "Procurement, framing, and installation of rooftop solar panel mounting grids and localized renewable grid tie-ins across the main maintenance facility layout.",
    platform_source: "OMES Supplier Portal"
  }
];

console.log("Initializing secure local operations intake receiver...");
realWorldIncomingStream.forEach(bidPacket => ingestExternalBidStream(bidPacket));
console.log("Intake stream processing completed.");
