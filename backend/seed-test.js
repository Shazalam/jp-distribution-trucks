const http = require('http');

const trucks = [
  {
    title: "Hilux Revo Adventure",
    brand: "Toyota",
    model: "Hilux Revo",
    year: 2025,
    price: 42800,
    condition: "New",
    type: "Import",
    description: "The Hilux Revo Adventure is engineered for remote exploration and self-sustained travel across extreme terrain. Featuring a 2.8L turbo diesel engine, reinforced suspension, and premium overland-ready accessories.",
    features: ["2.8L Turbo Diesel", "6-Speed Auto", "4x4 Drivetrain", "Overland Package", "LED Light Bar"],
    images: ["https://res.cloudinary.com/dd8a5dpnh/image/upload/f_auto,q_auto/v1781498076/jp-distribution/trucks/cards/truck-1.png"],
    stockStatus: "Available",
    status: "Published"
  },
  {
    title: "Hilux Travo Expedition",
    brand: "Toyota",
    model: "Hilux Travo",
    year: 2025,
    price: 48500,
    condition: "New",
    type: "Import",
    description: "The Travo Expedition is the ultimate long-range vehicle for crossing continents. Built with crawl control, heavy-duty suspension, and integrated canopy systems for self-sufficient travel.",
    features: ["2.8L Turbo Diesel", "6-Speed Manual", "4x4 w/ Crawl Control", "Expedition Canopy", "Dual Battery System"],
    images: ["https://res.cloudinary.com/dd8a5dpnh/image/upload/f_auto,q_auto/v1781498078/jp-distribution/trucks/cards/truck-2.png"],
    stockStatus: "Available",
    status: "Published"
  },
  {
    title: "Hilux Vigo Overland",
    brand: "Toyota",
    model: "Hilux Vigo",
    year: 2024,
    price: 36900,
    condition: "New",
    type: "Import",
    description: "The classic Vigo Overland combines legendary reliability with modern overland capability. Perfect for farm, fleet, and adventure use across any terrain.",
    features: ["2.5L D-4D Diesel", "5-Speed Manual", "4x4 Standard", "Steel Bullbar", "All-Terrain Tires"],
    images: ["https://res.cloudinary.com/dd8a5dpnh/image/upload/f_auto,q_auto/v1781498080/jp-distribution/trucks/cards/truck-3.png"],
    stockStatus: "Available",
    status: "Published"
  },
  {
    title: "Hilux Fleet Edition",
    brand: "Toyota",
    model: "Hilux Fleet",
    year: 2025,
    price: 29900,
    condition: "New",
    type: "Standard",
    description: "The Fleet Edition is optimized for large-scale commercial deployments. Cost-effective, durable, and backed by standardized maintenance parts for maximum uptime.",
    features: ["2.4L Diesel", "6-Speed Manual", "4x2 Standard", "Heavy Duty Leaf Springs", "Fleet GPS Ready"],
    images: ["https://res.cloudinary.com/dd8a5dpnh/image/upload/f_auto,q_auto/v1781498081/jp-distribution/trucks/cards/truck-4.png"],
    stockStatus: "Available",
    status: "Published"
  },
  {
    title: "Hilux Black Edition",
    brand: "Toyota",
    model: "Hilux Black",
    year: 2025,
    price: 45000,
    condition: "New",
    type: "Custom Build",
    description: "The Black Edition is a premium custom build featuring blacked-out trim, sport suspension, and exclusive interior upgrades. A statement vehicle for those who demand more.",
    features: ["2.8L Turbo Diesel", "6-Speed Auto", "4x4 Drivetrain", "Blacked-Out Trim", "Sport Suspension", "Premium Interior"],
    images: ["https://res.cloudinary.com/dd8a5dpnh/image/upload/f_auto,q_auto/v1781498071/jp-distribution/trucks/cards/black-edition.png"],
    stockStatus: "Available",
    status: "Published"
  },
  {
    title: "Hilux Desert Runner",
    brand: "Toyota",
    model: "Hilux Desert",
    year: 2025,
    price: 52000,
    condition: "New",
    type: "Custom Build",
    description: "The Desert Runner is built for extreme off-road performance. Fox Racing shocks, reinforced skid plates, and a race-inspired roll cage make this the ultimate dune machine.",
    features: ["2.8L Turbo Diesel", "6-Speed Auto", "4x4 w/ Locking Diffs", "Fox Racing Shocks", "Roll Cage", "Skid Plates"],
    images: ["https://res.cloudinary.com/dd8a5dpnh/image/upload/f_auto,q_auto/v1781498047/jp-distribution/custom-builds/cards/desert-runner.png"],
    stockStatus: "Available",
    status: "Published"
  },
  {
    title: "Hilux Nomad Camper",
    brand: "Toyota",
    model: "Hilux Nomad",
    year: 2025,
    price: 58500,
    condition: "New",
    type: "Custom Build",
    description: "The Nomad Camper is a fully self-contained mobile living solution. Rooftop tent, integrated kitchen, solar power, and freshwater system — your home on wheels.",
    features: ["2.8L Turbo Diesel", "6-Speed Auto", "4x4 Drivetrain", "Rooftop Tent", "Solar Power System", "Integrated Kitchen", "Freshwater Tank"],
    images: ["https://res.cloudinary.com/dd8a5dpnh/image/upload/f_auto,q_auto/v1781498075/jp-distribution/trucks/cards/nomad-edition.png"],
    stockStatus: "Available",
    status: "Published"
  },
  {
    title: "Hilux Utility Pro",
    brand: "Toyota",
    model: "Hilux Utility",
    year: 2025,
    price: 32500,
    condition: "New",
    type: "Standard",
    description: "The Utility Pro is a no-nonsense workhorse built for construction sites, farms, and commercial operations. Maximum payload, minimum downtime.",
    features: ["2.4L Diesel", "6-Speed Auto", "4x2 Standard", "Heavy Duty Suspension", "Toolbox Package"],
    images: ["https://res.cloudinary.com/dd8a5dpnh/image/upload/f_auto,q_auto/v1781498040/jp-distribution/custom-builds/cards/build-1.png"],
    stockStatus: "Available",
    status: "Published"
  }
];

let completed = 0;

trucks.forEach((truck, i) => {
  const data = JSON.stringify(truck);
  const options = {
    hostname: 'localhost',
    port: 5000,
    path: '/api/cms/trucks',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(data),
    },
  };

  const req = http.request(options, (res) => {
    let body = '';
    res.on('data', (chunk) => body += chunk);
    res.on('end', () => {
      completed++;
      const parsed = JSON.parse(body);
      if (parsed.success) {
        console.log(`✅ [${completed}/${trucks.length}] Created: ${truck.title}`);
      } else {
        console.log(`❌ [${completed}/${trucks.length}] Failed: ${truck.title} - ${parsed.message}`);
      }
      if (completed === trucks.length) {
        console.log('\n🎉 Seeding complete! All trucks inserted.');
      }
    });
  });

  req.on('error', (e) => console.error(`Error seeding ${truck.title}:`, e.message));
  req.write(data);
  req.end();
});
