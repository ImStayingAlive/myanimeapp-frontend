import Navbar from "../layout/common/navbar/Navbar";
import Footer from "../layout/common/Footer";
import HomeView from "../layout/views/home/HomeView";

const Home = () => {

  return (
    <div className="min-h-screen w-full">
      <main>
          <Navbar />
          <HomeView />
          <Footer />
      </main>
    </div>
  )
}

export default Home
