export default function StatCard({ title, value }) {
  return (
    <div style={{
      background: "white",
      padding: 20,
      borderRadius: 12
    }}>
      <p>{title}</p>
      <h2>{value}</h2>
    </div>
  );
}