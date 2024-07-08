import './App.css';
import { useState,useEffect } from 'react';
import axios from 'axios';
import { Card } from './components/Card.js';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';


function App() {
  //defining useState variables to keep track them
  const [joblistings,setjoblistings]=useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [SearchCompany,setSearchCompany]=useState("");
  const [SearchRole,setSearchRole]=useState("");
  const [SearchLocation,setSearchLocation]=useState("");
  const [SearchRemote,setSearchRemote]=useState("");
  const [SearchExperiance,setSearchExperiance]=useState(-1);
  const [SearchPay,setSearchPay]=useState(-1);
  const [c,setc]=useState(0);
  var s="<Weekday/>";
  let finalFilter=[];

  //useEffect for side effects , component mounting
  //axios returns a promise (asynchronous action) so we should use "await"
  //dependency array([]) is an array of values that the effect depends on. When one of these values changes, React will re-run the effect. If the values have not changed, React will skip the effect.
  //axios is used to fetch the data. It automatically converts the recieved data into JSON format.
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const response = await axios.post("https://api.weekday.technology/adhoc/getSampleJdJSON");
      setjoblistings(prev => [...prev, ...response.data.jdList]);
      setc(c+1);
      setIsLoading(false);
    };
    fetchData();
  }, [c]);

  //handleScroll is a function that checks if the user has scrolled to the bottom of the page and if data fetching is not already in progress
  //Also used for the purpose of to achieve infinite scrolling
  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || isLoading) {
      return;
    }
  };
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);// Add scroll event listener to the window
    return () => window.removeEventListener('scroll', handleScroll);// Remove scroll event listener when the component unmounts
   }, [isLoading]);// Execute the effect whenever the value of isLoading state variable changes


  console.log(joblistings); 
  
  //filter function is used to filter the data based on user preference.
  //User can filter through Company/Role/Pay...
  let filteredCompanys=joblistings.filter((job)=>{
      
       if(SearchRole!=="")
        {
          finalFilter= job.jobRole.toLowerCase().includes(SearchRole.toLowerCase());
        }
        if(SearchCompany!=="")
        {
          finalFilter= job.companyName.toLowerCase().includes(SearchCompany.toLowerCase())
        }
        if(SearchLocation!=="")
        {
          finalFilter= job.location.toLowerCase().includes(SearchLocation.toLowerCase())
        }
        if(SearchRemote!=="")
        {
          finalFilter= job.location.toLowerCase().includes(SearchRemote.toLowerCase())
        }
        if(SearchExperiance!==-1)
        {
          finalFilter= job.minExp>=SearchExperiance;
        }
        if(SearchPay!==-1)
        {
          finalFilter= job.maxJdSalary>=SearchPay;
        }
        return finalFilter;
  });

  return (
    <div className="App">
      {/* Navbar (actually not required) */}
     <div>
     <Navbar bg="dark" variant="dark">
        <Container className='a'>
          <Navbar.Brand href=""><b><h2>{s}</h2></b></Navbar.Brand>
        </Container>
      </Navbar>
     </div>
     {/* input fileds takes input from user for seraching the job */}
     <div>
       <input className='m-3' 
       style={{  padding: '5px', borderRadius: '7px', border: '1px solid #ccc' }} 
       type="text" 
       placeholder='Search by Company' 
       onChange={(event)=>setSearchCompany(event.target.value)}/>

       <input className='m-3' 
       style={{ padding: '5px', borderRadius: '7px', border: '1px solid #ccc' }} 
       type="text" 
       placeholder='Search by Role' 
       onChange={(event)=>setSearchRole(event.target.value)}/>

       <input className='m-3' 
       style={{ padding: '5px', borderRadius: '7px', border: '1px solid #ccc' }} 
       type="text" 
       placeholder='Search by Location' 
       onChange={(event)=>setSearchLocation(event.target.value)}/>

       <input className='m-3' 
       style={{ padding: '5px', borderRadius: '7px', border: '1px solid #ccc' }} 
       type="text" 
       placeholder='Search by Remote' 
       onChange={(event)=>setSearchRemote(event.target.value)}/>

       <input className='m-3' 
       style={{ padding: '5px', borderRadius: '7px', border: '1px solid #ccc' }} 
       type="text" 
       placeholder='Search by Experiance' 
       onChange={(event)=>setSearchExperiance(+event.target.value)}/>

       <input className='m-3' 
       style={{ padding: '5px', borderRadius: '7px', border: '1px solid #ccc' }} 
       type="text" 
       placeholder='Search by Pay ($)' 
       onChange={(event)=>setSearchPay(+event.target.value)}/>
     </div>
     {/* map is used to iterate over all the objects in the array.Props are passed to Card component */}
     <div className="card">
      <div className='row'>
        {filteredCompanys.map((job)=>{
          return <Card role={job.jobRole} name={job.companyName}  location={job.location} jd={job.jobDetailsFromCompany} salary={job.maxJdSalary} experiance={job.minExp} logo={job.logoUrl}/>
        })}
        {isLoading && <p>Loading...</p>}
      </div>
     </div>

    </div>
  );
}

export default App;
