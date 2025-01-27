import banner from '../../../assets/inventory-banner.jpg'
import '../../CommonRoutes/Home/CSS/banner.css'


const Banner = () => {
    return (
      <header  data-aos="fade-up" className="bg-gray-900 pattern" >
      <div className="container px-6 mx-auto">
          <nav className="flex flex-col py-6 sm:flex-row sm:justify-between sm:items-center">
              
   
          </nav>
  
          <div className="flex flex-col items-center py-6 lg:h-[36rem] lg:flex-row">
              {/* <div className="lg:w-1/2">
                  <h2 className="text-3xl font-semibold text-gray-100 lg:text-4xl">Effortless</h2>
  
                  <h3 className="mt-2 text-2xl font-semibold text-gray-100">
                  Inventory Management  <span className="text-blue-400"> for Every Business</span>
                  </h3>
  
                  <p className="mt-4 text-gray-100">Explore the Future of Inventory Control with Shop Sync. From Product Management to Sales Insights, We have Got You Covered! 
                 </p>
  
              </div> */}
  
              <div className="flex mt-8 lg:w-1/2 lg:justify-end lg:mt-0">
                  <div className="w-full max-w-md bg-white rounded-lg ">
                      <div className="p-2 h-[233px] text-center"  >
                        
                          <img src={banner} className='h-full' alt="" />
                        
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </header>
    );
};

export default Banner;