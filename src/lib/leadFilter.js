const fs = require('fs');
const path = require('path');

// Target the Desktop folders we created
const INCOMING_DIR = path.join(process.env.USERPROFILE, 'Desktop/PES_Operations/incoming_scrapes');
const VALIDATED_DIR = path.join(process.env.USERPROFILE, 'Desktop/PES_Operations/validated_leads');

// Strict exclusions and matches defined in your corporate strategy
const BANNED_KEYWORDS = ['solar', 'wind', 'turbine', 'hydro', 'photovoltaic', 'chp', 'renewable'];
const ALLOWED_KEYWORDS = ['electrical', 'troubleshooting', 'remodel', 'construction', 'lighting', 'ev', 'charger', 'panel', 'service'];

function processRawScrapes() {
    if (!fs.existsSync(INCOMING_DIR)) {
        console.log("Incoming folder not found.");
        return;
    }

    const files = fs.readdirSync(INCOMING_DIR);
    
    if (files.length === 0) {
        console.log("No new files found in incoming_scrapes.");
        return;
    }
    
    files.forEach(file => {
        if (!file.endsWith('.json')) return;
        
        const filePath = path.join(INCOMING_DIR, file);
        const rawData = fs.readFileSync(filePath, 'utf8');
        const bid = JSON.parse(rawData);
        
        const bidText = `${bid.title} ${bid.description}`.toLowerCase();
        
        // Safety Check: Instantly purge banned renewable projects
        const containsBanned = BANNED_KEYWORDS.some(word => bidText.includes(word));
        if (containsBanned) {
            console.log(`\x1b[31m[REJECTED]: "${bid.title}" flagged for renewable scope exclusion. Deleting file.\x1b[0m`);
            fs.unlinkSync(filePath); 
            return;
        }
        
        // Target Match: Check if it fits core commercial/residential scope
        const isTargetScope = ALLOWED_KEYWORDS.some(word => bidText.includes(word));
        if (isTargetScope) {
            // Ensure validated output directory exists
            if (!fs.existsSync(VALIDATED_DIR)) fs.mkdirSync(VALIDATED_DIR, { recursive: true });
            
            const destinationPath = path.join(VALIDATED_DIR, `LEAD_${file}`);
            fs.writeFileSync(destinationPath, JSON.stringify(bid, null, 2));
            console.log(`\x1b[32m[VALIDATED LEAD]: "${bid.title}" moved securely to PES Operations Hub.\x1b[0m`);
            fs.unlinkSync(filePath);
        }
    });
}

processRawScrapes();
