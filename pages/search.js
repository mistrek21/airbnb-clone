import { useRouter } from "next/dist/client/router";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import { format } from "date-fns";
import InfoCard from "../Components/InfoCard";
import Map from "../Components/Map";

function Search({ searchResults }) {
  const router = useRouter();
  const { location, startDate, endDate, numberOfGuests } = router.query;

  const formattedStartDate = format(new Date(startDate), "dd MMMM yy");
  const formattedEndDate = format(new Date(endDate), "dd MMMM yy");
  const range = `${formattedStartDate} - ${formattedEndDate}`;
  const searchNumberOfGuests = numberOfGuests === "1" ? "guest" : "guests";

  return (
    <div className="h-screen">
      <Header
        placeholder={`${location} | ${range} | ${numberOfGuests} ${searchNumberOfGuests}`}
      />

      <main className="flex">
        <section>
          <p className="text-xs">
            300+ Stays - {range} - for {numberOfGuests} {searchNumberOfGuests}
          </p>
          <h1 className="text-3xl font-semibold mt-2 mb-6">
            Stays in {location}
          </h1>

          <div className="hidden lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap">
            <p className="button">Cancellation Flexibility</p>
            <p className="button">Type of Place</p>
            <p className="button">Price</p>
            <p className="button">Rooms and Beds</p>
            <p className="button">More Filters</p>
          </div>

          <div className="flex flex-col">
            {searchResults.map((searchResult) => (
              <InfoCard
                key={searchResult.img}
                img={searchResult.img}
                location={searchResult.location}
                title={searchResult.title}
                description={searchResult.description}
                star={searchResult.star}
                price={searchResult.price}
                total={searchResult.total}
              />
            ))}
          </div>
        </section>

        <section className="hidden xl:inline-flex xl:min-w-[600px]">
          <Map searchResults={searchResults} />
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Search;

export async function getServerSideProps() {
  const searchResults = await fetch("https://links.papareact.com/isz").then(
    (res) => res.json()
  );

  return {
    props: {
      searchResults,
    },
  };
}
