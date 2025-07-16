export function downloadCSV(data, filename = "data.csv") {
  if (!data || !data.length) {
    console.warn("No data provided for CSV download.");
    return;
  }

  // Extract headers
  const headers = Object.keys(data[0]);

  // Convert array of objects to CSV string
  const csvRows = [
    headers.join(","), // header row
    ...data.map((row) =>
      headers
        .map((field) => {
          const val = row[field] ?? "";
          // Escape quotes and wrap in quotes if needed
          const escaped = String(val).replace(/"/g, '""');
          return `"${escaped}"`;
        })
        .join(",")
    ),
  ];

  const csvContent = csvRows.join("\n");

  // Create a Blob and trigger download
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
