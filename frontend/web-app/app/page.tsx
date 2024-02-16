import Listings from "./auctions/Listings";


export default function Home() {
  console.log("Server Component");
  return (
    <div>
      <Listings />
    </div>
  );
}