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

  // Mock Database
  let books = [
    {
      id: "1",
      title: "Structural Engineering: The Racing Chassis",
      author: "Prof. Alan Smith",
      isbn: "978-0123456789",
      category: "Engineer",
      available: true,
      year: 2023,
      coverUrl: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=400",
    },
    {
      id: "2",
      title: "Human Anatomy for Sports Doctors",
      author: "Dr. Sarah Jenkins",
      isbn: "978-1122334455",
      category: "Doctor",
      available: true,
      year: 2024,
      coverUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=400",
    },
    {
      id: "3",
      title: "Advanced Financial Accounting",
      author: "Robert Sterling",
      isbn: "978-5544332211",
      category: "Accountant",
      available: false,
      year: 2022,
      coverUrl: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=400",
    },
     {
      id: "4",
      title: "Aerodynamics & Fluid Mechanics",
      author: "Adrian Newey",
      isbn: "978-9988776655",
      category: "Engineer",
      available: true,
      year: 2019,
      coverUrl: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=400",
    },
    {
      id: "5",
      title: "Emergency Response in High-Speed Events",
      author: "Sid Watkins",
      isbn: "978-6677889900",
      category: "Doctor",
      available: true,
      year: 1996,
      coverUrl: "https://images.unsplash.com/photo-1583324113626-70e0d28587c2?auto=format&fit=crop&q=80&w=400",
    },
    {
      id: "6",
      title: "Global Tax Strategies for Teams",
      author: "Elena Rossi",
      isbn: "978-3334445556",
      category: "Accountant",
      available: true,
      year: 2025,
      coverUrl: "https://images.unsplash.com/photo-1454165833767-131ef24896c3?auto=format&fit=crop&q=80&w=400",
    },
    {
      id: "7",
      title: "Telemetry & Performance Analysis",
      author: "Kevin Miller",
      isbn: "978-4455667788",
      category: "Engineer",
      available: true,
      year: 2024,
      coverUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=400",
    },
    {
      id: "8",
      title: "Machine Learning for Robotics",
      author: "Dr. Emily Chen",
      isbn: "978-2233445566",
      category: "Engineer",
      available: true,
      year: 2023,
      coverUrl: "https://images.unsplash.com/photo-1531746790731-6c087fecd05a?auto=format&fit=crop&q=80&w=400",
    },
    {
      id: "9",
      title: "Internal Combustion Engine Design",
      author: "Mark Thompson",
      isbn: "978-7788990011",
      category: "Engineer",
      available: true,
      year: 2022,
      coverUrl: "https://images.unsplash.com/photo-1504917595217-d4dc5f2c4b2c?auto=format&fit=crop&q=80&w=400",
    }
  ];

  // API Routes
  app.get("/api/books", (req, res) => {
    res.json(books);
  });

  app.post("/api/books", (req, res) => {
    const newBook = {
      ...req.body,
      id: Math.random().toString(36).substr(2, 9),
      available: true,
    };
    books.push(newBook);
    res.status(201).json(newBook);
  });

  app.put("/api/books/:id", (req, res) => {
    const { id } = req.params;
    const index = books.findIndex(b => b.id === id);
    if (index !== -1) {
      books[index] = { ...books[index], ...req.body };
      res.json(books[index]);
    } else {
      res.status(404).json({ error: "Book not found" });
    }
  });

  app.delete("/api/books/:id", (req, res) => {
    const { id } = req.params;
    books = books.filter(b => b.id !== id);
    res.status(204).send();
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
