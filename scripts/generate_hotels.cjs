const fs = require("fs");
const path = require("path");

const hotels = [];

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const sampleNames = [
  "Grand Palace Hotel",
  "Ocean View Resort",
  "City Comfort Inn",
  "Royal Orchid Suites",
  "Mountain Peak Retreat",
  "Sunshine Bay Hotel",
  "Palm Breeze Resort",
  "Blue Lagoon Hotel",
  "Emerald Stay Suites",
  "Regal Crown Hotel",
  "Seaside Pearl Resort",
  "Urban Nest Hotel",
  "Green Leaf Residency",
  "Silver Star Inn",
  "Golden Horizon Resort",
  "Skyline Comfort Hotel",
  "Lotus Bloom Suites",
  "Tropical Paradise Resort",
  "Moonlight Residency",
  "Diamond City Inn"
];

const sampleLocations = [
  "Chennai",
  "Goa",
  "Bangalore",
  "Mumbai",
  "Delhi",
  "Hyderabad",
  "Pune",
  "Kolkata"
];

const sampleImages = [
  "https://picsum.photos/800/500?random=1",
  "https://picsum.photos/800/500?random=2",
  "https://picsum.photos/800/500?random=3",
  "https://picsum.photos/800/500?random=4",
  "https://picsum.photos/800/500?random=5"
];

for (let i = 0; i < 20; i++) {
  hotels.push({
    id: i + 1,
    name: sampleNames[i],
    location: sampleLocations[random(0, sampleLocations.length - 1)],
    price: random(1500, 9000),
    image: sampleImages[random(0, sampleImages.length - 1)]
  });
}

const outputPath = path.join(__dirname, "../public/hotels.json");

fs.writeFileSync(outputPath, JSON.stringify(hotels, null, 2));

console.log("✔ hotels.json created successfully!");
