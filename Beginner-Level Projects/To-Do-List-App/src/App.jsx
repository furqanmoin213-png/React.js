import Header from "./components/Header";
import HeroSection from "./components/HeroSection";


const App = ()=>{
  return(
    <div className="min-h-screen bg-blue-50 flex justify-center text-blue-950">
      <div className=" xl:w-240 lg:w-200 md:w-160 sm:w-120 w-80 py-8 flex flex-col gap-5">

      <Header/>
      <HeroSection/>
      </div>
    
    </div>
  )
};
export default App;