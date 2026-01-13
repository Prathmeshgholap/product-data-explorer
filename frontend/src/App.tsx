import { useEffect, useState } from "react";

type Book = {
  id: number;
  title: string;
  source_url: string;
};

type Detail = {
  author: string | null;
  price: string | null;
  isbn: string | null;
};

function App() {
  const [books, setBooks] = useState<Book[]>([]);
  const [details, setDetails] = useState<Record<number, Detail>>({});
  const [hovered, setHovered] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [fetching, setFetching] = useState(false);

  // Load books from backend
  const loadBooks = async () => {
    const res = await fetch("http://localhost:3000/product");
    const data = await res.json();
    setBooks(data);
    setLoading(false);
  };

  useEffect(() => {
    loadBooks();
  }, []);

  // Fetch details when hovering View Details
  const loadDetails = async (id: number) => {
    if (details[id]) return;

    const res = await fetch(`http://localhost:3000/scrape/product/${id}`, {
      method: "POST",
    });

    const json = await res.json();

    setDetails(prev => ({
      ...prev,
      [id]: {
        author: json.data.author,
        price: json.data.price,
        isbn: json.data.isbn,
      },
    }));
  };

  // Fetch more books
  const fetchMore = async () => {
    setFetching(true);
    await fetch("http://localhost:3000/scrape/products/fiction", {
      method: "POST",
    });
    await loadBooks();
    setFetching(false);
  };

  const filtered = books.filter(b =>
    b.title.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <h2>Loading books…</h2>;

  return (
    <div style={{ padding: 20, color: "white", background: "#111", minHeight: "100vh" }}>
      
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
        <h1>📚 World Of Books</h1>

        <div style={{ display: "flex", gap: 10 }}>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search books..."
            style={{
              padding: "6px 12px",
              width: 160,
              borderRadius: 6,
              height: 32,
              border: "1px solid #444",
              fontSize: 13,
              background: "#222",
              color: "white",
            }}
          />

          <button
            onClick={fetchMore}
            disabled={fetching}
            style={{
              padding: "6px 12px",
              width: 170,
              background: "#2563eb",
              color: "white",
              border: "none",
              borderRadius: 6,
              height: 45,
              fontSize: 13,
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            {fetching ? "Fetching..." : "Fetch More Books"}
          </button>
        </div>
      </div>

      {/* Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 16,
        }}
      >
        {filtered.map(book => (
          <div
            key={book.id}
            style={{
              background: "#1a1a1a",
              padding: 15,
              borderRadius: 10,
              position: "relative",
            }}
          >
            <h3>{book.title}</h3>

            <div style={{ display: "flex", gap: 10 }}>
              <a href={book.source_url} target="_blank" rel="noopener noreferrer">
                <button>Open Book URL</button>
              </a>

              <button
                onMouseEnter={() => {
                  setHovered(book.id);
                  loadDetails(book.id);
                }}
                onMouseLeave={() => setHovered(null)}
              >
                View Details
              </button>
            </div>

            {/* Popup */}
            {hovered === book.id && details[book.id] && (
              <div
                style={{
                  position: "absolute",
                  top: "100%",
                  left: 0,
                  background: "#222",
                  padding: 12,
                  borderRadius: 8,
                  width: 240,
                  zIndex: 10,
                }}
              >
                <p><b>Author:</b> {details[book.id].author}</p>
                <p><b>Price:</b> {details[book.id].price}</p>
                <p><b>ISBN:</b> {details[book.id].isbn}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
