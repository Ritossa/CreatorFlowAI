import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // --- Mock Database ---
  const menu = [
    // Hladna predjela
    { id: 1, name: "Istarski pršut i sir", price: 12, category: "Hladna predjela", description: "Vrhunski pršut rezan rukom, ovčji sir s otoka Paga ili Istre", istrian: true, vegan: false, allergens: ["Laktoza"], locations: ["Rovinj", "Pula"] },
    { id: 13, name: "Carpaccio od tikvica", price: 9, category: "Hladna predjela", description: "Tanko rezane istarske tikvice s emulzijom od limuna i maslinovog ulja Červar", istrian: true, vegan: true, allergens: [], locations: ["Rovinj", "Pula"] },
    { id: 9, name: "Salata s ovčjim sirom", price: 10, category: "Hladna predjela", description: "Miješana sezonska salata s komadićima istarskog ovčjeg sira", istrian: true, vegan: false, allergens: ["Laktoza"], locations: ["Rovinj", "Pula"] },
    { id: 25, name: "Rovinjska plata", price: 15, category: "Hladna predjela", description: "Specijalitet Rovinja: inćuni, sardele i pašteta od bakalara", istrian: true, vegan: false, allergens: ["Riba"], locations: ["Rovinj"] },
    
    // Topla predjela
    { id: 6, name: "Maneštra od bobići", price: 8, category: "Topla predjela", description: "Gusta juha od kukuruza, graha i suhog mesa", istrian: true, vegan: false, allergens: ["Gluten"], locations: ["Rovinj", "Pula"] },
    { id: 12, name: "Veganska Maneštra", price: 7, category: "Topla predjela", description: "Tradicionalna maneštra od povrća i bobića bez mesa", istrian: true, vegan: true, allergens: [], locations: ["Rovinj", "Pula"] },
    { id: 2, name: "Fuži s tartufima", price: 24, category: "Topla predjela", description: "Domaći fuži s crnim istarskim tartufima i maslacem", istrian: true, vegan: false, allergens: ["Gluten", "Laktoza", "Jaja"], locations: ["Rovinj", "Pula"] },
    
    // Glavno jelo
    { id: 3, name: "Odrezak od boškarina", price: 28, category: "Glavno jelo", description: "Vrhunski odrezak autohtonog istarskog goveda u umaku od terana", istrian: true, vegan: false, allergens: ["Sulfiti"], locations: ["Rovinj", "Pula"] },
    { id: 5, name: "Pljukanci sa šparogama", price: 18, category: "Glavno jelo", description: "Tradicionalna tjestenina s divljim istarskim šparogama i pršutom", istrian: true, vegan: false, allergens: ["Gluten", "Jaja"], locations: ["Rovinj", "Pula"] },
    { id: 14, name: "Rižoto s crnim tartufima (Vegan)", price: 22, category: "Glavno jelo", description: "Kremasti rižoto s istarskim tartufima pripremljen s biljnim maslacem", istrian: true, vegan: true, allergens: [], locations: ["Rovinj", "Pula"] },
    { id: 15, name: "Pečeno povrće s aromatičnim biljem", price: 14, category: "Glavno jelo", description: "Sezonsko istarsko povrće pečeno s ružmarinom, kaduljom i češnjakom", istrian: true, vegan: true, allergens: [], locations: ["Rovinj", "Pula"] },
    { id: 11, name: "Bura burger", price: 15, category: "Glavno jelo", description: "Burger s istarskom govedinom, pancetom i domaćim umakom", istrian: false, vegan: false, allergens: ["Gluten", "Laktoza", "Sezam"], locations: ["Rovinj", "Pula"] },
    { id: 26, name: "Pulska arena peka", price: 30, category: "Glavno jelo", description: "Janjetina ispod peke s krumpirom, pripremljena po receptu iz okolice Pule", istrian: true, vegan: false, allergens: [], locations: ["Pula"] },
    
    // Deserti
    { id: 8, name: "Kroštule s medom", price: 6, category: "Deserti", description: "Tradicionalno prženo tijesto posuto šećerom i lokalnim medom", istrian: true, vegan: false, allergens: ["Gluten", "Jaja"], locations: ["Rovinj", "Pula"] },
    { id: 16, name: "Sorbet od limuna i kadulje", price: 7, category: "Deserti", description: "Osvježavajući veganski desert od istarskih limuna i divlje kadulje", istrian: true, vegan: true, allergens: [], locations: ["Rovinj", "Pula"] },
    { id: 17, name: "Čokoladni tart s maslinovim uljem", price: 9, category: "Deserti", description: "Gusta tamna čokolada s dodatkom ekstradjevičanskog maslinovog ulja i cvijeta soli", istrian: true, vegan: false, allergens: ["Gluten", "Laktoza", "Jaja"], locations: ["Rovinj", "Pula"] },
    { id: 18, name: "Lava cake s tartufima", price: 11, category: "Deserti", description: "Topla čokoladna rapsodija s blagom notom crnog tartufa", istrian: true, vegan: false, allergens: ["Gluten", "Laktoza", "Jaja"], locations: ["Rovinj", "Pula"] },
    
    // Vina
    { id: 4, name: "Istarska Malvazija", price: 35, category: "Vina", description: "Vrhunsko bijelo vino, svježe i mineralno, berba 2023", istrian: true, vegan: true, allergens: ["Sulfiti"], locations: ["Rovinj", "Pula"] },
    { id: 7, name: "Istarski Teran", price: 38, category: "Vina", description: "Snažno crno vino, karakteristične rubinske boje", istrian: true, vegan: true, allergens: ["Sulfiti"], locations: ["Rovinj", "Pula"] },
    { id: 10, name: "Biska poluboca", price: 15, category: "Vina", description: "Domaća rakija od imele, tradicionalna istarska receptura", istrian: true, vegan: true, allergens: [], locations: ["Rovinj", "Pula"] },

    // Glavno jelo - dodatak pašte
    { id: 19, name: "Domaći njoki s boškarinom", price: 21, category: "Glavno jelo", description: "Ručno rađeni njoki u gustom šugu od autohtonog istarskog goveda", istrian: true, vegan: false, allergens: ["Gluten", "Jaja", "Laktoza"], locations: ["Rovinj", "Pula"] },
    { id: 20, name: "Ravioli s krumpirom i kaduljom", price: 17, category: "Glavno jelo", description: "Istarski ravioli punjeni krumpirom na smeđem maslacu s hrskavom kaduljom", istrian: true, vegan: false, allergens: ["Gluten", "Jaja", "Laktoza"], locations: ["Rovinj", "Pula"] },

    // Kokteli
    { id: 21, name: "Istrian Mule", price: 12, category: "Kokteli", description: "Domaća travarica, ginger beer, limeta i svježi krastavac", istrian: true, vegan: true, allergens: [], locations: ["Rovinj", "Pula"] },
    { id: 22, name: "Teranino Fizz", price: 10, category: "Kokteli", description: "Teranino liker, pjenušac i svježe bobičasto voće", istrian: true, vegan: true, allergens: ["Sulfiti"], locations: ["Rovinj", "Pula"] },
    { id: 23, name: "Medica Sour", price: 11, category: "Kokteli", description: "Istarska medica, limunov sok i bjelanjak za savršenu teksturu", istrian: true, vegan: false, allergens: ["Jaja"], locations: ["Rovinj", "Pula"] },
    { id: 24, name: "Riblji tanjur", price: 25, category: "Glavno jelo", description: "Svježi ulov dana s Jadrana, pečen s aromatičnim biljem i prilogom od blitve", istrian: true, vegan: false, allergens: ["Riba"], locations: ["Rovinj", "Pula"] },
  ];

  const reservations: any[] = [];

  // --- API Routes ---
  app.get("/api/menu", (req, res) => {
    res.json(menu);
  });

  app.post("/api/reserve", (req, res) => {
    const { name, email, date, time, guests } = req.body;
    // Simulate availability check (simple mock: if guests > 10, no space)
    if (guests > 10) {
      return res.status(400).json({ error: "Nema slobodnih stolova za traženi broj gostiju." });
    }
    const reservation = { id: Date.now(), name, email, date, time, guests, status: "confirmed" };
    reservations.push(reservation);
    res.json(reservation);
  });

  app.get("/api/check-availability", (req, res) => {
    const { date, guests } = req.query;
    // Simulating availability
    const isAvailable = Number(guests) <= 12;
    res.json({ available: isAvailable });
  });

  // --- Vite Middleware ---
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`IstraDine AI Backend running on http://localhost:${PORT}`);
  });
}

startServer();
